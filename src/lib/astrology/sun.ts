import type { ZodiacSign } from "../types";
import { SIGN_BOUNDARIES } from "./signs";

/**
 * 月と日から太陽星座を返す。
 * @param month - 1〜12
 * @param day   - 1〜31
 */
export function getSunSign(month: number, day: number): ZodiacSign {
  // 境界日以降かどうかを判定するヘルパー
  const onOrAfter = (m: number, d: number, boundary: { month: number; day: number }) =>
    m > boundary.month || (m === boundary.month && d >= boundary.day);

  if (onOrAfter(month, day, SIGN_BOUNDARIES.aries) && !onOrAfter(month, day, SIGN_BOUNDARIES.taurus)) return "aries";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.taurus) && !onOrAfter(month, day, SIGN_BOUNDARIES.gemini)) return "taurus";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.gemini) && !onOrAfter(month, day, SIGN_BOUNDARIES.cancer)) return "gemini";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.cancer) && !onOrAfter(month, day, SIGN_BOUNDARIES.leo)) return "cancer";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.leo) && !onOrAfter(month, day, SIGN_BOUNDARIES.virgo)) return "leo";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.virgo) && !onOrAfter(month, day, SIGN_BOUNDARIES.libra)) return "virgo";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.libra) && !onOrAfter(month, day, SIGN_BOUNDARIES.scorpio)) return "libra";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.scorpio) && !onOrAfter(month, day, SIGN_BOUNDARIES.sagittarius)) return "scorpio";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.sagittarius) && !onOrAfter(month, day, SIGN_BOUNDARIES.capricorn)) return "sagittarius";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.capricorn) || month === 12) return "capricorn";
  if (onOrAfter(month, day, SIGN_BOUNDARIES.aquarius) && !onOrAfter(month, day, SIGN_BOUNDARIES.pisces)) return "aquarius";
  return "pisces";
}
