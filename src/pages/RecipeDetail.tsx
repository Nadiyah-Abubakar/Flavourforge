import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Clock, Users, Star, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HalaalBadge from "@/components/HalaalBadge";
import { recipes } from "@/data/recipes";

// Scale numeric quantities in an ingredient string
const scaleIngredient = (text: string, scale: number): string => {
  if (scale === 1) return text;
  return text.replace(/(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/g, (_, num, den) => {
    const val = (parseFloat(num) / parseFloat(den)) * scale;
    return val % 1 === 0 ? String(val) : val.toFixed(1);
  }).replace(/(\d+\.?\d*)/g, (match) => {
    const val = parseFloat(match) * scale;
    return val % 1 === 0 ? String(val) : val.toFixed(1);
  });
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);
  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const [metric, setMetric] = useState(true);

  if (!recipe) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Recipe not found</h1>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/recipes"><ArrowLeft className="mr-2 h-4 w-4" /> Back to recipes</Link>
        </Button>
      </div>
    );
  }

  const scale = servings / recipe.servings;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
        <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <Link to="/recipes" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to recipes
            </Link>
            <div className="flex items-start gap-3">
              <HalaalBadge status={recipe.halaalStatus} />
              {recipe.isBaking && (
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {recipe.bakingCategory}
                </span>
              )}
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-5xl">{recipe.name}</h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/80 md:text-base">{recipe.description}</p>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta */}
            <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <div><span className="font-semibold text-foreground">{recipe.prepTime + recipe.cookTime}</span> min total</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <div><span className="font-semibold text-foreground">{recipe.rating}</span> ({recipe.reviewCount} reviews)</div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground capitalize">{recipe.difficulty}</span> · {recipe.cuisine}
              </div>
            </div>

            {/* Halaal Panel */}
            {recipe.halaalSubs && recipe.halaalSubs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border-2 border-halaal bg-halaal-light p-6"
              >
                <h3 className="font-display text-lg font-bold text-foreground">☪ Halaal Substitutions</h3>
                <p className="mt-1 text-sm text-muted-foreground">The following ingredients require halaal-certified alternatives:</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-halaal/20">
                        <th className="pb-2 pr-4 text-left font-semibold text-foreground">Original</th>
                        <th className="pb-2 pr-4 text-left font-semibold text-foreground">Halaal Alternative</th>
                        <th className="pb-2 text-left font-semibold text-foreground">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.halaalSubs.map((sub, i) => (
                        <tr key={i} className="border-b border-halaal/10 last:border-0">
                          <td className="py-2 pr-4 text-muted-foreground">{sub.original}</td>
                          <td className="py-2 pr-4 font-medium text-foreground">{sub.alternative}</td>
                          <td className="py-2 text-muted-foreground">{sub.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Steps */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Instructions</h2>
              <ol className="mt-4 space-y-4">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Servings & Units */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-card-foreground">Servings</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="rounded-md border border-border p-1 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-foreground">{servings}</span>
                  <button
                    onClick={() => setServings(Math.min(20, servings + 1))}
                    className="rounded-md border border-border p-1 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex rounded-lg bg-muted p-1">
                <button
                  onClick={() => setMetric(true)}
                  className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${metric ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setMetric(false)}
                  className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${!metric ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Ingredients */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-card-foreground">Ingredients</h3>
              {scale !== 1 && (
                <p className="mt-1 text-xs text-primary font-medium">
                  Scaled for {servings} servings (×{scale.toFixed(1)})
                </p>
              )}
              <ul className="mt-3 space-y-2">
                {recipe.ingredients.map((ing, i) => {
                  const raw = metric ? ing.metric : ing.imperial;
                  const scaled = scaleIngredient(raw, scale);
                  return (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border accent-primary" />
                      <span className="text-foreground">{scaled}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Nutrition */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-card-foreground">Nutrition per Serving</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(recipe.nutrition).map(([key, val]) => (
                  <div key={key} className="flex justify-between rounded-md bg-muted px-3 py-2">
                    <span className="capitalize text-muted-foreground">{key}</span>
                    <span className="font-semibold text-foreground">{val}{key === "calories" ? "" : "g"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
