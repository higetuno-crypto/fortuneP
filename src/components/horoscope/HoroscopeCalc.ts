import { Origin, Horoscope } from "circular-natal-horoscope-js";
import tzlookup from "tz-lookup";
import type { ChartData, PlanetData, AspectData } from "../../types/horoscope";

// 天体名の日英マッピング
const PLANET_NAME_JA: Record<string, string> = {
  sun: "太陽", moon: "月", mercury: "水星", venus: "金星", mars: "火星",
  jupiter: "木星", saturn: "土星", uranus: "天王星", neptune: "海王星", pluto: "冥王星",
};

// サイン名の日英マッピング
const SIGN_NAME_JA: Record<string, string> = {
  aries: "牡羊座", taurus: "牡牛座", gemini: "双子座", cancer: "蟹座",
  leo: "獅子座", virgo: "乙女座", libra: "天秤座", scorpio: "蠍座",
  sagittarius: "射手座", capricorn: "山羊座", aquarius: "水瓶座", pisces: "魚座",
};

// アスペクト名の日英マッピング
const ASPECT_NAME_JA: Record<string, string> = {
  conjunction: "合(0°)", sextile: "六分(60°)", square: "矩(90°)",
  trine: "三分(120°)", opposition: "衝(180°)",
};

// メジャーアスペクトのキー一覧
const MAJOR_ASPECTS = new Set(["conjunction", "sextile", "square", "trine", "opposition"]);

// 対象天体のキー一覧
const TARGET_PLANETS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

interface CalcInput {
  year: number;
  month: number;  // 1-12
  day: number;
  hour: number;   // 0-23
  minute: number; // 0-59
  lat: number;
  lon: number;
  locationName: string;
  isApproximateTime: boolean;
  isUnknownTime: boolean;
}

/**
 * ローカル時刻をUTCに変換する
 * tz-lookupでIANAタイムゾーンを取得し、Intl APIでオフセットを計算
 */
function localToUTC(year: number, month: number, day: number, hour: number, minute: number, tz: string): Date {
  // ローカル時刻の文字列を生成
  const pad = (n: number) => String(n).padStart(2, "0");
  const localStr = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;

  // タイムゾーン付きで解釈してUTCに変換
  // Intl.DateTimeFormat でオフセットを取得
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });

  // まずUTCとして仮パース
  const tentative = new Date(localStr + "Z");

  // そのUTC時刻がターゲットTZで何時になるかを取得
  const parts = formatter.formatToParts(tentative);
  const get = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
  const tzYear = get("year");
  const tzMonth = get("month");
  const tzDay = get("day");
  const tzHour = get("hour") === 24 ? 0 : get("hour");
  const tzMinute = get("minute");

  // ローカル時刻との差分がオフセット
  const localMs = new Date(Date.UTC(year, month - 1, day, hour, minute)).getTime();
  const tzMs = new Date(Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute)).getTime();
  const offsetMs = tzMs - localMs;

  // tentative（UTC仮定）からオフセットを引いてUTCを得る
  // localStr は本当はローカル時刻なので: UTCtime = localMs - offsetMs
  return new Date(localMs - offsetMs);
}

/**
 * 天体がどのハウスに属するかを判定
 */
function findHouse(degree: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    if (start < end) {
      if (degree >= start && degree < end) return i + 1;
    } else {
      // 360度の境界をまたぐ場合
      if (degree >= start || degree < end) return i + 1;
    }
  }
  return 1;
}

/**
 * ホロスコープ計算のメインエントリポイント
 */
export function calculateHoroscope(input: CalcInput): ChartData {
  const { year, month, day, hour, minute, lat, lon, locationName, isApproximateTime, isUnknownTime } = input;

  // タイムゾーン判定
  const tz = tzlookup(lat, lon);

  // ローカル時刻 → UTC
  const utcDate = localToUTC(year, month, day, hour, minute, tz);

  // circular-natal-horoscope-js の Origin を生成（monthは0-indexed）
  const origin = new Origin({
    year: utcDate.getUTCFullYear(),
    month: utcDate.getUTCMonth(),  // 0-indexed
    date: utcDate.getUTCDate(),
    hour: utcDate.getUTCHours(),
    minute: utcDate.getUTCMinutes(),
    latitude: lat,
    longitude: lon,
  });

  // ホロスコープ計算
  const horoscope = new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectPoints: ["bodies"],
    aspectWithPoints: ["bodies"],
    aspectTypes: ["major"],
    customOrbs: {},
    language: "en",
  });

  // ハウスカスプ角度の抽出
  const cusps: number[] = horoscope.Houses.map((h: any) =>
    h.ChartPosition.StartPosition.Ecliptic.DecimalDegrees
  );

  // 惑星データの抽出
  const planets: PlanetData[] = TARGET_PLANETS.map((key) => {
    const body = horoscope.CelestialBodies[key];
    const degree = body.ChartPosition.Ecliptic.DecimalDegrees;
    const signKey = body.Sign.key as string;
    const degreeInSign = degree % 30;

    return {
      name: key.charAt(0).toUpperCase() + key.slice(1),
      nameJa: PLANET_NAME_JA[key] ?? key,
      zodiac: body.Sign.label,
      zodiacJa: SIGN_NAME_JA[signKey] ?? signKey,
      degree,
      degreeInSign: Math.round(degreeInSign * 100) / 100,
      house: isUnknownTime ? 0 : findHouse(degree, cusps),
      retrograde: body.isRetrograde === true,
    };
  });

  // アスペクトの抽出（メジャーアスペクトのみ、対象天体同士のみ）
  const targetSet = new Set(TARGET_PLANETS);
  const aspects: AspectData[] = (horoscope.Aspects?.all ?? [])
    .filter((a: any) => {
      const aspectKey = a.aspectKey ?? a.key ?? "";
      return MAJOR_ASPECTS.has(aspectKey) &&
        targetSet.has(a.point1Key) &&
        targetSet.has(a.point2Key);
    })
    .map((a: any) => {
      const aspectKey = a.aspectKey ?? a.key ?? "";
      return {
        from: PLANET_NAME_JA[a.point1Key] ?? a.point1Label,
        to: PLANET_NAME_JA[a.point2Key] ?? a.point2Label,
        type: aspectKey.charAt(0).toUpperCase() + aspectKey.slice(1),
        typeJa: ASPECT_NAME_JA[aspectKey] ?? aspectKey,
        angle: a.angle ?? 0,
        orb: Math.round((a.orb ?? 0) * 100) / 100,
      };
    });

  // アセンダント・MC
  const ascDegree = horoscope.Ascendant?.ChartPosition?.Horizon?.DecimalDegrees ?? null;
  const mcDegree = horoscope.Midheaven?.ChartPosition?.Horizon?.DecimalDegrees ?? null;

  // ローカル時刻文字列
  const pad = (n: number) => String(n).padStart(2, "0");
  const datetimeLocal = `${year}/${pad(month)}/${pad(day)} ${pad(hour)}:${pad(minute)}`;

  return {
    datetimeUTC: utcDate.toISOString(),
    datetimeLocal,
    timezone: tz,
    location: { lat, lon, name: locationName },
    isApproximateTime,
    isUnknownTime,
    ascendant: isUnknownTime ? null : ascDegree,
    midheaven: isUnknownTime ? null : mcDegree,
    planets,
    houses: isUnknownTime ? null : cusps,
    aspects,
  };
}

export { PLANET_NAME_JA, SIGN_NAME_JA, ASPECT_NAME_JA };
