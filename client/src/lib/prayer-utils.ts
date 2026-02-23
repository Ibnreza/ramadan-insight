import { Coordinates, PrayerTimes, CalculationMethod, Qibla } from "adhan";
import { format } from "date-fns";

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

export interface PrayerTimeData {
  name: string;
  time: Date;
  icon: "sun" | "moon";
}

export const DEFAULT_LOCATIONS: LocationData[] = [
  { name: "Chandpur, Bangladesh", latitude: 23.2332, longitude: 90.6712 },
  { name: "Dhaka, Bangladesh", latitude: 23.8103, longitude: 90.4125 },
  { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York, USA", latitude: 40.7128, longitude: -74.006 },
  { name: "Dubai, UAE", latitude: 25.2048, longitude: 55.2708 },
  { name: "Istanbul, Turkey", latitude: 41.0082, longitude: 28.9784 },
  { name: "Mecca, Saudi Arabia", latitude: 21.4225, longitude: 39.8262 },
  { name: "Chittagong, Bangladesh", latitude: 22.3569, longitude: 91.7832 },
  { name: "Sylhet, Bangladesh", latitude: 24.8949, longitude: 91.8687 },
  { name: "Rajshahi, Bangladesh", latitude: 24.3745, longitude: 88.6042 },
  { name: "Kuala Lumpur, Malaysia", latitude: 3.139, longitude: 101.6869 },
  { name: "Jakarta, Indonesia", latitude: -6.2088, longitude: 106.8456 },
  { name: "Cairo, Egypt", latitude: 30.0444, longitude: 31.2357 },
  { name: "Medina, Saudi Arabia", latitude: 24.4539, longitude: 39.6142 },
  { name: "Toronto, Canada", latitude: 43.6532, longitude: -79.3832 },
];

export function getPrayerTimes(location: LocationData, date: Date): PrayerTimeData[] {
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const params = CalculationMethod.Karachi();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return [
    { name: "Fajr", time: prayerTimes.fajr, icon: "moon" as const },
    { name: "Dhuhr", time: prayerTimes.dhuhr, icon: "sun" as const },
    { name: "Asr", time: prayerTimes.asr, icon: "sun" as const },
    { name: "Maghrib", time: prayerTimes.maghrib, icon: "moon" as const },
    { name: "Isha", time: prayerTimes.isha, icon: "moon" as const },
  ];
}

export function getSunrise(location: LocationData, date: Date): Date {
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const params = CalculationMethod.Karachi();
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  return prayerTimes.sunrise;
}

export function getSahariTime(location: LocationData, date: Date): Date {
  const prayerTimes = getPrayerTimes(location, date);
  return prayerTimes[0].time;
}

export function getIftarTime(location: LocationData, date: Date): Date {
  const prayerTimes = getPrayerTimes(location, date);
  return prayerTimes[3].time;
}

export function formatPrayerTime(date: Date): string {
  return format(date, "hh:mm a");
}

export function formatPrayerTimeShort(date: Date): string {
  return format(date, "HH:mm");
}

export function getNextPrayer(location: LocationData, now: Date): { name: string; time: Date; index: number } | null {
  const prayers = getPrayerTimes(location, now);
  for (let i = 0; i < prayers.length; i++) {
    if (prayers[i].time > now) {
      return { name: prayers[i].name, time: prayers[i].time, index: i };
    }
  }
  return null;
}

export function getQiblaDirection(location: LocationData): number {
  const coordinates = new Coordinates(location.latitude, location.longitude);
  return Qibla(coordinates);
}

export function getTimeDiff(target: Date, now: Date): { hours: number; minutes: number; seconds: number; total: number } {
  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { hours, minutes, seconds, total };
}
