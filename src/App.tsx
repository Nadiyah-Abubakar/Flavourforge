import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import RecipeLibrary from "./pages/RecipeLibrary";
import RecipeDetail from "./pages/RecipeDetail";
import BakingStudio from "./pages/BakingStudio";
import HalaalHub from "./pages/HalaalHub";
import AIGenerator from "./pages/AIGenerator";
import BakersToolkit from "./pages/BakersToolkit";
import MealPlanner from "./pages/MealPlanner";
import Auth from "./pages/Auth";
import SavedRecipes from "./pages/SavedRecipes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recipes" element={<RecipeLibrary />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/baking" element={<BakingStudio />} />
              <Route path="/halaal" element={<HalaalHub />} />
              <Route path="/ai-generator" element={<AIGenerator />} />
              <Route path="/toolkit" element={<BakersToolkit />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
