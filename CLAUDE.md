# CLAUDE.md — プロジェクト方針

## ドキュメント参照先

- **世界観・方針**: `docs/product-foundation.md`
- **占星術解釈モデル**: `docs/astrology-model.md`

## アーキテクチャ方針

### `src/lib/`
- UIに依存しない**純粋関数のみ**を配置する
- フレームワーク固有の API（Astro の `Astro` オブジェクト、React の hooks 等）をインポートしない
- 副作用のある処理（DB アクセス・外部 API 呼び出し）は非同期関数として明示する

### 型定義
- 共有型はすべて `src/lib/types.ts` に定義する
- コンポーネントやページ固有の型は各ファイル内に定義してよい

### import ルール
- `src/lib/` 内の関数・型を利用する際は **`@/lib`（`src/lib/index.ts`）経由**でインポートする
  ```ts
  // Good
  import { getSunSign, toJaLabel } from "@/lib";

  // Bad
  import { getSunSign } from "@/lib/astrology/sun";
  ```

## ファイル構成

```
src/
  lib/            # UIに依存しない純粋関数・型
    types.ts      # 共有型定義
    index.ts      # バレルファイル（再export）
    astrology/    # 占星術計算ロジック
    utils/        # 汎用ユーティリティ
    content.ts    # コンテンツ取得ロジック
  pages/          # ページコンポーネント
  components/     # UIコンポーネント
  styles/         # スタイルシート
content/
  sun-signs/      # 太陽星座別リーディングコンテンツ
  moon-signs/     # 月星座別リーディングコンテンツ
  ascendants/     # アセンダント別リーディングコンテンツ
public/
  images/
  fonts/
```
