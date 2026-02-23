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
          className="text-2xl font-bold text-white mb-5"
          data-testid="text-calendar-title"
        >
          {language === "bn" ? "রমজান ক্যালেন্ডার" : "Ramadan Calendar"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 overflow-hidden"
          style={{ background: "rgba(10, 15, 30, 0.4)" }}
        >
          <div className="grid grid-cols-4 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">
              {language === "bn" ? "দিন" : "Day"}
            </span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider text-center">
              {language === "bn" ? "তারিখ" : "Date"}
            </span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider text-center">
              {language === "bn" ? "সাহরি" : "Sahari"}
            </span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider text-right">
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
                className={`grid grid-cols-4 items-center px-4 py-3.5 border-b border-white/[0.03] ${
                  day.isToday ? "bg-teal-500/10" : ""
                }`}
                data-testid={`row-calendar-day-${day.dayNum}`}
              >
                <div className="flex items-center gap-2">
                  {day.isToday ? (
                    <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-navy-300">{day.dayNum}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-white/50 w-7 text-center">{day.dayNum}</span>
                  )}
                </div>
                <span className={`text-sm text-center ${day.isToday ? "text-white font-semibold" : "text-white/70"}`}>
                  {format(day.date, "dd MMM")}
                </span>
                <span className={`text-sm text-center tabular-nums ${day.isToday ? "text-white" : "text-white/60"}`}>
                  {formatPrayerTimeShort(day.sahari)}
                </span>
                <span
                  className={`text-sm text-right tabular-nums font-semibold ${
                    day.isToday ? "text-teal-400" : "text-teal-500/80"
                  }`}
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
