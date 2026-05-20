import { useEffect, useMemo, useState } from "react";
import { planets } from "../data/planets";
import { formatYears } from "../lib/timeline";
import type { TimelinePeriod } from "../lib/timeline";

type RealityCheckNotesProps = {
  birthDateValue: string;
  periods: TimelinePeriod[];
};

type NotesByPeriod = Record<string, string>;

export function RealityCheckNotes({
  birthDateValue,
  periods,
}: RealityCheckNotesProps) {
  const storageKey = useMemo(
    () => `thai-life-timeline-notes:${birthDateValue || "empty"}`,
    [birthDateValue],
  );
  const [notes, setNotes] = useState<NotesByPeriod>({});

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    try {
      setNotes(raw ? (JSON.parse(raw) as NotesByPeriod) : {});
    } catch {
      setNotes({});
    }
  }, [storageKey]);

  function updateNote(periodId: string, value: string) {
    const next = { ...notes, [periodId]: value };
    setNotes(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  if (periods.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-500">Reality Check</p>
        <h2 className="text-xl font-bold text-slate-950">บันทึกเทียบกับชีวิตจริง</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          เขียนสิ่งที่เกิดขึ้นจริง ความรู้สึก หรือบทเรียนของแต่ละช่วง เพื่อใช้ทบทวนอย่างมีสติ
        </p>
      </div>

      <div className="grid gap-4">
        {periods.map((period) => {
          const planet = planets[period.planetId];

          return (
            <div
              key={period.id}
              className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-[220px_1fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-slate-950 font-bold text-white">
                    {planet.symbol}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">{planet.thaiName}</p>
                    <p className="text-sm text-slate-500">
                      อายุ {formatYears(period.startAge)} - {formatYears(period.endAge)}
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                className="min-h-24 rounded-md border border-slate-300 bg-slate-50 p-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={notes[period.id] ?? ""}
                onChange={(event) => updateNote(period.id, event.target.value)}
                placeholder="บันทึกข้อสังเกตของช่วงนี้..."
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
