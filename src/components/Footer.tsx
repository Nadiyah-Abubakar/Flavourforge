import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted/50">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-bold text-gradient-warm">FlavourForge</h3>
          <p className="mt-2 text-sm text-muted-foreground">Where great recipes are forged. Explore chef-crafted recipes, AI-powered meal generation, and a dedicated Halaal Hub.</p>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">Explore</h4>
          <div className="flex flex-col gap-2">
            <Link to="/recipes" className="text-sm text-muted-foreground hover:text-foreground">Recipe Library</Link>
            <Link to="/baking" className="text-sm text-muted-foreground hover:text-foreground">Baking Studio</Link>
            <Link to="/ai-generator" className="text-sm text-muted-foreground hover:text-foreground">AI Generator</Link>
            <Link to="/toolkit" className="text-sm text-muted-foreground hover:text-foreground">Baker's Toolkit</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">Halaal</h4>
          <div className="flex flex-col gap-2">
            <Link to="/halaal" className="text-sm text-muted-foreground hover:text-foreground">Halaal Hub</Link>
            <Link to="/halaal" className="text-sm text-muted-foreground hover:text-foreground">Ingredient Guide</Link>
            <Link to="/halaal" className="text-sm text-muted-foreground hover:text-foreground">Certification Info</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">More</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Meal Planner (coming soon)</span>
            <span className="text-sm text-muted-foreground">Cook Mode (coming soon)</span>
            <span className="text-sm text-muted-foreground">Collections (coming soon)</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2025 FlavourForge. All rights reserved. Halaal guidance is advisory — always verify certifications.
      </div>
    </div>
  </footer>
);

export default Footer;
