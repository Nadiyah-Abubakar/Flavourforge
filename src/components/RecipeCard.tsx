import { Link } from "react-router-dom";
import { Clock, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Recipe } from "@/data/recipes";
import HalaalBadge from "./HalaalBadge";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

const RecipeCard = ({ recipe, index = 0 }: RecipeCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <Link
      to={`/recipes/${recipe.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <HalaalBadge status={recipe.halaalStatus} />
        </div>
        {recipe.isBaking && (
          <div className="absolute right-3 top-3 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
            Baking
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {recipe.cuisine} · {recipe.category}
        </div>
        <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {recipe.cookTime + recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {recipe.servings}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
            {recipe.rating}
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default RecipeCard;
