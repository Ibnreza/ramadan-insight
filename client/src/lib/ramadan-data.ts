export const RAMADAN_2026_START = new Date(2026, 1, 18);
export const RAMADAN_2026_END = new Date(2026, 2, 19);
export const RAMADAN_TOTAL_DAYS = 30;

export function getRamadanDay(date: Date): number {
  const start = new Date(RAMADAN_2026_START);
  start.setHours(0, 0, 0, 0);
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  const diffTime = current.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function isRamadan(date: Date): boolean {
  const day = getRamadanDay(date);
  return day >= 1 && day <= RAMADAN_TOTAL_DAYS;
}

export function getRamadanDate(dayNumber: number): Date {
  const date = new Date(RAMADAN_2026_START);
  date.setDate(date.getDate() + dayNumber - 1);
  return date;
}

export interface DuaData {
  title: string;
  titleBn: string;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
}

export const SUHOOR_DUA: DuaData = {
  title: "Suhoor Dua (Niyyah)",
  titleBn: "সাহরির দোয়া (নিয়্যত)",
  arabic: "نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللَّهُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
  transliteration: "Nawaitu an asuma ghadan min shahri Ramadanil mubaraki fardan laka ya Allahu fataqabbal minni innaka antas-sami'ul-'alim.",
  english: "I intend to fast tomorrow from the blessed month of Ramadan as an obligation to You, O Allah, so accept it from me. Indeed, You are the All-Hearing, the All-Knowing.",
  bengali: "আমি আগামীকাল পবিত্র রমজান মাসের ফরজ রোজা রাখার নিয়ত করছি, হে আল্লাহ, আমার পক্ষ থেকে কবুল করুন। নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞ।",
};

export const IFTAR_DUA: DuaData = {
  title: "Iftar Dua",
  titleBn: "ইফতারের দোয়া",
  arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
  transliteration: "Allahumma inni laka sumtu wa bika aamantu wa alayka tawakkaltu wa ala rizqika aftartu.",
  english: "O Allah, I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance.",
  bengali: "হে আল্লাহ, আমি আপনার জন্য রোজা রেখেছি এবং আপনার প্রতি ঈমান এনেছি এবং আপনার উপর ভরসা করেছি এবং আপনার রিযিক দিয়ে ইফতার করছি।",
};

export interface DhikrPreset {
  id: string;
  name: string;
  nameBn: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  meaningBn: string;
  defaultGoal: number;
}

export const DHIKR_PRESETS: DhikrPreset[] = [
  {
    id: "subhanallah",
    name: "SubhanAllah",
    nameBn: "সুবহানাল্লাহ",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    transliteration: "SubhanAllah",
    meaning: "Glory be to Allah",
    meaningBn: "আল্লাহর মহিমা",
    defaultGoal: 33,
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    nameBn: "আলহামদুলিল্লাহ",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    transliteration: "Alhamdulillah",
    meaning: "Praise be to Allah",
    meaningBn: "আল্লাহর প্রশংসা",
    defaultGoal: 33,
  },
  {
    id: "allahuakbar",
    name: "Allahu Akbar",
    nameBn: "আল্লাহু আকবার",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    meaning: "Allah is the Greatest",
    meaningBn: "আল্লাহ সর্বশ্রেষ্ঠ",
    defaultGoal: 33,
  },
  {
    id: "allah",
    name: "Allah",
    nameBn: "আল্লাহ",
    arabic: "ٱللَّٰهُ",
    transliteration: "Allah",
    meaning: "Allah",
    meaningBn: "আল্লাহ",
    defaultGoal: 99,
  },
  {
    id: "astaghfirullah",
    name: "Astaghfirullah",
    nameBn: "আস্তাগফিরুল্লাহ",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    transliteration: "Astaghfirullah",
    meaning: "I seek forgiveness from Allah",
    meaningBn: "আমি আল্লাহর কাছে ক্ষমা চাই",
    defaultGoal: 100,
  },
  {
    id: "lailahaillallah",
    name: "La ilaha illallah",
    nameBn: "লা ইলাহা ইল্লাল্লাহ",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    transliteration: "La ilaha illallah",
    meaning: "None worthy of worship but Allah",
    meaningBn: "আল্লাহ ছাড়া কোন উপাস্য নেই",
    defaultGoal: 100,
  },
  {
    id: "subhanallahi_wabihamdihi",
    name: "SubhanAllahi wa bihamdihi",
    nameBn: "সুবহানাল্লাহি ওয়া বিহামদিহি",
    arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi",
    meaning: "Glory be to Allah and His is the praise",
    meaningBn: "আল্লাহর পবিত্রতা ও তাঁর প্রশংসা",
    defaultGoal: 100,
  },
  {
    id: "subhanallahil_azeem",
    name: "SubhanAllahil Azeem",
    nameBn: "সুবহানাল্লাহিল আযীম",
    arabic: "سُبْحَانَ ٱللَّٰهِ ٱلْعَظِيمِ",
    transliteration: "SubhanAllahil Azeem",
    meaning: "Glory be to Allah, the Supreme",
    meaningBn: "আল্লাহর পবিত্রতা, যিনি মহান",
    defaultGoal: 33,
  },
  {
    id: "lahawla",
    name: "La hawla wala quwwata",
    nameBn: "লা হাওলা ওয়ালা কুওয়াতা",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
    transliteration: "La hawla wala quwwata illa billah",
    meaning: "There is no power except with Allah",
    meaningBn: "আল্লাহর সাহায্য ছাড়া কোন শক্তি নেই",
    defaultGoal: 33,
  },
  {
    id: "hasbunallah",
    name: "HasbunAllahu wa ni'mal wakeel",
    nameBn: "হাসবুনাল্লাহু ওয়া নি'মাল ওয়াকীল",
    arabic: "حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ",
    transliteration: "HasbunAllahu wa ni'mal wakeel",
    meaning: "Sufficient for us is Allah, and He is the best disposer of affairs",
    meaningBn: "আল্লাহই আমাদের জন্য যথেষ্ট, এবং তিনি সর্বোত্তম কর্মবিধায়ক",
    defaultGoal: 33,
  },
  {
    id: "bismillah",
    name: "Bismillah",
    nameBn: "বিসমিল্লাহ",
    arabic: "بِسْمِ ٱللَّٰهِ",
    transliteration: "Bismillah",
    meaning: "In the name of Allah",
    meaningBn: "আল্লাহর নামে",
    defaultGoal: 33,
  },
  {
    id: "salawat",
    name: "Salawat on Prophet ﷺ",
    nameBn: "দরূদ শরীফ",
    arabic: "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli ala Muhammadin wa ala aali Muhammad",
    meaning: "O Allah, send blessings upon Muhammad and upon the family of Muhammad",
    meaningBn: "হে আল্লাহ, মুহাম্মদ ও তাঁর পরিবারের উপর রহমত বর্ষণ করুন",
    defaultGoal: 100,
  },
  {
    id: "ya_rabbi",
    name: "Ya Rabbi",
    nameBn: "ইয়া রব্বী",
    arabic: "يَا رَبِّ",
    transliteration: "Ya Rabbi",
    meaning: "O my Lord",
    meaningBn: "হে আমার প্রভু",
    defaultGoal: 33,
  },
  {
    id: "tasbeeh_complete",
    name: "Complete Tasbeeh",
    nameBn: "সম্পূর্ণ তাসবীহ",
    arabic: "سُبْحَانَ ٱللَّٰهِ وَٱلْحَمْدُ لِلَّٰهِ وَلَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَٱللَّٰهُ أَكْبَرُ",
    transliteration: "SubhanAllah wal Hamdulillah wa La ilaha illallah wallahu Akbar",
    meaning: "Glory be to Allah, praise be to Allah, none worthy of worship but Allah, Allah is the Greatest",
    meaningBn: "আল্লাহর পবিত্রতা, আল্লাহর প্রশংসা, আল্লাহ ছাড়া কোন উপাস্য নেই, আল্লাহ সর্বশ্রেষ্ঠ",
    defaultGoal: 33,
  },
  {
    id: "rabbana",
    name: "Rabbana atina",
    nameBn: "রাব্বানা আতিনা",
    arabic: "رَبَّنَا آتِنَا فِي ٱلدُّنْيَا حَسَنَةً وَفِي ٱلْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar",
    meaning: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire",
    meaningBn: "হে আমাদের প্রভু, আমাদের দুনিয়ায় কল্যাণ দান করুন এবং আখিরাতেও কল্যাণ দান করুন এবং আমাদের জাহান্নামের আযাব থেকে রক্ষা করুন",
    defaultGoal: 33,
  },
  {
    id: "ya_hayyu",
    name: "Ya Hayyu Ya Qayyum",
    nameBn: "ইয়া হাইয়্যু ইয়া কাইয়্যূম",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    transliteration: "Ya Hayyu Ya Qayyum birahmatika astaghithu",
    meaning: "O Ever-Living, O Self-Sustaining, I seek help through Your mercy",
    meaningBn: "হে চিরঞ্জীব, হে চিরবিরাজমান, আপনার রহমতের মাধ্যমে আমি সাহায্য চাই",
    defaultGoal: 33,
  },
];

export interface Badge {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  requirement: number;
  type: "streak" | "tasbih" | "prayer";
}

export const BADGES: Badge[] = [
  { id: "first_fast", name: "First Fast", nameBn: "প্রথম রোজা", description: "Complete your first fast", descriptionBn: "আপনার প্রথম রোজা সম্পন্ন করুন", icon: "🌙", requirement: 1, type: "streak" },
  { id: "week_warrior", name: "Week Warrior", nameBn: "সপ্তাহের যোদ্ধা", description: "7-day fasting streak", descriptionBn: "৭ দিনের রোজার ধারা", icon: "⭐", requirement: 7, type: "streak" },
  { id: "halfway", name: "Halfway Hero", nameBn: "অর্ধেক পথ", description: "15-day fasting streak", descriptionBn: "১৫ দিনের রোজার ধারা", icon: "🏆", requirement: 15, type: "streak" },
  { id: "ramadan_complete", name: "Ramadan Champion", nameBn: "রমজান চ্যাম্পিয়ন", description: "Complete all 30 fasts", descriptionBn: "সকল ৩০টি রোজা সম্পন্ন করুন", icon: "👑", requirement: 30, type: "streak" },
  { id: "tasbih_100", name: "Tasbih Starter", nameBn: "তাসবীহ শুরু", description: "Complete 100 total dhikr", descriptionBn: "মোট ১০০ যিকির সম্পন্ন করুন", icon: "📿", requirement: 100, type: "tasbih" },
  { id: "tasbih_1000", name: "Dhikr Master", nameBn: "যিকিরের মাস্টার", description: "Complete 1000 total dhikr", descriptionBn: "মোট ১০০০ যিকির সম্পন্ন করুন", icon: "✨", requirement: 1000, type: "tasbih" },
];
