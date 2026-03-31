export interface PlanetData {
  name: string;          // "Sun", "Moon", "Mercury", etc.
  nameJa: string;        // "太陽", "月", "水星", etc.
  zodiac: string;        // "Aries", "Taurus", etc.
  zodiacJa: string;      // "牡羊座", "牡牛座", etc.
  degree: number;        // 黄経 0-360
  degreeInSign: number;  // サイン内の度数 0-30
  house: number;         // ハウス番号 1-12
  retrograde: boolean;   // 逆行フラグ
}

export interface AspectData {
  from: string;          // 天体名
  to: string;            // 天体名
  type: string;          // "Conjunction" | "Sextile" | "Square" | "Trine" | "Opposition"
  typeJa: string;        // "合" | "六分" | "矩" | "三分" | "衝"
  angle: number;         // 実際の角度
  orb: number;           // オーブ（誤差度数）
}

export interface ChartData {
  datetimeUTC: string;           // ISO8601
  datetimeLocal: string;         // ローカル時刻文字列
  timezone: string;              // IANAタイムゾーン
  location: {
    lat: number;
    lon: number;
    name: string;                // 表示用地名
  };
  isApproximateTime: boolean;    // おおよそ時刻で計算したか
  isUnknownTime: boolean;        // 「まったくわからない」だったか
  ascendant: number | null;      // 黄経度数。isUnknownTime時はnull
  midheaven: number | null;      // MC黄経度数。isUnknownTime時はnull
  planets: PlanetData[];
  houses: number[] | null;       // カスプ角度12要素。isUnknownTime時はnull
  aspects: AspectData[];
}
