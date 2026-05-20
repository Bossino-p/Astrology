import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { planets } from "../data/planets";
import { formatYears, getCurrentAge } from "../lib/timeline";
import type { TimelinePeriod } from "../lib/timeline";

type LifeTimelineProps = {
  periods: TimelinePeriod[];
  currentPeriodId?: string;
  birthDate?: Date | null;
};

export function LifeTimeline({
  periods,
  currentPeriodId,
  birthDate,
}: LifeTimelineProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  if (periods.length === 0) {
    return null;
  }

  const currentAge = birthDate ? getCurrentAge(birthDate) : null;
  const todayPercent =
    currentAge !== null && currentAge >= 0 && currentAge <= 108
      ? (currentAge / 108) * 100
      : null;
  const todayLabelAlign =
    todayPercent !== null && todayPercent < 4
      ? "translate-x-0"
      : todayPercent !== null && todayPercent > 96
        ? "-translate-x-full"
        : "-translate-x-1/2";

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;

    dragRef.current = {
      isDragging: true,
      startX: event.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
    setIsDragging(true);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container || !dragRef.current.isDragging) return;

    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = x - dragRef.current.startX;
    container.scrollLeft = dragRef.current.scrollLeft - walk;
  }

  function stopDragging() {
    dragRef.current.isDragging = false;
    setIsDragging(false);
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">ภาพรวมชีวิต 108 ปี</p>
          <h2 className="text-xl font-bold text-slate-950">เส้นเวลาเรือนดาวใหญ่</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          ใช้เป็นเครื่องมือสะท้อนชีวิต ไม่ใช่คำทำนายตายตัว
        </span>
      </div>

      <div className="relative rounded-lg border border-slate-200 bg-white p-3">
        <div
          ref={scrollRef}
          className={`overflow-x-auto overflow-y-hidden scroll-smooth pb-2 touch-pan-x select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          <div className="relative min-w-[920px] pt-9">
            <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
              {periods.map((period) => {
                const planet = planets[period.planetId];
                const isCurrent = period.id === currentPeriodId;

                return (
                  <div
                    key={period.id}
                    className={`relative min-h-36 border-r border-white/40 bg-gradient-to-br ${planet.tone} p-3 text-white last:border-r-0 ${
                      isCurrent
                        ? "ring-2 ring-sky-100 ring-inset shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85)]"
                        : ""
                    }`}
                    style={{ width: `${(period.durationYears / 108) * 100}%` }}
                  >
                    <div className="text-2xl font-bold">{planet.symbol}</div>
                    <div className="mt-2 text-sm font-semibold">{planet.thaiName}</div>
                    <div className="mt-1 text-xs text-white/85">
                      {formatYears(period.startAge)}-{formatYears(period.endAge)} ปี
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-xs text-white/80">
                      {period.startYear}-{period.endYear}
                    </div>
                  </div>
                );
              })}
            </div>

            {todayPercent !== null && (
              <div
                className="pointer-events-none absolute top-0 z-20"
                style={{ left: `${todayPercent}%` }}
              >
                <div
                  className={`absolute top-0 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white shadow-sm ${todayLabelAlign}`}
                >
                  วันนี้
                </div>
                <div className="absolute top-9 h-36 w-0.5 -translate-x-1/2 bg-slate-950 shadow-[0_0_0_2px_rgba(255,255,255,0.88)]" />
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-3 top-3 w-10 rounded-l-lg bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-5 right-3 top-3 w-10 rounded-r-lg bg-gradient-to-l from-white to-transparent" />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-3 pr-4 font-semibold">ดาว</th>
              <th className="py-3 pr-4 font-semibold">อายุ</th>
              <th className="py-3 pr-4 font-semibold">ปีเริ่ม</th>
              <th className="py-3 pr-4 font-semibold">ปีสิ้นสุด</th>
              <th className="py-3 pr-4 font-semibold">แก่นของช่วง</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => {
              const planet = planets[period.planetId];
              const isCurrent = period.id === currentPeriodId;

              return (
                <tr
                  key={period.id}
                  className={`border-b border-slate-100 ${
                    isCurrent ? "bg-sky-50 text-slate-950" : "text-slate-700"
                  }`}
                >
                  <td className="py-3 pr-4">
                    <span className="mr-2 inline-grid size-8 place-items-center rounded-full bg-slate-950 font-bold text-white">
                      {planet.symbol}
                    </span>
                    <span className="font-semibold">{planet.thaiName}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {formatYears(period.startAge)} - {formatYears(period.endAge)} ปี
                  </td>
                  <td className="py-3 pr-4">{period.startYear}</td>
                  <td className="py-3 pr-4">{period.endYear}</td>
                  <td className="max-w-md py-3 pr-4 leading-6">{period.themeSummary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
