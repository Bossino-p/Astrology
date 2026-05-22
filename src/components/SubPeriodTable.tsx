import { Fragment, useState } from "react";
import { getPhaseInterpretation } from "../data/phaseCombinations";
import { planets } from "../data/planets";
import { formatThaiDate, formatYears } from "../lib/timeline";
import type { SubPeriod } from "../lib/timeline";
import { PhaseCard } from "./PhaseCard";

type SubPeriodTableProps = {
  subPeriods: SubPeriod[];
  currentSubPeriodId?: string;
};

function getRowKey(subPeriod: SubPeriod) {
  return `${subPeriod.majorPlanetId}-${subPeriod.planetId}-${subPeriod.startOffsetYears.toFixed(4)}`;
}

export function SubPeriodTable({
  subPeriods,
  currentSubPeriodId,
}: SubPeriodTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  function toggleRow(rowKey: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  }

  if (subPeriods.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-500">ดาวแทรกของช่วงปัจจุบัน</p>
        <h2 className="text-xl font-bold text-slate-950">ตารางช่วงย่อย</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-3 pr-4 font-semibold">ดาว</th>
              <th className="py-3 pr-4 font-semibold">อายุ</th>
              <th className="py-3 pr-4 font-semibold">วันที่</th>
              <th className="py-3 pr-4 font-semibold">Core Phase</th>
              <th className="py-3 pr-4 text-right font-semibold">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {subPeriods.map((subPeriod) => {
              const planet = planets[subPeriod.planetId];
              const majorPlanet = planets[subPeriod.majorPlanetId];
              const interpretation = getPhaseInterpretation(
                subPeriod.majorPlanetId,
                subPeriod.planetId,
              );
              const isCurrent = subPeriod.id === currentSubPeriodId;
              const rowKey = getRowKey(subPeriod);
              const isExpanded = expandedRows.has(rowKey);

              return (
                <Fragment key={rowKey}>
                  <tr
                    className={`border-b border-slate-100 align-top ${
                      isCurrent ? "bg-teal-50 text-teal-950" : "text-slate-700"
                    }`}
                  >
                    <td className="py-4 pr-4">
                      <span className="mr-2 inline-grid size-8 place-items-center rounded-full bg-slate-950 font-bold text-white">
                        {planet.symbol}
                      </span>
                      <span className="font-semibold">{planet.thaiName}</span>
                      <span className="mt-2 block text-xs text-slate-500">
                        {majorPlanet.thaiName} / {planet.thaiName}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      {formatYears(subPeriod.startOffsetYears)} -{" "}
                      {formatYears(subPeriod.endOffsetYears)} ปี
                    </td>
                    <td className="py-4 pr-4">
                      <span className="block">{formatThaiDate(subPeriod.startDate)}</span>
                      <span className="block text-slate-400">
                        ถึง {formatThaiDate(subPeriod.endDate)}
                      </span>
                    </td>
                    <td className="max-w-[420px] py-4 pr-4">
                      <strong className="block text-slate-950">
                        {interpretation?.title ?? "ยังไม่มี Core Phase Card"}
                      </strong>
                      <span className="mt-1 line-clamp-2 block leading-6">
                        {interpretation?.keyMessage ??
                          "ชุดคำอธิบายแบบใหม่เริ่มจาก 3 คู่ตัวอย่าง และจะขยายเพิ่มได้ภายหลัง"}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
                        onClick={() => toggleRow(rowKey)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "ย่อ" : "อ่านเพิ่ม"}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr
                      className={`border-b border-slate-100 ${
                        isCurrent ? "bg-teal-50/70" : "bg-slate-50"
                      }`}
                    >
                      <td colSpan={5} className="px-4 py-5">
                        {interpretation ? (
                          <PhaseCard interpretation={interpretation} />
                        ) : (
                          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-slate-600">
                            ยังไม่มี Core Phase Card สำหรับคู่ {majorPlanet.thaiName} /{" "}
                            {planet.thaiName}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
