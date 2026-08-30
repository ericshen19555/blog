---
title: 2026 暑假的團體賽
date: 2026-08-30 21:05:39
tags: contest
---

# 前言

有人敲碗，所以我要來寫(?)

反正 blog 架都架了ww

然而本人記性極差，基本上所有東西都是從有記錄下來的東西（聊天紀錄、照片）回憶的，簡單來講我很笨。

# 找隊友

因為唐狗針不要我了，所以我在選訓找了~~中一中男朋友~~楊寬洋，然後~~就找不到再一個人了~~發現有 sheep 欸，那就跟他一組了，咩。

所以說，~~我們是羊洋隊。~~

而 NTUCPCPC 則決定照未來 ICPC 的隊伍，跟 max 和 mocha，去練練手。

# 取隊名

## 艱困地取隊名

<div style="text-align: left;">
  <img src="naming01.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
  <img src="naming02.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
</div>

<div style="text-align: left; margin-top: 30px;">
  <img src="naming03.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
  <img src="naming04.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
</div>

<div style="text-align: left; margin-top: 30px;">
  <img src="naming05.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
</div>

花很久時間取了個非常隨便的隊名w

## 順利(?)地取隊名

<div style="text-align: left; margin-top: 30px;">
  <img src="naming06.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
  <img src="naming07.png" style="width: 48%; height: auto; vertical-align: top;" alt="取隊名">
</div>

「一個人實作那其他兩個是不是 vibecoding」是因為我基本上負責整場實作，而 max 和 mocha 則是負責看題目、精神出解，然後告訴我解法。

「`ICPC_parc`」則是我們在 Codeforces 上面的團練 team 名稱，我原本要打 `prac` 結果 typo (・∀・\;)。

# 成大賽初賽（5/31）

## 頂級配置

在初賽前幾天才發現為了避免作弊，規定三人要在*物理上*同一空間打比賽，我們北中南三個人完全不知道要怎麼湊在一起，好在唐狗針學校也有幾隊，說是我們也可以過去，總之我們就約在精誠高中了。

精誠電腦教室沒有 Wi-Fi。

所以我就拔了桌機的網路線 \:D，機智如我，延長線、網路線、網路轉接頭、HDMI 線、HDMI-VGA 轉接頭 那可是一個也沒少帶，總之我成功把筆電接上一台電腦教室的螢幕，有了雙螢幕，頂級配置。

## 比賽

因為我記性太差，加上成大根本不給補題，所以題目忘光了。

[這是我們隊的螢幕錄影](https://www.youtube.com/watch?v=JYQB3oJZlIw)，如果對題目有興趣可以看，~~我是懶得看啦~~。

我只記得我狀態其實很差。首先 pI 是簽到，於是我光速寫完（寫了一個很麻煩的狀態機，明明不用這麼麻煩），並把他丟到 pA，我甚至在傳送前還確認了幾秒鐘。

這裡就要補充一個小技巧，DOMjugde 在上傳程式（右上角的 Submit 按鈕）的時候，會依照 檔案名稱、附檔名，自動匹配 題號、程式語言，因此可以先：

```python
from string import ascii_uppercase as A
for c in A[:題目數量]:
    with open(f"{c}.py", "w") as file: ...
    with open(f"{c}.cpp", "w") as file: ...
```

把題目全部開好。這是我在 [abc864197532 的 臺灣 ICPC 簡易介紹與攻略](https://abc864197532.github.io/2026/07/09/icpc/#%E9%97%9C%E6%96%BC%E9%9B%BB%E8%85%A6%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A) 學到的，好文極推！

接下來做 pA，他是很典的 BIT 優化 DP 轉移，光速寫掉（其實稍微卡了一下，因為我貢獻重複算到了，在想怎麼好好扣掉），成功搶到首殺 \:D！

再來看板發現該做 pD，發現他是很典的排程，於是光速寫掉，吃了一發 WA，因為**我並不會寫除法向上取整**，第二發 AC，此時我們已憑藉著~~比罰時還快的手速~~跳到 rk.2。

空檔，嚴肅撰寫 C++ 模板。

接著，pC 是很典的對答案二分搜 + 單調隊列優化 DP 轉移，然而我對成大機器速度的信心遠大於對自己撰寫單調隊列的信心，因此我砸了 zkw，然後吃了 TLE，handle 成功回收！仍然相信成大機器的速度，嘗試鴨腸，吃了第二發 TLE！認命地改成單調隊列，吃了 WA，發現我的寫法很笨，重寫了一下，終於 AC 了，此時我們竟然跳到 rk.1！手速真的很快，~~罰時也真的很高~~。後來聽說有人用 zkw 過，我猜測是我二維陣列的方向讓 cache 很爛。

拿著紙本題本跟隊友精神了一下，我開始寫 pH，這題只要 Sort 再 $\mathcal{O}(n)$ 掃描就能做掉，而很恐怖的是我們弄這題弄了超過一個小時。我砸了 BIT 還一直精神怪怪的，還好羊~~看不下去了~~，觀察了一個很好的性質，但區間邊界的 case 還是一直怪怪的，送了 n 發、排列組合各種 edge case 的情況以後終於 AC。結論是他左開右閉，根本沒定義清楚，完全傻爆眼。此時 rk.2，依舊是贏在手速。

接下來是 pG，分段的矩陣快速冪優化 DP。~~我因為太久沒碰矩陣快速冪，所以忘記怎麼寫矩陣乘法，被羊嗆{% spoiler （這是伏筆） %}。~~ 測範測不太對，一陣亂湊亂湊以後終於對了，傳上去 TLE，何意味啊？結果是我太依賴 Python 大數，有個地方偷懶少 mod，然後就燒了。第二發 AC，此時 rk.3。

剩三題。因為 B 很快有人首殺，但很多人 WA，但不管先猜 B 的構造很水，結果猜錯，我們也成為 WA 的很多人。

接下來發現 F 是一題布丁出的很好的最短路題，羊提出了一個壓掉 $2 ^ 9$ 空間的方法（最外層迴圈枚舉 bit mask，不用實際建點），超級聰明。然而 TLE，但這題好就好在他不用 Dijkstra，楊寬洋觀察到他的邊權 $\le 3$，因此建 $3n$ 左右個桶子就好了，AC。這題充分體現了**團隊合作，讚**！

剩下 pB、pE，我們以為 pE 很難於是決定做 pB，但最後沒構造出來，他是神奇數奧題目所以小皮很快 AC，被嗆了嗚嗚嗚。

而 pE 則是很典的用 heap 依序取前 $k$ 小，應該要戳這題的。賽後我很快用 Python 寫掉，但 TLE，因為~~布丁信誓旦旦說 Python 不會被卡常然而完全被卡死。~~

## 開板

成大賽的開板很得。

*WIP*

# YTP 初賽（7/7）

*WIP*

# NTUCPCPC 初賽（7/26）

*WIP*

# YTP 決賽（8/1）

*WIP*

# NTUCPCPC 決賽（8/2）

*WIP*

# 成大賽決賽（8/14）

*WIP*

# 交大賽（8/24 ~ 26）

*WIP*
