export const SAVED_RECIPES_KEY = "flavourforge_saved_recipes";

export interface LocalSavedRecipe {
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

export const getLocalSavedRecipes = (): LocalSavedRecipe[] => {
  try {
    const raw = localStorage.getItem(SAVED_RECIPES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalSavedRecipe[];
  } catch {
    return [];
  }
};

export const isRecipeAlreadySaved = (content: string): boolean =>
  getLocalSavedRecipes().some((r) => r.content === content);

export const saveRecipeToLocal = (
  recipe: Omit<LocalSavedRecipe, "id" | "created_at">
): LocalSavedRecipe => {
  const recipes = getLocalSavedRecipes();
  const newRecipe: LocalSavedRecipe = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...recipe,
  };
  recipes.unshift(newRecipe);
  localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(recipes));
  return newRecipe;
};

export const deleteLocalSavedRecipe = (id: string): void => {
  const recipes = getLocalSavedRecipes().filter((r) => r.id !== id);
  localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(recipes));
};

export const isSupabaseConfigured = (): boolean =>
  Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
