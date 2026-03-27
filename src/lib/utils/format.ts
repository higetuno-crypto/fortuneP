import type { ZodiacSign } from "../types";

export interface SignLabel {
  ja: string;
  en: string;
  symbol: string;
}

export const SIGN_LABELS: Record<ZodiacSign, SignLabel> = {
  aries:       { ja: "牡羊座", en: "Aries",       symbol: "♈" },
  taurus:      { ja: "牡牛座", en: "Taurus",      symbol: "♉" },
  gemini:      { ja: "双子座", en: "Gemini",      symbol: "♊" },
  cancer:      { ja: "蟹座",   en: "Cancer",      symbol: "♋" },
  leo:         { ja: "獅子座", en: "Leo",         symbol: "♌" },
  virgo:       { ja: "乙女座", en: "Virgo",       symbol: "♍" },
  libra:       { ja: "天秤座", en: "Libra",       symbol: "♎" },
  scorpio:     { ja: "蠍座",   en: "Scorpio",     symbol: "♏" },
  sagittarius: { ja: "射手座", en: "Sagittarius", symbol: "♐" },
  capricorn:   { ja: "山羊座", en: "Capricorn",   symbol: "♑" },
  aquarius:    { ja: "水瓶座", en: "Aquarius",    symbol: "♒" },
  pisces:      { ja: "魚座",   en: "Pisces",      symbol: "♓" },
};

/** 星座の日本語名を返す */
export function toJaLabel(sign: ZodiacSign): string {
  return SIGN_LABELS[sign].ja;
}

/** 星座のシンボル文字を返す */
export function toSymbol(sign: ZodiacSign): string {
  return SIGN_LABELS[sign].symbol;
}
