# 霧雨魔理沙 参考画像④ — ブレイジングスター

画像: `marisa-reference-04-blazing-star.jpg`（minusT 3DCG）
スペルカード: 恋符「ブレイジングスター」(Love Sign "Blazing Star")
キーワード: 流星、先端に魔理沙、箒の後ろから星の魔法が飛ぶ、まさに流星になる魔法

---

## 「ブレイジングスター」の構造

```
← 進行方向

  [強烈なシアン発光] ←── 魔理沙 + 箒の先端
   ↑コメット形状の伸びた光
        ●●●  ← 密集した発光球（青白）
           ●  ●   ●
              ●       ●  ●
                 ●        ●   ●   ← 散っていく発光球
                    ●               ●     ●
```

### 頭部（魔理沙の位置）
- **色**: 強烈なシアン〜青白（`#00ffee`〜`#80ffff`）
- **形**: 楕円形に伸びたコメット型。進行方向に長軸
- **強度**: bloom全開。周囲が白く飛んでいる
- **サイズ**: 50〜80px相当の大きな輝き

### 軌跡の発光球（魔法の星）
- **形**: 円形（球体）。丸い輝点
- **色**: 青白〜白（`#a0e8ff`〜`#ffffff`）
- **サイズ変化**: 頭部近く=大 → 遠くなるほど小
- **密度変化**: 頭部近く=密集 → 遠くなるほど疎
- **配置**: 完全な直線ではなく、**左右に若干バラける**（魔法が飛び散るイメージ）
- **glow**: 各球体に多層box-shadow（白核 + 青白bloom）

### 背景（最も写実的な夜空）
- **深ネイビー〜暗いティール**: `#0a1220`〜`#0d1a28`
- **天の川**: 画面中央〜右に茶色/琥珀色の星雲帯が横たわる
- **星の密度**: 中〜高。無数の小点が奥行きを作る
- **全体の色温度**: このシリーズで最も「本物の夜空」に近い

---

## CSS実装の設計図

このビジュアルは CSS animation で実現可能。

### 現在の shooting star との差分

| 現状 | ブレイジングスター |
|---|---|
| 線形グラデーション（光の筋）| 円形の発光球が連なる |
| 金色 | シアン〜青白 |
| 均一な尾 | 頭部近くが密集、遠くなるほど疎 |
| 直線軌跡 | わずかなバラケあり |

### 実装アイデア

```html
<!-- 頭部: 魔理沙（コメット形状） -->
<div class="blazing-head"></div>

<!-- 軌跡の球: 近い（大・密） -->
<div class="trail-orb large" style="--delay: 0.05s; --offset: 0px"></div>
<div class="trail-orb large" style="--delay: 0.1s;  --offset: 3px"></div>
<div class="trail-orb large" style="--delay: 0.15s; --offset: -2px"></div>
<!-- 中間 -->
<div class="trail-orb mid" style="--delay: 0.3s; --offset: 5px"></div>
<div class="trail-orb mid" style="--delay: 0.4s; --offset: -4px"></div>
<!-- 遠い（小・疎） -->
<div class="trail-orb small" style="--delay: 0.7s; --offset: 8px"></div>
<div class="trail-orb small" style="--delay: 1.0s; --offset: -6px"></div>
```

```css
.blazing-head {
  width: 60px; height: 20px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 70% 50%,
    #ffffff 0%, #a0ffff 30%, #00ccee 60%, transparent 100%);
  filter: blur(2px);
  box-shadow:
    0 0 8px 4px rgba(0, 220, 255, 0.9),
    0 0 20px 10px rgba(0, 180, 220, 0.5),
    0 0 40px 20px rgba(0, 140, 200, 0.2);
}

.trail-orb {
  position: absolute;
  border-radius: 50%;
  background: #ffffff;
  transform: translateY(var(--offset));
  animation: orb-appear var(--delay) ease-out forwards;
}
.trail-orb.large  { width: 12px; height: 12px;
  box-shadow: 0 0 4px 2px rgba(160,232,255,0.9), 0 0 12px 6px rgba(0,180,255,0.4); }
.trail-orb.mid    { width: 8px;  height: 8px;
  box-shadow: 0 0 3px 1px rgba(160,232,255,0.8), 0 0 8px 4px rgba(0,180,255,0.3); }
.trail-orb.small  { width: 5px;  height: 5px;
  box-shadow: 0 0 2px 1px rgba(160,232,255,0.6); }
```

---

## fortuneP の流れ星をこれに置き換える

現在の index.astro / loading.astro の流れ星は「光の筋」。
これを「ブレイジングスター型」に改修すると一気に世界観が上がる。

### 変更点
1. 金色グラデーション筋 → **シアンのコメット頭部 + 散らばる球体の軌跡**
2. 単一 `<div>` → **頭部 + 複数の trail orb の組み合わせ**
3. 流れ星の色: gold → **cyan/blue-white**（魔法らしさ）

### 実装難易度: 中
- CSS animation の `animation-delay` で各球体をずらす
- `translateY` のランダムオフセットで「バラケ」を表現
- Astro frontmatter でビルド時に乱数生成（他の星と同じパターン）

---

## 世界観的な意味

> 「箒の後ろから星型の魔法が飛んでいる。まさに流星になる魔法」

これは fortuneP の体験の比喩としても完璧:

| ブレイジングスター | fortuneP の体験 |
|---|---|
| 魔理沙が流星そのものになる | ユーザーが星の世界に入り込む |
| 箒で夜空を駆け抜ける | 占星術で自分の星を読む旅 |
| 後ろに残る光の粒子 | 星読みの余韻・残光 |

---

## ファイル情報

| ファイル名 | 内容 |
|---|---|
| `marisa-reference-04-blazing-star.jpg` | ブレイジングスター。流れ星実装の最重要参考 |

出典: minusT（YouTube / 東方Project 3DCG）
スペルカード: 恋符「ブレイジングスター」

---

## 実装優先度

**HIGH** — index.astro / loading.astro の流れ星をこのデザインに置き換える。
現在の CSS animation 構造を大きく変えずに実現可能。
