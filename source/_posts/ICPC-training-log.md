---
title: ICPC 團練日記
date: 2026-10-09 12:58:58
tags: [ICPC, contest]
---

*WIP*

先挖坑，之前的再慢慢補

# 2026/8/11 - [The 2025 ICPC Southwestern Europe Regional Contest (SWERC 2025)](https://qoj.ac/contest/2692)

mocha 打完 IOAI 回歸後的第一場。 \
因為房間冷氣壞掉，我在家附近的咖啡廳打。

- A：最後 max 自己做掉了，但聽他說寫得很噁心，感覺可以研究一下官解。後來 max 申請協助對拍，有成功對拍出來，因此只吃了一筆罰時，這部分的配合有打出來，然而這題還是花了太多時間。
- B：檢討自己的實作。一開始 Off By One、又忘記 Python 的 `bisect` 要怎麼好好搜區間、連二分搜條件都列錯...我是沙比。但這題不難對拍，最後也有成功對出來，有成功避免更多罰時，但我仍是沙比。 \
對答案二分搜 $[s, t)$ 區間：`s + bisect(range(s, t), value, key=...)`，**前面的 `s +` 不要忘記**。
- C：再次檢討自己的實作。這題我們用 Hash 解，我掏出了 $1145141$ 作為多項式 Hash 的 Base，這題 $n \le 70$，值 $\le 2450$，很快寫完，傳上去 WA。 \
雖然自然溢出，但這麼~~臭~~的質數根本沒理由被卡，但我還是換成 `unordered_map`，至少先確保正確性，還是 WA。 \
終於寫出對拍（因為是輸出任意解法都可，所以花了比預想久的時間），但完全對拍不出來，靈光一現把 `m` 調大以後對出 WA 了，但已經用 `unordered_map` 了，不可能是 Hash Collision 的問題啊？結果是我 `ans[]` 開太小，戳出去了，改好以後送，還是 WA。因為我改 `unordered_map` 時，又有一個地方的 index 寫爛，戳出去了，我完全是沙比吧。 \
這題主要問題還是被 Hash 的非確定性誤導了，往錯的方向 Debug。 \
**相信 Hash 的正確性，不要相信自己開出 C-Style Array 大小的正確性。**
- D：水。
- E：水。
- F：水。
- G：快結束的時候做出來，但 mocha 精神的構造是爛的，但感覺小修小補一下有機會過？線段樹結構感覺就超好。可補題。 \
*補：二叉樹不夠好，但換成 $m = \sqrt[3]{n}$ 叉樹就行。*
- H：沒看
- I：沒看
- J：我在 Debug B 的時候 max 負責實作 mocha 寫出來的 DP 轉移，但戳出去了。已有檢討實作別人的 DP 轉移時需要考慮 edge/base case。
- K：沒看
- L：精神掉的純字串科技題，似乎是 SA + RMQ，可補。

# 2026/8/21 - [National Yang Ming Chiao Tung University 2025 Team Selection Programming Contest](https://codeforces.com/gym/106059)

因為下禮拜（8/25）要比交大校內賽，所以找考古題出來 vir。 \
我這場久違地發揮很好，只有 pC 吃了罰時，剩下都沒吃，非常開心。

- A：應該精神掉了：線段樹套凸包，查詢時在凸包上二分搜，但看知道這超難寫，寫一半後面沒空閒就丟了。
- B：不會 \:D
- C：我們寫出來的題目裡最難的一題。 \
我一眼(?)看出跟外接圓有關係，想說應該是判外接圓完全一樣，於是先丟給 max 推公式，先去寫其他題。 \
推完公式、寫完發現範測不太對，首先有奇怪的 $/0$ 問題，於是將聯立方程式改成克拉瑪，還是怪。 \
mocha 提出用四點共圓來判，但越講越複雜，棄案。 \
重新觀察範測，發現有一個理應 `Yes` 的被判成 `No`，所以就猜是外接圓半徑一樣，再發現我的求圓心根本寫爛了，於是改成用 $Area = \frac{abc}{4R}$ 來判，$abc$ 有根號，所以把兩邊平方。 \
除此之外還有三點共線的情況，總之很噁心，好不容易寫完了。 \
先是 `Yes / No` 寫成 `YES / NO` 而吃了一筆 WA（之前有檢討過了，還犯，我是沙比，嚴厲檢討）。 \
改完，WA。發現共線的判斷少判了一個條件，改完，WA。 \
此時剩 40 分鐘左右，mocha 叫我先去把精神掉的 pG 寫掉，因為他是 Dinic，寫起來可能比較費時間。 \
AC pG，大家一起回來 debug pC，最後 max 發現我邏輯寫爛，因此兩個三角形只有同時共線、同時不共線的時候會對，只有一個則會爛，當時還剩 2 分鐘左右，腦內風暴了一陣怎樣改最快，最終成功改好，~~在 CF 不負眾望地 lag 了 10 幾秒後~~ 成功 AC \:DDDD。
**YES / NO 輸出注意格式。**
- D：可以歸約為樹上求 LCA，還好我有研究範例測資解釋，因為範測故意少給一個 case，mocha 也沒注意到，總之最後一發 AC，團隊合作讚。
- E：簽到，自己做掉，~~想要在靜態區間和亂砸 zkw 要檢討~~、不太會二分搜要檢討。
- F：矩陣快速冪，藉由範測發現 mocha 想的某個小細節是錯的，還有自己想到另一個細節，總之一發 AC，團隊合作讚。 \
感覺可以把**矩陣快速冪加入模板**，雖然很簡單但能讓 debug 時有個東西可以比對。
- G：mocha 很聰明地一眼看出是二分圖最大權獨立集，我把 Dinic 模板一砸就過了。 \
感覺需要**更新一下 Dinic 模板**，現在有點醜。
- H：我看了看想起 $\gcd(a, b) = \gcd(a - b, b)$ 的性質，但不知道怎麼用，一講出來 mocha 就把它做掉了，團隊合作讚。
- I：滅台題。不會。
- J：二分圖最大匹配，發現邊是 $m = \mathcal{O}(n \sqrt{n})$ 量級，所以直接 $\mathcal{O}(n \cdot m)$ 的 Kuhn 模板做掉。
- K：閱讀 + 照做 的簽到。
- L：照做 的簽到。
- M：max 很會數學，然後就做掉了。 \
補模板：**研究 PBDS**、**支援 `kth, rk` 的值域 BIT**

# 2026/9/1 - [training](https://codeforces.com/gym/713830/)

早上交大光復校區體檢，因此改到晚上 18:30 ~ 23:30 團練。

三個人都到宿舍住了，第一次實體團練，max 來我和 mocha 的房間。

- A：mocha 和 max 很快做掉，但我實作小燒雞，因為把陣列的 row - col 搞反了。 \
**輸入二維陣列要確認 row-col 方向。**
- B：mocha 想太簡單、假解，我補了 case 變正解，但 `WA on test 1`，因為我的輸出格式 off by one，但這題是輸出任意解，所以沒注意到範測 WA。 \
**輸出任意解：需要手算範測驗證**
- C：排組題，算是三個人一起想出來。
- D：敘述爛到把 mocha 和 max 都搞到了。這題真的太爛了，不太想補。 \
**敘述很爛的題目，三人各看一次題目，確認理解一致後再開始想題。**
- E：mocha 一眼做掉，我很快砸掉（LCA + zkw $\times 2$）。
- F：max 很聰明地想到 flow，mocha 很聰明地想出建模，我砸模板，~~然後吃了兩筆 RE~~。 \
因為點數開太少，我認為開 $n$ 就夠（因為那部分的點數至多 mex），但實際上可能有 $>= n$ 的值，所以就爛掉。
**求 MEX 時，先把 $\ge n$ 的值特判掉。**
- G：數論題，我不會數論，這種可能要 mocha 列出式子甚至具體虛擬碼我再做 qwq。困難地寫出來了但最後 WA 沒 de 出來。 \
**加入 `extgcd` 模板**，研究更多數論模板。
- H：**超好題，推爆**。mocha 和 max 精神掉，但寫不完，因為我賽中還沒有很理解他們的做法。但我覺得單純精神掉就很厲害了。這種情況感覺給 max 寫會比較有機會？

這場的團隊合作超讚，感覺是因為實體的關係？

# 2026/9/7 - [training](https://codeforces.com/gym/714922/)

開學日，但因為 TOPC 只剩兩個禮拜，所以我們要卷。

之後跟 PCCA 都是 virtual 的形式，所以我們這次繼續練題。

體諒 max 明天有一整天的課，因此這次縮減到 4hr，反正自己戳可以少戳幾題。

我下午一下課就搭小紅巴跑去燦坤拿我的 Samsung Tab S11 Ultra 14"，再搭小紅巴回到交大，去女二二樓的便當店買了 65 元加飯多菜的便當，帶回宿舍一邊團練一邊吃。

{% cimg src=09-13-dinner.png w=60% alt="外帶加飯多菜" %}

- A：max 很快看出貪心性質（每個人至多一條出邊），因此建模出水母圖，再判環、鏈即可，但他的圖建起來很繁瑣，我花了比預期多的時間寫。普通好題。
- B：不太簡單的構造，後半場左右 mocha 仔細思考一下，就做掉了，他很聰明。
- C：應該是 mocha，分析一下複雜度發現夠好，所以一眼做掉。**有趣好題，推。** \
然而我搞錯輸入的層數的方向，又沒有仔細對照範測，花了不少時間定位問題，檢討自己。**這種 trivial 的輸入格式問題我應該要自己好好看題目。**
- D：怪題目，我們開場寫完 A 以後就開始狂送 D，但到最後還是沒做出來，也不知道解假在哪裡，他甚至很難寫，我很不開心 D:。*可能得補一下*。
- E：還不錯的梗題，$n \ge 20$ 直接特判、反之直接暴力。然而吃了一個 WA，因為我特判 $n \ge 20$ 的時候忘記 `return`，最後多輸出了一個無解，而範測沒有這 case。 \
**範測沒有的特判要驗**、**特判要記得 `return`。**
- F：mocha 很快做掉去想別題，然而 max 跟我溝通的時候出了一點差錯，我以為是要用 log trick，~~max 不知道那是甚麼就說對對對~~，然後我越寫越覺得奇怪，跟 mocha 確認以後才知道離線是為了要掃描線，不是為了 log trick，而且這題也沒有 log 的性質。 \
之後溝通時謹慎使用「log trick」這個詞，可以用三人都知道的類似題型，像是<span id="cses_distinct_values_queries">「[CSES. Distinct Values Queries](https://cses.fi/problemset/task/1734)」</span>來溝通。

新平板有夠大的ww

{% cimg src=samsungtabs11ultra.png w=80% alt="Samsumg Tab S11 Ultra 14\"" %}

# 2026/9/10 - [The 2026 ICPC Asia Japan Online First-Round Contest](https://codeforces.com/gym/106677)

第一次 PCCA 團練。卡車先講了一些比賽報名相關的事情，因此剩下的時間打三小時的場。

還沒從星期三的急性腸胃炎恢復，請了一整天的假。傍晚覺得比較好了，所以去 PCCA，但整天根本只有喝水和顆粒燕麥飲，超級低血糖，狀態極差，只有大概前半小時活著；而 max 有事情，所以只打半場。總之這場我們大概是 $1.5 + \epsilon$ 個人在打。

- pA：水。
- pB：水。
- pC：水。但我的思緒已經有點跟不上了。
- pD：給數列 $f(s)$，求第 $k$ 項，我打表完丟給他們兩個觀察，但他們在同時想，這有點沒效率，這題應該一個人想就好。後來 max 走了以後 mocha 做掉，然後丟給我寫，但那時我已經沒電了，寫超慢，最後是有做掉啦。
- pE：以為是貪心模擬，但三人接連想出反例，最後 mocha 開始判 case 然後做掉，但我可能已經省電模式了，有一個 case 記錯，吃了一筆 WA。
- pF：大實作，我跟 max 原本想出了一個夠好的解，在 max 走了以後 mocha 想到了一個感覺更好寫的解（實際上原本的比較好）我就開始寫，但我已經關機了，每寫幾行就會頭暈眼前一黑，完全不知道在幹嘛，最後沒寫出來。回去以後用原本的解法補掉了。 \
**若要戳沒被離散化到的點，需要考慮戳進單位格子的情況，此時就不用再枚舉前一點。**
- pG：比較偏數學的一題，總之 mocha 把他做掉了，他很厲害。那時我已經化為無情的實作機器，沒有電力動腦。
- pH~J：我沒看。mocha 好像有精神掉其中一題。

打完比賽回宿舍充電

{% cimg src=recharge.png w=80% alt="打完比賽回宿舍充電" %}

# 2026/9/14 - [National Taiwan University Class Preliminary 2026](https://codeforces.com/gym/106644)

星期六 mocha 去宿營（現充，認識漂亮（他說的）學姐），所以下個星期一才打。

因應競程三要求，我 vibe 了 [ICPC live logger](https://ericshen19555.github.io/icpc-live-logger/) 用來紀錄，今天使用第一版，但我把事件分得太詳細了，有夠煩的。

這似乎是台大今年的校內選拔賽？

- pA：神奇計幾，mocha 和 max 說很難想不到，~~就算想到了也很難寫~~，總之跳。
- pB：算是挺難的 flow 題吧，首先~~要看出他是 flow~~，想一個足夠好的建模不然感覺會 TLE，還要構造題目要的解法，有夠麻煩。 \
我們一開始繼續使用了加邊以後在殘餘網路上重跑，信他常數很好的方法，結果 TLE；於是改成二分搜，結果 WA；發現題目輸出是我的輸出的反函數，何意味啊？範測通過，甚至 WA on 11。
- pC：很不錯的圖論（樹？）題。我記得我雖然一發過，可是實作的時候小燒，~~但過了一個月才補團練日記所以完全想不起來哪裡燒了，我自己檢討 ><~~。**很好題，推**。
- pD：想不到吧這竟然是字串題（其實稍微觀察一下差不多就能看出來，但 mocha 說用 Z 做很漂亮，mocha 聰明 \:D）
- pE：沒看，題目好長ㄛ，好恐怖。
- pF：mocha 和 max 在最後想出了一個不確定對不對的構造，但完全沒時間寫了 :pensive:
- pG：沒看，開 6 秒感覺好恐怖。
- pH：神奇賽局，原本 mocha 以為是判 case 而已但 WA 了，改成模擬前幾輪，然後信他後面很有規律直接推，就過了。雖然 WA 一筆但我認為這應該不太好避免 🫠。
- pI：正常解法應該是 NTT，但怎麼感覺暴力+壓常也是預期解 :cold_face:，但我沒壓過，手動迴圈展開反而讓編譯器看不懂我在幹嘛，而且本來就需要加 `pragma`（`unroll-loops` 和 `avx2`）才能過 qwq。 \
**模板加入 `pragma`：**
```cpp
#pragma GCC optimize("O3,unroll-loops,no-stack-protector,omit-frame-pointer")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
```
- pJ：沒碰，感覺是爆難數學題。
- pK：67。前後綴，做完了。我在實作這題的時候，我訂的小時達顆粒燕麥飲到了，結果我太趕著下去，沒拿門禁，被鎖在在面，另一邊的門有人帶著耳機在跳繩，完全聽不到也沒看到我的呼喊，結果還是叫 max 下來幫我開門了，有夠白痴。
- pL：我賽中沒看這題。賽後看，感覺可以每 $10 ^ 4$ 個打表一下，跑得時候只需要對至多 $10 ^ 4$ 個數字套個 Pollard's rho 暴力值因數分解。mocha 說很有道理。
- pM：ZKW 優化 DP，但因為中途改 ZKW 的大小所以我查詢區間 off by one 讓 mocha 找了半小時才找出來，嚴厲檢討。 \
**資料結構的大小一定要是一個變數，不能是運算式像 $n+1$。**

# 2026/9/17 - [Syrian Private Universities CPC 2026](https://codeforces.com/gym/106670/)

星期四只有早上有課，我下午就在優化 ICPC live logger：

{% cimg src=working_on_icpc_live_logger.png w=85% alt="優化 ICPC live logger" %}

實作了 <button type="button" class="icpc-all-ac-button" aria-label="破台" onclick="triggerCelebration()">破台</button> ！

<style>
  .icpc-all-ac-button {
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-height: 40px;
    padding: 8px 11px;
    border: 1px solid transparent !important;
    border-radius: 9px;
    color: #f0f3fa;
    background: #222a38;
    font: inherit;
    line-height: inherit;
    cursor: pointer;
    vertical-align: middle;
    transition: border-color 0.4s ease, transform 0.2s ease;
  }
  .icpc-all-ac-button::before {
    content: "";
    position: absolute;
    inset: -3px;
    z-index: -2;
    border-radius: 12px;
    background: radial-gradient(circle at 10% 20%, #ff2a6d, transparent 50%),
                radial-gradient(circle at 90% 80%, #05dda6, transparent 50%),
                radial-gradient(circle at 80% 10%, #ffc700, transparent 50%),
                radial-gradient(circle at 20% 90%, #9d4edd, transparent 50%);
    background-size: 200% 200%;
    opacity: 0.35;
    filter: drop-shadow(0 0 2px rgba(0,0,0,0));
    transition: opacity 0.4s ease, filter 0.4s ease;
    animation: organicFluid 6s ease-in-out infinite alternate;
  }
  .icpc-all-ac-button::after {
    content: "";
    position: absolute;
    inset: 1px;
    z-index: -1;
    border-radius: 8px;
    background: #222a38;
    transition: background 0.4s ease;
  }
  .icpc-all-ac-button:hover::before,
  .icpc-all-ac-button:focus-visible::before {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(102, 214, 165, 0.85));
  }
  .icpc-all-ac-button:focus-visible { outline: 2px solid #75b8ff; outline-offset: 3px; }
  @keyframes organicFluid {
    0%   { background-position: 0% 0%; filter: hue-rotate(0deg); }
    33%  { background-position: 100% 40%; filter: hue-rotate(110deg); }
    66%  { background-position: 20% 100%; filter: hue-rotate(220deg); }
    100% { background-position: 100% 100%; filter: hue-rotate(360deg); }
  }
</style>

<script>
  function triggerCelebration() {
    const CONFETTI_WAVES = 8;
    const CONFETTI_INTERVAL_MS = 200;
    const CONFETTI_PARTICLES_PER_WAVE = 1500;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const colors = ['#ff3366', '#ff9900', '#ffff33', '#33cc33', '#3399ff', '#9933ff', '#ff66cc'];

    function randomGaussian(mean = 0, stdev = 1) {
      const u1 = 1 - Math.random();
      const u2 = 1 - Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      return z0 * stdev + mean;
    }

    const baseScale = Math.min(w, h);
    const gravity = h * 0.00035;
    let windTime = 0;

    const confettis = [];

    function spawnConfettiWave(count = CONFETTI_PARTICLES_PER_WAVE) {
      for (let i = 0; i < count; i++) {
        const fromLeft = Math.random() < 0.5;

        const originX = fromLeft ? w * 0.02 : w * 0.98;
        const originY = h * 0.98;
        const r = Math.random() * (baseScale * 0.015);
        const phi = Math.random() * Math.PI * 2;

        const baseAngleDeg = (fromLeft ? 1 : -1) * randomGaussian(27, 15);
        const angleRad = (baseAngleDeg * Math.PI) / 180;
        const speed = h * randomGaussian(0.032, 0.0045);

        confettis.push({
          x: originX + r * Math.cos(phi),
          y: originY + r * Math.sin(phi),
          vx: Math.sin(angleRad) * speed * (w / h),
          vy: -Math.cos(angleRad) * speed,
          size: (Math.random() * 0.006 + 0.008) * baseScale,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rSpeed: (Math.random() - 0.5) * 0.28,
          drag: 0.98,
          windSensitivity: randomGaussian(1, 0.8)
        });
      }
    }

    let wavesFired = 0;
    spawnConfettiWave(CONFETTI_PARTICLES_PER_WAVE);
    wavesFired++;

    const waveTimer = setInterval(() => {
      if (wavesFired < CONFETTI_WAVES) {
        spawnConfettiWave(CONFETTI_PARTICLES_PER_WAVE);
        wavesFired++;
      } else {
        clearInterval(waveTimer);
      }
    }, CONFETTI_INTERVAL_MS);

    const balloons = Array.from({length: 40}, () => {
      const rX = (Math.random() * 0.012 + 0.018) * baseScale;
      const rY = (Math.random() * 0.015 + 0.022) * baseScale;
      return {
        x0: Math.random() * (w - rX * 4) + rX * 2,
        y: h + Math.random() * h * 0.35 + rX * 2,
        rX,
        rY,
        speedY: (Math.random() * 0.002 + 0.003) * h,
        amp: (Math.random() * 0.015 + 0.01) * w,
        freq: Math.random() * 1.2 + 1.2,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        windSensitivity: randomGaussian(1, 0.8) * 0.2
      };
    });

    let startTime = performance.now();
    let animId;

    function draw(now) {
      const t = (now - startTime) / 1000;
      windTime += 0.0008;
      ctx.clearRect(0, 0, w, h);

      const globalWindX = Math.sin(windTime * 2 * Math.PI) * randomGaussian(0, 0.0001) * baseScale;
      const globalWindY = Math.cos(windTime * Math.PI) * randomGaussian(0, 0.00001) * h;

      for (let i = confettis.length - 1; i >= 0; i--) {
        const p = confettis[i];
        p.vx += globalWindX * p.windSensitivity;
        p.vy += globalWindY * p.windSensitivity;

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();

        if (p.y > h + 100) {
          confettis.splice(i, 1);
        }
      }

      let activeBalloons = 0;
      for (const b of balloons) {
        b.y -= b.speedY;

        const dx = b.amp * Math.sin(b.freq * t + b.phase);
        const vx = b.amp * b.freq * Math.cos(b.freq * t + b.phase);

        b.x0 += globalWindX * b.windSensitivity;
        const currentX = b.x0 + dx;

        if (b.y > -b.rY - 60) {
          activeBalloons++;

          ctx.save();
          ctx.translate(currentX, b.y);

          const bend1 = -vx * 0.12;
          const bend2 = -vx * 0.22;

          ctx.beginPath();
          ctx.moveTo(0, b.rY);
          ctx.bezierCurveTo(
            bend1, b.rY + 15,
            bend2, b.rY + 30,
            bend2 * 1.2, b.rY + 45
          );
          ctx.strokeStyle = 'rgba(240,243,250,0.45)';
          ctx.lineWidth = Math.max(1, baseScale * 0.0015);
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, b.rX, b.rY, 0, 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-b.rX * 0.15, b.rY);
          ctx.lineTo(b.rX * 0.15, b.rY);
          ctx.lineTo(0, b.rY + b.rY * 0.15);
          ctx.closePath();
          ctx.fillStyle = b.color;
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(-b.rX * 0.35, -b.rY * 0.35, b.rX * 0.25, b.rY * 0.15, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.38)';
          ctx.fill();

          ctx.restore();
        }
      }

      if (activeBalloons > 0 || confettis.length > 0 || wavesFired < CONFETTI_WAVES || t < 5.0) {
        animId = requestAnimationFrame(draw);
      } else {
        clearInterval(waveTimer);
        cancelAnimationFrame(animId);
        canvas.remove();
      }
    }

    animId = requestAnimationFrame(draw);
  }
</script>

**KFC**CA 團練，因為卡車說[比賽](#2026919-2026-icpc-asia-taiwan-online-programming-contest)前要吃 KFC 才會打的好（因為沒吃的沒打好），~~但我吃 KFC 這種這麼油的速食會拉肚子欸~~。

{% cimg src=KFCCA_TOPC.jpg w=65% alt="TOPC 前的 KFCCA" %}

我實際上沒點這麼多（~~因為不知道有沒有金額上限~~），但因為一直找不到我的，以為被拿錯了，所以允許我也拿錯別人的(?)，後來有換回來。

- pA：`print(0)`，何意味。
- pB：神奇互動題，mocha 會做，mocha 聰明。
- pC：典題，簡單轉化輕鬆做掉。
- pD：觀察出性質以後*小實作*就做掉了。我原本想用 Python 寫（因為當時我還沒把 C++ 模板打出來所以有點想偷懶 🫠），結果我為了維持低常數所以實作得很慢，還一直 debug 不出來，mocha 最後受不了就叫我用 C++ 寫了，~~然後我很快寫完然後一發 AC~~。 \
**不要排斥把 C++ 模板打出來 qwq**
- pE：max 一開始提出了一個方法，但 WA。mocha 後來想出一個好解，但我一直聽不懂某個細節，最後直接接手給他了，然後~~他終於想通我聽不懂的部份了~~，然後就做掉了。 \
**真的聽不懂 mocha 在講啥的時候，考慮直接丟給他，即時止損。**
- pF：也挺簽到的，其中有一堆數字會需要乘起來，但我被 Python 寵壞，忘記剪枝，結果乘太大被 T 了一筆。 \
**Python 中一直乘，要記得控制值域大小。**
- pG：小觀察，但還是可以暴力直接做，所以是簽到。
- pH：矩陣快速羃。但我為了壓常所以寫了個**光速羃**（預處理 $A ^ {1 \sim \lceil \sqrt{C} \rceil}$，就能 $\mathcal{O}(1)$ 查詢 $A ^ C$），一發 AC。
- pI：應該算是最難的題？需要建出 KMP jump table，用他來做狀態機 DP，而且 mocha 發現他不用跑滿，只要跑***足夠長***就好，他覺得是 $26 + \epsilon$ 之類的，但~~保險起見我們跑到了 $\sout{400}$~~，一開始取答案的時候範圍太寬，WA 了一筆，mocha 多看了幾眼以後過了。我認為這 WA 地稍微可避免但算了吧，這題本來就比較難 :giraffe:。 \
**$\mathcal{O}(\Sigma \times |s|)$ jump table 模板**
- pJ：簽到，因為枚舉所有 $26$ 種可能即可。
- pK：max 和 mocha 直接看出答案，但吃了一 WA，快速修正以後 AC 了。~~全程不知道這題在幹嘛~~，團隊合作讚ㄛww。
- pL：數學題，max 一通觀察後做掉了，打個 `spf`、把所有人質因數分解，就做完了。
- pM：神奇的賽局，但竟然可以區間詢問？精通賽局的 mocha Orz 一通觀察直接轉換成「[CSES. Distinct Values Queries](#cses_distinct_values_queries)」（這次溝通非常高效！），我一發 AC，團隊合作完美！！
- pN：很水的簽到。

最後有用到 <button type="button" class="icpc-all-ac-button" aria-label="破台" onclick="triggerCelebration()">破台</button> \:)

吃完油炸的 KFC 真的**超級**口渴，所以去買了一杯養樂多。

{% cimg src=KFCCA_yakult_TOPC.jpg w=35% alt="養樂多好ㄘ" %}

# 2026/9/19 - [2026 ICPC Asia Taiwan Online Programming Contest](https://codeforces.com/gym/106728)

~~懶得開新支線所以把正式比賽也放在這裡吧。~~
<small> ~~還是我應該多開幾個 branches 朝 1029 邁進w~~ </small>

## 賽前

前情提要：TOPC 對我們這隊 aka. `NYCU_unbeLEAFable` 來說不會實際影響什麼資格，只是我們選修的**競技程式設計二**的通過條件其一是「在 TOPC 打贏台大 rk. 6」，總之要拼！:fire::muscle:

卡車說不能用平板看題目{% spoiler （但似乎有其他學校...） %}，要我們自己準備螢幕，所以我把我的 4K 27" 螢幕搬到資工系館。
（再插播前情提要：我前一天剛幫我二姐把一箱超級無敵重的除濕袋從校門口的蝦皮智取店一路扛到七舍三樓，~~途中臉色差到被路人關心~~，TOPC 當天手臂仍是半殘狀態。）因此我的螢幕其中超過半途都是 mocha 幫我搬的 \<3。
max 也搬了他的螢幕（比我螢幕更大的曲面螢幕，超強），我原本打算他的接 HDMI、我的接 Type-C（終於能用到我的 C 口了嗎？就是為了這個情況所以選了有 C 口的螢幕！），結果我的 Type-C 手機充電線根本傳不了影像訊號（其實傳得了我才要覺得意外），總之 max 和 mocha 用 max 的大螢幕看題目，而我在我的筆電上 coding，我的 4K 27" 螢幕就放在旁邊~~當吉祥物~~。

話說 max 的螢幕真的超級巨，可以分三區塊，兩側各放一題題目，中間放 scoreboard，設備 :100:。

剛開場的時候超級混亂，因為比賽時間很早，我們隊還在忙著 setup 我們的滿分螢幕，根本忘記要先登入 judge，結果帳號密碼是在一封幾天前寄到我 email 的信裡，~~裡面甚至有 *Please note that you MUST accomplish uploading before the contest.* 的一份文件要簽名~~，還講了測機時間ww。到底為啥 Gmail 沒有跳通知啊啊啊啊啊。

## 賽中

因為前期節奏太快了，導致我平常習慣的檔案管理方式有點爛掉，有些 submit 後的程式碼直接被我蓋過去了沒有好好保存 :pensive:。理論上 vscode 會有 timeline ~~但我中秋節把電腦重灌了所以也沒了 (・∀・\;\;)~~。

<details>
  <summary class="border">DOMjudge team submissions 截圖</summary>

{% cimg src=TOPC_2026_team_subs.jpg w=100% alt="team submissions" %}

~~這是用平板截圖的所以沒有 Dark Theme。~~

</details>


pA 簽到，給長度為 $3$ 的序列，判斷是不是等差數列，是則輸出公差。

<details>
  <summary class="border">Solution Code</summary>

```python
a, b, c = map(int, input().split())
print(f"secret {b - a}" if a+c == b*2 else "not secret")
```

</details>

此時我仍在手忙腳亂地撰寫 Python 腳本把 `A` ~ `L` 的程式碼檔案建出來，但馬上改成要寫 pA，連 Python 模板都還沒打，也尚未熟悉怎麼快速把題目切換給他們，一整個手忙腳亂的，在這混亂之中我就把 pA code 蓋掉了... 所以上面放是我剛剛寫的 (・∀・)。

pB 簽到 + 閱讀題。簡單到有點嚇人的地步，甚至沒有 `else` case 而且 `o` 沒用到（這些題目都有保證，我謝謝你欸化學），還好一發過了（鬆口氣）。

<details>
  <summary class="border">In-Contest Code</summary>

```python
import sys
from io import StringIO

testcase = """\
3
51 98 6
57 104 6
55 102 6
"""

# sys.stdin = StringIO(testcase)

def main():
    from sys import stdin
    e = stdin.readline

    # map(int, e().split())
    for _ in range(int(e())):
        c, h, o = map(int, e().split())
        if h == 2*c - 4:
            print("Saturated")
        elif h < 2*c - 4:
            print("Unsaturated")
main()
```

</details>

（應該看得出來我忙裡~~偷閒~~地把 Python 模板打好了）

接下來寫 pJ：

> $t$ 筆詢問 $x$，回答 $|\min(2 ^ a + 2 ^ b - x)|$。
> - $1 \le t \le 10 ^ 4$
> - $1 \le x \le 10 ^ {18}$
> - $a, b$ 為非負整數。

發現不妨直接枚舉 $a, b$ 所有組合，但 $\frac{1}{2} \times 60 \times 60 \times 10 ^ 4 \approx 1.8 \times 10 ^ 7$，雖然常數很小而且是 PyPy 但仍然令人提心吊膽，~~而且我們沒測機不知道常數~~，我最後還是用了 C++。

<details>
  <summary class="border">In-Contest Code</summary>

```cpp
#include <bits/stdc++.h>
#define IO cin.tie(0)->sync_with_stdio(0);
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
using namespace std;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"()";

int main() {
    IO;
    int t; cin in t;
    while (t--) {
        ll x; cin in x;
        ll ans = 4e18;
        REP(i, 0, 62) {
            REP(j, 0, i + 1) {
                ll a = 1ll << i;
                ll b = 1ll << j;
                ll cur = abs(a + b - x);
                ans = min(ans, cur);
            }
        }
        cout ot ans nl;
    }
    return 0;
}

void solve() {

}
```

</details>

~~應該看得出來我是真的很手忙腳亂。~~

實際上也可以好好分 case $\mathcal{O}(1)$ 做掉：

<details>
  <summary class="border">Solution Code</summary>

```cpp
ll highbit(ll x) {
    return x ? 1ll << __lg(x) : 0;
}
ll solve(ll x) {
    if (x == 1) return 1;
    ll a = highbit(x), b = highbit(x ^ a);
    return min({x ^ a ^ b, (b << 1) - (x ^ a), (a << 1) - x});
}
```

</details>

接著我閱讀了 pE：

> 給 $n \times n$ 方格，上面有 $1 \sim n ^ 2$ 的排列，你要把每個數字分紅、藍（Step 1），然後 **紅色沿 row、藍色沿 col** 分別移動：
> 
> 　{% cimg src=TOPC_2026_pE.png w=85% alt="pE" %}
> 
> 最後要是按照順序的 $1 \sim n ^ 2$，判斷可行性。
> $1 \le n \le 100$

~~發現他是一題 2-SAT~~，寫他。

首先每個數字都易於知道自己要往哪個方向移動，並且塗上對應的顏色，但靜止的就不知道了。於是所有要動的數字，都把移動路徑上靜止的數字塗上與自己相反的顏色（這是不是一種~~正相反的你和我~~），反正可以 $\mathcal{O}(n ^ 3)$，暴力就做完了。

我甚至懶得寫 $\mathcal{O}(n)$ 的 `issorted`，直接暴力排序ww。

<details>
  <summary class="border">In-Contest Code（信不信我賽中真寫了 SCC）</summary>

~~根本只差建圖了~~

```cpp
#include <bits/stdc++.h>
#define IO cin.tie(0)->sync_with_stdio(0);
#define R(x) istringstream stm(x); cin.rdbuf(stm.rdbuf());
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
#define all(x) x.begin(), x.end()
using namespace std;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"(2
4
1 2 4 8
6 10 3 7
5 11 15 12
9 14 13 16
2
1 2
4 3
)";

int main() {
    IO;
    int t = 1;

    R(T);
    cin in t;

    while (t--) solve();
    return 0;
}

const int N = 2e4;

int l[N];
int dfn[N], low[N], scc[N], stk[N], dfc, si;
vec<int> G[N];
bool instk[N];
bool stc[N];

void tarjan(int i) {
    dfn[i] = low[i] = ++dfc;
    stk[si++] = i, instk[i] = 1;
    for (int j: G[i]) {
        if (not instk[j] and dfn[j]) continue;
        if (not dfn[j]) tarjan(j);
        if (low[j] < low[i]) low[i] = low[j];
    }
    if (low[i] == dfn[i]) {
        for (int j = -1; j != i; ) {
            j = stk[--si], instk[j] = 0;
            scc[j] = i;
        }
    }
}

void solve() {
    M(dfn, 0);
    int n; cin in n;
    #define idx(i, j) ((i)*(n)+(j))
    REP(i, 0, n) REP(j, 0, n) {
        int v; cin in v; --v;
        l[idx(i, j)] = v;
    }
    REP(i, 0, n) REP(j, 0, n) {
        int v = l[idx(i, j)];
        int oi = v / n;
        int oj = v % n;
        bool ii = oi == i;
        bool jj = oj == j;
        if (not ii and not jj) {
            cout ot "No" nl;
            return;
        }
        if (ii and jj) {
            stc[v] = 1;
        } else {
            stc[v] = 0;
        }
    }
    REP(i, 0, n) REP(j, 0, n) {
        int v = l[idx(i, j)];
        int oi = v / n;
        int oj = v % n;
        bool ii = oi == i;
        bool jj = oj == j;
        if (not ii and not jj) {
            cout ot "No" nl;
            return;
        }
        if (ii and jj) {
            
        } else {
            if (ii) {
                REP()
            }
            if (jj) {

            }
        }
    }
}
```

</details>

<details>
  <summary class="border">In-Contest Code</summary>

```python
import sys
from io import StringIO

testcase = """\
4
1 2 4 8
6 10 3 7
5 11 15 12
9 14 13 16
2
1 2
4 3
"""

# sys.stdin = StringIO(testcase)

def main():
    from sys import stdin
    e = stdin.readline

    # map(int, e().split())
    n = int(e())
    l = [[v - 1 for v in map(int, e().split())] for _ in range(n)]
    pos = [(i, j) for i in range(n) for j in range(n)]
    rs = [[] for _ in range(n)]
    cs = [[] for _ in range(n)]
    area = n*n
    bad = [0] * area
    cr = [0] * area
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            ii = i == pos[v][0]
            jj = j == pos[v][1]
            if not ii and not jj:
                return print("No")
            if ii and jj:
                bad[v] = 1
            else:
                bad[v] = 0
                if ii:
                    cr[v] = 1
                if jj:
                    cr[v] = 2
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            ii = i == pos[v][0]
            jj = j == pos[v][1]
            if ii and jj:
                ...
            else:
                if ii:
                    s = min(j, pos[v][1])
                    t = max(j, pos[v][1])
                    # print(v+1, s, t)
                    for jjj in range(s, t+1):
                        vv = l[i][jjj]
                        if not bad[vv]: continue
                        if cr[vv] == 0:
                            cr[vv] = cr[v] ^ 3
                        elif cr[vv] == cr[v]:
                            return print("No")
                else:
                    s = min(i, pos[v][0])
                    t = max(i, pos[v][0])
                    # print(v+1, s, t)
                    for iii in range(s, t+1):
                        vv = l[iii][j]
                        if not bad[vv]: continue
                        if cr[vv] == 0:
                            cr[vv] = cr[v] ^ 3
                        elif cr[vv] == cr[v]:
                            return print("No")
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            c = 1 if cr[v] == 0 else cr[v]
            if c == 1:
                rs[i].append(v)
            else:
                cs[j].append(v)
    ans = 1
    for row in rs:
        # print([v+1 for v in row])
        if not ans or sorted(row) != row:
            ans = 0
    for row in cs:
#         print([v+1 for v in row])
        if not ans or sorted(row) != row:
            ans = 0
    print("Yes" if ans else "No")
main()
# main()
```

</details>

以上邏輯要改成 $\mathcal{O}(n ^ 2)$ 也極為簡單，靜止的人可填某色的條件是「此色不能有人穿過我」，也就是看左邊的人有沒有要到右邊，反之亦然，因此這是一個前後綴 $\min, \max$ 的問題。

<details>
  <summary class="border">Solution Code</summary>

```python
def main():
    from sys import stdin
    e = stdin.readline

    # map(int, e().split())
    n = int(e())
    l = [[v - 1 for v in map(int, e().split())] for _ in range(n)]
    pos = [(i, j) for i in range(n) for j in range(n)]
    area = n*n
    cr = [0] * area
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            ii = i == pos[v][0]
            jj = j == pos[v][1]
            if not ii and not jj:
                return print("No")
            if ii and jj:
                cr[v] = 0
            elif ii:
                cr[v] = 1
            else:
                cr[v] = 2
    row = [0] * n
    col = [0] * n
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            if cr[v] == 1:
                if row[i] > v:
                    return print("No")
                row[i] = v
            if cr[v] == 2:
                if col[j] > v:
                    return print("No")
                col[j] = v
    row = [0] * n
    col = [0] * n
    for i in range(n):
        for j in range(n):
            v = l[i][j]
            if pos[v] == (i, j):
                if row[i] > j:
                    if not cr[v]: cr[v] = 2
                    elif cr[v] != 2:
                        return print("No")
                if col[j] > i:
                    if not cr[v]: cr[v] = 1
                    elif cr[v] != 1:
                        return print("No")
            row[i] = max(row[i], pos[v][1])
            col[j] = max(col[j], pos[v][0])
    for i in range(n-1, -1, -1):
        for j in range(n-1, -1, -1):
            v = l[i][j]
            if pos[v] == (i, j):
                if row[i] < j:
                    if not cr[v]: cr[v] = 2
                    elif cr[v] != 2:
                        return print("No")
                if col[j] < i:
                    if not cr[v]: cr[v] = 1
                    elif cr[v] != 1:
                        return print("No")
            row[i] = min(row[i], pos[v][1])
            col[j] = min(col[j], pos[v][0])
    print("Yes")
main()
```

</details>

接著寫了 pF，應該是 max 做掉的，看幾眼就會發現他其實是一題變種 Dijkstra，變種之處在於他的 $dis[s] = \infty$、鬆弛 $i \xrightarrow{edge(t, h)} j$ 則為 $dis[j] \ge \min(dis[i], h) - v$。

因為和平常習慣的大小方向相反，賽中我跟 mocha ~~爭論~~了好一陣子 `74` 行的剪枝到底應該是 `>` 還是 `<` www。

本地測試的時候我忘記寫 `62` 行的 `G[i].clear()`，導致浪費了全隊幾分鐘在看不存在的 bug... 嚴厲檢討自己 :pensive:。

{% cimg src=REP_i_0_n_G_i_clear.png w=100% alt="REP(i, 0, n) G[i].clear();" %}

**鄰接表開 `vec<vec<int>> G(n)` 就不會有清空問題了，打起來也沒有麻煩很多。**

<details>
  <summary class="border">In-Contest Code</summary>

```cpp
#include <bits/stdc++.h>
#define IO cin.tie(0)->sync_with_stdio(0);
#define R(x) istringstream stm(x); cin.rdbuf(stm.rdbuf());
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
#define all(x) x.begin(), x.end()
using namespace std;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"(2
3 2
1 3 2 4
2 3 3 5
5 6
1 2 4 4
1 4 8 13
2 3 1 3
2 4 3 7
3 5 2 2
4 5 7 8
)";

int main() {
    IO;
    int t = 1;

    // R(T);
    // cin in t;

    while (t--) solve();
    return 0;
}

const int N = 1e5, m = 3e5;
// const ll inf = 0x3f3f3f3f'3f3f3f3f;
const ll inf = 1e12;

ll dis[N];
struct ee {
    int j; ll t, h;
};
vec<ee> G[N];

struct pr {
    int i; ll v;
    bool operator<(const pr &o) const {
        return v < o.v;
    }
};

void solve() {
    int n, m; cin in n in m;
    REP(i, 0, n) G[i].clear();
    REP(i, 0, n) dis[i] = -inf;
    REP(ei, 0, m) {
        int a, b; ll t, h; cin in a in b in t in h; --a, --b;
        G[a].push_back({b, t, h});
        G[b].push_back({a, t, h});
    }
    priority_queue<pr> q;
    dis[0] = inf;
    q.push({0, inf});
    while (q.size()) {
        auto [i, v] = q.top(); q.pop();
        if (dis[i] > v) continue;
        for (auto [j, t, h]: G[i]) {
            ll nv = min(v, h) - t;
            if (nv > dis[j]) {
                // cout ot i+1 sep j+1 sep v sep nv nl;
                dis[j] = nv;
                q.push({j, nv});
            }
        }
    }
    // REP(i, 0, n) cout ot dis[i] se; cout nl;
    REP(i, 0, n) {
        if (dis[i] < 0) {
            cout ot 0;
        } else {
            cout ot 1;
        }
    }
    cout nl;
}
```

</details>

因為 Dijkstra 也只能長這個樣，就不重寫 Solution Code \:P

接下來做 pC：

> $k$ 叉樹，高度 $l$。一開始每個節點都是 $0$，$n$ 次往下走，走目前權重總和最小的路徑，並把路徑上所有點的權重增加 $w_{1 \sim n}$。輸出第 $n+1$ 次往下走時的權重總和。
> - $1 \le k \le 10 ^ 6$
> - $1 \le l \le 1000$
> - $1 \le n \le 2 \cdot 10 ^ 5$
> - $1 \le w_{1 \sim n} \le 10 ^ 9$
> - $\text{節點總數} \le 10 ^ 6$

因為題目設定過於貼心（限制 $\text{節點總數} \le 10 ^ 6$）所以是純實作題。

但超怪，所有人都在這題吃了一堆罰時。

首先 $k = 1$ 要特判，max 一開始就直接提醒我，讚。

因為這吃了一發 T 的~~很會想題~~的布丁：

{% cimg src=k=2,l=20.png w=65% alt=表揚布丁很會想題 %}

接下來就如布丁所說，當 $k \ge 2$ 的時候 $l$ 會被節點總數 $\le 10 ^ 6$ 的限制鎖死在 $\le 19$，所以直接好好實作，每個點開一個大小為 $k$ 的 `heap` 維護最小權路徑即可。

還要小心，連一層節點也不能多建，不然會吃 TLE。

然而我完全是沙比，亂寫一通以為自己寫好了直接送了個 WA，然而維護的權重完全是爛的。在這題花了太多不必要的時間 TAT。

<details>
  <summary class="border">In-Contest Code</summary>

```cpp
#include <bits/stdc++.h>
#define IO cin.tie(0)->sync_with_stdio(0);
#define R(x) istringstream stm(x); cin.rdbuf(stm.rdbuf());
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
#define all(x) x.begin(), x.end()
using namespace std;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"(3
1 3 5
1 1 1 1 1
2 3 5
1 2 3 4 5
3 2 4
5 5 5 5)";

int main() {
    IO;
    int t = 1;

    // R(T);
    // cin in t;

    while (t--) solve();
    return 0;
}

const int N = 1e6, L = 1001, mod = 1e9 + 7;
const ll inf = 0x3f3f3f3f'3f3f3f3f;
int k, d, n;
int siz;

struct pr {
    int i; ll v;
    bool operator<(const pr &o) const {
        return v > o.v or (v == o.v and i > o.i);
    }
};
ll ew[N];
ll ans = 0;
priority_queue<pr> pq[N];

int build(int dd) {
    int i = siz; ++siz;
    pq[i] = {};
    ew[i] = 0;
    if (dd == 1) return i;
    REP(c, 0, k) {
        int j = build(dd - 1);
        pq[i].push({j, 0});
    }
    return i;
}

ll add(int i, ll w, int dd) {
    if (dd == 1) return 0;
    auto &h = pq[i];
    auto [j, v] = h.top(); h.pop();
    ll ret = add(j, w, dd - 1);
    ew[j] += w;
    ll res = ret + ew[j];
    h.push({j, res});
    return h.top().v;
}

void solve() {
    cin in k in d in n;
    // cout ot k sep d sep n nl;
    if (k == 1) {
        ll sm = 0;
        REP(i, 0, n) {
            ll v; cin in v;
            sm += v;
        }
        cout ot (sm * (d-1)) nl;
    } else {
        siz = 0;
        build(d);
        REP(i, 0, n) {
            ll v; cin in v;
            ll ans = pq[0].top().v;
            // cout ot ans se;
            add(0, v, d);
        }
        ll ans = pq[0].top().v;
        cout ot ans nl;
    }
}
```

</details>

這題實作也差不多就這樣，懶得重寫了ww。

這題實在是太仁慈了，實際上完全可以出成：

> - $1 \le k \le 10 ^ {18}$
> - $1 \le l \le 300$
> - $1 \le n \le 2 \cdot 10 ^ 5$
> - $1 \le w_{1 \sim n} \le 10 ^ 9$
> - $\text{節點總數}$ 無特別限制

完全可以做到 $\mathcal{O}(n \times l \times \log_2 \min(n, k))$ 吧。就是動態開點、每個點動態開 `heap` 而已。

接著 mocha 精神出了 pG：

> $n$ 個人排成一列，給數列 $h, s$，$h$ 表示每個人的身高，$s$ 是每個人「右邊比自己矮的數量」，但 $s$ 被 shuffle 過了。構造一個 $h$ 的排列使 $s$ 合法，可能無解，很多解則輸出字典序最小的。
> - $1 \le n \le 2 \times 10 ^ 5$

但我一直聽不懂他在說啥，最後我先寫好 API，然後直接讓他一行一行叫我寫。

我寫了一顆 $\mathcal{O}(n \log_2 ^ 2 n)$ 暴力二分搜的線段樹，還砸了 PBDS 查 `kth`，還好時限 2 秒非常充分。

{% spoiler 終於 AC 的時候我興奮大喊 **YES!!!** 然後被卡車提醒：「正式比賽這樣會被 DQ ㄛ」:cold_face: %}

<details>
  <summary class="border">In-Contest Code</summary>

```cpp
#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#define IO cin.tie(0)->sync_with_stdio(0);
#define R(x) istringstream stm(x); cin.rdbuf(stm.rdbuf());
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
#define all(x) x.begin(), x.end()
using namespace std;
using namespace __gnu_pbds;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"(3
3
10 20 30
1 0 0
2
170 165
1 1
4
150 160 170 180
0 2 0 0
)";

int main() {
    IO;
    int t = 1;

    // R(T);
    // cin in t;

    while (t--) solve();
    return 0;
}

const int N = 2e5, mod = 1e9 + 7;
const ll inf = 0x3f3f3f3f'3f3f3f3f;
int h[N];
int s[N];
int cnt[N];
int l[N];

struct node {
    int mn, add;
} tr[N << 2];

void update(int o, int v) {
    tr[o].mn += v;
    tr[o].add += v;
}

void push(int o) {
    update(o << 1 | 0, tr[o].add);
    update(o << 1 | 1, tr[o].add);
    tr[o].add = 0;
}

void pull(int o) {
    tr[o].mn = min(tr[o << 1].mn, tr[o << 1 | 1].mn);
}

void build(int o, int s, int t) {
    tr[o].add = 0;
    if (s + 1 == t) {
        tr[o].mn = l[s];
        return;
    }
    int mid = s + t >> 1;
    build(o << 1 | 0, s, mid);
    build(o << 1 | 1, mid, t);
    pull(o);
}

void modify(int o, int s, int t, int qs, int qt, int v) {
    if (qt <= s or  t <= qs) return ;
    if (qs <= s and t <= qt) {
        update(o, v);
        return;
    }
    push(o);
    int mid = s + t >> 1;
    modify(o << 1 | 0, s, mid, qs, qt, v);
    modify(o << 1 | 1, mid, t, qs, qt, v);
    pull(o);
}

int query(int o, int s, int t) {
    if (s + 1 == t) return s;
    push(o);
    int mid = s + t >> 1;
    if (tr[o << 1 | 1].mn == 0) {
        return query(o << 1 | 1, mid, t);
    } else {
        return query(o << 1 | 0, s, mid);
    }
}

int query(int o, int s, int t, int qs, int qt) {
    if (qt <= s or  t <= qs) return -1;
    if (qs <= s and t <= qt) {
        if (tr[o].mn == 0) return query(o, s, t);
        return -1;
    }
    push(o);
    int mid = s + t >> 1;
    return max(
        query(o << 1 | 0, s, mid, qs, qt),
        query(o << 1 | 1, mid, t, qs, qt)
    );
}

// int query(int o, int s, int t, int i) {
//     if (s + 1 == t) return tr[o].mn;
//     push(o);
//     int mid = s + t >> 1;
//     if (i < mid) return query(o << 1 | 0, s, mid, i);
//     else         return query(o << 1 | 1, mid, t, i);
// }

void solve() {
    int n; cin in n;
    REP(i, 0, n) cin in h[i];
    sort(h, h + n);
    REP(i, 0, n) cin in s[i];
    M(cnt, 0);
    REP(i, 0, n) ++cnt[s[i]];
    REP(i, 1, n) cnt[i] += cnt[i - 1];
    set<int> st;
    for (int i=0;i<n;i++) st.insert(i);
    for (int i=1;i<n;i++) {
        if (cnt[i-1] < i) {
            cout << -1 << "\n";
            return;
        }
    }
    l[0] = 0;
    for (int i=1;i<n;i++) {
        l[i] = cnt[i-1] - i;
    }
    // REP(i, 0, n) cout ot l[i] se; cout nl;
    build(1, 0, n);
    tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> u;
    REP(i, 0, n) u.insert(i);
    vec<int> p;
    for (int k = n; k; --k) {
        int r0 = query(1, 0, n, 0, k);
        // cout ot r0 nl;
        auto it = u.find_by_order(r0);
        p.emplace_back(*it);
        u.erase(it);
        modify(1, 0, n, r0 + 1, n, -1);
    }
    // REP(i, 0, n) cout ot p[i] se; cout nl;
    REP(i, 0, n) cout ot h[p[i]] se; cout nl;
    // cout nl;
}
```

</details>

實際上多瞪幾眼(?)也能瞪出 $\mathcal{O}(n)$ 解。（只是一開始還是要先 sort $h$ ）

> 我是把樹蓋出來 再 DFS 構造出答案
> 概念應該算是 利用 stack 的 FILO 結構 保證取到的東西字典序最小？
> 反正我是瞪出來的 沒有嚴謹證 (・∀・)

<details>
  <summary class="border">Solution Code</summary>

```python
def solve(h, s):
    n = len(h)
    h.sort()
    cnt = [0] * n
    for v in s: cnt[v] += 1
    pre = i = 0
    stk = []
    siz = [0] * n
    G = [[] for _ in range(n)]
    for v, c in enumerate(cnt):
        if not c: continue
        if pre < v: return [-1]
        pre += c
        r = v
        p = i + c - 1
        siz[p] += v
        while r:
            pi = stk.pop()
            r -= siz[pi]
            G[p].append(pi)
        for _ in range(c):
            siz[i] += 1
            stk.append(i)
            i += 1
    ans = []
    def dfs(i):
        ans.append(h[i])
        for j in G[i][::-1]: dfs(j)
    for i in stk: dfs(i)
    return ans
```

</details>

相比上面那個 160 幾行（很多空行啦）的巨無霸，這個 $\mathcal{O}(n)$ 解也是很可愛了。

而我們便止步於此了。

直到最後一刻，我們在嘗試解掉 pD, pL。前者 mocha 在~~混亂的前半場~~看了一眼，想到**差分約束**，我看範圍：$n \le 5000$？那很對啊！後來就忘了。再次撿起這題的時候我一直用 $n \le 2 \cdot 10 ^ 5$ 在想...

我甚至 `pD.cpp` 已經開好，SPFA 的陣列也開好...
這場就差在沒有紙本題本，不好在題目上標記。

<details>
  <summary class="border">In-Contest Code</summary>

```cpp
#include <bits/stdc++.h>
#define IO cin.tie(0)->sync_with_stdio(0);
#define R(x) istringstream stm(x); cin.rdbuf(stm.rdbuf());
#define M(x, v) memset(x, v, sizeof(x))
#define REP(i, s, t) for (int i = (s); i < (t); ++i)
#define in >>
#define ot <<
#define se ot ' '
#define sep se ot 
#define nl ot '\n'
#define all(x) x.begin(), x.end()
using namespace std;
template <typename T>
using vec = vector<T>;
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
void solve();
string T = R"(1
5
2 4 1 3 5
3 1 2 5 4
3 3 2 3 0)";

int main() {
    IO;
    int t = 1;

    R(T);
    cin in t;

    while (t--) solve();
    return 0;
}

const int N = 5000, mod = 1e9 + 7;
const ll inf = 0x3f3f3f3f'3f3f3f3f;
int a[N], b[N];
ll c[N];

bool inq[N];
vec<int> G[N];
int cnt[N];

void solve() {
    int n; cin in n;
    REP(i, 0, n) cin in a[i], --a[i];
    REP(i, 0, n) cin in b[i], --b[i];
    REP(i, 0, n) cin in c[i];
    
}
```

</details>

而 mocha 在賽後 3 分鐘想出 pL。

pD：
> 給長度為 $n$ 的數列 $a, b, c$，其中 $a, b$ 為 $1 \sim n$ 的排列，每次「取」可以取 $a$ 或 $b$ 的一個前綴，$c_{i = 1 \sim n}$ 表示數字 $i$ 要被取恰好 $c_i$ 次，問是否合法。
> - $1 \le n \le 5000$

假設 $x_i$ 是 $i$ 使用 $a$ 被取到的次數，$y_i$ 為使用 $b$，則有：

$$
x_{a_1} \ge x_{a_2} \ge \dots \ge x_{a_n} \ge 0 \\
y_{b_1} \ge y_{b_2} \ge \dots \ge y_{b_n} \ge 0 \\
x_i + y_i = c_i
$$

差分約束能處理的是 $X \le Y + C$ 這樣的式子，其中 $X, Y$ 是變數，$C$ 是常數。

因此我們能用上面的限制，構造出以下約束：

$$
x_{a_{i+1}} \le x_{a_{i}} + 0 \\
y_{b_{i+1}} \le y_{b_{i}} + 0 \\
$$

但 $x_i + y_i = c_i$ 卻不知道怎麼轉化，因為 $x, y$ 在等號同側且同號，不符合差分約束的定義，那不妨把 $y_i$ 都取負號變成 $-y_i$：

$$
x_{a_{i+1}} \le x_{a_{i}} + 0 \\
-y_{b_{i}} \le -y_{b_{i+1}} + 0 \\
x_i \le -y_i + c_i \\
-y_i \le x_i - c_i
$$

**別忘了**還有 $-y_{b_n} \le 0 \le x_{a_n}$ 這個限制，沒寫會 WA。

小算一下複雜度：$\mathcal{O}(|V| \times |E|) = \mathcal{O}(2n \times 4n) \approx 2 \cdot 10 ^ 8$，時限一秒...

{% fx type=holy size=60px %}
信 SPFA 沒死！
{% endfx %}

實際上他死透了:skull:，照上面這樣寫會 TLE。

但加上神奇優化（`41` 行，如果 `j` 比 `front` 好就 `push_front` 反之 `push_back`）以後竟然 AC 了。

我嘗試了 [如何看待 SPFA 算法已死这种说法？](https://www.zhihu.com/question/292283275/answer/484871888) 這篇文章的大部分優化方法，除了這個以外都被卡掉了，我不知道是一個一個刻意卡的，還是某種特殊圖可以讓這些 SPFA 優化方法都一起爛？但我感性上覺得這張圖度數超小應該很難卡啊？總之我試出只有下面這種優化會過。（有試鏈式前項星，但效果不明顯）

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5000;
int a[N], b[N];
ll c[N];
 
void solve() {
    int n; cin in n;
    int nn = n << 1;
    REP(i, 0, n) cin in a[i], --a[i];
    REP(i, 0, n) cin in b[i], --b[i];
    REP(i, 0, n) cin in c[i];
    vec<vec<pair<int, ll>>> G(nn);
    REP(i, 0, n) {
        G[i].emplace_back(i + n, -c[i]);
        G[i + n].emplace_back(i, c[i]);
    }
    REP(i, 1, n) {
        G[a[i-1]].emplace_back(a[i], 0);
        G[b[i] + n].emplace_back(b[i-1] + n, 0);
    }
    G[a[n-1]].emplace_back(n + b[n-1], 0);
    vec<ll> dis(nn, 0);
    vec<bool> inq(nn, 1);
    vec<int> cnt(nn, 0);
    deque<int> q;
    REP(i, 0, nn) q.emplace_back(i);
    while (q.size()) {
        int i = q.front(); q.pop_front(); inq[i] = 0;
        ll v = dis[i];
        for (auto [j, w]: G[i]) {
            ll nv = v + w;
            if (nv < dis[j]) {
                dis[j] = nv;
                cnt[j] = cnt[i] + 1;
                if (cnt[j] >= nn) {
                    cout ot "No" nl;
                    return;
                }
                if (not inq[j]) {
                    inq[j] = 1;
                    q.emplace_back(j);
                    if (dis[q.back()] < dis[q.front()]) swap(q.front(), q.back());  // 神奇優化
                }
            }
        }
    }
    cout ot "Yes" nl;
}
```

</details>

歸根究底，~~卡常是出題者的問題~~我們建的點邊太多了。有沒有方法可以 $\mathcal{O}(|V| \times |E|) = \mathcal{O}(n \times 2n) \approx 5 \cdot 10 ^ 6$？

既然 $x_i + y_i = c_i \Rightarrow -y_i = x_i - c_i$，那為何還要把他們拆開算？

把上面的式子改寫：

$$
-y_{b_{i}} \le -y_{b_{i+1}} \\
\Rightarrow x_{b_{i}} - c_{b_{i}} \le x_{b_{i+1}} - c_{b_{i+1}} \\
\Rightarrow x_{b_{i}} \le x_{b_{i+1}} + c_{b_{i}} - c_{b_{i}}
$$

再一次**別忘了**還有

$$
-y_{b_n} \le 0 \le x_{a_n} \\
\Rightarrow x_{b_n} - c_{b_n} \le x_{a_n}
$$

這個限制，沒寫會 WA。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5000;
int a[N], b[N];
ll c[N];

void solve() {
    int n; cin in n;
    REP(i, 0, n) cin in a[i], --a[i];
    REP(i, 0, n) cin in b[i], --b[i];
    REP(i, 0, n) cin in c[i];
    vec<vec<pair<int, ll>>> G(n);
    REP(i, 1, n) {
        G[a[i-1]].emplace_back(a[i], 0);
        G[b[i]].emplace_back(b[i-1], c[b[i-1]] - c[b[i]]);
    }
    G[a[n-1]].emplace_back(b[n-1], c[b[n-1]]);
    vec<ll> dis(n, 0);
    vec<bool> inq(n, 1);
    vec<int> cnt(n, 0);
    deque<int> q;
    REP(i, 0, n) q.emplace_back(i);
    while (q.size()) {
        int i = q.front(); q.pop_front(); inq[i] = 0;
        ll v = dis[i];
        for (auto [j, w]: G[i]) {
            ll nv = v + w;
            if (nv < dis[j]) {
                dis[j] = nv;
                cnt[j] = cnt[i] + 1;
                if (cnt[j] >= n) {
                    cout ot "No" nl;
                    return;
                }
                if (not inq[j]) {
                    inq[j] = 1;
                    q.emplace_back(j);
                    if (dis[q.back()] < dis[q.front()]) swap(q.front(), q.back());
                }
            }
        }
    }
    cout ot "Yes" nl;
}
```

</details>

{% cimg src=TOPC_2026_pD_SPFA_WTF.png w=100% alt="神奇剪枝" %}

pL：
> 給一張無向圖，可能有自環、重邊，**保證所有點度數 = 3**，求最小點集 $S$ 使刪掉 $S$ 以後整張圖沒有三元環。
> $4 \le n \le 2 \cdot 10 ^ 5$

因為**保證度數 = 3** 這個性質超強，會發現連通分量的 case 很少：

{% cimg src=TOPC_2026_pL.jpg w=75% alt="cases" %}

這應該包括所有情況了。

兩個三角形共邊的時候需要一次蓋兩個，不能選紅色叉叉，否則無法最小化。

首先把所有三角形找出來，因為度數很小所以完全可以亂做。

判斷：被 `tri == 1, 2, 4` 個三角形蓋住。

- $1$ 則隨便拔一點。
- $2$ 則拔掉同時被兩個三角形蓋住（`cnt == 2`）的點。
- $4$ 則隨便拔掉一點，降級為 $1$ 的 case。

顯然有 $8$ 種作法，這是我想想覺得還算簡潔帥氣的ww。

<details>
  <summary class="border">Solution Code</summary>

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        while dsu[x] >= 0:
            if dsu[dsu[x]] >= 0:
                dsu[x] = dsu[dsu[x]]
            x = dsu[x]
        return x

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return 0
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a
        return 0

    n = int(e())
    G = [set() for _ in range(n)]
    for _ in range(n * 3 >> 1):
        a, b = map(int, e().split())
        if a == b: continue
        a, b = a-1, b-1
        G[a].add(b)
        G[b].add(a)
    dsu = [-1] * n
    tri = [0] * n
    cnt = [0] * n
    for i in range(n):
        for j in G[i]:
            if i > j: continue
            for k in G[i]:
                if j > k: continue
                if k not in G[j]: continue
                # tri: i < j < k
                merge(i, j)
                merge(i, k)
                tri[find(i)] += 1
                cnt[i] += 1
                cnt[j] += 1
                cnt[k] += 1
    ans = []
    for i in range(n):
        r = find(i)
        t = tri[r]
        if not t: continue  # done
        if t == 1 or t == 2 and cnt[i] == 2 or t == 4:
            ans.append(i+1)
            tri[r] >>= 2
    print(len(ans))
    print(*ans)
main()
```

</details>

其他題目沒怎看，就放著啦 \:D

*WIP*

<!-- 
<details>
  <summary class="border">In-Contest Code / Solution Code</summary>

```cpp
code
```

</details>
 -->

## 賽後

<details>
  <summary class="border">DOMjudge ranking 截圖</summary>

{% cimg src=TOPC_2026_ranking.png w=100% alt="TOPC 2026 板子" animation=0 %}

~~圖片太大，開載入動畫的話會卡所以我關掉了。~~

</details>

賽後我把我的 4K 27" 螢幕轉直的，~~很適合用來看 ranking~~。

我們全程都保持在同題數最低罰時，但單論我的實作方面仍是有很多可優化的空間：

- pC 我沙比不會實作，這完全是我個人問題且可以避免。
- pG 因為溝通問題卡了太久，應該提早讓 mocha 接手？

隨便優化一個部份，都有可能讓我們寫出 pL :pensive:。

午餐卡車請了 pizza :yum:
只是都沒啥拍照紀錄 🫠

# 2026/10/1 - [SMU ICPC Selection Contest 2026](https://codeforces.com/gym/106627)

*WIP*

# 2026/10/2 - [2026 Argentinian Programming Tournament (TAP)](https://codeforces.com/gym/106682/)

*WIP*

# 2026/10/3 - [The 2025 Polish Collegiate Programming Contest (AMPPZ 2025)](https://qoj.ac/contest/2668?v=1)

*WIP*
