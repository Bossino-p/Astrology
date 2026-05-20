import {
  addDays,
  addYears,
  differenceInCalendarDays,
  format,
  isBefore,
  isEqual,
  parseISO,
} from "date-fns";
import { PlanetId, planetCycle, planets, thaiWeekdayNames } from "../data/planets";

export type WednesdayMode = "day" | "night";

export type TimelinePeriod = {
  id: string;
  planetId: PlanetId;
  startAge: number;
  endAge: number;
  durationYears: number;
  startDate: Date;
  endDate: Date;
  startYear: number;
  endYear: number;
  themeSummary: string;
};

export type SubPeriod = {
  id: string;
  majorPlanetId: PlanetId;
  planetId: PlanetId;
  startOffsetYears: number;
  endOffsetYears: number;
  startDate: Date;
  endDate: Date;
  durationYears: number;
  themeSummary: string;
};

export type SubPeriodInterpretation = {
  title: string;
  theme: string;
  mayShowUp: string[];
  watchouts: string[];
  reflectionQuestion: string;
};

type PlanetInterpretationProfile = {
  title: string;
  background: string;
  flavor: string;
  mayShowUp: string[];
  watchouts: string[];
  questionFocus: string;
};

const interpretationProfiles: Record<PlanetId, PlanetInterpretationProfile> = {
  sun: {
    title: "Identity and direction",
    background: "ตัวตน บทบาท ความรับผิดชอบ และการยืนในพื้นที่ของตัวเอง",
    flavor: "ความชัดเจน การตัดสินใจ และภาพลักษณ์ส่วนตัว",
    mayShowUp: [
      "อาจเด่นเรื่องบทบาทใหม่ ความเป็นผู้นำ หรือการประกาศจุดยืน",
      "เหมาะกับการทบทวนเป้าหมายและสิ่งที่อยากรับผิดชอบจริง ๆ",
      "อาจมีสถานการณ์ที่ต้องเลือกด้วยความมั่นใจมากขึ้น",
    ],
    watchouts: [
      "ควรระวังการยึดอัตตาหรืออยากควบคุมภาพลักษณ์มากเกินไป",
      "ควรระวังการตัดสินใจเร็วเพราะอยากพิสูจน์ตัวเอง",
      "ควรระวังการแบกรับบทบาทที่ไม่ใช่ของเรา",
    ],
    questionFocus: "ผมกำลังเลือกจากความชัดเจน หรือจากความอยากถูกยอมรับ?",
  },
  moon: {
    title: "Emotional tides",
    background: "ความรู้สึก บ้าน ครอบครัว ความปลอดภัย และความผูกพัน",
    flavor: "การปรับตัว ความอ่อนไหว และความต้องการด้านใจ",
    mayShowUp: [
      "อาจเด่นเรื่องครอบครัว บ้าน ความทรงจำ หรือความสัมพันธ์ใกล้ตัว",
      "เหมาะกับการฟังความรู้สึกและดูแลระบบสนับสนุนในชีวิต",
      "อาจมีจังหวะที่อารมณ์หรือความต้องการเปลี่ยนเร็ว",
    ],
    watchouts: [
      "ควรระวังการตัดสินใจจากอารมณ์ชั่วขณะ",
      "ควรระวังการผูกคุณค่าตัวเองกับการตอบสนองของคนใกล้ตัว",
      "ควรระวังการหนีความจริงเพราะอยากรักษาความสบายใจ",
    ],
    questionFocus: "ความรู้สึกนี้กำลังบอกความต้องการอะไรที่ผมยังไม่ได้ดูแล?",
  },
  mars: {
    title: "Action and friction",
    background: "แรงผลักดัน การแข่งขัน การลงมือ และความกล้าที่จะตัดสินใจ",
    flavor: "พลังปะทะ ความเร็ว และการฝึกใช้แรงอย่างมีทิศทาง",
    mayShowUp: [
      "อาจเด่นเรื่องการเริ่มต้น การแข่งขัน งานเร่ง หรือการปกป้องขอบเขต",
      "เหมาะกับการลงมือกับเรื่องที่ค้างและต้องใช้วินัยทางกายใจ",
      "อาจมีแรงกดดันที่ทำให้เห็นความต้องการแท้จริงชัดขึ้น",
    ],
    watchouts: [
      "ควรระวังความใจร้อนและการตอบโต้ทันที",
      "ควรระวังการใช้พลังจนหมดแรงหรือทำให้ความสัมพันธ์ตึงเกินไป",
      "ควรระวังการมองทุกอย่างเป็นสนามแข่งขัน",
    ],
    questionFocus: "พลังนี้ควรถูกใช้เพื่อสร้างอะไร ไม่ใช่เพื่อชนะใคร?",
  },
  mercury: {
    title: "Learning and exchange",
    background: "การเรียนรู้ การสื่อสาร เครือข่าย การค้า และการเชื่อมข้อมูล",
    flavor: "ความคิดยืดหยุ่น การเจรจา และการทดลองหลายทาง",
    mayShowUp: [
      "อาจเด่นเรื่องการเรียน ทักษะใหม่ งานสื่อสาร หรือ network",
      "เหมาะกับการจัดระบบความคิด เขียน พูด คุย หรือทดสอบสมมติฐาน",
      "อาจมีข้อมูลใหม่ที่ทำให้ต้องปรับแผน",
    ],
    watchouts: [
      "ควรระวังข้อมูลเยอะจนตัดสินใจไม่ได้",
      "ควรระวังการพูดเร็ว รับปากเร็ว หรือเปลี่ยนใจบ่อยเกินจำเป็น",
      "ควรระวังการฉลาดกับรายละเอียดแต่หลุดจากภาพใหญ่",
    ],
    questionFocus: "ข้อมูลไหนสำคัญจริง และข้อมูลไหนแค่ทำให้ผมยุ่งขึ้น?",
  },
  saturn: {
    title: "Structure and maturity",
    background: "วินัย ภาระ หน้าที่ ขอบเขต และการสร้างฐานที่มั่นคง",
    flavor: "ความจริงจัง ความอดทน และบทเรียนระยะยาว",
    mayShowUp: [
      "อาจเด่นเรื่องงานหนัก โครงสร้างชีวิต ภาระ หรือข้อจำกัดที่ต้องจัดการ",
      "เหมาะกับการวางระบบ ตัดสิ่งฟุ่มเฟือย และทำสิ่งเล็ก ๆ อย่างสม่ำเสมอ",
      "อาจมีบททดสอบที่ช่วยให้เห็นความรับผิดชอบชัดขึ้น",
    ],
    watchouts: [
      "ควรระวังความกลัว ความตึง หรือการโทษตัวเองมากเกินไป",
      "ควรระวังการอยู่กับภาระโดยไม่ขอความช่วยเหลือ",
      "ควรระวังการตีความความช้าเป็นความล้มเหลว",
    ],
    questionFocus: "โครงสร้างไหนช่วยให้ผมโต และโครงสร้างไหนแค่ทำให้ผมกลัว?",
  },
  jupiter: {
    title: "Growth and meaning",
    background: "การขยายตัว ความหมาย ครู ความเชื่อ โอกาส และมุมมองที่กว้างขึ้น",
    flavor: "การเรียนรู้ภาพใหญ่ ความศรัทธา และการเปิดพื้นที่ใหม่",
    mayShowUp: [
      "อาจเด่นเรื่องครู การศึกษา ความรู้ โอกาส หรือการเดินทางเชิงความหมาย",
      "เหมาะกับการขยายวิสัยทัศน์และทบทวนระบบความเชื่อ",
      "อาจมีคนหรือประสบการณ์ที่ช่วยเปิดมุมมองใหม่",
    ],
    watchouts: [
      "ควรระวัง overconfidence หรือคิดว่าภาพใหญ่ชัดกว่าความจริง",
      "ควรระวังการให้คำมั่นมากเกิน capacity",
      "ควรระวังการใช้ความเชื่อแทนการตรวจสอบ",
    ],
    questionFocus: "การขยายครั้งนี้มีฐานรองรับพอหรือยัง?",
  },
  rahu: {
    title: "Uncertainty and desire",
    background: "แรงปรารถนา ความไม่คุ้นเคย การเปลี่ยนกรอบ และพื้นที่ที่ยังไม่ชัด",
    flavor: "ความผันผวน สิ่งนอกกรอบ online ต่างประเทศ หรือ network ใหม่",
    mayShowUp: [
      "อาจเด่นเรื่องออนไลน์ ต่างประเทศ network ใหม่ หรือทางเลือกที่ไม่ conventional",
      "อาจมีการเปลี่ยนทิศทางเร็วและแรงดึงดูดต่อสิ่งใหม่",
      "เหมาะกับการทดลองอย่างมีขอบเขตและตรวจสอบ narrative ที่พาเราไป",
    ],
    watchouts: [
      "ควรระวังการเชื่อ narrative ง่ายเกินไป",
      "ควรระวังการรับความเสี่ยงเกิน capacity",
      "ควรระวังความอยากที่ทำให้มองข้ามสัญญาณเตือน",
    ],
    questionFocus: "นี่คือโอกาสจริง หรือผมกำลังถูก narrative พาไป?",
  },
  venus: {
    title: "Value and connection",
    background: "ความรัก คุณค่า ความสัมพันธ์ เงิน ความงาม และความพอดี",
    flavor: "การเลือกสิ่งที่มีคุณค่า การประนีประนอม และรสนิยมชีวิต",
    mayShowUp: [
      "อาจเด่นเรื่องความสัมพันธ์ เงิน งานสร้างสรรค์ หรือการดูแลคุณภาพชีวิต",
      "เหมาะกับการถามว่าชีวิตแบบไหนที่รู้สึกมีคุณค่าและพอดี",
      "อาจมีจังหวะที่ต้องเจรจาความต้องการของตัวเองกับคนอื่น",
    ],
    watchouts: [
      "ควรระวังการตามใจตัวเองจนเสียสมดุล",
      "ควรระวังการยอมมากเกินไปเพื่อรักษาความราบรื่น",
      "ควรระวังการประเมินคุณค่าจากความพอใจระยะสั้น",
    ],
    questionFocus: "สิ่งที่ผมเลือกตอนนี้สะท้อนคุณค่าจริง หรือแค่ความสบายชั่วคราว?",
  },
};

export function getSubPeriodInterpretation(
  majorPlanetKey: PlanetId,
  subPlanetKey: PlanetId,
): SubPeriodInterpretation {
  const major = interpretationProfiles[majorPlanetKey];
  const sub = interpretationProfiles[subPlanetKey];

  if (majorPlanetKey === "jupiter" && subPlanetKey === "rahu") {
    return {
      title: "Growth under uncertainty",
      theme: "ช่วงที่การขยายตัวมาพร้อมความผันผวน",
      mayShowUp: [
        "อาจเด่นเรื่องโอกาสจากออนไลน์ ต่างประเทศ หรือ network ใหม่",
        "อาจมีการเปลี่ยนทิศทางเร็ว",
        "อาจสนใจเรื่องใหญ่ เสี่ยง หรือไม่ conventional มากขึ้น",
      ],
      watchouts: [
        "ควรระวัง overconfidence",
        "ควรระวังการเชื่อ narrative ง่ายเกินไป",
        "ควรระวังการรับความเสี่ยงเกิน capacity",
      ],
      reflectionQuestion: "นี่คือโอกาสจริง หรือผมกำลังถูก narrative พาไป?",
    };
  }

  return {
    title: `${major.title} / ${sub.title}`,
    theme: `พื้นหลังของช่วงนี้เกี่ยวกับ${major.background} โดยรสชาติที่ทำงานเด่นอาจเป็น${sub.flavor}`,
    mayShowUp: sub.mayShowUp,
    watchouts: sub.watchouts,
    reflectionQuestion: sub.questionFocus,
  };
}

export function parseBirthDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getWeekdayLabel(date: Date): string {
  return thaiWeekdayNames[date.getDay()];
}

export function getStartingPlanet(date: Date, wednesdayMode: WednesdayMode): PlanetId {
  const day = date.getDay();

  if (day === 0) return "sun";
  if (day === 1) return "moon";
  if (day === 2) return "mars";
  if (day === 3) return wednesdayMode === "night" ? "rahu" : "mercury";
  if (day === 4) return "jupiter";
  if (day === 5) return "venus";
  return "saturn";
}

export function getCycleFrom(startPlanetId: PlanetId): PlanetId[] {
  const startIndex = planetCycle.indexOf(startPlanetId);
  return [...planetCycle.slice(startIndex), ...planetCycle.slice(0, startIndex)];
}

export function generateMajorPeriods(
  birthDate: Date,
  startPlanetId: PlanetId,
): TimelinePeriod[] {
  const orderedPlanets = getCycleFrom(startPlanetId);
  const periods: TimelinePeriod[] = [];
  let startAge = 0;
  let index = 0;

  while (startAge < 108) {
    const planetId = orderedPlanets[index % orderedPlanets.length];
    const durationYears = Math.min(planets[planetId].durationYears, 108 - startAge);
    const endAge = startAge + durationYears;
    const startDate = addYears(birthDate, startAge);
    const endDate = addYears(birthDate, endAge);

    periods.push({
      id: `${planetId}-${startAge}-${endAge}`,
      planetId,
      startAge,
      endAge,
      durationYears,
      startDate,
      endDate,
      startYear: startDate.getFullYear(),
      endYear: endDate.getFullYear(),
      themeSummary: planets[planetId].summary,
    });

    startAge = endAge;
    index += 1;
  }

  return periods;
}

export function generateSubPeriods(majorPeriod: TimelinePeriod): SubPeriod[] {
  const orderedPlanets = getCycleFrom(majorPeriod.planetId);
  const majorDurationDays = differenceInCalendarDays(
    majorPeriod.endDate,
    majorPeriod.startDate,
  );
  let elapsedRatio = 0;

  return orderedPlanets.map((planetId, index) => {
    const subDurationYears =
      (majorPeriod.durationYears * planets[planetId].durationYears) / 108;
    const nextElapsedRatio = elapsedRatio + planets[planetId].durationYears / 108;
    const startDate = addDays(
      majorPeriod.startDate,
      Math.round(majorDurationDays * elapsedRatio),
    );
    const endDate = addDays(
      majorPeriod.startDate,
      Math.round(majorDurationDays * nextElapsedRatio),
    );
    const subPeriod: SubPeriod = {
      id: `${majorPeriod.id}-sub-${planetId}-${index}`,
      majorPlanetId: majorPeriod.planetId,
      planetId,
      startOffsetYears: majorPeriod.startAge + majorPeriod.durationYears * elapsedRatio,
      endOffsetYears: majorPeriod.startAge + majorPeriod.durationYears * nextElapsedRatio,
      startDate,
      endDate,
      durationYears: subDurationYears,
      themeSummary: planets[planetId].summary,
    };

    elapsedRatio = nextElapsedRatio;
    return subPeriod;
  });
}

export function findCurrentPeriod<T extends { startDate: Date; endDate: Date }>(
  periods: T[],
  today = new Date(),
): T | null {
  return (
    periods.find(
      (period) =>
        (isEqual(today, period.startDate) || isBefore(period.startDate, today)) &&
        isBefore(today, period.endDate),
    ) ?? null
  );
}

export function getCurrentAge(birthDate: Date, today = new Date()): number {
  return differenceInCalendarDays(today, birthDate) / 365.2425;
}

export function formatThaiDate(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

export function formatYears(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}
