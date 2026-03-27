# fortuneP エージェント一覧

## 目次

- [運用ルール](#運用ルール)
- [推奨エージェント構成](#推奨エージェント構成)
- [使い方](#使い方)
  - [1. 企画を詰めたいとき](#1-企画を詰めたいとき)
  - [2. UIを詰めたいとき](#2-uiを詰めたいとき)
  - [3. 占星術コンテンツを詰めたいとき](#3-占星術コンテンツを詰めたいとき)
  - [4. 実装を進めたいとき](#4-実装を進めたいとき)
- [まず最初に動かすとよい組み合わせ](#まず最初に動かすとよい組み合わせ)
- [一言で言うと](#一言で言うと)

このディレクトリは、fortuneP を進めるための**役割別エージェント定義**をまとめる場所です。

各エージェントは `docs/product-foundation.md` を最上位方針として扱います。

## 運用ルール

- 全エージェントは `docs/product-foundation.md` を最上位方針として読む
- 文章提案時は `docs/brand-voice.md` を守る
- MVP判断は `docs/mvp-scope.md` を優先する
- 占星術の意味づけは `docs/astrology-model.md` を前提にする
- エージェント同士で意見が割れたら、まずは「MVPで必要か」「世界観を深めるか」「スマホで使いやすいか」で判断する

## 推奨エージェント構成

1. `product-planner.md`  
   - プロダクトの核、優先順位、機能選定を担当
2. `ux-ui-designer.md`  
   - モバイルUI、導線、画面構成、ビジュアル体験を担当
3. `astrology-researcher.md`  
   - 西洋占星術の概念整理、整合性チェックを担当
4. `content-architect.md`  
   - 結果文構成、用語翻訳、読みやすさ設計を担当
5. `technical-architect.md`  
   - 技術構成、データ設計、実装方針を担当
6. `frontend-engineer.md`  
   - 実装、コンポーネント、画面開発を担当
7. `breaker-qa.md`  
   - 破壊的視点、仕様の穴、使いにくさ、バグ観点を担当
8. `growth-marketer.md`  
   - 集客、SNS、ポジショニング、伝わり方を担当
9. `monetization-strategist.md`  
   - 収益導線、有料機能、無料/有料の線引きを担当
10. `analytics-experimenter.md`  
   - 指標設計、仮説検証、改善サイクルを担当

## 使い方

### 1. 企画を詰めたいとき

- `product-planner.md`
- `growth-marketer.md`
- `monetization-strategist.md`

### 2. UIを詰めたいとき

- `ux-ui-designer.md`
- `frontend-engineer.md`
- `breaker-qa.md`

### 3. 占星術コンテンツを詰めたいとき

- `astrology-researcher.md`
- `content-architect.md`

### 4. 実装を進めたいとき

- `technical-architect.md`
- `frontend-engineer.md`
- `breaker-qa.md`

## まず最初に動かすとよい組み合わせ

MVP初期は以下の4役が特に重要。

- Product Planner
- UX/UI Designer
- Astrology Researcher
- Frontend Engineer

## 一言で言うと

このディレクトリは、fortuneP を**一人開発でもチーム開発のように前進させるための擬似チーム編成表**である。
