export type PlanetId =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "saturn"
  | "jupiter"
  | "rahu"
  | "venus";

export type Planet = {
  id: PlanetId;
  englishName: string;
  thaiName: string;
  symbol: string;
  durationYears: number;
  summary: string;
  tone: string;
};

export const planets: Record<PlanetId, Planet> = {
  sun: {
    id: "sun",
    englishName: "Sun",
    thaiName: "อาทิตย์",
    symbol: "๑",
    durationYears: 6,
    summary: "ช่วงของตัวตน ความชัดเจน บทบาท และความรับผิดชอบที่ต้องยืนด้วยตนเอง",
    tone: "from-amber-500 to-rose-500",
  },
  moon: {
    id: "moon",
    englishName: "Moon",
    thaiName: "จันทร์",
    symbol: "๒",
    durationYears: 15,
    summary: "ช่วงของความรู้สึก บ้าน ครอบครัว ความผูกพัน และการปรับตัวตามจังหวะชีวิต",
    tone: "from-sky-500 to-indigo-500",
  },
  mars: {
    id: "mars",
    englishName: "Mars",
    thaiName: "อังคาร",
    symbol: "๓",
    durationYears: 8,
    summary: "ช่วงของแรงผลักดัน การตัดสินใจ การแข่งขัน และการฝึกใช้พลังอย่างมีทิศทาง",
    tone: "from-red-500 to-orange-500",
  },
  mercury: {
    id: "mercury",
    englishName: "Mercury",
    thaiName: "พุธ",
    symbol: "๔",
    durationYears: 17,
    summary: "ช่วงของการเรียนรู้ การสื่อสาร เครือข่าย การค้า และการคิดอย่างยืดหยุ่น",
    tone: "from-emerald-500 to-teal-500",
  },
  saturn: {
    id: "saturn",
    englishName: "Saturn",
    thaiName: "เสาร์",
    symbol: "๗",
    durationYears: 10,
    summary: "ช่วงของวินัย โครงสร้าง ภาระ หน้าที่ และบทเรียนที่ค่อย ๆ สร้างความมั่นคง",
    tone: "from-stone-600 to-zinc-800",
  },
  jupiter: {
    id: "jupiter",
    englishName: "Jupiter",
    thaiName: "พฤหัส",
    symbol: "๕",
    durationYears: 19,
    summary: "ช่วงของครู ความหมาย ศรัทธา การขยายมุมมอง และโอกาสจากความเข้าใจที่ลึกขึ้น",
    tone: "from-cyan-600 to-blue-700",
  },
  rahu: {
    id: "rahu",
    englishName: "Rahu",
    thaiName: "ราหู",
    symbol: "๘",
    durationYears: 12,
    summary: "ช่วงของแรงปรารถนา การเปลี่ยนกรอบเดิม สิ่งไม่คุ้นเคย และการรู้เท่าทันความอยาก",
    tone: "from-violet-600 to-fuchsia-600",
  },
  venus: {
    id: "venus",
    englishName: "Venus",
    thaiName: "ศุกร์",
    symbol: "๖",
    durationYears: 21,
    summary: "ช่วงของความรัก คุณค่า ศิลปะ เงิน ความสัมพันธ์ และการเรียนรู้ความพอดี",
    tone: "from-pink-500 to-rose-600",
  },
};

export const planetCycle: PlanetId[] = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "saturn",
  "jupiter",
  "rahu",
  "venus",
];

export const thaiWeekdayNames = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
] as const;
