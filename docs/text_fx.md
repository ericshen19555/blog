# `fx` 文字特效使用說明

`fx` 是 Hexo Tag，用來在文章中顯示帶有 hover 動畫、特效游標與文字光影的醒目文字。

目前提供兩種特效：

- `flame`：火焰色文字、火焰陰影動畫與火焰 Emoji 游標。
- `holy`：金白色文字、十字光芒與祈禱 Emoji 游標。

## 基本用法

`fx` 是區塊型 Tag，必須使用 `{% endfx %}` 結束。參數採用 `key=value` 格式：

```markdown
{% fx type=flame size=60px %}
劣勢要貪！
{% endfx %}
```

```markdown
{% fx type=holy size=60px %}
信 ZKW 得永生
{% endfx %}
```

產生的 HTML 會使用共通的 `.fx-text` 類別，以及對應特效的 `.fx-<type>` 類別。

## 參數

| 參數 | 必填 | 說明 | 範例 |
| --- | --- | --- | --- |
| `type` | 是 | 特效名稱，必須是 `FX_CONFIG` 中已註冊的名稱。 | `type=flame` |
| `size` | 否 | 這次使用的字體大小，會直接作為 CSS `font-size`。 | `size=2.5rem` |

顯示文字不是參數，而是 `{% fx %}` 與 `{% endfx %}` 之間的內容。特效名稱或顯示文字為空白時，Tag 會輸出空字串並在 Hexo 建置時顯示警告；未知的特效名稱也會被跳過。

目前 `fx` 已註冊為區塊型 Tag，因此不要使用沒有 `{% endfx %}` 的單行寫法，也不要把顯示文字寫成 `text=...` 參數。

## 新增特效

假設要新增名稱為 `ice` 的冰霜特效，建議依序完成以下步驟。

### 1. 在 Tag plugin 註冊游標設定

編輯 [`scripts/text_fx.js`](../scripts/text_fx.js) 的 `FX_CONFIG`：

```javascript
const FX_CONFIG = {
  flame: { emoji: '🔥', x: 16, y: 4 },
  holy: { emoji: '🛐', x: 0, y: 0 },
  ice: { emoji: '🧊', x: 0, y: 0 }
};
```

- `emoji` 是游標顯示的 Emoji。
- `x`、`y` 是游標 hotspot，代表實際點擊位置；應選在 Emoji 的視覺中心或尖端。
- 名稱必須只使用容易形成 CSS class 的小寫英文字母、數字或連字號，例如 `ice`、`dark-fire`。

### 2. 在主題樣式新增特效類別

編輯 [`themes/frame/source/css/post/text_fx.styl`](../themes/frame/source/css/post/text_fx.styl)，加入 `.fx-ice` 的專屬樣式：

```stylus
.fx-ice:hover
  color #b8f3ff

.fx-ice::after
  text-shadow 0 0 12px rgba(120, 230, 255, 0.9), 0 0 28px rgba(40, 160, 255, 0.7)
```

共通的結構、字體、放大、游標 fallback 與文字投影層已由 `.fx-text` 提供；新特效通常只需要定義自己的 hover 顏色、`::before` 光影或 `::after` 動畫。

### 3. 在文章中使用

```markdown
{% fx type=ice size=60px %}
冰霜文字
{% endfx %}
```

### 4. 建置檢查

```bash
npm run build
```

確認 Hexo 沒有 Tag 或 Stylus 錯誤，並檢查輸出的文章是否包含 `.fx-ice`。完成新特效後，應一併測試正常文字、空白文字與未知特效名稱。

## 新特效風格規範

新特效應延續 `flame` 與 `holy` 的共同設計，而不是重新建立另一套文字元件：

1. **共用基底**：使用 `.fx-text` 的版型與互動行為；不要重複定義字體、`display`、`position`、`transition` 或 `data-text` 投影結構。
2. **特效類別命名**：使用 `.fx-<type>`，且 `<type>` 必須與 `FX_CONFIG` 的名稱完全一致。
3. **hover 才呈現強烈效果**：平時保持可讀，將主要變色、光暈、放大或背景光集中在 `:hover` 狀態。
4. **分離視覺層次**：`::after` 適合承載文字陰影、殘影與動畫；`::before` 適合承載光束、圖形或背景裝飾。裝飾層應設定 `pointer-events: none`，避免阻擋文字互動。
5. **保持文字可讀**：特效色彩應和背景有足夠對比；動畫應是文字的輔助，不應長時間遮住文字本身。
6. **動畫要克制**：優先使用短而可重複的 CSS animation，避免過大的位移、閃爍或影響周圍版面的 layout；需要變形時使用 `transform`。
7. **避免污染全域樣式**：動畫名稱、類別名稱與 CSS 變數應具有 `fx-` 語意，避免與主題或其他文章元件撞名。
8. **維持游標一致性**：每個特效都應在 `FX_CONFIG` 提供代表性的 Emoji 與正確 hotspot，並保留 `pointer` fallback。
9. **遵守現有單位與層級**：尺寸使用 `rem`、`px` 等明確 CSS 單位；裝飾層的 `z-index`、透明度與 overflow 應仿照現有特效，不能讓光影蓋住文章內容。

若新特效需要全新的 HTML 結構、Tag 參數或 JavaScript 行為，應先確認是否真的能用現有 `.fx-text` 基底完成；只有在共通模型不足時，才擴充 plugin，而不要在單篇文章中加入行內 `<style>`。
