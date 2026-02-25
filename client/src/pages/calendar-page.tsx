import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/app-context";
import { LocationHeader } from "@/components/location-header";
import { getSahariTime, getIftarTime, formatPrayerTimeShort } from "@/lib/prayer-utils";
import { getRamadanDay, getRamadanDate, RAMADAN_TOTAL_DAYS } from "@/lib/ramadan-data";

export default function CalendarPage() {
  const { location, language } = useAppContext();
  const today = new Date();
  const currentDay = getRamadanDay(today);

  const days = Array.from({ length: RAMADAN_TOTAL_DAYS }, (_, i) => {
    const dayNum = i + 1;
    const date = getRamadanDate(dayNum);
    const sahari = getSahariTime(location, date);
    const iftar = getIftarTime(location, date);
    const isToday = dayNum === currentDay;
    return { dayNum, date, sahari, iftar, isToday };
  });

  return (
    <div className="min-h-screen pb-24 islamic-pattern">
      <LocationHeader />

      <div className="px-5 pt-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-5"
          style={{ color: "#F0EBE0" }}
          data-testid="text-calendar-title"
        >
          {language === "bn" ? "রমজান ক্যালেন্ডার" : "Ramadan Calendar"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(10,22,40,0.50)", border: "1px solid rgba(200,168,90,0.10)" }}
        >
          <div className="grid grid-cols-4 px-4 py-3 border-b border-white/5" style={{ background: "rgba(200,168,90,0.04)" }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#4A6070" }}>
              {language === "bn" ? "দিন" : "Day"}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-center" style={{ color: "#4A6070" }}>
              {language === "bn" ? "তারিখ" : "Date"}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-center" style={{ color: "#4A6070" }}>
              {language === "bn" ? "সাহরি" : "Sahari"}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "#4A6070" }}>
              {language === "bn" ? "ইফতার" : "Iftar"}
            </span>
          </div>

          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            {days.map((day, i) => (
              <motion.div
                key={day.dayNum}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.02 * i }}
                className="grid grid-cols-4 items-center px-4 py-3.5 border-b border-white/[0.03]"
                style={day.isToday ? { background: "rgba(200,168,90,0.08)" } : undefined}
                data-testid={`row-calendar-day-${day.dayNum}`}
              >
                <div className="flex items-center gap-2">
                  {day.isToday ? (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#C8A85A" }}>
                      <span className="text-xs font-bold" style={{ color: "#0A1628" }}>{day.dayNum}</span>
                    </div>
                  ) : (
                    <span className="text-sm w-7 text-center" style={{ color: "#4A6070" }}>{day.dayNum}</span>
                  )}
                </div>
                <span
                  className="text-sm text-center"
                  style={{ color: day.isToday ? "#F0EBE0" : "#8A9DB5", fontWeight: day.isToday ? 600 : 400 }}
                >
                  {format(day.date, "dd MMM")}
                </span>
                <span
                  className="text-sm text-center tabular-nums"
                  style={{ color: day.isToday ? "#F0EBE0" : "#8A9DB5" }}
                >
                  {formatPrayerTimeShort(day.sahari)}
                </span>
                <span
                  className="text-sm text-right tabular-nums font-semibold"
                  style={{ color: day.isToday ? "#C8A85A" : "rgba(200,168,90,0.55)" }}
                >
                  {formatPrayerTimeShort(day.iftar)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
