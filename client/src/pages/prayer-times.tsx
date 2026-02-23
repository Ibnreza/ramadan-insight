import { useState, useEffect } from "react";
import { Sun, Moon, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/app-context";
import { LocationHeader } from "@/components/location-header";
import { getPrayerTimes, getNextPrayer, formatPrayerTime, getTimeDiff } from "@/lib/prayer-utils";

export default function PrayerTimesPage() {
  const { location, language } = useAppContext();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const prayers = getPrayerTimes(location, now);
  const nextPrayer = getNextPrayer(location, now);

  const prayerNamesBn: Record<string, string> = {
    Fajr: "ফজর",
    Dhuhr: "যোহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "ইশা",
  };

  return (
    <div className="min-h-screen pb-24 islamic-pattern">
      <LocationHeader />

      <div className="px-5 pt-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
          data-testid="text-prayer-title"
        >
          {language === "bn" ? "নামাজের সময়" : "Prayer Times"}
        </motion.h1>

        {nextPrayer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 rounded-2xl p-4 border border-teal-500/20"
            style={{ background: "rgba(0, 229, 192, 0.06)" }}
            data-testid="card-next-prayer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-teal-400/70 font-medium uppercase tracking-wider">
                  {language === "bn" ? "পরবর্তী নামাজ" : "Next Prayer"}
                </p>
                <p className="text-lg font-bold text-white">
                  {language === "bn" ? prayerNamesBn[nextPrayer.name] : nextPrayer.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">
                  {language === "bn" ? "বাকি" : "in"}
                </p>
                <p className="text-lg font-bold text-teal-400 tabular-nums" data-testid="text-next-prayer-countdown">
                  {(() => {
                    const d = getTimeDiff(nextPrayer.time, now);
                    return `${String(d.hours).padStart(2, "0")}:${String(d.minutes).padStart(2, "0")}:${String(d.seconds).padStart(2, "0")}`;
                  })()}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {prayers.map((prayer, i) => {
            const isNext = nextPrayer?.index === i;
            const isPast = prayer.time < now && !isNext;
            const Icon = prayer.icon === "sun" ? Sun : Moon;

            return (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.15 }}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl border transition-all ${
                  isNext
                    ? "bg-teal-500/10 border-teal-500/20"
                    : "border-white/5"
                } ${isPast ? "opacity-50" : ""}`}
                style={{ background: isNext ? "rgba(0, 229, 192, 0.06)" : "rgba(15, 21, 40, 0.5)" }}
                data-testid={`card-prayer-${prayer.name.toLowerCase()}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isNext ? "bg-teal-500/20" : "bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isNext ? "text-teal-400" : prayer.icon === "sun" ? "text-gold-400" : "text-white/40"
                    }`}
                  />
                </div>
                <span
                  className={`flex-1 font-semibold ${
                    isNext ? "text-teal-400" : "text-white/80"
                  }`}
                >
                  {language === "bn" ? prayerNamesBn[prayer.name] : prayer.name}
                </span>
                <span
                  className={`text-base tabular-nums font-semibold ${
                    isNext ? "text-teal-400" : "text-white/60"
                  }`}
                  data-testid={`text-prayer-time-${prayer.name.toLowerCase()}`}
                >
                  {formatPrayerTime(prayer.time)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
