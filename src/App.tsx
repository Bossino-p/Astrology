import { useMemo, useState } from "react";
import { BirthForm } from "./components/BirthForm";
import { CurrentPeriodCard } from "./components/CurrentPeriodCard";
import { LifeTimeline } from "./components/LifeTimeline";
import { RealityCheckNotes } from "./components/RealityCheckNotes";
import { SubPeriodTable } from "./components/SubPeriodTable";
import { planets } from "./data/planets";
import {
  findCurrentPeriod,
  generateMajorPeriods,
  generateSubPeriods,
  getStartingPlanet,
  parseBirthDate,
  WednesdayMode,
} from "./lib/timeline";

export default function App() {
  const [birthDateValue, setBirthDateValue] = useState("1990-01-01");
  const [birthTimeValue, setBirthTimeValue] = useState("");
  const [wednesdayMode, setWednesdayMode] = useState<WednesdayMode>("day");

  const birthDate = useMemo(() => parseBirthDate(birthDateValue), [birthDateValue]);

  const timeline = useMemo(() => {
    if (!birthDate) {
      return {
        startingPlanetId: null,
        majorPeriods: [],
        currentMajorPeriod: null,
        subPeriods: [],
        currentSubPeriod: null,
      };
    }

    const startingPlanetId = getStartingPlanet(birthDate, wednesdayMode);
    const majorPeriods = generateMajorPeriods(birthDate, startingPlanetId);
    const currentMajorPeriod = findCurrentPeriod(majorPeriods);
    const subPeriods = currentMajorPeriod ? generateSubPeriods(currentMajorPeriod) : [];
    const currentSubPeriod = findCurrentPeriod(subPeriods);

    return {
      startingPlanetId,
      majorPeriods,
      currentMajorPeriod,
      subPeriods,
      currentSubPeriod,
    };
  }, [birthDate, wednesdayMode]);

  const startingPlanet = timeline.startingPlanetId
    ? planets[timeline.startingPlanetId]
    : null;

  return (
    <main className="min-h-screen bg-[#f6f2ea]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Thai Astrology Life Timeline
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              โปรแกรมคำนวณเส้นชีวิต 108 ปีตามดาวอายุ
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              ใส่วันเกิดเพื่อดูช่วงดาวใหญ่ ดาวแทรกของช่วงปัจจุบัน และบันทึก Reality Check
              ไว้เทียบกับประสบการณ์จริง
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm text-white/65">ข้อควรจำ</p>
            <p className="mt-2 text-xl font-bold">
              ใช้เป็นเครื่องมือสะท้อนชีวิต ไม่ใช่คำทำนายตายตัว
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:px-6">
        <BirthForm
          birthDateValue={birthDateValue}
          birthTimeValue={birthTimeValue}
          wednesdayMode={wednesdayMode}
          onBirthDateChange={setBirthDateValue}
          onBirthTimeChange={setBirthTimeValue}
          onWednesdayModeChange={setWednesdayMode}
        />

        {startingPlanet && (
          <section className="rounded-lg border border-teal-100 bg-teal-50 p-4 text-teal-950">
            <span className="text-sm font-semibold">ดาวตั้งต้นจากวันเกิด: </span>
            <strong>
              {startingPlanet.thaiName} {startingPlanet.symbol}
            </strong>
          </section>
        )}

        <LifeTimeline
          periods={timeline.majorPeriods}
          currentPeriodId={timeline.currentMajorPeriod?.id}
          birthDate={birthDate}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CurrentPeriodCard
            title="ดาวใหญ่ปัจจุบัน"
            period={timeline.currentMajorPeriod}
            emptyText="วันนี้อยู่นอกช่วง 108 ปีที่คำนวณจากวันเกิดนี้"
          />
          <CurrentPeriodCard
            title="ดาวแทรกปัจจุบัน"
            period={timeline.currentSubPeriod}
            emptyText="เลือกวันเกิดที่ยังอยู่ในช่วงดาวใหญ่เพื่อดูดาวแทรก"
          />
        </div>

        <SubPeriodTable
          subPeriods={timeline.subPeriods}
          currentSubPeriodId={timeline.currentSubPeriod?.id}
        />

        <RealityCheckNotes
          birthDateValue={birthDateValue}
          periods={timeline.majorPeriods}
        />
      </div>
    </main>
  );
}
