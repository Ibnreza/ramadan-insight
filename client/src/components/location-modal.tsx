import { useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { useAppContext } from "@/lib/app-context";
import { DEFAULT_LOCATIONS, type LocationData } from "@/lib/prayer-utils";
import { motion, AnimatePresence } from "framer-motion";

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
}

export function LocationModal({ open, onClose }: LocationModalProps) {
  const { setLocation, language } = useAppContext();
  const [search, setSearch] = useState("");

  const filtered = DEFAULT_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (loc: LocationData) => {
    setLocation(loc);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl max-h-[80vh] overflow-hidden"
            style={{ background: "#0F1528" }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-lg font-semibold text-white" data-testid="text-location-title">
                  {language === "bn" ? "লোকেশন পরিবর্তন" : "Change Location"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10"
                  data-testid="button-close-location"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={language === "bn" ? "শহরের নাম লিখুন..." : "Enter city name... (e.g. London)"}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-teal-500/50"
                  data-testid="input-location-search"
                />
              </div>

              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                {language === "bn" ? "প্রস্তাবিত" : "Suggestions"}
              </p>

              <div className="space-y-1 max-h-[50vh] overflow-y-auto pb-8">
                {filtered.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleSelect(loc)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-white/5"
                    data-testid={`button-location-${loc.name.split(",")[0].toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span className="text-sm text-white/80 text-left">{loc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
