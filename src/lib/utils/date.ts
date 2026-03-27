import type { BirthData } from "../types";

/**
 * "YYYY-MM-DD" 形式の文字列を BirthData に変換する。
 * @throws {Error} 形式が不正な場合
 */
export function parseBirthDate(dateString: string): BirthData {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid date format: "${dateString}". Expected YYYY-MM-DD.`);
  }
  const [, yearStr, monthStr, dayStr] = match;
  return {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
  };
}

/**
 * BirthData の値が有効な日付かどうかを検証する。
 * @throws {Error} 不正な値の場合
 */
export function validateBirthData(data: BirthData): void {
  const { year, month, day, hour, minute } = data;

  if (!Number.isInteger(year) || year < 1 || year > 9999) {
    throw new Error(`Invalid year: ${year}`);
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`);
  }

  const maxDay = new Date(year, month, 0).getDate();
  if (!Number.isInteger(day) || day < 1 || day > maxDay) {
    throw new Error(`Invalid day: ${day} for month ${month}/${year}`);
  }

  if (hour !== undefined && (!Number.isInteger(hour) || hour < 0 || hour > 23)) {
    throw new Error(`Invalid hour: ${hour}`);
  }
  if (minute !== undefined && (!Number.isInteger(minute) || minute < 0 || minute > 59)) {
    throw new Error(`Invalid minute: ${minute}`);
  }
}
