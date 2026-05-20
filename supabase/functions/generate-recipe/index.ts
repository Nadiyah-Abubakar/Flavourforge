import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { ingredients, halaalMode, bakingMode, cuisine, cookTime, servings, skill } = await req.json();

    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    if (!AI_API_KEY) throw new Error("AI_API_KEY is not configured");

    const AI_API_URL =
      Deno.env.get("AI_API_URL") ??
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    const AI_MODEL = Deno.env.get("AI_MODEL") ?? "gemini-2.0-flash";

    const halaalInstructions = halaalMode
      ? `HALAAL MODE IS ON: All ingredients MUST be halaal. Replace any non-halaal ingredients (pork, alcohol, non-halaal meat) with halaal alternatives. Mention that meat should be sourced from a certified halaal butcher. Replace wine/alcohol with non-alcoholic alternatives like broth, vinegar, or juice.`
      : "";

    const bakingInstructions = bakingMode
      ? `BAKING MODE IS ON: Provide precise gram measurements for all ingredients. Include oven temperature, rack position, and detailed timing. Mention visual cues for doneness.`
      : "";

    const systemPrompt = `You are an expert chef and recipe creator. Generate a detailed, practical recipe based on the user's available ingredients and preferences. 

Format your response EXACTLY as follows:
# [Recipe Name]

## Overview
A brief 1-2 sentence description of the dish.

## Ingredients
- List each ingredient with exact measurements
- Include any additional pantry staples needed (mark these with *)

## Instructions
1. Step-by-step numbered instructions
2. Include timing for each step
3. Be specific about techniques

## Tips
- 2-3 helpful tips for best results

## Nutrition (estimated per serving)
Calories | Protein | Carbs | Fat

${halaalInstructions}
${bakingInstructions}`;

    const userPrompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.

Preferences:
- Cuisine: ${cuisine}
- Maximum cook time: ${cookTime} minutes
- Servings: ${servings}
- Skill level: ${skill}
${halaalMode ? "- HALAAL: Yes, all ingredients must be halaal compliant" : ""}
${bakingMode ? "- BAKING: Yes, provide precise gram measurements" : ""}

Generate a delicious, practical recipe that primarily uses the listed ingredients. You may suggest a few additional common pantry staples if needed (mark them with *).`;

    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Failed to generate recipe" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-recipe error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
