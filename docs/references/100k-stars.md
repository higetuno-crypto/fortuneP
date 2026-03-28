# 100,000 Stars — スクリーンショット分析

URL: https://stars.chromeexperiments.com/
スクリーンショット: `images/100k-stars-01-overview.jpg`

ユーザーコメント: 「宇宙を漂う当事者感が衝撃だった。光っている星が小さくなっていくのが、星との距離を感じられて良かった」

---

## スクリーンショット① 近傍星ビュー

```
[ 純黒背景 ]

   Capella ●              Castor ●
                                 Vega ●
   Gamma Geminorum ●
                     Kruger 60 ●   Pollux ●
                                              Groombridge 1618 ●

                        Altair ●
                                     Lalande 21185 ●
  96G.Piscium ●
  HR 753 ●   Van Maanen's ●   Barnard's ●
                    ★ SUN (中心・最大・最明)
                                 ● Sirius
              Lacaille 9352 ●
              Lacaille 8760 ●

   Fomalhaut ●          Kapteyn's ●

        82 G. Eridani ●


  p Eridani ●

                              [ ← 右端にスライドバー ]
```

---

## 星のglow構造（重要）

このサイトの核心は **多層グロウ** の表現。近い星ほど全ての層が大きく、遠い星は点のみ。

### 近い・明るい星（例：Capella、Vega）
```
     ╭───────────────╮   ← 外側: 青白の広いglow（blur大）
   ╭─┤  ╭─────────╮  ├─╮ ← 中間: より明るいhalo
   │ │  │  ◎ 白核  │  │ │ ← 中心: 純白の点
   ╰─┤  ╰─────────╯  ├─╯
     ╰───────────────╯
```

### 太陽（最も近い = 最も大きく・暖色）
```
     ╭─────────────────────────────╮  ← 最外層: 暖色オレンジ glow
   ╭─┤  ╭─────────────────╮        ├─╮
   │ │  │  ╭───────────╮  │        │ │ ← 中間: 黄〜白の glow
   │ │  │  │  ◎◎ 核    │  │        │ │
   │ │  │  ╰───────────╯  │        │ │
   ╰─┤  ╰─────────────────╯        ├─╯
     ╰─────────────────────────────╯

  → 純白の核 + 暖色（琥珀→オレンジ）の大きなhalo = 「近い恒星」の表現
```

### 遠い星（背景の小さな点）
```
    ·  ← 1〜2px の白点。ほぼglowなし
```

---

## 距離感の作り方（核心洞察）

ユーザーが感動した「星が小さくなっていくことで距離を感じる」の正体:

| 距離 | 見た目 |
|---|---|
| 極近（太陽など） | 大きな暖色glow + 十字フレア + 広いhalo |
| 近（~50光年） | 中サイズの青白glow + 白核 |
| 中（~100光年） | 小さなglow + 白核 |
| 遠（~500光年以上） | 1〜2pxの白点のみ |

**この「サイズのグラデーション」こそが没入感の源泉。**
スライドバーでズームアウトすると全ての星が小さくなり「宇宙の広さ」を体感できる。

---

## CSS で再現できる glow 表現

```css
/* 近い明るい星: 多層box-shadow */
.star-bright {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    /* 白核の拡張 */
    0 0 2px 1px rgba(255, 255, 255, 1),
    /* 内側glow: 青白 */
    0 0 6px 3px rgba(200, 220, 255, 0.8),
    /* 中間glow */
    0 0 14px 6px rgba(160, 190, 255, 0.4),
    /* 外側glow: 広く薄く */
    0 0 30px 12px rgba(120, 160, 255, 0.15);
}

/* 太陽に近い暖色星 */
.star-warm {
  width: 5px; height: 5px;
  background: #fff8e0;
  box-shadow:
    0 0 3px 2px rgba(255, 255, 230, 1),
    0 0 10px 5px rgba(255, 200, 100, 0.6),
    0 0 25px 12px rgba(255, 140, 40, 0.3),
    0 0 50px 20px rgba(200, 80, 10, 0.12);
}

/* 遠い星: 点のみ */
.star-distant {
  width: 1px; height: 1px;
  background: rgba(255, 255, 255, 0.7);
  /* box-shadowなし */
}
```

---

## 十字フレア（レンズフレア風）

明るい星に見られる十字の光条。CSSで実現する場合:

```css
.star-flare::before,
.star-flare::after {
  content: '';
  position: absolute;
  background: linear-gradient(
    to right,
    transparent,
    rgba(200, 220, 255, 0.4) 50%,
    transparent
  );
  width: 40px; height: 1px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.star-flare::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
```

---

## fortuneP への示唆

### 即実装可能（HIGH）

**星の種類を3〜4段階に分ける:**

```ts
// ビルド時の星生成
type StarTier = 'bright' | 'mid' | 'dim' | 'distant';

function getStarTier(rand: number): StarTier {
  if (rand < 0.03) return 'bright';  // 3%: 明るい近傍星
  if (rand < 0.12) return 'mid';    // 9%: 中程度
  if (rand < 0.35) return 'dim';    // 23%: 薄め
  return 'distant';                  // 65%: 遠い点
}
```

各 tier に異なるサイズ・glow強度を適用 → **同じCSSで「距離感」を演出**

### 色温度バリエーション（MEDIUM）

```ts
const starColors = [
  '#ffffff',   // 白（中性）
  '#e8f0ff',   // 青白（若い/熱い星）
  '#fff5d4',   // 温白（太陽型）
  '#ffe0a0',   // 淡金（fortuneP のテーマカラーとも一致）
];
```

### スライドバーは不要
操作UIは fortuneP の世界観に合わない。
固定の「漂っている」視点で、ページロード時に星がゆっくり奥から手前に流れる演出の方がよい。

---

## 参考画像ファイル

`docs/references/images/` に格納してください:

| ファイル名 | 内容 |
|---|---|
| `100k-stars-01-overview.jpg` | 近傍星ビュー（太陽中心、各星のglow） |
