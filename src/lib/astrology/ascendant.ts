import * as Astronomy from "astronomy-engine";
import { longitudeToSign } from "./signs";
import type { ZodiacSign } from "../types";

/**
 * アセンダント（上昇星座）を返す。
 *
 * @param year / month / day / hour / minute - 出生日時（UTC）
 * @param latitudeDeg  - 出生地の緯度（例: 東京 = 35.6895）
 * @param longitudeDeg - 出生地の経度（例: 東京 = 139.6917）
 *
 * 計算式:
 *   RAMC = Greenwich Apparent Sidereal Time * 15 + 出生地経度
 *   ASC  = atan2(-cos(RAMC), sin(RAMC)*cos(ε) + tan(φ)*sin(ε))
 *   ε = 黄道傾斜角（≈ 23.4397°）
 */
export function getAscendant(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitudeDeg: number,
  longitudeDeg: number,
): ZodiacSign {
  const time = Astronomy.MakeTime(new Date(Date.UTC(year, month - 1, day, hour, minute)));

  // Greenwich Apparent Sidereal Time (hours) → Right Ascension of MC (degrees)
  const gst = Astronomy.SiderealTime(time);
  const ramc = ((gst * 15 + longitudeDeg) % 360 + 360) % 360;

  const eps = 23.4397 * (Math.PI / 180);
  const ramcRad = ramc * (Math.PI / 180);
  const latRad = latitudeDeg * (Math.PI / 180);

  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  let asc = Math.atan2(y, x) * (180 / Math.PI);
  if (asc < 0) asc += 360;

  return longitudeToSign(asc);
}
