# fortuneP 技術構成

> **役割**: フレームワーク・スタイリング・ライブラリの選定と、その設定方針を定義する。
> **影響先**: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/lib/`

## 技術スタック

| 領域 | 選定 | 理由 |
|---|---|---|
| フレームワーク | **Astro** | SSG向き・デフォルトゼロJS・Content Collections でmarkdown管理が容易 |
| スタイリング | **Tailwind CSS** | モバイルファーストに強い・ユーティリティクラスで余白・色を一貫管理できる |
| 占星術計算 | **astronomy-engine** | 月星座・アセンダントの精密計算に対応。ユーザー指定 |
| 言語 | **TypeScript** | `src/lib/` はすべてTS |

---

## Astro Content Collections の使い方

`content/` ディレクトリは Astro の [Content Collections](https://docs.astro.build/ja/guides/content-collections/) として管理する。

### コレクション定義（`src/content/config.ts`）

```ts
import { defineCollection, z } from "astro:content";

const signSchema = z.object({
  sign: z.string(),
  type: z.enum(["sun", "moon", "ascendant"]),
  label: z.string(),
});

export const collections = {
  "sun-signs":   defineCollection({ schema: signSchema }),
  "moon-signs":  defineCollection({ schema: signSchema }),
  "ascendants":  defineCollection({ schema: signSchema }),
};
```

### コンテンツの取得（`src/pages/result.astro` 内）

```ts
import { getEntry } from "astro:content";

// getSunSign() で得た ZodiacSign を使って取得
const sunEntry  = await getEntry("sun-signs",  sunSign);
const moonEntry = moonSign ? await getEntry("moon-signs",  moonSign) : null;
const ascEntry  = ascSign  ? await getEntry("ascendants",  ascSign)  : null;

const { Content: SunContent }  = await sunEntry.render();
const { Content: MoonContent } = moonEntry ? await moonEntry.render() : { Content: null };
```

> **注意**: `src/lib/content.ts` の `getReading()` placeholder は、最終的にこのContent Collections方式に置き換える。`src/lib/` 内には置かず、ページ層（`src/pages/`）で直接 `getEntry()` を呼ぶ。

---

## astronomy-engine の使い方

### 月星座（`src/lib/astrology/moon.ts`）

```ts
import * as Astronomy from "astronomy-engine";
import type { ZodiacSign } from "../types";

export function getMoonSign(
  year: number, month: number, day: number,
  hour = 12, minute = 0
): ZodiacSign {
  const date = new Astronomy.MakeTime(new Date(year, month - 1, day, hour, minute));
  const lon = Astronomy.EclipticLongitude(Astronomy.Body.Moon, date);
  return longitudeToSign(lon);
}
```

### アセンダント（`src/lib/astrology/ascendant.ts`）

```ts
import * as Astronomy from "astronomy-engine";

export function getAscendant(
  year: number, month: number, day: number,
  hour: number, minute: number,
  latitudeDeg: number, longitudeDeg: number
): ZodiacSign {
  // Ascendant = RAMC + ε から計算（詳細実装時に詰める）
  // ...
}
```

### 黄経 → ZodiacSign の変換

```ts
function longitudeToSign(lon: number): ZodiacSign {
  const signs: ZodiacSign[] = [
    "aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
  ];
  return signs[Math.floor(((lon % 360) + 360) % 360 / 30)];
}
```

---

## Tailwind テーマ設定（fortuneP用）

`tailwind.config.mjs` に以下のカスタムトークンを定義する（`docs/ui-principles.md` §2 に基づく）:

```js
colors: {
  "fp-navy":    "#0a0e1a",  // ベース背景
  "fp-purple":  "#2d1b69",  // サブカラー
  "fp-dark":    "#050810",  // 最深部
  "fp-gold":    "#c9a84c",  // アクセント
  "fp-pearl":   "#e8e0d0",  // テキスト
  "fp-glow":    "#8ba7d9",  // 発光色
},
```

---

## パスエイリアス

`tsconfig.json` と Astro の両方で `@/lib` → `src/lib/index.ts` を解決する。

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/lib": ["./src/lib/index.ts"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

---

## ディレクトリ変更点（Content Collections対応）

```
src/
  content/         ← Astro Content Collections の設定ファイル
    config.ts      ← コレクション定義
  lib/             ← 純粋関数のみ（変更なし）
  pages/           ← getEntry() を使うのはここ
content/           ← markdownファイル置き場（変更なし）
  sun-signs/
  moon-signs/
  ascendants/
```
