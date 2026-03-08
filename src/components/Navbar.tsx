import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ArrowLeft, Sun, Moon, Home, User, LogOut, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Recipes", href: "/recipes" },
  { label: "Baking Studio", href: "/baking" },
  { label: "Halaal Hub", href: "/halaal" },
  { label: "AI Generator", href: "/ai-generator" },
  { label: "Baker's Toolkit", href: "/toolkit" },
  { label: "Meal Planner", href: "/meal-planner" },
  { label: "Saved Recipes", href: "/saved-recipes" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-18">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="mr-1 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="FlavourForge" className="h-9 w-9" />
            <span className="font-display text-xl font-bold text-gradient-warm">FlavourForge</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-3 py-2 font-body text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/recipes"
            className="hidden items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-border sm:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search recipes...</span>
          </Link>
          <button
            onClick={toggleDark}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <button
              onClick={() => signOut()}
              className="hidden sm:flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-muted transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 font-body text-sm font-medium transition-colors hover:bg-muted ${
                    location.pathname === link.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
