import type { ZodiacSign } from "../types";

/**
 * 月星座を返す。
 * TODO: 正確な月星座計算には出生日時と出生地が必要。
 *       ephemeris ライブラリ導入後に実装する。
 */
export function getMoonSign(): ZodiacSign | undefined {
  return undefined;
}
