import { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAppContext } from "@/lib/app-context";
import { LocationHeader } from "@/components/location-header";
import { DHIKR_PRESETS, type DhikrPreset } from "@/lib/ramadan-data";
import { format } from "date-fns";

export default function TasbihPage() {
  const { language, addTasbihEntry } = useAppContext();
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset>(DHIKR_PRESETS[0]);
  const [count, setCount] = useState(0);
  const [goal] = useState(() => selectedDhikr.defaultGoal);
  const [showSelector, setShowSelector] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [goalReached, setGoalReached] = useState(false);
  const circleRef = useRef<HTMLButtonElement>(null);

  const currentGoal = selectedDhikr.defaultGoal;
  const progress = Math.min(1, count / currentGoal);

  const handleTap = useCallback(() => {
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 150);

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    const newCount = count + 1;
    setCount(newCount);

    if (newCount === currentGoal && !goalReached) {
      setGoalReached(true);
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50, 50, 100]);
      }
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00E5C0", "#FFD700", "#ffffff"],
      });
      addTasbihEntry({
        date: format(new Date(), "yyyy-MM-dd"),
        dhikrId: selectedDhikr.id,
        count: newCount,
      });
    }
  }, [count, currentGoal, goalReached, selectedDhikr, addTasbihEntry]);

  const handleReset = useCallback(() => {
    if (count > 0 && !goalReached) {
      addTasbihEntry({
        date: format(new Date(), "yyyy-MM-dd"),
        dhikrId: selectedDhikr.id,
        count,
      });
    }
    setCount(0);
    setGoalReached(false);
  }, [count, goalReached, selectedDhikr, addTasbihEntry]);

  const handleSelectDhikr = (dhikr: DhikrPreset) => {
    if (count > 0) {
      addTasbihEntry({
        date: format(new Date(), "yyyy-MM-dd"),
        dhikrId: selectedDhikr.id,
        count,
      });
    }
    setSelectedDhikr(dhikr);
    setCount(0);
    setGoalReached(false);
    setShowSelector(false);
  };

  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="min-h-screen pb-24 islamic-pattern">
      <LocationHeader />

      <div className="px-5 pt-3 flex flex-col items-center">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowSelector(!showSelector)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 mb-4"
          data-testid="button-dhikr-selector"
        >
          <span className="text-sm font-semibold text-white">
            {language === "bn" ? selectedDhikr.nameBn : selectedDhikr.name}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showSelector ? "rotate-180" : ""}`} />
        </motion.button>

        <AnimatePresence>
          {showSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full rounded-xl border border-white/10 bg-navy-100 mb-4 overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto">
                {DHIKR_PRESETS.map((dhikr) => (
                  <button
                    key={dhikr.id}
                    onClick={() => handleSelectDhikr(dhikr)}
                    className="w-full flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 transition-colors hover:bg-white/5"
                    data-testid={`button-dhikr-${dhikr.id}`}
                  >
                    <div className="text-left">
                      <p className="text-sm text-white/90 font-medium">
                        {language === "bn" ? dhikr.nameBn : dhikr.name}
                      </p>
                      <p className="text-xs text-white/40">{dhikr.arabic}</p>
                    </div>
                    {selectedDhikr.id === dhikr.id && (
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-navy-300" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl text-teal-400 font-arabic text-center mb-6 leading-relaxed"
          dir="rtl"
          data-testid="text-dhikr-arabic"
        >
          {selectedDhikr.arabic}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative mb-6"
        >
          <svg width="250" height="250" viewBox="0 0 250 250" className="-rotate-90">
            <circle
              cx="125"
              cy="125"
              r="110"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="125"
              cy="125"
              r="110"
              fill="none"
              stroke="url(#tealGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-200"
            />
            <defs>
              <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5C0" />
                <stop offset="100%" stopColor="#00B899" />
              </linearGradient>
            </defs>
          </svg>

          <button
            ref={circleRef}
            onClick={handleTap}
            className={`absolute inset-[20px] rounded-full flex items-center justify-center transition-transform ${
              isTapping ? "scale-[0.95]" : "scale-100"
            }`}
            style={{
              background: "radial-gradient(circle at 40% 35%, #00E5C0, #00B899 60%, #008A73)",
              boxShadow: goalReached
                ? "0 0 40px rgba(0, 229, 192, 0.5), 0 0 80px rgba(0, 229, 192, 0.2)"
                : "0 0 20px rgba(0, 229, 192, 0.3), inset 0 -4px 10px rgba(0, 0, 0, 0.2)",
            }}
            data-testid="button-tasbih-tap"
          >
            <span className="text-5xl font-bold text-white" data-testid="text-tasbih-count">
              {count}
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-white/30 mb-4"
          data-testid="text-tasbih-goal"
        >
          {language === "bn"
            ? `লক্ষ্য: ${currentGoal}`
            : `Goal: ${currentGoal}`}
          {goalReached && (
            <span className="text-teal-400 ml-2 font-semibold">
              {language === "bn" ? "✓ সম্পন্ন!" : "✓ Complete!"}
            </span>
          )}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/50 text-sm font-medium"
          data-testid="button-reset-counter"
        >
          <RotateCcw className="w-4 h-4" />
          {language === "bn" ? "রিসেট কাউন্টার" : "Reset Counter"}
        </motion.button>
      </div>
    </div>
  );
}
