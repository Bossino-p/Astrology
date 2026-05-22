export type TaksaRole =
  | "boriwan"
  | "ayu"
  | "det"
  | "sri"
  | "mula"
  | "utsaha"
  | "montri"
  | "kalakini";

export type TaksaRoleInfo = {
  id: TaksaRole;
  thaiName: string;
  englishLabel: string;
  traditionalMeaning: string;
  psychologicalMeaning: string;
  modifierFunction: string;
  healthyExpression: string;
  riskTone: string;
  opportunityTone: string;
};

export type TaksaModifierNote = {
  planetId: string;
  taksaRole: TaksaRole;
  roleInfo: TaksaRoleInfo;
  modifierSummary: string;
};
