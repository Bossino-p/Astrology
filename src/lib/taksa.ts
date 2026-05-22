import { taksaRoleOrder, taksaRoles } from "../data/taksaRoles";
import type { TaksaModifierNote, TaksaRole, TaksaRoleInfo } from "../types/taksa";

const EXPECTED_TAKSA_ROLE_ORDER: TaksaRole[] = [
  "boriwan",
  "ayu",
  "det",
  "sri",
  "mula",
  "utsaha",
  "montri",
  "kalakini",
];

export type TaksaSanityCheckResult = {
  ok: boolean;
  checks: {
    hasExactlyEightRoles: boolean;
    hasUniqueRoleIds: boolean;
    hasTraditionalOrder: boolean;
    canReadEveryRole: boolean;
  };
  errors: string[];
};

// Preparation layer only.
// Future work will calculate each planet's Taksā role from birth weekday
// and selected tradition, then use this layer to adjust emphasis, risk,
// and advice in the Core Phase Card interpretation.
export function getTaksaRoleInfo(role: TaksaRole): TaksaRoleInfo {
  return taksaRoles[role];
}

export function listTaksaRoles(): TaksaRoleInfo[] {
  return taksaRoleOrder.map((role) => taksaRoles[role]);
}

export function createTaksaModifierNote(params: {
  planetId: string;
  taksaRole: TaksaRole;
}): TaksaModifierNote {
  const roleInfo = getTaksaRoleInfo(params.taksaRole);

  return {
    planetId: params.planetId,
    taksaRole: params.taksaRole,
    roleInfo,
    modifierSummary: `ดาวนี้ถูกอ่านผ่านภูมิ${roleInfo.thaiName} จึงควรตีความโดยเน้น${roleInfo.psychologicalMeaning}`,
  };
}

export function runTaksaPreparationSanityCheck(): TaksaSanityCheckResult {
  const listedRoles = listTaksaRoles();
  const listedRoleIds = listedRoles.map((role) => role.id);
  const uniqueRoleIds = new Set(listedRoleIds);
  const hasExactlyEightRoles = listedRoles.length === 8;
  const hasUniqueRoleIds = uniqueRoleIds.size === listedRoleIds.length;
  const hasTraditionalOrder =
    listedRoleIds.join("|") === EXPECTED_TAKSA_ROLE_ORDER.join("|");
  const canReadEveryRole = EXPECTED_TAKSA_ROLE_ORDER.every((role) => {
    const roleInfo = getTaksaRoleInfo(role);
    return roleInfo?.id === role;
  });
  const errors: string[] = [];

  if (!hasExactlyEightRoles) {
    errors.push(`Expected 8 Taksā roles, found ${listedRoles.length}.`);
  }

  if (!hasUniqueRoleIds) {
    errors.push("Taksā role ids must be unique.");
  }

  if (!hasTraditionalOrder) {
    errors.push("listTaksaRoles() does not match the traditional role order.");
  }

  if (!canReadEveryRole) {
    errors.push("getTaksaRoleInfo() failed for at least one expected role.");
  }

  return {
    ok:
      hasExactlyEightRoles &&
      hasUniqueRoleIds &&
      hasTraditionalOrder &&
      canReadEveryRole,
    checks: {
      hasExactlyEightRoles,
      hasUniqueRoleIds,
      hasTraditionalOrder,
      canReadEveryRole,
    },
    errors,
  };
}
