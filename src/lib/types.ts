export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ReadingType = "sun" | "moon" | "ascendant";

export interface BirthData {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  birthplace?: string;
}

export interface ReadingResult {
  sign: ZodiacSign;
  type: ReadingType;
  content: string;
}
