# CLAUDE.md — プロジェクト方針

## ドキュメント参照先

| ドキュメント | 何のときに読む |
|---|---|
| `docs/product-foundation.md` | 迷ったとき・方針確認（最上位） |
| `docs/mvp-scope.md` | 実装可否の判断 |
| `docs/astrology-model.md` | 星座計算・コンテンツ生成 |
| `docs/brand-voice.md` | UIテキスト・コピー生成 |
| `docs/ui-principles.md` | UI実装・スタイル設計 |
| `docs/information-architecture.md` | 画面構成・ルーティング・データフロー |
| `docs/technical-plan.md` | 技術スタック・ライブラリ・設定方針 |
| `docs/autonomous-operation.md` | 自走可否の判断 |

## アーキテクチャ方針

### `src/lib/`
- UIに依存しない**純粋関数のみ**を配置する
- フレームワーク固有のAPI（Astro の `Astro` オブジェクト、React の hooks 等）をインポートしない
- 副作用のある処理（DBアクセス・外部API呼び出し）は非同期関数として明示する

### 型定義
- 共有型はすべて `src/lib/types.ts` に定義する
- コンポーネントやページ固有の型は各ファイル内に定義してよい

### import ルール
- `src/lib/` 内の関数・型を利用する際は **`@/lib`（`src/lib/index.ts`）経由**でインポートする

```ts
// ✅ Good
import { getSunSign, toJaLabel } from "@/lib";

// ❌ Bad
import { getSunSign } from "@/lib/astrology/sun";
```

## ファイル構成

```
src/
  lib/            # UIに依存しない純粋関数・型
    types.ts      # 共有型定義（ZodiacSign, BirthData, ReadingResult, ReadingType）
    index.ts      # バレルファイル（再export）
    astrology/    # 占星術計算ロジック
      signs.ts    # ZODIAC_SIGNS定数・SIGN_BOUNDARIES定数
      sun.ts      # getSunSign(month, day) → ZodiacSign
      moon.ts     # getMoonSign() → ZodiacSign | undefined（stub）
      ascendant.ts # getAscendant() → ZodiacSign | undefined（stub）
    utils/        # 汎用ユーティリティ
      date.ts     # parseBirthDate(), validateBirthData()
      format.ts   # SIGN_LABELS, toJaLabel(), toSymbol()
    content.ts    # getReading(sign, type) → Promise<string>（placeholder）
  pages/          # ページコンポーネント（フレームワーク依存）
  components/     # UIコンポーネント（フレームワーク依存）
  styles/         # スタイルシート
content/
  sun-signs/      # 太陽星座別リーディングコンテンツ（*.md）
  moon-signs/     # 月星座別リーディングコンテンツ（*.md）
  ascendants/     # アセンダント別リーディングコンテンツ（*.md）
public/
  images/
  fonts/
```

## コンテンツファイルの命名規則

ファイル名はすべて英語小文字のZodiacSign名を使う。

```
aries.md / taurus.md / gemini.md / cancer.md / leo.md / virgo.md /
libra.md / scorpio.md / sagittarius.md / capricorn.md / aquarius.md / pisces.md
```

### コンテンツファイルのフォーマット（想定）

```markdown
---
sign: aries
type: sun
label: 牡羊座
---

[解説文本文]
```

## 自走の判断基準

詳細は `docs/autonomous-operation.md` を参照。要点のみ抜粋:

### 確認なしで進めてよいこと
- `docs/` 配下の追加・更新
- `src/lib/` への純粋関数追加
- `content/` へのコンテンツ追加
- `src/pages/` `src/components/` のMVP範囲内の実装

### 止まって確認すべきこと
- 既存ファイルの大規模削除・移動
- MVP範囲外の機能実装
- 外部公開・デプロイ

## 衝突時の優先順位

1. 占星術として意味が通っているか
2. モバイルで使いやすいか
3. 世界観・ロマン・余韻を深められるか
4. 演出は後から足せるか

→ **意味と使いやすさを壊してまで雰囲気を優先しない。**
