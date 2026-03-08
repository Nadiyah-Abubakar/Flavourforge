import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const cuisines = ["Any", "Italian", "Asian", "African", "Mexican", "Middle Eastern", "Indian", "Mediterranean", "American", "French"];
const skills = ["Beginner", "Intermediate", "Advanced"];

const AIGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [halaalMode, setHalaalMode] = useState(false);
  const [bakingMode, setBakingMode] = useState(false);
  const [cuisine, setCuisine] = useState("Any");
  const [cookTime, setCookTime] = useState([60]);
  const [servings, setServings] = useState(4);
  const [skill, setSkill] = useState("Intermediate");
  const [generated, setGenerated] = useState(false);

  const addIngredient = () => {
    if (input.trim() && ingredients.length < 20) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const removeIngredient = (i: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  };

  const handleGenerate = () => {
    if (ingredients.length > 0) setGenerated(true);
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
              <Input
                type="number"
                value={servings}
                onChange={(e) => setServings(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                className="w-20"
                min={1}
                max={12}
              />
            </div>
          </div>

          {/* Generate */}
          <Button
            onClick={handleGenerate}
            disabled={ingredients.length === 0}
            size="lg"
            className="w-full bg-gradient-warm border-0 text-primary-foreground font-semibold text-lg hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Recipe
          </Button>

          {/* Demo Output */}
          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-card-foreground">AI-Generated Recipe</h3>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-center text-muted-foreground italic">
                  🚧 AI generation requires a backend API integration (OpenAI or Anthropic Claude). This UI is ready to connect — enable Lovable Cloud to add the AI recipe generation functionality.
                </p>
              </div>
              {halaalMode && (
                <div className="rounded-lg border-2 border-halaal bg-halaal-light p-4">
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
