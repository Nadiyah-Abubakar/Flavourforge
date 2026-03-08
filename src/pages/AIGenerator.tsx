import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, X, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const cuisines = ["Any", "Italian", "Asian", "African", "Mexican", "Middle Eastern", "Indian", "Mediterranean", "American", "French"];
const skills = ["Beginner", "Intermediate", "Advanced"];

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipe`;

const AIGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [halaalMode, setHalaalMode] = useState(false);
  const [bakingMode, setBakingMode] = useState(false);
  const [cuisine, setCuisine] = useState("Any");
  const [cookTime, setCookTime] = useState([60]);
  const [servings, setServings] = useState(4);
  const [skill, setSkill] = useState("Intermediate");
  const [isLoading, setIsLoading] = useState(false);
  const [recipeText, setRecipeText] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const addIngredient = () => {
    if (input.trim() && ingredients.length < 20) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const removeIngredient = (i: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setRecipeText("");

    try {
      const resp = await fetch(GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          ingredients,
          halaalMode,
          bakingMode,
          cuisine,
          cookTime: cookTime[0],
          servings,
          skill,
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed to generate recipe" }));
        toast.error(err.error || "Failed to generate recipe");
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setRecipeText(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setRecipeText(fullText);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      console.error(e);
      toast.error("Something went wrong generating the recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple markdown-to-JSX renderer for recipe output
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("# ")) return <h2 key={i} className="font-display text-2xl font-bold text-card-foreground mt-4 mb-2">{line.slice(2)}</h2>;
      if (line.startsWith("## ")) return <h3 key={i} className="font-display text-lg font-semibold text-card-foreground mt-4 mb-1">{line.slice(3)}</h3>;
      if (line.startsWith("### ")) return <h4 key={i} className="font-display text-base font-semibold text-card-foreground mt-3 mb-1">{line.slice(4)}</h4>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 text-foreground list-disc">{renderInline(line.slice(2))}</li>;
      if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 text-foreground list-decimal">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-foreground">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">AI Recipe Generator</h1>
            </div>
            <p className="mt-2 text-muted-foreground">Input your ingredients and preferences to get a personalised recipe.</p>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Ingredients Input */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">Ingredients</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add up to 20 ingredients you have available</p>
            <div className="mt-3 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                placeholder="e.g. chicken breast, garlic..."
              />
              <Button onClick={addIngredient} className="bg-gradient-warm border-0 text-primary-foreground hover:opacity-90 shrink-0">Add</Button>
            </div>
            {ingredients.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <span key={i} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">
                    {ing}
                    <button onClick={() => removeIngredient(i)}><X className="h-3 w-3 text-muted-foreground hover:text-foreground" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border-2 border-halaal bg-halaal-light p-5">
              <div>
                <Label className="font-display text-base font-semibold text-foreground">☪ Halaal Mode</Label>
                <p className="text-xs text-muted-foreground">Auto-substitute non-halaal ingredients</p>
              </div>
              <Switch checked={halaalMode} onCheckedChange={setHalaalMode} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
              <div>
                <Label className="font-display text-base font-semibold text-card-foreground">🍞 Baking Mode</Label>
                <p className="text-xs text-muted-foreground">Gram precision & oven guidance</p>
              </div>
              <Switch checked={bakingMode} onCheckedChange={setBakingMode} />
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">Preferences</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-sm text-muted-foreground">Cuisine</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cuisines.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Skill Level</Label>
                <div className="mt-1 flex rounded-lg bg-muted p-1">
                  {skills.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSkill(s)}
                      className={`flex-1 rounded-md py-2 text-xs font-medium transition-colors ${
                        skill === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Cook Time: {cookTime[0]} min</Label>
              <Slider value={cookTime} onValueChange={setCookTime} min={10} max={180} step={5} className="mt-2" />
            </div>

            <div className="flex items-center gap-3">
              <Label className="text-sm text-muted-foreground">Servings:</Label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="rounded-md border border-border p-1.5 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-foreground">{servings}</span>
                <button
                  onClick={() => setServings(Math.min(12, servings + 1))}
                  className="rounded-md border border-border p-1.5 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Generate */}
          <Button
            onClick={handleGenerate}
            disabled={ingredients.length === 0 || isLoading}
            size="lg"
            className="w-full bg-gradient-warm border-0 text-primary-foreground font-semibold text-lg hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Recipe
              </>
            )}
          </Button>

          {/* Recipe Output */}
          {(recipeText || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-6 space-y-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-card-foreground">AI-Generated Recipe</h3>
              </div>

              {recipeText ? (
                <div className="prose-sm">{renderMarkdown(recipeText)}</div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Generating your recipe...</span>
                </div>
              )}

              {halaalMode && (
                <div className="rounded-lg border-2 border-halaal bg-halaal-light p-4 mt-4">
                  <p className="text-sm font-semibold text-foreground">☪ Halaal Mode Active</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    All meat in this recipe should be sourced from a certified halaal butcher. All alcohol has been replaced with non-alcoholic alternatives. Always verify product labels.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
