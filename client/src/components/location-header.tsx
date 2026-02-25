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
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(200,168,90,0.12)" }}>
            <MapPin className="w-4 h-4 text-gold-500" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#4A6070" }}>
              {language === "bn" ? "লোকেশন" : "Location"}
            </p>
            <p className="text-sm font-semibold text-[#F0EBE0]" data-testid="text-location-name">
              {location.name.split(",")[0]}
            </p>
          </div>
        </button>
        <button
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="w-9 h-9 rounded-full flex items-center justify-center border"
          style={{ background: "rgba(200,168,90,0.08)", borderColor: "rgba(200,168,90,0.15)" }}
          data-testid="button-toggle-language"
        >
          <Globe className="w-4 h-4 text-gold-400" />
        </button>
      </div>
      <LocationModal open={showLocationModal} onClose={() => setShowLocationModal(false)} />
    </>
  );
}
