import { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/app-context";
import { LocationHeader } from "@/components/location-header";
import { getQiblaDirection } from "@/lib/prayer-utils";

export default function QiblaPage() {
  const { location, language } = useAppContext();
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied" | "unsupported">("prompt");
  const animFrameRef = useRef<number>();

  const qiblaDirection = getQiblaDirection(location);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHeading(event.alpha);
        setPermissionState("granted");
      }
    };

    const requestPermission = async () => {
      if ("DeviceOrientationEvent" in window) {
        const DOE = DeviceOrientationEvent as any;
        if (typeof DOE.requestPermission === "function") {
          try {
            const result = await DOE.requestPermission();
            if (result === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
              setPermissionState("granted");
            } else {
              setPermissionState("denied");
            }
          } catch {
            setPermissionState("denied");
          }
        } else {
          window.addEventListener("deviceorientation", handleOrientation);
          setTimeout(() => {
            if (heading === null) {
              setPermissionState("unsupported");
            }
          }, 2000);
        }
      } else {
        setPermissionState("unsupported");
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const compassRotation = heading !== null ? -heading : 0;

  const cardinalDirections = [
    { label: "N", angle: 0 },
    { label: "E", angle: 90 },
    { label: "S", angle: 180 },
    { label: "W", angle: 270 },
  ];

  return (
    <div className="min-h-screen pb-24 islamic-pattern">
      <LocationHeader />

      <div className="px-5 pt-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2"
          style={{ color: "#F0EBE0" }}
          data-testid="text-qibla-title"
        >
          {language === "bn" ? "কিবলা কম্পাস" : "Qibla Compass"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm mb-8"
          style={{ color: "#4A6070" }}
          data-testid="text-qibla-direction"
        >
          {language === "bn"
            ? `কিবলার দিক: ${Math.round(qiblaDirection)}°`
            : `Qibla Direction: ${Math.round(qiblaDirection)}° from North`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(19,34,54,0.9) 0%, rgba(10,22,40,1) 100%)",
                border: "2px solid rgba(200,168,90,0.15)",
                transform: `rotate(${compassRotation}deg)`,
                transition: heading !== null ? "transform 0.3s ease-out" : "none",
              }}
            >
              {cardinalDirections.map((dir) => (
                <div
                  key={dir.label}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${dir.angle}deg) translateY(-120px)`,
                    transformOrigin: "0 0",
                  }}
                >
                  <span
                    className="text-sm font-bold block -translate-x-1/2 -translate-y-1/2"
                    style={{
                      color: dir.label === "N" ? "#C8A85A" : "#4A6278",
                      transform: `rotate(${-compassRotation - dir.angle}deg) translate(-50%, -50%)`,
                    }}
                  >
                    {dir.label}
                  </span>
                </div>
              ))}

              {Array.from({ length: 72 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2"
                  style={{
                    transform: `rotate(${i * 5}deg)`,
                    transformOrigin: "50% 144px",
                  }}
                >
                  <div
                    className="w-px mx-auto"
                    style={{
                      height: i % 18 === 0 ? "12px" : i % 6 === 0 ? "8px" : "4px",
                      background: i % 18 === 0 ? "rgba(200,168,90,0.55)" : i % 6 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `rotate(${heading !== null ? qiblaDirection - (heading || 0) : 0}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="absolute" style={{ top: "8px" }}>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#C8A85A", boxShadow: "0 0 10px rgba(200,168,90,0.6)" }} />
                  <div className="w-0.5 h-10" style={{ background: "linear-gradient(to bottom, #C8A85A, transparent)" }} />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#132236", border: "1px solid rgba(200,168,90,0.20)" }}
              >
                <p className="text-xs text-center font-arabic font-bold leading-tight text-gold-400">
                  الكعبة
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {permissionState === "unsupported" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-xl"
            style={{ background: "rgba(200,168,90,0.06)", border: "1px solid rgba(200,168,90,0.18)" }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gold-400 mb-1">
                  {language === "bn" ? "কম্পাস অনুপলব্ধ" : "Compass Unavailable"}
                </p>
                <p className="text-xs" style={{ color: "#8A9DB5" }}>
                  {language === "bn"
                    ? "আপনার ডিভাইস কম্পাস সেন্সর সমর্থন করে না। কিবলার দিক উত্তর থেকে " + Math.round(qiblaDirection) + "°।"
                    : `Your device doesn't support the compass sensor. The Qibla direction is ${Math.round(qiblaDirection)}° from North.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs" style={{ color: "#4A6070" }}>
            {language === "bn"
              ? "ফোনটি সমতলে রাখুন এবং কিবলার দিকে ঘুরুন"
              : "Hold your phone flat and rotate to face the Qibla"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
