import type { ZodiacSign } from "../types";

/**
 * アセンダント（上昇星座）を返す。
 * TODO: アセンダント計算には出生日時・出生地の緯度経度が必要。
 *       ephemeris ライブラリ導入後に実装する。
 */
export function getAscendant(): ZodiacSign | undefined {
  return undefined;
}
