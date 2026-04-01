import type { ChartData } from "../../types/horoscope";

// ※ astrochart-lib は静的importにするとモジュール初期化エラーでscript全体が止まる
//   ため動的importを使う。astro.config.mjsのエイリアスで解決される。

/**
 * ChartDataを@astrodraw/astrochartが要求する形式に変換し、SVGを描画する
 */
export function renderHoroscopeChart(containerId: string, data: ChartData): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  const width = Math.min(container.clientWidth || 340, 500);
  const height = width;

  // astrochart用のデータ形式に変換
  const planets: Record<string, number[]> = {};
  for (const p of data.planets) {
    planets[p.name] = p.retrograde ? [p.degree, 1] : [p.degree];
  }
  if (data.ascendant != null) planets["As"] = [data.ascendant];
  if (data.midheaven != null) planets["Mc"] = [data.midheaven];

  const cusps = data.houses ?? Array.from({ length: 12 }, (_, i) => i * 30);
  const astroData = { planets, cusps };

  // 動的importでastrochart読み込み（静的にしない）
  (import("astrochart-lib") as Promise<any>)
    .then((module) => {
      const ChartClass =
        module?.Chart ??
        module?.default?.Chart ??
        module?.default ??
        module;

      const chart = new ChartClass(containerId, width, height, {
        COLOR_BACKGROUND: "transparent",
        POINTS_COLOR: "#c9a84c",
        POINTS_TEXT_SIZE: 9,
        SIGNS_COLOR: "#8ba7d9",
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

      const svg = container.querySelector("svg");
      if (svg) {
        svg.style.maxWidth = "100%";
        svg.style.height = "auto";
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.removeAttribute("width");
        svg.removeAttribute("height");
      }
    })
    .catch((e: unknown) => {
      console.warn("[fortuneP] astrochart load failed:", e);
      container.innerHTML = "";
    });
}
