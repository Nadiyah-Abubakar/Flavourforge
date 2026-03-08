import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { recipes, bakingCategories } from "@/data/recipes";

const BakingStudio = () => {
  const bakingRecipes = recipes.filter((r) => r.isBaking);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-warm py-16 md:py-24">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-5xl">🍞</span>
            <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Baking Studio</h1>
            <p className="mt-3 mx-auto max-w-xl text-primary-foreground/80">
              60+ curated baking recipes with gram-precision measurements, oven guides, and halaal alternatives.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/toolkit">Open Baker's Toolkit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="container py-12 md:py-16">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Browse by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bakingCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all hover:shadow-elevated hover:border-primary/30"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-card-foreground">{cat.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
              <p className="mt-2 text-xs font-medium text-primary">{cat.count} recipes</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Baking Recipes */}
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Featured Baking Recipes</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bakingRecipes.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakingStudio;
