import shakshuka from "@/assets/recipes/shakshuka.jpg";
import tikkaMasala from "@/assets/recipes/tikka-masala.jpg";
import victoriaSponge from "@/assets/recipes/victoria-sponge.jpg";
import sourdough from "@/assets/recipes/sourdough.jpg";
import mushroomRisotto from "@/assets/recipes/mushroom-risotto.jpg";
import lavaCake from "@/assets/recipes/lava-cake.jpg";

export type HalaalStatus = "naturally-halaal" | "halaal-with-subs" | "verify";

export type Category = "breakfast" | "lunch" | "dinner" | "desserts" | "baking" | "snacks";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  sugar: number;
  sodium: number;
}

export interface HalaalSubstitution {
  original: string;
  alternative: string;
  reason: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
  cuisine: string;
  difficulty: Difficulty;
  cookTime: number;
  prepTime: number;
  servings: number;
  halaalStatus: HalaalStatus;
  halaalSubs?: HalaalSubstitution[];
  ingredients: { metric: string; imperial: string }[];
  steps: string[];
  nutrition: NutritionInfo;
  rating: number;
  reviewCount: number;
  tags: string[];
  isBaking?: boolean;
  bakingCategory?: string;
}

export const recipes: Recipe[] = [
  {
    id: "shakshuka",
    name: "Shakshuka",
    description: "Eggs poached in a spiced tomato and pepper sauce, perfect for a hearty breakfast or brunch.",
    image: shakshuka,
    category: "breakfast",
    cuisine: "Middle Eastern",
    difficulty: "beginner",
    cookTime: 25,
    prepTime: 10,
    servings: 4,
    halaalStatus: "naturally-halaal",
    ingredients: [
      { metric: "400g canned tomatoes", imperial: "14 oz canned tomatoes" },
      { metric: "1 red bell pepper, diced", imperial: "1 red bell pepper, diced" },
      { metric: "1 onion, diced", imperial: "1 onion, diced" },
      { metric: "3 cloves garlic, minced", imperial: "3 cloves garlic, minced" },
      { metric: "4 large eggs", imperial: "4 large eggs" },
      { metric: "2 tsp cumin", imperial: "2 tsp cumin" },
      { metric: "1 tsp paprika", imperial: "1 tsp paprika" },
      { metric: "2 tbsp olive oil", imperial: "2 tbsp olive oil" },
      { metric: "Fresh parsley", imperial: "Fresh parsley" },
    ],
    steps: [
      "Heat olive oil in a large skillet over medium heat.",
      "Sauté onion and bell pepper until softened, about 5 minutes.",
      "Add garlic, cumin, and paprika. Cook for 1 minute until fragrant.",
      "Pour in canned tomatoes and simmer for 10 minutes until thickened.",
      "Make 4 wells in the sauce and crack an egg into each.",
      "Cover and cook for 5-7 minutes until eggs are set.",
      "Garnish with fresh parsley and serve with crusty bread.",
    ],
    nutrition: { calories: 220, protein: 14, carbs: 18, fat: 12, fibre: 4, sugar: 8, sodium: 480 },
    rating: 4.8,
    reviewCount: 124,
    tags: ["vegetarian", "gluten-free", "quick"],
  },
  {
    id: "chicken-tikka-masala",
    name: "Chicken Tikka Masala",
    description: "Tender marinated chicken in a rich, creamy tomato-based sauce with aromatic spices.",
    image: tikkaMasala,
    category: "dinner",
    cuisine: "Indian",
    difficulty: "intermediate",
    cookTime: 40,
    prepTime: 20,
    servings: 4,
    halaalStatus: "halaal-with-subs",
    halaalSubs: [
      { original: "Chicken", alternative: "Certified halaal chicken (dhabiha-slaughtered)", reason: "Meat must be halaal-certified" },
      { original: "Tikka paste", alternative: "Verify tikka paste brand is halaal-certified", reason: "Some pastes contain non-halaal additives" },
    ],
    ingredients: [
      { metric: "600g chicken breast, cubed", imperial: "1.3 lb chicken breast, cubed" },
      { metric: "200ml yogurt", imperial: "¾ cup yogurt" },
      { metric: "400g canned tomatoes", imperial: "14 oz canned tomatoes" },
      { metric: "200ml double cream", imperial: "¾ cup heavy cream" },
      { metric: "2 tbsp tikka paste", imperial: "2 tbsp tikka paste" },
      { metric: "1 onion, finely diced", imperial: "1 onion, finely diced" },
      { metric: "3 cloves garlic", imperial: "3 cloves garlic" },
      { metric: "2cm ginger, grated", imperial: "1 inch ginger, grated" },
      { metric: "1 tsp garam masala", imperial: "1 tsp garam masala" },
      { metric: "Fresh coriander", imperial: "Fresh cilantro" },
    ],
    steps: [
      "Marinate chicken in yogurt and tikka paste for at least 1 hour.",
      "Grill or pan-fry marinated chicken until charred and cooked through.",
      "In a separate pan, sauté onion, garlic, and ginger until golden.",
      "Add canned tomatoes and simmer for 15 minutes.",
      "Stir in cream and garam masala, simmer for 5 more minutes.",
      "Add the cooked chicken to the sauce and simmer for 5 minutes.",
      "Garnish with fresh coriander. Serve with basmati rice or naan.",
    ],
    nutrition: { calories: 480, protein: 38, carbs: 22, fat: 26, fibre: 3, sugar: 10, sodium: 620 },
    rating: 4.9,
    reviewCount: 256,
    tags: ["spicy", "protein-rich"],
  },
  {
    id: "mushroom-risotto",
    name: "Mushroom Risotto",
    description: "Creamy Italian risotto with mixed mushrooms, parmesan, and a touch of white wine.",
    image: mushroomRisotto,
    category: "dinner",
    cuisine: "Italian",
    difficulty: "intermediate",
    cookTime: 35,
    prepTime: 15,
    servings: 4,
    halaalStatus: "halaal-with-subs",
    halaalSubs: [
      { original: "White wine (150ml)", alternative: "100ml white grape juice + 1 tbsp apple cider vinegar", reason: "Alcohol is not halaal" },
    ],
    ingredients: [
      { metric: "300g arborio rice", imperial: "1½ cups arborio rice" },
      { metric: "250g mixed mushrooms, sliced", imperial: "9 oz mixed mushrooms, sliced" },
      { metric: "150ml white wine", imperial: "⅔ cup white wine" },
      { metric: "1L hot vegetable stock", imperial: "4 cups hot vegetable stock" },
      { metric: "1 onion, finely diced", imperial: "1 onion, finely diced" },
      { metric: "60g parmesan, grated", imperial: "⅔ cup parmesan, grated" },
      { metric: "30g butter", imperial: "2 tbsp butter" },
      { metric: "2 tbsp olive oil", imperial: "2 tbsp olive oil" },
      { metric: "Fresh thyme", imperial: "Fresh thyme" },
    ],
    steps: [
      "Heat olive oil and half the butter in a large pan. Sauté mushrooms until golden, set aside.",
      "In the same pan, cook onion until soft. Add rice and stir for 2 minutes.",
      "Pour in wine (or halaal substitute) and stir until absorbed.",
      "Add stock one ladle at a time, stirring continuously. Wait until each addition is absorbed.",
      "Continue for 18-20 minutes until rice is creamy and al dente.",
      "Stir in mushrooms, remaining butter, and parmesan.",
      "Season to taste and serve immediately with fresh thyme.",
    ],
    nutrition: { calories: 420, protein: 14, carbs: 58, fat: 16, fibre: 3, sugar: 4, sodium: 520 },
    rating: 4.7,
    reviewCount: 189,
    tags: ["vegetarian", "comfort-food"],
  },
  {
    id: "victoria-sponge",
    name: "Victoria Sponge Cake",
    description: "Classic British sponge cake layered with strawberry jam and whipped cream.",
    image: victoriaSponge,
    category: "baking",
    cuisine: "British",
    difficulty: "intermediate",
    cookTime: 25,
    prepTime: 20,
    servings: 8,
    halaalStatus: "halaal-with-subs",
    halaalSubs: [
      { original: "Vanilla extract", alternative: "Vanilla bean paste (1:1 swap)", reason: "Standard vanilla extract contains alcohol" },
    ],
    isBaking: true,
    bakingCategory: "Cakes & Layer Cakes",
    ingredients: [
      { metric: "225g self-raising flour", imperial: "1¾ cups self-raising flour" },
      { metric: "225g caster sugar", imperial: "1 cup + 2 tbsp caster sugar" },
      { metric: "225g butter, softened", imperial: "1 cup butter, softened" },
      { metric: "4 large eggs", imperial: "4 large eggs" },
      { metric: "1 tsp vanilla extract", imperial: "1 tsp vanilla extract" },
      { metric: "150g strawberry jam", imperial: "½ cup strawberry jam" },
      { metric: "300ml double cream, whipped", imperial: "1¼ cups heavy cream, whipped" },
      { metric: "Icing sugar for dusting", imperial: "Powdered sugar for dusting" },
    ],
    steps: [
      "Preheat oven to 180°C (350°F / Gas Mark 4). Grease and line two 20cm round tins.",
      "Beat butter and sugar until light and fluffy, about 3-4 minutes.",
      "Add eggs one at a time, beating well after each addition.",
      "Add vanilla (or vanilla bean paste). Fold in flour gently.",
      "Divide between tins and bake for 20-25 minutes until golden and springy.",
      "Cool in tins for 10 minutes, then turn out onto a wire rack.",
      "Spread jam on one cake, top with whipped cream, then sandwich together.",
      "Dust with icing sugar and serve.",
    ],
    nutrition: { calories: 520, protein: 6, carbs: 58, fat: 30, fibre: 1, sugar: 36, sodium: 280 },
    rating: 4.9,
    reviewCount: 312,
    tags: ["classic", "afternoon-tea"],
  },
  {
    id: "classic-sourdough",
    name: "Classic Sourdough Bread",
    description: "Artisan sourdough with a beautiful crust and open crumb structure.",
    image: sourdough,
    category: "baking",
    cuisine: "French",
    difficulty: "advanced",
    cookTime: 45,
    prepTime: 30,
    servings: 1,
    halaalStatus: "naturally-halaal",
    isBaking: true,
    bakingCategory: "Breads & Loaves",
    ingredients: [
      { metric: "500g strong bread flour", imperial: "4 cups bread flour" },
      { metric: "350g water", imperial: "1½ cups water" },
      { metric: "100g active sourdough starter", imperial: "½ cup sourdough starter" },
      { metric: "10g salt", imperial: "2 tsp salt" },
    ],
    steps: [
      "Mix flour and water, autolyse for 30 minutes.",
      "Add starter and salt. Stretch and fold for 5 minutes.",
      "Bulk ferment for 4-6 hours with stretch and folds every 30 minutes for first 2 hours.",
      "Shape the dough and place in a banneton. Cold retard in fridge overnight.",
      "Preheat oven to 250°C (480°F) with a Dutch oven inside.",
      "Score the dough and bake covered for 20 minutes.",
      "Remove lid, reduce to 230°C (446°F) and bake 20-25 minutes until deep golden.",
      "Cool on a wire rack for at least 1 hour before slicing.",
    ],
    nutrition: { calories: 180, protein: 6, carbs: 36, fat: 1, fibre: 2, sugar: 0, sodium: 380 },
    rating: 4.6,
    reviewCount: 98,
    tags: ["artisan", "fermented", "no-sugar"],
  },
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cakes",
    description: "Individual chocolate cakes with a molten centre, perfect for a decadent dessert.",
    image: lavaCake,
    category: "baking",
    cuisine: "French",
    difficulty: "intermediate",
    cookTime: 14,
    prepTime: 15,
    servings: 4,
    halaalStatus: "halaal-with-subs",
    halaalSubs: [
      { original: "Dark chocolate", alternative: "Halaal-certified dark chocolate", reason: "Some chocolates contain non-halaal emulsifiers" },
      { original: "Vanilla extract", alternative: "Vanilla bean paste", reason: "Standard vanilla extract contains alcohol" },
    ],
    isBaking: true,
    bakingCategory: "Baked Desserts",
    ingredients: [
      { metric: "200g dark chocolate (70%)", imperial: "7 oz dark chocolate (70%)" },
      { metric: "100g butter", imperial: "7 tbsp butter" },
      { metric: "100g caster sugar", imperial: "½ cup caster sugar" },
      { metric: "3 large eggs", imperial: "3 large eggs" },
      { metric: "50g plain flour", imperial: "⅓ cup all-purpose flour" },
      { metric: "1 tsp vanilla extract", imperial: "1 tsp vanilla extract" },
      { metric: "Cocoa powder for dusting", imperial: "Cocoa powder for dusting" },
    ],
    steps: [
      "Preheat oven to 200°C (400°F). Grease 4 ramekins and dust with cocoa powder.",
      "Melt chocolate and butter together until smooth.",
      "Whisk eggs and sugar until thick and pale, about 3 minutes.",
      "Fold chocolate mixture into egg mixture. Add vanilla (or vanilla bean paste).",
      "Sift in flour and fold gently until just combined.",
      "Divide between ramekins. Bake for 12-14 minutes — edges set, centre jiggly.",
      "Rest for 1 minute, then invert onto plates. Serve immediately with berries.",
    ],
    nutrition: { calories: 560, protein: 8, carbs: 48, fat: 38, fibre: 4, sugar: 34, sodium: 120 },
    rating: 4.8,
    reviewCount: 203,
    tags: ["indulgent", "date-night", "quick-bake"],
  },
];

export const halaalAlternatives = [
  { category: "Alcohol Replacements", items: [
    { original: "White wine (cooking)", alternative: "White grape juice 100ml + 1 tbsp apple cider vinegar per 150ml", impact: "Preserves acidity and sweetness" },
    { original: "Red wine (cooking)", alternative: "Pomegranate juice or red grape juice + dash balsamic", impact: "Provides depth and colour" },
    { original: "Beer / stout (braising)", alternative: "Beef or chicken stock + 1 tsp malt vinegar", impact: "Preserves savoury depth" },
    { original: "Brandy / rum (desserts)", alternative: "Apple juice + 1 tsp vanilla bean paste per 2 tbsp", impact: "Sweet aromatic substitute" },
  ]},
  { category: "Meat & Poultry", items: [
    { original: "Any chicken, beef, lamb", alternative: "Certified halaal equivalents (dhabiha-slaughtered)", impact: "Look for SANHA, MJC, HMC certification" },
    { original: "Pork bacon", alternative: "Turkey bacon or beef bacon", impact: "Like-for-like flavour profiles" },
    { original: "Pork sausages", alternative: "Halaal beef or chicken sausages", impact: "Widely available from halaal butchers" },
    { original: "Gelatine (pork)", alternative: "Halaal beef gelatine or agar-agar", impact: "Agar sets firmer — use 80% quantity" },
  ]},
  { category: "Sauces & Condiments", items: [
    { original: "Worcestershire sauce", alternative: "Halaal-certified Worcestershire or soy sauce + tamarind", impact: "Widely available" },
    { original: "Vanilla extract", alternative: "Vanilla bean paste or powder (1:1)", impact: "Zero alcohol, identical flavour" },
    { original: "Oyster sauce", alternative: "Halaal-certified oyster sauce", impact: "Many Asian brands carry halaal versions" },
    { original: "Soy sauce", alternative: "Certified halaal tamari or soy sauce", impact: "Check label for certification" },
  ]},
  { category: "Baking Substitutes", items: [
    { original: "Lard (in pastry)", alternative: "Butter or coconut oil (solid)", impact: "Slightly different texture with coconut" },
    { original: "Non-halaal chocolate", alternative: "Halaal-certified dark/milk/white chocolate", impact: "Look for halaal stamp on packaging" },
    { original: "Carmine / E120", alternative: "Beetroot powder or halaal red food colouring", impact: "Natural alternatives available" },
    { original: "Rum/brandy essence", alternative: "Halaal flavouring or omit entirely", impact: "Halaal essences from specialist suppliers" },
  ]},
];

export const bakingCategories = [
  { name: "Breads & Loaves", description: "Sourdoughs, enriched loaves, focaccia, brioche", icon: "🍞", count: 12 },
  { name: "Cakes & Layer Cakes", description: "Victoria sponge, chocolate, carrot, red velvet", icon: "🎂", count: 10 },
  { name: "Cookies & Biscuits", description: "Chocolate chip, shortbread, macarons", icon: "🍪", count: 8 },
  { name: "Pies, Tarts & Pastry", description: "Shortcrust, puff, choux, fruit pies", icon: "🥧", count: 7 },
  { name: "Muffins & Quick Breads", description: "Banana bread, blueberry muffins, cornbread", icon: "🧁", count: 8 },
  { name: "Viennoiserie", description: "Croissants, cinnamon rolls, danishes", icon: "🥐", count: 6 },
  { name: "Baked Desserts", description: "Cheesecake, lava cakes, crumbles, soufflés", icon: "🍮", count: 5 },
  { name: "GF & Vegan Baking", description: "Almond flour cakes, vegan substitutes", icon: "🌿", count: 4 },
];
