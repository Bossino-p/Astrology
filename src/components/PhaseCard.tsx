import { createTaksaModifierNote } from "../lib/taksa";
import { planets } from "../data/planets";
import type { PlanetId } from "../data/planets";
import type { PhaseInterpretation } from "../types/interpretation";
import { PersonalLensCard } from "./PersonalLensCard";

type PhaseCardProps = {
  interpretation: PhaseInterpretation;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="leading-6">
          {item}
        </li>
      ))}
    </ul>
  );
}

function getPlanetThaiName(planetId: string): string | undefined {
  return planetId in planets ? planets[planetId as PlanetId].thaiName : undefined;
}

export function PhaseCard({ interpretation }: PhaseCardProps) {
  // Development-only mock roles. Real Taksā calculation will later provide the
  // actual roles from birth weekday/tradition.
  const mockMajorTaksaLens = createTaksaModifierNote({
    planetId: interpretation.majorPlanet,
    taksaRole: "sri",
  });
  const mockSubTaksaLens = createTaksaModifierNote({
    planetId: interpretation.subPlanet,
    taksaRole: "kalakini",
  });
  const majorPlanetThaiName = getPlanetThaiName(interpretation.majorPlanet);
  const subPlanetThaiName = getPlanetThaiName(interpretation.subPlanet);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Core Phase Card
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          {interpretation.title}
        </h3>
        {interpretation.toneTags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {interpretation.toneTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-sky-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">1. Key Message</h4>
          <p className="mt-2 text-lg font-semibold leading-7 text-slate-900">
            {interpretation.keyMessage}
          </p>
        </div>

        <div className="rounded-lg bg-emerald-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">2. Opportunity</h4>
          <p className="mt-2 leading-7 text-slate-700">
            {interpretation.opportunity}
          </p>
        </div>

        <div className="rounded-lg bg-rose-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">3. Watch Out For</h4>
          <div className="mt-2 text-slate-700">
            <BulletList items={interpretation.watchOutFor} />
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">
            4. Why This Phase Feels This Way
          </h4>
          <p className="mt-2 leading-7 text-slate-700">
            {interpretation.whyThisPhaseFeelsThisWay}
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">5. Hidden Trap</h4>
          <p className="mt-2 leading-7 text-slate-700">
            {interpretation.hiddenTrap}
          </p>
        </div>

        <div className="rounded-lg bg-violet-50 p-4">
          <h4 className="text-sm font-bold text-slate-950">6. Practical Focus</h4>
          <p className="mt-2 leading-7 text-slate-700">
            {interpretation.practicalFocus}
          </p>
        </div>
      </div>

      <PersonalLensCard
        interpretation={interpretation}
        majorLens={mockMajorTaksaLens}
        subLens={mockSubTaksaLens}
        majorPlanetThaiName={majorPlanetThaiName}
        subPlanetThaiName={subPlanetThaiName}
      />
    </div>
  );
}
