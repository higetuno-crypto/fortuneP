# fortuneP

> 開発に関わる場合は、必ず最初に `docs/REPOSITORY_GUIDE.md` を読んでください。

fortuneP は、**神秘的でかわいい世界観**と、**スマホで迷わず使える体験**を両立しながら、
太陽星座・月星座・アセンダントを軸に「表の自分・心の奥・人から見える雰囲気」を読めるプロダクトを目指しています。

**「かわいいのに、ちゃんと読める」占星術体験**をつくることを目的としています。

---

## AIクイックナビ

このセクションはAIエージェントが素早くプロジェクト文脈を把握するための構造化情報です。

### プロジェクト5行サマリー

| 項目 | 内容 |
|---|---|
| サービス | スマホ向け占星術サイト（神秘的 × かわいい × 本格感） |
| ターゲット | 女子高生〜20代前半、サブカル・Vtuber・創作層 |
| MVP | 生年月日入力 → 太陽/月/ASC算出 → 結果表示（5画面） |
| 技術 | Astro + Tailwind + TypeScript。`@/lib` 経由でimport |
| 判断優先順位 | 占星術の意味 ＞ モバイルUX ＞ 世界観・余韻 ＞ 演出コスト |

### ドキュメントマップ

| ドキュメント | カバーする内容 | 読むタイミング |
|---|---|---|
| `docs/REPOSITORY_GUIDE.md` | **開発入口**・リポジトリ全体の読み方・更新ルール | 最初に必ず読む |
| `docs/product-foundation.md` | **最上位方針**・世界観・UX原則・衝突時の判断順 | 迷ったとき必ず確認 |
| `docs/mvp-scope.md` | MVP含める/含めない機能・実装優先順位 | 実装可否を判断するとき |
| `docs/astrology-model.md` | 3要素の定義・翻訳方針・コンテンツ作成ルール | 星座関連の文を書くとき |
| `docs/brand-voice.md` | 文体・語彙・NG表現・結果文テンプレート | UIテキストを書くとき |
| `docs/ui-principles.md` | 配色・余白・コンポーネント質感・感情目標マップ | UI実装するとき |
| `docs/information-architecture.md` | 画面一覧・ルーティング・データフロー | 画面/導線を設計するとき |
| `docs/technical-plan.md` | 技術スタック・ライブラリ・設定方針 | 技術判断をするとき |
| `docs/autonomous-operation.md` | 自走OK/NG判断基準・迷ったときの優先順位 | 自律実行の可否を判断するとき |
| `docs/agents/README.md` | 役割別エージェント一覧・フェーズ別の使い方 | 相談先を決めるとき |
| `CLAUDE.md` | アーキテクチャ制約・import規則・ファイル構成 | コードを書くとき |

### 実装状況

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

---

## 目次

1. [fortuneP とは](#fortunep-とは)
2. [開発参加前に読むもの](#開発参加前に読むもの)
3. [判断の優先順位](#判断の優先順位)
4. [フォルダ構成](#フォルダ構成)
5. [エージェント運用について](#エージェント運用について)
6. [更新ルール](#更新ルール)

---

## fortuneP とは

fortuneP は、**神秘的でかわいい世界観**と、**スマホで迷わず使える体験**を両立しながら、
太陽星座・月星座・アセンダントを軸に、

- 表の自分
- 心の奥の自分
- 人から見える雰囲気

を読めるプロダクトを目指しています。

---

## 開発参加前に読むもの

### 最優先
1. `docs/REPOSITORY_GUIDE.md`
2. `docs/product-foundation.md`

### 基本セット
3. `docs/mvp-scope.md`
4. `docs/astrology-model.md`
5. `docs/brand-voice.md`

### エージェント運用を使う場合
6. `docs/agents/README.md`
7. `docs/agents/operation-model.md`

---

## 判断の優先順位

fortuneP では、判断がぶつかったときは以下の順で優先します。

1. 占星術として意味が通っているか
2. モバイルで使いやすいか
3. 世界観・ロマン・余韻を深められるか
4. 実装可能か
5. 拡散しやすいか
6. 将来の収益導線として魅力があるか

---

## フォルダ構成

| フォルダ | 役割 |
|---|---|
| `docs/` | プロダクト方針・設計・運用ルール |
| `docs/agents/` | エージェント役割定義と運用モデル |
| `src/lib/` | 純粋関数・型定義（UIに依存しない） |
| `src/pages/` | ページコンポーネント |
| `src/components/` | UI部品 |
| `src/content/` | Astro Content Collections 設定 |
| `content/` | 星座別リーディングMarkdown |
| `public/` | 静的ファイル（画像・フォント） |

---

## エージェント運用について

fortuneP では、複数の役割を同時並列に動かすのではなく、
**1つの専属エージェントが、必要な視点を順番に切り替えながら統合する** 方針を取ります。

- まず主担当を決める
- 必要な補助担当を通す
- 最後に統合する

詳細は `docs/agents/operation-model.md` を参照してください。

---

## 更新ルール

- 大きい判断は、先にチャットや設計文書で固める
- 小さい確定作業だけを repo に反映する
- 最上位方針を変える場合は、必ず `docs/product-foundation.md` を起点に見直す
- MVP範囲を勝手に広げない
- 詳細な読み順・参照順は `docs/REPOSITORY_GUIDE.md` に集約する

---

## 合言葉

> かわいいだけで終わらない。
> 神秘的なだけで濁さない。
> fortuneP は、**ちゃんと読める星の体験**をつくる。
