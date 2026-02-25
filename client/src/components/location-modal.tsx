import { useState } from "react";
import { MapPin, Search, X, Navigation } from "lucide-react";
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
  const [loadingLocation, setLoadingLocation] = useState(false);

  const filtered = DEFAULT_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (loc: LocationData) => {
    setLocation(loc);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          name: "Current Location",
          latitude,
          longitude,
        });
        setLoadingLocation(false);
        onClose();
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(10,22,40,0.85)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl max-h-[80vh] overflow-hidden"
            style={{ background: "#132236", borderTop: "1px solid rgba(200,168,90,0.12)" }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-lg font-semibold text-[#F0EBE0]" data-testid="text-location-title">
                  {language === "bn" ? "লোকেশন পরিবর্তন" : "Change Location"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(200,168,90,0.10)" }}
                  data-testid="button-close-location"
                >
                  <X className="w-4 h-4 text-gold-400" />
                </button>
              </div>

              <button
                onClick={handleUseCurrentLocation}
                disabled={loadingLocation}
                className="w-full flex items-center justify-center gap-2 mb-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                style={{
                  background: "rgba(200,168,90,0.10)",
                  border: "1px solid rgba(200,168,90,0.20)",
                  color: "#C8A85A",
                }}
                data-testid="button-use-current-location"
              >
                <Navigation className="w-4 h-4" />
                {loadingLocation
                  ? (language === "bn" ? "লোকেশন লোড হচ্ছে..." : "Loading location...")
                  : (language === "bn" ? "বর্তমান লোকেশন ব্যবহার করুন" : "Use Current Location")}
              </button>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4A6070" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={language === "bn" ? "শহরের নাম লিখুন..." : "Enter city name..."}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(200,168,90,0.12)",
                    color: "#F0EBE0",
                  }}
                  data-testid="input-location-search"
                />
              </div>

              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#4A6070" }}>
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
                    <MapPin className="w-4 h-4 flex-shrink-0 text-gold-500" />
                    <span className="text-sm text-left" style={{ color: "#8A9DB5" }}>{loc.name}</span>
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
