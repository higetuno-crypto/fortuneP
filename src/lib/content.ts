import type { ZodiacSign, ReadingType } from "./types";

/**
 * 指定した星座とリーディング種別に対応するテキストを返す。
 * TODO: content/ ディレクトリのMarkdownファイルから読み込む実装に置き換える。
 */
export async function getReading(sign: ZodiacSign, type: ReadingType): Promise<string> {
  return `[${type.toUpperCase()}] ${sign} のリーディングコンテンツは準備中です。`;
}
