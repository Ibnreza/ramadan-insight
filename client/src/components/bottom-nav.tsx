import { useLocation, Link } from "wouter";
import { Home, Calendar, Clock, Circle, Compass } from "lucide-react";
import { useAppContext } from "@/lib/app-context";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", labelBn: "হোম", icon: Home },
  { path: "/calendar", label: "Calendar", labelBn: "ক্যালেন্ডার", icon: Calendar },
  { path: "/prayers", label: "Prayers", labelBn: "নামাজ", icon: Clock },
  { path: "/qibla", label: "Qibla", labelBn: "কিবলা", icon: Compass },
  { path: "/tasbih", label: "Tasbih", labelBn: "তাসবীহ", icon: Circle },
];

export function BottomNav() {
  const [location] = useLocation();
  const { language } = useAppContext();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5"
      style={{ background: "rgba(10, 15, 30, 0.95)", backdropFilter: "blur(20px)" }}
      data-testid="nav-bottom"
    >
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <button
                className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-teal-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-teal-400" : "text-white/40"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-teal-400" : "text-white/40"
                  }`}
                >
                  {language === "bn" ? item.labelBn : item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
