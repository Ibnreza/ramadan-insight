import { useState } from "react";
import { MapPin, Globe } from "lucide-react";
import { useAppContext } from "@/lib/app-context";
import { LocationModal } from "./location-modal";

export function LocationHeader() {
  const { location, language, setLanguage } = useAppContext();
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2">
        <button
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-2"
          data-testid="button-change-location"
        >
          <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
              {language === "bn" ? "লোকেশন" : "Location"}
            </p>
            <p className="text-sm font-semibold text-white" data-testid="text-location-name">
              {location.name.split(",")[0]}
            </p>
          </div>
        </button>
        <button
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10"
          data-testid="button-toggle-language"
        >
          <Globe className="w-4 h-4 text-gold-400" />
        </button>
      </div>
      <LocationModal open={showLocationModal} onClose={() => setShowLocationModal(false)} />
    </>
  );
}
