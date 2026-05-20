import { planets } from "../data/planets";
import { formatThaiDate, formatYears } from "../lib/timeline";
import type { SubPeriod, TimelinePeriod } from "../lib/timeline";

type PeriodLike = TimelinePeriod | SubPeriod;

type CurrentPeriodCardProps = {
  title: string;
  period: PeriodLike | null;
  emptyText: string;
};

export function CurrentPeriodCard({
  title,
  period,
  emptyText,
}: CurrentPeriodCardProps) {
  if (!period) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="mt-3 text-slate-700">{emptyText}</p>
      </section>
    );
  }

  const planet = planets[period.planetId];
  const startAge =
    "startAge" in period ? period.startAge : period.startOffsetYears;
  const endAge = "endAge" in period ? period.endAge : period.endOffsetYears;

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className={`h-2 bg-gradient-to-r ${planet.tone}`} />
      <div className="p-5">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              {planet.thaiName} <span className="text-slate-400">{planet.symbol}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              อายุ {formatYears(startAge)} - {formatYears(endAge)} ปี
            </p>
          </div>
          <div className="grid size-14 place-items-center rounded-full bg-slate-950 text-2xl font-bold text-white">
            {planet.symbol}
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-700">{period.themeSummary}</p>
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-md bg-slate-100 p-3">
            <span className="block text-slate-500">เริ่ม</span>
            <strong className="text-slate-900">{formatThaiDate(period.startDate)}</strong>
          </div>
          <div className="rounded-md bg-slate-100 p-3">
            <span className="block text-slate-500">สิ้นสุด</span>
            <strong className="text-slate-900">{formatThaiDate(period.endDate)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
