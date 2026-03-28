import * as Astronomy from "astronomy-engine";
import { longitudeToSign } from "./signs";
import type { ZodiacSign } from "../types";

/**
 * 月星座を返す。
 * hour / minute は UTC として扱う。
 * 出生時間が不明な場合は正午（12:00 UTC）をデフォルトとして使用。
 */
export function getMoonSign(
  year: number,
  month: number,
  day: number,
  hour = 12,
  minute = 0,
): ZodiacSign {
  const time = Astronomy.MakeTime(new Date(Date.UTC(year, month - 1, day, hour, minute)));
  const lon = Astronomy.EclipticLongitude(Astronomy.Body.Moon, time);
  return longitudeToSign(lon);
}
