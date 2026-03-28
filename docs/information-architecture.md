# fortuneP 情報アーキテクチャ

> **役割**: 画面一覧・ルーティング・入力→計算→表示のデータフロー・コンテンツ形式を定義する。
> **参照元**: `docs/mvp-scope.md`, `docs/product-foundation.md`, `docs/project-brief.md`
> **影響先**: `src/pages/`, `src/components/`, `src/lib/`, `content/`

## TL;DR

- MVP画面は5つ: トップ / 入力 / ローディング / 結果 / 用語補足モーダル
- データフロー: フォーム入力 → `src/lib/` で計算 → `content/` からテキスト取得 → 結果表示
- 結果ページが最重要。最初に磨く。

---

## 1. 画面一覧（MVP）

| # | 画面名 | パス（想定） | 感情目標 | 主要要素 |
|---|---|---|---|---|
| 1 | トップページ | `/` | 憧れ・神秘・期待 | ロゴ、キャッチコピー、診断開始ボタン、3要素説明 |
| 2 | 入力ページ | `/input` | 安心・そっと導かれる | 生年月日フォーム、出生時間（任意）、出生地（任意） |
| 3 | ローディング | `/loading` | 儀式感・静けさ | 星の演出アニメーション、待ち時間テキスト |
| 4 | 結果ページ | `/result` | 余韻・心の奥を覗いた感覚 | サマリー、太陽/月/ASC解説、統合コメント、シェア |
| 5 | 用語補足 | モーダル（インライン） | 安心 | 各用語のやさしい1〜2行説明 |

---

## 2. データフロー

```
[ユーザー入力]
  生年月日（必須）: year, month, day
  出生時間（任意）: hour, minute
  出生地（任意）:   string

       ↓ validateBirthData() で検証

[計算 — src/lib/astrology/]
  getSunSign(month, day)              → ZodiacSign          ✅ 実装済み
  getMoonSign(birthData)              → ZodiacSign | undefined  🚧 stub
  getAscendant(birthData)             → ZodiacSign | undefined  🚧 stub

       ↓

[コンテンツ取得 — src/lib/content.ts]
  getReading(sunSign, "sun")          → Promise<string>     🚧 placeholder
  getReading(moonSign, "moon")        → Promise<string>     🚧 placeholder
  getReading(ascSign, "ascendant")    → Promise<string>     🚧 placeholder

       ↓

[表示 — src/pages/result.astro]
  toJaLabel(sign)   → 日本語名（例: "牡羊座"）
  toSymbol(sign)    → シンボル（例: "♈"）
  + 取得したコンテンツ文字列
```

---

## 3. ルーティング

```
src/pages/
  index.astro        → /
  input.astro        → /input
  loading.astro      → /loading
  result.astro       → /result
  404.astro          → /404（任意）
```

### ページ間データの受け渡し方針（要技術選定）

- URLクエリパラメータ: `/result?year=2000&month=3&day=15&hour=10&minute=30`
- または `sessionStorage` / フレームワークのstate

---

## 4. 入力フォーム仕様

| フィールド | 必須 | 型 | 制約 |
|---|---|---|---|
| 生年月日（年） | ✅ | number | 1〜9999 |
| 生年月日（月） | ✅ | number | 1〜12 |
| 生年月日（日） | ✅ | number | 月に応じた有効日 |
| 出生時間（時） | 任意 | number | 0〜23 |
| 出生時間（分） | 任意 | number | 0〜59 |
| 出生地 | 任意 | string | 自由入力 or 選択式 |

バリデーション実装: `src/lib/utils/date.ts` の `validateBirthData()` を使う。

**出生時間なし → アセンダント非表示 or 参考扱いの注意書きを表示**

---

## 5. 結果ページ構成

```
[結果ページ — 上から順に表示]

1. ヘッダーサマリー
   - 入力情報（生年月日）
   - 算出された3要素のラベル（星座名 + シンボル）

2. 太陽星座セクション（必須）
   - 星座名 + シンボル + 日本語ラベル
   - 「表の核」の見出し
   - content/sun-signs/{sign}.md の本文

3. 月星座セクション（算出できた場合のみ）
   - 星座名 + シンボル + 日本語ラベル
   - 「心の奥」の見出し
   - content/moon-signs/{sign}.md の本文

4. アセンダントセクション
   - 出生時間あり → 通常表示（content/ascendants/{sign}.md）
   - 出生時間なし → 「出生時間が分かるともっと深く読めます」の案内

5. 統合まとめ文（3要素が揃った場合）
   - 3要素を組み合わせた短いまとめコメント

6. シェア導線
   - SNSシェアボタン
   - スクショ用デザインカード（任意）
```

---

## 6. コンテンツファイル構成

```
content/
  sun-signs/      # 12ファイル（太陽星座解説）
    aries.md
    taurus.md
    gemini.md
    cancer.md
    leo.md
    virgo.md
    libra.md
    scorpio.md
    sagittarius.md
    capricorn.md
    aquarius.md
    pisces.md

  moon-signs/     # 12ファイル（月星座解説）
    aries.md 〜 pisces.md

  ascendants/     # 12ファイル（アセンダント解説）
    aries.md 〜 pisces.md
```

### コンテンツファイルのフォーマット

```markdown
---
sign: aries
type: sun
label: 牡羊座
---

[解説本文 — docs/brand-voice.md の結果文テンプレートに従う]
```

結果文の作成ルール → `docs/brand-voice.md` §7、`docs/astrology-model.md` §10 を参照。

---

## 7. MVPで含めない画面（後回し）

- ログイン / マイページ
- 相性診断
- 今日の運勢
- 星座一覧ページ
- 詳細ホロスコープ
- コミュニティ機能

MVPスコープの詳細 → `docs/mvp-scope.md` §6 を参照。
