# REPOSITORY_GUIDE — 開発入口

> **役割**: リポジトリ全体の読み方・ドキュメント参照順・更新ルールの集約。
> 開発に参加する前に必ずこのファイルを読む。

## ドキュメント読み順

| 優先度 | ドキュメント | 目的 |
|---|---|---|
| 1 | `docs/product-foundation.md` | 最上位方針・衝突時の判断基準 |
| 2 | `docs/mvp-scope.md` | 何を作る/作らないかの判断 |
| 3 | `CLAUDE.md` | コード規則・import・ファイル構成 |
| 4 | `docs/astrology-model.md` | 星座計算・コンテンツ生成ルール |
| 5 | `docs/brand-voice.md` | UIテキスト・コピー生成 |
| 6 | `docs/ui-principles.md` | UI実装・スタイル設計 |
| 7 | `docs/information-architecture.md` | 画面構成・ルーティング・データフロー |
| 8 | `docs/technical-plan.md` | 技術スタック・設定方針 |
| 9 | `docs/autonomous-operation.md` | 自走可否の判断基準 |

## 実装状況

| 領域 | 状態 | ファイル |
|---|---|---|
| 共有型定義 | ✅ 完了 | `src/lib/types.ts` |
| 星座定数 | ✅ 完了 | `src/lib/astrology/signs.ts` |
| 太陽星座計算 | ✅ 完了 | `src/lib/astrology/sun.ts` |
| 月星座計算 | 🚧 stub | `src/lib/astrology/moon.ts` |
| アセンダント計算 | 🚧 stub | `src/lib/astrology/ascendant.ts` |
| 日付パース・バリデーション | ✅ 完了 | `src/lib/utils/date.ts` |
| 表示フォーマット | ✅ 完了 | `src/lib/utils/format.ts` |
| コンテンツ取得 | 🚧 placeholder | `src/lib/content.ts` |
| トップページ | ❌ 未着手 | `src/pages/index.astro` |
| 入力ページ | ❌ 未着手 | `src/pages/input.astro` |
| ローディング | ❌ 未着手 | `src/pages/loading.astro` |
| 結果ページ | ❌ 未着手 | `src/pages/result.astro` |
| 星座コンテンツ | ❌ 未着手 | `content/sun-signs/*.md` 等 |

## 更新ルール

- 大きい判断は先にドキュメントで固めてから実装する
- MVP範囲を勝手に広げない（`docs/mvp-scope.md` で確認）
- 最上位方針を変える場合は `docs/product-foundation.md` を起点に見直す
- 小さい確定作業だけを repo に反映する
- `src/lib/` への追加・`content/` への追加は確認なしで進めてよい
- 既存ファイルの大規模削除・移動は止まって確認する
