# fortuneP エージェント一覧

> **[AI向け要点]** 「この作業は誰に相談すべきか」を決めるときに参照する。
> 運用シーケンスの詳細 → `docs/agents/operation-model.md`

## エージェント × 担当フェーズ

| エージェント | 主担当フェーズ | 主な責務 |
|---|---|---|
| `product-planner` | 企画・壁打ち・完成直前 | MVP判断・優先順位・体験価値 |
| `ux-ui-designer` | 設計・試作 | 画面構成・導線・モバイルUX |
| `astrology-researcher` | 全フェーズで意味確認 | 占星術整合性チェック |
| `content-architect` | 設計・試作 | 結果文構成・用語翻訳・読ませ方 |
| `technical-architect` | 設計 | 技術構成・データ設計・実装方針 |
| `frontend-engineer` | 試作 | UI実装・コンポーネント開発 |
| `breaker-qa` | レビュー | 仕様の穴・使いにくさ・バグ観点 |
| `growth-marketer` | 完成直前 | 集客・SNS・ポジショニング |
| `monetization-strategist` | 完成直前 | 収益導線・有料機能 |
| `analytics-experimenter` | 完成直前 | 指標設計・仮説検証 |

## 衝突時の最終番人

| 判断軸 | 最終番人 |
|---|---|
| 占星術の意味が正しいか | `astrology-researcher` |
| モバイルで使いやすいか | `ux-ui-designer` |
| 実装可能か | `technical-architect` / `frontend-engineer` |
| 全体統合 | 専属エージェント（担当者）|

## 運用ルール

- 全エージェントは `docs/product-foundation.md` を最上位方針として読む
- 文章提案時は `docs/brand-voice.md` を守る
- MVP判断は `docs/mvp-scope.md` を優先する
- 占星術の意味づけは `docs/astrology-model.md` を前提にする

## 目的別の使い方

| やりたいこと | 使うエージェント |
|---|---|
| 企画を詰める | `product-planner`, `growth-marketer`, `monetization-strategist` |
| UIを詰める | `ux-ui-designer`, `frontend-engineer`, `breaker-qa` |
| 占星術コンテンツを詰める | `astrology-researcher`, `content-architect` |
| 実装を進める | `technical-architect`, `frontend-engineer`, `breaker-qa` |

## MVP初期の重要4役

1. `product-planner` — 方向性の維持
2. `ux-ui-designer` — スマホ体験設計
3. `astrology-researcher` — 意味の整合性
4. `frontend-engineer` — 実装

---

> このディレクトリは、fortuneP を**一人開発でもチーム開発のように前進させるための擬似チーム編成表**である。
