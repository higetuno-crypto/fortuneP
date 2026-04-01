import type { ChartData } from "../../types/horoscope";
import { SIGN_NAME_JA } from "./HoroscopeCalc";

/**
 * サイン英名からJPに変換（度数情報付き）
 */
function signDegreeText(zodiac: string, degreeInSign: number): string {
  const ja = SIGN_NAME_JA[zodiac.toLowerCase()] ?? zodiac;
  return `${ja} ${Math.floor(degreeInSign)}°`;
}

/**
 * ChartDataからテキスト要約のHTMLを生成する
 */
export function renderHoroscopeResult(containerId: string, data: ChartData): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html: string[] = [];

  // 推定時刻の注意書き
  if (data.isApproximateTime && !data.isUnknownTime) {
    html.push(`
      <div class="horo-notice glass-card">
        <p>出生時刻は推定値で計算しています。アセンダント・ハウスは参考値です。</p>
      </div>
    `);
  }
  if (data.isUnknownTime) {
    html.push(`
      <div class="horo-notice glass-card">
        <p>出生時刻不明のため、アセンダント・ハウスは表示していません。</p>
      </div>
    `);
  }

  // 主要3天体のサマリー
  const sun = data.planets.find(p => p.name === "Sun");
  const moon = data.planets.find(p => p.name === "Moon");
  const ascSign = data.ascendant != null
    ? getSignFromDegree(data.ascendant)
    : null;

  html.push(`<div class="horo-summary">`);
  if (sun) {
    html.push(`<p class="horo-summary-line">太陽星座: <strong>${sun.zodiacJa}</strong></p>`);
  }
  if (moon) {
    html.push(`<p class="horo-summary-line">月星座: <strong>${moon.zodiacJa}</strong></p>`);
  }
  if (ascSign && !data.isUnknownTime) {
    const label = data.isApproximateTime ? " (参考値)" : "";
    html.push(`<p class="horo-summary-line">アセンダント: <strong>${ascSign}</strong>${label}</p>`);
  }
  html.push(`</div>`);

  // 惑星一覧テーブル
  html.push(`<div class="horo-table-wrap">`);
  html.push(`<table class="horo-table">`);
  html.push(`<thead><tr>`);
  html.push(`<th>天体</th><th>サイン</th><th>度数</th>`);
  if (!data.isUnknownTime) html.push(`<th>ハウス</th>`);
  html.push(`<th>逆行</th>`);
  html.push(`</tr></thead><tbody>`);

  for (const p of data.planets) {
    html.push(`<tr>`);
    html.push(`<td>${p.nameJa}</td>`);
    html.push(`<td>${p.zodiacJa}</td>`);
    html.push(`<td>${Math.floor(p.degreeInSign)}°${Math.floor((p.degreeInSign % 1) * 60)}'</td>`);
    if (!data.isUnknownTime) html.push(`<td>${p.house}</td>`);
    html.push(`<td>${p.retrograde ? "℞" : ""}</td>`);
    html.push(`</tr>`);
  }
  html.push(`</tbody></table>`);
  html.push(`</div>`);

  // アスペクト一覧テーブル
  if (data.aspects.length > 0) {
    html.push(`<div class="horo-table-wrap">`);
    html.push(`<p class="horo-table-title">主要アスペクト</p>`);
    html.push(`<table class="horo-table">`);
    html.push(`<thead><tr>`);
    html.push(`<th>天体</th><th>アスペクト</th><th>天体</th><th>オーブ</th>`);
    html.push(`</tr></thead><tbody>`);

    for (const a of data.aspects) {
      html.push(`<tr>`);
      html.push(`<td>${a.from}</td>`);
      html.push(`<td>${a.typeJa}</td>`);
      html.push(`<td>${a.to}</td>`);
      html.push(`<td>${a.orb}°</td>`);
      html.push(`</tr>`);
    }
    html.push(`</tbody></table>`);
    html.push(`</div>`);
  }

  container.innerHTML = html.join("");
}

/** 黄経度数からサイン名（日本語）を取得 */
function getSignFromDegree(degree: number): string {
  const signs = [
    "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座",
    "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座",
  ];
  const idx = Math.floor((degree % 360) / 30);
  return signs[idx];
}
