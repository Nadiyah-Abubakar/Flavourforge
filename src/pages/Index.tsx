import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Sparkles, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: BookOpen, title: "150+ Curated Recipes", desc: "Hand-tested across breakfast, lunch, dinner, baking & more" },
  { icon: Sparkles, title: "AI Recipe Generator", desc: "Input ingredients, get personalised recipes with measurements" },
  { icon: ChefHat, title: "Baking Studio", desc: "Precision tools, 60+ recipes, and Baker's Toolkit" },
  { icon: Shield, title: "Halaal Hub", desc: "Verified recipes, certified alternatives, full transparency" },
];

const Homepage = () => {
  const featured = recipes.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container relative z-10 flex min-h-[70vh] flex-col items-start justify-center py-20 md:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Where Great Recipes{" "}
              <span className="text-secondary">Are Forged</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-primary-foreground/80 sm:text-lg">
              Explore chef-crafted recipes, generate AI-powered meals from your ingredients, and discover our dedicated Halaal Hub with verified alternatives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-warm border-0 text-primary-foreground font-semibold shadow-warm hover:opacity-90">
                <Link to="/recipes">
                  Explore Recipes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20">
                <Link to="/ai-generator">
                  <Sparkles className="mr-2 h-4 w-4" /> Try AI Generator
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-warm py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to Cook with Confidence
            </h2>
            <p className="mt-3 text-muted-foreground">From discovery to dinner table, FlavourForge is your complete culinary companion.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-4 inline-flex rounded-lg bg-terracotta-light p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Featured Recipes</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked favourites from our library</p>
            </div>
            <Button asChild variant="ghost" className="hidden text-primary sm:flex">
              <Link to="/recipes">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Halaal Spotlight */}
      <section className="bg-halaal-light py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-halaal px-4 py-1 text-sm font-semibold text-halaal-foreground">
              Halaal Hub
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Cook with Complete Halaal Confidence
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every recipe tagged with halaal status. Non-halaal ingredients clearly flagged with verified, tested substitutions. AI Generator includes a dedicated Halaal Mode.
            </p>
            <Button asChild size="lg" className="mt-8 bg-halaal text-halaal-foreground hover:bg-halaal/90">
              <Link to="/halaal">
                Explore Halaal Hub <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Baking Spotlight */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              🍞 Baking Studio
            </h2>
            <p className="mt-3 text-muted-foreground">
              8 categories, 60+ curated recipes, gram-precision measurements, and a Baker's Toolkit with 8 live-calculating converter tools.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-warm border-0 text-primary-foreground hover:opacity-90">
                <Link to="/baking">Enter Baking Studio</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/toolkit">Baker's Toolkit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
