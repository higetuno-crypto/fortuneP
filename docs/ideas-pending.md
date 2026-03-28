# 保留アイデア集 — 将来実装候補

評価は高いが、現時点では実装困難なため保留したアイデアをまとめる。

---

## ✅ 完了済み

### ブレイジングスター（恋符「ブレイジングスター」）
シアンのコメット頭部 + 散乱する青白い発光球の流れ星アニメーション。
`index.astro` / `loading.astro` に実装済み。
詳細: `docs/references/marisa-04-blazing-star.md`

---

## 保留: 魔理沙モチーフの装飾（アセット待ち）

### 概要
霧雨魔理沙のキャラクター性（魔女の帽子・箒）をサイト全体の装飾モチーフとして散りばめる。

### 試みた結果
ライン系SVGで描いたが、スマホの小画面・薄いopacityでは何の形か判別できず削除。
「かなり分かりにくい」——SVG線画では識別不能なため、**高品質なイラスト画像が前提**。

### 実装するために必要なアセット

| アセット | 用途 | 推奨サイズ | 透明度 |
|---|---|---|---|
| 魔女の帽子（正面/斜め）| 画面端の装飾 | 100〜150px幅 | 10〜20% |
| 箒（縦/斜め）| 画面端・コーナー装飾 | 50〜80px幅 | 10〜15% |
| 箒+帽子の飛翔シルエット | 流れ星アニメーション | 120〜160px幅 | 50〜70% |

### 実装ヒント（アセット入手後）

```html
<!-- index.astro — 画像ありの流れ星 -->
<div class="marisa-fly">
  <img src="/images/marisa-fly.png" width="160" alt="" aria-hidden="true" />
</div>
```

```css
.marisa-fly {
  position: absolute; top: 28%; right: -200px; opacity: 0;
  animation: marisa-across 18s ease-in-out infinite;
}
@keyframes marisa-across {
  0%   { right: -200px; opacity: 0; }
  4%   { opacity: 0.55; }
  90%  { opacity: 0.45; }
  100% { right: 110%; opacity: 0; }
}
```

---

## 保留: ホタル浮遊パーティクル

小さな琥珀色の光球がゆっくり上昇するアニメーション。
「魔法の森」参考画像から着想。冷たい星空に温かみを加える。

実装難度: 低（CSS数行）。
詳細: `docs/references/magical-forest-01.md`

```css
.firefly {
  width: 3px; height: 3px; border-radius: 50%;
  background: #ffc040;
  box-shadow: 0 0 4px 2px rgba(255,180,40,0.8), 0 0 10px 4px rgba(255,150,20,0.3);
  animation: ff-float var(--dur) ease-in-out infinite;
}
@keyframes ff-float {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  20%  { opacity: 0.9; }
  50%  { transform: translateY(-40px) translateX(8px); opacity: 0.6; }
  100% { transform: translateY(-90px) translateX(-5px); opacity: 0; }
}
```

---

## 保留: ページ遷移「星空飛び込み」

トップ→入力ページへの遷移時に、星空に飛び込むようなZ軸前進アニメーション。
CSS `scale` + `opacity` で「前に進む」感を演出。
実装難度: 中（View Transitions API または手動CSS）。
