import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/RecipeCard";
import { recipes, type Category } from "@/data/recipes";

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Desserts", value: "desserts" },
  { label: "Baking", value: "baking" },
  { label: "Snacks", value: "snacks" },
  { label: "Drinks", value: "drinks" },
];

const RecipeLibrary = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [halaalOnly, setHalaalOnly] = useState(false);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (halaalOnly && r.halaalStatus !== "naturally-halaal") return false;
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.cuisine.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category, halaalOnly]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Recipe Library</h1>
          <p className="mt-2 text-muted-foreground">Explore our curated collection of {recipes.length}+ recipes</p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search recipes, cuisines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <button
              onClick={() => setHalaalOnly(!halaalOnly)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                halaalOnly
                  ? "border-halaal bg-halaal text-halaal-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              ☪ Halaal Only
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container py-8 md:py-12">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No recipes found matching your criteria.</p>
            <p className="mt-1 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeLibrary;
