import { getWeekdayLabel, parseBirthDate, WednesdayMode } from "../lib/timeline";

type BirthFormProps = {
  birthDateValue: string;
  birthTimeValue: string;
  wednesdayMode: WednesdayMode;
  onBirthDateChange: (value: string) => void;
  onBirthTimeChange: (value: string) => void;
  onWednesdayModeChange: (value: WednesdayMode) => void;
};

export function BirthForm({
  birthDateValue,
  birthTimeValue,
  wednesdayMode,
  onBirthDateChange,
  onBirthTimeChange,
  onWednesdayModeChange,
}: BirthFormProps) {
  const birthDate = parseBirthDate(birthDateValue);
  const isWednesday = birthDate?.getDay() === 3;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">วันเกิด</span>
          <input
            className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            type="date"
            value={birthDateValue}
            onChange={(event) => onBirthDateChange(event.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            เวลาเกิด <span className="font-normal text-slate-400">(ไม่บังคับ)</span>
          </span>
          <input
            className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            type="time"
            value={birthTimeValue}
            onChange={(event) => onBirthTimeChange(event.target.value)}
          />
        </label>

        <div className="rounded-md bg-slate-100 px-4 py-3 text-sm text-slate-700">
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            วันเกิด
          </span>
          <span className="text-base font-bold text-slate-900">
            {birthDate ? getWeekdayLabel(birthDate) : "เลือกวันเกิด"}
          </span>
        </div>
      </div>

      {isWednesday && (
        <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p className="mb-3 text-sm font-semibold text-teal-950">
            เกิดวันพุธ กรุณาเลือกช่วงเวลา
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-white bg-white px-4 py-3 shadow-sm">
              <input
                type="radio"
                name="wednesdayMode"
                checked={wednesdayMode === "day"}
                onChange={() => onWednesdayModeChange("day")}
              />
              <span className="font-medium text-slate-800">พุธกลางวัน = พุธ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-white bg-white px-4 py-3 shadow-sm">
              <input
                type="radio"
                name="wednesdayMode"
                checked={wednesdayMode === "night"}
                onChange={() => onWednesdayModeChange("night")}
              />
              <span className="font-medium text-slate-800">พุธกลางคืน = ราหู</span>
            </label>
          </div>
        </div>
      )}
    </section>
  );
}
