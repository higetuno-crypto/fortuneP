import type { ChartData } from "../../types/horoscope";

/**
 * ChartDataを@astrodraw/astrochartが要求する形式に変換し、SVGを描画する
 */
export function renderHoroscopeChart(
  containerId: string,
  data: ChartData,
): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // コンテナをクリア
  container.innerHTML = "";

  // レスポンシブ: コンテナ幅に合わせる（max 500px）
  const width = Math.min(container.clientWidth || 380, 500);
  const height = width;

  // astrochart用のデータ形式に変換
  const planets: Record<string, number[]> = {};
  for (const p of data.planets) {
    const retro = p.retrograde ? 1 : 0;
    planets[p.name] = [p.degree, retro];
  }

  // ASC・MCを追加
  if (data.ascendant != null) {
    planets["As"] = [data.ascendant];
  }
  if (data.midheaven != null) {
    planets["Mc"] = [data.midheaven];
  }

  // ハウスカスプ（12個）
  // isUnknownTime時はEqual House（30度ずつ）をフォールバック
  const cusps = data.houses
    ? data.houses
    : Array.from({ length: 12 }, (_, i) => i * 30);

  const astroData = { planets, cusps };

  // 動的import（@astrodraw/astrochartはブラウザ向けなのでdynamic importで読む）
  import("@astrodraw/astrochart").then((module) => {
    const ChartClass = module.default?.Chart ?? module.Chart ?? module.default;

    const chart = new ChartClass(containerId, width, height, {
      // fortunePの世界観に合わせたカラー設定
      COLOR_BACKGROUND: "transparent",
      POINTS_COLOR: "#c9a84c",       // fp-gold
      POINTS_TEXT_SIZE: 9,
      SIGNS_COLOR: "#8ba7d9",        // fp-glow
      SIGNS_STROKE: 1.5,
      CIRCLE_COLOR: "rgba(139,167,217,0.35)",
      CIRCLE_STRONG: 1.5,
      LINE_COLOR: "rgba(139,167,217,0.2)",
      CUSPS_FONT_COLOR: "rgba(232,224,208,0.5)",
      CUSPS_STROKE: 0.8,
      SYMBOL_AXIS_FONT_COLOR: "#c9a84c",
      SYMBOL_AXIS_STROKE: 1.2,
      MARGIN: 40,
      PADDING: 16,
    });

    chart.radix(astroData);

    // SVGにスタイル補正（背景透過用）
    const svg = container.querySelector("svg");
    if (svg) {
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";
    }
  });
}
