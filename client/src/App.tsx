import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/lib/app-context";
import { BottomNav } from "@/components/bottom-nav";
import HomePage from "@/pages/home";
import CalendarPage from "@/pages/calendar-page";
import PrayerTimesPage from "@/pages/prayer-times";
import TasbihPage from "@/pages/tasbih";
import QiblaPage from "@/pages/qibla";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/prayers" component={PrayerTimesPage} />
      <Route path="/tasbih" component={TasbihPage} />
      <Route path="/qibla" component={QiblaPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <div className="max-w-md mx-auto min-h-screen relative bg-background overflow-y-auto overflow-x-hidden" style={{ height: "100dvh" }}>
            <div className="pb-20">
              <Router />
            </div>
            <BottomNav />
          </div>
          <Toaster />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
