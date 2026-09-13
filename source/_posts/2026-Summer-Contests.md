---
title: 2026 暑假的團體賽
date: 2026-09-13 17:43:15
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
  {% cimg src=naming01.png w=48% alt="取隊名" %}
  {% cimg src=naming02.png w=48% alt="取隊名" %}
</div>

<div style="text-align: left; margin-top: 30px;">
  {% cimg src=naming03.png w=48% alt="取隊名" %}
  {% cimg src=naming04.png w=48% alt="取隊名" %}
</div>

<div style="text-align: left; margin-top: 30px;">
  {% cimg src=naming05.png w=48% alt="取隊名" %}
</div>

花很久時間取了個非常隨便的隊名w

## 順利(?)地取隊名

<div style="text-align: left; ">
  {% cimg src=naming06.png w=48% alt="取隊名" %}
  {% cimg src=naming07.png w=48% alt="取隊名" %}
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

<span id="idk-how-to-mat-mul"></span>

接下來是 pG，分段的矩陣快速冪優化 DP。~~我因為太久沒碰矩陣快速冪，所以忘記怎麼寫矩陣乘法，被羊嗆~~{% spoiler （這是[伏筆](#fuked-up-cuz-idk-how-to-mat-mul)） %}。 測範測不太對，一陣亂湊亂湊以後終於對了，傳上去 TLE，何意味啊？結果是我太依賴 Python 大數，有個地方偷懶少 mod，然後就燒了。第二發 AC，此時 rk.3。

剩三題。因為 B 很快有人首殺，但很多人 WA，但不管先猜 B 的構造很水，結果猜錯，我們也成為 WA 的很多人。

接下來發現 F 是一題布丁出的很好的最短路題，羊提出了一個壓掉 $2 ^ 9$ 空間的方法（最外層迴圈枚舉 bit mask，不用實際建點），超級聰明。然而 TLE，但這題好就好在他不用 Dijkstra，楊寬洋觀察到他的邊權 $\le 3$，因此建 $3n$ 左右個桶子就好了，AC。這題充分體現了**團隊合作，讚**！

剩下 pB、pE，我們以為 pE 很難於是決定做 pB，但最後沒構造出來，他是神奇數奧題目所以小皮很快 AC，被嗆了嗚嗚嗚。

而 pE 則是很典的用 heap 依序取前 $k$ 小，應該要戳這題的。賽後我很快用 Python 寫掉，但 TLE，因為~~布丁信誓旦旦說 Python 不會被卡常然而完全被卡死。~~

## 開板

成大賽的開板很得，是用一隻 AI 進行 RPG，每完成一個關卡就公布一個隊名。但一直被 mocha 越獄，發現他是~~自我認同為 Claude~~ 的 Deepseek，超級好笑。

# YTP 初賽（7/7）

AI 相較於去年變強太多，已經可以單刷破台這種比賽了，因此超級無敵混亂。

~~因為沒有螢幕錄影，我顯然不記得做題順序，所以按照題號講。~~

## 題目

[YTP 2026 題單](https://oj.ntucpc.org/problems/tag/ytp2026)

**p1**

隨便 `bisect` 一下就好了，C++ 應該 $\mathcal{O}(n \cdot q) \approx 10 ^ 7$ 也能過。

<details>
  <summary class="border">Solution Code</summary>

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    n, q = map(int, e().split())
    rs = [10**20] * (n + 1)
    l = [0] * (n + 1)
    for i in range(n):
        rs[i], l[i] = map(int, e().split())
        rs[i] **= 2
    for _ in range(q):
        x, y = map(int, e().split())
        r = x*x + y*y
        print(l[bisect_left(rs, r)])
main()
```

</details>

**p2**

看了很多眼題目敘述，還是不太確定在講甚麼，結果圖片很重要。

打表了一下就做掉了，我是從小到大枚舉答案，因為答案是 $\sqrt{x}$ 量級，但其實可以直接 $\lfloor\sqrt{\frac{x}{\gcd(2036, 4581)}}\rfloor$，因為二次式只有 $x ^ 2$ 項，沒有 $x$ 和常數項。

<details>
  <summary class="border">Solution Code</summary>

```python
from math import isqrt
print(isqrt(int(input()) // 509))
```

</details>

順帶一提，Python 的 `isqrt(x)` 是**純整數運算**（可以去研究一下他的實作，很快很厲害），而 `floor(x ** 0.5)` 是浮點數運算，又慢又有精度誤差。

**p3**

只要觀察到：對於每個點而言，只有**最後一次選到他的因數**時重要。推出式子以後，會發現有等比級數可以 $\mathcal{O}(1)$ 套公式，那就變成一題很純的數學題，把表打一打就做完了，但我也忘記賽中怎麼了，不太會讀題目 ><，總之我們沒做出這題。

以下實作是 $\mathcal{O}(n \ln n + d(n) \log_2 m + \log_2 998244353)$，Python 穩過，應該是最佳解。

<details>
  <summary class="border">Solution Code</summary>

```python
def f(n, m, p, q):
    mod = 998244353
    fac = [0] * (n + 1)
    for i in range(1, n + 1):
        for j in range(i, n + 1, i): fac[j] += 1
    d = max(fac) + 1
    g = [0] * d
    invn = pow(n, -1, mod)
    for v in range(1, d):
        g[v] = (1 - pow(1 - v * invn, m, mod)) % mod
    return p * pow(q, -1, mod) * sum(g[v] for v in fac if v) % mod
```

</details>

**p4**

賽中沒碰。

邏輯很單純、實作小多的題。因為每次推只是一行的事，所以從 $6$ 個方向把每一行都掃過一遍就好。

實作上可以設計一台狀態機（以下 `white`, `black`, `cnt` 的部分），就能每次丟進去一個字元（`add`）即可；六邊形遍歷的部分，只要把戳出去的部分好好判掉，就能暴力亂戳，不用嚴格戳在六邊形裡面，實作上簡便許多。

需要注意，因為六邊形輸入格式的關係，斜向遍歷的時候上半和下半移動斜率不一樣，需要公式調整。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 100;
char l[N << 1][N << 1];

void solve() {
    int n; cin in n;
    int m = n * 2 - 1;
    #define lim(i) (m - abs((i) - (n-1)))
    #define inr(i, j) (0 <= (i) and (i) < m and 0 <= (j) and (j) < lim(i))
    REP(i, 0, m) REP(j, 0, lim(i)) cin in l[i][j];

    int ans = 0;
    bool white = 0, black = 0;
    int cnt = 0;

    auto add = [&](int i, int j) {
        char c = inr(i, j) ? l[i][j] : '.';
        if (c == '.') {
            white = black = cnt = 0;
        } else if (c == 'B') {
            black = 1;
            ans += --cnt < 0 and white;
        } else if (black) {
            white = 0;
        } else {
            white = 1;
            ++cnt;
        }
    };
    REP(i, 0, m) {
        REP(j, -1, lim(i)) add(i, j);
        for (int j = lim(i); j >= 0; --j) add(i, j);
    }
    REP(j, -n, m) {
        REP(k, -1, m) add(k, j + min(k, n-1));
        REP(k, -1, m) add(k, j + min(k, n-1) - k);
        for (int k = m; k >= 0; --k) add(k, j + min(k, n-1));
        for (int k = m; k >= 0; --k) add(k, j + min(k, n-1) - k);
    }
    cout ot ans nl;
}
```

</details>

**p5**

賽中楊寬洋自己把它做掉了。

很典的方格捷徑 DP。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 1e5, mod = 998244353;
using st = array<int, 2>;
st dp[N];

void solve() {
    int m, n; cin in m in n;
    dp[0][0] = 1;
    REP(i, 0, m) {
        st le{};
        REP(j, 0, n) {
            char c; cin in c;
            st up = dp[j];
            REP(k, 0, 2) dp[j][k ^ (c == '#')] = (le[k] + up[k]) % mod;
            le = dp[j];
        }
    }
    cout ot dp[n-1][1] nl;
}
```

</details>

**p6**

賽中沒碰。

看到範圍 $n \le 100. k \le 10 ^ 9$，顯然是矩陣快速冪。

把轉移矩陣構造出來，就做完了，算是很板的題。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 100, mod = 998244353;
template <size_t m, size_t n>
using mat = array<array<ll, n>, m>;

template <size_t p, size_t q, size_t r>
mat<p, r> operator*(const mat<p, q> &a, const mat<q, r> &b) {
    mat<p, r> c{};
    REP(i, 0, p) REP(k, 0, q) REP(j, 0, r) {
        (c[i][j] += a[i][k] * b[k][j]) %= mod;
    }
    return c;
}

void solve() {
    int n, k, s, t; cin in n in k in s in t; --s;
    mat<1, N> l{};
    REP(i, 0, n) cin in l[0][i];
    mat<N, N> tt{};
    REP(i, 0, n) {
        if (i-1 >= 0) ++tt[i][i-1], --tt[i][i];
        tt[i][i] += n-1;
        if (i+1 <  n) ++tt[i][i+1], --tt[i][i];
    }
    for (; k; k >>= 1) {
        if (k & 1) l = l * tt;
        tt = tt * tt;
    }
    cout ot (accumulate(&l[0][s], &l[0][t], 0LL) % mod) nl;
}
```

</details>

**p7**

封板後做掉。很卡常的題目，糟糕。

因為會被卡常，所以避免使用 `set`、`map`。

以下解法直接在斜角上做，也可以將點 $(x, y)$ 變成 $(x + y, x - y)$，然後直著做，此時 $d$ 要變成 $2d$。

為了省事，可以只算一個方向，並旋轉後再做一次。

小心運算 `x + y - d` 之類的範圍時會 overflow，因此將 `d` 設成 `long long` 可以保證此運算時隱式轉型、不溢出。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 1e6;

struct pp {
    int x, y;
    int add() {
        return x + y;
    }
    int sub() {
        return x - y;
    }
} l[N];
int sl[N], cnt[N + 1], p[N];

void solve() {
    int n; ll d; cin in n in d;
    REP(i, 0, n) cin in l[i].x in l[i].y;
    ll ans = 0;
    auto f = [&]() {
        REP(i, 0, n) sl[i] = l[i].add();
        sort(sl, sl + n); int m = unique(sl, sl + n) - sl;
        auto mp = [&](int x) {
            return lower_bound(sl, sl + m, x) - sl;
        };
        fill(cnt, cnt + m + 1, 0);
        REP(i, 0, n) ++cnt[mp(l[i].add())];
        REP(i, 0, m) cnt[i+1] += cnt[i];
        REP(i, 0, n) p[--cnt[mp(l[i].add())]] = i;
        int gj = 0;
        REP(gi, 0, m) {
            int s = cnt[gi], t = cnt[gi + 1];
            sort(p + s, p + t, [&](int a, int b) {
                return l[a].sub() < l[b].sub();
            });
            while (l[p[cnt[gj]]].add() < l[p[cnt[gi]]].add() - d) ++gj;
            if (l[p[cnt[gj]]].add() == l[p[cnt[gi]]].add() - d) {
                int ss = cnt[gj], tt = ss;
                REP(i, s, t) {
                    while (ss < cnt[gj+1] and l[p[ss]].sub() < l[p[i]].sub() - d) ++ss;
                    while (tt < cnt[gj+1] and l[p[tt]].sub() < l[p[i]].sub() + d) ++tt;
                    ans += tt - ss;
                }
            }
        }
    };
    REP(r, 0, 2) {
        f();
        REP(i, 0, n) swap(l[i].x, l[i].y), l[i].y *= -1;
    }
    cout ot ans nl;
}
```

</details>

**p8**

布丁出的非常好題目，[CSES. New Roads Queries](https://cses.fi/problemset/task/2101/) 的小包裝。

先多源 BFS 算出每個點的加入時間，然後就可以用啟發式合併 DSU 建一顆卡巴楚拉重構樹，就能在線詢問了。

此解法實作簡單常數又小，值得學。

也可以砸 $\mathcal{O}(n) - \mathcal{O}(1)$ LCA，那整體就只帶 DSU 的一個 $\alpha$ 了。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 1e5, lim = N + 2;

vec<int> G[N];
vec<int> dead[lim];

int dsu[N], siz[N];
int l[N];
int deadt[N];
bool vis[N];

vec<int> add[lim + 1];

void merge(int a, int b, int v) {
    while (dsu[a] >= 0) a = dsu[a];
    while (dsu[b] >= 0) b = dsu[b];
    if (a != b) {
        if (siz[a] < siz[b]) swap(a, b);
        siz[a] += siz[b];
        dsu[b] = a;
        l[b] = v;
    }
}

int query(int a, int b) {
    int res = lim;
    while (a != b) {
        if (siz[a] < siz[b]) swap(a, b);
        if (dsu[b] < 0) {
            res = -1;
            break;
        }
        res = min(res, l[b]);
        b = dsu[b];
    }
    return res;
}

void solve() {
    int n, m, k, q;
    cin in n in m in k in q;
    fill(dsu, dsu + n, -1);
    fill(siz, siz + n, 1);
    fill(l, l + n, lim);
    fill(deadt, deadt + n, lim);
    REP(ei, 0, m) {
        int a, b; cin in a in b; --a, --b;
        G[a].emplace_back(b);
        G[b].emplace_back(a);
    }
    while (k--) {
        int i, t; cin in i in t; --i;
        dead[t].emplace_back(i);
    }
    REP(t, 0, lim) {
        for (int i: dead[t]) if (deadt[i] >= t) {
            deadt[i] = t;
            for (int j: G[i]) if (deadt[j] > t + 1) {
                deadt[j] = t + 1;
                dead[t + 1].emplace_back(j);
            }
        }
    }
    REP(i, 0, n) add[deadt[i]].emplace_back(i);

    for (int t = lim; t >= 0; --t) {
        for (int i: add[t]) {
            vis[i] = 1;
            for (int j: G[i]) if (vis[j]) {
                merge(i, j, t - 1);
            }
        }
    }
    while (q--) {
        int a, b; cin in a in b; --a, --b;
        int res = query(a, b);
        cout ot (res < lim - 1 ? res : -164253) nl;
    }
}
```

</details>

**表揚布丁很會出題**

{% cimg src=puddingorz.png w=80% alt="布丁 Orz" %}

**譴責餘切亂砸怪科技**

{% cimg src=cotnailcare.png w=50% alt="餘切💅" %}

## 破台被 DQ

{% cimg src=ipigorz.png w=50% alt="iPig 教我破台" %}

{% cimg src=noscoreboardwtf.png w=75% alt="記分板不見了" mt=20px %}

這場真的超級怪。

# NTUCPCPC 初賽（7/26）

跟線上團練的形式幾乎一樣，只差在這次三個人都可以用電腦。

## 題目

[NTUCPCPC 2026 題單](https://oj.ntucpc.org/problems/tag/ntucpcpc-2026)

[NTUCPCPC 2026 初賽題解](https://hackmd.io/@alvingogo/HynWwv0Nzx#/)

[NTUCPCPC 2026 初賽程式碼](https://drive.google.com/file/d/1AQdrWnLxaz6nb_M9gbLzJ916vQmiNzDk/view?usp=sharing)

**pA**

算是還不錯的熱身題(?)

主流有兩種做法：

因為 $n, m \le 1000$ 超小，根本可以 $\mathcal{O}(n \cdot m)$ 亂做，總之一直做給定操作的反操作（找一個度數為 $2$ 的點、把他拔掉、對原本他連接的兩個點建邊），直到不能做的時候，暴力枚舉一下跟哪一張圖同構。這就純實作，蔡孟平賽中用 C++ 一發過了這題，優秀。

或者觀察一下，發現該操作只會增加度數為 $2$ 的點，並不會改變其他點的度數，因此直接計數一下各度數的頻率，再跟五種圖匹配即可（還有其他 $\infty$ 種類似解法）。

<details>
  <summary class="border">Solution Code</summary>

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    deg = [0] * n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        deg[a] += 1
        deg[b] += 1
    cnt = [0] * 5
    for d in deg:
        if d < 5: cnt[d] += 1
    if cnt[3] == 2:
        print("A")
    elif cnt[4]:
        print("B")
    elif cnt[1] and not cnt[3]:
        print("C")
    elif not cnt[1]:
        print("D")
    else:
        print("E")
main()
```

</details>

**pB**

梗，發現 $|S| = 2$ 顯然最好，直接取出現最多次的邊。

<details>
  <summary class="border">Solution Code</summary>

```python
def main():
    from sys import stdin
    from collections import defaultdict
    e = stdin.readline

    n, m = map(int, e().split())
    cnt = defaultdict(int)
    for _ in range(m):
        cnt[tuple(map(int, e().split()))] += 1
    print(2)
    print(*max(cnt, key=cnt.__getitem__))
main()
```

</details>

**pC**

我看到科技，很興奮地就看錯了題目，以為操作 1 是「將某 $u$ 的員工改為某 $p$」，變得爆幹難，然後就跟 mocha 一起燒雞，蔡孟平也看了題目，然後聽我們講形式化題目，覺得怪怪的，以為只是自己聽錯了，就沒說，我們最後沒做出來，真的超怪。賽後有好好檢討了。

操作 2 顯然是要求 LCA 和深度。而操作 1 執行完後，新樹上的 LCA 會是舊樹上 LCA 的祖先，所以可以用 DSU 維護「尚未被操作的最近祖先」；此外，假設對 $x$ 操作，則 $x$ 子樹內（不包括 $x$）的深度都會 $-1$，這部分是一個帶權深度問題。

還需要注意：當詢問的兩個節點 $a, b$ 相等時，若是該節點已經被操作 1 操作過，則會錯誤地往上找「尚未被操作的最近祖先」，而使答案非預期的 $1$，因此需要特判。

此解法需要 LCA + BIT + DSU。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5;
int n, q;

vec<int> G[N];
int pa[N], ch[N], top[N], siz[N], tin[N], tout[N], dfn;
int dsu[N], bit[N + 2];

void dfs(int i) {
    siz[i] = 1;
    ch[i] = -1;
    for (int j: G[i]) {
        dfs(j);
        siz[i] += siz[j];
        if (ch[i] == -1 or siz[j] > siz[ch[i]]) ch[i] = j;
    }
}

void hld(int i, int t) {
    tin[i] = dfn++;
    ++bit[dfn];
    top[i] = t;
    if (~ch[i]) {
        hld(ch[i], t);
        for (int j: G[i]) if (j != ch[i]) {
            hld(j, j);
        }
    }
    tout[i] = dfn;
    --bit[dfn + 1];
}

int lca(int a, int b) {
    while (top[a] != top[b]) {
        if (tin[top[a]] < tin[top[b]]) swap(a, b);
        a = pa[top[a]];
    }
    if (tin[a] < tin[b]) swap(a, b);
    return b;
}

void add(int i, int v) {
    for (++i; i <= n; i += i & -i) bit[i] += v;
}

int query(int i) {
    int res = 0;
    for (++i; i; i &= i - 1) res += bit[i];
    return res;
}

int find(int x) {
    for (; dsu[x] >= 0; x = dsu[x]) if (dsu[dsu[x]] >= 0) dsu[x] = dsu[dsu[x]];
    return x;
}

void solve() {
    M(dsu, -1);
    cin in n in q;
    REP(i, 1, n) {
        int p; cin in p; --p;
        pa[i] = p;
        G[p].emplace_back(i);
    }
    dfs(0), hld(0, 0);
    REP(i, 1, n) {
        int j = i + (i & -i);
        if (j <= n) bit[j] += bit[i];
    }
    while (q--) {
        char c; cin in c;
        if (c == '*') {
            int i; cin in i; --i;
            if (~dsu[i]) continue;
            dsu[i] = pa[i];
            add(tin[i] + 1, -1), add(tout[i], 1);
        } else {
            int a, b; cin in a in b; --a, --b;
            if (a == b) cout ot 1 nl;
            else {
                int x = find(lca(a, b));
                int res = query(tin[a]) + query(tin[b]) - query(tin[x]) * 2 + 1;
                cout ot res nl;
            }
        }
    }
}
```

</details>

實際上不用 DSU，對 $x$ 執行操作 1 時，不妨將 $x$ 的深度也 $-1$，則 $x$ 到「尚未被操作的最近祖先」這條路徑上，每個點的深度就都一樣，LCA 部分的深度貢獻就正確了；只是若是詢問的兩點 $a, b$ 被操作過，他們的深度需要把先前多扣加回來一單位。一樣需要特判 $a = b$ 的情況。（這是涓涓想的，很聰明。這題是他們那隊[首殺](#涓涓慘遭-dq)，但不是涓涓寫的...）

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5;
int n, q;

vec<int> G[N];
int pa[N], ch[N], top[N], siz[N], tin[N], tout[N], dfn;
int bit[N + 2];
bool vis[N];

void dfs(int i) {
    siz[i] = 1;
    ch[i] = -1;
    for (int j: G[i]) {
        dfs(j);
        siz[i] += siz[j];
        if (ch[i] == -1 or siz[j] > siz[ch[i]]) ch[i] = j;
    }
}

void hld(int i, int t) {
    tin[i] = dfn++;
    ++bit[dfn];
    top[i] = t;
    if (~ch[i]) {
        hld(ch[i], t);
        for (int j: G[i]) if (j != ch[i]) {
            hld(j, j);
        }
    }
    tout[i] = dfn;
    --bit[dfn + 1];
}

int lca(int a, int b) {
    while (top[a] != top[b]) {
        if (tin[top[a]] < tin[top[b]]) swap(a, b);
        a = pa[top[a]];
    }
    if (tin[a] < tin[b]) swap(a, b);
    return b;
}

void add(int i, int v) {
    for (++i; i <= n; i += i & -i) bit[i] += v;
}

int query(int i) {
    int res = 0;
    for (++i; i; i &= i - 1) res += bit[i];
    return res;
}

void solve() {
    cin in n in q;
    REP(i, 1, n) {
        int p; cin in p; --p;
        pa[i] = p;
        G[p].emplace_back(i);
    }
    dfs(0), hld(0, 0);
    REP(i, 1, n) {
        int j = i + (i & -i);
        if (j <= n) bit[j] += bit[i];
    }
    while (q--) {
        char c; cin in c;
        if (c == '*') {
            int i; cin in i; --i;
            if (vis[i]) continue;
            vis[i] = 1;
            add(tin[i], -1), add(tout[i], 1);
        } else {
            int a, b; cin in a in b; --a, --b;
            if (a == b) cout ot 1 nl;
            else {
                int x = lca(a, b);
                int res = query(tin[a]) + query(tin[b]) - query(tin[x]) * 2 + vis[a] + vis[b] + 1;
                cout ot res nl;
            }
        }
    }
}
```

</details>

Bonus：我們看錯的版本可以 $\mathcal{O}(n \log n)$ 做掉。{% spoiler （LCT 板子題） %}

**pD**

賽中 mocha 一看：欸這不暴力嗎？然後我就開砸了，結果沒寫記憶化剪枝，複雜度是爛了，T 了一筆才 AC。

<details>
  <summary class="border">Solution Code</summary>

```cpp
int n, k;
using a = array<int, 6>;

struct h {
    size_t operator()(const a &x) const {
        ll res = 0;
        ll b = 1;
        REP(i, 0, n + 1) {
            res += x[i] * b;
            b *= 11;
        }
        return res;
    }
};


unordered_map<a, double, h> memo;

double dfs(int r, a l) {
    REP(i, 0, n) if (l[i] == 0) return 0;
    l[n] = r;
    auto it = memo.find(l);
    if (it != memo.end()) return it->second;
    if (r == k) {
        int res = 1;
        REP(i, 0, n) res *= l[i];
        return res;
    }
    double res = -1;
    REP(i, 0, n) {
        int v = l[i];
        double sm = 0;
        REP(nv, 0, v + 1) {
            l[i] = nv;
            sm += dfs(r + 1, l);
        }
        sm /= v + 1;
        l[i] = v;
        if (res == -1) res = sm;
        else if ((r & 1) == 0) {
            res = max(res, sm);
        } else {
            res = min(res, sm);
        }
    }
    memo[l] = res;
    return res;
}

void solve() {
    memo.clear();
    cin in n in k;
    a l{};
    REP(i, 0, n) cin in l[i];
    cout ot fixed ot setprecision(10) ot dfs(0, l) nl;
}
```

</details>

實際上他是梗。每一回合期望值固定 $\times \frac{1}{2}$。

<details>
  <summary class="border">Solution Code</summary>

```python
n, k = map(int, input().split())
ans = 2**-k
for v in map(int, input().split()): ans *= v
print(f"{ans:.114514f}")
```

</details>

**pE**

計幾 + 大科技。我賽中好不容易寫出來，反正瘋狂 WA。

這題 $\gg$ 我程度了，做不掉。

解法大概就是求出所有交點，然後掃描線並維護前 $k$ 大。但他們浮點數卡得很努力，要用有理化，避免使用任何浮點數，多線共點的部分也要好好處理，不然順序會大爛掉，這部分我還是不太清楚具體是怎做的。

*WIP*

很白癡的是，唯一 AC 組別使用了 [最大公因數（極速板）+ L1/L2 快取（Cache Locality）](#最大公因數極速板-l1l2-快取cache-locality)。

**pF**

又是計幾，還是互動，賽中沒想出來。非常好、非常厲害的一題。

*WIP*

**pG**

賽中 mocha 一通很聰明地觀察，把這題寫掉了。

簡而言之，每次貪心從最深的節點開始，往根的方向取一條最長連續鏈。

這個做法又短、常數又小，超棒的。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 2e5;
int l[N], pa[N], dep[N];
int deg[N], q[N], cnt[N];
ll ans[2];

void solve() {
    // M(deg, 0), M(cnt, 0), ans[0] = ans[1] = 0;
    int n; cin in n;
    pa[0] = -1;
    deg[0] = 1;
    REP(i, 1, n) {
        int a, b; cin in a in b; --a, --b;
        pa[b] = a;
        ++deg[a];
    }
    REP(i, 0, n) cin in l[i];
    #define ppc __builtin_popcount
    REP(i, 0, n) if (l[i]) ans[1] += ppc(l[i]) - 1;
    int qi = 0;
    REP(s, 1, n) for (int i = s; deg[i] == 0; i = pa[i]) {
        deg[i] = -1, q[qi++] = i;
        --deg[pa[i]];
    }
    ++cnt[0];
    while (qi) {
        int i = q[--qi];
        ++cnt[dep[i] = dep[pa[i]] + 1];
    }
    REP(i, 1, n) cnt[i] += cnt[i - 1];
    REP(i, 0, n) q[--cnt[dep[i]]] = i;
    for (int qi = n; qi--; ) {
        int s = q[qi];
        while (l[s] > 1) {
            ll cnt = 0;
            for (int i = s; ~i and (l[i] >>= 1); ++cnt, i = pa[i]);
            ans[0] += cnt * cnt;
        }
    }
    cout ot ans[0] sep ans[1] nl;
}
```

</details>

**pH**

mocha 賽中想到可以把每個小矩形離散化到 $42 \times 42$ 方格上，再套個 `bitset<42*42>` 就有了 $\mathcal{O}(2 ^ n \cdot \frac{n ^ 2}{64})$ 的解法。

<details>
  <summary class="border">Solution Code</summary>

```cpp
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")

const int N = 20, M = 42;
int n;

struct rec {
    int a, b, c, d;
} l[N];
using bb = bitset<M*M>;
bb bs[N];
int ans, tar;

void dfs(int i, int cnt, bb cur) {
    if (cnt > ans) return;
    if (cur.count() == tar) {
        ans = cnt;
        return;
    }
    if (i == n) return;
    dfs(i + 1, cnt + 0, cur);
    dfs(i + 1, cnt + 1, cur | bs[i]);
}

void solve() {
    vec<int> xs, ys;
    rec big; {
        auto &[a, b, c, d] = big;
        cin in a in d in c in b;
        xs.emplace_back(a), ys.emplace_back(b);
        xs.emplace_back(c), ys.emplace_back(d);
    }
    cin in n;
    REP(i, 0, n) {
        auto &[a, b, c, d] = l[i];
        cin in a in d in c in b;
        xs.emplace_back(a), ys.emplace_back(b);
        xs.emplace_back(c), ys.emplace_back(d);
    }
    sort(all(xs)), xs.erase(unique(all(xs)), xs.end());
    sort(all(ys)), ys.erase(unique(all(ys)), ys.end());
    auto mp = [&](const vec<int> &a, int x) {
        return lower_bound(all(a), x) - a.begin();
    };
    auto mpmp = [&](rec &x) {
        auto &[a, b, c, d] = x;
        a = mp(xs, a), b = mp(ys, b);
        c = mp(xs, c), d = mp(ys, d);
    };
    mpmp(big);
    REP(i, 0, n) mpmp(l[i]);
    {
        auto [a, b, c, d] = big;
        tar = (c - a) * (d - b);
    }
    #define idx(i, j) ((i)*M + (j))
    REP(x, 0, n) {
        auto &[a, b, c, d] = l[x];
        a = max(a, big.a), b = max(b, big.b);
        c = min(c, big.c), d = min(d, big.d);
        bs[x].reset();
        REP(i, a, c) REP(j, b, d) {
            bs[x][idx(i, j)] = 1;
        }
    }
    ans = n + 1;
    dfs(0, 0, {});
    cout ot (ans <= n ? ans : -1) nl;
}
```

</details>

也可以數學很好地 $\mathcal{O}(2 ^ n \cdot n)$ 排容。

然而使用的記憶體很多，且無法剪枝，因此常數頗大。

<details>
  <summary class="border">Solution Code</summary>

```cpp
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")

const int N = 20, BIT = 1 << N;
#define ctz __builtin_ctz
#define par __builtin_parity
#define ppc __builtin_popcount
struct rec {
    int a, b, c, d;
    ll area() {
        return 1LL * max(0, c - a) * max(0, d - b);
    }
    rec operator&(const rec &o) {
        return {max(a, o.a), max(b, o.b), min(c, o.c), min(d, o.d)};
    }
    friend istream &operator>>(istream &iss, rec &o) {
        auto &[a, b, c, d] = o;
        return iss in a in d in c in b;
    }
} g[BIT];
ll dp[BIT];

void solve() {
    rec &big = g[0]; cin in big;
    ll tar = big.area();
    int n; cin in n;
    const int bit = 1 << n;
    REP(i, 0, n) {
        rec &o = g[1 << i]; cin in o;
        o = o & big;
    }
    REP(b, 1, bit) g[b] = g[b & (b - 1)] & g[b & -b];
    REP(b, 1, bit) dp[b] = par(b) ? g[b].area() : -g[b].area();
    REP(i, 0, n) for (int s = 1 << i, b = s; b < bit; ++b |= s) dp[b] += dp[b ^ s];
    int ans = n + 1;
    REP(b, 1, bit) if (dp[b] == tar) ans = min(ans, ppc(b));
    cout ot (ans <= n ? ans : -1) nl;
}
```

</details>

**pI**

賽中 max 很厲害地想到 Hash 然後很厲害地寫掉了。

以下寫法為了鴨腸而手刻遞迴。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5, B = 1145141;
int n, m;
int cnt[N + 1], pa[N], G[N], it[N];
int l[N], stk[N], si;
bool ans[N];

void solve() {
    // M(cnt, 0), M(ans, 0), M(it, 0);
    cin in n in m;
    REP(i, 1, n) {
        int p; cin in p; --p;
        pa[i] = p;
        ++cnt[p];
    }
    REP(i, 0, n) cnt[i + 1] += cnt[i];
    for (int i = n; --i; ) G[--cnt[pa[i]]] = i;
    int tar = 0, pw = 1;
    REP(i, 0, m) {
        int x; cin in x;
        (tar *= B) += x;
        pw *= B;
    }
    stk[si++] = 0;
    l[0] = 0;
    while (si) {
        int i = stk[--si];
        int &v = l[i];
        int &x = it[i];
        if (x == 0) {
            if (si >= m) {
                int pp = stk[si - m];
                ans[pp] |= v == tar;
                (v *= B) -= it[pp] * pw;
            } else v *= B;
        }
        if (x == cnt[i + 1] - cnt[i]) continue;
        ++si;
        int j = G[cnt[i] + x++];
        int nv = v + x;
        l[j] = nv;
        stk[si++] = j;
    }
    REP(i, 0, n) cout ot ans[i]; cout nl;
}
```

</details>

也可以用可持久化線段樹做到確定性。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5;
int n, m; ll tar, Bm;
vec<int> G[N];
int stk[N], si;
bool ans[N];

struct node {
    int val = 0;
    node *le = 0, *ri = 0;
    node *clone() {
        return new node(*this);
    }
} *tr[N + 1];

void build(node *&o, int s, int t) {
    o = new node();
    if (s + 1 == t) {
        o->val = 0;
        return;
    }
    int mid = s + t >> 1;
    build(o->le, s, mid);
    build(o->ri, mid, t);
}

void modify(node *&o, int s, int t, int i, int v) {
    if (i >= n) return;
    o = o->clone();
    if (s + 1 == t) {
        o->val = v;
        return;
    }
    int mid = s + t >> 1;
    if (i < mid) modify(o->le, s, mid, i, v);
    else         modify(o->ri, mid, t, i, v);
}

int query(node *&o, int s, int t, int i) {
    if (i >= n) return 0;
    if (s + 1 == t) return o->val;
    int mid = s + t >> 1;
    if (i < mid) return query(o->le, s, mid, i);
    else         return query(o->ri, mid, t, i);
}

void dfs(int i, int o) {
    if (o == m) {
        int pp = stk[si - m];
        ans[pp] = 1;
    }
    stk[si++] = i;
    REP(x, 0, G[i].size()) {
        int j = G[i][x];
        dfs(j, query(tr[o], 0, n, x));
    }
    --si;
}

void solve() {
    // M(ans, 0); REP(i, 0, N) G[i].clear();
    cin in n in m;
    REP(i, 1, n) {
        int p; cin in p; --p;
        G[p].emplace_back(i);
    }
    build(tr[0], 0, n);
    int j = 0;
    REP(i, 0, m) {
        int x; cin in x; --x; 
        tr[i] = tr[j];
        modify(tr[i], 0, n, x, i + 1);
        if (i) j = query(tr[j], 0, n, x);
    }
    tr[m] = tr[j];
    dfs(0, 0);
    REP(i, 0, n) cout ot ans[i]; cout nl;
}
```

</details>

## 涓涓慘遭 DQ

{% cimg src=juanjuandqed.png w=60% alt="涓涓慘遭 DQ" %}

由涓涓論述的 `Bejaminshih` 戰績：

- 資芽所有題目寫完
- 階段考破台

（因為是資芽認識的）
根本懷疑他資芽也是用 AI 做，資芽難度肯定不是能隨便破台的。

他之前甚至有來私我旋轉相除法要怎麼做，所以我對他印象其實還行；現在直接黑名單，害涓涓被 DQ 的垃圾。

## 最大公因數（極速板）+ L1/L2 快取（Cache Locality）

訊息太長了，直接從 [這裡](https://discord.com/channels/1258755901406576640/1258755901913825393/1531088063961501697) 開始看，這裡可以加入：[臺大程式解題社 NTUCPC 伺服器](https://discord.gg/MXSwq8Y2X9)。

他甚至還刪帳號了，拉完。

如果你想要懶人包，以下省流：

<details>
  <summary class="border">他們的 pE AC Code</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

inline long long readLL(){
    long long x = 0, w = 1; char ch = 0;
    while(ch<'0'||ch>'9') { if (ch=='-')w = -1; ch=getchar();}
    while(ch>='0'&&ch<='9'){x=x*10+ch-'0';ch=getchar();}
    return x*w;
}

inline int readInt(){
    int x = 0, w = 1; char ch = 0;
    while (ch<'0'||ch >'9'){if(ch=='-')w =-1; ch=getchar();}
    while (ch>='0'&&ch<='9'){x=x*10+ch-'0'; ch=getchar();}
    return x*w;
}

struct Fish {
    long long a,b,c;
};

// 將查詢打平，直接排序查詢本身的 x 值，利用局部連續性
struct Query{
    long long y,z;
    int k;
    int id;
    double x_val; // 用於粗略排序，聚集相近的 x
};

struct Ans{
    long long num,den;
};

// 歐幾里得最大公因數（極速版）
inline long long gcd_fast(long long a, long long b){
    while (b){a%=b;swap(a,b);}
    return abs(a);
}

Fish fishes[1005];
Query queries[1000005];
Ans answers[1000005];
long long V[1005];

int main(){
    int n=readInt();
    int q=readInt();

    for(int i=0; i<n;i++){
        fishes[i].a=readLL();
        fishes[i].b=readLL();
        fishes[i].c=readLL();
    }

    for(int i=0; i < q; ++i){
        queries[i].y=readLL();
        queries[i].z=readLL();
        queries[i].k=readInt();
        queries[i].id=i;
        queries[i].x_val=(double)queries[i].y / queries[i].z;
    }

    // 核心優化 1：依據 x 的大小對所有查詢排序
    // 這樣相近的 x 會排在一起，大大提高 CPU L1/L2 快取命中率 (Cache Locality)
    sort(queries, queries + q, [](const Query& a, const Query& b) {
        return a.x_val < b.x_val;
    });

    long long last_y=-999999999, last_z=-999999999;

    // 核心優化 2：順序遍歷
    for(int i=0; i<q;i++){
        long long y=queries[i].y;
        long long z=queries[i].z;
        int k=queries[i].k;

        // 如果跟上一個查詢的座標一模一樣，直接沿用計算結果（通常測資會有重複）
        if(y!=last_y||z!=last_z){
            long long z2=z * z;
            for (int j=0; j < n; ++j) {
                V[j]=fishes[j].a * y * y + fishes[j].b * y * z + fishes[j].c * z2;
            }
            // 使用 nth_element 將前 k 大移到最前面
            nth_element(V, V + k - 1, V + n, greater<long long>());
            last_y=y;
            last_z=z;
        }else{
            // 如果座標相同但 k 不同，且新的 k 超過上次 nth_element 的範圍，才需要重新調整
            // 為求保險與正確性，當座標相同時，我們直接在已經局部有序的 V 陣列上重新做 nth_element（速度極快）
            nth_element(V, V + k - 1, V + n, greater<long long>());
        }

        // 求前 k 大的和
        long long sum_num=0;
        for(int j=0;j<k;j++){
            sum_num +=V[j];
        }

        long long sum_den=z*z;
        long long g=gcd_fast(sum_num, sum_den);

        answers[queries[i].id]={sum_num/g, sum_den/g};
    }

    // 輸出答案
    for(int i=0;i<q;i++){
        printf("%lld %lld\n",answers[i].num,answers[i].den);
    }

    return 0;
}
```

（題外話一下，這 Code 整個就很唬爛，理論上完全是 $\mathcal{O}(n \cdot q)$ 的，且帶了 `nth_element` 的巨大常數，但被 AI 剪枝唬爛過了。）

</details>

他堅持註解是寫給隊友看的，方便團隊溝通。

{% cimg src=veryfastgcd.png w=80% alt="歐幾里得最大公因數（極速版）" %}

`nathanlee726` 問了：

> 你要不要解釋一下 L1/L2 Cache Locality 是什麼

然後他拖很久講不出來，~~也不去問 AI~~。他甚至說他程式賽中 TLE 的時候是去**查書**翻出來的，根本天才。

`eggeggegg`：

> 我覺得你不會直接可以去問ai吧反正你賽中都用了

（一直得不到回應的）`nathanlee726`：

> 你真的不打算一次解釋清楚嗎 你利用 cache locality 是做了怎樣的改善？
> 這不是用來跟隊友溝通的註釋嗎 為什麼那麼讓人難以理解？

總之決賽名單公布後他就沒出現過了。

*...接連便是難懂的話，什麽『L1/L2 Cache Locality』，什麽『最大公因數（極速版）』之類，引得衆人都鬨笑起來；臺大程式解題社內充滿了快活的空氣。*

## 其他有趣的 Code

可以下載 [NTUCPCPC 2026 初賽程式碼](https://drive.google.com/file/d/1AQdrWnLxaz6nb_M9gbLzJ916vQmiNzDk/view?usp=sharing) 自己探索w。

`team02 - 是💅` 是 IOI 2026 國手隊，他們的 code 特別💅。
`team07 - 侯欣緯隨便打都世界冠軍` 是 $\frac{2}{3}$ EGOI 2026 國手隊，裡面有很多 `wiwiho` ww。（已應吳沛神要求將「EGOI 2026 國手隊」更名為「$\frac{2}{3}$ EGOI 2026 國手隊」）

## [板子](https://rank.kzzz.idv.tw/s/2026-ntucpc-pre)

可以發現報名成功的隊伍都拿了金牌，金牌率 100%。
**以下**為尚未報名成功的組別 讓自己也報名失敗了。

# YTP 決賽（8/1）

## 賽前

YTP 和 NTUCPCPC 的決賽就在隔天，因此跟 YTP 申請來回交通補助（高鐵 $1080 \times 2 = 2160$）、跟 NTUCPCPC 申請住宿補助（等於是幫台大學長姐們省錢，我超暖）。因為要住宿，我拖了行李箱，筆電放在行李箱裡，不用背東西有夠爽，~~但拖行李箱真麻煩~~。

除了成大賽初賽見過面的 sheep、楊寬洋、唐狗針、宋睿軒、林宥辰、APCSS 見過面的 mocha、涓涓、四位 IOI 國手，跟好多人上次見面都是 TOI 一階了，有點興奮也有點緊張。

搭早上 8:08 的高鐵到台北，訂這麼早原本是想說有時間可以聊聊天(?)，可惜這要聯集才算。

在高鐵站和唐狗針、楊寬洋會合，一起到會場。

很快弄好電腦和雙螢幕，認識的人一個個出現，像是左前方的位置來了 TGOI 二階北一女的，~~我對他的印象是在選訓卷數學講義~~，是陳瑀萱那組的，後來陳瑀萱也出現了；還有雄中三巨砲一起登場，南一中的 Brinton、Blame 也都來了，還有歪歪西、吳沛神、張語珊組成的 $\frac{2}{3}$ EGOI 國手隊，只是還沒什麼說上話，就開賽了。

## 賽中

因為 IOAI 國手 sheep 還有 mocha 都是今天要搭飛機，所以他們只能打半場，下午兩點就要離開。

感覺我們這場三個人的狀態都奇差無比，sheep 說最近一直在搞 AI，已經很久沒寫程式了，楊寬洋~~狗叫說自己早就退役~~，我自己，不知道為啥。

[YTP 2026 題單](https://oj.ntucpc.org/problems/tag/ytp2026)

**p1**

很白癡的是我們到最後還是只有拿 4 分子題，完全沙比。

因為 $n, m \le 100$，所以 C++ 甚至可以 $\mathcal{O}((h_1 + h_2) \cdot (n + m)) \approx 10 ^ 7$。

<details>
  <summary class="border">Solution Code</summary>

Python 的 $\mathcal{O}((h_1 + h_2) \log_2 (n + m))$ 寫起來就這樣而已：

`heapq.merge` 可以把多個 sorted 的 iterable 合併為一個大的 sorted 的 iterator，重點是他可以接收 lazy 的 iterator 所以很棒。
因為 Python 的一些 Lazy 取值機制，需要套一層 `lambda` 再用一些不太 readable 的奇怪語法ww（當然可以寫得可讀但這樣比較簡潔），這是為了控制取值的時機。

```python
def main():
    from sys import stdin
    from heapq import merge
    from itertools import count
    e = stdin.readline

    lim = 101
    x, y = map(int, e().split())
    a = [0] * lim
    b = [0] * lim
    for _ in range(int(e())):
        d, c = map(int, e().split())
        a[c] += d
    for _ in range(int(e())):
        d, c = map(int, e().split())
        b[c] += d
    q = merge(*[(lambda c=c, d=d: ((c * t << 1 | 0, d) for t in count(1)))() for c, d in enumerate(a) if d],
              *[(lambda c=c, d=d: ((c * t << 1 | 1, d) for t in count(1)))() for c, d in enumerate(b) if d])
    for t, d in q:
        if t & 1 == 0:
            y -= d
            if y <= 0: return print(1)
        else:
            x -= d
            if x <= 0: return print(2)
main()
```

C++ 鴨腸的 Code，用 `__adjust_heap` 這個用於維護 heap 的底層操作，等於是做了 Python 的 `heapq.replace`，操作次數比 `pop_heap` + `push_heap` 還要少。

```cpp
const int N = 100, lim = N + 1;
int a[lim], b[lim];
struct item {
    int t, c;
    bool operator<(const item &o) const {
        return t > o.t;
    }
} q[N << 1];

void solve() {
    M(a, 0), M(b, 0);
    int x, y; cin in x in y;
    int n;
    for (cin in n; n--; ) {
        int c, d; cin in d in c;
        a[c] += d;
    }
    for (cin in n; n--; ) {
        int c, d; cin in d in c;
        b[c] += d;
    }
    int m = 0;
    REP(c, 1, lim) if (a[c]) q[m++] = {c << 1 | 0, c};
    REP(c, 1, lim) if (b[c]) q[m++] = {c << 1 | 1, c};
    make_heap(q, q + m);
    while (true) {
        auto &[t, c] = q[0];
        if ((t & 1) == 0) {
            if ((y -= a[c]) <= 0) {
                cout ot 1 nl;
                return;
            }
        } else {
            if ((x -= b[c]) <= 0) {
                cout ot 2 nl;
                return;
            }
        }
        t += c << 1;
        __adjust_heap(q, 0, m, move(q[0]), __gnu_cxx::__ops::__iter_less_iter());
    }
}
```

</details>

**p2**

不知道為何非常不會閱讀，所以也做了超久。這不都是簽到嗎？我們到底在幹嘛？

> 求 $L \sim R$ 中，「因數數量為奇質數」的數字數量。

首先因數數量要是奇數，則必為完全平方數，篩到 $\sqrt{n}$ 量級了。

接下來可以不觀察直接照做，把 $x$ 質因數分解，會這樣算因數數量則也易於推出 $x ^ 2$ 的因數數量。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 1e6 + 1;
int spf[N];

void solve() {
    REP(i, 2, N) if (not spf[i]) {
        for (int j = i; j < N; j += i) if (not spf[j]) spf[j] = i;
    }
    ll lo, hi; cin in lo in hi;
    int ans = 0;
    REP(i, 1, N) {
        ll x = i, xx = x * x;
        if (lo <= xx and xx <= hi) {
            int d = 1, cnt = 0;
            int pp = spf[x];
            while (x != 1) {
                int p = spf[x];
                if (p != pp) {
                    d *= cnt * 2 + 1;
                    cnt = 0;
                }
                ++cnt;
                x /= p;
                pp = p;
            }
            d *= cnt * 2 + 1;
            if (d != 2 and spf[d] == d) ++ans;
        }
    }
    cout ot ans nl;
}
```

</details>

然後可以稍微觀察一下，發現只有當 **$x$ 的質因數只有一種**的時候，$x ^ 2$ 的因數數量才有可能是質數，乾脆直接枚舉 $x ^ 2 = p ^ {q-1}$，其中 $p, q$ 是質數，此時 $x ^ 2$ 的因數數量就是 $q$。

<details>
  <summary class="border">Solution Code</summary>

```python
lim = 10**6 + 1
sieve = [True] * lim
sieve[0] = sieve[1] = False
ps = []
for i in range(2, lim):
    if not sieve[i]: continue
    ps.append(i)
    for j in range(i * i, lim, i):
        sieve[j] = False
lo, hi = map(int, input().split())
ans = 0
for p in ps:
    for q in ps:
        if q == 2: continue
        x = pow(p, q - 1)
        if x < lo: continue
        if x > hi: break
        ans += 1
print(ans)
```

</details>

或者你再觀察到答案總共只有 $78711$ 個，於是直接打表。

**p3**

拉完啦，誰愛做誰做ww。

**p4**

易於亂砸 Rolling Hash。

但也有 $\mathcal{O}(m + n)$ 的確定性解，用 KMP 就好了。

<details>
  <summary class="border">Solution Code</summary>

對較短的建 KMP，再掃一次另一個，最後在 KMP 上跳，就能找出所有前綴 $=$ 後綴的長度。
最後雙指標配對。

```cpp
const int N = 1e6;
int lps[N];

vec<int> f(const string &a, const string &b) {
    int m = a.size(), n = b.size();
    for (int i = 1, j = 0; i < m; ++i) {
        while (j and a[j] != a[i]) j = lps[j - 1];
        j += a[j] == a[i];
        lps[i] = j;
    }
    int j = 0;
    for (int i = 1; i < n; ++i) {
        while (j and a[j] != b[i]) j = lps[j - 1];
        j += a[j] == b[i];
        if (j == m) j = lps[j - 1];
    }
    vec<int> ret;
    while (j) {
        ret.emplace_back(j);
        j = lps[j - 1];
    }
    ret.emplace_back(0);
    return ret;
}

void solve() {
    string a, b; cin in a in b;
    if (a.size() > b.size()) swap(a, b);
    int m = a.size(), n = b.size();
    auto sa = f(a, b);
    reverse(all(a)), reverse(all(b));
    auto pa = f(a, b);
    reverse(all(pa));
    int ans = 0;
    int j = 0;
    REP(i, 0, sa.size()) {
        while (j + 1 < pa.size() and sa[i] + pa[j + 1] <= m) ++j;
        if (sa[i] + pa[j] <= m) {
            ans = max(ans, sa[i] + pa[j]);
        }
    }
    cout ot ans nl;
}
```

</details>

**p5**

稍微需要觀察的樹題，賽中完全沒碰。

想一下條件一，會發現 $p_{1 \sim n}$ 屬於此樹的一條 DFS 後序遍歷，且條件二的算式為 $2(n-1) - \text{某一條鏈}$，選直徑則能達到條件二的最小化要求，但這還不夠，要確保 DFS 到的最後一個點（此指前序的最後一個點）是直徑的另一個端點，DFS 時要優先把**非直徑上的點**走完。

<details>
  <summary class="border">Solution Code</summary>

以下的 `dfs` 用 `ond`（是否在直徑上）保證不會回頭走。

```cpp
const int N = 2e5;
vec<int> G[N];
int pa[N];

void dfs(int i, int p, bool ond = 1) {
    if (i == -1) return;
    for (int j: G[i]) if (j != p and j != pa[i]) dfs(j, i, 0);
    cout ot i+1 se;
    if (ond) dfs(pa[i], i, 1);
}

void solve() {
    int n; cin in n;
    REP(i, 0, n) G[i].clear();
    REP(i, 1, n) {
        int a, b; cin in a in b; --a, --b;
        G[a].emplace_back(b);
        G[b].emplace_back(a);
    }
    queue<int> q;
    int i = 0;
    q.emplace(i);
    pa[i] = -1;
    while (q.size()) {
        i = q.front(); q.pop();
        for (int j: G[i]) if (j != pa[i]) {
            pa[j] = i;
            q.emplace(j);
        }
    }
    q.emplace(i);
    pa[i] = -1;
    while (q.size()) {
        i = q.front(); q.pop();
        for (int j: G[i]) if (j != pa[i]) {
            pa[j] = i;
            q.emplace(j);
        }
    }
    dfs(i, -1);
    cout nl;
}
```

</details>

**p6**

一眼對答案二分搜 + 0-1 最短路。

以下程式碼是 $\mathcal{O}(m \log_2 (m + n))$，直接在 sorted 的邊權上二分搜。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 2e5, inf = 1e9;
using pii = pair<int, int>;
int dis[N];
bool vis[N];
vec<pii> G[N];
int ew[N + 2];

void solve() {
    int n, m, k; cin in n in m in k;
    REP(i, 0, n) G[i].clear();
    REP(i, 0, m) {
        int a, b, w; cin in a in b in w; --a, --b;
        G[a].emplace_back(b, w);
        G[b].emplace_back(a, w);
        ew[i] = w;
    }
    ew[m++] = 0;
    sort(ew, ew + m), m = unique(ew, ew + m) - ew;
    int lo = 0, hi = m;
    while (lo < hi) {
        int mid = lo + hi >> 1;
        M(dis, 0x3f), M(vis, 0);
        deque<int> q = {0};
        dis[0] = 0;
        while (q.size()) {
            int i = q.front(); q.pop_front();
            if (vis[i]) continue;
            vis[i] = 1;
            for (auto [j, w]: G[i]) {
                int add = w > ew[mid], nv = dis[i] + add;
                if (nv < dis[j]) {
                    dis[j] = nv;
                    if (add == 0) q.emplace_front(j);
                    else          q.emplace_back(j);
                }
            }
        }
        if (dis[n-1] > k) lo = mid + 1;
        else              hi = mid;
    }
    cout ot (lo < m ? ew[lo] : -1) nl;
}
```

</details>

**p7**

我賽中一直以為自己會，結果完全精神錯方向。
最後又因為以為自己能寫完 p9，時間決策直接大燒雞，連 $n, m \le 2000$ 的子題都沒撈。

其實就是 $\mathcal{O}(m + |\text{LCS}| \times (n + m))$ 的 DP，`dp[x = 0~100][i = 0~n-1] = j (0~m-1)` 表示 $|\text{LCS}| = x$ 時，使 $\text{LCS}$ 以 $a[i] = b[j]$ 結尾的**最小 $j$**，**最小**是貪心來的，這很顯然。

發現轉移順序很好，易於把 $x$ 這層直接壓掉，連滾動都不用。而最佳轉移點則可以取前一層的前綴 $mn = \min dp[x-1][\dots]$，再**均攤**（這部分均攤起來是 $\mathcal{O}(m)$）找合法的最小 $mn < j$ 使 $a[i] = b[j]$，看 code 應該比較好理解。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5 + 1, A = 101;
int l[N], dp[N], it[N];
vec<int> pos[N];

void solve() {
    // REP(v, 0, N) pos[v].clear();
    int n, m; cin in n in m;
    REP(i, 0, n) cin in l[i];
    REP(i, 0, m) {
        int v; cin in v;
        pos[v].emplace_back(i);
    }
    int mn = -1;
    REP(ans, 0, A) {
        REP(v, 0, N) it[v] = pos[v].size();
        bool happy = 0;
        REP(i, 0, n) {
            int v = l[i];
            auto &p = pos[v];
            while (it[v] and p[it[v] - 1] > mn) --it[v];
            mn = min(mn, dp[i]);
            dp[i] = it[v] < p.size() ? p[it[v]] : m;
            if (dp[i] < m) happy = 1;
        }
        if (not happy) {
            cout ot ans nl;
            return;
        }
        mn = m;
    }
}
```

</details>

**p8**

很典的題。

因為 $a_i > 1$，因此在**最小值相同**的情況下，顯然區間取得越大越好。
就對於每個 $b_i$，兩次單調棧算出左右 $<$ 自己的第一個人，就知道區間了。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 5e5;
ll a[N + 1];
int b[N], le[N], ri[N];

void solve() {
    int n; cin in n;
    REP(i, 0, n) cin in a[i+1];
    REP(i, 0, n) cin in b[i];
    REP(i, 0, n) a[i+1] += a[i];
    stack<int> stk;
    REP(i, 0, n) {
        while (stk.size() and b[stk.top()] >= b[i]) stk.pop();
        le[i] = stk.size() ? stk.top() + 1 : 0;
        stk.emplace(i);
    }
    stk = {};
    for (int i = n; i--; ) {
        while (stk.size() and b[stk.top()] >= b[i]) stk.pop();
        ri[i] = stk.size() ? stk.top() : n;
        stk.emplace(i);
    }
    ll ans = 0;
    REP(i, 0, n) ans = max(ans, (a[ri[i]] - a[le[i]]) * b[i]);
    cout ot ans nl;
}
```

</details>

<span id="fuked-up-cuz-idk-how-to-mat-mul"></span>

**p9**

看範圍一眼就是矩陣快速冪，然而因為前面埋的 [伏筆](#idk-how-to-mat-mul)，我忘記要怎麼構造矩陣了，羊又已經去坐飛機了，楊寬洋正在嘗試拿子題，我獨自燒雞。最後沒寫出來，完全沙比。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 200, mod = 1e9 + 7;
using pii = pair<int, int>;
template <size_t m, size_t n>
using mat = array<array<ll, n>, m>;

template <size_t p, size_t q, size_t r>
mat<p, r> operator*(const mat<p, q> &a, const mat<q, r> &b) {
    mat<p, r> c{};
    REP(i, 0, p) REP(k, 0, q) REP(j, 0, r) (c[i][j] += a[i][k] * b[k][j]) %= mod;
    return c;
}

int deg[N];
pii es[N];

ll inv(ll x) {
    ll res = 1;
    for (int n = mod - 2; n; n >>= 1) {
        if (n & 1) (res *= x) %= mod;
        (x *= x) %= mod;
    }
    return res;
}

void solve() {
    int n, m, s, t; ll k; cin in n in m in s in t in k; --s, --t;
    mat<1, N> dp{};
    REP(i, 0, m) {
        int a, b; cin in a in b; --a, --b;
        ++deg[a], ++deg[b];
        es[i << 1 | 0] = {a, b};
        es[i << 1 | 1] = {b, a};
    }
    m <<= 1;
    ll x = inv(deg[s]);
    REP(i, 0, m) {
        auto [a, b] = es[i];
        if (a == s) dp[0][i] = x;
    }
    if (--k) {
        mat<N, N> tt{};
        REP(i, 0, m) {
            auto [a, b] = es[i];
            ll x = inv(deg[b] - 1);
            REP(j, 0, m) if (j != i) {
                auto [c, d] = es[j];
                if (b == c and a != d) tt[i][j] = x;
            }
        }
        for (; k; k >>= 1) {
            if (k & 1) dp = dp * tt;
            tt = tt * tt;
        }
    }
    ll ans = 0;
    REP(i, 0, m) {
        auto [a, b] = es[i];
        if (b == t) (ans += dp[0][i]) %= mod;
    }
    cout ot ans nl;
}
```

</details>

**p10**

很有趣的一題數位 DP，我賽中有寫出來，但 Python 被卡常，來不及改成 C++。好題但視解法而定可能需要鴨腸。

這題主要麻煩的點是 $10 ^ {18}$ 很大，就算只能用 $2, 3, 5, 7$ 四個質因數，考慮 worst case 的話，$\lfloor \log_2 10 ^ {18} \rfloor \times \lfloor \log_3 10 ^ {18} \rfloor \times \lfloor \log_5 10 ^ {18} \rfloor \times \lfloor \log_7 10 ^ {18} \rfloor = 1,146,075$ 十分炸裂。然而實際上根本不可能達到這個 worst case，最厲害的 $M = 846879183360000000 = 2 ^ {15} \cdot 3 ^ 9 \cdot 5 ^ 7 \cdot 7 ^ 5$，因數數量 $7680$。

賽中可以直接猜因數數量足夠小（brinton 說的），然後好好設計 Hash Function，就能過了。

<details>
  <summary class="border">Solution Code</summary>

以下實作中，因為 `islim = 1` 的 case 具有唯一性，所以不需要 `memo`；而 `z` 只有在 `start` 的時候可能為真，所以這樣寫是 OK 的。

```cpp
const int N = 20;
using a4 = array<int, 4>;
int n, num[N];
string s; ll m;

a4 ps = {2, 3, 5, 7}, add[10], cntm;
vec<ll> memo;

a4 pf(ll &x) {
    a4 c{};
    REP(pi, 0, 4) for (int p = ps[pi]; x % p == 0; x /= p) ++c[pi];
    return c;
}

a4 operator+(const a4 &a, const a4 &b) {
    a4 c{};
    REP(i, 0, 4) c[i] = min(a[i] + b[i], cntm[i]);
    return c;
}

int key(int i, int start, int z, const a4 &cur) {
    int x = i * 3 + start + z;
    REP(i, 0, 4) x *= cntm[i] + 1, x += cur[i];
    return x;
}

ll dp(int i = 0, bool start = 0, bool islim = 1, bool z = 0, const a4 &cur = {}) {
    if (i == n) {
        if (not start) return 0;
        return z or m == 1 and cur == cntm;
    }
    int k;
    if (not islim and ~memo[k = key(i, start, z, cur)]) return memo[k];
    ll res = 0;
    int lim = islim ? num[i] : 9;
    REP(d, 0, lim + 1) {
        res += dp(i + 1, start or d, islim and d == lim, z or start and not d, cur + add[d]);
    }
    if (not islim) memo[k] = res;
    return res;
}

int main() {
    IO;
    REP(d, 1, 10) {
        ll x = d;
        add[d] = pf(x);
    }
    int t; cin in t;
    while (t--) {
        cin in s in m;
        n = s.size();
        REP(i, 0, n) num[i] = s[i] ^ '0';
        cntm = pf(m);
        if (m != 1) cntm = {};
        memo.assign(key(n, 0, 0, {}), -1);
        cout ot dp() nl;
    }
    return 0;
}
```

</details>

**p11**

很白癡的是，這題**在比賽開始前幾分鐘**修改了 $n$ 範圍（我忘記有沒有改時限記憶體了），再加上這題雖然是第 11 題，但英文名稱是 `5D Chess`，造成了好幾組燒雞：
- 修改範圍的 announcement 是在比賽開始前，有人以為他只是 general 的賽前公告就沒看。
- 因為 `5`，所以以為改範圍的是 p5，然後 C-Style Array 開錯大小。
- 因為 `D`，所以以為改範圍的是 p4，然後完全想不通為何要改範圍。

五維偏序問題，但若是用 CDQ 分治又難寫、常數又大。$n \le 10 ^ 5$ 足夠小，因此可以考慮 $\mathcal{O}(\frac{n ^ 2}{64})$ 的 `bitset` 解法。

對五個維度分別排序後，易於雙指標掃描出與當前維度與自己差 $\le k$ 的人，用 `bitset` 把五個維度的結果 `&` 到一起就好了。

餘切的記憶體用量超少，不知道是什麼解。

<details>
  <summary class="border">Solution Code</summary>

```cpp
const int N = 1e5;
using bb = bitset<N>;
int l[5][N], sl[N];
bb bs[N], cur;

void solve() {
    int n; ll k; cin in n in k;
    REP(i, 0, n) REP(r, 0, 5) cin in l[r][i];
    REP(i, 0, n) bs[i].set();
    REP(r, 0, 5) {
        iota(sl, sl + n, 0);
        sort(sl, sl + n, [&](int a, int b) {
            return l[r][a] < l[r][b];
        });
        cur.reset();
        int si = 0, sj = 0;
        REP(x, 0, n) {
            int i = sl[x];
            while (si < x and l[r][sl[si]] + k <  l[r][i]) cur[sl[si++]] = 0;
            while (sj < n and l[r][sl[sj]] - k <= l[r][i]) cur[sl[sj++]] = 1;
            bs[i] &= cur;
        }
    }
    ll ans = 0;
    REP(i, 0, n) ans += bs[i].count();
    cout ot (ans - n) / 2 nl;
}
```

</details>

後面的題目~~賽中根本都沒碰~~，等我哪天心情好再補。

*WIP*

<!-- 
**p**

<details>
  <summary class="border">Solution Code</summary>

```cpp
code
```

</details>
 -->

## 狗針藏分

唐狗針、林宥辰、宋睿軒一組，但宋睿軒要考微積分先修期中考所以沒比 YTP 決賽（我也有報先修，但選擇翹掉期中考，因為聽說通過率低得可憐，而且我想見大家 \:D）。

重點是他們兩個直接開始大藏分，用子題驗正確性，在那邊 `if n >= 2000: print("YTP")`，封板以後直接衝上去，有夠扯的。

## 賽後

吳沛神向人打招呼時雀躍的樣子，總是讓人心情很好。

*（感覺你很有精神呢）*
*（才剛打完五小時的比賽對吧...？）*

{% cimg src=YTPfinal.png w=80% alt="YTP 決賽合照" %}

在 YTP 拍全體合照的時候趁機拍的w。
隨後，簡單聊了幾句就分別了。

{% cimg src=juanjuannopicmeowfuk.png w=50% alt="涓涓一聲不吭跑了去和學弟妹吃飯才在那邊狗叫沒拍到照" %}

涓涓一聲不吭跑了去和學弟妹吃飯才在那邊狗叫沒拍到照 :meowfuk:。

一群人（應該算是 TOI 選訓群）走去搭捷運（leolin 走到一半消失，結果是從地下道 speedrun 了，我們在路上等很久 \:/），搭到北車寄放行李箱，再去吃 [晚餐](https://maps.app.goo.gl/G2TghK59fbffPaFy8)。

因為我們十幾個人，候位了不少時間。

<div style="text-align: left; ">
  {% cimg src=cow.png w=48% alt="壽喜燒牛肉丼" %}
  {% cimg src=pig.png w=48% alt="五花豬炒水蓮" %}
</div>

{% cimg src=sundae.png w=48% alt="對焦到唐狗針" mt=6px %}

稍盤，但不錯吃，有吃飽。

然後是走去 IOI 國手四個人一起訂的飯店，在上去之前他們還去逛了*肌膚露出比例較高*的二次元店{% spoiler （甚至有 18+ 區） %}，leolin 買了一件*十分有尺度*的 T-shirt，~~說是要當成 IOI 隊服~~。我就**默默地低著頭**繞了一圈又一圈（因為裡面冷氣好涼），唐狗針則早就開溜去買飲料。

四位 IOI 國手團訂的飯店房間好大，還真塞得下我們十幾個人。玩 BOTC，但我不太清楚規則，完全處在一個 drunk 的狀態（是這樣用的嗎w），只知道原本以為我的角色很廢，結果提供的資訊意外地多？大家一起推演邏輯超級有那麼一回事的。Brinton 作為上帝出了幾個小包，眾人一致認同 Koukirocks 當天神時都不出差錯很厲害。

然後就是去北車拿行李，回飯店。再出來去便利商店買個顆粒燕麥飲，好喝。
飯店超陽春，但反正只是要洗澡 + 睡一晚，沒差啦w。

# NTUCPCPC 決賽（8/2）

*WIP*

# 成大賽決賽（8/14）

*WIP*

# 交大賽（8/24 ~ 26）

*WIP*
