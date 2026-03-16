import type { NxMPromo, PercentPromo } from "../types/services";

export const getPromoLabel = (
  promo_rules: unknown,
  promo_type: string | null,
): string => {
  if (!promo_rules || typeof promo_rules !== "object" || !promo_type) return "";

  if (promo_type === "nxm") {
    const { buy, pay } = promo_rules as NxMPromo;
    return `${buy}x${pay}`;
  } else {
    const { percent } = promo_rules as PercentPromo;
    return `${percent}%`;
  }
};

export const normalizeText = (value?: string) => {
  return value?.trim() ? value : null;
}