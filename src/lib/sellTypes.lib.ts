import { SellType } from "../types/props/sellType";

export const ON_SITE = "onSite";
export const TO_GO = "toGo";
export const PHONE = "phone";
export const RAPPI = "rappi";

export const sells: SellType[] = [
  { name: "Restaurant", sellType: ON_SITE },
  { name: "Para llevar", sellType: TO_GO },
  { name: "Telefonico", sellType: PHONE },
  { name: "Rappi", sellType: RAPPI },
];
