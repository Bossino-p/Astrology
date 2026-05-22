import {
  addDays,
  addYears,
  differenceInCalendarDays,
  format,
  isBefore,
  isEqual,
  parseISO,
} from "date-fns";
import { planetCycle, planets, thaiWeekdayNames } from "../data/planets";
import type { PlanetId } from "../data/planets";

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
