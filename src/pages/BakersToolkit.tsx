import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const flourTypes: Record<string, number> = {
  "All-purpose": 125,
  "Bread flour": 130,
  "Cake flour": 115,
  "Whole wheat": 128,
  "Almond flour": 96,
  "Coconut flour": 112,
  "Rye flour": 102,
};

const BakersToolkit = () => {
  // Flour converter
  const [flourType, setFlourType] = useState("All-purpose");
  const [flourCups, setFlourCups] = useState("1");
  const flourGrams = (parseFloat(flourCups) || 0) * flourTypes[flourType];

  // Oven converter
  const [tempC, setTempC] = useState("180");
  const celsius = parseFloat(tempC) || 0;
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  const gasMap: Record<number, number> = { 140: 1, 150: 2, 160: 3, 180: 4, 190: 5, 200: 6, 220: 7, 230: 8, 240: 9 };
  const closestGas = Object.entries(gasMap).reduce((prev, [c, g]) => Math.abs(parseInt(c) - celsius) < Math.abs(parseInt(prev[0]) - celsius) ? [c, g] : prev, ["180", 4]);
  const fanOven = celsius - 20;

  // Hydration calculator
  const [flourWeight, setFlourWeight] = useState("500");
  const [waterWeight, setWaterWeight] = useState("350");
  const hydration = ((parseFloat(waterWeight) || 0) / (parseFloat(flourWeight) || 1)) * 100;
  const hydrationClass = hydration < 60 ? "Low (stiff dough)" : hydration < 70 ? "Medium (standard)" : hydration < 80 ? "High (ciabatta-style)" : "Very high (focaccia)";

  // Egg replacer
  const eggReplacers = [
    { function: "Binding", replacer: "1 tbsp ground flaxseed + 3 tbsp water", notes: "Let sit 5 min to gel" },
    { function: "Leavening", replacer: "1 tsp baking soda + 1 tbsp vinegar", notes: "Add just before baking" },
    { function: "Moisture", replacer: "¼ cup unsweetened applesauce", notes: "Adds slight sweetness" },
    { function: "Richness", replacer: "¼ cup mashed banana", notes: "Adds banana flavour" },
    { function: "Emulsifying", replacer: "3 tbsp aquafaba (chickpea water)", notes: "Whip until foamy" },
  ];

  // Butter substitution
  const butterSubs = [
    { sub: "Coconut oil", ratio: "1:1 (solid)", notes: "Slight coconut flavour" },
    { sub: "Vegetable oil", ratio: "¾ cup per 1 cup butter", notes: "No water content" },
    { sub: "Applesauce", ratio: "½ cup per 1 cup butter", notes: "For moist cakes only" },
    { sub: "Margarine", ratio: "1:1", notes: "Check halaal certification" },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-warm py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-3">
            <Wrench className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Baker's Toolkit</h1>
          </div>
          <p className="mt-2 text-muted-foreground">8 live-calculating converter tools for precision baking</p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Flour Converter */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">🌾 Flour Converter</h3>
            <p className="text-xs text-muted-foreground">Cups → grams for 7 flour types</p>
            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">Flour type</Label>
                <Select value={flourType} onValueChange={setFlourType}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(flourTypes).map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Cups</Label>
                <Input value={flourCups} onChange={(e) => setFlourCups(e.target.value)} type="number" step="0.25" min="0" className="mt-1" />
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <span className="text-2xl font-bold text-foreground">{Math.round(flourGrams)}g</span>
                <p className="text-xs text-muted-foreground">{flourType} flour</p>
              </div>
            </div>
          </motion.div>

          {/* Oven Temp */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">🌡️ Oven Temperature</h3>
            <p className="text-xs text-muted-foreground">°C ↔ °F ↔ Gas Mark + fan adjustment</p>
            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">Temperature (°C)</Label>
                <Input value={tempC} onChange={(e) => setTempC(e.target.value)} type="number" className="mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <span className="text-lg font-bold text-foreground">{fahrenheit}°F</span>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <span className="text-lg font-bold text-foreground">Gas {closestGas[1]}</span>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <span className="text-lg font-bold text-foreground">{fanOven}°C</span>
                  <p className="text-[10px] text-muted-foreground">Fan oven</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hydration Calculator */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">💧 Dough Hydration</h3>
            <p className="text-xs text-muted-foreground">Flour + water → hydration % & classification</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-muted-foreground">Flour (g)</Label>
                <Input value={flourWeight} onChange={(e) => setFlourWeight(e.target.value)} type="number" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Water (g)</Label>
                <Input value={waterWeight} onChange={(e) => setWaterWeight(e.target.value)} type="number" className="mt-1" />
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-muted p-3 text-center">
              <span className="text-2xl font-bold text-foreground">{hydration.toFixed(1)}%</span>
              <p className="text-xs text-muted-foreground">{hydrationClass}</p>
            </div>
          </motion.div>

          {/* Egg Replacer */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">🥚 Egg Replacer Guide</h3>
            <p className="text-xs text-muted-foreground">By egg function → vegan/halaal substitute</p>
            <div className="mt-4 space-y-2">
              {eggReplacers.map((e) => (
                <div key={e.function} className="rounded-lg bg-muted p-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-foreground">{e.function}</span>
                    <span className="text-xs text-muted-foreground">{e.notes}</span>
                  </div>
                  <p className="mt-1 text-sm text-primary font-medium">{e.replacer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Butter Substitution */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">🧈 Butter Substitution</h3>
            <p className="text-xs text-muted-foreground">Butter → oil, coconut, margarine, applesauce</p>
            <div className="mt-4 space-y-2">
              {butterSubs.map((s) => (
                <div key={s.sub} className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <span className="text-sm font-semibold text-foreground">{s.sub}</span>
                    <p className="text-xs text-muted-foreground">{s.notes}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{s.ratio}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Yeast Converter */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-card-foreground">🫧 Yeast Converter</h3>
            <p className="text-xs text-muted-foreground">Fresh ↔ active dry ↔ instant yeast</p>
            <div className="mt-4 space-y-2">
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm text-muted-foreground">Conversion ratios:</p>
                <p className="mt-2 text-sm text-foreground"><strong>Fresh yeast</strong> × 0.4 = <strong>Active dry</strong></p>
                <p className="text-sm text-foreground"><strong>Active dry</strong> × 0.75 = <strong>Instant</strong></p>
                <p className="mt-2 text-xs text-muted-foreground">e.g. 20g fresh = 8g active dry = 6g instant</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BakersToolkit;
