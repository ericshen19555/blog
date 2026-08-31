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

成大賽的開板很得，是用一隻 AI 進行 RPG，每完成一個關卡就公布一個隊名。但一直被 mocha 越獄，發現他是~~自我認同為 Claude~~ 的 Deepseek，超級好笑。

# YTP 初賽（7/7）

AI 相較於去年變強太多，已經可以單刷破台這種比賽了，因此超級無敵混亂。

~~因為沒有螢幕錄影，我顯然不記得做題順序，所以按照題號講。~~

## 題目

[YTP 2026 題單](https://oj.ntucpc.org/problems/tag/ytp2026)

**p1**

隨便 `bisect` 一下就好了，C++ 應該 $\mathcal{O}(n \cdot q) \approx 10 ^ 7$ 也能過。

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

**p2**

看了很多眼題目敘述，還是不太確定在講甚麼，結果圖片很重要。

打表了一下就做掉了，我是從小到大枚舉答案，因為答案是 $\sqrt{x}$ 量級，但其實可以直接 $\lfloor\sqrt{\frac{x}{\gcd(2036, 4581)}}\rfloor$，因為二次式只有 $x ^ 2$ 項，沒有 $x$ 和常數項。

```python
from math import isqrt
print(isqrt(int(input()) // 509))
```

順帶一提，Python 的 `isqrt(x)` 是**純整數運算**（可以去研究一下他的實作，很快很厲害），而 `floor(x ** 0.5)` 是浮點數運算，又慢又有精度誤差。

**p3**

很純的數學題，把表打一打就會過了，但我也忘記賽中怎麼了，不太會讀題目 ><，總之我們沒做出這題。

以下實作是 $\mathcal{O}(n \ln n + d(n) \log_2 m + \log_2 998244353)$，Python 穩過，應該是最佳解。

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

**p4**

賽中沒碰。

邏輯很單純、實作小多的題。因為每次推只是一行的事，所以從 $6$ 個方向把每一行都掃過一遍就好。

實作上可以設計一台狀態機（以下 `white`, `black`, `cnt` 的部分），就能每次丟進去一個字元（`add`）即可；六邊形遍歷的部分，只要把戳出去的部分好好判掉，就能暴力亂戳，不用嚴格戳在六邊形裡面，實作上簡便許多。

需要注意，因為六邊形輸入格式的關係，斜向遍歷的時候上半和下半移動斜率不一樣，需要公式調整。

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

**p5**

賽中楊寬洋自己把它做掉了。

很典的方格捷徑 DP。

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

**p6**

賽中沒碰。

看到範圍 $n \le 100. k \le 10 ^ 9$，顯然是矩陣快速冪。

把轉移矩陣構造出來，就做完了，算是很板的題。

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

**p7**

封板後做掉。很卡常的題目，糟糕。

因為會被卡常，所以避免使用 `set`、`map`。

以下解法直接在斜角上做，也可以將點 $(x, y)$ 變成 $(x + y, x - y)$，然後直著做，此時 $d$ 要變成 $2d$。

為了省事，可以只算一個方向，並旋轉後再做一次。

小心運算 `x + y - d` 之類的範圍時會 overflow，因此將 `d` 設成 `long long` 可以保證此運算時隱式轉型、不溢出。

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

**p8**

布丁出的非常好題目，[CSES. New Roads Queries](https://cses.fi/problemset/task/2101/) 的小包裝。

先多源 BFS 算出每個點的加入時間，然後就可以用啟發式合併 DSU 建一顆卡巴楚拉重構樹，就能在線詢問了。

此解法實作簡單常數又小，值得學。

也可以砸 $\mathcal{O}(n) - \mathcal{O}(1)$ LCA，那整體就只帶 DSU 的一個 $\alpha$ 了。

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

**表揚布丁很會出題**

<img src="puddingorz.png" style="width: 80%; height: auto; vertical-align: top;" alt="布丁 Orz">

**譴責餘切亂砸怪科技**

<img src="cotnailcare.png" style="width: 50%; height: auto; vertical-align: top;" alt="餘切💅">

## 破台被 DQ

<img src="ipigorz.png" style="width: 50%; height: auto; vertical-align: top;" alt="iPig 教我破台">

<img src="noscoreboardwtf.png" style="width: 75%; height: auto; vertical-align: top; margin-top: 20px;" alt="記分板不見了">

這場真的超級怪。

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
