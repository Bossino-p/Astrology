import type { PhaseInterpretation } from "../types/interpretation";
import type { TaksaModifierNote, TaksaRoleInfo } from "../types/taksa";

type PersonalLensCardProps = {
  interpretation: PhaseInterpretation;
  majorLens: TaksaModifierNote;
  subLens: TaksaModifierNote;
  majorPlanetThaiName?: string;
  subPlanetThaiName?: string;
};

function getRoleContext(roleInfo: TaksaRoleInfo): string {
  const contexts: Record<TaksaRoleInfo["id"], string> = {
    boriwan: "คนใกล้ตัว ทีม ความสัมพันธ์ และภาระทางสังคม",
    ayu: "จังหวะชีวิต พลังงานประจำวัน สุขภาพพื้นฐาน และความยั่งยืนของกิจวัตร",
    det: "อำนาจ การยืนตำแหน่ง ความกล้า และแรงกดดันเรื่องการพิสูจน์ตัวเอง",
    sri: "คุณค่า ความสัมพันธ์ เงิน รสนิยม ความน่าดึงดูด และสิ่งที่ทำให้ชีวิตรู้สึกดีขึ้น",
    mula: "ฐานชีวิต ทรัพยากรเดิม ครอบครัว ระบบหลังบ้าน และสิ่งที่รองรับชีวิตอยู่",
    utsaha: "งาน ความพยายาม วินัย การลงมือ และแรงกดดันจากผลลัพธ์",
    montri: "คำแนะนำ ผู้สนับสนุน ความรู้ ผู้แนะนำ และความสามารถในการขอความช่วยเหลือ",
    kalakini: "จุดเสียดทาน จุดบอด ต้นทุนที่ซ่อนอยู่ และเรื่องที่ควรตรวจสอบให้ชัดก่อนตัดสินใจ",
  };

  return contexts[roleInfo.id];
}

function getPlanetLabel(planetId: string, thaiName?: string): string {
  return thaiName ? `${planetId} / ${thaiName}` : planetId;
}

function getPlanetFocus(planetId: string): string {
  const focuses: Record<string, string> = {
    sun: "ตัวตน อำนาจ การยืนตำแหน่ง ความภาคภูมิใจ และการถูกมองเห็น",
    moon: "อารมณ์ ความปลอดภัย ความผูกพัน การพักใจ และการดูแลความรู้สึก",
    mars: "แรงลงมือ ความกล้า ความเร่ง การปะทะ และการจัดการความโกรธ",
    mercury: "ความคิด การสื่อสาร การเรียนรู้ การจัดระบบ และการแลกเปลี่ยน",
    jupiter: "ความเชื่อ ความหมาย ภาพใหญ่ การเติบโต และกรอบความคิดที่ใช้ตัดสินใจ",
    venus: "คุณค่า ความรัก เงิน ความสบาย รสนิยม และความต้องการได้รับการยอมรับ",
    saturn: "ความจริง ข้อจำกัด วินัย ความรับผิดชอบ และผลลัพธ์ระยะยาว",
    rahu: "แรงขยาย ความอยาก สิ่งใหม่ ความตื่นเต้น และภาพที่อาจใหญ่กว่าความจริง",
  };

  return focuses[planetId] ?? "พลังหลักของดาวดวงนี้";
}

function cleanRoleText(value: string): string {
  return value
    .replaceAll("routine", "กิจวัตร")
    .replaceAll("baseline well-being", "ความอยู่ดีพื้นฐาน")
    .replaceAll("mentor network", "เครือข่ายผู้แนะนำ")
    .replaceAll("mentor", "ผู้แนะนำ")
    .replaceAll("friction point", "จุดเสียดทาน")
    .replaceAll("blind spot", "จุดบอด")
    .replaceAll("shadow pattern", "รูปแบบที่มองข้าม")
    .replaceAll("friction", "แรงเสียดทาน")
    .replaceAll("cost", "ต้นทุน");
}

function getRoleConstructivePotential(roleInfo: TaksaRoleInfo): string {
  const potentials: Record<TaksaRoleInfo["id"], string> = {
    boriwan: "ความสัมพันธ์ ทีม หรือพื้นที่ร่วมกับคนอื่นที่มีขอบเขตชัดขึ้น",
    ayu: "จังหวะชีวิตที่ยั่งยืน พลังงานที่ใช้ได้จริง และกิจวัตรที่พาคุณอยู่กับตัวเองได้ดีขึ้น",
    det: "การยืนตำแหน่งที่มีวุฒิภาวะ กล้ารับผิดชอบ และใช้อำนาจโดยไม่ต้องกดใคร",
    sri: "คุณค่าที่คนสัมผัสได้จริง ความสัมพันธ์ที่ดีขึ้น หรือผลลัพธ์ที่น่าพอใจโดยไม่หลอกตัวเอง",
    mula: "ฐานชีวิตที่แน่นขึ้น ทรัพยากรที่จัดวางดีขึ้น และระบบหลังบ้านที่รองรับการเติบโต",
    utsaha: "งานที่จับต้องได้ วินัยที่ไม่เผาตัวเอง และความพยายามที่พาไปสู่ผลลัพธ์จริง",
    montri: "คำแนะนำที่ย่อยแล้วใช้ได้จริง เครือข่ายสนับสนุน และการเรียนรู้จากคนที่มีประสบการณ์",
    kalakini: "การเห็นจุดบอดเร็วขึ้น ตรวจต้นทุนชัดขึ้น และเปลี่ยนแรงเสียดทานให้เป็นบทเรียนที่ใช้ได้",
  };

  return potentials[roleInfo.id];
}

function getRolePressurePoint(roleInfo: TaksaRoleInfo): string {
  const pressurePoints: Record<TaksaRoleInfo["id"], string> = {
    boriwan: "ความคาดหวังของคนรอบตัวอาจดังเกินความต้องการของคุณเอง",
    ayu: "จังหวะชีวิตอาจเสียสมดุลถ้าคุณใช้พลังผิดเวลา หรือปล่อยให้กิจวัตรหลุดนานเกินไป",
    det: "ความอยากพิสูจน์ตัวเองอาจทำให้ตัดสินใจจากอีโก้มากกว่าความจำเป็นจริง",
    sri: "สิ่งที่ดูดี น่าพอใจ หรือให้ผลเร็วอาจทำให้คุณมองข้ามต้นทุนที่ซ่อนอยู่",
    mula: "เรื่องพื้นฐานที่ค้างอยู่เบื้องหลังอาจทำให้แผนที่ดูดีเดินต่อได้ยาก",
    utsaha: "ความอยากผลิตผลงานอาจทำให้คุณเอาคุณค่าตัวเองไปผูกกับความยุ่ง",
    montri: "คำแนะนำจากคนอื่นอาจกลายเป็นที่หลบ ถ้าคุณยังไม่กล้าตัดสินใจด้วยตัวเอง",
    kalakini: "จุดบอดเล็ก ๆ อาจทำให้เรื่องที่ควรเรียบง่ายมีต้นทุนสูงกว่าที่คิด",
  };

  return pressurePoints[roleInfo.id];
}

function getPlanetConstructiveMove(planetId: string): string {
  const moves: Record<string, string> = {
    sun: "นิยามบทบาทของตัวเองให้ชัด และใช้การมองเห็นนั้นเพื่อรับผิดชอบมากกว่าขอการยืนยัน",
    moon: "ดูแลอารมณ์ให้มีที่พัก แล้วใช้ความเข้าใจใจตัวเองเป็นฐานของการตัดสินใจ",
    mars: "เปลี่ยนแรงเร่งให้เป็นการลงมือที่มีทิศ ไม่ใช่แค่การปะทะหรือการเอาชนะ",
    mercury: "ใช้ความคิด การสื่อสาร และระบบให้เกิดประโยชน์จริง ไม่ใช่แค่คิดให้ซับซ้อนขึ้น",
    jupiter: "ทำให้ความเชื่อหรือภาพใหญ่ผ่านการทดสอบ จนกลายเป็นทิศทางที่รับผิดชอบได้",
    venus: "แยกคุณค่าจริงออกจากความอยากถูกชอบ ความสบาย หรือภาพที่ดูดีชั่วคราว",
    saturn: "ใช้ข้อจำกัดเป็นโครงสร้างสำหรับความรับผิดชอบ ไม่ใช่เป็นเหตุผลให้ใจแข็งเกินไป",
    rahu: "ใช้แรงอยากและสิ่งใหม่เป็นข้อมูลให้ทดลอง แต่ไม่ปล่อยให้ความตื่นเต้นพาคุณข้ามการตรวจสอบ",
  };

  return moves[planetId] ?? "ใช้พลังของดาวนี้ให้เป็นรูปธรรมและตรวจสอบได้";
}

function getPlanetDistortionPattern(planetId: string): string {
  const patterns: Record<string, string> = {
    sun: "ความอยากให้ตัวเองดูชัดหรือดูสำคัญอาจบีบให้คุณปกป้องภาพลักษณ์มากเกินไป",
    moon: "อารมณ์และความต้องการความปลอดภัยอาจทำให้คุณอ่านสถานการณ์จากความกลัวมากกว่าข้อเท็จจริง",
    mars: "ความรีบ ความหงุดหงิด หรือแรงอยากปิดเกมอาจทำให้คุณตัดสินใจแข็งเกินจำเป็น",
    mercury: "ความคิดและข้อมูลอาจวนเร็วเกินไป จนคุณใช้การวิเคราะห์แทนการเลือกจริง",
    jupiter: "ความหวังหรือเหตุผลใหญ่ ๆ อาจทำให้คุณมั่นใจเกินหลักฐานที่มี",
    venus: "ความอยากให้สิ่งต่าง ๆ น่าพอใจ ดูดี หรือถูกรัก อาจทำให้คุณต่อรองกับความจริงมากเกินไป",
    saturn: "ความกลัวผลลัพธ์และภาระอาจทำให้คุณควบคุมแน่นจนขยับไม่ได้",
    rahu: "ความตื่นเต้นและแรงดึงดูดของสิ่งใหม่อาจทำให้ภาพตรงหน้าดูใหญ่กว่าความจริง",
  };

  return patterns[planetId] ?? "แรงกดของดาวนี้อาจทำให้การตัดสินใจเสียสมดุล";
}

function createLensDescription({
  kind,
  lens,
  planetThaiName,
}: {
  kind: "major" | "sub";
  lens: TaksaModifierNote;
  planetThaiName?: string;
}): string {
  const planetName = planetThaiName ?? lens.planetId;
  const roleContext = getRoleContext(lens.roleInfo);

  if (kind === "major") {
    return `ดาวเสวย ${planetName} ควรถูกอ่านผ่านภูมิ${lens.roleInfo.thaiName} จึงควรเพิ่มน้ำหนักเรื่อง${roleContext}ในฐานะพื้นหลังของช่วงนี้`;
  }

  return `ดาวแทรก ${planetName} ควรถูกอ่านผ่านภูมิ${lens.roleInfo.thaiName} จึงควรดูว่า${roleContext}กำลังกดหรือบิดคำอ่านหลักตรงไหน`;
}

function createPersonalLensSummary({
  interpretation,
  majorLens,
  subLens,
  majorPlanetThaiName,
  subPlanetThaiName,
}: PersonalLensCardProps): string[] {
  const majorName = majorPlanetThaiName ?? majorLens.planetId;
  const subName = subPlanetThaiName ?? subLens.planetId;
  const majorPlanetFocus = getPlanetFocus(majorLens.planetId);
  const subPlanetFocus = getPlanetFocus(subLens.planetId);
  const majorConstructivePotential = getRoleConstructivePotential(
    majorLens.roleInfo,
  );
  const subPressurePoint = getRolePressurePoint(subLens.roleInfo);
  const majorMove = getPlanetConstructiveMove(majorLens.planetId);
  const subDistortion = getPlanetDistortionPattern(subLens.planetId);
  const majorRoleMeaning = cleanRoleText(majorLens.roleInfo.psychologicalMeaning);
  const subRoleMeaning = cleanRoleText(subLens.roleInfo.psychologicalMeaning);

  return [
    `เฟส “${interpretation.title}” ชวนให้ใช้${majorPlanetFocus}ไปในทางที่สร้าง${majorConstructivePotential}ให้ชัดขึ้น สำหรับ${majorName} จุดที่มีค่าคือการทำให้เรื่อง${majorRoleMeaning}กลายเป็นสิ่งที่ใช้ได้จริงในชีวิตประจำวัน แกน “${interpretation.keyMessage}” จึงควรถูกอ่านอย่างเรียบง่าย: ${majorMove}`,

    `แรงที่ควรสังเกตคือ${subPlanetFocus} โดยเฉพาะเมื่อมันไปแตะเรื่อง${subRoleMeaning} โทน${subLens.roleInfo.thaiName}ไม่ได้แปลว่าต้องกลัว แต่บอกให้ตรวจจุดที่อาจเสียสมดุล: ${subPressurePoint} ${subDistortion} ก่อนตัดสินใจเรื่องสำคัญ ให้ดูว่าคุณกำลังเลือกจากคุณค่าจริง หรือรีบเลือกเพราะอยากให้ความอึดอัดจบเร็วเกินไป`,
  ];
}

function LensSection({
  title,
  lens,
  planetThaiName,
  description,
}: {
  title: string;
  lens: TaksaModifierNote;
  planetThaiName?: string;
  description: string;
}) {
  return (
    <div className="rounded-md bg-white p-4 ring-1 ring-slate-200">
      <h5 className="text-sm font-bold text-slate-950">{title}</h5>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          {getPlanetLabel(lens.planetId, planetThaiName)}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          ภูมิ{lens.roleInfo.thaiName}
        </span>
      </div>
      <p className="mt-3 leading-7 text-slate-700">{description}</p>
    </div>
  );
}

export function PersonalLensCard({
  interpretation,
  majorLens,
  subLens,
  majorPlanetThaiName,
  subPlanetThaiName,
}: PersonalLensCardProps) {
  const majorDescription = createLensDescription({
    kind: "major",
    lens: majorLens,
    planetThaiName: majorPlanetThaiName,
  });
  const subDescription = createLensDescription({
    kind: "sub",
    lens: subLens,
    planetThaiName: subPlanetThaiName,
  });
  const summaryParagraphs = createPersonalLensSummary({
    interpretation,
    majorLens,
    subLens,
    majorPlanetThaiName,
    subPlanetThaiName,
  });

  return (
    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Personal Lens
        </p>
        <h4 className="mt-1 text-lg font-bold text-slate-950">
          เลนส์เฉพาะตัวจากทักษา
        </h4>
      </div>

      <p className="leading-7 text-slate-700">
        เลนส์นี้ไม่ได้เปลี่ยนคำอ่านหลัก แต่ช่วยบอกว่าดาวเสวยและดาวแทรกควรถูกอ่านผ่านบริบทใดเป็นพิเศษ
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <LensSection
          title="1. ดาวเสวยผ่านภูมิทักษา"
          lens={majorLens}
          planetThaiName={majorPlanetThaiName}
          description={majorDescription}
        />
        <LensSection
          title="2. ดาวแทรกผ่านภูมิทักษา"
          lens={subLens}
          planetThaiName={subPlanetThaiName}
          description={subDescription}
        />
        <div className="rounded-md bg-white p-4 ring-1 ring-slate-200 lg:col-span-2">
          <h5 className="text-sm font-bold text-slate-950">
            3. สรุปเลนส์เฉพาะตัว
          </h5>
          <div className="mt-3 space-y-3 leading-7 text-slate-700">
            {summaryParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
