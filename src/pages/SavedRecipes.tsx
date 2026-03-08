import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Trash2, Loader2, ChefHat, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HalaalBadge } from "@/components/HalaalBadge";

interface SavedRecipe {
  id: string;
  title: string;
  content: string;
  halaal_mode: boolean;
  baking_mode: boolean;
  cuisine: string | null;
  servings: number | null;
  ingredients: string[];
  created_at: string;
}

const SavedRecipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from("saved_recipes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load saved recipes");
    } else {
      setRecipes(data as SavedRecipe[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchRecipes();
    else setLoading(false);
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_recipes").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete recipe");
    } else {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success("Recipe deleted");
    }
  };

  // Extract title from markdown content (first # heading)
  const extractTitle = (recipe: SavedRecipe) => {
    if (recipe.title) return recipe.title;
    const match = recipe.content.match(/^#\s+(.+)$/m);
    return match ? match[1] : "Untitled Recipe";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
        <h2 className="font-display text-xl font-bold text-foreground">Sign in to view saved recipes</h2>
        <Link to="/auth">
          <Button className="bg-gradient-warm border-0 text-primary-foreground">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Saved Recipes</h1>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : recipes.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <ChefHat className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No saved recipes yet. Generate one with the AI Generator!</p>
              <Link to="/ai-generator">
                <Button className="bg-gradient-warm border-0 text-primary-foreground">Go to AI Generator</Button>
              </Link>
            </div>
          ) : (
            recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
                    className="flex-1 text-left"
                  >
                    <h3 className="font-display text-lg font-semibold text-card-foreground">
                      {extractTitle(recipe)}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </span>
                      {recipe.cuisine && <span className="rounded-full bg-muted px-2 py-0.5">{recipe.cuisine}</span>}
                      {recipe.servings && <span className="rounded-full bg-muted px-2 py-0.5">{recipe.servings} servings</span>}
                      {recipe.halaal_mode && <HalaalBadge />}
                      {recipe.baking_mode && <span className="rounded-full bg-muted px-2 py-0.5">🍞 Baking</span>}
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(recipe.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {expandedId === recipe.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 border-t border-border pt-4 prose-sm text-foreground whitespace-pre-wrap"
                  >
                    {recipe.content}
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
