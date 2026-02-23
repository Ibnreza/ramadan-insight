import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Flame, Award, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/app-context";
import { LocationHeader } from "@/components/location-header";
import { getIftarTime, getSahariTime, getTimeDiff, formatPrayerTime } from "@/lib/prayer-utils";
import { getRamadanDay, isRamadan, SUHOOR_DUA, IFTAR_DUA, BADGES } from "@/lib/ramadan-data";

export default function HomePage() {
  const { location, language, getFastingStreak, fastingLog, toggleFastingDay, totalDhikr, earnedBadges } = useAppContext();
  const [now, setNow] = useState(new Date());
  const [showIftar, setShowIftar] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date(now);
  const ramadanDay = getRamadanDay(today);
  const inRamadan = isRamadan(today);
  const dateStr = format(today, "dd MMM");
  const todayKey = format(today, "yyyy-MM-dd");

  const sahariTime = getSahariTime(location, today);
  const iftarTime = getIftarTime(location, today);

  const isAfterIftar = now > iftarTime;
  const isBeforeSahari = now < sahariTime;

  let countdownTarget: Date;
  let countdownLabel: string;
  let countdownLabelBn: string;

  if (isBeforeSahari) {
    countdownTarget = sahariTime;
    countdownLabel = "TIME UNTIL SAHARI";
    countdownLabelBn = "সাহরির সময় বাকি";
  } else if (isAfterIftar) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    countdownTarget = getSahariTime(location, tomorrow);
    countdownLabel = "TIME UNTIL SAHARI";
    countdownLabelBn = "সাহরির সময় বাকি";
  } else {
    countdownTarget = iftarTime;
    countdownLabel = "TIME UNTIL IFTAR";
    countdownLabelBn = "ইফতারের সময় বাকি";
  }

  const diff = getTimeDiff(countdownTarget, now);
  const totalDaySeconds = (iftarTime.getTime() - sahariTime.getTime()) / 1000;
  const elapsedSeconds = Math.max(0, (now.getTime() - sahariTime.getTime()) / 1000);
  const progress = Math.min(1, Math.max(0, elapsedSeconds / totalDaySeconds));

  const streak = getFastingStreak();
  const isFasting = fastingLog.includes(todayKey);

  const dua = showIftar ? IFTAR_DUA : SUHOOR_DUA;

  const unlockedBadges = BADGES.filter((b) => {
    if (b.type === "streak") return streak >= b.requirement;
    if (b.type === "tasbih") return totalDhikr >= b.requirement;
    return false;
  });

  return (
    <div className="min-h-screen pb-24 islamic-pattern">
      <LocationHeader />

      <div className="px-5 pt-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white tracking-tight" data-testid="text-ramadan-title">
            {language === "bn" ? "রমজান মুবারক" : "Ramadan Mubarak"}
          </h1>
          <p className="text-teal-400 text-sm font-medium mt-1" data-testid="text-ramadan-day">
            {inRamadan
              ? language === "bn"
                ? `দিন ${ramadanDay} • ${dateStr}`
                : `Day ${ramadanDay} • ${dateStr}`
              : language === "bn"
              ? "রমজান শীঘ্রই আসছে"
              : "Ramadan is coming soon"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 rounded-2xl p-5 relative overflow-visible"
          style={{
            background: "linear-gradient(135deg, #00B899 0%, #00E5C0 50%, #00B899 100%)",
          }}
          data-testid="card-countdown"
        >
          <div className="absolute inset-0 rounded-2xl animate-pulse-teal opacity-50" />
          <p className="text-center text-xs font-semibold text-white/80 tracking-widest uppercase mb-3 relative z-10">
            {language === "bn" ? countdownLabelBn : countdownLabel}
          </p>
          <div className="text-center relative z-10">
            <span
              className="text-5xl font-bold text-white tracking-wider tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums" }}
              data-testid="text-countdown"
            >
              {String(diff.hours).padStart(2, "0")}:{String(diff.minutes).padStart(2, "0")}:
              {String(diff.seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-4 relative z-10">
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/60 rounded-full"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 gap-2">
              <span className="text-xs text-white/70 font-medium" data-testid="text-sahari-time">
                {language === "bn" ? "সাহরি" : "Sahari"}: {formatPrayerTime(sahariTime)}
              </span>
              <span className="text-xs text-white/70 font-medium" data-testid="text-iftar-time">
                {language === "bn" ? "ইফতার" : "Iftar"}: {formatPrayerTime(iftarTime)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 flex items-center gap-3"
        >
          <button
            onClick={() => toggleFastingDay(todayKey)}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              isFasting
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                : "bg-white/5 text-white/60 border border-white/10"
            }`}
            data-testid="button-toggle-fasting"
          >
            {isFasting
              ? language === "bn"
                ? "✓ আজকের রোজা সম্পন্ন"
                : "✓ Fasted Today"
              : language === "bn"
              ? "আজকের রোজা লগ করুন"
              : "Log Today's Fast"}
          </button>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-white font-bold text-sm" data-testid="text-streak">{streak}</span>
          </div>
        </motion.div>

        {unlockedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4"
          >
            <h3 className="text-sm font-semibold text-white/60 mb-2">
              {language === "bn" ? "ব্যাজ" : "Badges"}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 border border-gold-500/20"
                  data-testid={`badge-${badge.id}`}
                >
                  <span className="text-sm">{badge.icon}</span>
                  <span className="text-xs font-medium text-gold-400">
                    {language === "bn" ? badge.nameBn : badge.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-lg font-bold text-white" data-testid="text-dua-section-title">
              {language === "bn" ? "দৈনিক দোয়া" : "Daily Duas"}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => setShowIftar(false)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  !showIftar ? "bg-teal-500/20 text-teal-400" : "text-white/40"
                }`}
                data-testid="button-dua-suhoor"
              >
                {language === "bn" ? "সাহরি" : "Suhoor"}
              </button>
              <button
                onClick={() => setShowIftar(true)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  showIftar ? "bg-teal-500/20 text-teal-400" : "text-white/40"
                }`}
                data-testid="button-dua-iftar"
              >
                {language === "bn" ? "ইফতার" : "Iftar"}
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl p-5 border border-white/5"
            style={{ background: "rgba(15, 21, 40, 0.8)" }}
            data-testid="card-dua"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-gold-400" />
              <h3 className="text-sm font-semibold text-white/90">
                {language === "bn" ? dua.titleBn : dua.title}
              </h3>
            </div>

            <p
              className="text-2xl leading-[2.2] text-teal-400 text-right font-arabic mb-4"
              dir="rtl"
              data-testid="text-dua-arabic"
            >
              {dua.arabic}
            </p>

            <p className="text-sm text-white/50 italic mb-3" data-testid="text-dua-transliteration">
              {dua.transliteration}
            </p>

            <p className="text-sm text-white/70 leading-relaxed" data-testid="text-dua-translation">
              {language === "bn" ? dua.bengali : dua.english}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 mb-4"
        >
          <div
            className="rounded-2xl p-4 border border-white/5 flex items-center gap-4"
            style={{ background: "rgba(15, 21, 40, 0.8)" }}
          >
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#00E5C0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(ramadanDay / 30) * 150.8} 150.8`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-teal-400">{Math.round((ramadanDay / 30) * 100)}%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {language === "bn" ? "রমজানের অগ্রগতি" : "Ramadan Progress"}
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                {language === "bn"
                  ? `${ramadanDay}/৩০ দিন সম্পন্ন`
                  : `${ramadanDay}/30 days completed`}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
