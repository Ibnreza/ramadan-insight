import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { LocationData } from "./prayer-utils";
import { DEFAULT_LOCATIONS } from "./prayer-utils";

interface TasbihEntry {
  date: string;
  dhikrId: string;
  count: number;
}

interface AppState {
  location: LocationData;
  language: "en" | "bn";
  fastingLog: string[];
  tasbihHistory: TasbihEntry[];
  totalDhikr: number;
  earnedBadges: string[];
}

interface AppContextType extends AppState {
  setLocation: (location: LocationData) => void;
  setLanguage: (lang: "en" | "bn") => void;
  toggleFastingDay: (dateStr: string) => void;
  addTasbihEntry: (entry: TasbihEntry) => void;
  getFastingStreak: () => number;
  isFastingDay: (dateStr: string) => boolean;
  earnBadge: (badgeId: string) => void;
}

const STORAGE_KEY = "ramadan_app_state";

function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return {
    location: DEFAULT_LOCATIONS[0],
    language: "en",
    fastingLog: [],
    tasbihHistory: [],
    totalDhikr: 0,
    earnedBadges: [],
  };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setLocation = useCallback((location: LocationData) => {
    setState((s) => ({ ...s, location }));
  }, []);

  const setLanguage = useCallback((language: "en" | "bn") => {
    setState((s) => ({ ...s, language }));
  }, []);

  const toggleFastingDay = useCallback((dateStr: string) => {
    setState((s) => {
      const exists = s.fastingLog.includes(dateStr);
      const fastingLog = exists
        ? s.fastingLog.filter((d) => d !== dateStr)
        : [...s.fastingLog, dateStr];
      return { ...s, fastingLog };
    });
  }, []);

  const addTasbihEntry = useCallback((entry: TasbihEntry) => {
    setState((s) => ({
      ...s,
      tasbihHistory: [...s.tasbihHistory, entry],
      totalDhikr: s.totalDhikr + entry.count,
    }));
  }, []);

  const getFastingStreak = useCallback((): number => {
    if (state.fastingLog.length === 0) return 0;
    const sorted = [...state.fastingLog].sort();
    let streak = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      const current = new Date(sorted[i]);
      const prev = new Date(sorted[i - 1]);
      const diffDays = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diffDays) === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [state.fastingLog]);

  const isFastingDay = useCallback(
    (dateStr: string): boolean => {
      return state.fastingLog.includes(dateStr);
    },
    [state.fastingLog]
  );

  const earnBadge = useCallback((badgeId: string) => {
    setState((s) => {
      if (s.earnedBadges.includes(badgeId)) return s;
      return { ...s, earnedBadges: [...s.earnedBadges, badgeId] };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLocation,
        setLanguage,
        toggleFastingDay,
        addTasbihEntry,
        getFastingStreak,
        isFastingDay,
        earnBadge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
