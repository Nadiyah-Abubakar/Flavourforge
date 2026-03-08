import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ShoppingCart, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recipes } from "@/data/recipes";
import { Link } from "react-router-dom";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealSlots = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
type MealSlot = typeof mealSlots[number];

type WeekPlan = Record<string, Record<MealSlot, string | null>>;

const createEmptyWeek = (): WeekPlan => {
  const plan: WeekPlan = {};
  days.forEach((d) => {
    plan[d] = { Breakfast: null, Lunch: null, Dinner: null, Snack: null };
  });
  return plan;
};

const MealPlanner = () => {
  const [plan, setPlan] = useState<WeekPlan>(createEmptyWeek);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const setMeal = (day: string, slot: MealSlot, recipeId: string | null) => {
    setPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: recipeId },
    }));
  };

  const clearAll = () => setPlan(createEmptyWeek());

  const plannedRecipes = Object.values(plan).flatMap((dayPlan) =>
    Object.values(dayPlan)
      .filter(Boolean)
      .map((id) => recipes.find((r) => r.id === id))
      .filter(Boolean)
  );

  const totalMeals = plannedRecipes.length;

  // Build shopping list from planned recipes
  const shoppingList = plannedRecipes.reduce<Record<string, number>>((acc, recipe) => {
    if (!recipe) return acc;
    recipe.ingredients.forEach((ing) => {
      const key = ing.metric;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  // Unique categories of planned recipes
  const totalCalories = plannedRecipes.reduce((sum, r) => sum + (r?.nutrition.calories || 0), 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Meal Planner</h1>
          </div>
          <p className="mt-2 text-muted-foreground">Plan your week, generate a shopping list, and stay on track.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-lg bg-card border border-border px-4 py-2 text-sm">
              <span className="font-semibold text-foreground">{totalMeals}</span>
              <span className="text-muted-foreground"> meals planned</span>
            </div>
            <div className="rounded-lg bg-card border border-border px-4 py-2 text-sm">
              <span className="font-semibold text-foreground">{totalCalories}</span>
              <span className="text-muted-foreground"> total calories</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShoppingList(!showShoppingList)}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {showShoppingList ? "Hide" : "Show"} Shopping List
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive">
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar Grid */}
          <div className={showShoppingList ? "lg:col-span-2" : "lg:col-span-3"}>
            {/* Desktop: full grid */}
            <div className="hidden md:grid md:grid-cols-7 gap-3">
              {days.map((day) => (
                <div key={day} className="space-y-2">
                  <h3 className="font-display text-sm font-bold text-foreground text-center pb-2 border-b border-border">
                    {day.slice(0, 3)}
                  </h3>
                  {mealSlots.map((slot) => {
                    const recipeId = plan[day][slot];
                    const recipe = recipeId ? recipes.find((r) => r.id === recipeId) : null;
                    return (
                      <div
                        key={slot}
                        className="rounded-lg border border-border bg-card p-2 min-h-[80px]"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {slot}
                        </span>
                        {recipe ? (
                          <div className="mt-1">
                            <Link to={`/recipes/${recipe.id}`} className="text-xs font-medium text-foreground hover:text-primary line-clamp-2">
                              {recipe.name}
                            </Link>
                            <button
                              onClick={() => setMeal(day, slot, null)}
                              className="mt-1 text-destructive hover:text-destructive/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <Select onValueChange={(val) => setMeal(day, slot, val)}>
                            <SelectTrigger className="mt-1 h-7 text-[10px] border-dashed">
                              <Plus className="h-3 w-3 mr-1" />
                              <span>Add</span>
                            </SelectTrigger>
                            <SelectContent>
                              {recipes.map((r) => (
                                <SelectItem key={r.id} value={r.id} className="text-xs">
                                  {r.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Mobile: stacked */}
            <div className="space-y-4 md:hidden">
              {days.map((day) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <h3 className="font-display text-base font-bold text-foreground">{day}</h3>
                  <div className="mt-3 space-y-2">
                    {mealSlots.map((slot) => {
                      const recipeId = plan[day][slot];
                      const recipe = recipeId ? recipes.find((r) => r.id === recipeId) : null;
                      return (
                        <div key={slot} className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{slot}</span>
                            {recipe ? (
                              <div className="flex items-center gap-2 mt-0.5">
                                <Link to={`/recipes/${recipe.id}`} className="text-sm font-medium text-foreground hover:text-primary">
                                  {recipe.name}
                                </Link>
                                <button onClick={() => setMeal(day, slot, null)} className="text-destructive">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">No meal selected</p>
                            )}
                          </div>
                          {!recipe && (
                            <Select onValueChange={(val) => setMeal(day, slot, val)}>
                              <SelectTrigger className="w-24 h-8 text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                <span>Add</span>
                              </SelectTrigger>
                              <SelectContent>
                                {recipes.map((r) => (
                                  <SelectItem key={r.id} value={r.id} className="text-xs">
                                    {r.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shopping List */}
          {showShoppingList && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Shopping List</h3>
                </div>
                {Object.keys(shoppingList).length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Add meals to your plan to generate a shopping list.</p>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(shoppingList).map(([item, count]) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border accent-primary" />
                        <span className="text-foreground">
                          {item}
                          {count > 1 && <span className="text-muted-foreground"> (×{count})</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
