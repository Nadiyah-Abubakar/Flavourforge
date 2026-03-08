import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { recipes, halaalAlternatives } from "@/data/recipes";

const HalaalHub = () => {
  const halaalRecipes = recipes.filter((r) => r.halaalStatus === "naturally-halaal");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-halaal py-16 md:py-24">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShieldCheck className="mx-auto h-12 w-12 text-halaal-foreground" />
            <h1 className="mt-4 font-display text-4xl font-bold text-halaal-foreground md:text-5xl">Halaal Hub</h1>
            <p className="mt-3 mx-auto max-w-xl text-halaal-foreground/80">
              Every recipe tagged with halaal status. Verified alternatives for every non-halaal ingredient. AI Generator with dedicated Halaal Mode.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Status Explanation */}
      <div className="container py-12 md:py-16">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Halaal Tagging System</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { badge: "HALAAL", color: "bg-halaal text-halaal-foreground", title: "Naturally Halaal", desc: "All ingredients are inherently halaal. Cook as written." },
            { badge: "HALAAL + Subs", color: "bg-halaal text-halaal-foreground", title: "Halaal with Substitutes", desc: "Non-halaal ingredients have verified replacements listed in the recipe." },
            { badge: "Verify", color: "bg-secondary text-secondary-foreground", title: "Requires Verification", desc: "Halaal status depends on brand/source. Guidance provided." },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <span className={`inline-flex rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${s.color}`}>
                {s.badge}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ingredient Guide */}
      <div className="bg-halaal-light py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-halaal" />
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Halaal Ingredient Alternatives</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {halaalAlternatives.map((cat) => (
              <div key={cat.category} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-lg font-semibold text-card-foreground">{cat.category}</h3>
                <div className="mt-3 space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.original} className="rounded-lg bg-muted p-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <span className="text-sm font-medium text-foreground line-through opacity-60">{item.original}</span>
                          <span className="mx-2 text-muted-foreground">→</span>
                          <span className="text-sm font-semibold text-halaal">{item.alternative}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Naturally Halaal Recipes */}
      <div className="container py-12 md:py-16">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Naturally Halaal Recipes</h2>
        <p className="mt-2 text-muted-foreground">Ready to cook with zero substitutions needed</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {halaalRecipes.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} index={i} />
          ))}
        </div>
      </div>

      {/* AI Halaal Mode CTA */}
      <div className="bg-warm py-12 md:py-16">
        <div className="container text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">AI Generator — Halaal Mode</h2>
          <p className="mt-2 mx-auto max-w-lg text-muted-foreground">
            Toggle Halaal Mode to auto-substitute all non-halaal ingredients with certified alternatives in every AI-generated recipe.
          </p>
          <Button asChild size="lg" className="mt-6 bg-halaal text-halaal-foreground hover:bg-halaal/90">
            <Link to="/ai-generator">Try Halaal AI Generator <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HalaalHub;
