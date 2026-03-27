import type { ZodiacSign } from "../types";

export const ZODIAC_SIGNS: ZodiacSign[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

/** 各星座の開始月日 { month, day } */
export const SIGN_BOUNDARIES: Record<ZodiacSign, { month: number; day: number }> = {
  aries:       { month: 3,  day: 21 },
  taurus:      { month: 4,  day: 20 },
  gemini:      { month: 5,  day: 21 },
  cancer:      { month: 6,  day: 22 },
  leo:         { month: 7,  day: 23 },
  virgo:       { month: 8,  day: 23 },
  libra:       { month: 9,  day: 23 },
  scorpio:     { month: 10, day: 24 },
  sagittarius: { month: 11, day: 23 },
  capricorn:   { month: 12, day: 22 },
  aquarius:    { month: 1,  day: 20 },
  pisces:      { month: 2,  day: 19 },
};
