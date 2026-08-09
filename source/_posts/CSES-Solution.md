---
title: CSES Python 400 全題解
date: 2026-08-09 16:26:41
tags: CSES
---
> 作者：暴力又被TLE

> 進度：[Counting Tilings](#counting-tilings)

## 前言

> 前言顯然要最後寫

*WIP*

## Introductory Problems

### [Weird Algorithm](https://cses.fi/problemset/task/1068)

經典的 [考拉茲猜想](https://zh.wikipedia.org/zh-tw/%E8%80%83%E6%8B%89%E5%85%B9%E7%8C%9C%E6%83%B3)，未解的數學難題之一。

$$
f(n) = \begin{cases} 
\frac{n}{2} & \text{if } n \equiv 0 \pmod{2} \\
3n + 1 & \text{if } n \equiv 1 \pmod{2}
\end{cases}
$$

考拉茲猜想是：所有正整數最終都會達到 $1$。目前電腦已經算到 $2e21$ 都還沒有反例。

在 $n \le 1e6$ 下，有著最高步驟數的是 $837799$，共有 $524$ 個步驟。

總而言之就是直接照著寫就好：

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    ans = [n]
    while n != 1:
        if n & 1:
            n = n * 3 + 1
        else:
            n >>= 1
        ans.append(n)
    print(*ans)
main()
```

推類題：[區間考拉茲操作](https://oj.ntucpc.org/problems/943)，考點是 {% spoiler 分塊 or 線段樹 %}。

### [Missing Number](https://cses.fi/problemset/task/1083)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    s = sum(map(int, e().split()))
    print((n * (n + 1) >> 1) - s)
main()
```

### [Repetitions](https://cses.fi/problemset/task/1069)

```python
from itertools import groupby as g
print(max(len(list(x))for _,x in g(input())))
```

### [Increasing Array](https://cses.fi/problemset/task/1094)

```python
def main():
    from sys import stdin
    from itertools import accumulate, tee
    e = stdin.readline

    e()
    a, b = tee(map(int, e().split()))
    print(sum(map(int.__sub__, accumulate(a, max), b)))
main()
```

### [Permutations](https://cses.fi/problemset/task/1070)

普通的構造，後面有難~~噁心~~的 [Beautiful Permutation II](#beautiful-permutation-ii)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    if n == 1:
        print(1)
    elif n <= 3:
        print("NO SOLUTION")
    else:
        n += 1
        print(range(2, n, 2), range(1, n, 2))
main()
```

### [Number Spiral](https://cses.fi/problemset/task/1071)

```python
def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        i, j = map(int, e().split())
        r = i if i > j else j
        ans.append(r * r - r + 1 + (j - i if r & 1 else i - j))
    print("\n".join(map(str, ans)))
main()
```

### [Two Knights](https://cses.fi/problemset/task/1072)

[OEIS A172132](https://oeis.org/A172132)

```python
def main():
    from sys import stdin
    print("\n".join(str(i * i * (i * i - 1) // 2 - 4 * (i - 1) * (i - 2))
                    for i in range(1, int(stdin.readline()) + 1)))
main()
```

### [Two Sets](https://cses.fi/problemset/task/1092)

$1 \sim n$ 的總和是 $\frac{n \times (n + 1)}{2}$，還要分成兩半所以 $n$ 和 $n+1$ 需要至少有一個是 $4$ 的倍數，否則無解。

有解的情況下可以從大往小貪心，這是老梗。

```python
def main():
    n = int(input())
    if n & 3 and (n + 1) & 3:
        print("NO")
    else:
        a, b = [], []
        t = n * (n + 1) >> 2
        for v in range(n, 0, -1):
            if v <= t:
                a.append(v)
                t -= v
            else:
                b.append(v)
        print("YES")
        print(len(a))
        print(*a)
        print(len(b))
        print(*b)
main()
```

### [Bit Strings](https://cses.fi/problemset/task/1617)

Python 的 `pow` 是 $\mathcal{O}(\log_2 n)$ 快速冪，`**` 則是線性 $\mathcal{O}(n)$。

```python
print(pow(2, int(input()), 10**9 + 7))
```

### [Trailing Zeros](https://cses.fi/problemset/task/1618)

```python
n = int(input())
ans = 0
x = 5
while x <= n:
    ans += n // x
    x *= 5
print(ans)
```

### [Coin Piles](https://cses.fi/problemset/task/1754)

```python
def main():
    from sys import stdin
    stdin.readline()

    for e in stdin:
        a, b = map(int, e.split())
        print("NO" if (a + b) % 3 or a << 1 < b or b << 1 < a else "YES")
main()
```

### [Palindrome Reorder](https://cses.fi/problemset/task/1755)

最多只能有一種字母數量為奇數，把多的那個擺中間，否則無解。

```python
from collections import Counter

cnt = Counter(input())
if sum(1 for c in cnt.values() if c & 1) > 1:
    print("NO SOLUTION")
else:
    for k, v in cnt.items():
        print(k * (v >> 1), end='')
    print(next((k for k, v in cnt.items() if v & 1), ""), end='')
    for k, v in reversed(tuple(cnt.items())):
        print(k * (v >> 1), end='')
```

### [Gray Code](https://cses.fi/problemset/task/2205)

神奇的二進位構造。

```python
n = int(input())
print("\n".join(f"{i ^ (i >> 1):0{n}b}" for i in range(1 << n)))
```

### [Tower of Hanoi](https://cses.fi/problemset/task/2165)

經典的遞迴。

```python
def dfs(n, a, b, c):
    if n == 0: return
    dfs(n - 1, a, c, b)
    print(a, c)
    dfs(n - 1, b, a, c)

n = int(input())
print((1 << n) - 1)
dfs(n, 1, 2, 3)
```

也可以把遞迴樹畫出來，觀察節點在二進位表示下的規律，寫出神奇的 bit-manipulation 解法：

```python
n = int(input())
ans = []
a, b = 1, 2 + (n & 1)
ctz = lambda x: (x & -x).bit_length() - 1
print((1 << n) - 1)
for i in range(1, 1 << n):
    print(a, b)
    x = ~ctz(i + (i & 1)) & 1
    if x | i & 1 ^ 1: a ^= b
    if x | i & 1: b ^= a
```

### [Creating Strings](https://cses.fi/problemset/task/1622)

```python
from itertools import permutations
ans = sorted(set(map("".join, permutations(input()))))
print(len(ans))
print("\n".join(ans))
```

### [Apple Division](https://cses.fi/problemset/task/1623)

因為還只是 Introductory 所以預期解是 $\mathcal{O}(2 ^ n)$ 的枚舉，但可以 meet in middle + 二分搜達到 $\mathcal{O}(2 ^ \frac{n}{2} \log_2 n)$。

```python
def main():
    from sys import stdin
    from itertools import islice
    from bisect import bisect_left
    e = stdin.readline

    n = int(e())
    l = map(int, e().split())
    le = n >> 1; ri = n - le
    sub1 = [0]
    for v in islice(l, le):
        for x in islice(sub1, len(sub1)):
            sub1.append(x + v)
    sub2 = [0]
    for v in l:
        for x in islice(sub2, len(sub2)):
            sub2.append(x + v)
    s = sub1[-1] + sub2[-1]; t = s >> 1
    sub2.sort()
    ans = float("INF")
    for v in sub1:
        i = bisect_left(sub2, t - v)
        if i < (1 << ri): ans = min(ans, abs(2 * (v + sub2[i]) - s))
        i += 1
        if i < (1 << ri): ans = min(ans, abs(2 * (v + sub2[i]) - s))
    print(ans)
main()
```

### [Chessboard and Queens](https://cses.fi/problemset/task/1624)

每次 $\mathcal{O}(n ^ 2)$ 複製一張新的表，遞迴下去。

```python
def dfs(l):
    if not l: return 1
    res = 0
    for i, v in enumerate(l[0]):
        if not v: continue
        l_ = [row[:] for row in l[1:]]
        for j, row in enumerate(l_, 1):
            row[i] = False
            if i - j >= 0: row[i - j] = False
            if i + j <  8: row[i + j] = False
        res += dfs(l_)
    return res

l = [[v == "." for v in input().rstrip()] for _ in range(8)]
print(dfs(l))
```

若是全局共用一個 `l`，並且好好實作 undo，可以壓掉複製的 $\mathcal{O}(n)$ 開銷，只留用於標記的 $\mathcal{O}(n)$ 時間。

也可以全局共用三個陣列：`col`, `di1`, `di2` 分別記錄 column、以及兩條對角線上是否已經有放皇后，如此就能將複雜度壓掉 $\mathcal{O}(n ^ 2)$。

```python
n = 8

col = [0] * n
di1 = [0] * (n << 1)
di2 = [0] * (n << 1)

def dfs(i):
    if i == n: return 1
    res = 0
    for j, v in enumerate(l[i]):
        if v or col[j] or di1[i + j] or di2[i - j]: continue
        col[j] += 1; di1[i + j] += 1; di2[i - j] += 1
        res += dfs(i + 1)
        col[j] -= 1; di1[i + j] -= 1; di2[i - j] -= 1
    return res

l = [[v == "*" for v in input().rstrip()] for _ in range(n)]
print(dfs(0))
```

### [Raab Game I](https://cses.fi/problemset/task/3399)

```python
def main():
    from sys import stdin
    e = stdin.readline

    for _ in range(int(e())):
        n, a, b = map(int, e().split())
        m = a + b
        if n < m or (a == 0) != (b == 0):
            print("NO")
            continue
        print("YES")
        print(*range(1, m + 1), *range(m + 1, n + 1))
        print(*range(m - b + 1, m + 1), *range(1, a + 1), *range(m + 1, n + 1))
main()
```

### [Mex Grid Construction](https://cses.fi/problemset/task/3419)

這個構造挺有趣的，看起來很難但 xor 是魔法。

```python
n = int(input())
print("\n".join(" ".join(str(i ^ j) for j in range(n)) for i in range(n)))
```

### [Knight Moves Grid](https://cses.fi/problemset/task/3217)

一般的 BFS。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    area = n * n
    ans = [[None] * n for _ in range(n)]
    ans[0][0] = 0
    q = [None] * area
    q[0] = (0, 0)
    qi = 1
    d = ((1, 2), (2, 1), (1, -2), (-2, 1), (-1, 2), (2, -1), (-1, -2), (-2, -1))
    for i, j in q:
        nv = ans[i][j] + 1
        for ni, nj in d:
            ni += i; nj += j
            if not 0 <= ni < n or not 0 <= nj < n: continue
            if ans[ni][nj] is not None: continue
            ans[ni][nj] = nv
            q[qi] = (ni, nj)
            qi += 1
            if qi == area: break
        else: continue
        break
    print("\n".join(" ".join(map(str, row)) for row in ans))
main()
```

### [Grid Coloring I](https://cses.fi/problemset/task/3311)

允許 $4$ 種顏色。若是貪心地由左到右、由上到下填，則每個格子至多被「禁止」$3$ 種顏色，因此必然能填完。

實際上能只用 $3$ 種顏色，這題很有趣：[Grid Coloring II](#grid-coloring-ii)

```python
def main():
    from sys import stdin
    e = stdin.readline
    ord = dict(zip("ABCD", (0b1110, 0b1101, 0b1011, 0b0111))).__getitem__
    chr = " AB C   D".__getitem__

    m, n = map(int, e().split())
    pre = [15] * n
    ans = [None] * n
    for s in stdin:
        le = 15
        for i, (up, mask) in enumerate(zip(pre, map(ord, s))):
            cur = le & up & mask
            cur &= -cur
            ans[i] = chr(cur)
            le = pre[i] = cur ^ 15
        print("".join(ans))
main()
```

### [Digit Queries](https://cses.fi/problemset/task/2431)

不難在 $\mathcal{O}(\log_{10} n)$ 內用一點點小數學算出來。

```python
def main():
    from sys import stdin
    stdin.readline()  # q
    base = 10
    for n in map(int, stdin):
        a, b = 1, base
        lim = a * b
        while n >= lim:
            n += b
            a += 1
            b *= base
            lim = a * b
        q, r = divmod(n, a)
        print(str(q)[r])
main()
```

### [String Reorder](https://cses.fi/problemset/task/1743)

這題算是挺麻煩的貪心，$n = 1e6$ 又讓 $\mathcal{O}(26n)$ 的 Python 很難過。

邏輯上，首先要維持最大頻率 $c \times 2 \le n + 1$，這樣才能保證「相鄰字元不相等」，否則取字典序最小且跟前一個相異的字元即可。

這樣的邏輯易於寫出以下的 $\mathcal{O}(26n)$ 程式碼，然而題解放的是 $\mathcal{O}(26 ^ 2 n)$，完全不懂...

如果用 `str` 或 `list[str]` 操作認真不好 AC，可以轉換成 `bytearray` 壓常，就能輕鬆過了（甚至 $\mathcal{O}(26 ^ 2 n)$ 都能隨便過）。

```python
def main():
    A = 65
    s = input().encode()
    n = len(s)
    cnt = [0] * 26
    for c in s:
        cnt[c - A] += 1
    get = cnt.__getitem__

    if max(cnt) * 2 > n + 1:
        return print(-1)

    ans = bytearray(n)
    pc = -1
    for i in range(n):
        mi = max(range(26), key=get)
        mv = cnt[mi]
        if mv * 2 > n - i:
            c = mi
        else:
            for c in range(26):
                if c != pc and cnt[c]:
                    break
        ans[i] = A + c
        cnt[c] -= 1
        pc = c
    print(ans.decode())
main()
```

### [Grid Path Description](https://cses.fi/problemset/task/1625)

*WIP*

```python
with open(r"grid_path.txt", "r") as file:
    path = file.read()

from base64 import b64decode

path = [int.from_bytes(b64decode(cur), "big") for cur in path.split()]

# s = input()
s = "?" * 48

t = dict(zip("?UDLR", ("1111", "0001", "0010", "0100", "1000"))).__getitem__
s = int("".join(map(t, s)), 2)

print(sum(1 for mask in path if (mask & s) == mask))


##############################################################
##############################################################
##############################################################

# preprocess
n = 7
end = n * n - 1
d = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}

s = "?" * 48

path = []
cur = []

def dfs(p, i, j):
    if i == n-1 and j == 0:
        if p != end:
            return 0
        path.append("".join(cur))
        return 1
    if end - p < n-1 - i + j:
        return 0
    if not vis[i - 1][j] and not vis[i + 1][j] and vis[i][j - 1] and vis[i][j + 1]:
        return 0
    if vis[i - 1][j] and vis[i + 1][j] and not vis[i][j - 1] and not vis[i][j + 1]:
        return 0
    if vis[i + 1][j + 1] and not vis[i + 1][j] and not vis[i][j + 1]:
        return 0
    if vis[i - 1][j + 1] and not vis[i - 1][j] and not vis[i][j + 1]:
        return 0
    if vis[i + 1][j - 1] and not vis[i + 1][j] and not vis[i][j - 1]:
        return 0
    vis[i][j] = True
    res = 0
    for k in (d.keys() if s[p] == "?" else (s[p],)):
        ni, nj = d[k]
        ni += i; nj += j
        if not vis[ni][nj]:
            cur.append(k)
            res += dfs(p + 1, ni, nj)
            cur.pop()
    vis[i][j] = False
    return res
vis = [[False] * n + [True] for _ in range(n)] + [[True] * (n + 1)]
print(dfs(0, 0, 0))

from base64 import b64encode, b64decode

with open("grid_path.txt", "w") as file:
    file.write(" ".join(path))

t = dict(zip("?UDLR", ("1111", "0001", "0010", "0100", "1000"))).__getitem__
bl = 4 * end >> 3

path = [str(b64encode(int("".join(map(t, cur)), 2).to_bytes(bl, "big")))[2:-1] for cur in path]
s = " ".join(path)
with open("grid_path_64.txt", "w") as file:
    file.write(s)
```

## Sorting and Searching

### [Distinct Numbers](https://cses.fi/problemset/task/1621)

先 sort 再丟進 set 能跑比較快。

```python
input()
print(len(set(sorted(map(int, input().split())))))
```

### [Apartments](https://cses.fi/problemset/task/1084)

貪心地從小的開始，$\mathcal{O}(n)$ 用雙指標配對。

```python
def main():
    from sys import stdin
    inf = float("INF")
    e = stdin.readline

    n, m, k = map(int, e().split())
    a = sorted(map(int, e().split()))
    b = sorted(map(int, e().split()))
    it = iter(b)
    j = next(it)
    ans = 0
    for i in a:
        while j < i - k:
            j = next(it, inf)
        if j is inf: break
        if j <= i + k:
            ans += 1
            j = next(it, inf)
            if j is inf: break
    print(ans)
main()
```

### [Ferris Wheel](https://cses.fi/problemset/task/1090)

最大的配最小的比較可能配對成功，頭尾雙指標，$\mathcal{O}(n)$ 配對。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = sorted(map(int, e().split()))
    ans = n
    j = n - 1
    for i, v in enumerate(l):
        while i < j and v + l[j] > k:
            j -= 1
        if i >= j: continue
        ans -= 1
        j -= 1
    print(ans)
main()
```

### [Concert Tickets](https://cses.fi/problemset/task/1091)

> 學會這題以後可以前往 [Movie Festival II](#movie-festival-ii) 獲得雙倍經驗！

Python 沒有內建有序資料結構，可以用值域 BIT 替代，或者用手刻分塊的 `SortedList`：

```python
def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    n, m = map(int, e().split())
    s = int(n ** 0.5)
    l = sorted(map(int, e().split()))
    sl = []
    for i in range(0, n, s):
        sl.append(l[i:i+s])
    if i + s < n:
        sl.append(l[i+s:])
    mn = [b[0] for b in sl]
    ans = []
    for v in map(int, e().split()):
        i = bisect_right(mn, v) - 1
        if i == -1:
            ans.append(-1)
            continue
        b = sl[i]
        j = bisect_right(b, v) - 1
        if j == -1:
            ans.append(-1)
            continue
        ans.append(b[j])
        del b[j]
        if not b:
            del sl[i]
            del mn[i]
        elif j == 0:
            mn[i] = b[0]
    print("\n".join(map(str, ans)))
main()
```

仔細一想發現根本沒必要吃毒啊！

歸約為給一個集合，每次：
- 查詢 $\lt x$ 最大值
- 把他刪掉

第一個操作顯然很二分搜，而第二個操作則可以用 DSU 快速找，而因為是單向找，所以純路壓的 DSU 更好寫。

```python
# Binary Search + Path Compression DSU - O(n log n)

def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    n, q = map(int, e().split())
    l = sorted(map(int, e().split()))
    nxt = list(range(n + 1))
    ans = []
    for v in map(int, e().split()):
        i = bisect_right(l, v)
        while i and i != nxt[i]:
            nxt[i] = i = nxt[nxt[i]]
        if not i: ans.append(-1)
        else:
            ans.append(l[i - 1])
            nxt[i] = i - 1
    print(*ans, sep="\n")
main()
```

### [Restaurant Customers](https://cses.fi/problemset/task/1619)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    s, t = [0] * n, [0] * n
    for i in range(n):
        s[i], t[i] = map(int, e().split())
    s.sort(), t.sort()
    s, t = iter(s), iter(t)
    i, j = next(s), next(t)
    ans = cur = 0
    while i is not None and j is not None:
        if i < j:
            i = next(s, None)
            cur += 1
            if cur > ans: ans = cur
        else:
            j = next(t, None)
            cur -= 1
    print(ans)
main()
```

### [Movie Festival](https://cses.fi/problemset/task/1629)

經典貪心：拿結束時間最早的。

```python
def main():
    from sys import stdin
    from operator import itemgetter
    e = stdin.readline

    n = int(e())
    l = [tuple(map(int, e().split())) for _ in range(n)]
    l.sort(key=itemgetter(1))

    ans = pre = 0
    for s, t in l:
        if pre <= s:
            ans += 1
            pre = t
    print(ans)
main()
```

### [Sum of Two Values](https://cses.fi/problemset/task/1640)

最自然的想法肯定是用 hash table，然而 test #22 被奇怪的人卡了 hash，PyPy 直接用 `dict` 會直接撞爛 TLE：

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    mp = {v: i for i, v in enumerate(l)}
    for i, v in enumerate(l):
        if v >= k: continue
        j = mp.get(k - v)
        if j is None or j == i: continue
        print(i + 1, j + 1)
        break
    else:
        print("IMPOSSIBLE")
main()
```

把加入的順序 shuffle 也沒用。

此時最「正確」的做法是用 $\mathcal{O}(n \log_2 n)$ 的排序後二分搜（~~標題回收~~）：

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline
 
    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    sl = sorted(l)
    for i, v in enumerate(sl):
        if (v << 1) > k:
            print("IMPOSSIBLE")
            return
        j = bisect_left(sl, k - v, lo=i + 1)
        if j < n and sl[j] + v == k: break
    else:
        print("IMPOSSIBLE")
        return
    i = l.index(v)
    print(i + 1, l.index(k - v, i + 1 if v << 1 == k else 0) + 1)
main()
```

然而有很簡單的應對方法：「加鹽」：

```python
def main():
    from sys import stdin
    from random import getrandbits
    salt = getrandbits(30)
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    mp = {v ^ salt: i for i, v in enumerate(l)}
    for i, v in enumerate(l):
        if v >= k: continue
        j = mp.get((k - v) ^ salt)
        if j is None or j == i: continue
        print(i + 1, j + 1)
        break
    else:
        print("IMPOSSIBLE")
main()
```

記得 `salt` 一定要 `random`，不要做死玩梗用甚麼 `114514` 或 `1919810`，否則仍然是確定性，很容易被針對 hack。

令人十分意料之外的是，原本的程式碼傳 CPython 就過了。不是啊？PyPy 和 CPython 的邏輯實作不是應該一樣嗎？

實際上 PyPy 在 collision 發生時的尋址 [寫錯了](https://github.com/pypy/pypy/issues/3724#issuecomment-1872105847)，導致他們跳的 index 會不一樣，而使 CPython 倖免於難。

所以 CPython 和 PyPy 基本上應該很難同時 hack，如果被卡了可以換語言交一下試試看w

### [Maximum Subarray Sum](https://cses.fi/problemset/task/1643)

裸卡丹。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()
    ans = float("-INF")
    dp = 0
    for v in map(int, e().split()):
        dp += v
        if dp > ans: ans = dp
        if dp < 0: dp = 0
    print(ans)
main()
```

### [Stick Lengths](https://cses.fi/problemset/task/1074)

最小化 $\sum |a_i - x|$，$x$ 取 $a$ 中位數。

理論上可以用選擇演算法（如 C++ 的 `nth_element`）做到常數稍大的 $\mathcal{O}(n)$。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = sorted(map(int, e().split()))
    mid = l[n >> 1]
    print(sum(abs(v - mid) for v in l))
main()
```

### [Missing Coin Sum](https://cses.fi/problemset/task/2183)

貪心地從小的開始，類似**數學歸納法**地向後推。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()  # n
    ans = 1
    for v in sorted(map(int, e().split())):
        if ans < v:
            break
        ans += v
    print(ans)
main()
```

### [Collecting Numbers](https://cses.fi/problemset/task/2216)

```python
def main():
    from sys import stdin
    from itertools import pairwise, starmap
    from operator import gt
    e = stdin.readline

    l = [0] * int(e())
    for i, v in enumerate(map(int, e().split())):
        l[v-1] = i
    print(1 + sum(starmap(gt, pairwise(l))))
main()
```

### [Collecting Numbers II](https://cses.fi/problemset/task/2217)

直接計算「變化量」不好算，可以把要交換的兩點「拔掉」，再「加入」。

```python
def main():
    from sys import stdin
    from itertools import pairwise, starmap
    from operator import gt
    e = stdin.readline

    n, m = map(int, e().split())
    l = list(map(int, e().split()))
    p = [n] * (n + 2)
    for i, v in enumerate(l):
        p[v] = i
    res = sum(starmap(gt, pairwise(p)))
    ans = []
    for _ in range(m):
        i, j = map(int, e().split())
        i, j = i - 1, j - 1
        l[i], l[j] = l[j], l[i]
        i, j = l[i], l[j]
        if i > j: i, j = j, i
        res -= (p[i - 1] > p[i]) + (p[i] > p[i + 1]) + (p[j] > p[j + 1])
        if i + 1 != j: res -= (p[j - 1] > p[j])
        p[i], p[j] = p[j], p[i]
        res += (p[i - 1] > p[i]) + (p[i] > p[i + 1]) + (p[j] > p[j + 1])
        if i + 1 != j: res += (p[j - 1] > p[j])
        ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Playlist](https://cses.fi/problemset/task/1141)

普通的滑窗，而以下是種特別的「符合條件的最長區間」寫法，在符合條件時保持左端點不動以延長，否則整體右移而不縮短，最終窗戶長度就會是答案。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()
    l = list(map(int, e().split()))
    d = dict.fromkeys(l, 0)
    ans = cur = 0
    for i, v in enumerate(l):
        c = d[v]
        cur += (c == 0) - (c == 1)
        d[v] += 1
        if ans < cur:
            ans += 1
        else:
            v = l[i - ans]
            d[v] -= 1
            c = d[v]
            cur -= (c == 0) - (c == 1)
    print(ans)
main()
```

### [Towers](https://cses.fi/problemset/task/1073)

裸 LIS。

```python
def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    e()
    lis = [0]
    for v in map(int, e().split()):
        if v >= lis[-1]:
            lis.append(v)
        else:
            lis[bisect_right(lis, v)] = v
    print(len(lis) - 1)
main()
```

### [Traffic Lights](https://cses.fi/problemset/task/1163)

顯然可以用 DSU 解，然而ㄌㄌ（linked list）更快。在這種一維、**保證只操作端點**的題目，就能直接用ㄌㄌ，但若是題目會戳已經合併完的塊中間則需要用 DSU。

因為每次會給**準確的端點 index**，因此可以用 xor ㄌㄌ（每個節點存 `prev ^ next`），省下一半的空間。

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    m, n = map(int, e().split())
    l = list(map(int, e().split()))
    p = sorted(l) + [m]
    pv = 0
    val = [0] * (n + 1)
    xorll = [0] * (n + 1)
    for i, v in enumerate(p):
        val[i] = v - pv
        pv = v
    cur = max(val)
    ans = []
    for v in reversed(l):
        ans.append(cur)
        i = bisect_left(p, v)
        i, j = xorll[i] ^ i, xorll[i + 1] ^ (i + 1)
        xorll[i] = xorll[j] = i ^ j
        val[i] = val[j] = val[i] + val[j]
        cur = max(cur, val[i])
    print(" ".join(map(str, reversed(ans))))
main()
```

### [Distinct Values Subarrays](https://cses.fi/problemset/task/3420)

普通滑窗，好好計數即可。

```python
def main():
    from sys import stdin
    from itertools import tee
    e = stdin.readline

    e()
    l, p = tee(map(int, e().split()))
    nxt = p.__next__
    u = set()
    ans = cur = 0
    for v in l:
        if v in u:
            while (p := nxt()) != v:
                u.remove(p)
                cur -= 1
        else:
            cur += 1
            u.add(v)
        ans += cur
    print(ans)
main()
```

### [Distinct Values Subsequences](https://cses.fi/problemset/task/3421)

```python
def main():
    from sys import stdin
    from functools import reduce
    e = stdin.readline
    mod = 10**9 + 7
    mul = lambda a, b: a * b % mod

    e()
    c = {}
    for v in map(int, e().split()):
        c[v] = c.get(v, 1) + 1
    print((reduce(mul, c.values()) - 1) % mod)
main()
```

### [Josephus Problem I](https://cses.fi/problemset/task/2162), [Josephus Problem II](https://cses.fi/problemset/task/2163)

Python 連 RBT 都沒有，哪來的平板電視？

BIT 上二分搜，每個位置上維護「這人是否還存在」。

```python
def main():
    n, m = map(int, input().split())
    m += 1
    ans = []

    # build BIT
    bit = [i & -i for i in range(n + 1)]
    # n's highest bit
    hb = 1 << n.bit_length() - 1

    target = 0
    for r in range(n, 0, -1):
        # update bisect target
        target = (target + m - 1) % r
        # bisect_right for target on BIT
        b = hb
        i = v = 0
        while b > 0:
            if (_i := i + b) <= n and (_v := v + bit[_i]) <= target:
                i, v = _i, _v
            b >>= 1
        # add to answer
        ans.append(i + 1)
        # update BIT
        i += 1  # 0-based to 1-based
        while i <= n:
            bit[i] -= 1
            i += i & -i
    print(*ans)
main()
```

*WIP*：bitset 優化 $\mathcal{O}(n \log_2 \frac{n}{64})$

### [Nested Ranges Check](https://cses.fi/problemset/task/2168)

好好排序一下就能 $\mathcal{O}(n)$ 做掉了。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    le, ri = [0] * n, [0] * n
    for i in range(n):
        le[i], ri[i] = map(int, e().split())
    l = sorted(range(n), key=lambda i: (le[i], -ri[i]))
    lo = float("INF")
    ans = [0] * n
    for i in reversed(l):
        b = ri[i]
        ans[i] = 1 if lo <= b else 0
        if b < lo: lo = b
    print(*ans)
    hi = 0
    for i in l:
        b = ri[i]
        ans[i] = 1 if b <= hi else 0
        if b > hi: hi = b
    print(*ans)
main()
```

### [Nested Ranges Count](https://cses.fi/problemset/task/2169)

可以歸約為二維偏序問題，好好排序以後用 BIT 維護動態前綴和。

然而這題使用 Python 並不好過，因為要用 BIT 就需要先離散化，而這部分容易被卡常，因此在~~手刻 Radix Sort~~ 拿下 C++ Top Coder 以後，翻譯成 Python 就過了。（實際上因為我很不會處理函數、反函數的映射關係，為了在 Radix Sort 途中直接倒序排序、以少跑一 run 而吃盡苦頭，Debug 到凌晨才寫對。）

不難發現 Top Coder 已經不是我了，因為 tsunnami 是屁孩，整天偷別人解法隨便亂優化一下刷掉別人紀錄，還不 credit 一下參考了誰的解法，甚至用通用技巧無腦壓字元數刷榜，毫無技術可言的小學生，之後的題目還會一直看到他。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    a = [0] * n
    b = [0] * n
    for i in range(n):
        a[i], b[i] = map(int, e().split())

    siz = 1 << 15
    l = [0] * n
    s = [0] * n
    p = [0] * n
    c = [0] * siz
    for i in range(n): c[b[i] & 32767] += 1
    for i in range(1, siz): c[i] += c[i - 1]
    for i in range(n - 1, -1, -1):
        x = b[i] & 32767
        c[x] -= 1
        p[c[x]] = i
    c = [0] * siz
    for i in range(n): c[b[p[i]] >> 15] += 1
    for i in range(1, siz): c[i] += c[i - 1]
    for i in range(n - 1, -1, -1):
        x = b[p[i]] >> 15
        c[x] -= 1
        l[~c[x]] = p[i]
    pre = 0
    for i in range(n):
        cur = b[l[i]]
        s[l[i]] = s[l[i - 1]] if pre == cur else i
        pre = cur
    c = [0] * siz
    for i in range(n): c[a[l[i]] & 32767] += 1
    for i in range(1, siz): c[i] += c[i - 1]
    for i in range(n - 1, -1, -1):
        x = a[l[i]] & 32767
        c[x] -= 1
        p[c[x]] = l[i]
    c = [0] * siz
    for i in range(n): c[a[p[i]] >> 15] += 1
    for i in range(1, siz): c[i] += c[i - 1]
    for i in range(n - 1, -1, -1):
        x = a[p[i]] >> 15
        c[x] -= 1
        l[c[x]] = p[i]

    ans = [0] * n
    bit = [0] * (n + 1)
    for i in range(n-1, -1, -1):
        i = l[i]
        x = v = n - s[i]
        res = 0
        while x:
            res += bit[x]
            x &= x - 1
        ans[i] = res
        x = v
        while x <= n:
            bit[x] += 1
            x += x & -x
    print(*ans)
    bit = [0] * (n + 1)
    for i in range(n):
        i = l[i]
        x = v = s[i] + 1
        res = 0
        while x:
            res += bit[x]
            x &= x - 1
        ans[i] = res
        x = v
        while x <= n:
            bit[x] += 1
            x += x & -x
    print(*ans)
main()
```

### [Room Allocation](https://cses.fi/problemset/task/1164)

將所有事件依照時間為第一關鍵字、「進、出」為第二關鍵字排序，可以寫出很漂亮的解法。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = []
    for i in range(n):
        a, b = map(int, e().split())
        l.append((a << 1 | 0) << 20 | i)
        l.append((b << 1 | 1) << 20 | i)
    l.sort()
    stk = []
    res = 0
    ans = [0] * n
    for v in l:
        v, i = v >> 20, v & 0xfffff
        if v & 1:
            stk.append(ans[i])
        elif stk:
            ans[i] = stk.pop()
        else:
            res += 1
            ans[i] = res
    print(res)
    print(*ans)
main()
```

### [Factory Machines](https://cses.fi/problemset/task/1620)

經典對答案二分搜，Python 的 `bisect` 可以對所有 `Sequence` 泛型進行二分搜，即所有有 `__getitem__` 與 `__len__` member function 的型別，只是 `bisect(key=...)` 這個 parameter 在較新版本才出現，使用時須要注意版本問題。

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    def check(x):
        return sum(x // v for v in l) >= k

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    print(bisect_left(
        range(max(l) * ((k - 1) // n + 1)),
        True,
        key=check
    ))
main()
```

### [Tasks and Deadlines](https://cses.fi/problemset/task/1630)

經典貪心。

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n = int(e())
    ans = 0
    l = [0] * n
    for i in range(n):
        l[i], d = map(int, e().split())
        ans += d
    l.sort()
    print(ans - sum(accumulate(l)))
main()
```

### [Reading Books](https://cses.fi/problemset/task/1631)

有點神奇的貪心，不難由程式碼直接閱讀出結論。

首先找到耗時最久的一本書 $M$、其餘書的耗時總和為 $S$。A 先閱讀 $M$、B 先閱讀 $S$，若是 $M \ge S$，**則 B 需要等 A 讀完才能讀 $M$**，答案為 $2M$；若是 $M \le S$，則總時間為 $M + S$，因此可得下式。

簡而言之：耗時最久的一本書會變成瓶頸。

```python
input()
l = list(map(int, input().split()))
print(max(2 * max(l), sum(l)))
```

### [Sum of Three Values](https://cses.fi/problemset/task/1641)

經典排序以後雙指標，總共 $\mathcal{O}(n ^ 2)$。

```python
def main():
    from sys import stdin
    from operator import itemgetter
    e = stdin.readline

    n, x = map(int, e().split())
    l = sorted(enumerate(map(int, e().split()), start=1), key=itemgetter(1))
    for k in range(2, n):
        t = x - l[k][1]
        if t < 2: continue
        i, j = 0, k - 1
        while i < j:
            cur = l[i][1] + l[j][1]
            if cur == t:
                print(l[i][0], l[j][0], l[k][0])
                return
            elif cur > t:
                j -= 1
            else:
                i += 1
    print("IMPOSSIBLE")
main()
```

### [Sum of Four Values](https://cses.fi/problemset/task/1642)

經典建表出 $C(n, 2)$ 的和，使用 Hash Table $\mathcal{O}(1)$ 配對。

`product` 的那個迴圈看起來是 $\mathcal{O}(n ^ 2)$，但實際上 `continue` 的次數是常數次，所以他是好的。

```python
def main():
    from sys import stdin
    from collections import defaultdict
    from itertools import product
    e = stdin.readline

    n, t = map(int, e().split())
    l = list(map(int, e().split()))
    mp = defaultdict(list)
    for i in range(1, n):
        for j in range(i):
            mp[l[i] + l[j]].append((j, i))
    for s, self in mp.items():
        if (s << 1) > t: continue
        if (other := mp.get(t - s)) is None: continue
        for (a, b), (c, d) in product(self, other):
            if a == c or a == d: continue
            if b == c or b == d: continue
            print(a + 1, b + 1, c + 1, d + 1)
            return
    print("IMPOSSIBLE")
main()
```

### [Nearest Smaller Values](https://cses.fi/problemset/task/1645)

因為 top 會高頻率存取，使用變數維護 top，而非放在 Stack 裡面，可以壓常。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()
    stk = []
    pi = pv = 0
    ans = []
    for i, v in enumerate(map(int, e().split()), start=1):
        while pv >= v:
            pi, pv = stk.pop()
        ans.append(pi)
        stk.append((pi, pv))
        pi, pv = i, v
    print(*ans)
main()
```

### [Subarray Sums I](https://cses.fi/problemset/task/1660)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n, k = map(int, e().split())
    pre = [0]
    ans = j = 0
    for i, p in enumerate(accumulate(map(int, e().split()))):
        if p >= k:
            t = p - k
            while j <= i and pre[j] < t:
                j += 1
            ans += j <= i and pre[j] == t
        pre.append(p)
    print(ans)
main()
```

### [Subarray Sums II](https://cses.fi/problemset/task/1661)

因為前綴和不再嚴格遞增，需要用 Hash Table 動態配對。

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n, k = map(int, e().split())
    pre = list(accumulate(map(int, e().split()), initial=0))
    cnt = dict.fromkeys(pre, 0)
    ans = 0
    for p in pre:
        ans += cnt.get(p - k, 0)
        cnt[p] += 1
    print(ans)
main()
```

### [Subarray Divisibility](https://cses.fi/problemset/task/1662)

推自己出的類題：[KICK BACK](https://apcs-simulation.com/problem/apcs2203)，我對這題非常滿意，尤其是題述。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    cnt = [0] * n
    cnt[0] = 1
    ans = pre = 0
    for v in map(int, e().split()):
        pre = (pre + v) % n
        ans += cnt[pre]
        cnt[pre] += 1
    print(ans)
main()
```

### [Distinct Values Subarrays II](https://cses.fi/problemset/task/2428)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    cnt = dict.fromkeys(l, 0)
    ans = typ = cur = 0
    nxt = iter(l).__next__
    for v in l:
        typ += (cnt[v] == 0)
        cnt[v] += 1
        cur += 1
        while typ > k:
            p = nxt()
            cnt[p] -= 1
            typ -= (cnt[p] == 0)
            cur -= 1
        ans += cur
    print(ans)
main()
```

### [Array Division](https://cses.fi/problemset/task/1085)

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    def check(x):
        cur = 0
        r = k
        for v in l:
            cur += v
            if cur > x:
                cur = v
                r -= 1
                if not r:
                    return False
        return True

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    print(bisect_left(
        range(sum(l)),
        True,
        lo=max(l),
        key=check
    ))
main()
```

### [Movie Festival II](https://cses.fi/problemset/task/1632)

觀察我們需要的操作：
- 新增一個數字 $x$
- 查詢 $\lt x$ 的最大值，將其刪除

單看這倆操作似乎是 [Concert Tickets](#concert-tickets) 的動態版，於是官解不負眾望地用了 `multiset`。

然而這題有一個關鍵的性質：**每次新增的 $x$ 非嚴格遞增**。

因此操作一直接 `append`，然後就變成 [Concert Tickets](#concert-tickets) 了！

```python
# Binary Search + Path Compression DSU - O(n log n)

def main():
    from sys import stdin
    from operator import itemgetter
    from bisect import bisect_right
    e = stdin.readline

    n, k = map(int, e().split())
    l = [tuple(map(int, e().split())) for _ in range(n)]
    l.sort(key=itemgetter(1))
    ans = 0
    end = []
    nxt = list(range(n + 1))
    for s, t in l:
        i = bisect_right(end, s)
        while nxt[i] != i:
            nxt[i] = i = nxt[nxt[i]]

        if i: nxt[i] -= 1
        elif k: k -= 1
        else: continue

        end.append(t)
        ans += 1
    print(ans)
main()
```

### [Maximum Subarray Sum II](https://cses.fi/problemset/task/1644)

```python
def main():
    from sys import stdin
    from collections import deque
    e = stdin.readline

    n, lo, hi = map(int, e().split())
    ans = float("-INF")
    q, qq = deque(), deque([0])
    p = 0
    for i, v in enumerate(map(int, e().split()), start=1):
        if i > hi and q and q[0][0] < i - hi:
            q.popleft()
        p += v
        if i >= lo:
            pi, pp = i - lo, qq.popleft()
            while q and q[-1][1] >= pp:
                q.pop()
            q.append((pi, pp))
            ans = max(ans, p - q[0][1])
        qq.append(p)
    print(ans)
main()
```

## Dynamic Programming

### [Dice Combinations](https://cses.fi/problemset/task/1633)

易於優化到空間 $\mathcal{O}(1)$，但我懶。

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n = int(e())
    dp = [0] * (n+7)
    dp[0] = 1
    for i in range(n):
        v = dp[i]
        for d in range(1, 7):
            dp[i + d] = (dp[i + d] + v) % mod
    print(dp[n])
main()
```

### [Minimizing Coins](https://cses.fi/problemset/task/1634)

無限背包。好好設定轉移順序，就能在單倍空間內轉移，連滾動都不用。

```python
def main():
    from sys import stdin
    inf = 10**6 + 1
    e = stdin.readline

    n, m = map(int, e().split())
    lim = m + 1
    dp = [inf] * lim
    dp[0] = 0
    for v in map(int, e().split()):
        if v >= lim: continue
        for i in range(v, lim):
            if dp[i - v] < dp[i]: dp[i] = dp[i - v] + 1
    print(-1 if dp[m] is inf else dp[m])
main()
```

### [Coin Combinations I](https://cses.fi/problemset/task/1635)

一樣，好好設定順序就能漂亮壓掉空間。

一開始 `sort` 是為了後面可以用 `break` 剪枝。

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n, m = map(int, e().split())
    m += 1
    dp = [0] * m
    dp[0] = 1
    l = sorted(map(int, e().split()))
    for i in range(m):
        x = dp[i] % mod
        for v in l:
            v += i
            if v >= m: break
            dp[v] += x
    print(x)
main()
```

### [Coin Combinations II](https://cses.fi/problemset/task/1636)

一樣是無限背包的概念。

```python
from sys import stdin

mod = 10 ** 9 + 7
e = stdin.readline

n, m = map(int, e().split())
m += 1
dp = [0] * m
dp[0] = 1
for v in map(int, e().split()):
    for i in range(v, m):
        dp[i] += dp[i - v]
        dp[i] %= mod
print(dp[-1])
```

### [Removing Digits](https://cses.fi/problemset/task/1637)

不妨貪心。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    ans = 1
    while n >= 10:
        n -= max(map(int, str(n)))
        ans += 1
    print(ans)
main()
```

### [Grid Paths I](https://cses.fi/problemset/task/1638)

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n = int(e())
    dp = [0] * n
    dp[0] = 1
    for _ in range(n):
        le = 0
        for i, (c, up) in enumerate(zip(e(), dp)):
            if c == '.':
                le = dp[i] = (le + up) % mod
            else:
                le = dp[i] = 0
    print(le)
main()
```

### [Book Shop](https://cses.fi/problemset/task/1158)

0-1 背包。將無限背包的內層迴圈的轉移順序倒過來即可。

以下實作則是將 `dp` 倒過來，個人覺得比較簡潔 (?)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    m += 1
    ws = list(map(int, e().split()))
    vs = list(map(int, e().split()))
    dp = [0] * m
    for w, v in zip(ws, vs):
        for i in range(m - w):
            dp[i] = max(dp[i], dp[i + w] + v)
    print(dp[0])
main()
```

### [Array Description](https://cses.fi/problemset/task/1746)

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n, m = map(int, e().split())
    it = map(int, e().split())
    pv = next(it)
    if pv:
        dp = [0] * (m + 2)
        dp[pv] = 1
    else:
        dp = [1] * (m + 2)
        dp[0] = dp[m + 1] = 0
    for v in it:
        if v:
            if pv:
                if pv - 1 <= v <= pv + 1:
                    dp[v] = dp[pv]
                else:
                    print(0)
                    return
            else:
                dp[v] += dp[v - 1] + dp[v + 1]
        else:
            if pv:
                x = dp[pv]
                dp = [0] * (m + 2)
                dp[pv - 1] = dp[pv] = dp[pv + 1] = x
            else:
                ndp = [0] * (m + 2)
                for i in range(1, m + 1):
                    ndp[i] = (dp[i - 1] + dp[i] + dp[i + 1]) % mod
                dp = ndp
        dp[0] = dp[m + 1] = 0
        pv = v
    print((dp[pv] % mod if pv else sum(dp)) % mod)
main()
```

### [Counting Towers](https://cses.fi/problemset/task/2413)

~~通靈~~出轉移式以後發現易於矩陣快速冪優化。

不會通靈的話，可以手算前幾項，然後枚舉 $2 \times 2$ 轉移矩陣，看哪些符合答案。

Python 的矩陣乘法可以寫得極為簡潔漂亮，但他常數拉完。

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7
    mul = lambda a, b: a * b % mod

    def matmul(a, b):
        return [[sum(map(mul, row, col)) % mod for col in zip(*b)] for row in a]

    ans = []
    t = int(e())
    for _ in range(t):
        n = int(e())
        dp = [[2], [0]]
        trans = [[4, 1], [1, 2]]
        n -= 1
        while n:
            if n & 1:
                dp = matmul(dp, trans)
            trans = matmul(trans, trans)
            n >>= 1
        ans.append(dp[0][0])
    print("\n".join(map(str, ans)))
main()
```

### [Edit Distance](https://cses.fi/problemset/task/1639)

多用幾個變數（`up`, `ul`）紀錄前置狀態的值，也能做到單倍空間、不滾動。

```python
def main():
    from sys import stdin
    e = stdin.readline

    a, b = e().rstrip(), e().rstrip()
    m, n = len(a), len(b)
    if m < n: a, b, m, n = b, a, n, m
    dp = list(range(1, n + 1))
    for i in range(m):
        le, ul = i + 1, i
        for j in range(n):
            up = dp[j]
            le = dp[j] = min(le + 1, up + 1, ul + (a[i] != b[j]))
            ul = up
    print(le)
main()
```

### [Longest Common Subsequence](https://cses.fi/problemset/task/3403)

需要構造出實際字串，把整張 DP 表、前置狀態存下來。

實際上有另一個 LCS 演算法「Hirschberg」，使用分治法，能在 $\mathcal{O}(m + n)$ 的優秀空間下，構造出實際字串。但我不會。

```python
def main():
    from sys import stdin
    from operator import itemgetter
    e = stdin.readline

    m, n = map(int, e().split())
    a = list(map(int, e().split()))[::-1]
    b = list(map(int, e().split()))[::-1]
    if m < n: a, b, m, n = b, a, n, m
    dp = [[(0, None)] * (n + 1) for _ in range(m + 1)]
    best = (0, None)
    for i in range(m):
        for j in range(n):
            if a[i] == b[j]:
                dp[i][j] = (dp[i - 1][j - 1][0] + 1, (i, j))
                best = max(best, dp[i][j], key=itemgetter(0))
            else:
                dp[i][j] = max(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j], key=itemgetter(0))
    print(best[0])
    best = best[1]
    while best is not None:
        print(a[best[0]], end=" ")
        best = dp[best[0] - 1][best[1] - 1][1]
main()
```

### [Rectangle Cutting](https://cses.fi/problemset/task/1744)

```python
def main():
    from sys import stdin
    e = stdin.readline

    m, n = map(int, e().split())
    mx = max(m, n)
    dp = [[0] * (mx + 1) for _ in range(mx + 1)]
    for i in range(1, mx + 1):
        row = dp[i]
        for j in range(1, i):
            col = dp[j]
            x = i * j
            for k in range(1, (i >> 1) + 1):
                x = min(x, col[k] + col[i - k])
            for k in range(1, (j >> 1) + 1):
                x = min(x, row[k] + row[j - k])
            row[j] = col[i] = x + 1
    print(dp[m][n])
main()
```

### [Minimal Grid Path](https://cses.fi/problemset/task/3359)

BFS，每次只擴張當前最小的字元。

~~當然也可以由後往前，把每一條路 Radix Sort，就知道要往右還往下走了。~~

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    n_ = n + 1
    l = "_".join(e().rstrip() for _ in range(n)) + '_' * n_
    vis = [0] * (n_ * n_)
    cur = [0]
    ans = [l[0]] * ((n << 1) - 1)
    for r in range(1, (n << 1) - 1):
        mn = "Z"
        nxt = []
        for i in cur:
            mn = min(mn, l[i + 1], l[i + n_])
        for i in cur:
            if l[i + 1] == mn and not vis[i + 1]:
                vis[i + 1] = 1
                nxt.append(i + 1)
            if l[i + n_] == mn and not vis[i + n_]:
                vis[i + n_] = 1
                nxt.append(i + n_)
        cur = nxt
        ans[r] = mn
    print("".join(ans))
main()
```

### [Money Sums](https://cses.fi/problemset/task/1745)

**0-1 可行性**背包可以用 Python 大數 `int` 或者 `bitset` 快樂做掉。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()
    bit = 1
    for v in map(int, e().split()):
        bit |= bit << v
    bit &= -2
    print(bit.bit_count())
    print(" ".join(str(i) for i, v in enumerate(f"{bit:b}"[::-1]) if v == "1"))
main()
```

### [Removal Game](https://cses.fi/problemset/task/1097)

賽局 + 區間 DP。

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    dp = [[0] * i for i in range(1, n + 1)]
    l = list(map(int, e().split()))
    if n & 1:
        for i, v in enumerate(l):
            dp[i][i] = v

    for r in range(1, n):
        if (n ^ r) & 1:
            for i in range(n - r):
                j = i + r
                dp[j][i] = max(dp[j][i + 1] + l[i], dp[j - 1][i] + l[j])
        else:
            for i in range(n - r):
                j = i + r
                dp[j][i] = min(dp[j][i + 1], dp[j - 1][i])
    print(dp[-1][0])
main()
```

### [Two Sets II](https://cses.fi/problemset/task/1093)

0-1 背包，一樣把 `dp` 倒過來做。最後的 $/2$ 需要模逆元。

```python
def main():
    mod = 10**9 + 7
    n = int(input())

    if n & 3 and (n + 1) & 3:
        return print(0)

    t = n * (n + 1) >> 2
    lim = t + 1
    dp = [0] * lim
    dp[~0] = 1
    for v in range(1, n+1):
        for i in range(lim - v):
            dp[i] = (dp[i] + dp[i + v]) % mod
    print(dp[0] * pow(2, -1, mod) % mod)
main()
```

### [Mountain Range](https://cses.fi/problemset/task/3314)

很容易想出一些 $\mathcal{O}(n \log_2 n)$ 解：從小到大枚舉高度，則每次 DP 轉移需要在一個區間（左邊第一個比自己高的～右邊第一個比自己高的）內取 $max$，易於用線段樹維護區間極值；從大到小枚舉高度，則每次 DP 轉移就是取左右第一個比自己高的 DP 值。

稍微觀察一下法二會發現，不用由大到小枚舉高度，直接單調 Stack 正反跑兩趟就好！不用 Sort 只要 $\mathcal{O}(n)$，若是*好好實作*甚至可以寫出以下 one pass 解法。一樣使用 `inf` 作為 sentinel，且用變數存 `top` 減少 `list` 存取開銷。

```python
def main():
    from sys import stdin
    e = stdin.readline

    e()  # n
    stk = []
    pv, px = float("INF"), 0
    for v in map(int, e().split()):
        x = 1
        while pv < v:
            x = px + 1
            pv, px = stk.pop()
            px = max(px, x)
        if pv != v:
            stk.append((pv, px))
            pv, px = v, x
    stk.append((pv, px))
    print(max(x[1] + i for i, x in enumerate(stk, -1)))
main()
```

### [Increasing Subsequence](https://cses.fi/problemset/task/1145)

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    e()  # n
    lis = []
    mx = 0
    for v in map(int, e().split()):
        if v > mx:
            lis.append(v)
            mx = v
        else:
            lis[bisect_left(lis, v)] = v
            mx = lis[-1]
    print(len(lis))
main()
```

### [Projects](https://cses.fi/problemset/task/1140)

依照結束時間 Sort 以後，DP 值具有單調性，使用二分搜優化轉移。

~~我記得上次在類似的題目砸了離散化 + 維護前綴 max 的 BIT，大家小心別吃毒。~~

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    from operator import itemgetter
    e = stdin.readline

    n = int(e())
    l = sorted((tuple(map(int, e().split())) for _ in range(n)), key=itemgetter(1))
    dp = [0] * (n + 1)
    end = [0] * (n + 1)
    le = 0
    for i, (s, t, v) in enumerate(l, 1):
        le = dp[i] = max(le, dp[bisect_left(end, s, hi=i) - 1] + v)
        end[i] = t
    print(le)
main()
```

### [Elevator Rides](https://cses.fi/problemset/task/1653)

貪心一下發現：「次數少、重量重」比「次數多、重量輕」要好，因此狀態數量是好的。這個梗算是經典，尤其在各種 Dijkstra 題目可能需要考慮。

以下寫法用了 `ctz`、刪 lowbit，常數上會是枚舉再 `if` 的 $\frac{1}{2}$，用來壓常很好用，但 Python 寫起來醜、也不一定會比較快（Python 位元操作太慢）。

不得不說，位元 DP 用 C++ 寫真的比較漂亮。

```python
def main():
    from sys import stdin
    e = stdin.readline
    ctz = lambda x: (x & -x).bit_length() - 1

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    bit = 1 << n
    dp = [0] * bit
    rk = [0] * bit
    for b in range(1, bit):
        bb = b
        x, kk = n, 0
        while bb:
            i = ctz(bb)
            v = l[i]
            pb = b ^ (bb & -bb)
            if rk[pb] >= v:
                nx = dp[pb]
                nk = rk[pb] - v
            else:
                nx = dp[pb] + 1
                nk = k - v
            if nx < x or nx == x and nk > kk:
                x = nx
                kk = nk
            bb &= bb - 1
        dp[b], rk[b] = x, kk
    print(dp[-1])
main()
```

### [Counting Tilings](https://cses.fi/problemset/task/2181)

```python
def main():
    from sys import stdin
    mod = 10 ** 9 + 7
    e = stdin.readline

    n, m = map(int, e().split())
    bit = 1 << n
    mask = bit - 1

    tiles = [0b11 << i for i in range(n - 1)]
    tiles_comb = [0b0]
    for tile in tiles:
        for tile_comb in tiles_comb:
            if not tile_comb & tile:
                tiles_comb.append(tile_comb | tile)
    # print(len(tiles_comb))  # <= 89

    trans = [[mask ^ (b | tile_comb)
              for tile_comb in tiles_comb
              if not b & tile_comb] for b in range(bit)]
    # print(sum(map(len, trans)))  # <= 5741

    d = [0] * bit
    d[0] = 1
    for _ in range(m):
        p = [0] * bit
        for b, v in enumerate(d):
            if not v: continue
            v %= mod
            for nb in trans[b]:
                p[nb] += v
        d = p
    print(d[0] % mod)
main()
```

### [Counting Numbers](https://cses.fi/problemset/task/2220)

```python
def main():
    from sys import stdin
    from functools import cache
    e = stdin.readline

    @cache
    def dp(i: int = 0, pre: int = -1, is_lim: bool = True) -> int:
        if i == len(num): return 1
        res = 0
        lim = num[i] if is_lim else 9
        for d in range(lim + 1):
            if d == pre: continue
            res += dp(i + 1, -1 if pre == -1 and d == 0 else d, is_lim and d == lim)
        return res

    lo, hi = map(int, e().split())
    num = tuple(map(int, str(hi)))
    ans = dp()
    if lo:
        dp.cache_clear()
        num = tuple(map(int, str(lo - 1)))
        ans -= dp()
    print(ans)
main()
```

### [Increasing Subsequence II](https://cses.fi/problemset/task/1748)

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    sl = sorted(range(n-1, -1, -1), key=l.__getitem__)

    ans = 0
    bit = [0] * (n + 1)
    for i in sl:
        res = 1
        ii = i
        while ii:
            res += bit[ii]
            ii &= ii-1
        res %= mod
        ans += res
        ii = i + 1
        while ii <= n:
            bit[ii] += res
            ii += ii & -ii
    print(ans % mod)
main()
```

## Graph Algorithms

### [Counting Rooms](https://cses.fi/problemset/task/1192)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b) -> bool:
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    m, n = map(int, e().split())
    n += 1
    area = m * n
    dsu = [0] * (area + n)
    ans = 0
    for r in range(0, area, n):
        for i, c in enumerate(e(), r):
            if c != ".": continue
            dsu[i] = -1
            ans += 1
            if dsu[i - 1]: ans -= merge(i, i - 1)
            if dsu[i - n]: ans -= merge(i, i - n)
    print(ans)
main()
```

### [Labyrinth](https://cses.fi/problemset/task/1193)

```python
def main():
    from sys import stdin
    e = stdin.readline

    m, n = map(int, e().split())
    n += 1
    area = m * n
    l = [0] * (area + n)
    q = []
    for r in range(0, area, n):
        for i, c in enumerate(e(), r):
            if c == "#":
                l[i] = 0
            elif c == "A":
                l[i] = 0
                q.append(i)
            elif c == ".":
                l[i] = 1
            elif c == "B":
                l[i] = 2
    d = (1, n, -n, -1)
    for i in q:
        for di, ni in enumerate(d):
            ni = i + ni
            v = l[ni]
            if v < 1: continue
            l[ni] = ~di
            q.append(ni)
            if v == 2: break
        else: continue
        break
    else:
        print("NO")
        return

    print("YES")

    ans = []
    ds = "LUDR"
    while l[ni]:
        ans.append(ds[l[ni]])
        ni += d[l[ni]]

    print(len(ans))
    print("".join(reversed(ans)))
main()
```

### [Building Roads](https://cses.fi/problemset/task/1666)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    n, m = map(int, e().split())
    dsu = [-1] * n
    r = n
    for _ in range(m):
        a, b = map(int, e().split())
        r -= merge(a - 1, b - 1)
    print(r - 1)
    it = (i for i, v in enumerate(dsu, 1) if v < 0)
    x = next(it)
    print("\n".join(f"{x} {i}" for i in it))
main()
```

### [Message Route](https://cses.fi/problemset/task/1667)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    pre = [-1] * n
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    q = [0]
    pre[0] = 0
    for i in q:
        for j in G[i]:
            if ~pre[j]: continue
            pre[j] = i
            if j == n-1: break
            q.append(j)
        else: continue
        break
    else:
        print("IMPOSSIBLE")
        return

    ans = []
    i = n-1
    while i:
        ans.append(i + 1)
        i = pre[i]
    ans.append(1)
    print(len(ans))
    print(*reversed(ans))
main()
```

### [Building Teams](https://cses.fi/problemset/task/1668)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    color = [0] * n
    for i, v in enumerate(color):
        if v: continue
        v = 1
        cur = [i]
        color[i] = v
        while cur:
            v ^= 3
            nxt = []
            for i in cur:
                for j in G[i]:
                    if color[j]:
                        if color[j] != v:
                            return print("IMPOSSIBLE")
                        continue
                    color[j] = v
                    nxt.append(j)
            cur = nxt
    print(*color)
main()
```

### [Round Trip](https://cses.fi/problemset/task/1669)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)
    for i, it in enumerate(G):
        G[i] = iter(it)

    pa = [-1] * n
    vis = [False] * n
    for i, v in enumerate(vis):
        if v: continue
        vis[i] = True
        stk = [i]
        while stk:
            i = stk.pop()
            p = pa[i]
            for j in G[i]:
                if j == p: continue
                if vis[j]:
                    ans = [j + 1]
                    while i != j:
                        ans.append(i + 1)
                        i = pa[i]
                    ans.append(j + 1)
                    print(len(ans))
                    print(*ans)
                    return
                else:
                    stk.append(i)
                    pa[j] = i
                    stk.append(j)
                    vis[j] = True
                    break
    print("IMPOSSIBLE")
main()
```

### [Monsters](https://cses.fi/problemset/task/1194)

```python
def main():
    from sys import stdin
    e = stdin.readline

    m, n = map(int, e().split())
    n += 1
    area = m * n
    l = [3] * (area + n)
    pre = [0] * area
    q = []
    s = 0
    for r in range(0, area, n):
        for i, c in enumerate(e(), r):
            if c == "#":
                l[i] = 0
            elif c == "A":
                l[i] = 1
                s = i
                pre[i] = -1
            elif c == ".":
                l[i] = 2
            elif c == "M":
                l[i] = 0
                q.append(i)
    q.append(~s)

    d = (1, n, -n, -1)
    for i in q:
        if i < 0:
            player = True
            i = ~i
        else:
            player = False
        for di, ni in enumerate(d):
            ni = i + ni
            if player:
                if l[ni] < 2: continue
                if l[ni] == 3: break
                pre[ni] = di
            elif l[ni] < 1 or l[ni] == 3: continue
            l[ni] -= 1
            q.append(~ni if player else ni)
        else: continue
        break
    else:
        print("NO")
        return

    print("YES")

    ans = []
    ds = "RDUL"
    while pre[i] >= 0:
        ans.append(ds[pre[i]])
        i -= d[pre[i]]

    print(len(ans))
    print("".join(reversed(ans)))
main()
```

### [Shortest Routes I](https://cses.fi/problemset/task/1671)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    inf = float("INF")
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))

    dis = [inf] * n
    dis[0] = 0
    q = [(0, 0)]
    while q:
        v, i = heappop(q)
        if v > dis[i]: continue
        for j, nv in G[i]:
            nv += v
            if nv >= dis[j]: continue
            dis[j] = nv
            heappush(q, (nv, j))
    print(*dis)

main()
```

### [Shortest Routes II](https://cses.fi/problemset/task/1672)

```python
def main():
    from sys import stdin
    inf = float("INF")
    e = stdin.readline

    n, m, q = map(int, e().split())
    dis = [[inf] * n for _ in range(n)]
    for i, row in enumerate(dis):
        row[i] = 0

    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        dis[a][b] = dis[b][a] = min(dis[b][a], w)

    for k in range(n):
        for i in range(n):
            for j in range(n):
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j])

    ans = []
    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        ans.append(-1 if dis[a][b] is inf else dis[a][b])
    print("\n".join(map(str, ans)))
main()
```

### [High Score](https://cses.fi/problemset/task/1673)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))

    ans = [float("-INF")] * n
    cnt = [0] * n
    inq = [False] * n
    inf_dis = [False] * n
    ans[0] = 0
    q = [0]
    inq[0] = True
    for i in q:
        if inf_dis[i]: continue
        inq[i] = False
        v = ans[i]
        for j, nv in G[i]:
            nv += v
            if nv > ans[j]:
                ans[j] = nv
                cnt[j] = cnt[i] + 1
                if cnt[j] >= n:
                    inf_dis[j] = True
                    inq[j] = True
                if not inq[j]:
                    q.append(j)
                    inq[j] = True
    q = [i for i, v in enumerate(inf_dis) if v]
    for i in q:
        for j, _ in G[i]:
            if inf_dis[j]: continue
            inf_dis[j] = True
            q.append(j)
    print(-1 if inf_dis[-1] else ans[-1])
main()
```

### [Flight Discount](https://cses.fi/problemset/task/1195)

```python
def main():
    from sys import stdin
    from heapq import heappop, heappush
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))

    dis = [float("INF")] * (n * 2)
    dis[0] = 0
    q = [(0, 0)]
    while q:
        v, i = heappop(q)
        if v > dis[i]: continue
        for j, nv in G[i % n]:
            nv += v
            if i < n:
                if nv < dis[j]:
                    dis[j] = nv
                    heappush(q, (nv, j))
                nv = (nv + v) >> 1
                if nv < dis[n + j]:
                    dis[n + j] = nv
                    heappush(q, (nv, n + j))
            elif nv < dis[n + j]:
                dis[n + j] = nv
                heappush(q, (nv, n + j))
    print(dis[-1])
main()
```

### [Cycle Finding](https://cses.fi/problemset/task/1197)

```python
def main():
    from sys import stdin
    inf = float("INF")
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))

    dis = [inf] * n
    cnt = [0] * n
    inq = [False] * n
    pre = [-1] * n
    for i, v in enumerate(dis):
        if v is not inf: continue
        dis[i] = 0
        q = [i]
        inq[i] = True
        for i in q:
            inq[i] = False
            v, nc = dis[i], cnt[i] + 1
            for j, nv in G[i]:
                nv += v
                if nv < dis[j]:
                    pre[j] = i
                    dis[j] = nv
                    cnt[j] = nc
                    if nc >= n:
                        for _ in range(n + 1):
                            j = pre[j]
                        s = j
                        cycle = [s + 1]
                        i = pre[j]
                        while i != s:
                            cycle.append(i + 1)
                            i = pre[i]
                        cycle.append(s + 1)
                        print("YES")
                        print(*reversed(cycle))
                        return
                    if not inq[j]:
                        q.append(j)
                        inq[j] = True
    print("NO")
main()
```

### [Flight Routes](https://cses.fi/problemset/task/1196)

```python
def main():
    from sys import stdin
    from heapq import heappop, heappush
    inf = float("INF")
    e = stdin.readline

    n, m, k = map(int, e().split())
    G = [[] for _ in range(n)]
    R = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))
        R[b].append((a, w))

    # Dijkstra from t
    dis = [inf] * n
    dis[-1] = 0
    q = [(0, n-1)]
    while q:
        v, i = heappop(q)
        if v > dis[i]: continue
        for j, nv in R[i]:
            nv += v
            if nv < dis[j]:
                dis[j] = nv
                heappush(q, (nv, j))

    # A* from s to t
    ans = [inf] * k
    cnt = [0] * n
    q = [(dis[0], 0)]
    while q:
        v, i = heappop(q)
        v -= dis[i]
        if i == n-1: ans[cnt[i]] = v
        cnt[i] += 1
        if cnt[n-1] >= k: break
        if cnt[i] > k: continue
        for j, w in G[i]:
            heappush(q, (v + w + dis[j], j))
    print(*ans)
main()
```

### [Round Trip II](https://cses.fi/problemset/task/1678)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
    for i, it in enumerate(G):
        G[i] = iter(it)

    vis = [False] * n
    instk = [False] * n
    for i, v in enumerate(vis):
        if v: continue
        vis[i] = True
        instk[i] = True
        stk = [i]
        while stk:
            i = stk[-1]
            for j in G[i]:
                if not instk[i] and vis[j]: continue
                if instk[j]:
                    cycle = stk[stk.index(j):] + [j]
                    print(len(cycle))
                    print(" ".join(str(i + 1) for i in cycle))
                    return
                vis[j] = True
                instk[j] = True
                stk.append(j)
                break
            else:
                stk.pop()
                instk[i] = False
    print("IMPOSSIBLE")
main()
```

### [Course Schedule](https://cses.fi/problemset/task/1679)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    indeg = [0] * n
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        indeg[b] += 1

    q = [i for i, v in enumerate(indeg) if v == 0]
    for i in q:
        for j in G[i]:
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
    print(" ".join(str(i + 1) for i in q) if len(q) == n else "IMPOSSIBLE")
main()
```

### [Longest Flight Route](https://cses.fi/problemset/task/1680)

```python
def main():
    from sys import stdin
    inf = float("INF")
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    indeg = [0] * n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[b].append(a)
        indeg[a] += 1

    nxt = [(-inf, -1)] * n
    q = [i for i, v in enumerate(indeg) if v == 0]
    nxt[-1] = (0, -1)
    for i in q:
        x = (nxt[i][0] + 1, i)
        for j in G[i]:
            nxt[j] = max(nxt[j], x)
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)

    if nxt[0][0] == -inf:
        print("IMPOSSIBLE")
        return

    ans = []
    i = 0
    while i != -1:
        ans.append(i)
        i = nxt[i][1]
    print(len(ans))
    print(" ".join(str(i + 1) for i in ans))
main()
```

### [Game Routes](https://cses.fi/problemset/task/1681)

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    indeg = [0] * n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        indeg[b] += 1

    dp = [0] * n
    dp[0] = 1
    q = [i for i, v in enumerate(indeg) if v == 0]
    for i in q:
        x = dp[i] % mod
        for j in G[i]:
            dp[j] += x
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
    print(dp[n-1] % mod)
main()
```

### [Investigation](https://cses.fi/problemset/task/1202)

```python
def main():
    from sys import stdin
    from heapq import heappop, heappush
    mod = 10**9 + 7
    inf = float("INF")
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        G[a].append((b, w))

    dis = [inf] * n
    cnt = [0] * n
    mn = [n] * n
    mx = [0] * n
    dis[0], cnt[0], mn[0], mx[0] = 0, 1, 0, 0
    q = [(0, 0)]
    while q:
        v, i = heappop(q)
        if v > dis[i]: continue
        c, mnmn, mxmx = cnt[i] % mod, mn[i] + 1, mx[i] + 1
        for j, nv in G[i]:
            nv += v
            if nv < dis[j]:
                dis[j], cnt[j] = nv, c
                mn[j], mx[j] = mnmn, mxmx
                heappush(q, (nv, j))
            elif nv == dis[j]:
                cnt[j] += c
                mn[j] = min(mn[j], mnmn)
                mx[j] = max(mx[j], mxmx)
    print(dis[-1], cnt[-1] % mod, mn[-1], mx[-1])
main()
```

### [Planets Queries I](https://cses.fi/problemset/task/1750)

```python
def main():
    from sys import stdin
    lim = 30
    e = stdin.readline

    n, q = map(int, e().split())
    binary_lifting = [[0] * n for _ in range(lim)]
    pre = binary_lifting[0] = [int(v) - 1 for v in e().split()]
    for r in range(1, lim):
        cur = binary_lifting[r]
        for i in range(n):
            cur[i] = pre[pre[i]]
        pre = cur
    ans = []
    for _ in range(q):
        i, k = map(int, e().split())
        i -= 1
        for row in binary_lifting:
            if k & 1:
                i = row[i]
            k >>= 1
        ans.append(f"{i + 1}")
    print("\n".join(ans))
main()
```

### [Planets Queries II](https://cses.fi/problemset/task/1160)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    nxt = [int(v) - 1 for v in e().split()]

    group_of = [-1] * n
    entry = list(range(n))
    entry_dis = [0] * n
    cycle_pos = [-1] * n
    cycle_len = []
    group_counter = 0
    for i in range(n):
        if group_of[i] != -1: continue
        group_of[i] = group_counter
        path = [i]
        head, i = i, nxt[i]
        while group_of[i] == -1:
            path.append(i)
            group_of[i] = group_counter
            i = nxt[i]
        size = len(path)

        tail = i
        if group_of[tail] == group_counter:
            k = path.index(tail)
            for i in range(k):
                entry[path[i]] = tail
                entry_dis[path[i]] = k - i
            for i in range(k, size):
                cycle_pos[path[i]] = i - k
            cycle_len.append(size - k)
            group_counter += 1
        else:
            for i in range(size):
                group_of[path[i]] = group_of[tail]
                entry_dis[path[i]] = entry_dis[tail] + size - i
                entry[path[i]] = entry[tail]

    jump = nxt
    binary_lifting = [jump]
    for _ in range(18):
        jump = [jump[jump[i]] for i in range(n)]
        binary_lifting.append(jump)

    ans = []
    for _ in range(q):
        i, j = map(int, e().split())
        i, j = i-1, j-1
        if i == j:
            ans.append(0)
        elif group_of[i] != group_of[j] or entry_dis[i] < entry_dis[j]:
            ans.append(-1)
        elif entry_dis[j] == 0:
            ans.append(entry_dis[i] + (cycle_pos[j] - cycle_pos[entry[i]]) % cycle_len[group_of[j]])
        elif entry_dis[i] == entry_dis[j]:
            ans.append(-1)
        else:
            dis = entry_dis[i] - entry_dis[j]
            ii, k = i, 0
            while dis:
                if dis & 1:
                    ii = binary_lifting[k][ii]
                dis >>= 1
                k += 1
            if ii == j:
                ans.append(entry_dis[i] - entry_dis[j])
            else:
                ans.append(-1)

    print("\n".join(map(str, ans)))
main()
```

### [Planets Cycles](https://cses.fi/problemset/task/1751)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    nxt = [int(v) - 1 for v in e().split()]

    group_of = [-1] * n
    group_counter = 0
    ans = [0] * n
    for i in range(n):
        if group_of[i] != -1: continue
        group_of[i] = group_counter
        path = [i]
        head, i = i, nxt[i]
        while group_of[i] == -1:
            path.append(i)
            group_of[i] = group_counter
            i = nxt[i]
        size = len(path)

        if group_of[i] == group_counter:
            k = path.index(i)
            cycle_size = size - k
            for i in range(k):
                ans[path[i]] = cycle_size + k - i
            for i in range(k, size):
                ans[path[i]] = cycle_size
            group_counter += 1
        else:
            group = group_of[i]
            count = ans[i]
            for i in range(size):
                group_of[path[i]] = group
                ans[path[i]] = count + size - i

    print(" ".join(map(str, ans)))
main()
```

### [Road Reparation](https://cses.fi/problemset/task/1675)

```python
def main():
    from sys import stdin
    from operator import itemgetter
    e = stdin.readline

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    n, m = map(int, e().split())
    es = [tuple(map(int, e().split())) for _ in range(m)]
    es.sort(key=itemgetter(2))

    ans = 0
    dsu = [-1] * n
    r = n
    for a, b, w in es:
        a, b = a-1, b-1
        if merge(a, b):
            r -= 1
            ans += w
    print(ans if r == 1 else "IMPOSSIBLE")
main()
```

### [Road Construction](https://cses.fi/problemset/task/1676)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return 0
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a
        return -dsu[a]

    n, m = map(int, e().split())
    dsu = [-1] * n
    cur = 1
    ans = []
    for _ in range(m):
        a, b = map(int, e().split())
        ret = merge(a-1, b-1)
        if ret:
            n -= 1
            cur = max(ret, cur)
        ans.append(f"{n} {cur}")
    print("\n".join(ans))
main()
```

### [Flight Routes Check](https://cses.fi/problemset/task/1682)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    R = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        R[b].append(a)

    q = [0]
    vis = [False] * n
    vis[0] = True
    for i in q:
        for j in G[i]:
            if vis[j]: continue
            vis[j] = True
            q.append(j)
    if len(q) < n:
        print("NO")
        print(f"{1} {vis.index(False) + 1}")
        return

    q = [0]
    vis = [False] * n
    vis[0] = True
    for i in q:
        for j in R[i]:
            if vis[j]: continue
            vis[j] = True
            q.append(j)
    if len(q) < n:
        print("NO")
        print(f"{vis.index(False) + 1} {1}")
        return

    print("YES")
main()
```

### [Planets and Kingdoms](https://cses.fi/problemset/task/1683)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline

    setrecursionlimit(10**5 + 10)

    def tarjan(i):
        nonlocal dfnn, scn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        stk.append(i)
        instk[i] = True
        for j in G[i]:
            if not instk[j] and dfn[j]: continue
            if not dfn[j]: tarjan(j)
            if low[j] < low[i]: low[i] = low[j]
        if low[i] == dfn[i]:
            scn += 1
            j = -1
            while j != i:
                j = stk.pop()
                instk[j] = False
                scc[j] = scn

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)

    dfn = [0] * n
    low = [0] * n
    scc = [0] * n
    stk = []
    instk = [False] * n
    dfnn = scn = 0
    for i in range(n):
        if not dfn[i]:
            tarjan(i)
    print(scn)
    print(*scc)
main()
```

### [Giant Pizza](https://cses.fi/problemset/task/1684)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline

    setrecursionlimit(2 * 10**5 + 10)

    def tarjan(i):
        nonlocal dfnn, scn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        stk.append(i)
        instk[i] = True
        for j in G[i]:
            if not instk[j] and dfn[j]: continue
            if not dfn[j]: tarjan(j)
            if low[j] < low[i]: low[i] = low[j]
        if low[i] == dfn[i]:
            scn += 1
            j = -1
            while j != i:
                j = stk.pop()
                instk[j] = False
                scc[j] = scn

    m, n = map(int, e().split())
    n <<= 1
    G = [[] for _ in range(n)]
    for _ in range(m):
        sa, a, sb, b = e().split()
        a, b = int(a) - 1, int(b) - 1
        a, b = a << 1 | (sa == "+"), b << 1 | (sb == "+")
        G[a ^ 1].append(b)
        G[b ^ 1].append(a)

    dfn = [0] * n
    low = [0] * n
    scc = [0] * n
    stk = []
    instk = [False] * n
    dfnn = scn = 0
    for i in range(n):
        if not dfn[i]:
            tarjan(i)

    it = iter(scc)
    if any(a == b for a, b in zip(it, it)):
        print("IMPOSSIBLE")
    else:
        it = iter(scc)
        print(" ".join("-+"[a > b] for a, b in zip(it, it)))
main()
```

### [Coin Collector](https://cses.fi/problemset/task/1686)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline

    setrecursionlimit(10**5 + 10)

    def tarjan(i):
        nonlocal dfnn, scn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        stk.append(i)
        instk[i] = True
        for j in G[i]:
            if not instk[j] and dfn[j]: continue
            if not dfn[j]: tarjan(j)
            if low[j] < low[i]: low[i] = low[j]
        if low[i] == dfn[i]:
            j = -1
            group = []
            sm = 0
            while j != i:
                j = stk.pop()
                instk[j] = False
                sm += l[j]
                scc[j] = scn
                group.append(j)
            l[i] = sm
            groups.append(group)
            scn += 1

    n, m = map(int, e().split())
    l = list(map(int, e().split()))
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)

    dfn = [0] * n
    low = [0] * n
    scc = [0] * n
    scn = 0
    stk = []
    instk = [False] * n
    groups = []
    dfnn = 0
    for i in range(n):
        if not dfn[i]:
            tarjan(i)

    indeg = [0] * scn
    for group in groups:
        for i in group:
            for j in G[i]:
                if scc[i] == scc[j]: continue
                indeg[scc[j]] += 1

    ans = 0
    dp = [0] * n
    q = [groups[g] for g in range(scn) if indeg[g] == 0]
    for group in q:
        r = group[-1]
        x = l[r] + dp[r]
        ans = max(ans, x)
        for i in group:
            for j in G[i]:
                if scc[i] == scc[j]: continue
                g = scc[j]
                j = groups[g][-1]
                dp[j] = max(dp[j], x)
                indeg[g] -= 1
                if indeg[g] == 0:
                    q.append(groups[g])
    print(ans)
main()
```

### [Mail Delivery](https://cses.fi/problemset/task/1691)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    es = []
    deg = [0] * n
    for i in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        deg[a] ^= 1
        deg[b] ^= 1
        es.append(a ^ b)
        G[a].append(i)
        G[b].append(i)

    if any(deg):
        print("IMPOSSIBLE")
        return

    for i, it in enumerate(G):
        G[i] = iter(it)

    ans = []
    stk = [0]
    while stk:
        i = stk[-1]
        for ei in G[i]:
            if es[ei] == 0: continue
            j = es[ei] ^ i
            es[ei] = 0
            stk.append(j)
            break
        else:
            stk.pop()
            ans.append(i + 1)

    if any(es):
        print("IMPOSSIBLE")
        return

    print(*ans)
main()
```

### [De Bruijn Sequence](https://cses.fi/problemset/task/1692)

```python
def main():
    n = int(input())
    k = 2

    a = list(map(str, range(k)))
    cur = [0] * k * n

    def dfs(i, p):
        if i == n:
            if n % p == 0:
                ans.extend(cur[:p])
        else:
            cur[i] = cur[i - p]
            dfs(i + 1, p)
            for j in range(cur[i - p] + 1, k):
                cur[i] = j
                dfs(i + 1, i + 1)

    ans = []
    dfs(0, 1)
    ans = "".join(a[i] for i in ans)
    print(f"{ans}{ans[0:n - 1]}")
main()
```

### [Teleporters Path](https://cses.fi/problemset/task/1693)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    deg = [0] * n
    deg[0] -= 1
    deg[-1] += 1
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        deg[a] += 1
        deg[b] -= 1
    if any(deg):
        print("IMPOSSIBLE")
        return

    for i, it in enumerate(G):
        G[i] = iter(it)

    ans = []
    stk = [0]
    while stk:
        i = stk[-1]
        for j in G[i]:
            stk.append(j)
            break
        else:
            stk.pop()
            ans.append(i + 1)
    if len(ans) <= m:
        print("IMPOSSIBLE")
        return
    print(*reversed(ans))
main()
```

### [Hamiltonian Flights](https://cses.fi/problemset/task/1690)

```python
def main():
    from sys import stdin
    mod = 10**9 + 7
    e = stdin.readline

    n, m = map(int, e().split())
    bit = 1 << n

    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)

    dp = [[0] * n for _ in range(bit)]
    dp[0b1][0] = 1
    for b in range(1, bit):
        for i in range(n):
            x = dp[b][i] % mod
            if x == 0: continue
            for j in G[i]:
                if (b >> j) & 1: continue
                dp[b | (1 << j)][j] += x
    print(dp[-1][-1] % mod)
main()
```

### [Knight's Tour](https://cses.fi/problemset/task/1689)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = 8
    area = n * n

    j, i = map(int, e().split())
    i, j = i-1, j-1
    d = (1, 2, 1, -2, -1, 2, -1, -2)
    G = [[ni * n + nj for di in range(8) if 0 <= (ni := i + d[di]) < n and 0 <= (nj := j + d[di ^ 1]) < n] for i in range(n) for j in range(n)]

    def f(i):
        return sum(ans[j] == 0 for j in G[i])

    def bt(i, d):
        ans[i] = d
        if d == n * n:
            return True
        cand = [j for j in G[i] if not ans[j]]
        cand.sort(key=f)
        for j in cand:
            if bt(j, d + 1):
                return True
        ans[i] = 0
        return False

    ans = [0] * area
    bt(i * n + j, 1)
    for r in range(0, area, n):
        print(*ans[r:r+n])
main()
```

### [Download Speed](https://cses.fi/problemset/task/1694)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def dinic(n: int, edges: list, s: int, t: int) -> int:
        inf = float("INF")
        m = len(edges) << 1

        def dfs(i, limit):
            if i == t:
                return limit
            sum_flow = 0  # 此點以下的最大流
            for j, ei in G[i]:
                if flow[ei] == cap[ei]: continue
                if depth[j] != depth[i] + 1: continue
                pushed = dfs(j, min(limit - sum_flow, cap[ei] - flow[ei]))
                sum_flow += pushed
                flow[ei] += pushed
                flow[ei ^ 1] -= pushed
                if sum_flow == limit: break
            if not sum_flow:  # 重要優化
                depth[i] = None
            return sum_flow

        flow = [0] * m
        cap = [0] * m
        G = [[] for _ in range(n)]
        for ei, (i, j, w) in enumerate(edges):
            cap[ei << 1] = w
            G[i].append((j, ei << 1))
            G[j].append((i, ei << 1 | 1))

        max_flow = 0
        while True:
            bfs = [s]
            depth = [None] * n
            depth[s] = 0
            step = 1
            while bfs:
                nxt = []
                for i in bfs:
                    for j, ei in G[i]:
                        if depth[j] is not None: continue  # visited
                        if flow[ei] == cap[ei]: continue  # 此路徑流量已滿
                        depth[j] = step
                        if j == t: break  # 到終點，bfs 結束
                        nxt.append(j)
                    else: continue  # 未到終點，繼續 bfs 下個節點
                    break  # 到終點，bfs 結束
                else:  # 未到終點，繼續 bfs 下一輪
                    bfs = nxt
                    step += 1
                    continue
                break  # 到終點，bfs 結束
            else: break  # 未到終點，結束 Dinic 演算法

            max_flow += dfs(s, inf)
        return max_flow

    n, m = map(int, e().split())
    es = []
    for _ in range(m):
        a, b, w = map(int, e().split())
        es.append((a - 1, b - 1, w))

    print(dinic(n, es, 0, n-1))
main()
```

### [Police Chase](https://cses.fi/problemset/task/1695)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def dinic(n: int, edges: list, s: int, t: int):
        inf = float("INF")
        m = len(edges) << 1

        def dfs(i, limit):
            if i == t:
                return limit
            sum_flow = 0  # 此點以下的最大流
            for j, edge_idx in G[i]:
                if flow[edge_idx] == cap[edge_idx]: continue
                if depth[j] != depth[i] + 1: continue
                pushed = dfs(j, min(limit - sum_flow, cap[edge_idx] - flow[edge_idx]))
                sum_flow += pushed
                flow[edge_idx] += pushed
                flow[edge_idx ^ 1] -= pushed
                if sum_flow == limit: break
            if not sum_flow:  # 重要優化
                depth[i] = None
            return sum_flow

        flow = [0] * m
        cap = [0] * m
        G = [[] for _ in range(n)]
        for edge_idx, (i, j, w) in enumerate(edges):
            cap[edge_idx << 1] = w
            G[i].append((j, edge_idx << 1))
            G[j].append((i, edge_idx << 1 | 1))

        max_flow = 0
        while True:
            bfs = [s]
            depth = [None] * n
            depth[s] = 0
            step = 1
            while bfs:
                nxt = []
                for i in bfs:
                    for j, edge_idx in G[i]:
                        if depth[j] is not None: continue  # visited
                        if flow[edge_idx] == cap[edge_idx]: continue  # 此路徑流量已滿
                        depth[j] = step
                        if j == t: break  # 到終點，bfs 結束
                        nxt.append(j)
                    else:
                        continue  # 未到終點，繼續 bfs 下個節點
                    break  # 到終點，bfs 結束
                else:  # 未到終點，繼續 bfs 下一輪
                    bfs = nxt
                    step += 1
                    continue
                break  # 到終點，bfs 結束
            else:
                break  # 未到終點，結束 Dinic 演算法

            max_flow += dfs(s, inf)
        return G, flow, cap

    n, m = map(int, e().split())
    es = []
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        es.append((a, b, 1))
        es.append((b, a, 1))

    G, flow, cap = dinic(n, es, 0, n-1)
    vis = [False] * n
    vis[0] = True
    q = [0]
    for i in q:
        for j, ei in G[i]:
            if ei & 1: continue
            if flow[ei] == cap[ei]: continue
            if vis[j]: continue
            vis[j] = True
            q.append(j)
    ans = []
    for ei in range(m << 1):
        a, b, _ = es[ei]
        if vis[a] and not vis[b]:
            ans.append(f"{a + 1} {b + 1}")
    print(len(ans))
    print("\n".join(ans))
main()
```

### [School Dance](https://cses.fi/problemset/task/1696)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m, k = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(k):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)

    def dfs(i):
        nonlocal ans
        for j in G[i]:
            if vis[j]: continue
            vis[j] = True
            if pair[j] == -1 or dfs(pair[j]):
                pair[j] = i
                return True
        return False

    ans = 0
    pair = [-1] * m
    for i in range(n):
        vis = [False] * m
        ans += dfs(i)
    print(ans)
    print("\n".join(f"{pair[j] + 1} {j + 1}" for j in range(m)))
main()
```

### [Distinct Routes](https://cses.fi/problemset/task/1711)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def dinic(n: int, edges: list, s: int, t: int):
        inf = float("INF")
        m = len(edges) << 1

        def dfs(i, limit):
            if i == t:
                return limit
            sum_flow = 0  # 此點以下的最大流
            for j, edge_idx in G[i]:
                if flow[edge_idx] == cap[edge_idx]: continue
                if depth[j] != depth[i] + 1: continue
                pushed = dfs(j, min(limit - sum_flow, cap[edge_idx] - flow[edge_idx]))
                sum_flow += pushed
                flow[edge_idx] += pushed
                flow[edge_idx ^ 1] -= pushed
                if sum_flow == limit: break
            if not sum_flow:  # 重要優化
                depth[i] = None
            return sum_flow

        flow = [0] * m
        cap = [0] * m
        G = [[] for _ in range(n)]
        for edge_idx, (i, j, w) in enumerate(edges):
            cap[edge_idx << 1] = w
            G[i].append((j, edge_idx << 1))
            G[j].append((i, edge_idx << 1 | 1))

        max_flow = 0
        while True:
            bfs = [s]
            depth = [None] * n
            depth[s] = 0
            step = 1
            while bfs:
                nxt = []
                for i in bfs:
                    for j, edge_idx in G[i]:
                        if depth[j] is not None: continue  # visited
                        if flow[edge_idx] == cap[edge_idx]: continue  # 此路徑流量已滿
                        depth[j] = step
                        if j == t: break  # 到終點，bfs 結束
                        nxt.append(j)
                    else:
                        continue  # 未到終點，繼續 bfs 下個節點
                    break  # 到終點，bfs 結束
                else:  # 未到終點，繼續 bfs 下一輪
                    bfs = nxt
                    step += 1
                    continue
                break  # 到終點，bfs 結束
            else:
                break  # 未到終點，結束 Dinic 演算法

            max_flow += dfs(s, inf)
        return max_flow, flow

    n, m = map(int, e().split())
    es = []
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        es.append((a, b, 1))

    max_flow, flow = dinic(n, es, 0, n-1)

    G = [[] for _ in range(n)]
    for ei in range(m):
        a, b, _ = es[ei]
        if flow[ei << 1] == 1:
            G[a].append(b)

    ans = [str(max_flow)]
    while G[0]:
        cur = [1]
        i = G[0].pop()
        while i != n-1:
            cur.append(i + 1)
            i = G[i].pop()
        cur.append(n)
        ans.append(f"{len(cur)}\n"
                   f"{' '.join(map(str, cur))}")
    print("\n".join(ans))
main()
```

## Range Queries

### [Static Range Sum Queries](https://cses.fi/problemset/task/1646)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n, q = map(int, e().split())
    pre = list(accumulate(map(int, e().split()), initial=0))
    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        ans.append(pre[t] - pre[s - 1])
    print("\n".join(map(str, ans)))
main()
```

### [Static Range Minimum Queries](https://cses.fi/problemset/task/1647)

```python
from itertools import islice

class SparseTable:
    def __init__(self, arr, func):
        self.func = func

        lim = len(arr) + 1
        log_2 = self.log_2 = [-1] * lim
        for i in range(1, lim):
            log_2[i] = log_2[i >> 1] + 1
        bl = log_2[-1] + 1  # n.bit_length()

        st = self.st = [None] * bl
        pre = st[0] = tuple(arr)

        len_ = 1
        for i in range(1, bl):
            pre = st[i] = tuple(map(func, pre, islice(pre, len_, None)))
            len_ <<= 1

    def query(self, s: int, t: int) -> int:
        r = self.log_2[t - s]
        row = self.st[r]
        return self.func(row[s], row[t - (1 << r)])

def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    st = SparseTable(list(map(int, e().split())), min)
    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        ans.append(st.query(s-1, t))
    print("\n".join(map(str, ans)))
main()
```

### [Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    bit = [0] + l
    for i in range(1, n + 1):
        j = i + (i & -i)
        if j <= n:
            bit[j] += bit[i]

    ans = []
    for _ in range(q):
        o, a, b = map(int, e().split())
        if o == 1:
            i, v = a - 1, b
            v -= l[i]
            l[i] += v
            i += 1  # bit 1-based
            while i <= n:
                bit[i] += v
                i += i & -i
        else:
            s, t = a - 1, b
            res = 0
            while t > s:
                res += bit[t]
                t &= t-1
            while s > t:
                res -= bit[s]
                s &= s-1
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Dynamic Range Minimum Queries](https://cses.fi/problemset/task/1649)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    zkw = [0] * n
    zkw += map(int, e().split())
    for i in range(n-1, 0, -1):
        zkw[i] = min(zkw[i << 1], zkw[i << 1 | 1])

    ans = []
    for _ in range(q):
        o, a, b = map(int, e().split())
        if o == 1:
            i, v = a - 1, b
            i += n
            zkw[i] = v
            while i > 1:
                i >>= 1
                zkw[i] = min(zkw[i << 1], zkw[i << 1 | 1])
        else:
            s, t = a - 1, b
            s, t = s + n, t + n
            res = float("INF")
            while s < t:
                if s & 1:
                    res = min(res, zkw[s])
                    s += 1
                if t & 1:
                    t -= 1
                    res = min(res, zkw[t])
                s >>= 1
                t >>= 1
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Range Xor Queries](https://cses.fi/problemset/task/1650)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    from operator import xor
    e = stdin.readline

    n, q = map(int, e().split())
    pre = list(accumulate(map(int, e().split()), func=xor, initial=0))
    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        ans.append(pre[t] ^ pre[s - 1])
    print("\n".join(map(str, ans)))
main()
```

### [Range Update Queries](https://cses.fi/problemset/task/1651)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())

    l = [0]
    l.extend(map(int, e().split()))
    for i in range(n, 0, -1):
        l[i] -= l[i - 1]
    for i, v in enumerate(l):
        i += i & -i
        if i <= n:
            l[i] += v

    ans = []
    for _ in range(q):
        o: str = e()
        if o.startswith("1"):
            _, i, j, v = map(int, o.split())
            j += 1
            while i <= n:
                l[i] += v
                i += i & -i
            while j <= n:
                l[j] -= v
                j += j & -j
        else:
            _, i = map(int, o.split())
            res = 0
            ii = i
            while ii > 0:
                res += l[ii]
                ii -= ii & -ii
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Forest Queries](https://cses.fi/problemset/task/1652)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    from operator import add
    e = stdin.readline

    n, q = map(int, e().split())
    pre = [0] * (n + 1)
    l = [pre]
    for _ in range(n):
        pre = list(map(add, pre, accumulate((v == '*' for v in e()), initial=0)))
        l.append(pre)
    ans = []
    for _ in range(q):
        a, b, c, d = map(int, e().split())
        a, b = a-1, b-1
        ans.append(l[c][d] - l[a][d] - l[c][b] + l[a][b])
    print("\n".join(map(str, ans)))
main()
```

### [Hotel Queries](https://cses.fi/problemset/task/1143)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def build(pos, s, t):
        if s + 1 == t:
            tr[pos] = l[s]
        else:
            mid = (s + t) >> 1
            build(pos << 1, s, mid)
            build(pos << 1 | 1, mid, t)
            tr[pos] = max(tr[pos << 1], tr[pos << 1 | 1])

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    tr = [0] * (n * 3 + 5)
    build(1, 0, n)

    ans = []
    for v in map(int, e().split()):
        if v > tr[1]:
            ans.append(0)
        else:
            pos, s, t = 1, 0, n
            while s + 1 < t:
                mid = (s + t) >> 1
                pos <<= 1
                if tr[pos] >= v:
                    t = mid
                else:
                    pos |= 1
                    s = mid
            tr[pos] -= v
            while pos > 1:
                pos >>= 1
                tr[pos] = max(tr[pos << 1], tr[pos << 1 | 1])
            ans.append(s + 1)
    print(" ".join(map(str, ans)))
main()
```

### [List Removals](https://cses.fi/problemset/task/1749)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    hb = 1 << n.bit_length() - 1
    l = tuple(map(int, e().split()))
    bit = [i & -i for i in range(n + 1)]
    ans = []
    for v in map(int, e().split()):
        i, b = 0, hb
        while b:
            if i + b <= n and bit[i + b] < v:
                i += b
                v -= bit[i]
            b >>= 1
        ans.append(l[i])
        i += 1
        while i <= n:
            bit[i] -= 1
            i += i & -i
    print(*ans)
main()
```

### [Salary Queries](https://cses.fi/problemset/task/1144)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def add(i, v):
        while i < m:
            bit[i] += v
            i += i & -i

    def query(s, t):
        res = 0
        while t > s:
            res += bit[t]
            t &= t-1
        while s > t:
            res -= bit[s]
            s &= s-1
        return res

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    sl = l.copy()
    qs = [e() for _ in range(q)]
    for o in qs:
        if o.startswith("!"):
            sl.append(int(o.rsplit(maxsplit=1)[1]))
        else:
            s, t = map(int, o.split()[1:])
            sl.append(s - 1)
            sl.append(t)
    mp = {v: i for i, v in enumerate(sorted(set(sl)), 1)}
    m = len(mp) + 1
    bit = [0] * m
    for i in range(n):
        l[i] = mp[l[i]]
        add(l[i], 1)
    ans = []
    for o in qs:
        if o.startswith("!"):
            i, v = map(int, o.split()[1:])
            i -= 1
            add(l[i], -1)
            l[i] = mp[v]
            add(l[i], 1)
        else:
            s, t = map(int, o.split()[1:])
            ans.append(query(mp[s - 1], mp[t]))
    print("\n".join(map(str, ans)))
main()
```

### [Prefix Sum Queries](https://cses.fi/problemset/task/2166)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def merge(pos):
        sm[pos] = sm[pos << 1] + sm[pos << 1 | 1]
        zkw[pos] = max(zkw[pos << 1], sm[pos << 1] + zkw[pos << 1 | 1])

    n, q = map(int, e().split())
    sm = [0] * n
    sm += map(int, e().split())
    zkw = sm.copy()
    for i in range(n-1, 0, -1):
        merge(i)

    ans = []
    for _ in range(q):
        o, a, b = map(int, e().split())
        if o == 1:
            i, v = a - 1 + n, b
            sm[i] = zkw[i] = v
            while i > 1:
                i >>= 1
                merge(i)
        else:
            s, t = a - 1 + n, b + n
            le, ri = 0, 0
            pre = 0
            while s < t:
                if s & 1:
                    le = max(le, pre + zkw[s])
                    pre += sm[s]
                    s += 1
                if t & 1:
                    t -= 1
                    ri = max(sm[t] + ri, zkw[t])
                s >>= 1
                t >>= 1
            ans.append(max(le, pre + ri))
    print(*ans)
main()
```

### [Pizzeria Queries](https://cses.fi/problemset/task/2206)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    le = [0] * n
    ri = [0] * n
    le += (l[i] - i for i in range(n))
    ri += (l[i] + i for i in range(n))
    for i in range(n-1, 0, -1):
        le[i] = min(le[i << 1], le[i << 1 | 1])
        ri[i] = min(ri[i << 1], ri[i << 1 | 1])

    ans = []
    for _ in range(q):
        o: str = e()
        if o.startswith("1"):
            p, v = map(int, o.split()[1:])
            p -= 1
            i = p + n
            le[i] = v - p
            ri[i] = v + p
            while i > 1:
                i >>= 1
                le[i] = min(le[i << 1], le[i << 1 | 1])
                ri[i] = min(ri[i << 1], ri[i << 1 | 1])
        else:
            p = int(o.split()[1]) - 1
            lele = riri = float("INF")
            s, t = n, p + n
            while s < t:
                if s & 1:
                    lele = min(lele, le[s])
                    s += 1
                if t & 1:
                    t -= 1
                    lele = min(lele, le[t])
                s >>= 1
                t >>= 1
            s, t = p + n, n << 1
            while s < t:
                if s & 1:
                    riri = min(riri, ri[s])
                    s += 1
                if t & 1:
                    t -= 1
                    riri = min(riri, ri[t])
                s >>= 1
                t >>= 1
            ans.append(min(lele + p, riri - p))
    print("\n".join(map(str, ans)))
main()
```

### [Visible Buildings Queries](https://cses.fi/problemset/task/3304)

```python
def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split())) + [float("INF")]

    ans = [0] * q
    qs = [[] for _ in range(n)]
    for qi in range(q):
        s, t = map(int, e().split())
        ans[qi] = t
        qs[s - 1].append(qi)

    stk = []
    pi = n
    for i in range(n-1, -1, -1):
        v = l[i]
        while l[pi] <= v:
            pi = -stk.pop()
        stk.append(-pi)
        pi = i
        for qi in qs[i]:
            ans[qi] = len(stk) - bisect_right(stk, -ans[qi]) + 1
    print("\n".join(map(str, ans)))
main()
```

### [Range Interval Queries](https://cses.fi/problemset/task/3163)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def pack(a, b):
        return a << 20 | b

    def unpack(x):
        return x >> 20, x & 0xfffff

    n, q = map(int, e().split())
    l = list(map(int, e().split())) + [0x3f3f3f3f]
    sl = [pack(l[i], i) for i in range(n + 1)]
    sl.sort()
    qs = []
    sq = []
    for i in range(q):
        a, b, c, d = map(int, e().split())
        qs.append((a-1, b))
        sq.append(pack(c-1, i << 1 | 1))
        sq.append(pack(d, i << 1))
    sq.sort()

    ans = [0] * q
    bit = [0] * (n + 1)
    qi = 0
    for i in sl:
        v, i = unpack(i)
        v <<= 20
        while qi < q * 2 and sq[qi] < v:
            ai = sq[qi] & 0xfffff
            sign = -1 if ai & 1 else 1
            ai >>= 1
            s, t = qs[ai]
            res = 0
            while t > s:
                res += bit[t]
                t &= t-1
            while s > t:
                res -= bit[s]
                s &= s-1
            ans[ai] += res * sign
            qi += 1
        i += 1
        while i <= n:
            bit[i] += 1
            i += i & -i
    print("\n".join(map(str, ans)))
main()
```

### [Subarray Sum Queries](https://cses.fi/problemset/task/1190)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def merge(i: int) -> None:
        sm[i] = sm[i << 1] + sm[i << 1 | 1]
        le[i] = max(le[i << 1], sm[i << 1] + le[i << 1 | 1])
        ri[i] = max(ri[i << 1] + sm[i << 1 | 1], ri[i << 1 | 1])
        dp[i] = max(dp[i << 1], dp[i << 1 | 1], ri[i << 1] + le[i << 1 | 1])

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    sm = [0] * n + l
    le = [0] * n + l
    ri = [0] * n + l
    dp = [0] * n + l
    for i in range(n-1, 0, -1):
        merge(i)

    ql, qr = [], []
    s, t = n, n << 1
    while s < t:
        if s & 1:
            ql.append(s)
            s += 1
        if t & 1:
            t -= 1
            qr.append(t)
        s >>= 1
        t >>= 1

    ans = []
    for _ in range(q):
        i, v = map(int, e().split())
        i += n-1
        sm[i] = le[i] = ri[i] = dp[i] = v
        while i > 1:
            i >>= 1
            merge(i)
        res = d = p = 0
        for i in ql:
            res = max(res, dp[i], d + le[i])
            d = max(d + sm[i], ri[i])
        for i in qr:
            res = max(res, dp[i], ri[i] + p)
            p = max(sm[i] + p, le[i])
        res = max(res, d + p)
        ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Subarray Sum Queries II](https://cses.fi/problemset/task/3226)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def merge(i: int) -> None:
        sm[i] = sm[i << 1] + sm[i << 1 | 1]
        le[i] = max(le[i << 1], sm[i << 1] + le[i << 1 | 1])
        ri[i] = max(ri[i << 1] + sm[i << 1 | 1], ri[i << 1 | 1])
        dp[i] = max(dp[i << 1], dp[i << 1 | 1], ri[i << 1] + le[i << 1 | 1])

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    sm = [0] * n + l
    le = [0] * n + l
    ri = [0] * n + l
    dp = [0] * n + l
    for i in range(n-1, 0, -1):
        merge(i)

    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        s, t = s + n-1, t + n
        res = d = p = 0
        while s < t:
            if s & 1:
                res = max(res, dp[s], d + le[s])
                d = max(d + sm[s], ri[s])
                s += 1
            if t & 1:
                t -= 1
                res = max(res, dp[t], ri[t] + p)
                p = max(sm[t] + p, le[t])
            s >>= 1
            t >>= 1
        res = max(res, d + p)
        ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Distinct Values Queries](https://cses.fi/problemset/task/1734)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    qs = [[] for _ in range(n)]
    for i in range(q):
        s, t = map(int, e().split())
        qs[t-1].append((s-1, i))

    last = dict.fromkeys(l, -1)
    bit = [0] * (n + 1)
    ans = [0] * q
    cur = 0
    for i in range(n):
        v = l[i]
        if ~(pi := last[v]):
            cur -= 1
            x = pi + 1
            while x <= n:
                bit[x] -= 1
                x += x & -x
        cur += 1
        last[v] = i
        x = i + 1
        while x <= n:
            bit[x] += 1
            x += x & -x
        for s, ai in qs[i]:
            res = cur
            while s:
                res -= bit[s]
                s &= s-1
            ans[ai] = res
    print("\n".join(map(str, ans)))
main()
```

### [Distinct Values Queries II](https://cses.fi/problemset/task/3356)

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    from collections import defaultdict
    e = stdin.readline
    LOAD = 1000

    def SortedList():
        return [[-1, n]], [n]

    def expand(sl, mx, i):
        if len(sl[i]) > LOAD << 1:
            chunk = sl[i]
            sl.insert(i + 1, chunk[LOAD:])
            mx.insert(i + 1, chunk[-1])
            del chunk[LOAD:]
            mx[i] = chunk[-1]

    def add(sl, mx, v):
        i = bisect_left(mx, v)
        chunk = sl[i]
        j = bisect_left(chunk, v)
        if j:
            pv = chunk[j - 1]
        else:
            pv = sl[i - 1][-1]
        update(v, pv)
        if j < len(chunk):
            nv = chunk[j]
        else:
            nv = sl[i + 1][0]
        if nv < n:
            update(nv, v)
        chunk.insert(j, v)
        mx[i] = chunk[-1]
        expand(sl, mx, i)

    def remove(sl, mx, v):
        i = bisect_left(mx, v)
        chunk = sl[i]
        j = bisect_left(chunk, v)
        del chunk[j]
        if j < len(chunk):
            nv = chunk[j]
        else:
            nv = sl[i + 1][0]
        if nv < n:
            update(nv, zkw[n + v])
        if len(chunk) >= LOAD >> 1:
            mx[i] = chunk[-1]
        elif len(sl) > 1:
            if i: i -= 1
            sl[i] += chunk
            mx[i] = chunk[-1]
            del sl[i + 1]
            del mx[i + 1]
            expand(sl, mx, i)
        else:
            mx[i] = chunk[-1]

    def merge(i):
        zkw[i] = max(zkw[i << 1], zkw[i << 1 | 1])

    def update(i, v):
        i += n
        zkw[i] = v
        while i > 1:
            i >>= 1
            merge(i)

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    mp = defaultdict(SortedList)
    zkw = [-1] * (n << 1)
    for i in range(n):
        v = l[i]
        sl, mx = mp[v]
        chunk = sl[-1]
        pi = chunk[-2]
        update(i, pi)
        chunk.insert(-1, i)
        expand(sl, mx, len(sl) - 1)

    ans = []
    for _ in range(q):
        o, a, b = map(int, e().split())
        a -= 1
        if o == 1:
            i, nv = a, b
            v = l[i]
            l[i] = nv
            remove(*mp[v], i)
            add(*mp[nv], i)
        else:
            s, t = a + n, b + n
            while s < t:
                if s & 1:
                    if zkw[s] >= a:
                        ans.append("NO")
                        break
                    s += 1
                if t & 1:
                    t -= 1
                    if zkw[t] >= a:
                        ans.append("NO")
                        break
                s >>= 1
                t >>= 1
            else:
                ans.append("YES")
                continue
    print("\n".join(ans))
main()
```

### [Increasing Array Queries](https://cses.fi/problemset/task/2416)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    def add(i, v):
        i += 1
        vi = v * i
        while i <= n:
            bit0[i] += v
            bit1[i] += vi
            i += i & -i

    def query(i):
        v = vi = 0
        x = i + 1
        while i:
            v += bit0[i]
            vi += bit1[i]
            i &= i-1
        return x * v - vi

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    p = list(accumulate(l, initial=0))

    qs = [[] for _ in range(n)]
    for i in range(q):
        s, t = map(int, e().split())
        s -= 1
        qs[s].append((t, i))

    ans = [0] * q
    bit0 = [0] * (n + 1)
    bit1 = [0] * (n + 1)
    stk = []
    pi, pv = n, float("INF")
    for i in range(n - 1, -1, -1):
        v = l[i]
        add(i, v)
        add(pi, -v)
        while pv < v:
            d = v - pv
            add(pi, d)
            pi, pv = stk.pop()
            add(pi, -d)
        stk.append((pi, pv))
        pi, pv = i, v
        for t, ai in qs[i]:
            s = i
            ans[ai] = p[i] - p[t] + query(t) - query(s)
    print("\n".join(map(str, ans)))
main()
```

### [Movie Festival Queries](https://cses.fi/problemset/task/1664)

```python
def main():
    from sys import stdin
    e = stdin.readline
    m = 10**6 + 1
    bl = m.bit_length()
    max = lambda a, b: a if a >= b else b

    n, q = map(int, e().split())
    dp = [[0] * m for _ in range(bl)]
    cur = dp[0]
    for _ in range(n):
        s, t = map(int, e().split())
        cur[t] = max(cur[t], s)
    le = 0
    for i in range(1, m):
        le = cur[i] = max(cur[i], le)
    pre = cur
    for k in range(1, bl):
        if not pre[-1]:
            bl = k
            break
        cur = dp[k]
        le = 0
        for i in range(1, m):
            le = cur[i] = max(le, pre[pre[i]])
        pre = cur
    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        res = 0
        for k in range(bl-1, -1, -1):
            if dp[k][t] >= s:
                t = dp[k][t]
                res |= 1 << k
        ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Forest Queries II](https://cses.fi/problemset/task/1739)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = [[0]] + [[0] + [1 if v == "*" else 0 for v in e().rstrip()] for _ in range(n)]
    bit = [row.copy() for row in l]
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            jj = j + (j & -j)
            if jj <= n:
                bit[i][jj] += bit[i][j]
    for i in range(1, n + 1):
        ii = i + (i & -i)
        if ii <= n:
            for j in range(1, n + 1):
                bit[ii][j] += bit[i][j]
    ans = []
    for _ in range(q):
        o, *oo = map(int, e().split())
        if o == 1:
            i, j = oo
            v = -1 if l[i][j] else 1
            l[i][j] += v
            while i <= n:
                jj = j
                while jj <= n:
                    bit[i][jj] += v
                    jj += jj & -jj
                i += i & -i
        else:
            a, b, c, d = oo
            a, b = a-1, b-1
            res = 0
            while c > a:
                s, t = b, d
                while t > s:
                    res += bit[c][t]
                    t &= t-1
                while s > t:
                    res -= bit[c][s]
                    s &= s-1
                c &= c-1
            while a > c:
                s, t = b, d
                while t > s:
                    res -= bit[a][t]
                    t &= t-1
                while s > t:
                    res += bit[a][s]
                    s &= s-1
                a &= a-1
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Range Updates and Sums](https://cses.fi/problemset/task/1735)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def merge(i, h=0):
        if tag[i] < 0:
            zkw[i] = -tag[i] << h
        else:
            zkw[i] = zkw[i << 1] + zkw[i << 1 | 1] + (tag[i] << h)

    def update(i, v, h):
        if v > 0:
            zkw[i] += v << h
            if h:
                tag[i] += v if tag[i] >= 0 else -v
        elif v < 0:
            zkw[i] = -v << h
            if h:
                tag[i] = v

    def push(i):
        for h in range(lg, 0, -1):
            j = i >> h
            if not tag[j]: continue
            update(j << 1 | 0, tag[j], h - 1)
            update(j << 1 | 1, tag[j], h - 1)
            tag[j] = 0

    def pull(i):
        h = 0
        while i > 1:
            i >>= 1
            h += 1
            merge(i, h)

    def modify(s, t, v):
        s, t = s + n, t + n
        push(s), push(t - 1)
        ss, tt = s, t
        h = 0
        while s < t:
            if s & 1:
                update(s, v, h)
                s += 1
            if t & 1:
                t -= 1
                update(t, v, h)
            s >>= 1
            t >>= 1
            h += 1
        pull(ss), pull(tt - 1)

    def query(s, t):
        s, t = s + n, t + n
        push(s), push(t - 1)
        res = 0
        while s < t:
            if s & 1:
                res += zkw[s]
                s += 1
            if t & 1:
                t -= 1
                res += zkw[t]
            s >>= 1
            t >>= 1
        return res

    n, q = map(int, e().split())
    lg = n.bit_length()
    zkw = [0] * n
    tag = [0] * n
    zkw += map(int, e().split())
    for i in range(n-1, 0, -1):
        merge(i)

    ans = []
    for _ in range(q):
        o, s, t, *v = map(int, e().split())
        s -= 1
        if o == 1:
            modify(s, t, v[0])
        elif o == 2:
            modify(s, t, -v[0])
        else:
            ans.append(query(s, t))
    print("\n".join(map(str, ans)))
main()
```

### [Polynomial Queries](https://cses.fi/problemset/task/1736)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    """
    x = i - j

    (x² + 3x + 2) / 2
    (i² + j² - 2ij + 3i - 3j + 2) / 2
    (i² + (-2j+3)i + (j-1)(j-2)) / 2

    (x + 1)
    (i + (-j+1))
    """

    def add(i, v, fix=0):
        a = v
        b = v * (-2*i + 3)
        c = v * (i-1)*(i-2)
        b -= fix << 1
        c -= fix * (-i + 1) << 1
        while i <= n:
            bit_a[i] += a
            bit_b[i] += b
            bit_c[i] += c
            i += i & -i

    def query(i):
        a = b = c = 0
        x = i
        while i:
            a += bit_a[i]
            b += bit_b[i]
            c += bit_c[i]
            i &= i-1
        return a*x*x + b*x + c >> 1

    n, q = map(int, e().split())
    p = list(accumulate(map(int, e().split()), initial=0))
    bit_a = [0] * (n + 1)
    bit_b = [0] * (n + 1)
    bit_c = [0] * (n + 1)

    ans = []
    for _ in range(q):
        o, s, t = map(int, e().split())
        if o == 1:
            add(s, 1)
            add(t + 1, -1, t - s + 1)
        else:
            ans.append(query(t) - query(s - 1) + p[t] - p[s - 1])
    print("\n".join(map(str, ans)))
main()
```

### [Range Queries and Copies](https://cses.fi/problemset/task/1737)

```python
def main():
    from sys import stdin
    e = stdin.readline
    VAL, LE, RI = range(3)
    new_node = lambda: [0, None, None]

    def pull(node):
        node[VAL] = node[LE][VAL] + node[RI][VAL]

    def build(node, s, t):
        if s + 1 == t:
            node[VAL] = l[s]
        else:
            mid = s + t >> 1
            node[LE] = build(new_node(), s, mid)
            node[RI] = build(new_node(), mid, t)
            pull(node)
        return node

    def modify(node, s, t, idx, val):
        node = node.copy()
        if s + 1 == t:
            node[VAL] = val
        else:
            mid = s + t >> 1
            if idx < mid:
                node[LE] = modify(node[LE], s, mid, idx, val)
            else:
                node[RI] = modify(node[RI], mid, t, idx, val)
            pull(node)
        return node

    def query(node, s, t, qs, qt):
        if qt <= s or  t <= qs:
            return 0
        if qs <= s and t <= qt:
            return node[VAL]
        mid = s + t >> 1
        res = 0
        res += query(node[LE], s, mid, qs, qt)
        res += query(node[RI], mid, t, qs, qt)
        return res

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    roots = [new_node()]
    build(roots[0], 0, n)

    ans = []
    for _ in range(q):
        o, *oo = map(int, e().split())
        if o == 1:
            ver, idx, val = oo
            ver, idx = ver-1, idx-1
            roots[ver] = modify(roots[ver], 0, n, idx, val)
        elif o == 2:
            ver, s, t = oo
            ver, s = ver-1, s-1
            ans.append(query(roots[ver], 0, n, s, t))
        else:
            ver = oo[0] - 1
            roots.append(roots[ver])
    print("\n".join(map(str, ans)))
main()
```

### [Missing Coin Sum Queries](https://cses.fi/problemset/task/2184)

```python
# O((n + q) log n log C)
# TODO: O(n log n + q log C)
# https://cses.fi/problemset/hack/2184/entry/13577433/

def main():
    from sys import stdin
    e = stdin.readline
    inf = float("INF")
    lg = lambda x: x.bit_length() - 1

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    bl = max(l).bit_length()
    zkw = [[inf] * (n << 1) for _ in range(bl)]
    pre = [[0] * (n + 1) for _ in range(bl)]
    for i in range(n):
        v = l[i]
        k = lg(v)
        zkw[k][i + n] = pre[k][i + 1] = v
    for k in range(bl):
        row = pre[k]
        for i in range(1, n + 1):
            row[i] += row[i - 1]
        row = zkw[k]
        for i in range(n-1, 0, -1):
            row[i] = min(row[i << 1], row[i << 1 | 1])

    ans = []
    for _ in range(q):
        s, t = map(int, e().split())
        s -= 1
        target = lim = 1
        for k in range(bl):
            lim <<= 1
            if target < lim:
                row = zkw[k]
                ss, tt = s + n, t + n
                while ss < tt:
                    if ss & 1:
                        if row[ss] <= target:
                            break
                        ss += 1
                    if tt & 1:
                        tt -= 1
                        if row[tt] <= target:
                            break
                    ss >>= 1
                    tt >>= 1
                else:
                    break
            target += pre[k][t] - pre[k][s]
        ans.append(target)
    print("\n".join(map(str, ans)))
main()
```

## Tree Algorithms

### [Subordinates](https://cses.fi/problemset/task/1674)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    pa = [-1] + [int(i) - 1 for i in e().split()]
    indeg = [0] * n
    for i in range(1, n):
        indeg[pa[i]] += 1
    dp = [0] * n
    q = [i for i, v in enumerate(indeg) if v == 0]
    for i in q:
        p = pa[i]
        dp[p] += 1 + dp[i]
        indeg[p] -= 1
        if p and indeg[p] == 0:
            q.append(p)
    print(*dp)
main()
```

### [Tree Matching](https://cses.fi/problemset/task/1130)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n-1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)
    pa = [-1] * n
    q = [0]
    for i in q:
        p = pa[i]
        for j in G[i]:
            if j == p: continue
            pa[j] = i
            q.append(j)
    ans = 0
    used = [False] * n
    for i in reversed(q):
        if not i: continue
        if used[i]: continue
        p = pa[i]
        if used[p]: continue
        ans += 1
        used[p] = True
    print(ans)
main()
```

### [Tree Diameter](https://cses.fi/problemset/task/1131)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    flag = [0] * n
    flag[0] = 1
    cur = [0]
    while cur:
        nxt = []
        for i in cur:
            for j in G[i]:
                if flag[j] == 1: continue
                flag[j] ^= 1
                nxt.append(j)
        cur = nxt

    flag[i] = 0
    cur = [i]
    ans = -1
    while cur:
        nxt = []
        for i in cur:
            for j in G[i]:
                if flag[j] == 0: continue
                flag[j] ^= 1
                nxt.append(j)
        cur = nxt
        ans += 1
    print(ans)
main()
```

### [Tree Distances I](https://cses.fi/problemset/task/1132)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    flag = [0] * n
    flag[0] = 1
    cur = [0]
    while cur:
        nxt = []
        for i in cur:
            for j in G[i]:
                if flag[j] == 1: continue
                flag[j] ^= 1
                nxt.append(j)
        cur = nxt

    dis = [0] * n

    flag[i] = 0
    cur = [i]
    step = 0
    while cur:
        nxt = []
        for i in cur:
            dis[i] = step
            for j in G[i]:
                if flag[j] == 0: continue
                flag[j] ^= 1
                nxt.append(j)
        cur = nxt
        step += 1

    flag[i] = 1
    cur = [i]
    step = 0
    while cur:
        nxt = []
        for i in cur:
            dis[i] = max(dis[i], step)
            for j in G[i]:
                if flag[j] == 1: continue
                flag[j] ^= 1
                nxt.append(j)
        cur = nxt
        step += 1
    print(*dis)
main()
```

### [Tree Distances II](https://cses.fi/problemset/task/1133)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    pa = [-1] * n
    q = [0]
    for i in q:
        p = pa[i]
        for j in G[i]:
            if j == p: continue
            pa[j] = i
            q.append(j)
    siz = [1] * n
    ans = [0] * n
    for i in reversed(q):
        if not i: continue
        p = pa[i]
        siz[p] += siz[i]
        ans[p] += ans[i] + siz[i]
    for i in q:
        if not i: continue
        p = pa[i]
        ans[i] = ans[p] + n - siz[i] * 2
    print(*ans)
main()
```

### [Company Queries I](https://cses.fi/problemset/task/1687)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for i, p in enumerate(map(int, e().split()), 1):
        p -= 1
        G[p].append(i)
    for i, it in enumerate(G):
        G[i] = iter(it)

    qs = [[] for _ in range(n)]
    ans = [0] * q
    for qi in range(q):
        i, k = map(int, e().split())
        i -= 1
        if i == 0:
            ans[qi] = -1
        else:
            ans[qi] = k
            qs[i].append(qi)

    stk = [0]
    while stk:
        i = stk[-1]
        for j in G[i]:
            for ai in qs[j]:
                k = ans[ai]
                ans[ai] = -1 if k > len(stk) else stk[-k] + 1
            stk.append(j)
            break
        else:
            stk.pop()
    print("\n".join(map(str, ans)))
main()
```

### [Company Queries II](https://cses.fi/problemset/task/1688)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for i, p in enumerate(map(int, e().split()), 1):
        p -= 1
        G[p].append(i)

    qs = [[] for _ in range(n)]
    ans = [0] * q
    for qi in range(q):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        if a == b:
            ans[qi] = a + 1
        else:
            ans[qi] = a ^ b
            qs[a].append(qi)
            qs[b].append(qi)

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    dsu = [-1] * n
    pa = [-1] * n
    top = [-1] * n
    stk = [0]
    while stk:
        i = stk.pop()
        if i >= 0:
            top[i] = i
            for ai in qs[i]:
                j = ans[ai] ^ i
                if top[j] == -1: continue
                ans[ai] = top[find(j)] + 1
            stk.append(~i)
            for j in G[i]:
                pa[j] = i
                stk.append(j)
        else:
            i = ~i
            if not i: continue
            ri, rp = find(i), find(pa[i])
            top[ri] = top[rp]
            if dsu[rp] == dsu[ri]: dsu[rp] -= 1
            elif dsu[rp] > dsu[ri]: rp, ri = ri, rp
            dsu[ri] = rp
    print("\n".join(map(str, ans)))
main()
```

### [Distance Queries](https://cses.fi/problemset/task/1135)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    qs = [[] for _ in range(n)]
    ans = [0] * q
    for qi in range(q):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        if a == b:
            ans[qi] = 0
        else:
            ans[qi] = a ^ b
            qs[a].append(qi)
            qs[b].append(qi)

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    dsu = [-1] * n
    top = [-1] * n
    dep = [0] * n
    pa = [-1] * n
    stk = [0]
    while stk:
        i = stk.pop()
        if i >= 0:
            top[i] = i
            p, nd = pa[i], dep[i] + 1
            for ai in qs[i]:
                j = ans[ai] ^ i
                if top[j] == -1: continue
                ans[ai] = dep[i] + dep[j] - dep[top[find(j)]] * 2
            stk.append(~i)
            for j in G[i]:
                if j == p: continue
                pa[j] = i
                dep[j] = nd
                stk.append(j)
        else:
            i = ~i
            if not i: continue
            ri, rp = find(i), find(pa[i])
            top[ri] = top[rp]
            if dsu[rp] == dsu[ri]: dsu[rp] -= 1
            elif dsu[rp] > dsu[ri]: rp, ri = ri, rp
            dsu[ri] = rp
    print("\n".join(map(str, ans)))
main()
```

### [Counting Paths](https://cses.fi/problemset/task/1136)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    ans = [0] * n
    qs = [[] for _ in range(n)]
    for qi in range(q):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        if a == b == 0:
            ans[0] += 1
        else:
            ans[a] += 1
            ans[b] += 1
            qs[a].append(b)
            if a != b: qs[b].append(a)

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    dsu = [-1] * n
    top = [-1] * n
    pa = [-1] * n
    stk = [0]
    while stk:
        i = stk.pop()
        if i >= 0:
            p = pa[i]
            top[i] = i
            for j in qs[i]:
                if top[j] == -1: continue
                a = top[find(j)]
                ans[a] -= 1
                if a: ans[pa[a]] -= 1
            stk.append(~i)
            for j in G[i]:
                if j == p: continue
                pa[j] = i
                stk.append(j)
        else:
            i = ~i
            if not i: continue
            p = pa[i]
            ans[p] += ans[i]
            ri, rp = find(i), find(p)
            top[ri] = top[rp]
            if dsu[rp] == dsu[ri]: dsu[rp] -= 1
            elif dsu[rp] > dsu[ri]: rp, ri = ri, rp
            dsu[ri] = rp
    print(" ".join(map(str, ans)))
main()
```

### [Subtree Queries](https://cses.fi/problemset/task/1137)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    stk = [0]
    bit = [0] * (n + 1)
    tin = [0] * n
    tout = [0] * n
    pa = [-1] * n
    t = 0
    while stk:
        i = stk.pop()
        if i >= 0:
            p = pa[i]
            tin[i] = t
            t += 1
            bit[t] = l[i]
            stk.append(~i)
            for j in G[i]:
                if j == p: continue
                pa[j] = i
                stk.append(j)
        else:
            i = ~i
            tout[i] = t
    for i in range(1, n):
        ii = i + (i & -i)
        if ii <= n:
            bit[ii] += bit[i]

    ans = []
    for _ in range(q):
        o, *oo = map(int, e().split())
        if o == 1:
            i, v = oo
            i -= 1
            d = v - l[i]
            l[i] = v
            i = tin[i] + 1
            while i <= n:
                bit[i] += d
                i += i & -i
        else:
            i = oo[0] - 1
            s, t = tin[i], tout[i]
            res = 0
            while t > s:
                res += bit[t]
                t &= t-1
            while s > t:
                res -= bit[s]
                s &= s-1
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Path Queries](https://cses.fi/problemset/task/1138)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    stk = [0]
    bit = [0] * (n + 1)
    tin = [0] * n
    tout = [0] * n
    pa = [-1] * n
    t = 0
    while stk:
        i = stk.pop()
        if i >= 0:
            p = pa[i]
            tin[i] = t
            t += 1
            bit[t] += l[i]
            stk.append(~i)
            for j in G[i]:
                if j == p: continue
                pa[j] = i
                stk.append(j)
        else:
            i = ~i
            if t < n: bit[t + 1] -= l[i]
            tout[i] = t
    for i in range(1, n):
        ii = i + (i & -i)
        if ii <= n:
            bit[ii] += bit[i]

    ans = []
    for _ in range(q):
        o, *oo = map(int, e().split())
        if o == 1:
            i, v = oo
            i -= 1
            d = v - l[i]
            l[i] = v
            x = tin[i] + 1
            while x <= n:
                bit[x] += d
                x += x & -x
            x = tout[i] + 1
            while x <= n:
                bit[x] -= d
                x += x & -x
        else:
            i = oo[0] - 1
            res = 0
            x = tin[i] + 1
            while x:
                res += bit[x]
                x &= x - 1
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Path Queries II](https://cses.fi/problemset/task/2134)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    pa = [0] * n
    deg = [0] * n
    deg[0] = 2
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        pa[a] ^= b
        pa[b] ^= a
        deg[a] += 1
        deg[b] += 1

    siz = [1] * n
    ch = [-1] * n
    top_down = [0] * n
    idx = n
    for i in range(n):
        while deg[i] == 1:
            deg[i] = -1
            idx -= 1
            top_down[idx] = i
            p = pa[i]
            s = siz[i]
            siz[p] += s
            if ch[p] == -1 or s > siz[ch[p]]:
                ch[p] = i
            pa[p] ^= i
            deg[p] -= 1
            i = p

    top = [-1] * n
    dfn = [-1] * n
    zkw = [0] * (n << 1)
    t = 0
    for i in top_down:
        if dfn[i] != -1: continue
        tt = i
        while i != -1:
            top[i] = tt
            zkw[t + n] = l[i]
            dfn[i] = t
            t += 1
            i = ch[i]
    for i in range(n - 1, 0, -1):
        zkw[i] = max(zkw[i << 1], zkw[i << 1 | 1])

    def query(s, t):
        res = 0
        s, t = s + n, t + n
        while s < t:
            if s & 1:
                res = max(res, zkw[s])
                s += 1
            if t & 1:
                t -= 1
                res = max(res, zkw[t])
            s >>= 1
            t >>= 1
        return res

    ans = []
    for _ in range(q):
        o, a, b = map(int, e().split())
        if o == 1:
            i, v = a - 1, b
            i = dfn[i] + n
            zkw[i] = v
            while i > 1:
                i >>= 1
                zkw[i] = max(zkw[i << 1], zkw[i << 1 | 1])
        else:
            res = 0
            a, b = a - 1, b - 1
            while top[a] != top[b]:
                if dfn[top[a]] < dfn[top[b]]: a, b = b, a
                res = max(res, query(dfn[top[a]], dfn[a] + 1))
                a = pa[top[a]]
            if dfn[a] < dfn[b]: a, b = b, a
            res = max(res, query(dfn[b], dfn[a] + 1))
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Distinct Colors](https://cses.fi/problemset/task/1139)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    u = [{int(v)} for v in e().split()]
    deg = [0] * n
    deg[0] = 2
    pa = [0] * n
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        deg[a] += 1
        deg[b] += 1
        pa[a] ^= b
        pa[b] ^= a

    ans = [0] * n
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            ui = u[i]
            ans[i] = len(ui)
            p = pa[i]
            up = u[p]
            if len(up) < len(ui): up, ui = ui, up
            up.update(ui)
            u[p] = up
            pa[p] ^= i
            deg[p] -= 1
            i = p
    ans[0] = len(u[0])
    print(*ans)
main()
```

### [Finding a Centroid](https://cses.fi/problemset/task/2079)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    pa = [-1] * n
    mx = [0] * n
    q = [0]
    for i in q:
        p = pa[i]
        for j in G[i]:
            if j == p: continue
            pa[j] = i
            q.append(j)
    siz = [1] * n
    for i in reversed(q):
        if not i: continue
        s, p = siz[i], pa[i]
        siz[p] += s
        mx[p] = max(mx[p], s)

    print(next(i + 1 for i in range(n) if max(n - siz[i], mx[i]) << 1 <= n))
main()
```

### [Fixed-Length Paths I](https://cses.fi/problemset/task/2080)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    pa = [0] * n
    deg = [0] * n
    deg[0] = 2
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        deg[a] += 1
        deg[b] += 1
        pa[a] ^= b
        pa[b] ^= a

    l = [[1] for _ in range(n)]

    ans = 0
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            y = l[i]
            y.append(0)
            p = pa[i]
            x = l[p]
            # merge x y -> x
            if len(x) < len(y): x, y = y, x
            xs, ys = len(x), len(y)
            for idx in range(ys):
                if 0 <= k - idx < xs:
                    ans += x[~(k - idx)] * y[~idx]
            for idx in range(ys):
                x[~idx] += y[~idx]
            l[p] = x
            pa[p] ^= i
            deg[p] -= 1
            i = p
    print(ans)
main()
```

### [Fixed-Length Paths II](https://cses.fi/problemset/task/2081)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, lo, hi = map(int, e().split())
    pa = [0] * n
    deg = [0] * n
    deg[0] = 2
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        deg[a] += 1
        deg[b] += 1
        pa[a] ^= b
        pa[b] ^= a

    l = [[1] for _ in range(n)]

    def get(suf, i):
        if i >= len(suf):
            return 0
        if i < 0:
            return suf[-1]
        return suf[~i]

    ans = 0
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            y = l[i]
            y.append(y[-1])
            p = pa[i]
            x = l[p]
            # merge x y -> x
            if len(x) < len(y): x, y = y, x
            xs, ys = len(x), len(y)
            for idx in range(ys):
                ans += ((get(x, lo - idx) - get(x, hi - idx + 1))
                        * (get(y, idx) - get(y, idx + 1)))
            for idx in range(ys):
                x[~idx] += y[~idx]
            l[p] = x
            pa[p] ^= i
            deg[p] -= 1
            i = p
    print(ans)
main()
```

## Mathematics

### [Josephus Queries](https://cses.fi/problemset/task/2164)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def f(n, k):
        if n == 1:
            return 1
        cur = (n + 1) >> 1
        if k <= cur:
            ret = k << 1
            if ret > n: ret %= n
            return ret
        return 2 * f(n >> 1, k - cur) + (1 if n & 1 else -1)

    ans = []
    for _ in range(int(e())):
        ans.append(f(*map(int, e().split())))
    print("\n".join(map(str, ans)))
main()
```

### [Exponentiation](https://cses.fi/problemset/task/1095)

```python
print("\n".join(str(pow(*map(int, input().split()), 10**9 + 7)) for _ in range(int(input()))))
```

### [Exponentiation II](https://cses.fi/problemset/task/1712)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    # a ^ k % m = a ^ (k % phi(m)) % m
    # phi(m) = m - 1 if m is prime

    ans = []
    for _ in range(int(e())):
        a, b, c = map(int, e().split())
        ans.append(pow(a, pow(b, c, mod - 1), mod))
    print("\n".join(map(str, ans)))
main()
```

### [Counting Divisors](https://cses.fi/problemset/task/1713)

```python
def main():
    from sys import stdin
    e = stdin.readline

    lim = 10**6 + 1
    fac_num = [1] * lim  # 1
    for d in range(2, lim):
        for m in range(d, lim, d):
            fac_num[m] += 1

    ans = []
    for _ in range(int(e())):
        ans.append(fac_num[int(e())])
    print("\n".join(map(str, ans)))
main()
```

### [Common Divisors](https://cses.fi/problemset/task/1081)

```python
def main():
    from sys import stdin
    e = stdin.readline

    lim = 10**6 + 1

    n = int(e())
    freq = [0] * lim
    for v in map(int, e().split()):
        freq[v] += 1

    for d in reversed(range(lim)):
        cnt = 0
        for m in range(d, lim, d):
            cnt += freq[m]
            if cnt >= 2:
                print(d)
                return

    print(1)
main()
```

### [Sum of Divisors](https://cses.fi/problemset/task/1082)

```python
def main():
    mod = 10**9 + 7

    # sum i:1~n sigma(i) = sum d:1~n d*floor(n/d)

    n = int(input())
    ans = 0
    le, ri = 1, 0  # [le, ri]
    while le <= n:
        ri = n // (n // le)
        ans += (le + ri) * (ri - le + 1) * (n // le) >> 1
        le = ri + 1
    print(ans % mod)
main()
```

### [Divisor Analysis](https://cses.fi/problemset/task/2182)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    n = 1
    cnt = cnt2 = tot = 1
    sqrt = 1
    for _ in range(int(e())):
        p, c = map(int, e().split())
        p_c = pow(p, c, mod)
        n = n * p_c % mod
        sqrt = sqrt * pow(p, c >> 1, mod) % mod
        cnt = cnt * (c + 1) % mod
        cnt2 = cnt2 * (c + 1) % (2 * (mod - 1))
        tot = tot * (p_c * p - 1) * pow(p - 1, -1, mod) % mod
    mul = pow(n, (cnt2 >> 1 % (mod - 1)), mod) * (sqrt if cnt2 & 1 else 1) % mod
    print(cnt, tot, mul)
main()
```

### [Prime Multiples](https://cses.fi/problemset/task/2185)

```python
def main():
    from sys import stdin
    from itertools import combinations
    from functools import reduce
    from operator import mul
    e = stdin.readline

    n, k = map(int, e().split())
    ps = list(map(int, e().split()))
    ans = 0
    for r in range(1, k + 1):
        sign = 1 if r & 1 else -1
        for c in combinations(ps, r):
            ans += sign * (n // reduce(mul, c))
    print(ans)
main()
```

### [Counting Coprime Pairs](https://cses.fi/problemset/task/2417)

```python
def main():
    from sys import stdin
    e = stdin.readline
    lim = 10**6 + 1

    e()  # n
    freq = [0] * lim
    for v in map(int, e().split()):
        freq[v] += 1

    f = [0] * lim
    for d in range(1, lim):
        for m in range(d, lim, d):
            f[d] += freq[m]
        f[d] = f[d] * (f[d] - 1) >> 1

    for d in range(lim - 1, 0, -1):
        for m in range(d << 1, lim, d):
            f[d] -= f[m]
    print(f[1])
main()
```

### [Next Prime](https://cses.fi/problemset/task/3396)

```python
def main():
    from sys import stdin
    from itertools import count
    e = stdin.readline

    ps = (2, 3, 5, 7, 11)

    def is_prime(n):
        if n < 2: return False
        if n & 1 == 0: return n == 2
        for p in ps:
            if n % p == 0:
                return n == p

        d = n - 1
        r = (d & -d).bit_length() - 1
        d >>= r

        for a in ps:
            if a % n == 0: continue
            x = pow(a, d, n)
            if x == 1 or x == n-1:
                continue
            for _ in range(r - 1):
                x = x * x % n
                if x == n-1: break
            else:
                return False
        return True

    ans = []
    for _ in range(int(e())):
        ans.append(next(filter(is_prime, count(int(e()) + 1))))
    print("\n".join(map(str, ans)))
main()
```

### [Binomial Coefficients](https://cses.fi/problemset/task/1079)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7
    e = stdin.readline

    lim = 10**6 + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(lim-1, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]

    ans = []
    for _ in range(int(e())):
        n, m = map(int, e().split())
        ans.append(fac[n] * inv[m] * inv[n - m] % mod)
    print("\n".join(map(str, ans)))
main()
```

### [Creating Strings II](https://cses.fi/problemset/task/1715)

```python
def main():
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7

    s = input()
    n = len(s)
    fac = list(accumulate(range(1, n + 1), func=mul, initial=1))

    cnt = [0] * 26
    for c in s:
        cnt[ord(c) - 97] += 1
    num = 1
    for v in cnt:
        num = num * fac[v] % mod
    print(fac[n] * pow(num, -1, mod) % mod)
main()
```

### [Distributing Apples](https://cses.fi/problemset/task/1716)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7
    e = stdin.readline

    lim = 2 * 10**6 + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(lim-1, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]

    n, m = map(int, e().split())
    # H(n, m) = C(n + m - 1, m)
    print(fac[n + m - 1] * inv[n - 1] * inv[m] % mod)
main()
```

### [Christmas Party](https://cses.fi/problemset/task/1717)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    n = int(e())
    ans = 0
    for i in range(2, n + 1):
        ans = (i * ans + (-1 if i & 1 else 1)) % mod
    print(ans)
main()
```

### [Permutation Order](https://cses.fi/problemset/task/3397)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    from operator import mul
    e = stdin.readline
    fac = list(accumulate(range(1, 21), func=mul, initial=1))

    ans = []
    for _ in range(int(e())):
        o, n, *l = map(int, e().split())
        numbers = list(range(1, n + 1))
        if o == 1:
            k = l[0] - 1
            res = []
            for r in range(n-1, -1, -1):
                idx, k = divmod(k, fac[r])
                res.append(numbers.pop(idx))
            ans.append(" ".join(map(str, res)))
        else:
            res = 1
            for r in range(n-1, -1, -1):
                idx = numbers.index(l[~r])
                res += idx * fac[r]
                numbers.pop(idx)
            ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Permutation Rounds](https://cses.fi/problemset/task/3398)

```python
def main():
    from sys import stdin
    from math import lcm
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    ans = -1
    for i in range(n):
        c = 0
        while l[i]:
            c += 1
            j = l[i] - 1
            l[i] = 0
            i = j
        if c: ans = lcm(ans, c)
    print(ans % (10**9 + 7))
main()
```

### [Bracket Sequences I](https://cses.fi/problemset/task/2064)

```python
def main():
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7

    lim = 10**6 + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(lim-1, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]

    n = int(input())
    print(0 if n & 1 else fac[n] * inv[n >> 1] * inv[n >> 1] * pow((n >> 1) + 1, -1, mod) % mod)
main()
```

### [Bracket Sequences II](https://cses.fi/problemset/task/2187)

```python
def main():
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7

    lim = 10**6 + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(lim-1, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]

    n = int(input())
    if n & 1: return print(0)
    n >>= 1

    s = input()
    ri = up = 0
    for c in s:
        if c == "(":
            ri += 1
            if ri > n:
                return print(0)
        else:
            up += 1
            if up > ri:
                return print(0)
    if ri == n: return print(1)

    def comb(n, m):
        return fac[n] * inv[n - m] * inv[m] % mod

    r = n * 2 - ri - up
    print((comb(r, n - ri) - comb(r, n - ri - 1)) % mod)
main()
```

### [Counting Necklaces](https://cses.fi/problemset/task/2209)

```python
def main():
    from sys import stdin
    from math import gcd
    e = stdin.readline
    mod = 10**9 + 7

    # Burnside’s Lemma
    # 1/n * sum(c(r) for r in 1~n)
    # c(r) = # remain unchanged after k-th rotate

    n, m = map(int, e().split())
    print(pow(n, -1, mod) * sum(pow(m, gcd(r, n), mod) for r in range(n)) % mod)
main()
```

### [Counting Grids](https://cses.fi/problemset/task/2210)

```python
def main():
    mod = 10**9 + 7
    area = int(input()) ** 2
    print(pow(4, -1, mod) * (pow(2, area, mod) + (pow(2, area >> 2 | area & 1, mod) * 2) + pow(2, area >> 1 | area & 1, mod)) % mod)
main()
```

### [Fibonacci Numbers](https://cses.fi/problemset/task/1722)

```python
def main():
    from sys import stdin
    from operator import mul
    e = stdin.readline
    mod = 10**9 + 7

    def matmul(a, b):
        return [[sum(map(mul, row, col)) % mod for col in zip(*b)] for row in a]

    n = int(e())
    ans = [[1], [0]]
    dp = [[1, 1], [1, 0]]
    while n:
        if n & 1:
            ans = matmul(dp, ans)
        dp = matmul(dp, dp)
        n >>= 1
    print(ans[1][0])
main()
```

### [Throwing Dice](https://cses.fi/problemset/task/1096)

```python
def main():
    from sys import stdin
    from operator import mul
    e = stdin.readline
    mod = 10**9 + 7

    def matmul(a, b):
        return [[sum(map(mul, row, col)) % mod for col in zip(*b)] for row in a]

    n = int(e())
    ans = [[0]] * 5 + [[1]]
    dp = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0]
    ]
    n += 1
    while n:
        if n & 1:
            ans = matmul(dp, ans)
        dp = matmul(dp, dp)
        n >>= 1
    print(ans[0][0])
main()
```

### [Graph Paths I](https://cses.fi/problemset/task/1723)

```python
def main():
    from sys import stdin
    from operator import mul
    e = stdin.readline
    mod = 10**9 + 7

    def matmul(a, b):
        b = list(zip(*b))
        return [[sum(map(mul, row, col)) % mod for col in b] for row in a]

    n, m, k = map(int, e().split())
    ans = [[1] + [0] * (n - 1)]
    dp = [[0] * n for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        dp[a][b] += 1

    while k:
        if k & 1:
            ans = matmul(ans, dp)
        dp = matmul(dp, dp)
        k >>= 1
    print(ans[0][-1])
main()
```

### [Graph Paths II](https://cses.fi/problemset/task/1724)

```python
def main():
    from sys import stdin
    from operator import add
    e = stdin.readline
    inf = float("INF")

    def matmul(a, b):
        b = list(zip(*b))
        return [[min(map(add, row, col)) for col in b] for row in a]

    n, m, k = map(int, e().split())
    ans = [[0] + [inf] * (n - 1)]
    dp = [[inf] * n for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a-1, b-1
        dp[a][b] = min(dp[a][b], w)

    while k:
        if k & 1:
            ans = matmul(ans, dp)
        dp = matmul(dp, dp)
        k >>= 1
    ans = ans[0][-1]
    print(ans if ans < inf else -1)
main()
```

### [System of Linear Equations](https://cses.fi/problemset/task/3154)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    n, m = map(int, e().split())
    l = [list(map(int, e().split())) for _ in range(n)]
    for i in range(n):
        for j in range(min(i, m)):
            mul = -l[i][j] * pow(l[j][j], -1, mod) % mod
            for k in range(j, m + 1):
                l[i][k] = (l[i][k] + l[j][k] * mul) % mod
    ans = [0] * m
    for i in range(m - 1, n - 1, -1):
        if l[-1][i]:
            ans[i] = l[-1][m] * pow(l[-1][i], -1, mod) % mod
            break
    for i in range(n - 1, -1, -1):
        for j in range(i + 1, m):
            l[i][m] -= l[i][j] * ans[j]
        if l[i][m]:
            if i >= m or not l[i][i]:
                return print(-1)
            ans[i] = l[i][m] * pow(l[i][i], -1, mod) % mod
    print(*ans)
main()
```

### [Sum of Four Squares](https://cses.fi/problemset/task/3355)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def solve(n):
        if n & 3 == 0:
            if n == 0:
                return (0, 0, 0, 0)
            return tuple(map(lambda x: x << 1, solve(n >> 2)))
        s = int(n ** 0.5)
        if n & 7 in (1, 5):
            a = s - 1 if s & 1 else s
        else:
            a = s if s & 1 else s - 1
        aa = a * a
        bn = n - aa
        for b in range(a + 1):
            bb = b * b
            if bb > bn: break
            cn = bn - bb
            for c in range(b + 1):
                cc = c * c
                if cc > cn: break
                d = int((cn - cc) ** 0.5)
                if cc + d*d == cn:
                    return a, b, c, d

    ans = []
    for _ in range(int(e())):
        n = int(e())
        a, b, c, d = solve(n)
        assert a*a + b*b + c*c + d*d == n
        ans.append(f"{a} {b} {c} {d}")
    print("\n".join(ans))
main()
```

### [Triangle Number Sums](https://cses.fi/problemset/task/3406)

```python
def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline

    ans = []
    tri = [i * (i + 1) >> 1 for i in range(1, 2 * 10**6)]
    for _ in range(int(e())):
        n = int(e())
        res = 3
        j = bisect_left(tri, n)
        if tri[j] == n:
            res = 1
        else:
            i = 0
            while i <= j:
                x = tri[i] + tri[j]
                if x == n:
                    res = 2
                    break
                elif x > n:
                    j -= 1
                else:
                    i += 1
        ans.append(res)
    print(*ans, sep='\n')
main()
```

### [Dice Probability](https://cses.fi/problemset/task/1725)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, lo, hi = map(int, e().split())
    m = n * 6
    dp = [1] + [0] * m
    for r in range(n):
        for i in range(m, -1, -1):
            dp[i] = sum(dp[max(0, i - 6):i]) / 6
    print(f"{sum(dp[lo:hi+1]):.6f}")
main()
```

### [Moving Robots](https://cses.fi/problemset/task/1726)

```python
def main():
    n = 8
    k = int(input())

    dd = ((0, -1), (-1, 0), (0, 1), (1, 0))
    ans = 0
    for I in range(n >> 1):
        for J in range(n >> 1):
            d = [[0] * n for _ in range(n)]
            d[I][J] = 1
            for _ in range(k):
                p = [[0] * n for _ in range(n)]
                for i in range(n):
                    for j in range(n):
                        cnt = 0
                        for di, dj in dd:
                            ni, nj = i + di, j + dj
                            if not (0 <= ni < n and 0 <= nj < n): continue
                            cnt += 1
                            p[i][j] += d[ni][nj]
                        p[i][j] /= cnt
                d = p
            x = 1
            for i in range(n):
                for j in range(n):
                    x *= 1 - d[i][j]
            ans += x
    print(f"{ans * 4:.6f}")
main()
```

### [Candy Lottery](https://cses.fi/problemset/task/1727)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    print(f"{sum(i * (pow(i, n) - pow(i - 1, n)) for i in range(1, k + 1)) / pow(k, n):.6f}")
main()
```

### [Inversion Probability](https://cses.fi/problemset/task/1728)

```python
def main():
    from sys import stdin
    from fractions import Fraction
    e = stdin.readline

    n = int(e())
    ans = 0
    s = 0
    dp = [0] * 101
    for r in map(int, e().split()):
        x = Fraction(1, r)
        cur = s
        for i in range(1, r + 1):
            cur -= dp[i]
            ans += cur * x
            dp[i] += x
        s += 1
    print(f"{ans:.6f}")
main()
```

### [Stick Game](https://cses.fi/problemset/task/1729)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    l = sorted(map(int, e().split()))
    ans = ["L"] * n
    ans[0] = "W"
    for i in range(1, n):
        for v in l:
            if (j := i - v) < -1: break
            if j == -1 or ans[j] == "L":
                ans[i] = "W"
                break
    print("".join(ans))
main()
```

### [Nim Game I](https://cses.fi/problemset/task/1730)

```python
def main():
    from sys import stdin
    from functools import reduce
    from operator import xor
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        n = int(e())
        x = reduce(xor, map(int, e().split()))
        ans.append("first" if x else "second")
    print("\n".join(ans))
main()
```

### [Nim Game II](https://cses.fi/problemset/task/1098)

```python
def main():
    from sys import stdin
    from functools import reduce
    from operator import xor
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        n = int(e())
        x = reduce(xor, (int(v) & 3 for v in e().split()))
        ans.append("first" if x else "second")
    print("\n".join(ans))
main()
```

### [Stair Game](https://cses.fi/problemset/task/1099)

```python
def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        n = int(e())
        x = 0
        for i, v in enumerate(map(int, e().split())):
            if i & 1:
                x ^= v
        ans.append("first" if x else "second")
    print("\n".join(ans))
main()
```

### [Grundy's Game](https://cses.fi/problemset/task/2207)

```python
def main():
    from sys import stdin
    from itertools import count
    e = stdin.readline

    lim = 1223
    dp = [0] * lim
    for i in range(3, lim):
        u = {dp[j] ^ dp[i - j] for j in range(1, i + 1 >> 1)}
        dp[i] = next(j for j in count() if j not in u)

    ans = []
    for _ in range(int(e())):
        n = int(e())
        ans.append("first" if n >= lim or dp[n] else "second")
    print("\n".join(ans))
main()
```

### [Another Game](https://cses.fi/problemset/task/2208)

```python
def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        n = int(e())
        ans.append("first" if any(v & 1 for v in map(int, e().split())) else "second")
    print("\n".join(ans))
main()
```

## String Algorithms

### [Word Combinations](https://cses.fi/problemset/task/1731)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    s = e().rstrip()
    n = len(s)

    k = int(e())
    trie = [[0] * 27 for _ in range(10**6 + 1)]
    cnt = 1
    for _ in range(k):
        t = e().rstrip()
        o = 0
        for c in t:
            c = ord(c) - 97
            if not trie[o][c]:
                trie[o][c] = cnt
                cnt += 1
            o = trie[o][c]
        trie[o][-1] = True

    dp = [0] * (n + 1)
    dp[-1] = 1
    for i in range(n):
        x = dp[i - 1] % mod
        if not x: continue
        o = 0
        for j in range(i, n):
            o = trie[o][ord(s[j]) - 97]
            if not o: break
            if trie[o][-1]: dp[j] += x
    print(dp[n - 1] % mod)
main()
```

### [String Matching](https://cses.fi/problemset/task/1753)

```python
def main():
    s, p = input(), input()
    n, m = len(s), len(p)

    lps = [0] * m
    j = 0
    for i in range(1, m):
        c = p[i]
        while j and p[j] != c:
            j = lps[j - 1]
        j += (p[j] == c)
        lps[i] = j

    j = 0
    ans = 0
    for c in s:
        while j and p[j] != c:
            j = lps[j - 1]
        j += (p[j] == c)
        if j >= m:
            ans += 1
            j = lps[j - 1]
    print(ans)
main()
```

### [Finding Borders](https://cses.fi/problemset/task/1732)

```python
def main():
    s = input()
    n = len(s)

    le = ri = 0
    z = [0] * n
    ans = []
    for i in range(1, n):
        if i < ri:
            z[i] = min(ri - i, z[i - le])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > ri:
            le, ri = i, i + z[i]
        if i + z[i] == n:
            ans.append(z[i])
    print(" ".join(map(str, reversed(ans))))
main()
```

### [Finding Periods](https://cses.fi/problemset/task/1733)

```python
def main():
    s = input()
    n = len(s)

    le = ri = 0
    z = [0] * n
    ans = []
    for i in range(1, n):
        if i < ri:
            z[i] = min(ri - i, z[i - le])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > ri:
            le, ri = i, i + z[i]
        if i + z[i] == n:
            ans.append(i)
    ans.append(n)
    print(*ans)
main()
```

### [Minimal Rotation](https://cses.fi/problemset/task/1110)

```python
def main():
    s = input()
    n = len(s)

    s += s
    i, j = 0, 1
    while i < n and j < n:
        k = 0
        while k < n and s[i + k] == s[j + k]: k += 1
        if s[i + k] < s[j + k]: j += k + 1
        else: i += k + 1
        if i == j: j += 1
    i = min(i, j)
    print(s[i:i+n])
main()
```

### [Longest Palindrome](https://cses.fi/problemset/task/1111)

```python
def main():
    s = input()
    ss = "#" + "#".join(s) + "#"
    n = len(ss)

    le = ri = 0
    z = [0] * n
    for i in range(1, n):
        if i < ri:
            z[i] = min(ri - i, z[2 * le - i])
        while 0 <= i - 1 - z[i] and i + 1 + z[i] < n and ss[i - 1 - z[i]] == ss[i + 1 + z[i]]:
            z[i] += 1
        if i + z[i] > ri:
            le, ri = i, i + z[i]
    m = max(z)
    i = z.index(m) >> 1
    print(s[i-(m >> 1):i+(m + 1 >> 1)])
main()
```

### [All Palindromes](https://cses.fi/problemset/task/3138)

```python
def main():
    s = "#" + "#".join(input()) + "#"
    n = len(s)

    le = ri = 0
    z = [0] * n
    ans = [1] * (n >> 1)
    for i in range(1, n):
        if i < ri:
            z[i] = min(ri - i, z[2 * le - i])
        while 0 <= i - 1 - z[i] and i + 1 + z[i] < n and s[i - 1 - z[i]] == s[i + 1 + z[i]]:
            z[i] += 1
            if (i + z[i]) & 1:
                idx = i + z[i] - 1 >> 1
                ans[idx] = max(ans[idx], z[i] + 1)
        if i + z[i] > ri:
            le, ri = i, i + z[i]
    print(*ans)
main()
```

### [Required Substring](https://cses.fi/problemset/task/1112)

```python
def main():
    from sys import stdin
    from string import ascii_uppercase as A
    e = stdin.readline
    mod = 10**9 + 7

    m = int(e())
    s = e().rstrip()
    n = len(s)

    lps = [0] * n
    j = 0
    for i in range(1, n):
        c = s[i]
        while j and s[j] != c:
            j = lps[j - 1]
        j += (s[j] == c)
        lps[i] = j

    step = [[0] * 26 for _ in range(n)]
    for i in range(n):
        for ci, c in enumerate(A):
            if s[i] == c:
                step[i][ci] = i + 1
            else:
                step[i][ci] = step[lps[i - 1]][ci]

    dp = [[0] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = 1
    ans = 0
    for i in range(m):
        for j in range(n):
            x = dp[i][j] % mod
            if not x: continue
            for ci in range(len(A)):
                dp[i + 1][step[j][ci]] += x
        ans += dp[i][n] * pow(len(A), m - i, mod)
    ans += dp[m][n]
    print(ans % mod)
main()
```

### [Palindrome Queries](https://cses.fi/problemset/task/2420)

```python
def main():
    from sys import stdin
    from itertools import accumulate, repeat
    e = stdin.readline

    b = 31
    mod = 10**9 + 7
    mul = lambda x, y: x * y % mod

    n, q = map(int, e().split())
    b_exp = list(accumulate(repeat(b, n), func=mul, initial=1))

    l = [ord(c) - 97 for c in e().rstrip()]
    pre = [0] + list(map(mul, l, b_exp))
    suf = [0] + list(map(mul, l, reversed(b_exp)))
    for i in range(1, n):
        ii = i + (i & -i)
        if ii <= n:
            pre[ii] = (pre[ii] + pre[i]) % mod
            suf[ii] = (suf[ii] + suf[i]) % mod

    ans = []
    for _ in range(q):
        o, s, t = e().split()
        if o == "1":
            i, c = int(s) - 1, ord(t) - 97
            d = c - l[i]
            l[i] = c
            d1 = d * b_exp[i] % mod
            d2 = d * b_exp[~i] % mod
            i += 1
            while i <= n:
                pre[i] = (pre[i] + d1) % mod
                suf[i] = (suf[i] + d2) % mod
                i += i & -i
        else:
            s, t = int(s) - 1, int(t)
            b1, b2 = b_exp[n - t + 1], b_exp[s]
            v1 = v2 = 0
            while t > s:
                v1 += pre[t]
                v2 += suf[t]
                t &= t - 1
            while s > t:
                v1 -= pre[s]
                v2 -= suf[s]
                s &= s - 1
            v1 = (v1 * b1) % mod
            v2 = (v2 * b2) % mod
            ans.append("YES" if v1 == v2 else "NO")
    print("\n".join(ans))
main()
```

### [Finding Patterns](https://cses.fi/problemset/task/2102)

```python
def main():
    from sys import stdin
    e = stdin.readline
    A = 26

    lim = 5 * 10**5 + 1
    END, FAIL, VIS = range(A, A + 3)
    tr = [[0] * (A + 3) for _ in range(lim)]

    s = e().rstrip()
    k = int(e())

    nxt = [-1] * (k + 1)
    siz = 1
    for idx in range(k):
        t = e().rstrip()
        o = 0
        for c in t:
            c = ord(c) - 97
            if not tr[o][c]:
                tr[o][c] = siz
                siz += 1
            o = tr[o][c]
        nxt[idx] = ~tr[o][END]
        tr[o][END] = ~idx

    # build ACAM
    q = [0]
    for o in q:
        node = tr[o]
        for c in range(A):
            if not (ch := node[c]): continue
            q.append(ch)
            if not o: continue
            fail = node[FAIL]
            while fail and not tr[fail][c]:
                fail = tr[fail][FAIL]
            if tr[fail][c]:
                fail = tr[fail][c]
            tr[ch][FAIL] = fail

    ans = ["NO"] * k
    o = 0
    for c in s:
        c = ord(c) - 97
        while o and not tr[o][c]:
            o = tr[o][FAIL]
        if tr[o][c]:
            o = tr[o][c]
        tr[o][VIS] = True
    for o in reversed(q):
        node = tr[o]
        if not node[VIS]: continue
        idx = ~node[END]
        while ~idx:
            ans[idx] = "YES"
            idx = nxt[idx]
        tr[node[FAIL]][VIS] = True
    print("\n".join(ans))
main()
```

### [Counting Patterns](https://cses.fi/problemset/task/2103)

```python
def main():
    from sys import stdin
    e = stdin.readline
    A = 26

    lim = 5 * 10**5 + 1
    END, FAIL, CNT = range(A, A + 3)
    tr = [[0] * (A + 3) for _ in range(lim)]

    s = e().rstrip()
    k = int(e())

    nxt = [-1] * (k + 1)
    siz = 1
    for idx in range(k):
        t = e().rstrip()
        o = 0
        for c in t:
            c = ord(c) - 97
            if not tr[o][c]:
                tr[o][c] = siz
                siz += 1
            o = tr[o][c]
        nxt[idx] = ~tr[o][END]
        tr[o][END] = ~idx

    # build ACAM
    q = [0]
    for o in q:
        node = tr[o]
        for c in range(A):
            if not (ch := node[c]): continue
            q.append(ch)
            if not o: continue
            fail = node[FAIL]
            while fail and not tr[fail][c]:
                fail = tr[fail][FAIL]
            if tr[fail][c]:
                fail = tr[fail][c]
            tr[ch][FAIL] = fail

    ans = ["0"] * k
    o = 0
    for c in s:
        c = ord(c) - 97
        while o and not tr[o][c]:
            o = tr[o][FAIL]
        if tr[o][c]:
            o = tr[o][c]
        tr[o][CNT] += 1
    for o in reversed(q):
        node = tr[o]
        if not (c := node[CNT]): continue
        idx = ~node[END]
        str_c = str(c)
        while ~idx:
            ans[idx] = str_c
            idx = nxt[idx]
        tr[node[FAIL]][CNT] += c
    print("\n".join(ans))
main()
```

### [Pattern Positions](https://cses.fi/problemset/task/2104)

```python
def main():
    from sys import stdin
    e = stdin.readline
    A = 26

    lim = 5 * 10**5 + 1
    END, FAIL, POS = range(A, A + 3)
    tr = [[0] * (A + 3) for _ in range(lim)]

    s = e().rstrip()
    n = len(s)
    k = int(e())

    nxt = [-1] * (k + 1)
    siz = 1
    for idx in range(k):
        t = e().rstrip()
        o = 0
        for c in reversed(t):
            c = ord(c) - 97
            if not tr[o][c]:
                tr[o][c] = siz
                siz += 1
            o = tr[o][c]
        nxt[idx] = ~tr[o][END]
        tr[o][END] = ~idx

    # build ACAM
    q = [0]
    for o in q:
        node = tr[o]
        for c in range(A):
            if not (ch := node[c]): continue
            q.append(ch)
            if not o: continue
            fail = node[FAIL]
            while fail and not tr[fail][c]:
                fail = tr[fail][FAIL]
            if tr[fail][c]:
                fail = tr[fail][c]
            tr[ch][FAIL] = fail

    ans = ["-1"] * k
    o = 0
    for i in range(n):
        c = ord(s[~i]) - 97
        while o and not tr[o][c]:
            o = tr[o][FAIL]
        if tr[o][c]:
            o = tr[o][c]
        tr[o][POS] = i
    for o in reversed(q):
        node = tr[o]
        if not (pos := node[POS]): continue
        idx = ~node[END]
        str_pos = str(n - pos)
        while ~idx:
            ans[idx] = str_pos
            idx = nxt[idx]
        tr[node[FAIL]][POS] = max(tr[node[FAIL]][POS], pos)
    print("\n".join(ans))
main()
```

### [Distinct Substrings](https://cses.fi/problemset/task/2105)

```python
def main():
    from itertools import count
    A = 26
    LEN, LINK = range(A, A + 2)
    cnt = count(1).__next__

    s = input()
    n = len(s)
    tr = [[0] * (A + 2) for _ in range(n << 1)]
    tr[0][LEN] = 0
    tr[0][LINK] = -1
    last = 0
    for c in s:
        c = ord(c) - 97
        o = cnt()
        tr[o][LEN] = tr[last][LEN] + 1
        p, last = last, o
        while ~p and not tr[p][c]:
            tr[p][c] = o
            p = tr[p][LINK]
        if p == -1:
            tr[o][LINK] = 0
        else:
            q = tr[p][c]
            if tr[p][LEN] + 1 == tr[q][LEN]:
                tr[o][LINK] = q
            else:
                clone = cnt()
                tr[clone] = tr[q].copy()
                tr[clone][LEN] = tr[p][LEN] + 1
                tr[q][LINK] = tr[o][LINK] = clone
                while ~p and tr[p][c] == q:
                    tr[p][c] = clone
                    p = tr[p][LINK]
    siz = cnt()
    ans = sum(tr[o][LEN] - tr[tr[o][LINK]][LEN] for o in range(1, siz))
    print(ans)
main()
```

### [Distinct Subsequences](https://cses.fi/problemset/task/1149)

```python
def main():
    mod = 10**9 + 7
    A = 26

    s = input()
    d = 0
    last = [-1] * A
    for c in s:
        c = ord(c) - 97
        p = d * 2 - last[c]
        last[c] = d
        d = p % mod
    print(d)
main()
```

### [Repeating Substring](https://cses.fi/problemset/task/2106)

```python
def main():
    from itertools import count
    A = 26
    LEN, POS, LINK, CNT = range(A, A + 4)
    cnt = count(1).__next__

    s = input()
    n = len(s)
    tr = [[0] * (A + 4) for _ in range(n << 1)]
    tr[0][POS] = -1
    tr[0][LEN] = 0
    tr[0][LINK] = -1
    tr[0][CNT] = 1
    last = 0
    for c in s:
        c = ord(c) - 97
        o = cnt()
        tr[o][LEN] = tr[last][LEN] + 1
        tr[o][POS] = tr[o][LEN]
        tr[o][CNT] = 1
        p, last = last, o
        while ~p and not tr[p][c]:
            tr[p][c] = o
            p = tr[p][LINK]
        if p == -1:
            tr[o][LINK] = 0
        else:
            q = tr[p][c]
            if tr[p][LEN] + 1 == tr[q][LEN]:
                tr[o][LINK] = q
            else:
                clone = cnt()
                tr[clone] = tr[q].copy()
                tr[clone][POS] = tr[q][POS]
                tr[clone][LEN] = tr[p][LEN] + 1
                tr[clone][CNT] = 0
                tr[o][LINK] = tr[q][LINK] = clone
                while ~p and tr[p][c] == q:
                    tr[p][c] = clone
                    p = tr[p][LINK]
    siz = cnt()
    indeg = [0] * siz
    for i in range(1, siz):
        indeg[tr[i][LINK]] += 1
    max_len, best_pos = 0, -1
    for i in range(siz):
        while not indeg[i]:
            indeg[i] = -1
            c = tr[i][CNT]
            if c >= 2 and tr[i][LEN] > max_len:
                max_len = tr[i][LEN]
                best_pos = tr[i][POS]
            p = tr[i][LINK]
            if p == -1: continue
            tr[p][CNT] += c
            indeg[p] -= 1
            i = p
    print(s[best_pos - max_len:best_pos] if max_len else -1)
main()
```

### [String Functions](https://cses.fi/problemset/task/2107)

```python
def main():
    s = input()
    n = len(s)
    z = [0] * n
    le = ri = 0
    for i in range(1, n):
        if i < ri: z[i] = min(ri - i, z[i - le])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]: z[i] += 1
        if i + z[i] > ri: le, ri = i, i + z[i]
    print(*z)
    lps = [0] * n
    j = 0
    for i in range(1, n):
        c = s[i]
        while j and s[j] != c:
            j = lps[j - 1]
        j += s[j] == c
        lps[i] = j
    print(*lps)
main()
```

### [Inverse Suffix Array](https://cses.fi/problemset/task/3225)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    sa = [int(v) - 1 for v in e().split()]
    rk = [0] * (n + 1)
    for i, v in enumerate(sa):
        rk[v] = i

    s = [0] * n
    a = sa[0]
    s[a] = c = ord("a")
    for i in range(1, n):
        b = sa[i]
        if rk[a + 1] > rk[b + 1]:
            c += 1
            if c > ord("z"):
                return print(-1)
        s[b] = c
        a = b
    print("".join(map(chr, s)))
main()
```

### [String Transform](https://cses.fi/problemset/task/1113)

```python
def main():
    from string import ascii_lowercase as A
    A = "#" + A
    mp = {A[i]: i for i in range(27)}

    s = input()
    n = len(s)

    l = [0] * n
    cnt = [0] * 27
    for c in s:
        cnt[mp[c]] += 1
    for i in range(1, 27):
        cnt[i] += cnt[i - 1]
    for i in range(n-1, -1, -1):
        cnt[mp[s[i]]] -= 1
        l[cnt[mp[s[i]]]] = i

    ans = []
    i = l[0]
    for _ in range(n - 1):
        i = l[i]
        ans.append(s[i])
    print("".join(ans))
main()
```

### [Substring Order I](https://cses.fi/problemset/task/2108)

```python
def main():
    from itertools import count
    A = 26
    LEN, LINK, CNT = range(A, A + 3)
    cnt = count(1).__next__

    s = input()
    n = len(s)
    k = int(input())

    tr = [[0] * (A + 3) for _ in range(n << 1)]
    tr[0][LEN] = 0
    tr[0][LINK] = -1
    last = 0
    for c in s:
        c = ord(c) - 97
        o = cnt()
        tr[o][LEN] = tr[last][LEN] + 1
        p, last = last, o
        while ~p and not tr[p][c]:
            tr[p][c] = o
            p = tr[p][LINK]
        if p == -1:
            tr[o][LINK] = 0
        else:
            q = tr[p][c]
            if tr[p][LEN] + 1 == tr[q][LEN]:
                tr[o][LINK] = q
            else:
                clone = cnt()
                tr[clone] = tr[q].copy()
                tr[clone][LEN] = tr[p][LEN] + 1
                tr[q][LINK] = tr[o][LINK] = clone
                while ~p and tr[p][c] == q:
                    tr[p][c] = clone
                    p = tr[p][LINK]
    size = cnt()

    bs = [[] for _ in range(n + 1)]
    for o in range(size):
        bs[tr[o][LEN]].append(o)
    for b in reversed(bs):
        for o in b:
            tr[o][CNT] = 1
            for c in range(A):
                ch = tr[o][c]
                if not ch: continue
                tr[o][CNT] += tr[ch][CNT]

    o = 0
    ans = []
    while k:
        k -= 1
        for c in range(A):
            ch = tr[o][c]
            if not ch: continue
            if k <= tr[ch][CNT]:
                ans.append(chr(c + 97))
                o = ch
                break
            k -= tr[ch][CNT]
    print("".join(ans))
main()
```

### [Substring Order II](https://cses.fi/problemset/task/2109)

```python
def main():
    from itertools import count
    A = 26
    LEN, LINK, CNT, DP = range(A, A + 4)
    cnt = count(1).__next__

    s = input()
    n = len(s)
    k = int(input())

    tr = [[0] * (A + 4) for _ in range(n << 1)]
    tr[0][LEN] = 0
    tr[0][LINK] = -1
    tr[0][CNT] = 0
    last = 0
    for c in s:
        c = ord(c) - 97
        o = cnt()
        tr[o][LEN] = tr[last][LEN] + 1
        tr[o][CNT] = 1
        p, last = last, o
        while ~p and not tr[p][c]:
            tr[p][c] = o
            p = tr[p][LINK]
        if p == -1:
            tr[o][LINK] = 0
        else:
            q = tr[p][c]
            if tr[p][LEN] + 1 == tr[q][LEN]:
                tr[o][LINK] = q
            else:
                clone = cnt()
                tr[clone] = tr[q].copy()
                tr[clone][LEN] = tr[p][LEN] + 1
                tr[clone][CNT] = 0
                tr[q][LINK] = tr[o][LINK] = clone
                while ~p and tr[p][c] == q:
                    tr[p][c] = clone
                    p = tr[p][LINK]
    size = cnt()

    bs = [[] for _ in range(n + 1)]
    for o in range(size):
        bs[tr[o][LEN]].append(o)
    for b in reversed(bs):
        for o in b:
            tr[o][DP] = 0
            if o: tr[tr[o][LINK]][CNT] += tr[o][CNT]
            for c in range(A):
                ch = tr[o][c]
                if not ch: continue
                tr[o][DP] += tr[ch][DP] + tr[ch][CNT]

    o = 0
    ans = []
    while k:
        for c in range(A):
            ch = tr[o][c]
            if not ch: continue
            if k <= tr[ch][CNT]:
                ans.append(chr(c + 97))
                k = 0
                break
            k -= tr[ch][CNT]
            if k <= tr[ch][DP]:
                ans.append(chr(c + 97))
                o = ch
                break
            k -= tr[ch][DP]
    print("".join(ans))
main()
```

### [Substring Distribution](https://cses.fi/problemset/task/2110)

```python
def main():
    from itertools import count
    A = 26
    LEN, LINK = range(A, A + 2)
    cnt = count(1).__next__

    s = input()
    n = len(s)
    tr = [[0] * (A + 2) for _ in range(n << 1)]
    tr[0][LEN] = 0
    tr[0][LINK] = -1
    last = 0
    for c in s:
        c = ord(c) - 97
        o = cnt()
        tr[o][LEN] = tr[last][LEN] + 1
        p, last = last, o
        while ~p and not tr[p][c]:
            tr[p][c] = o
            p = tr[p][LINK]
        if p == -1:
            tr[o][LINK] = 0
        else:
            q = tr[p][c]
            if tr[p][LEN] + 1 == tr[q][LEN]:
                tr[o][LINK] = q
            else:
                clone = cnt()
                tr[clone] = tr[q].copy()
                tr[clone][LEN] = tr[p][LEN] + 1
                tr[q][LINK] = tr[o][LINK] = clone
                while ~p and tr[p][c] == q:
                    tr[p][c] = clone
                    p = tr[p][LINK]
    size = cnt()
    ans = [0] * (n + 1)
    for o in range(1, size):
        ans[tr[tr[o][LINK]][LEN]] += 1
        ans[tr[o][LEN]] -= 1
    for i in range(1, n):
        ans[i] += ans[i - 1]
    print(*ans[:-1])
main()
```

## Geometry

### [Point Location Test](https://cses.fi/problemset/task/2189)

```python
class Vector:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector"):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, other: "Vector") -> int:
        return self.x * other.x + self.y * other.y

    def __xor__(self, other: "Vector") -> int:
        return self.x * other.y - self.y * other.x

    def cross(self, a: "Vector", b: "Vector") -> int:
        o = self
        return (a - o) ^ (b - o)


def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        x1, y1, x2, y2, x3, y3 = map(int, e().split())
        p1, p2, p3 = Vector(x1, y1), Vector(x2, y2), Vector(x3, y3)
        x = p1.cross(p2, p3)
        ans.append("TOUCH" if x == 0 else "LEFT" if x > 0 else "RIGHT")
    print("\n".join(ans))
main()
```

### [Line Segment Intersection](https://cses.fi/problemset/task/2190)

```python
class Vector:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector"):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, other: "Vector") -> int:
        return self.x * other.x + self.y * other.y

    def __xor__(self, other: "Vector") -> int:
        return self.x * other.y - self.y * other.x

    def cross(self, a: "Vector", b: "Vector") -> int:
        o = self
        return (a - o) ^ (b - o)


def banana(p1: Vector, p2: Vector, p3: Vector, p4: Vector) -> bool:
    def inter1d(a, b, c, d):
        if a > b: a, b = b, a
        if c > d: c, d = d, c
        return max(a, c) <= min(b, d)

    return (inter1d(p1.x, p2.x, p3.x, p4.x) and inter1d(p1.y, p2.y, p3.y, p4.y)
            and p1.cross(p2, p3) * p1.cross(p2, p4) <= 0
            and p3.cross(p4, p1) * p3.cross(p4, p2) <= 0)


def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        x1, y1, x2, y2, x3, y3, x4, y4 = map(int, e().split())
        p1, p2, p3, p4 = Vector(x1, y1), Vector(x2, y2), Vector(x3, y3), Vector(x4, y4)
        ans.append("YES" if banana(p1, p2, p3, p4) else "NO")
    print("\n".join(ans))
main()
```

### [Polygon Area](https://cses.fi/problemset/task/2191)

```python
class Vector:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector"):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, other: "Vector") -> int:
        return self.x * other.x + self.y * other.y

    def __xor__(self, other: "Vector") -> int:
        return self.x * other.y - self.y * other.x

    def cross(self, a: "Vector", b: "Vector") -> int:
        o = self
        return (a - o) ^ (b - o)


def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    ans = 0
    first = pre = Vector(*map(int, e().split()))
    for _ in range(n - 1):
        cur = Vector(*map(int, e().split()))
        ans += pre ^ cur
        pre = cur
    ans += cur ^ first
    print(abs(ans))
main()
```

### [Point in Polygon](https://cses.fi/problemset/task/2192)

```python
class Vector:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __eq__(self, other: "Vector") -> bool:
        return self.x == other.x and self.y == other.y

    def __pos__(self) -> "Vector":
        return self

    def __neg__(self) -> "Vector":
        return Vector(-self.x, -self.y)

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, other: "Vector") -> int:
        return self.x * other.x + self.y * other.y

    def __xor__(self, other: "Vector") -> int:
        return self.x * other.y - self.y * other.x

    def cross(self, a: "Vector", b: "Vector") -> int:
        o = self
        return (a - o) ^ (b - o)

    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"


def inter1d(a, b, c):
    if a > b: a, b = b, a
    return max(a, c) <= min(b, c)


def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = [Vector(*map(int, e().split())) for _ in range(n)]

    ans = []
    for _ in range(q):
        p = Vector(*map(int, e().split()))
        bound = inside = False
        for i in range(n):
            a, b = l[i - 1], l[i]
            if a.x > b.x: a, b = b, a
            crs = a.cross(b, p)
            if crs == 0 and inter1d(a.x, b.x, p.x) and inter1d(a.y, b.y, p.y):
                bound = True
                break
            if a.x <= p.x < b.x and crs > 0:
                inside = not inside
        ans.append("BOUNDARY" if bound else "INSIDE" if inside else "OUTSIDE")
    print("\n".join(ans))
main()
```

### [Polygon Lattice Points](https://cses.fi/problemset/task/2193)

```python
def main():
    from sys import stdin
    from math import gcd
    e = stdin.readline

    # Pick: A = inside + edge/2 - 1

    n = int(e())
    area = edge = 0
    ox, oy = px, py = tuple(map(int, e().split()))
    for _ in range(n - 1):
        x, y = map(int, e().split())
        area += px * y - py * x
        edge += gcd(x - px, y - py)
        px, py = x, y
    area += x * oy - y * ox
    edge += gcd(x - ox, y - oy)
    area = abs(area)
    print(area + 2 - edge >> 1, edge)
main()
```

### [Minimum Euclidean Distance](https://cses.fi/problemset/task/2194)

```python
def main():
    from sys import stdin
    from random import randint
    e = stdin.readline
    LOAD = 10
    shift = 10 ** 9 + randint(114514, 1919810)

    n = int(e())
    l = []
    for _ in range(n):
        a, b = map(int, e().split())
        a, b = a + shift, b + shift
        l.append(a * b << 64 | a << 32 | b)
    l.sort()

    ans = float("INF")
    for i in range(n):
        x = l[i]
        a, b = (x >> 32) & 0xffffffff, x & 0xffffffff
        l[i] = a, b = a - shift, b - shift
        for j in range(max(0, i - LOAD), i):
            c, d = l[j]
            ans = min(ans, (a - c) ** 2 + (b - d) ** 2)
    print(ans)
main()
```

### [Convex Hull](https://cses.fi/problemset/task/2195)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = [tuple(map(int, e().split())) for _ in range(n)]
    l.sort()

    def cross(o, a, b):
        return (l[a][0] - l[o][0]) * (l[b][1] - l[o][1]) - (l[a][1] - l[o][1]) * (l[b][0] - l[o][0])

    h = []
    for i in range(n):
        while len(h) >= 2 and cross(h[-2], h[-1], i) < 0:
            h.pop()
        h.append(i)
    lo = len(h)
    for i in range(n - 2, -1, -1):
        while len(h) > lo and cross(h[-2], h[-1], i) < 0:
            h.pop()
        h.append(i)
    h.pop()

    ans = [f"{len(h)}"]
    for i in h:
        ans.append(f"{l[i][0]} {l[i][1]}")
    print("\n".join(ans))
main()
```

### [Maximum Manhattan Distances](https://cses.fi/problemset/task/3410)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())

    a, b = map(int, e().split())
    mx0 = mn0 = a + b
    mx1 = mn1 = a - b
    cur = 0
    ans = [cur]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a + b, a - b
        cur = max(cur, mx0 - a, a - mn0, mx1 - b, b - mn1)
        ans.append(cur)
        mx0, mn0 = max(mx0, a), min(mn0, a)
        mx1, mn1 = max(mx1, b), min(mn1, b)
    print(*ans, sep="\n")
main()
```

### [All Manhattan Distances](https://cses.fi/problemset/task/3411)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    xs = [0] * n
    ys = [0] * n
    for i in range(n):
        xs[i], ys[i] = map(int, e().split())
    xs.sort(), ys.sort()

    ans = cur = 0
    px = py = 0
    for i in range(n):
        x, y = xs[i], ys[i]
        cur += (x - px + y - py) * i
        ans += cur
        px, py = x, y
    print(ans)
main()
```

### [Intersection Points](https://cses.fi/problemset/task/1740)

```python
def main():
    from sys import stdin
    e = stdin.readline
    R = 10**6 + 1

    n = int(e())
    ver = []
    hor = []
    for _ in range(n):
        a, b, c, d = map(int, e().split())
        if a == c:
            if b > d: b, d = d, b
            ver.append((b, a, 1))
            ver.append((d + 1, a, -1))
        else:
            if a > c: a, c = c, a
            hor.append((b, a - 1, c))
    ver.sort()
    hor.sort()
    q = len(hor)

    m = R << 1
    bit = [0] * m
    ans = 0
    qi = 0
    for y, x, v in ver:
        while qi < q and hor[qi][0] < y:
            _, s, t = hor[qi]
            qi += 1
            s, t = R + s, R + t
            while t > s:
                ans += bit[t]
                t &= t - 1
            while s > t:
                ans -= bit[s]
                s &= s - 1
        i = R + x
        while i < m:
            bit[i] += v
            i += i & -i
    print(ans)
main()
```

### [Line Segments Trace I](https://cses.fi/problemset/task/3427)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def y(x, v):
        return v[0] * x + v[1]

    def add(v):
        o, s, t = 1, 0, r
        while s + 1 < t:
            if v[0] > tr[o][0]: tr[o], v = v, tr[o]
            mid = s + t >> 1
            if y(mid, tr[o]) >= y(mid, v):
                o = o << 1
                t = mid
            else:
                tr[o], v = v, tr[o]
                o = o << 1 | 1
                s = mid
        if y(s, v) > y(s, tr[o]):
            tr[o] = v

    def query(x):
        res = 0
        o, s, t = 1, 0, r
        while True:
            res = max(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    n, m = map(int, e().split())
    r = m + 1
    tr = [(0, 0)] * (r << 2)

    for _ in range(n):
        a, b = map(int, e().split())
        v = ((b - a) // m, a)
        add(v)
    print(*[query(x) for x in range(r)])
main()
```

### [Line Segments Trace II](https://cses.fi/problemset/task/3428)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def y(x, v):
        return v[0] * x + v[1]

    def add(qs, qt, v):
        stk = [(1, 0, r)]
        while stk:
            o, s, t = stk.pop()
            if qt <= s or  t <= qs: continue
            if qs <= s and t <= qt:
                vv = v
                while True:
                    mid = s + t >> 1
                    if y(mid, vv) > y(mid, tr[o]): tr[o], vv = vv, tr[o]
                    if y(s, vv) > y(s, tr[o]):
                        o = o << 1 | 0
                        t = mid
                        continue
                    if y(t - 1, vv) > y(t - 1, tr[o]):
                        o = o << 1 | 1
                        s = mid
                        continue
                    break
            else:
                mid = s + t >> 1
                stk.append((o << 1 | 0, s, mid))
                stk.append((o << 1 | 1, mid, t))

    def query(x):
        res = -1
        o, s, t = 1, 0, r
        while True:
            res = max(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    n, m = map(int, e().split())
    r = m + 1
    tr = [(0, -1)] * (r << 2)

    for _ in range(n):
        a, b, c, d = map(int, e().split())
        if a > c: a, b, c, d = c, d, a, b
        m = (d - b) // (c - a)
        k = -m * a + b
        add(a, c + 1, (m, k))
    print(*[query(x) for x in range(r)])
main()
```

### [Lines and Queries I](https://cses.fi/problemset/task/3429)

```python
def main():
    from sys import stdin
    e = stdin.readline
    inf = float("INF")
    r = 10**5 + 1

    def y(x, v):
        return v[0] * x + v[1]

    def add(v):
        o, s, t = 1, 0, r
        while True:
            mid = s + t >> 1
            if y(mid, v) > y(mid, tr[o]):
                tr[o], v = v, tr[o]
            if y(s, v) > y(s, tr[o]):
                o = o << 1 | 0
                t = mid
                continue
            if y(t - 1, v) > y(t - 1, tr[o]):
                o = o << 1 | 1
                s = mid
                continue
            break

    def query(x):
        res = -inf
        o, s, t = 1, 0, r
        while True:
            res = max(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    tr = [(0, -inf)] * (r << 2)

    ans = []
    for _ in range(int(e())):
        o, *oo = map(int, e().split())
        if o == 1:
            add(oo)
        else:
            ans.append(query(oo[0]))
    print("\n".join(map(str, ans)))
main()
```

### [Lines and Queries II](https://cses.fi/problemset/task/3430)

```python
def main():
    from sys import stdin
    e = stdin.readline
    inf = float("INF")
    r = 10**5 + 1

    def y(x, v):
        return v[0] * x + v[1]

    def add(qs, qt, v):
        stk = [(1, 0, r)]
        while stk:
            o, s, t = stk.pop()
            if qt <= s or  t <= qs: continue
            if qs <= s and t <= qt:
                vv = v
                while True:
                    mid = s + t >> 1
                    if y(mid, vv) > y(mid, tr[o]): tr[o], vv = vv, tr[o]
                    if y(s, vv) > y(s, tr[o]):
                        o = o << 1 | 0
                        t = mid
                        continue
                    if y(t - 1, vv) > y(t - 1, tr[o]):
                        o = o << 1 | 1
                        s = mid
                        continue
                    break
            else:
                mid = s + t >> 1
                stk.append((o << 1 | 0, s, mid))
                stk.append((o << 1 | 1, mid, t))

    def query(x):
        res = -inf
        o, s, t = 1, 0, r
        while True:
            res = max(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    tr = [(0, -inf)] * (r << 2)

    ans = []
    for _ in range(int(e())):
        o, *oo = map(int, e().split())
        if o == 1:
            m, k, s, t = oo
            add(s, t + 1, (m, k))
        else:
            res = query(oo[0])
            ans.append(res if res > -inf else "NO")
    print("\n".join(map(str, ans)))
main()
```

### [Area of Rectangles](https://cses.fi/problemset/task/1741)

```python
def main():
    from sys import stdin
    e = stdin.readline
    r = 1 << 20
    m = r << 1
    shift = r + m

    n = int(e())
    q = []
    for _ in range(n):
        a, b, c, d = map(int, e().split())
        q.append((a << 1 | 0, shift + b, shift + d))
        q.append((c << 1 | 1, shift + b, shift + d))
    q.sort()

    def merge(i, r):
        if tag[i]: zkw[i] = r
        elif r > 1: zkw[i] = zkw[i << 1] + zkw[i << 1 | 1]
        else: zkw[i] = 0

    def add(s, t, v):
        r = 1
        while s < t:
            if s & 1:
                tag[s] += v
                merge(s, r)
                s += 1
            if t & 1:
                t -= 1
                tag[t] += v
                merge(t, r)
            s >>= 1; t >>= 1
            v <<= 1; r <<= 1

    def pull(i):
        r = 1
        while i > 1:
            i >>= 1; r <<= 1
            merge(i, r)

    ans = px = 0
    tag = [0] * (m << 1)
    zkw = [0] * (m << 1)
    for x, s, t in q:
        x, v = x >> 1, -1 if x & 1 else 1
        ans += zkw[1] * (x - px)
        add(s, t, v)
        pull(s), pull(t - 1)
        px = x
    print(ans)
main()
```

### [Robot Path](https://cses.fi/problemset/task/1742)

```python
import sys
from io import StringIO

testcase = """\
5
U 2
R 3
D 1
L 5
U 2
"""

sys.stdin = StringIO(testcase)

def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline
    R = 10 ** 6 + 1

    def check(k):
        ver = []
        hor = []
        for i in range(k):
            a, b, c, d = l[i]
            if a == c:
                ver.append((b, a, 1))
                ver.append((d + 1, a, -1))
            else:
                hor.append((b, a - 1, c))
        ver.sort()
        hor.sort()
        q = len(hor)

        m = R << 1
        bit = [0] * m
        ans = 0
        qi = 0
        for y, x, v in ver:
            while qi < q and hor[qi][0] < y:
                _, s, t = hor[qi]
                qi += 1
                s, t = R + s, R + t
                while t > s:
                    ans += bit[t]
                    t &= t - 1
                while s > t:
                    ans -= bit[s]
                    s &= s - 1
                if ans >= k:
                    return True
            i = R + x
            while i < m:
                bit[i] += v
                i += i & -i
        return False

    n = int(e())

    l = []
    x = y = 0
    hi = n
    ans = [0] * n

    for i in range(n):
        line = e()
        c, v = line[0], int(line[2:])
        if c == "U":
            l.append((x, y, x, y + v))
            y += v
        elif c == "D":
            l.append((x, y - v, x, y))
            y -= v
        elif c == "R":
            l.append((x, y, x + v, y))
            x += v
        elif c == "L":
            l.append((x - v, y, x, y))
            x -= v

    print(bisect_left(range(n), True, key=check))
main()
```

## Advanced Techniques

### [Meet in the Middle](https://cses.fi/problemset/task/1628)

```python
def main():
    from sys import stdin
    from collections import Counter
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    half = n >> 1
    a = [0]
    for v in l[:half]:
        a += [s + v for s in a]
    c = Counter(a)

    b = [0]
    for v in l[half:]:
        b += [s + v for s in b]
    print(sum(c.get(k - v, 0) for v in b))
main()
```

### [Hamming Distance](https://cses.fi/problemset/task/2136)

```python
def main():
    from sys import stdin
    e = stdin.readline
    n, ans = map(int, e().split())
    l = [int(e(), 2) for _ in range(n)]
    for i in range(1, n):
        v = l[i]
        for j in range(i):
            x = v ^ l[j]
            x -= (x >> 1) & 0x55555555
            x = ((x >> 2) & 0x33333333) + (x & 0x33333333)
            x = ((x >> 4) + x) & 0x0f0f0f0f
            x += x >> 8
            x += x >> 16
            x &= 0x3f
            if x < ans: ans = x
    print(ans)
main()
```

### [Corner Subgrid Check](https://cses.fi/problemset/task/3360)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    ans = [False] * k
    flags = [[0] * n for _ in range(k)]
    for i in range(n):
        s = e()
        row = [0] * k
        for j in range(n):
            c = ord(s[j]) - 65
            if ans[c]: continue
            flag = flags[c]
            if row[c] & flag[j]:
                ans[c] = True
            else:
                flag[j] |= row[c]
                row[c] |= 1 << j
    print("\n".join("YES" if res else "NO" for res in ans))
main()
```

### [Corner Subgrid Count](https://cses.fi/problemset/task/2137)

```python
def main():
    from sys import stdin
    e = stdin.readline
    n = int(e())
    l = [0] * n
    ans = 0
    for i in range(n):
        bi = l[i] = int(e(), 2)
        for j in range(i):
            c = (bi & l[j]).bit_count()
            ans += c * (c - 1) >> 1
    print(ans)
main()
```

### [Reachable Nodes](https://cses.fi/problemset/task/2138)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    R = [[] for _ in range(n)]
    indeg = [0] * n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        R[b].append(a)
        indeg[a] += 1

    bits = [1 << i for i in range(n)]
    q = [i for i in range(n) if indeg[i] == 0]
    for i in q:
        b = bits[i]
        for j in R[i]:
            bits[j] |= b
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
    print(*[b.bit_count() for b in bits])
main()
```

### [Reachability Queries](https://cses.fi/problemset/task/2143)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    setrecursionlimit(5 * 10**4 + 10)
    e = stdin.readline

    def tarjan(i):
        nonlocal dfnn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        stk.append(i);
        instk[i] = True
        for j in G[i]:
            if not instk[j] and dfn[j]: continue
            if not dfn[j]: tarjan(j)
            if low[j] < low[i]: low[i] = low[j]
        if low[i] == dfn[i]:
            j = -1
            while j != i:
                p = j
                j = stk.pop();
                instk[j] = False
                nn[j] = p
                scc[j] = i

    n, m, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)

    dfn = [0] * n
    low = [0] * n
    scc = [0] * n
    nn = [0] * n
    stk = []
    instk = [False] * n
    dfnn = 0

    bits = [1 << i for i in range(n)]
    for i in range(n):
        if not dfn[i]: tarjan(i)

    R = [[] for _ in range(n)]
    indeg = [0] * n
    for r in range(n):
        if scc[r] != r:
            indeg[r] = -1
            continue
        i = r
        while ~i:
            for j in G[i]:
                j = scc[j]
                if j == r: continue
                R[j].append(r)
                indeg[r] += 1
            i = nn[i]

    qu = [i for i in range(n) if indeg[i] == 0]
    for i in qu:
        bi = bits[i]
        for j in R[i]:
            bits[j] |= bi
            indeg[j] -= 1
            if indeg[j] == 0:
                qu.append(j)

    ans = []
    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        ans.append("YES" if (bits[scc[a]] >> scc[b]) & 1 else "NO")
    print("\n".join(ans))
main()
```

### [Cut and Paste](https://cses.fi/problemset/task/2072)

```python
def main():
    from sys import stdin
    from random import randrange
    e = stdin.readline
    VAL, LE, RI, SIZ = range(4)
    new_node = lambda v: [v, None, None, 1]

    def size(o):
        return o[SIZ] if o else 0

    def pull(o):
        o[SIZ] = 1 + size(o[LE]) + size(o[RI])

    def merge(a, b):
        if not a or not b:
            return a if a else b
        sa, sb = size(a), size(b)
        if randrange(0, sa + sb) < sa:
            a[RI] = merge(a[RI], b)
            o = a
        else:
            b[LE] = merge(a, b[LE])
            o = b
        pull(o)
        return o

    def split(o, k):
        if not o: return o, o
        if (ls := size(o[LE])) < k:
            a = o
            o[RI], b = split(o[RI], k - ls - 1)
        else:
            b = o
            a, o[LE] = split(o[LE], k)
        pull(o)
        return a, b

    def dfs(o):
        if not o: return
        dfs(o[LE])
        ans.append(o[VAL])
        dfs(o[RI])

    n, q = map(int, e().split())
    s = e()

    rt = None
    for i in range(n):
        rt = merge(rt, new_node(s[i]))
    for _ in range(q):
        s, t = map(int, e().split())
        s -= 1
        a, b = split(rt, s)
        b, c = split(b, t - s)
        rt = merge(a, merge(c, b))
    ans = []
    dfs(rt)
    print("".join(ans))
main()
```

### [Substring Reversals](https://cses.fi/problemset/task/2073)

```python
def main():
    from sys import stdin
    from random import randrange
    e = stdin.readline
    VAL, LE, RI, SIZ, REV = range(5)
    new_node = lambda v: [v, None, None, 1, 0]

    def size(o):
        return o[SIZ] if o else 0

    def pull(o):
        o[SIZ] = 1 + size(o[LE]) + size(o[RI])

    def update(o):
        if not o: return
        o[LE], o[RI] = o[RI], o[LE]
        o[REV] ^= 1

    def push(o):
        if not o[REV]: return
        o[REV] = 0
        update(o[LE])
        update(o[RI])

    def merge(a, b):
        if not a or not b:
            return a if a else b
        sa, sb = size(a), size(b)
        if randrange(0, sa + sb) < sa:
            push(o := a)
            a[RI] = merge(a[RI], b)
        else:
            push(o := b)
            b[LE] = merge(a, b[LE])
        pull(o)
        return o

    def split(o, k):
        if not o: return o, o
        push(o)
        if (ls := size(o[LE])) < k:
            a = o
            o[RI], b = split(o[RI], k - ls - 1)
        else:
            b = o
            a, o[LE] = split(o[LE], k)
        pull(o)
        return a, b

    def dfs(o):
        if not o: return
        push(o)
        dfs(o[LE])
        ans.append(o[VAL])
        dfs(o[RI])

    n, q = map(int, e().split())
    s = e()

    rt = None
    for i in range(n):
        rt = merge(rt, new_node(s[i]))
    for _ in range(q):
        s, t = map(int, e().split())
        s -= 1
        a, b = split(rt, s)
        b, c = split(b, t - s)
        update(b)
        rt = merge(a, merge(b, c))
    ans = []
    dfs(rt)
    print("".join(ans))
main()
```

### [Reversals and Sums](https://cses.fi/problemset/task/2074)

```python
def main():
    from sys import stdin
    from random import randrange
    e = stdin.readline
    VAL, SUM, LE, RI, SIZ, REV = range(6)
    new_node = lambda v: [v, v, None, None, 1, 0]

    def size(o):
        return o[SIZ] if o else 0

    def pull(o):
        o[SIZ] = 1
        o[SUM] = o[VAL]
        if ch := o[LE]:
            o[SIZ] += ch[SIZ]
            o[SUM] += ch[SUM]
        if ch := o[RI]:
            o[SIZ] += ch[SIZ]
            o[SUM] += ch[SUM]

    def update(o):
        if not o: return
        o[LE], o[RI] = o[RI], o[LE]
        o[REV] ^= 1

    def push(o):
        if not o[REV]: return
        o[REV] = 0
        update(o[LE])
        update(o[RI])

    def merge(a, b):
        if not a or not b:
            return a if a else b
        sa, sb = size(a), size(b)
        if randrange(0, sa + sb) < sa:
            push(o := a)
            a[RI] = merge(a[RI], b)
        else:
            push(o := b)
            b[LE] = merge(a, b[LE])
        pull(o)
        return o

    def split(o, k):
        if not o: return o, o
        push(o)
        if (ls := size(o[LE])) < k:
            a = o
            o[RI], b = split(o[RI], k - ls - 1)
        else:
            b = o
            a, o[LE] = split(o[LE], k)
        pull(o)
        return a, b

    n, q = map(int, e().split())

    rt = None
    for v in map(int, e().split()):
        rt = merge(rt, new_node(v))
    ans = []
    for _ in range(q):
        o, s, t = map(int, e().split())
        s -= 1
        a, b = split(rt, s)
        b, c = split(b, t - s)
        if o == 1:
            update(b)
        else:
            ans.append(b[SUM] if b else 0)
        rt = merge(a, merge(b, c))
    print("\n".join(map(str, ans)))
main()
```

### [Necessary Roads](https://cses.fi/problemset/task/2076)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline
    setrecursionlimit(10**5 + 10)

    def tarjan(i, pa):
        nonlocal dfnn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        for j in G[i]:
            if not dfn[j]:
                tarjan(j, i)
                if low[j] < low[i]: low[i] = low[j]
                if low[j] > dfn[i]: ans.append(f"{i + 1} {j + 1}")
            elif j != pa and dfn[j] < low[i]:
                low[i] = dfn[j]

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    dfn = [0] * n
    low = [0] * n
    dfnn = 0
    ans = []
    for i in range(n):
        if not dfn[i]:
            tarjan(i, -1)
    print(len(ans))
    print("\n".join(ans))
main()
```

### [Necessary Cities](https://cses.fi/problemset/task/2077)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline
    setrecursionlimit(10**5 + 10)

    def tarjan(i, pa):
        nonlocal dfnn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        ch = 0
        for j in G[i]:
            if not dfn[j]:
                ch += 1
                tarjan(j, i)
                if low[j] < low[i]: low[i] = low[j]
                if i != pa and low[j] >= dfn[i]: ans[i] = True
            elif dfn[j] < low[i]:
                low[i] = dfn[j]
        if i == pa and ch >= 2:
            ans[i] = True

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    dfn = [0] * n
    low = [0] * n
    dfnn = 0
    ans = [False] * n
    for i in range(n):
        if not dfn[i]:
            tarjan(i, i)
    print(sum(ans))
    print(" ".join(f"{i + 1}" for i in range(n) if ans[i]))
main()
```

### [Eulerian Subgraphs](https://cses.fi/problemset/task/2078)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    n, m = map(int, e().split())
    dsu = [-1] * n
    r = n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        r -= merge(a, b)
    print(pow(2, m - n + r, 10**9 + 7))
main()
```

### [Monster Game I](https://cses.fi/problemset/task/2084)

```python
def main():
    from sys import stdin
    e = stdin.readline

    p = [0]
    n, p[0] = map(int, e().split())
    l = list(map(int, e().split()))
    p += list(map(int, e().split()))

    def y(i, x):
        return dp[i] + x * p[i]

    def compare_inter_x(i, j, k):
        dx1, dy1 = p[i] - p[j], dp[j] - dp[i]
        dx2, dy2 = p[j] - p[k], dp[k] - dp[j]
        return dy1 * dx2 >= dy2 * dx1

    dp = [0] * (n + 1)
    hi = 0
    h = [0]
    for i in range(1, n + 1):
        v = l[i - 1]
        while hi + 1 < len(h) and y(h[hi], v) > y(h[hi + 1], v):
            hi += 1
        dp[i] = y(h[hi], v)
        while len(h) >= 2 and compare_inter_x(h[-2], h[-1], i):
            h.pop()
        h.append(i)
    print(dp[n])
main()
```

### [Monster Game II](https://cses.fi/problemset/task/2085)

```python
def main():
    from sys import stdin
    e = stdin.readline
    inf = float("INF")
    m = 10**6 + 1

    n, p0 = map(int, e().split())
    l = list(map(int, e().split()))
    p = list(map(int, e().split()))

    tr = [(0, inf)] * (m << 2)

    def y(x, v):
        return v[0] * x + v[1]

    def add(v):
        o, s, t = 1, 0, m
        while s + 1 < t:
            mid = s + t >> 1
            if v[0] < tr[o][0]:
                tr[o], v = v, tr[o]
            if y(mid, v) >= y(mid, tr[o]):
                o = o << 1 | 0
                t = mid
            else:
                tr[o], v = v, tr[o]
                o = o << 1 | 1
                s = mid
        if y(s, v) < y(s, tr[o]):
            tr[o] = v

    def query(x):
        res = inf
        o, s, t = 1, 0, m
        while True:
            res = min(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1 | 0
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    add((p0, 0))
    for i in range(n):
        ans = query(l[i])
        add((p[i], ans))
    print(ans)
main()
```

### [Subarray Squares](https://cses.fi/problemset/task/2086)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline
    inf = 10**20

    n, k = map(int, e().split())
    n, k = n + 1, k + 1
    l = list(accumulate(map(int, e().split()), initial=0))

    def y(x, line):
        return line[0] * x + line[1]

    def compare_inter_x(a, b, c):
        return (b[1] - a[1]) * (b[0] - c[0]) >= (c[1] - b[1]) * (a[0] - b[0])

    def add(line):
        while len(h) >= 2 and compare_inter_x(h[-2], h[-1], line):
            h.pop()
        h.append(line)

    make_line = lambda v, x: (-v << 1, x + v ** 2)

    dp = [inf] * n
    dp[0] = 0
    for kk in range(1, k):
        h = []
        hi = 0
        add(make_line(0, dp[0]))
        dp[0] = inf
        for i in range(1, n):
            # p[i] = min(d[j] + (l[i] - l[j]) ** 2 for j in range(i))
            up, v = dp[i], l[i]
            hi = min(hi, len(h) - 1)
            while hi + 1 < len(h) and y(v, h[hi]) > y(v, h[hi + 1]):
                hi += 1
            dp[i] = (h[hi][0] + v) * v + h[hi][1]
            add(make_line(v, up))
    print(dp[-1])
main()
```

### [Houses and Schools](https://cses.fi/problemset/task/2087)

```python
def main():
    from sys import stdin
    e = stdin.readline
    inf = 10**20

    n, k = map(int, e().split())
    n += 1
    l = [0] + list(map(int, e().split()))
    li = [0] * n
    for i in range(1, n):
        li[i] = li[i - 1] + l[i] * i
        l[i] += l[i - 1]

    def y(x, line):
        return line[0] * x + line[1]

    def compare_inter_x(a, b, c):
        return (b[1] - a[1]) * (b[0] - c[0]) >= (c[1] - b[1]) * (a[0] - b[0])

    def add(h, line):
        while len(h) >= 2 and compare_inter_x(h[-2], h[-1], line):
            h.pop()
        h.append(line)

    def move(hi, h, x):
        hi = min(hi, len(h) - 1)
        while hi + 1 < len(h) and y(x, h[hi]) > y(x, h[hi + 1]):
            hi += 1
        return hi

    dp = [inf] * n
    dp[0] = 0
    for _ in range(k):
        pp = [inf] * n
        hv = []
        hp = []
        hiv = hip = 0
        for i in range(1, n):
            # pv[i] = min(dp[j] - li[i] + li[j] + l[i] * i - l[j] * i for j in range(i))
            # pp[i] = min(pv[j] + li[i] - li[j] - l[i] * j + l[j] * j for j in range(i + 1))
            # pv[i] = min(dp[j] + li[j] - l[j] * i for j in range(i)) - li[i] + l[i] * i
            # pp[i] = min(pv[j] - li[j] - l[i] * j + l[j] * j for j in range(i + 1)) + li[i]
            add(hp, (-l[i - 1], dp[i - 1] + li[i - 1]))
            hip = move(hip, hp, i)
            dpv = y(i, hp[hip]) - li[i] + l[i] * i
            add(hv, (-i, dpv - li[i] + l[i] * i))
            hiv = move(hiv, hv, l[i])
            pp[i] = y(l[i], hv[hiv]) + li[i]
        dp = pp
    print(dp[-1])
main()
```

### [Knuth Division](https://cses.fi/problemset/task/2088)

```python
def main():
    from sys import stdin
    inf = float("INF")
    e = stdin.readline

    n = int(e())
    l = [inf] + list(map(int, e().split())) + [inf]
    ans = 0

    for _ in range(n - 1):
        i = 1
        while l[i] > l[i + 2]:
            i += 1
        l[i] += l.pop(i + 1)
        ans += l[i]
        while l[i] > l[i - 1]:
            l[i], l[i - 1] = l[i - 1], l[i]
            i -= 1
    print(ans)
main()
```

### [Apples and Bananas](https://cses.fi/problemset/task/2111)

```python
m1 = 469762049
m2 = 998244353
g = 3

def main():
    from sys import stdin
    e = stdin.readline

    def ntt():
        nonlocal a2, b2
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                b1[i], b1[j] = b1[j], b1[i]
        a2, b2 = a1[:], b1[:]
        b = 1
        while b < n:
            wn1 = pow(g, (m1 - 1) // (b * 2), m1)
            wn2 = pow(g, (m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    x, y = b1[j + 0], b1[j + b] * w1
                    b1[j + 0] = (x + y) % m1
                    b1[j + b] = (x - y) % m1
                    x, y = b2[j + 0], b2[j + b] * w2
                    b2[j + 0] = (x + y) % m2
                    b2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1

    def ntt_inv():
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                a2[i], a2[j] = a2[j], a2[i]
        b = 1
        while b < n:
            wn1 = pow(g, -(m1 - 1) // (b * 2), m1)
            wn2 = pow(g, -(m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1
        inv_n1 = pow(n, -1, m1)
        inv_n2 = pow(n, -1, m2)
        mm = m1 * m2
        q1 = m1 * pow(m1, -1, m2)
        q2 = m2 * pow(m2, -1, m1)
        for i in range(2 * k + 1):
            r1 = (a1[i] * inv_n1) % m1
            r2 = (a2[i] * inv_n2) % m2
            a1[i] = (r1 * q2 + r2 * q1) % mm

    k, n, m = map(int, e().split())
    lim = 1 << k.bit_length() + 1  # min 2^x > 2k
    rev_bit = [0] * lim
    for i in range(1, lim):
        rev_bit[i] = rev_bit[i >> 1] >> 1 | (i & 1) * (lim >> 1)

    a1 = [0] * lim
    b1 = [0] * lim
    for v in map(int, e().split()):
        a1[v] += 1
    for v in map(int, e().split()):
        b1[v] += 1
    a2 = b2 = []
    ntt()
    for i in range(lim):
        a1[i] = (a1[i] * b1[i]) % m1
        a2[i] = (a2[i] * b2[i]) % m2
    ntt_inv()
    print(*a1[2:2*k+1])
main()
```

### [One Bit Positions](https://cses.fi/problemset/task/2112)

```python
mod = 998244353
g = 3

def main():
    from sys import stdin
    e = stdin.readline

    def ntt(l, inv):
        n = len(l)
        for i in range(n):
            if i < (j := rev_bit[i]):
                l[i], l[j] = l[j], l[i]
        b = 1
        while b < n:
            wn = pow(g, inv * (mod - 1) // (b * 2), mod)
            for i in range(0, n, b * 2):
                w = 1
                for j in range(i, i + b):
                    x, y = l[j + 0], l[j + b] * w
                    l[j + 0] = (x + y) % mod
                    l[j + b] = (x - y) % mod
                    w = (w * wn) % mod
            b <<= 1
        if inv == -1:
            for i in range(n):
                l[i] = (l[i] * inv_n) % mod

    a = list(map(int, e().rstrip()))
    n = len(a)
    lim = 1 << n.bit_length() + 1
    a += [0] * (lim - n)
    b = a[::-1]
    inv_n = pow(lim, -1, mod)
    rev_bit = [0] * lim
    for i in range(1, lim):
        rev_bit[i] = rev_bit[i >> 1] >> 1 | (i & 1) * (lim >> 1)

    ntt(a, 1)
    ntt(b, 1)
    for i in range(lim):
        a[i] = (a[i] * b[i]) % mod
    ntt(a, -1)
    a.reverse()
    print(*a[1:n])
main()
```

### [Signal Processing](https://cses.fi/problemset/task/2113)

```python
m1 = 469762049
m2 = 998244353
g = 3

def main():
    from sys import stdin
    e = stdin.readline

    def ntt():
        nonlocal a2, b2
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                b1[i], b1[j] = b1[j], b1[i]
        a2, b2 = a1[:], b1[:]
        b = 1
        while b < n:
            wn1 = pow(g, (m1 - 1) // (b * 2), m1)
            wn2 = pow(g, (m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    x, y = b1[j + 0], b1[j + b] * w1
                    b1[j + 0] = (x + y) % m1
                    b1[j + b] = (x - y) % m1
                    x, y = b2[j + 0], b2[j + b] * w2
                    b2[j + 0] = (x + y) % m2
                    b2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1

    def ntt_inv():
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                a2[i], a2[j] = a2[j], a2[i]
        b = 1
        while b < n:
            wn1 = pow(g, -(m1 - 1) // (b * 2), m1)
            wn2 = pow(g, -(m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1
        inv_n1 = pow(n, -1, m1)
        inv_n2 = pow(n, -1, m2)
        mm = m1 * m2
        q1 = m1 * pow(m1, -1, m2)
        q2 = m2 * pow(m2, -1, m1)
        for i in range(k):
            r1 = (a1[i] * inv_n1) % m1
            r2 = (a2[i] * inv_n2) % m2
            a1[i] = (r1 * q2 + r2 * q1) % mm

    n, m = map(int, e().split())
    k = n + m - 1
    a1 = list(map(int, e().split()))
    b1 = list(map(int, e().split()))[::-1]
    lim = 1 << (n + m).bit_length()
    a1 += [0] * (lim - n)
    b1 += [0] * (lim - m)
    rev_bit = [0] * lim
    for i in range(1, lim):
        rev_bit[i] = rev_bit[i >> 1] >> 1 | (i & 1) * (lim >> 1)

    a2 = b2 = []
    ntt()
    for i in range(lim):
        a1[i] = (a1[i] * b1[i]) % m1
        a2[i] = (a2[i] * b2[i]) % m2
    ntt_inv()
    print(*a1[:k])
main()
```

### [New Roads Queries](https://cses.fi/problemset/task/2101)

```python
# TODO: 1. Parallel Binary Search, 2. kruskal's spanning tree

def main():
    from sys import stdin
    from bisect import bisect_left
    e = stdin.readline
    VAL = LE = 0
    RI = 1

    def build(s, t):
        if s + 1 == t:
            return [-1]
        mid = s + t >> 1
        return [build(s, mid), build(mid, t)]

    def modify(o, s, t, i, v):
        o = o.copy()
        if s + 1 == t:
            o[VAL] = v
        else:
            mid = s + t >> 1
            if i < mid:
                o[LE] = modify(o[LE], s, mid, i, v)
            else:
                o[RI] = modify(o[RI], mid, t, i, v)
        return o

    def query(o, i):
        s, t = 0, m
        while s + 1 < t:
            mid = s + t >> 1
            if i < mid:
                o = o[LE]
                t = mid
            else:
                o = o[RI]
                s = mid
        return o[VAL]

    def find(o, x):
        p = query(o, x)
        if p < 0: return o, x
        o, p = find(o, p)
        o = modify(o, 0, m, x, p)
        return o, p

    def merge(o, a, b):
        o, a = find(o, a)
        o, b = find(o, b)
        if a != b:
            ra, rb = query(o, a), query(o, b)
            if ra == rb: o = modify(o, 0, m, a, ra - 1)
            elif ra > rb: a, b = b, a
            o = modify(o, 0, m, b, a)
        return o

    n, m, q = map(int, e().split())
    m += 1
    os = [o := build(0, m)]
    for i in range(1, m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        o = merge(o, a, b)
        os.append(o)
    ans = []

    def check(x):
        os[x], aa = find(os[x], a)
        os[x], bb = find(os[x], b)
        return aa == bb

    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        if find(o, a) != find(o, b):
            ans.append(-1)
            continue
        ans.append(bisect_left(range(m), True, key=check))
    print(*ans, sep="\n")
main()
```

### [Dynamic Connectivity](https://cses.fi/problemset/task/2133)

*WIP*

### [Parcel Delivery](https://cses.fi/problemset/task/2121)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def dinic(n: int, edges: list, s: int, t: int):
        from collections import deque
        from heapq import heappush, heappop

        inf = 10**20
        m = len(edges) << 1

        def spfa():
            q = deque([s])
            inq[s] = True
            h[s] = 0
            while q:
                i = q.popleft()
                inq[i] = False
                for j, ei in G[i]:
                    if flow[ei] == cap[ei]: continue
                    nv = h[i] + cost[ei]
                    if nv >= h[j]: continue
                    h[j] = nv
                    if not inq[j]:
                        inq[j] = True
                        q.append(j)

        def dijkstra():
            q = [(0, s)]
            dis = [inf] * n
            dis[s] = 0
            while q:
                v, i = heappop(q)
                if v > dis[i]: continue
                for j, ei in G[i]:
                    if flow[ei] == cap[ei]: continue
                    nv = v + cost[ei] + h[i] - h[j]
                    if nv >= dis[j]: continue
                    dis[j] = nv
                    heappush(q, (nv, j))
            for i in range(n):
                h[i] += dis[i]
            return dis[t] < inf

        def dfs(i, limit):
            nonlocal min_cost
            if i == t:
                return limit
            inq[i] = True
            sum_flow = 0
            for j, ei in G[i]:
                if inq[j]: continue
                if flow[ei] == cap[ei]: continue
                edge_cost = cost[ei]
                if h[j] != h[i] + edge_cost: continue
                pushed = dfs(j, min(limit - sum_flow, cap[ei] - flow[ei]))
                min_cost += pushed * edge_cost
                sum_flow += pushed
                flow[ei] += pushed
                flow[ei ^ 1] -= pushed
                if sum_flow == limit: break
            inq[i] = False
            if not sum_flow:
                h[i] = inf
            return sum_flow

        flow = [0] * m
        cap = [0] * m
        cost = [0] * m
        G = [[] for _ in range(n)]
        for ei, (i, j, w, c) in enumerate(edges):
            ei <<= 1
            cap[ei] = w
            cost[ei] = c
            cost[ei | 1] = -c
            G[i].append((j, ei))
            G[j].append((i, ei | 1))

        h = [inf] * n
        inq = [False] * n
        spfa()

        max_flow = min_cost = 0
        while dijkstra():
            max_flow += dfs(s, inf)
        return max_flow, min_cost

    n, m, k = map(int, e().split())
    es = []
    for _ in range(m):
        a, b, w, c = map(int, e().split())
        es.append((a - 1, b - 1, w, c))
    es.append((n - 1, n, k, 0))

    max_flow, min_cost = dinic(n + 1, es, 0, n)
    print(min_cost if max_flow == k else -1)
main()
```

### [Task Assignment](https://cses.fi/problemset/task/2129)

```python
def main():
    from sys import stdin
    e = stdin.readline
    inf = float("INF")

    def KM(g):  # 完全二分圖最小權完美匹配
        n = len(g)

        l = [0] * (n * 2 + 1)
        pr = [n] * (n + 1)
        pre = [0] * n
        for s in range(n):
            p = n
            pr[p] = s
            slack = [inf] * n
            vis = [0] * (n + 1)
            while True:
                vis[p] = True
                i = pr[p]
                delta = inf
                for j in range(n):
                    if vis[j]: continue
                    d = g[i][j] - l[i] - l[~j]
                    if d < slack[j]:
                        slack[j] = d
                        pre[j] = p
                    if slack[j] < delta:
                        delta = slack[j]
                        q = j
                for j in range(n + 1):
                    if vis[j]:
                        l[pr[j]] += delta
                        l[~j] -= delta
                    else:
                        slack[j] -= delta
                p = q
                if pr[p] == n: break
            q = 0
            while q < n:
                q = pre[p]
                pr[p] = pr[q]
                p = q

        return -l[n], pr

    n = int(e())
    l = [list(map(int, e().split())) for _ in range(n)]
    ans, pr = KM(l)
    print(ans)
    print("\n".join(f"{pr[j] + 1} {j + 1}" for j in range(n) if ~pr[j]))
main()
```

### [Distinct Routes II](https://cses.fi/problemset/task/2130)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def dinic(n: int, edges: list, s: int, t: int):
        from collections import deque
        from heapq import heappush, heappop

        inf = 10**20
        m = len(edges) << 1

        def spfa():
            q = deque([s])
            inq[s] = True
            h[s] = 0
            while q:
                i = q.popleft()
                inq[i] = False
                for j, ei in G[i]:
                    if flow[ei] == cap[ei]: continue
                    nv = h[i] + cost[ei]
                    if nv >= h[j]: continue
                    h[j] = nv
                    if not inq[j]:
                        inq[j] = True
                        q.append(j)

        def dijkstra():
            q = [(0, s)]
            dis = [inf] * n
            dis[s] = 0
            while q:
                v, i = heappop(q)
                if v > dis[i]: continue
                for j, ei in G[i]:
                    if flow[ei] == cap[ei]: continue
                    nv = v + cost[ei] + h[i] - h[j]
                    if nv >= dis[j]: continue
                    dis[j] = nv
                    heappush(q, (nv, j))
            for i in range(n):
                h[i] += dis[i]
            return dis[t] < inf

        def dfs(i, limit):
            nonlocal min_cost
            if i == t:
                return limit
            inq[i] = True
            sum_flow = 0
            for j, ei in G[i]:
                if inq[j]: continue
                if flow[ei] == cap[ei]: continue
                edge_cost = cost[ei]
                if h[j] != h[i] + edge_cost: continue
                pushed = dfs(j, min(limit - sum_flow, cap[ei] - flow[ei]))
                min_cost += pushed * edge_cost
                sum_flow += pushed
                flow[ei] += pushed
                flow[ei ^ 1] -= pushed
                if sum_flow == limit: break
            inq[i] = False
            if not sum_flow:
                h[i] = inf
            return sum_flow

        flow = [0] * m
        cap = [0] * m
        cost = [0] * m
        G = [[] for _ in range(n)]
        for ei, (i, j, w, c) in enumerate(edges):
            ei <<= 1
            cap[ei] = w
            cost[ei] = c
            cost[ei | 1] = -c
            G[i].append((j, ei))
            G[j].append((i, ei | 1))

        h = [inf] * n
        inq = [False] * n
        spfa()

        max_flow = min_cost = 0
        while dijkstra():
            max_flow += dfs(s, inf)
        return max_flow, min_cost, G, flow

    n, m, k = map(int, e().split())
    es = []
    for _ in range(m):
        a, b = map(int, e().split())
        es.append((a - 1, b - 1, 1, 1))
    es.append((n - 1, n, k, 0))

    max_flow, min_cost, G, flow = dinic(n + 1, es, 0, n)
    if max_flow < k:
        print(-1)
        return
    print(min_cost)

    for i in range(n - 1):
        G[i] = iter(G[i])

    for i, ei in G[0]:
        if flow[ei] < 1: continue
        cur = [1]
        while i != n:
            cur.append(i + 1)
            i = next(j for j, ei in G[i] if flow[ei] >= 1)
        print(len(cur))
        print(*cur)
main()
```

## Sliding Window Problems

### [Sliding Window Sum](https://cses.fi/problemset/task/3220)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    x, a, b, c = map(int, e().split())

    cur = 0
    p = v = x
    for i in range(k):
        cur += v
        v = (a * v + b) % c
    ans = cur
    for i in range(n - k):
        cur -= p
        cur += v
        ans ^= cur
        p = (a * p + b) % c
        v = (a * v + b) % c
    print(ans)
main()
```

### [Sliding Window Minimum](https://cses.fi/problemset/task/3221)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    x, a, b, c = map(int, e().split())
    m = n - k + 1

    l = [0] * n
    for i in range(n):
        l[i] = x
        x = (a * x + b) % c

    ans = 0
    for s in range(0, m, k):
        for i in range(s + k - 1, s, -1):
            l[i - 1] = min(l[i - 1], l[i])
        cur = c
        for i in range(s, min(m, s + k)):
            cur = min(cur, l[i + k - 1])
            ans ^= min(l[i], cur)
    print(ans)
main()
```

### [Sliding Window Xor](https://cses.fi/problemset/task/3426)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    x, a, b, c = map(int, e().split())

    cur = 0
    p = v = x
    for i in range(k):
        cur ^= v
        v = (a * v + b) % c
    ans = cur
    for i in range(n - k):
        cur ^= p
        cur ^= v
        ans ^= cur
        p = (a * p + b) % c
        v = (a * v + b) % c
    print(ans)
main()
```

### [Sliding Window Or](https://cses.fi/problemset/task/3405)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    x, a, b, c = map(int, e().split())
    m = n - k + 1

    l = [0] * n
    for i in range(n):
        l[i] = x
        x = (a * x + b) % c

    ans = 0
    for s in range(0, m, k):
        for i in range(s + k - 1, s, -1):
            l[i - 1] |= l[i]
        cur = 0
        for i in range(s, min(m, s + k)):
            cur |= l[i + k - 1]
            ans ^= l[i] | cur
    print(ans)
main()
```

### [Sliding Window Distinct Values](https://cses.fi/problemset/task/3222)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    d = dict.fromkeys(l, 0)

    cur = 0
    ans = []
    for i, v in enumerate(l):
        cur += d[v] == 0
        d[v] += 1
        if i >= k:
            p = l[i - k]
            d[p] -= 1
            cur -= d[p] == 0
        if i >= k - 1:
            ans.append(cur)
    print(*ans)
main()
```

### [Sliding Window Mode](https://cses.fi/problemset/task/3224)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    d = dict.fromkeys(l, 0)

    h = []
    ans = []
    for i, v in enumerate(l):
        d[v] += 1
        heappush(h, (-d[v], v))
        if i >= k:
            d[l[i - k]] -= 1
        if i >= k - 1:
            while d[h[0][1]] != -h[0][0]:
                heappop(h)
            ans.append(h[0][1])
    print(*ans)
main()
```

### [Sliding Window Mex](https://cses.fi/problemset/task/3219)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def add(i, v):
        i += 1
        while i <= k:
            bit[i] += v
            i += i & -i

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    hb = 1 << n.bit_length() - 1
    cnt = [0] * k
    bit = [0] * (k + 1)

    ans = []
    for i, v in enumerate(l):
        if v < k:
            if cnt[v] == 0:
                add(v, 1)
            cnt[v] += 1
        if i >= k and (p := l[i - k]) < k:
            cnt[p] -= 1
            if cnt[p] == 0:
                add(p, -1)
        if i >= k - 1:
            res = 0
            b = hb
            while b:
                if res + b <= k and bit[res + b] == b:
                    res += b
                b >>= 1
            ans.append(res)
    print(*ans)
main()
```

### [Sliding Window Median](https://cses.fi/problemset/task/1076)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def add(i, v):
        i += 1
        while i <= m:
            bit[i] += v
            i += i & -i

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    hb = 1 << n.bit_length() - 1
    half = k + 1 >> 1
    sl = sorted(set(l))
    mp = {v: i for i, v in enumerate(sl)}
    m = len(mp)
    bit = [0] * (m + 1)

    ans = []
    for i in range(n):
        add(mp[l[i]], 1)
        if i >= k:
            add(mp[l[i - k]], -1)
        if i >= k - 1:
            idx = cur = 0
            b = hb
            while b:
                if idx + b <= m and cur + bit[idx + b] < half:
                    idx += b
                    cur += bit[idx]
                b >>= 1
            ans.append(sl[idx])
    print(*ans)
main()
```

### [Sliding Window Cost](https://cses.fi/problemset/task/1077)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    e = stdin.readline

    def pack(v, i):
        return v << 20 | i

    def unpack(x):
        return x >> 20, x & 0xfffff

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    half = k + 1 >> 1

    ans = []
    le, ri = [], []
    lc = 0  # 有效(not outdated)元素數量
    ls = rs = 0  # 維護左右總和
    for i, v in enumerate(l):
        # 因為要取用 ri[0] 所以要先將 outdated 移除
        # 注意這邊是 < i - k 而非 <=
        while ri and unpack(ri[0])[1] < i - k:
            heappop(ri)
        # 決定要加到左邊或右邊
        if not ri or pack(v, i) < ri[0]:
            lc += 1
            ls += v
            heappush(le, pack(-v, i))
        else:
            rs += v
            heappush(ri, pack(v, i))
        if i >= k:
            p = l[i - k]
            # 剛剛已經將 outdated 移除，這邊免了
            # 決定要從左邊或右邊刪除
            if not ri or pack(p, i - k) < ri[0]:
                lc -= 1
                ls -= p
            else:
                rs -= p
        if i >= k - 1:
            # 維持左邊有效元素數量 == half
            while lc > half:
                pv, pi = unpack(heappop(le))
                if pi + k <= i: continue
                lc -= 1
                ls -= -pv
                rs += -pv
                heappush(ri, pack(-pv, pi))
            while lc < half:
                pv, pi = unpack(heappop(ri))
                if pi + k <= i: continue
                lc += 1
                ls += pv
                rs -= pv
                heappush(le, pack(-pv, pi))
            # 刪除左邊 outdated
            # 注意這邊是 <= i - k 而非 <
            while unpack(le[0])[1] <= i - k:
                heappop(le)
            ans.append(rs - ls + (-unpack(le[0])[0] if k & 1 else 0))
    print(*ans)
main()
```

### [Sliding Window Inversions](https://cses.fi/problemset/task/3223)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def add(i, v):
        i += 1
        while i <= m:
            bit[i] += v
            i += i & -i

    def query(s, t):
        res = 0
        while t > s:
            res += bit[t]
            t &= t-1
        while s > t:
            res -= bit[s]
            s &= s-1
        return res

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    mp = {v: i for i, v in enumerate(sorted(set(l)))}
    m = len(mp)
    bit = [0] * (m + 1)

    ans = []
    cur = 0
    for i in range(n):
        v = mp[l[i]]
        cur += query(v + 1, m)
        add(v, 1)
        if i >= k:
            p = mp[l[i - k]]
            add(p, -1)
            cur -= query(0, p)
        if i >= k - 1:
            ans.append(cur)
    print(*ans)
main()
```

### [Sliding Window Advertisement](https://cses.fi/problemset/task/3227)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    m = n - k + 1

    tr = [(0, 0)] * (m << 2)

    def y(x, v):
        return x * v[0] + v[1]

    def modify(qs, qt, v):
        stk = [(1, 0, m)]
        while stk:
            o, s, t = stk.pop()
            if qt <= s or  t <= qs: continue
            if qs <= s and t <= qt:
                vv = v
                while True:
                    mid = s + t >> 1
                    if y(mid, vv) > y(mid, tr[o]): tr[o], vv = vv, tr[o]
                    if y(s, vv) > y(s, tr[o]):
                        o = o << 1 | 0
                        t = mid
                        continue
                    if y(t - 1, vv) > y(t - 1, tr[o]):
                        o = o << 1 | 1
                        s = mid
                        continue
                    break
            else:
                mid = s + t >> 1
                if qs < mid:
                    stk.append((o << 1 | 0, s, mid))
                if qt > mid:
                    stk.append((o << 1 | 1, mid, t))

    def query(x):
        res = 0
        o, s, t = 1, 0, m
        while True:
            res = max(res, y(x, tr[o]))
            if s + 1 == t: break
            mid = s + t >> 1
            if x < mid:
                o = o << 1
                t = mid
            else:
                o = o << 1 | 1
                s = mid
        return res

    def add(s, t, h):
        w = min(t - s, k)
        ss = t - k
        if ss > s: s, ss = ss, s
        # h * (x - ss) + h * w
        # h * x + h * (w - ss)
        modify(0, ss, (h, h * (w - ss)))
        modify(ss, s, (0, h * w))
        # -h * (x - s) + h * w
        # -h * x + h * (w + s)
        modify(s, m, (-h, h * (w + s)))

    stk = []
    pi = -1
    for i, v in enumerate(l):
        while ~pi and l[pi] >= v:
            h = l[pi]
            le = (pi := stk.pop()) + 1
            add(le, i, h)
        stk.append(pi)
        pi = i
    while ~pi:
        h = l[pi]
        le = (pi := stk.pop()) + 1
        add(le, n, h)
    print(*[query(x) for x in range(m)])
main()
```

## Interactive Problems

### [Hidden Integer](https://cses.fi/problemset/task/3112)

```python
def query(x: int) -> bool:
    # return x < secret
    print(f"? {x}", flush=True)
    return input() == "YES"

def main():
    s, t = 1, 10**9 + 1
    while s < t:
        mid = s + t >> 1
        if query(mid):
            s = mid + 1
        else:
            t = mid
    print(f"! {s}")
main()
```

### [Hidden Permutation](https://cses.fi/problemset/task/3139)

```python
def query(i: int, j: int) -> bool:
    # return secret[i] < secret[j]
    print(f"? {i + 1} {j + 1}", flush=True)
    return input() == "YES"

def main():
    from functools import cmp_to_key
    n = int(input())
    def cmp(i: int, j: int) -> int:
        return -1 if query(i, j) else 1
    l = list(range(n))
    l.sort(key=cmp_to_key(cmp))
    print("!", *[l.index(i) + 1 for i in range(n)])
main()
```

### [K-th Highest Score](https://cses.fi/problemset/task/3305)

```python
n, k = map(int, input().split())

def query(g: int, x: int) -> int:
    if x <= 0: return 10**10
    if x > n: return 0
    # return [f, s][g][x - 1]
    return int(input(f'{"FS"[g]} {x}\n'))

def main():
    s, t = 0, n + 1
    while s < t:
        mid = s + t >> 1
        if query(0, mid) < query(1, k - mid):
            t = mid
        else:
            s = mid + 1
    print("!", max(query(0, s), query(1, k - s + 1)))
main()
```

### [Permuted Binary Strings](https://cses.fi/problemset/task/3228)

```python
n = int(input())

def query(b: list[int]) -> list[int]:
    # return [b[v] for v in secret]
    print("?", "".join(map(str, b)))
    return list(map(int, input()))

def main():
    bl = n.bit_length()
    ans = [0] * n
    for k in range(bl):
        b = query([(i >> k) & 1 for i in range(n)])
        for i in range(n):
            ans[i] |= b[i] << k
    print("!", *[v + 1 for v in ans])
main()
```

### [Colored Chairs](https://cses.fi/problemset/task/3273)

```python
n = int(input())

def query(i: int) -> bool:
    # return secret[i]
    print("?", i + 1)
    return input() == "R"

def main():
    i, m = 0, n >> 1
    c0 = query(i)
    while m:
        if i + m < n:
            c1 = query(i + m)
            if (c0 == c1) ^ (m & 1):
                i += m
                c0 = c1
        m >>= 1
    print("!", i + 1)
main()
```

### [Inversion Sorting](https://cses.fi/problemset/task/3140)

```python
n = int(input())

def query(i, j):
    print(i + 1, j)
    return int(input())
    secret[i:j] = secret[i:j][::-1]
    return sum(secret[j] > secret[i] for i in range(n) for j in range(i))

def main():
    ans = []
    pre = query(0, n); query(0, n)
    rest = [1] * n
    r = n
    for i in range(1, n):
        r -= 1
        cur = query(i, n) - pre
        sm = 0
        for v in range(n):
            if rest[v]:
                if sm - (r - sm) == cur:
                    ans.append(v)
                    rest[v] = 0
                    break
                sm += 1
        pre += cur
        query(i, n)
    ans.append(rest.index(1))

    for v in range(n):
        i = ans.index(v)
        ans[v:i+1] = ans[v:i+1][::-1]
        query(v, i + 1)
main()
```

## Bitwise Operations

### [Counting Bits](https://cses.fi/problemset/task/1146)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e()) + 1
    ans = 0
    b = 1
    mask = -1
    while b < n:
        ans += ((n >> 1) & mask)
        mask <<= 1
        if (r := n & ~mask) > b:
            ans += r - b
        b <<= 1
    print(ans)
main()
```

### [Maximum Xor Subarray](https://cses.fi/problemset/task/1655)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    from operator import xor
    e = stdin.readline

    n = int(e())
    l = list(accumulate(map(int, e().split()), func=xor, initial=0))
    ans = 0
    b, mask = 1 << 29, -1 << 29
    while b:
        t = ans | b
        p = {v & mask for v in l}
        for v in p:
            if v ^ t in p:
                ans = t
                break
        b >>= 1
        mask >>= 1
    print(ans)
main()
```

### [Maximum Xor Subset](https://cses.fi/problemset/task/3191)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    bl = max(l).bit_length()

    basis = [0] * bl
    for v in l:
        for k in reversed(range(bl)):
            if (v >> k) & 1 == 0: continue
            if not basis[k]:
                basis[k] = v
                break
            v ^= basis[k]

    ans = 0
    for b in reversed(basis):
        ans = max(ans, ans ^ b)
    print(ans)
main()
```

### [Number of Subset Xors](https://cses.fi/problemset/task/3211)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    bl = max(l).bit_length()

    basis = [0] * bl
    for v in l:
        for k in reversed(range(bl)):
            if (v >> k) & 1 == 0: continue
            if not basis[k]:
                basis[k] = v
                break
            v ^= basis[k]

    print(1 << bl - basis.count(0))
main()
```

### [K Subset Xors](https://cses.fi/problemset/task/3192)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))
    bl = max(l).bit_length()

    m = 0
    basis = [0] * bl
    for v in l:
        for s in reversed(range(bl)):
            if (v >> s) & 1 == 0: continue
            if not basis[s]:
                m += 1
                basis[s] = v
                break
            v ^= basis[s]

    def dfs(x, s, cur):
        if cur >= lo:
            cand.append(x)
            return
        if basis[s]:
            dfs(x, s + 1, cur << 1)
            dfs(x ^ basis[s], s + 1, cur << 1)
        else:
            dfs(x, s + 1, cur)

    r = min(19, n - m)
    lo = (k - 1 + (1 << r)) >> r
    cand = []
    dfs(0, 0, 1)
    cand.sort()
    ans = []
    for v in cand:
        ans += [v] * (1 << r)
        if len(ans) >= k: break
    print(*ans[:k])
main()
```

### [All Subarray Xors](https://cses.fi/problemset/task/3233)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    from operator import xor
    e = stdin.readline

    def fwt(a, inv):
        b = 1
        while b * 2 <= lim:
            for i in range(0, lim, b * 2):
                for j in range(i, i + b):
                    x, y = a[j + 0], a[j + b]
                    a[j + 0] = x + y
                    a[j + b] = x - y
                    if inv:
                        a[j + 0] >>= 1
                        a[j + b] >>= 1
            b <<= 1

    n = int(e())
    l = list(accumulate(map(int, e().split()), xor, initial=0))
    lim = 1 << max(l).bit_length()

    a = [0] * lim
    for v in l:
        a[v] += 1
    zero = max(a) >= 2

    fwt(a, False)
    for i in range(lim):
        a[i] **= 2
    fwt(a, True)

    ans = [i for i in range(lim) if (a[i] if i else zero)]
    print(len(ans))
    print(*ans)
main()
```

### [Xor Pyramid Peak](https://cses.fi/problemset/task/2419)

```python
def main():
    from sys import stdin
    from functools import reduce
    from operator import xor
    e = stdin.readline

    mask = ~(int(e()) - 1)
    print(reduce(xor, (v for i, v in enumerate(map(int, e().split())) if mask & i == 0), 0))
main()
```

### [Xor Pyramid Diagonal](https://cses.fi/problemset/task/3194)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    bl = n.bit_length()

    for k in range(bl):
        b = 1 << k
        for i in range(n):
            if i & b:
                l[i] ^= l[i ^ b]
    print(*l)
main()
```

### [Xor Pyramid Row](https://cses.fi/problemset/task/3195)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))

    b = n - k
    while b:
        lb = b & -b
        for i in range(n - lb):
            l[i] ^= l[i + lb]
        b &= b - 1
    print(*l[:k])
main()
```

### [SOS Bit Problem](https://cses.fi/problemset/task/1654)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    bl = max(l).bit_length()

    bit = 1 << bl
    mask = bit - 1
    contain = [0] * bit
    inside = [0] * bit
    for v in l:
        contain[v] += 1
        inside[v] += 1
    for k in range(bl):
        b = 0
        bb = 1 << k
        while b < bit:
            b |= bb
            contain[b] += contain[b ^ bb]
            inside[b ^ bb] += inside[b]
            b += 1
    for v in l:
        print(contain[v], inside[v], n - contain[v ^ mask])
main()
```

### [And Subset Count](https://cses.fi/problemset/task/3141)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    n = int(e())
    l = list(map(int, e().split()))
    bl = n.bit_length()

    pow2 = [1] * (n + 1)
    for i in range(n):
        pow2[i + 1] = pow2[i] * 2 % mod

    bit = 1 << bl
    dp = [0] * bit
    for v in l:
        dp[v] += 1
    for k in range(bl):
        b = 0
        bb = 1 << k
        while b < bit:
            b |= bb
            dp[b ^ bb] += dp[b]
            b += 1
    for i in range(bit):
        dp[i] = pow2[dp[i]] - 1
    for k in range(bl):
        b = 0
        bb = 1 << k
        while b < bit:
            b |= bb
            dp[b ^ bb] -= dp[b]
            b += 1

    print(*[dp[i] % mod for i in range(n + 1)])
main()
```

## Construction Problems

### [Inverse Inversions](https://cses.fi/problemset/task/2214)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    lo, hi = 1, n
    ans = []
    while lo <= hi:
        if k >= hi - lo:
            ans.append(hi)
            k -= hi - lo
            hi -= 1
        else:
            ans.append(lo)
            lo += 1
    print(*ans)
main()
```

### [Monotone Subsequences](https://cses.fi/problemset/task/2215)

```python
def main():
    from sys import stdin
    e = stdin.readline

    ans = []
    for _ in range(int(e())):
        n, k = map(int, e().split())
        if n > k * k:
            ans.append("IMPOSSIBLE")
        else:
            n += 1
            l = []
            for i in range(1, n, k)[::-1]:
                l += range(i, min(n, i + k))
            ans.append(" ".join(map(str, l)))
    print("\n".join(ans))
main()
```

### [Third Permutation](https://cses.fi/problemset/task/3422)

```python
# TODO: optimize: https://cses.fi/problemset/hack/3422/entry/14322958/

def main():
    from sys import stdin
    from random import shuffle
    e = stdin.readline

    n = int(e())
    a = list(map(int, e().split()))
    b = list(map(int, e().split()))
    if n <= 2:
        print("IMPOSSIBLE")
        return
    c = list(range(1, n + 1))
    while True:
        if all(x != z and y != z for x, y, z in zip(a, b, c)):
            break
        shuffle(c)
    print(*c)
main()
```

### [Permutation Prime Sums](https://cses.fi/problemset/task/3423)

```python
# TODO: try optimizing(?): https://cses.fi/problemset/hack/3423/entry/13274103/

def main():
    n = int(input())
    lim = n * 2 + 1
    sieve = [True] * lim
    sieve[0] = sieve[1] = False
    for i, v in enumerate(sieve):
        if not v: continue
        for j in range(i * i, lim, i):
            sieve[j] = False
    ps = [i for i, v in enumerate(sieve) if v]

    pr = [0] * (n + 1)
    s = len(ps) - 1
    for i in range(n, 0, -1):
        if pr[i]: continue
        while i << 1 < ps[s]: s -= 1
        for pi in range(s, -1, -1):
            j = ps[pi] - i
            if not pr[j]:
                pr[j] = i
                pr[i] = j
                break
    print(*range(1, n + 1))
    print(*pr[1:])
main()
```

### [Chess Tournament](https://cses.fi/problemset/task/1697)

```python
def main():
    from sys import stdin
    from heapq import heapify, heappop, heappush
    e = stdin.readline

    n = int(e())
    h = [(-v, i) for i, v in enumerate(map(int, e().split())) if v]
    heapify(h)

    ans = []
    while h:
        vi, i = heappop(h)
        if len(h) < -vi:
            return print("IMPOSSIBLE")
        hh = [heappop(h) for _ in range(-vi)]
        for vj, j in hh:
            ans.append(f"{i + 1} {j + 1}")
            if vj < -1:
                heappush(h, (vj + 1, j))
    print(len(ans))
    print("\n".join(ans))
main()
```

### [Distinct Sums Grid](https://cses.fi/problemset/task/3424)

```python
n = int(input())
if n >= 5:
    print(n, *[1] * (n - 1))
    print(n, *range(1, n))
    for i in range(2, n):
        print(n, i, *range(i, n), *range(2, i))
elif n == 4:
    print("4 2 4 2\n4 2 3 4\n3 1 1 2\n3 1 3 1")
else:
    print("IMPOSSIBLE")
```

### [Filling Trominos](https://cses.fi/problemset/task/2423)

*WIP*

### [Grid Path Construction](https://cses.fi/problemset/task/2418)

*WIP*

## Advanced Graph Problems

### [Nearest Shops](https://cses.fi/problemset/task/3303)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m, k = map(int, e().split())
    cur = [(int(v) - 1, ) * 2 for v in e().split()]
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        G[a].append(b)
        G[b].append(a)

    dis = [[-1, -1] for _ in range(n)]
    p = [[-1, -1] for _ in range(n)]
    step = 1
    while cur:
        nxt = []
        for i, s in cur:
            for j in G[i]:
                a, b = p[j]
                if a == -1:
                    dis[j][0] = step
                    p[j][0] = s
                    nxt.append((j, s))
                elif a != s and b == -1:
                    dis[j][1] = step
                    p[j][1] = s
                    nxt.append((j, s))
        step += 1
        cur = nxt
    print(*[dis[i][p[i][0] == i] for i in range(n)])
main()
```

### [Prüfer Code](https://cses.fi/problemset/task/1134)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = [int(v) - 1 for v in e().split()]
    indeg = [0] * n
    for p in l:
        indeg[p] += 1
    ptr = 0
    while indeg[ptr]:
        ptr += 1
    leaf = ptr

    ans = []
    for pa in l:
        ans.append(f"{leaf + 1} {pa + 1}")
        indeg[pa] -= 1
        if indeg[pa] == 0 and pa < ptr:
            leaf = pa
        else:
            ptr += 1
            while indeg[ptr]:
                ptr += 1
            leaf = ptr
    ans.append(f"{leaf + 1} {n}")
    print("\n".join(ans))
main()
```

### [Tree Traversals](https://cses.fi/problemset/task/1702)

```python
def main():
    from sys import stdin
    from sys import setrecursionlimit
    e = stdin.readline

    setrecursionlimit(10**5 + 10)

    n = int(e())
    pre = [int(v) - 1 for v in e().split()]
    rk = [0] * (n + 1)
    rk[-1] = n
    for i, v in enumerate(map(int, e().split())):
        rk[v - 1] = i

    ans = []

    def dfs(i, p):
        j = next(pre, -1)
        if rk[j] < rk[i]:
            j = dfs(j, i)
        if rk[j] < rk[p]:
            j = dfs(j, p)
        ans.append(i + 1)
        return j

    pre = iter(pre)
    dfs(next(pre), -1)
    print(*ans)
main()
```

### [Course Schedule II](https://cses.fi/problemset/task/1757)

```python
def main():
    from sys import stdin
    from heapq import heappop, heappush
    e = stdin.readline

    n, m = map(int, e().split())
    outdeg = [0] * n
    R = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        R[b].append(a)
        outdeg[a] += 1

    ans = []
    q = [-i for i in range(n-1, -1, -1) if outdeg[i] == 0]
    for _ in range(n):
        i = -heappop(q)
        ans.append(i + 1)
        for j in R[i]:
            outdeg[j] -= 1
            if outdeg[j] == 0:
                heappush(q, -j)
    print(*reversed(ans))
main()
```

### [Acyclic Graph Edges](https://cses.fi/problemset/task/1756)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    for _ in range(m):
        a, b = map(int, e().split())
        if a > b: a, b = b, a
        print(a, b)
main()
```

### [Strongly Connected Edges](https://cses.fi/problemset/task/2177)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    es = [0] * m
    for i in range(m):
        a, b = map(int, e().split())
        a, b = a-1, b-1
        es[i] = a ^ b
        G[a].append(i)
        G[b].append(i)

    stk = [0]
    ans = [-1] * m
    vis = [False] * n
    it = [0] * n
    while stk:
        i = stk[-1]
        while it[i] < len(G[i]):
            ei = G[i][it[i]]
            it[i] += 1
            if ~ans[ei]: continue
            ans[ei] = i
            j = es[ei] ^ i
            ans.append(f"{i+1} {j+1}")
            stk.append(j)
            break
        else:
            stk.pop()
            vis[i] = True

    if not all(vis):
        return print("IMPOSSIBLE")

    q = [0]
    for i in q:
        for ei in G[i]:
            j = ans[ei]
            if j == i: continue
            if not vis[j]: continue
            vis[j] = False
            q.append(j)
    if any(vis):
        return print("IMPOSSIBLE")

    print("\n".join(f"{ans[ei] + 1} {(es[ei] ^ ans[ei]) + 1}" for ei in range(m)))
main()
```

### [Even Outdegree Edges](https://cses.fi/problemset/task/2179)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)
    for i, it in enumerate(G):
        G[i] = iter(it)

    pa = [-1] * n
    out = [0] * n
    ans = []
    stk = []
    instk = [False] * n
    for i in range(n):
        if ~pa[i]: continue
        pa[i] = i
        stk.append(i)
        instk[i] = True
        while stk:
            i = stk[-1]
            p = pa[i]
            for j in G[i]:
                if j == p: continue
                if instk[j]:
                    o, x = i, i ^ j
                    if out[j]: o ^= x
                    out[o] ^= 1
                    ans.append(f"{o + 1} {(o ^ x) + 1}")
                    continue
                if ~pa[j]: continue
                pa[j] = i
                stk.append(j)
                instk[j] = True
                break
            else:
                o, x = p, p ^ i
                if p == i:
                    if out[i]:
                        print("IMPOSSIBLE")
                        return
                else:
                    if out[i]: o ^= x
                    out[o] ^= 1
                    ans.append(f"{o + 1} {(o ^ x) + 1}")
                stk.pop()
                instk[i] = False
    print(*ans, sep="\n")
main()
```

### [Graph Girth](https://cses.fi/problemset/task/1707)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)

    ans = n + 1
    pa = [-1] * n
    for s in range(n):
        q = [s]
        dis = [-1] * n
        dis[s] = 0
        pa[s] = s
        for i in q:
            for j in G[i]:
                if j == pa[i]: continue
                if ~dis[j]:
                    ans = min(ans, dis[i] + dis[j] + 1)
                    if ans == 3:
                        print(ans)
                        return
                else:
                    dis[j] = dis[i] + 1
                    pa[j] = i
                    q.append(j)
    print(ans if ans <= n else -1)
main()
```

### [Fixed Length Walk Queries](https://cses.fi/problemset/task/3357)

```python
def main():
    from sys import stdin
    from collections import deque
    e = stdin.readline
    inf = float("INF")

    n, m, q = map(int, e().split())
    G = [[] for _ in range(n)]
    qs = [[] for _ in range(q)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)
    ans = [0] * q
    for i in range(q):
        a, b, x = map(int, e().split())
        a, b = a - 1, b - 1
        qs[a].append(i)
        ans[i] = (b, x)

    m = n << 1
    for s in range(n):
        dis = [inf] * m
        dis[s << 1] = 0
        qu = deque([s << 1])
        while qu:
            i = qu.popleft()
            odd = (i & 1) ^ 1
            for j in G[i >> 1]:
                j = j << 1 | odd
                if dis[j] != inf: continue
                dis[j] = dis[i] + 1
                qu.append(j)
        for i in qs[s]:
            b, x = ans[i]
            ans[i] = "YES" if dis[b << 1 | (x & 1)] <= x else "NO"
    print("\n".join(ans))
main()
```

### [Transfer Speeds Sum](https://cses.fi/problemset/task/3111)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def tuple(it):
        a, b, w = it
        return w << 40 | (a - 1) << 20 | (b - 1)

    def unpack(x):
        return (x >> 20) & 0xfffff, x & 0xfffff, x >> 40

    n = int(e())
    es = [tuple(map(int, e().split())) for _ in range(n - 1)]
    es.sort(reverse=True)

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a

    ans = 0
    dsu = [-1] * n
    for a, b, w in map(unpack, es):
        a, b = find(a), find(b)
        ans += w * dsu[a] * dsu[b]
        merge(a, b)
    print(ans)
main()
```

### [MST Edge Check](https://cses.fi/problemset/task/3407)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    es, si = [], []
    for i in range(m):
        a, b, w = map(int, e().split())
        es.append((a - 1, b - 1))
        si.append(w << 20 | i)
    si.sort()

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    ans = [""] * m
    dsu = [-1] * n
    pending = []
    pw = 0
    for x in si:
        w, i = x >> 20, x & 0xfffff
        if pw != w:
            for x in pending: merge(*x)
            pending.clear()
            pw = w
        a, b = es[i]
        ans[i] = "YES" if find(a) != find(b) else "NO"
        pending.append((a, b))
    print("\n".join(ans))
main()
```

### [MST Edge Set Check](https://cses.fi/problemset/task/3408)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m, q = map(int, e().split())
    es, ws = [], []
    for i in range(m):
        a, b, w = map(int, e().split())
        es.append((a - 1, b - 1))
        ws.append(w)
    o = sorted(range(m), key=ws.__getitem__)
    mp = {v: i for i, v in enumerate(ws[i] for i in o)}

    qs = [[] for _ in range(m)]
    for gi in range(q):
        e()
        for ei in map(int, e().split()):
            ei -= 1
            qq = qs[mp[ws[ei]]]
            if not qq or (gg := qq[-1])[0] != gi:
                qq.append(gg := (gi, []))
            gg[1].append(ei)

    def find(x):
        if dsu[x] < 0:
            return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] == dsu[b]: dsu[a] -= 1
        elif dsu[a] > dsu[b]: a, b = b, a
        dsu[b] = a
        return True

    ans = ["YES"] * q
    j, pw = -1, 0
    dsu = [-1] * n
    temp = [0] * n
    for i in range(m):
        w, qq = ws[o[i]], qs[i]
        if pw != w:
            if ~j:
                for k in range(j, i):
                    merge(*es[o[k]])
            j, pw = i, w
        for qi, g in qq:
            if ans[qi] == "NO": continue
            for ei in g:
                a, b = es[ei]
                ra, rb = find(a), find(b)
                temp[a] = ra
                temp[b] = rb
                temp[ra] = dsu[ra]
                temp[rb] = dsu[rb]
            dsu, temp = temp, dsu
            if not all(merge(*es[ei]) for ei in g):
                ans[qi] = "NO"
            dsu, temp = temp, dsu
    print("\n".join(ans))
main()
```

### [MST Edge Cost](https://cses.fi/problemset/task/3409)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    es, si = [], []
    for i in range(m):
        a, b, w = map(int, e().split())
        es.append((a - 1, b - 1))
        si.append(w << 20 | i)
    si.sort()

    mst = 0
    ans = [0] * m
    dsu = [-1] * n
    siz = [1] * n
    l = [0] * n
    for x in si:
        w, ei = x >> 20, x & 0xfffff
        a, b = es[ei]
        v = 0
        while a != b:
            if siz[a] < siz[b]: a, b = b, a
            if dsu[b] < 0:
                while dsu[a] >= 0: a = dsu[a]
                l[b] = w
                mst += w
                siz[a] += siz[b]
                dsu[b] = a
                break
            v = max(v, l[b])
            b = dsu[b]
        else:
            ans[ei] = w - v
    print(*[mst + v for v in ans], sep="\n")
main()
```

### [Network Breakdown](https://cses.fi/problemset/task/1677)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m, q = map(int, e().split())
    es = []
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        if a > b: a, b = b, a
        es.append((a, b))
    qs = []
    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        if a > b: a, b = b, a
        qs.append((a, b))
    u = set(qs)

    def find(x):
        if dsu[x] < 0: return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a
        return True

    r = n
    dsu = [-1] * n
    for a, b in es:
        if (a, b) in u: continue
        r -= merge(a, b)
    ans = []
    for a, b in reversed(qs):
        ans.append(r)
        r -= merge(a, b)
    print(*ans[::-1])
main()
```

### [Tree Coin Collecting I](https://cses.fi/problemset/task/3114)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    qu = [i for i, v in enumerate(map(int, e().split())) if v]
    G = [[] for _ in range(n)]
    pa = [0] * n
    deg = [0] * n
    deg[0] = 2
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)
        pa[a] ^= b
        pa[b] ^= a
        deg[a] += 1
        deg[b] += 1

    dis = [n] * n
    for i in qu: dis[i] = 0
    for i in qu:
        for j in G[i]:
            if dis[j] < n: continue
            dis[j] = dis[i] + 1
            qu.append(j)

    x = n
    ch = [-1] * n
    siz = [1] * n
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            x -= 1
            qu[x] = i
            p = pa[i]
            if ch[p] == -1 or siz[ch[p]] < siz[i]:
                ch[p] = i
            siz[p] += siz[i]
            pa[p] ^= i
            deg[p] -= 1
            i = p
    x = qu[0] = 0
    dfn = deg  # reuse
    top = [-1] * n
    zkw = [0] * (n << 1)
    dep = [-1] * n
    for i in qu:
        if ~top[i]: continue
        t = i
        v = dis[i]
        while ~i:
            dfn[i] = x
            zkw[x + n] = dis[i]
            x += 1
            top[i] = t
            dep[i] = dep[pa[i]] + 1
            v = dis[i] = min(dis[i], v)
            i = ch[i]
    for i in range(n - 1, 0, -1):
        zkw[i] = min(zkw[i << 1], zkw[i << 1 | 1])

    ans = []
    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        mn = n
        res = dep[a] + dep[b]
        while top[a] != top[b]:
            if dep[top[a]] < dep[top[b]]: a, b = b, a
            mn = min(mn, dis[a])
            a = pa[top[a]]
        if dep[a] < dep[b]: a, b = b, a
        res -= dep[b] << 1
        s, t = dfn[b] + n, dfn[a] + n + 1
        while s < t:
            if s & 1:
                mn = min(mn, zkw[s])
                s += 1
            if t & 1:
                t -= 1
                mn = min(mn, zkw[t])
            s >>= 1
            t >>= 1
        res += mn << 1
        ans.append(res)
    print(*ans, sep="\n")
main()
```

### [Tree Coin Collecting II](https://cses.fi/problemset/task/3149)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, q = map(int, e().split())
    l = list(map(int, e().split()))
    r = l.index(1)  # 以 coin 為根，則子樹中有 coin 即為重要點 (題目保證至少有 1 coin)
    G = [[] for _ in range(n)]
    pa = [0] * n
    deg = [0] * n
    deg[r] = 2
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)
        pa[a] ^= b
        pa[b] ^= a
        deg[a] += 1
        deg[b] += 1

    qu = [0] * n
    x = n
    ch = [-1] * n
    siz = [1] * n
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            x -= 1
            qu[x] = i
            p = pa[i]
            l[p] |= l[i]  # 子樹內有 coin 則為重要點
            if ch[p] == -1 or siz[ch[p]] < siz[i]:
                ch[p] = i
            siz[p] += siz[i]
            pa[p] ^= i
            deg[p] -= 1
            i = p
    qu[0] = r

    # l[i]: i 離重要點的最近距離
    l = [0 if v else n for v in l]
    bfs = [i for i, v in enumerate(l) if v == 0]
    base = len(bfs) - 1 << 1  # 遍歷所有重要點並回到原位的距離
    for i in bfs:
        nv = l[i] + 1
        for j in G[i]:
            if nv < l[j]:
                l[j] = nv
                bfs.append(j)

    dfc = 0
    dfn = [0] * n
    mn = [0] * n  # mn[i]: i 所在重鏈上，l 的前綴 min
    zkw = [0] * (n << 1)  # zkw[dfn[i]]: l 的區間 min
    top = [-1] * n
    dep = [0] * n
    for t in qu:
        if ~top[t]: continue
        i = t
        x = n
        while ~i:
            top[i] = t
            dep[i] = dep[pa[i]] + 1
            dfn[i] = dfc
            mn[i] = x = min(x, l[i])
            zkw[dfc + n] = l[i]
            dfc += 1
            i = ch[i]
    for i in range(n - 1, 0, -1): zkw[i] = min(zkw[i << 1], zkw[i << 1 | 1])

    ans = []
    for _ in range(q):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        # 2*key + 2*dis_to_key[a] + 2*dis_to_key[b] - dis[a][b] - 2*min(dis_to_key[a...b])
        res = base + (l[a] + l[b]) * 2 - dep[a] - dep[b]
        v = n
        while top[a] != top[b]:
            if dep[top[a]] < dep[top[b]]: a, b = b, a
            v = min(v, mn[a])
            a = pa[top[a]]
        if dep[a] < dep[b]: a, b = b, a
        s, t = n + dfn[b], n + dfn[a] + 1
        while s < t:
            if s & 1:
                v = min(v, zkw[s])
                s += 1
            if t & 1:
                t -= 1
                v = min(v, zkw[t])
            s >>= 1
            t >>= 1
        res += (dep[b] - v) * 2
        ans.append(res)
    print("\n".join(map(str, ans)))
main()
```

### [Tree Isomorphism I](https://cses.fi/problemset/task/1700)

```python
def main():
    from sys import stdin
    from random import getrandbits
    e = stdin.readline
    SALT = getrandbits(32)
    MASK = (1 << 32) - 1

    def xor_shift(x):
        x ^= x << 13
        x ^= x >> 7
        x ^= x << 17
        x ^= x >> 31
        return x + SALT

    def f():
        pa = [0] * n
        deg = [0] * n
        deg[0] = 2
        for _ in range(n - 1):
            a, b = map(int, e().split())
            a, b = a - 1, b - 1
            pa[a] ^= b
            pa[b] ^= a
            deg[a] += 1
            deg[b] += 1
        h = [1] * n
        for i in range(n):
            while deg[i] == 1:
                deg[i] = 0
                p = pa[i]
                h[p] += xor_shift(h[i]) & MASK
                pa[p] ^= i
                deg[p] -= 1
                i = p
        return h[0] & MASK

    ans = []
    for _ in range(int(e())):
        n = int(e())
        ans.append("YES" if f() == f() else "NO")
    print("\n".join(ans))
main()
```

### [Tree Isomorphism II](https://cses.fi/problemset/task/1701)

```python
# TODO: optimize https://cses.fi/problemset/hack/1701/entry/6358669/

def main():
    from sys import stdin
    from random import getrandbits
    e = stdin.readline
    SALT = getrandbits(32)
    MASK = (1 << 32) - 1

    def xor_shift(x):
        x ^= x << 13
        x ^= x >> 7
        x ^= x << 17
        x ^= x >> 31
        return x + SALT

    def f(both=False):
        def bfs(s):
            q = [s]
            pa = [-1] * n
            for i in q:
                p = pa[i]
                for j in G[i]:
                    if j == p: continue
                    pa[j] = i
                    q.append(j)
            return q, pa

        G = [[] for _ in range(n)]
        for _ in range(n - 1):
            a, b = map(int, e().split())
            a, b = a - 1, b - 1
            G[a].append(b)
            G[b].append(a)
        q, pa = bfs(0)
        siz = [1] * n
        for i in reversed(q):
            if not i: continue
            p = pa[i]
            siz[p] += siz[i]
        c = 0
        while True:
            p = pa[c]
            for j in G[c]:
                if j == p: continue
                if siz[j] > n >> 1:
                    c = j
                    break
            else: break
        q, pa = bfs(c)
        h = [1] * n
        for i in reversed(q):
            if i == c: continue
            p = pa[i]
            h[p] += xor_shift(h[i]) & MASK
        res = h[c] & MASK
        if not both:
            return res
        if n & 1 == 0:
            p = pa[c]
            for j in G[c]:
                if j == p: continue
                if siz[j] == n >> 1:
                    h[c] -= xor_shift(h[j]) & MASK
                    h[j] += xor_shift(h[c]) & MASK
                    return [res, h[j] & MASK]
        return [res]

    ans = []
    for _ in range(int(e())):
        n = int(e())
        ans.append("YES" if f() in f(True) else "NO")
    print("\n".join(ans))
main()
```

### [Flight Route Requests](https://cses.fi/problemset/task/1699)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0: return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a
        return True

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    indeg = [0] * n
    dsu = [-1] * n
    ans = n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        indeg[b] += 1
        merge(a, b)

    q = [i for i, v in enumerate(indeg) if v == 0]
    for i in q:
        r = find(i)
        dsu[r] += 1
        if dsu[r] == 0: ans -= 1
        for j in G[i]:
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
    print(ans)
main()
```

### [Critical Cities](https://cses.fi/problemset/task/1703)

```python
# credit: sk_coder007 https://cses.fi/problemset/hack/1703/entry/11872565/

def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)

    dep = [0] * n

    vis = [False] * n
    vis[0] = True
    dep[0] = 1

    idx = [0] * n
    stk = [0]
    while stk:
        i = stk[-1]
        it, x = G[i], idx[i]
        if x < len(it):
            j = it[x]
            idx[i] += 1
            if vis[j]: continue
            vis[j] = True
            dep[j] = dep[i] + 1
            stk.append(j)
            if j == n - 1: break
        else:
            dep[i] = 0
            stk.pop()

    ans = [False] * n
    vis = [False] * n
    mx = 0
    for s in stk:
        if mx == s:
            ans[s] = True
        q = [s]
        for i in q:
            for j in G[i]:
                if dep[j]:
                    if dep[j] > dep[mx]:
                        mx = j
                elif not vis[j]:
                    vis[j] = True
                    q.append(j)
    ans = [i + 1 for i, v in enumerate(ans) if v]
    print(len(ans))
    print(*ans)
main()
```

### [Visiting Cities](https://cses.fi/problemset/task/1203)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    e = stdin.readline

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b, w = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append((b, w))

    dis = [float("INF")] * n
    dis[0] = 0
    h = [(0, 0)]
    while h:
        v, i = heappop(h)
        if v > dis[i]: continue
        for j, nv in G[i]:
            nv += v
            if nv < dis[j]:
                dis[j] = nv
                heappush(h, (nv, j))

    dep = [0] * n

    vis = [False] * n
    vis[0] = True
    dep[0] = 1

    idx = [0] * n
    stk = [0]
    while stk:
        i = stk[-1]
        it, x = G[i], idx[i]
        if x < len(it):
            j, w = it[x]
            idx[i] += 1
            if vis[j]: continue
            if dis[j] != dis[i] + w: continue
            vis[j] = True
            dep[j] = dep[i] + 1
            stk.append(j)
            if j == n - 1: break
        else:
            dep[i] = 0
            stk.pop()

    ans = [False] * n
    vis = [False] * n
    mx = 0
    for s in stk:
        if mx == s:
            ans[s] = True
        q = [s]
        for i in q:
            for j, w in G[i]:
                if dis[j] != dis[i] + w: continue
                if dep[j]:
                    if dep[j] > dep[mx]:
                        mx = j
                elif not vis[j]:
                    vis[j] = True
                    q.append(j)
    ans = [i + 1 for i, v in enumerate(ans) if v]
    print(len(ans))
    print(*ans)
main()
```

### [Graph Coloring](https://cses.fi/problemset/task/3308)

```python
# TODO: O(n2^n) https://cses.fi/problemset/hack/3308/entry/13814460/

def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    G = [0] * n
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a] |= 1 << b
        G[b] |= 1 << a
    bit = 1 << n
    mask = bit - 1
    dp = [n + 1] * bit
    dp[0] = 0
    best = [-1] * bit
    for b in range(bit):
        if dp[b] > n: continue
        bb = mask ^ b
        while bb:
            lb = bb & -bb
            i = lb.bit_length() - 1
            if G[i] & b == 0:
                nb = b | lb
                dp[nb] = 1
                best[nb] = lb
            bb &= bb - 1
    for b in range(bit):
        x = dp[b]
        if x == 1: continue
        sub = b
        s = best[b]
        while sub:
            nx = dp[sub] + dp[b ^ sub]
            if nx < x:
                x, s = nx, sub
            sub = (sub - 1) & b
        dp[b] = x
        best[b] = s
    print(dp[-1])
    ans = [0] * n
    stk = [(mask, 1)]
    while stk:
        b, c = stk.pop()
        if dp[b] == 1:
            while b:
                i = (b & -b).bit_length() - 1
                ans[i] = c
                b &= b - 1
        elif b:
            s = best[b]
            stk.append((s, c))
            stk.append((b ^ s, c + dp[s]))
    print(*ans)
main()
```

### [Bus Companies](https://cses.fi/problemset/task/3158)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    e = stdin.readline
    inf = float("INF")

    n, m = map(int, e().split())
    l = list(map(int, e().split()))
    dis = [inf] * (n + m)
    dis[0] = 0
    G = [[] for _ in range(n + m)]
    for g in range(n, n + m):
        e()
        G_g = G[g]
        for i in map(int, e().split()):
            i -= 1
            G[i].append(g)
            G_g.append(i)

    h = [(0, 0)]
    while h:
        v, i = heappop(h)
        if v > dis[i]: continue
        for j in G[i]:
            nv = v + (l[j - n] if j >= n else 0)
            if nv >= dis[j]: continue
            dis[j] = nv
            heappush(h, (nv, j))
    print(*dis[:n])
main()
```

### [Split into Two Paths](https://cses.fi/problemset/task/3358)

```python
# TODO: AC (currently WA)

import sys
from io import StringIO

testcase = """\
4 3
1 2
2 3
2 4
"""

sys.stdin = StringIO(testcase)

def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    n += 1  # 1-based
    hd = [-1] * (n << 1)
    to = [0] * (m << 1)
    ne = [0] * (m << 1)
    indeg = [0] * n
    for i in range(0, m << 1, 2):
        a, b = map(int, e().split())
        indeg[b] += 1
        to[i] = b
        ne[i] = hd[a]
        hd[a] = i
        i |= 1
        b += n
        to[i] = a
        ne[i] = hd[b]
        hd[b] = i
    q = [i for i in range(n) if indeg[i] == 0]
    o = [0] * n
    for x in range(1, n):
        i = q[x]
        o[i] = x
        ei = hd[i]
        while ~ei:
            j = to[ei]
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
            ei = ne[ei]

    pr = [-1] * n
    pr[0] = 0
    pi = 0
    pre = [0] * n
    for i in range(1, n):
        cont = False
        trans = -1 + (pr[0] >= pi)
        ei = hd[n + q[i]]
        while ~ei:
            j = o[to[ei]]
            cont = cont or j == i - 1
            if pr[j] >= pi:
                pr[j] = i
                trans = j
            ei = ne[ei]
        if not cont:
            pi = i
            if trans == -1:
                print("NO")
                return
        if ~trans: pr[i - 1] = i
        pre[i] = trans
        print(pi, pr, trans, cont)
    print(q)
    for i, x in enumerate(pre):
        print(i, x)
    print("YES")
    a, b = [], []
    i = n - 1
    while i:
        pi = pre[i]
        a.append(q[i])
        print(i, pi)
        if pi == -1:
            i -= 1
        else:
            b += [q[j] for j in range(i - 1, pi, -1)]
            i = pi
        print(a, b)
    print(len(a), *reversed(a))
    print(len(b), *reversed(b))
main()
```

### [Network Renovation](https://cses.fi/problemset/task/1704)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for _ in range(n - 1):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)
    leaves = []
    stk = [(0, -1)]
    while stk:
        i, p = stk.pop()
        if len(G[i]) == 1:
            leaves.append(i + 1)
        for j in G[i]:
            if j != p: stk.append((j, i))
    if len(leaves) & 1:
        leaves.append(leaves[0])
    m = len(leaves)
    print(m >> 1)
    ans = [0] * m
    ans[0:m:2] = leaves[:m >> 1]
    ans[1:m:2] = leaves[m >> 1:]
    print(*ans)
main()
```

### [Forbidden Cities](https://cses.fi/problemset/task/1705)

```python
# TODO: AC (currently WA)

import sys
from io import StringIO

testcase = """\
9 16 1
2 5
3 5
8 5
4 2
2 4
3 8
5 3
5 9
7 3
6 3
2 5
3 9
2 4
6 1
7 1
1 3
9 8 5
"""

sys.stdin = StringIO(testcase)

def main():
    from sys import stdin
    e = stdin.readline

    n, m, q = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)
        G[b].append(a)

    ans = [True] * q
    pr = [-1] * q
    qs = []
    qo = [[] for _ in range(n)]
    qc = [[] for _ in range(n)]
    for qi in range(q):
        a, b, c = map(int, e().split())
        if a == c or b == c:
            ans[qi] = False
        else:
            a, b, c = a - 1, b - 1, c - 1
            qs.append((a, b, c))
            qo[a].append(qi)
            qo[b].append(qi)
            qc[c].append(qi)

    rt_ch = 0
    stk = [0]
    idx = [0] * n
    dfn = [0] * n
    low = [0] * n
    pa = [0] * n
    dfc = 0
    cut = [False] * n
    while stk:
        i = stk[-1]
        it, x = G[i], idx[i]
        if x == 0:
            dfc += 1
            dfn[i] = low[i] = dfc
            for qi in qo[i]:
                c = qs[qi][2]
                if pr[qi] == -1:
                    pr[qi] = idx[c]
                elif pr[qi] != idx[c]:
                    ans[qi] = False
        if x < len(it):
            j = it[x]
            idx[i] += 1
            if not dfn[j]:
                if i == 0: rt_ch += 1
                pa[j] = i
                stk.append(j)
            elif j != pa[i] and dfn[j] < low[i]:
                low[i] = dfn[j]
        else:
            stk.pop()
            idx[i] = 0
            p = pa[i]
            if i == 0:
                if rt_ch >= 2:
                    cut[i] = True
            else:
                if low[i] < low[p]: low[p] = low[i]
                if p != 0 and low[i] >= dfn[p]:
                    cut[p] = True
    for i in range(n):
        if cut[i]: continue
        for qi in qc[i]:
            ans[qi] = True
    print("\n".join("YES" if v else "NO" for v in ans))
main()
```

### [Creating Offices](https://cses.fi/problemset/task/1752)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    pa = [0] * n
    deg = [0] * n
    deg[0] = 2
    for ei in range(n - 1):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        pa[a] ^= b
        pa[b] ^= a
        deg[a] += 1
        deg[b] += 1
    ans = [False] * n
    no = [(-1, k)] * n
    for i in range(n):
        while deg[i] == 1:
            deg[i] = 0
            x, dx = no[i]
            if dx >= k:
                ans[i] = True
                x, dx = i, 1
            else:
                dx += 1

            p = pa[i]
            y, dy = no[p]
            if y == -1:
                no[p] = x, dx
            elif dx + dy >= k:
                if dx < dy:
                    no[p] = x, dx
            elif dx > dy:
                ans[y] = False
                no[p] = x, dx
            else:
                ans[x] = False
            pa[p] ^= i
            deg[p] -= 1
            i = p
    if no[0][1] >= k:
        ans[0] = True
    ans = [i + 1 for i, v in enumerate(ans) if v]
    print(len(ans))
    print(*ans)
main()
```

### [New Flight Routes](https://cses.fi/problemset/task/1685)

```python
def main():
    from sys import stdin, setrecursionlimit
    e = stdin.readline
    setrecursionlimit(10 ** 5 + 10)

    def tarjan(i):
        nonlocal dfnn
        dfnn += 1
        dfn[i] = low[i] = dfnn
        stk.append(i)
        instk[i] = True
        for j in G[i]:
            if not instk[j] and dfn[j]: continue
            if not dfn[j]: tarjan(j)
            if low[j] < low[i]: low[i] = low[j]
        if low[i] == dfn[i]:
            j = -1
            while j != i:
                j = stk.pop()
                instk[j] = False
                scc[j] = i

    n, m = map(int, e().split())
    G = [[] for _ in range(n)]
    for _ in range(m):
        a, b = map(int, e().split())
        a, b = a - 1, b - 1
        G[a].append(b)

    dfn = [0] * n
    low = [0] * n
    scc = [0] * n
    stk = []
    instk = [False] * n
    dfnn = 0

    for i in range(n):
        if dfn[i]: continue
        tarjan(i)

    deg = [0] * n
    for i in range(n):
        for j in G[i]:
            if scc[i] != scc[j]:
                deg[scc[i]] |= 0b10
                deg[scc[j]] |= 0b01
    a = [i + 1 for i, v in enumerate(deg) if v == 0b10]
    b = [i + 1 for i, v in enumerate(deg) if v == 0b01]
    n, m = len(a), len(b)
    ans = [f"{y} {x}" for x, y in zip(a, b)]
    for i in range(m, n):
        ans.append(f"{a[i - 1]} {a[i]}")
    for i in range(n, m):
        ans.append(f"{b[i]} {b[i - 1]}")
    print(len(ans))
    print("\n".join(ans))
main()
```

## Counting Problems

### [Filled Subgrid Count I](https://cses.fi/problemset/task/3413)

```python
def main():
    from sys import stdin

    n, k = map(int, stdin.readline().split())
    m = n + 1
    l = stdin.read() + "#" * m
    ans = [0] * k
    dp = [0] * n
    for i in range(0, n * m, m):
        ul = le = 0
        for j in range(n):
            x = i + j
            up = dp[j]
            le = dp[j] = 1 + (l[x] == l[x-1] == l[x-m] == l[x-m-1] and min(ul, up, le))
            ans[ord(l[x]) - 65] += le
            ul = up
    print(*ans, sep="\n")
main()
```

### [Filled Subgrid Count II](https://cses.fi/problemset/task/3414)

```python
def main():
    from sys import stdin

    n, k = map(int, stdin.readline().split())
    m = n + 1
    l = stdin.read() + "#" * m
    ans = [0] * k
    h = [0] * m
    for i in range(0, n * m, m):
        for j in range(n):
            x = i + j
            if l[x] == l[x - m]:
                h[j] += 1
            else:
                h[j] = 1
        pc = "#"
        stk = []
        pv, pj = 0, -1
        res = 0
        for j in range(m):
            c = l[i + j]
            if pc != c:
                while pv:
                    x = pv
                    pv, pj = stk.pop()
                    w = j - pj
                    res += (x - pv) * w * (w - 1)
                if res: ans[ord(pc) - 65] += res >> 1
                res = 0
                pj = j - 1
                pc = c
            if j == n: break
            v = h[j]
            while pv > v:
                x = pv
                pv, pj = stk.pop()
                w = j - pj
                res += (x - max(v, pv)) * w * (w - 1)
            if pv != v: stk.append((pv, pj))
            pv, pj = v, j
    print(*ans, sep="\n")
main()
```

### [All Letter Subgrid Count I](https://cses.fi/problemset/task/3415)

```python
import sys
from io import StringIO

testcase = """\
5 3
ABBBC
BBBBC
BCAAA
AAAAA
AAAAA
"""

sys.stdin = StringIO(testcase)

def main():
    from sys import stdin

    n, k = map(int, stdin.readline().split())
    m = n + 1
    l = stdin.read() + "#" * m
    ans = [0] * k
    dp = [0] * n
    for i in range(0, n * m, m):
        ul = le = 0
        for j in range(n):
            x = i + j
            up = dp[j]
            le = dp[j] = 1 + (l[x] == l[x-1] == l[x-m] == l[x-m-1] and min(ul, up, le))
            ans[ord(l[x]) - 65] += le
            ul = up
    print(*ans, sep="\n")
main()
```

### [All Letter Subgrid Count II](https://cses.fi/problemset/task/3416)

*WIP*

### [Border Subgrid Count I](https://cses.fi/problemset/task/3417)

*WIP*

### [Border Subgrid Count II](https://cses.fi/problemset/task/3418)

*WIP*

### [Raab Game II](https://cses.fi/problemset/task/3400)

*WIP*

### [Empty String](https://cses.fi/problemset/task/1080)

```python
mod = 10**9 + 7

def main():
    s = input()
    n = len(s)

    lim = n // 2 + 1
    C = [[0] * lim for _ in range(lim)]
    C[0][0] = 1
    for i in range(1, lim):
        C[i][0] = 1
        for j in range(1, i + 1):
            C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % mod

    dp = [[0] * i + [1] for i in range(1, n + 1)]
    for r in range(1, n):
        for i in range(n - r):
            j = i + r
            x = 0
            for k in range(i + 1, j + 1):
                if s[i] == s[k]:
                    x += (dp[k-1][i+1] * dp[j][k+1] % mod) * C[j - i + 1 >> 1][k - i + 1 >> 1] % mod
            dp[j][i] = x % mod
    print(dp[-1][0])
main()
```

### [Permutation Inversions](https://cses.fi/problemset/task/2229)

```python
# Mahonian numbers - OEIS A008302
# f(0, 0) = 1
# f(n, k) = sum(f(n-1, i), i = k-(n-1) ~ k)

mod = 10**9 + 7

def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    dp = [0] * (k + 2)
    dp[0] = 1
    for i in range(n):
        r = min(k, (i + 1) * i >> 1)
        for j in range(r):
            dp[j + 1] = (dp[j + 1] + dp[j]) % mod
        for j in range(r, i - 1, -1):
            dp[j] -= dp[j - i - 1]
    print(dp[k] % mod)
main()
```

### [Counting Bishops](https://cses.fi/problemset/task/2176)

*WIP*

### [Counting Sequences](https://cses.fi/problemset/task/2228)

```python
from itertools import accumulate
mod = 10**9 + 7

def main():
    mul = lambda a, b: a * b % mod
    n, k = map(int, input().split())
    # sum((-1)^i * C(k, i) * (k-i)^n for i in 0~k)
    lim = k + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(k, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]
    C = lambda n, k: fac[n] * inv[k] * inv[n - k] % mod
    print(sum((-1 if i & 1 else 1) * C(k, i) * pow(k - i, n, mod) for i in range(lim)) % mod)
main()
```

### [Grid Paths II](https://cses.fi/problemset/task/1078)

```python
mod = 10**9 + 7

def main():
    from sys import stdin
    from itertools import accumulate
    mul = lambda a, b: a * b % mod
    e = stdin.readline

    r, k = map(int, e().split())
    r -= 1
    lim = r * 2 + 1
    fac = list(accumulate(range(1, lim), func=mul, initial=1))
    inv = list(accumulate(range(lim - 1, 0, -1), func=mul, initial=pow(fac[-1], -1, mod)))[::-1]
    path = lambda x, y: fac[x + y] * inv[x] * inv[y] % mod if x >= 0 and y >= 0 else 0

    l = [r << 20 | r]
    for _ in range(k):
        x, y = map(int, e().split())
        x, y = x - 1, y - 1
        l.append(x << 20 | y)
    l = sorted(set(l))
    l = [(x >> 20, x & 0xfffff) for x in l]
    n = len(l)

    dp = [0] * n
    for i in range(n):
        x, y = l[i]
        v = path(x, y)
        for j in range(i):
            px, py = l[j]
            v -= dp[j] * path(x - px, y - py)
        dp[i] = v % mod
    print(dp[-1])
main()
```

### [Counting Permutations](https://cses.fi/problemset/task/1075)

```python
# OEIS A002464

mod = 10 ** 9 + 7

def main():
    n = int(input())
    if n <= 3:
        print(1 if n == 1 else 0)
        return
    pppp, ppp, pp, p = 1, 1, 0, 0
    for i in range(4, n + 1):
        pppp, ppp, pp, p = ppp, pp, p, ((i + 1) * p - (i - 2) * pp - (i - 5) * ppp + (i - 3) * pppp) % mod
    print(p)
main()

# dp[n][g][i] = num ways to place 1..n into g unordered groups, s.t. prev operation is new/append/join
def solve(n):
    dp = [[[0] * 3 for _ in range(n + 2)] for _ in range(n + 2)]
    dp[1][1][0] = 1

    for n in range(1, n):
        for g in range(1, n + 1):
            # new group
            dp[n + 1][g + 1][0] += sum(dp[n][g])
            dp[n + 1][g + 1][0] %= mod

            # append to existing group
            dp[n + 1][g][1] += dp[n][g][0] * 2 * (g - 1)
            dp[n + 1][g][1] += dp[n][g][1] * (2 * g - 1)
            dp[n + 1][g][1] += dp[n][g][2] * 2 * g
            dp[n + 1][g][1] %= mod

            # join existing groups
            dp[n + 1][g - 1][2] += dp[n][g][0] * (g - 1) * (g - 2)
            dp[n + 1][g - 1][2] += dp[n][g][1] * (g - 1) * (g - 1)
            dp[n + 1][g - 1][2] += dp[n][g][2] * g * (g - 1)
            dp[n + 1][g - 1][2] %= mod

    return sum(dp[n][1]) % mod
```

### [Grid Completion](https://cses.fi/problemset/task/2429)

*WIP*

### [Counting Reorders](https://cses.fi/problemset/task/2421)

*WIP*

### [Tournament Graph Distribution](https://cses.fi/problemset/task/3232)

*WIP*

### [Collecting Numbers Distribution](https://cses.fi/problemset/task/3157)

*WIP*

### [Functional Graph Distribution](https://cses.fi/problemset/task/2415)

*WIP*

## Additional Problems I

### [Shortest Subsequence](https://cses.fi/problemset/task/1087)

```python
def main():
    A = "ACGT"
    u = set()
    ans = []
    for c in input():
        u.add(c)
        if len(u) == len(A):
            ans.append(c)
            u.clear()
    for c in A:
        if c not in u:
            ans.append(c)
            break
    print("".join(ans))
main()
```

### [Distinct Values Sum](https://cses.fi/problemset/task/3150)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))

    last = {}
    ans = cur = 0
    for i, v in enumerate(l, 1):
        cur += i - last.get(v, 0)
        last[v] = i
        ans += cur
    print(ans)
main()
```

### [Distinct Values Splits](https://cses.fi/problemset/task/3190)

```python
def main():
    from sys import stdin
    e = stdin.readline
    mod = 10**9 + 7

    n = int(e())
    l = list(map(int, e().split()))

    j = 0
    vis = set()
    dp = [0] * (n + 1)
    dp[-1] = cur = 1
    for i, v in enumerate(l):
        while v in vis:
            vis.remove(l[j])
            cur -= dp[j - 1]
            j += 1
        vis.add(v)
        cur %= mod
        dp[i] = cur
        cur <<= 1
    print(dp[n - 1])
main()
```

### [Swap Game](https://cses.fi/problemset/task/1670)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    l = [int(v) - 1 for v in stdin.read().split()]

    def dis(l):
        res = 0
        for i in range(3):
            for j in range(3):
                ii, jj = divmod(l[i * 3 + j], 3)
                res += abs(i - ii) + abs(j - jj)
        return res

    def encode(l):
        res = 0
        b = 1
        for v in l:
            res += v * b
            b *= 9
        return res

    swap = [(i - 1, i) for i in range(9) if i % 3] + [(i, i + 3) for i in range(6)]

    if l == list(reversed(range(9))):
        print(16)
        return

    vis = {encode(l)}
    cnt = 0
    q = [(dis(l) + 1 >> 1, 0, 1, l)]
    cnt += 1
    while q:
        vd, v, _, l = heappop(q)
        if vd == v:
            print(v)
            break
        for i, j in swap:
            p = l[:]
            p[i], p[j] = p[j], p[i]
            key = encode(p)
            if key in vis: continue
            vis.add(key)
            heappush(q, (v + 1 + (dis(p) + 1 >> 1), v + 1, cnt, p))
            cnt += 1
main()
```

### [Beautiful Permutation II](https://cses.fi/problemset/task/3175)

```python
n = int(input())
if n == 1: print(1)
elif n == 2 or n == 3: print("NO SOLUTION")
elif n == 4: print(2, 4, 1, 3)
else:
    def f(*l): return [i + x for x in l]
    ans = []
    for i in range(1, n - 3, 5): ans += f(0, 2, 4, 1, 3)
    i += 5
    r = n % 5
    if r == 1: ans.append(n)
    elif r == 2: ans[-1:] = f(0, -2, 1)
    elif r == 3: ans[-1:] = f(0, 2, -2, 1)
    elif r == 4: ans += f(1, 3, 0, 2)
    print(*ans)
```

### [Multiplication Table](https://cses.fi/problemset/task/2422)

```python
def main():
    n = int(input())
    nn = n * n
    half = nn >> 1

    s, t = 0, nn + 1 >> 1
    while s < t:
        mid = s + t >> 1
        lo = mid // n
        res = n * lo
        for i in range(lo + 1, n + 1):
            res += mid // i
        if res > half:
            t = mid
        else:
            s = mid + 1
    print(s)
main()
```

### [Bubble Sort Rounds I](https://cses.fi/problemset/task/3151)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    sl = sorted(set(l))
    mp = {v: i for i, v in enumerate(sl)}
    m = len(mp)
    pos = [0] * m
    for v in l:
        pos[mp[v]] += 1
    pre = 0
    for i in range(m):
        pos[i], pre = pre, pre + pos[i]
    ans = 0
    for i, v in enumerate(l):
        v = mp[v]
        ans = max(ans, i - pos[v])
        pos[v] += 1
    print(ans)
main()
```

### [Bubble Sort Rounds II](https://cses.fi/problemset/task/3152)

```python
def main():
    from sys import stdin
    from heapq import heapify, heappop, heappush
    e = stdin.readline

    n, k = map(int, e().split())
    k = min(k + 1, n)
    l = list(map(int, e().split()))

    ans = [0] * n
    h = l[:k]
    heapify(h)
    for i in range(n):
        ans[i] = heappop(h)
        if i + k < n: heappush(h, l[i + k])
    print(*ans)
main()
```

### [Nearest Campsites I](https://cses.fi/problemset/task/3306)

*WIP*

### [Nearest Campsites II](https://cses.fi/problemset/task/3307)

*WIP*

### [Advertisement](https://cses.fi/problemset/task/1142)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e()) + 1
    l = list(map(int, e().split())) + [0]
    ans = 0
    stk = []
    pi = pv = -1
    for i in range(n):
        v = l[i]
        while pv >= v:
            h = pv
            pi, pv = stk.pop()
            ans = max(ans, (i - pi - 1) * h)
        stk.append((pi, pv))
        pi, pv = i, v
    print(ans)
main()
```

### [Special Substrings](https://cses.fi/problemset/task/2186)

```python
def main():
    s = input()
    m = 0
    mp = [-1] * 26
    for c in s:
        c = ord(c) - 97
        if ~mp[c]: continue
        mp[c] = m
        m += 1

    ans = 0
    cur = [0] * m
    cnt = {tuple(cur): 1}
    k = 0
    for c in s:
        c = mp[ord(c) - 97]
        k += (cur[c] == 0)
        cur[c] += 1
        if k == m:
            for i in range(m):
                cur[i] -= 1
                k -= (cur[i] == 0)
        key = tuple(cur)
        x = cnt.get(key, 0)
        ans += x
        cnt[key] = x + 1
    print(ans)
main()
```

### [Counting LCM Arrays](https://cses.fi/problemset/task/3169)

```python
"""
先將 k 質因數分解為 Pi p^e
再分別對每個 p 計算 "all(max(a, b) == e for a, b in pairwise(arr))" 的 arr 數量
可以用 DP:
dp[i][0]: 最後一個數字 = [0, e)
dp[i][1]: 最後一個數字 = e
dp[0] = (0, 1)
dp[1] = (e, 1)
dp[2] = (e, e + 1)
...
dp[i] = (dp[i-1][1] * e, sum(dp[i-1]))
"""

def main():
    from sys import stdin
    e = stdin.readline
    mul = lambda a, b: a * b % mod
    mod = 10**9 + 7

    def matmul(a, b):
        b = tuple(zip(*b))
        return [[sum(map(mul, row, col)) for col in b] for row in a]

    lim = int(10 ** 4.5) + 1
    sieve = [True] * lim
    sieve[0] = sieve[1] = False
    ps = []
    for i, v in enumerate(sieve):
        if not v: continue
        ps.append(i)
        for j in range(i * i, lim, i):
            sieve[j] = False

    ans = []
    for _ in range(int(e())):
        n, k = map(int, e().split())
        res = 1
        pi = 0
        while k > 1:
            cnt = 0
            if pi < len(ps):
                p = ps[pi]
                while k % p == 0:
                    k //= p
                    cnt += 1
            else:
                cnt = k = 1
            if cnt:
                dp = [[0, 1]]
                aux = [[0, 1], [cnt, 1]]
                x = n
                while x:
                    if x & 1:
                        dp = matmul(dp, aux)
                    aux = matmul(aux, aux)
                    x >>= 1
                res *= dp[0][0] + dp[0][1]
                res %= mod
            pi += 1
        ans.append(res)
    print(*ans, sep="\n")
main()
```

### [Square Subsets](https://cses.fi/problemset/task/3193)

*WIP*

### [Subarray Sum Constraints](https://cses.fi/problemset/task/3294)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    n += 1
    G = [[] for _ in range(n)]
    for _ in range(m):
        s, t, v = map(int, e().split())
        s -= 1
        G[s].append((t, v))
        G[t].append((s, -v))

    vis = [False] * n
    ans = [0] * n
    for i in range(n):
        if vis[i]: continue
        q = [i]
        for i in q:
            for j, v in G[i]:
                if vis[j]:
                    if ans[i] + v != ans[j]:
                        return print("NO")
                else:
                    vis[j] = True
                    ans[j] = ans[i] + v
                    q.append(j)
    print("YES")
    for i in range(n - 1, 0, -1):
        ans[i] -= ans[i - 1]
    print(*ans[1:])
main()
```

### [Water Containers Moves](https://cses.fi/problemset/task/3213)

*WIP*

### [Water Containers Queries](https://cses.fi/problemset/task/3214)

```python
def main():
    from sys import stdin
    from math import gcd
    e = stdin.readline

    for _ in range(int(e())):
        a, b, c = map(int, e().split())
        print("YES" if a >= c and c % gcd(a, b) == 0 else "NO")
main()
```

### [Stack Weights](https://cses.fi/problemset/task/2425)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    m = 1 << n.bit_length()
    mx = [0] * (m << 1)
    mn = [0] * (m << 1)
    tag = [0] * (m << 1)

    def ctz(x):
        return (x & -x).bit_length() - 1

    ans = []
    for _ in range(n):
        i, v = map(int, e().split())
        v = 1 if v == 1 else -1
        x = m + i
        while x:
            x = (x >> ctz(x)) - 1
            tag[x] += v
        x = m + i
        while x:
            x >>= 1
            mx[x] = max(mx[x << 1] + tag[x << 1], mx[x << 1 | 1] + tag[x << 1 | 1])
            mn[x] = min(mn[x << 1] + tag[x << 1], mn[x << 1 | 1] + tag[x << 1 | 1])
        ans.append("<" if mx[1] <= 0 else ">" if mn[1] >= 0 else "?")
    print("\n".join(ans))
main()
```

### [Maximum Average Subarrays](https://cses.fi/problemset/task/3301)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n = int(e())

    def cross(a, b, o):
        return (o[0] - a[0]) * (o[1] - b[1]) - (o[1] - a[1]) * (o[0] - b[0])

    h = [(-1, 0)]
    ans = [0] * n
    for i, v in enumerate(accumulate(map(int, e().split()))):
        o = (i, v)
        while len(h) >= 2 and cross(h[-2], h[-1], o) <= 0:
            h.pop()
        ans[i] = i - h[-1][0]
        h.append(o)
    print(*ans)
main()
```

### [Subsets with Fixed Average](https://cses.fi/problemset/task/3302)

```python
mod = 10 ** 9 + 7

def main():
    from sys import stdin
    e = stdin.readline

    n, a = map(int, e().split())
    l = [int(v) - a for v in e().split()]
    lo = sum(v for v in l if v < 0)
    hi = sum(v for v in l if v > 0) + 1

    dp = [0] * (hi - lo)
    dp[0] = 1
    for v in l:
        for i in reversed(range(lo + v, hi)) if v >= 0 else range(lo, hi + v):
            dp[i] = (dp[i] + dp[i - v]) % mod
    print((dp[0] - 1) % mod)
main()
```

### [Two Array Average](https://cses.fi/problemset/task/3361)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline
    m = 10**6

    def check(x):
        mx, i = max((v, i) for i, v in enumerate(accumulate(v - x for v in a), 1))
        for j, p in enumerate(accumulate(v - x for v in b), 1):
            if mx >= -p:
                return i, j

    n = int(e())
    a = [int(v) * m for v in e().split()]
    b = [int(v) * m for v in e().split()]

    s, t = 1, max(max(a), max(b))
    ans = (1, 1)
    while s < t:
        mid = s + t >> 1
        if ret := check(mid):
            s = mid + 1
            ans = ret
        else:
            t = mid
    print(*ans)
main()
```

### [Pyramid Array](https://cses.fi/problemset/task/1747)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    bit = [0] * (n + 1)
    sl = sorted(range(n), key=l.__getitem__, reverse=True)
    pv = -1
    ans = 0
    pg = s = 0
    for g in range(n):
        v = l[sl[g]]
        if pv != v:
            for x in range(pg, g):
                i = sl[x] + 1
                res = 0
                while i:
                    res += bit[i]
                    i &= i - 1
                ans += min(res, s - res)
            for x in range(pg, g):
                i = sl[x] + 1
                while i <= n:
                    bit[i] += 1
                    i += i & -i
            s += g - pg
            pv = v
            pg = g
    for x in range(pg, n):
        i = sl[x]
        res = 0
        while i:
            res += bit[i]
            i &= i - 1
        ans += min(res, s - res)
    print(ans)
main()
```

### [Permutation Subsequence](https://cses.fi/problemset/task/3404)

```python
def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    n, m = map(int, e().split())
    a = list(map(int, e().split()))
    b = list(map(int, e().split()))
    if n > m:
        n, m = m, n
        a, b = b, a

    pos = [-1] * (n + 1)
    for i, v in enumerate(b):
        if v > n: continue
        pos[v] = i
    pre = [0] * (n + 1)
    lis = [0]
    for v in a:
        if pos[v] > pos[lis[-1]]:
            x = len(lis)
            lis.append(v)
        else:
            x = bisect_right(lis, pos[v], key=pos.__getitem__)
            lis[x] = v
        pre[v] = lis[x - 1]

    print(len(lis) - 1)
    ans = []
    v = lis[-1]
    while v:
        ans.append(v)
        v = pre[v]
    print(*ans[::-1])
main()
```

### [Bit Inversions](https://cses.fi/problemset/task/1188)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def merge(i):
        h = bl - i.bit_length()
        r = 1 << h
        mid = (i << h) + (r >> 1) - m
        le, ri = i << 1, i << 1 | 1
        pre[i], suf[i] = pre[le], suf[ri]
        zkw[i] = max(zkw[le] & -2, zkw[ri] & -2)
        if mid < n and l[mid - 1] == l[mid]:
            if zkw[le] & zkw[ri] & 1:
                zkw[i] = r << 1 | 1
                pre[i] = suf[i] = r
            else:
                zkw[i] = max(zkw[i], suf[le] + pre[ri] << 1)
                if zkw[le] & 1:
                    pre[i] = pre[ri] + (r >> 1)
                if zkw[ri] & 1:
                    suf[i] = suf[le] + (r >> 1)

    l = list(map(int, e().rstrip()))
    n = len(l)
    m = 1 << n.bit_length()
    bl = m.bit_length()
    zkw = [0] * (m << 1)
    pre = [0] * (m << 1)
    suf = [0] * (m << 1)
    zkw[m:m+n] = [3] * n
    pre[m:m+n] = suf[m:m+n] = [1] * n
    for i in range(m - 1, 0, -1):
        merge(i)

    e()
    ans = []
    for i in map(int, e().split()):
        i -= 1
        l[i] ^= 1
        i |= m
        while i > 1:
            i >>= 1
            merge(i)
        ans.append(zkw[1] >> 1)
    print(*ans)
main()
```

### [Writing Numbers](https://cses.fi/problemset/task/1086)

```python
k = int(input())
s, t = 9, k + 11
while s < t:
    x = s + t >> 1
    c = 0
    p = 1
    while p <= x:
        q = p
        p *= 10
        c += x // p * q + max(0, min(x % p - q + 1, q))
    if c > k: t = x
    else: s = x + 1
print(s - 1)
```

### [Letter Pair Move Game](https://cses.fi/problemset/task/2427)

*WIP*

### [Maximum Building I](https://cses.fi/problemset/task/1147)

```python
def main():
    from sys import stdin
    e = stdin.readline

    m, n = map(int, e().split())
    n += 1
    l = [0] * (n + 1)
    ans = 0
    stk = []
    for _ in range(m):
        s = e()
        stk.clear()
        pi = -1
        for i in range(n):
            v = l[i] = l[i] + 1 if s[i] == "." else 0
            while l[pi] > v:
                ppi = stk.pop()
                ans = max(ans, (i - ppi - 1) * l[pi])
                pi = ppi
            stk.append(pi)
            pi = i
    print(ans)
main()
```

### [Sorting Methods](https://cses.fi/problemset/task/1162)

```python
def main():
    from sys import stdin
    from bisect import bisect_right
    e = stdin.readline

    n = int(e())
    l = [int(v) - 1 for v in e().split()]

    bit = [0] * (n + 1)
    a1 = 0
    for v in l:
        i = v + 1
        while i <= n:
            a1 += bit[i]
            i += i & -i
        i = v + 1
        while i:
            bit[i] += 1
            i &= i - 1

    a4 = n
    it = reversed(l)
    v = n - 1
    while v in it:
        a4 -= 1
        v -= 1

    a3 = n
    lis = [-1]
    for v in l:
        if v > lis[-1]:
            lis.append(v)
            a3 -= 1
        else:
            lis[bisect_right(lis, v)] = v

    a2 = 0
    for i in range(n):
        while (j := l[i]) != i:
            l[i], l[j] = l[j], l[i]
            a2 += 1

    print(a1, a2, a3, a4)
main()
```

### [Cyclic Array](https://cses.fi/problemset/task/1191)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n, k = map(int, e().split())
    l = list(map(int, e().split()))

    res = [0] * (n + 1)
    suf = [0] * (n + 1)
    j = n
    for i in range(n - 1, -1, -1):
        suf[-1] += l[i]
        while suf[-1] > k:
            j -= 1
            suf[-1] -= l[j]
        res[i] = res[j] + 1
        suf[i] = suf[j]

    ans = n
    cur = 0
    for i in range(n):
        if cur + suf[i] <= k:
            ans = min(ans, res[i])
        cur += l[i]
    print(ans)
main()
```

### [List of Sums](https://cses.fi/problemset/task/2414)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    b = sorted(map(int, e().split()))
    u = set(b)
    b0, b1, *b2n = b[:n]
    for a12 in b2n:
        a0 = b0 + b1 - a12 >> 1
        d = {}
        ans = []
        for x in b:
            if d.get(x):
                d[x] -= 1
            else:
                v = x - a0
                if len(ans) + 1 == n: break
                for pv in ans:
                    pv += v
                    if pv not in u: break
                    d[pv] = d.get(pv, 0) + 1
                ans.append(v)
        else: return print(*ans + [a0])
main()
```

## Additional Problems II

### [Bouncing Ball Steps](https://cses.fi/problemset/task/3215)

```python
from sys import stdin
from math import lcm

def main():
    e = stdin.readline

    def solve():
        m, n, k = map(int, e().split())
        m, n = m - 1, n - 1
        mq, mr = divmod(k, m)
        nq, nr = divmod(k, n)
        print((m - mr if mq & 1 else mr) + 1, (n - nr if nq & 1 else nr) + 1, mq + nq - k // lcm(m, n))

    for _ in range(int(e())):
        solve()
main()
```

### [Bouncing Ball Cycle](https://cses.fi/problemset/task/3216)

```python
from sys import stdin
from math import gcd

def main():
    e = stdin.readline

    def solve():
        m, n = map(int, e().split())
        m, n = m - 1, n - 1
        g = gcd(m, n)
        print(m * n // g << 1, m * n // g - (m // g - 1) * (n // g - 1) // 2 + 1)

    for _ in range(int(e())):
        solve()
main()
```

### [Knight Moves Queries](https://cses.fi/problemset/task/3218)

*WIP*

### [K Subset Sums I](https://cses.fi/problemset/task/3108)

*WIP*

### [K Subset Sums II](https://cses.fi/problemset/task/3109)

*WIP*

### [Increasing Array II](https://cses.fi/problemset/task/2132)

```python
def main():
    from sys import stdin
    from heapq import heappush, heappop
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    ans = 0
    q = []
    for v in l:
        heappush(q, -v)
        heappush(q, -v)
        ans += -heappop(q) - v
    print(ans)
main()
```

### [Food Division](https://cses.fi/problemset/task/1189)

```python
def main():
    from sys import stdin
    from itertools import accumulate
    e = stdin.readline

    n = int(e())
    a = list(map(int, e().split()))
    b = list(map(int, e().split()))
    d = [x - y for x, y in zip(a, b)]
    x = sorted(accumulate(d))[n >> 1]
    d[0] -= x
    d[-1] += x
    print(abs(x) + sum(map(abs, accumulate(d))))
main()
```

### [Swap Round Sorting](https://cses.fi/problemset/task/1698)

```python
def main():
    from sys import stdin
    from collections import deque
    e = stdin.readline

    n = int(e())
    l = [int(v) - 1 for v in e().split()]

    ans = []
    while True:
        swap = []
        vis = [0] * n
        for s in range(n):
            if vis[s] > 0: continue
            i = s
            q = deque()
            while vis[i] == 0:
                q.append(i)
                vis[i] += 1
                i = l[i]
            while len(q) >= 2:
                i, j = q.popleft(), q.pop()
                swap.append(f"{i+1} {j+1}")
                l[i], l[j] = l[j], l[i]
        if not swap: break
        ans.append(swap)
    print(len(ans))
    for swap in ans:
        print(len(swap))
        print("\n".join(swap))
main()
```

### [Binary Subsequences](https://cses.fi/problemset/task/2430)

*WIP*

### [School Excursion](https://cses.fi/problemset/task/1706)

```python
def main():
    from sys import stdin
    e = stdin.readline

    def find(x):
        if dsu[x] < 0: return x
        dsu[x] = find(dsu[x])
        return dsu[x]

    def merge(a, b):
        a, b = find(a), find(b)
        if a == b: return False
        if dsu[a] > dsu[b]: a, b = b, a
        dsu[a] += dsu[b]
        dsu[b] = a
        return True

    n, m = map(int, e().split())
    dsu = [-1] * n
    for _ in range(m):
        a, b = map(int, e().split())
        merge(a - 1, b - 1)

    ans = 1
    for v in dsu:
        if v >= 0: continue
        ans |= ans << -v
    print(f"{ans >> 1:b}"[::-1])
main()
```

### [Coin Grid](https://cses.fi/problemset/task/1709)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    G = [[] for _ in range(n)]
    for Gi in G:
        for j, v in enumerate(e()):
            if v == "o":
                Gi.append(j)

    def dfs(i):
        for j in G[i]:
            if vis[j]: continue
            vis[j] = True
            if pr[~j] == -1 or dfs(pr[~j]):
                pr[~j] = i
                return True
        return False

    pr = [-1] * (n << 1)
    ans = 0
    for i in range(n):
        vis = [False] * n
        ans += dfs(i)
    print(ans)

    for i in range(n):
        if ~pr[~i]: pr[pr[~i]] = i

    q = []
    vis = [False] * (n << 1)
    for i in range(n):
        if ~pr[i]: continue
        vis[i] = True
        q.append(i)

    for i in q:
        for j in G[i]:
            if pr[i] == j: continue
            if not vis[~j]:
                vis[~j] = True
                if ~pr[~j] and not vis[pr[~j]]:
                    vis[pr[~j]] = True
                    q.append(pr[~j])
    for i in range(n):
        if not vis[i]:
            print(1, i + 1)
    for i in range(n):
        if vis[~i]:
            print(2, i + 1)
main()
```

### [Grid Coloring II](https://cses.fi/problemset/task/3312)

```python
# credit: qusol

def main():
    from sys import stdin
    from collections import deque
    e = stdin.readline

    m, n = map(int, e().split())
    l = [bytearray(e().encode()) for _ in range(m)]
    ans = [bytearray(n) for _ in range(m)]

    d = [0, -1, 0, 1]
    t = lambda c: 1 << c - 65
    q = deque()

    def f(i, j, bad):
        q.append((i, j, bad))
        while q:
            i, j, bad = q.popleft()
            if not (0 <= i < m and 0 <= j < n): continue
            if bad == l[i][j]: continue
            if ans[i][j]:
                if bad == ans[i][j]:
                    print("IMPOSSIBLE")
                    exit()
                continue
            c = ans[i][j] = 65 ^ 66 ^ 67 ^ l[i][j] ^ bad
            for di in range(4):
                q.append((i + d[di], j + d[di ^ 1], c))

    for i in range(m - 1):
        for j in range(n - 1):
            if t(l[i][j]) | t(l[i+1][j]) | t(l[i][j+1]) | t(l[i+1][j+1]) != 7: continue
            if l[i+0][j+0] == l[i+1][j+0]: f(i+0, j+0, l[i+1][j+1])
            if l[i+0][j+0] == l[i+0][j+1]: f(i+0, j+0, l[i+1][j+1])
            if l[i+1][j+1] == l[i+1][j+0]: f(i+1, j+1, l[i+0][j+0])
            if l[i+1][j+1] == l[i+0][j+1]: f(i+1, j+1, l[i+0][j+0])
    for i in range(m):
        for j in range(n):
            if ans[i][j]: continue
            f(i, j, l[i][j] + 1 if l[i][j] < 67 else 65)
    print("\n".join(map(bytearray.decode, ans)))
main()
```

### [Programmers and Artists](https://cses.fi/problemset/task/2426)

```python
def main():
    from sys import stdin
    from heapq import heapify, heappushpop
    e = stdin.readline

    a, b, n = map(int, e().split())
    l = [tuple(map(int, e().split())) for _ in range(n)]
    # x - y 越大 -> 當工程師的"潛力"越高
    l.sort(key=lambda x: x[1] - x[0])

    # 前後綴分解
    suf = [0] * (n - b - a + 1)
    h = [l[i][1] for i in range(n - b, n)]
    heapify(h)
    suf[-1] = cur = sum(h)
    for i in range(a, n - b)[::-1]:
        v = l[i][1]
        cur += v - heappushpop(h, v)
        suf[i - a] = cur

    ans = 0
    h = [l[i][0] for i in range(a)]
    heapify(h)
    cur = sum(h)
    for i in range(a, n - b):
        ans = max(ans, cur + suf[i - a])
        v = l[i][0]
        cur += v - heappushpop(h, v)
    ans = max(ans, cur + suf[-1])
    print(ans)
main()
```

### [Removing Digits II](https://cses.fi/problemset/task/2174)

*WIP*

### [Coin Arrangement](https://cses.fi/problemset/task/2180)

```python
def main():
    from sys import stdin
    e = stdin.readline

    n = int(e())
    a = list(map(int, e().split()))
    b = list(map(int, e().split()))

    ans = x = y = 0
    for i in range(n):
        x += a[i] - 1
        y += b[i] - 1
        d = 0
        if x < 0 < y:
            d = min(-x, y)
        elif x > 0 > y:
            d = max(-x, y)
        x += d
        y -= d
        ans += abs(d) + abs(x) + abs(y)
    print(ans)
main()
```

### [Replace with Difference](https://cses.fi/problemset/task/3159)

*WIP*

### [Grid Puzzle I](https://cses.fi/problemset/task/2432)

*WIP*

### [Grid Puzzle II](https://cses.fi/problemset/task/2131)

*WIP*

### [Bit Substrings](https://cses.fi/problemset/task/2115)

```python
m1 = 469762049
m2 = 998244353
g = 3

def main():
    from itertools import accumulate

    def ntt():
        nonlocal a2, b2
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                b1[i], b1[j] = b1[j], b1[i]
        a2, b2 = a1[:], b1[:]
        b = 1
        while b < n:
            wn1 = pow(g, (m1 - 1) // (b * 2), m1)
            wn2 = pow(g, (m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    x, y = b1[j + 0], b1[j + b] * w1
                    b1[j + 0] = (x + y) % m1
                    b1[j + b] = (x - y) % m1
                    x, y = b2[j + 0], b2[j + b] * w2
                    b2[j + 0] = (x + y) % m2
                    b2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1

    def ntt_inv():
        n = lim
        for i in range(n):
            if i < (j := rev_bit[i]):
                a1[i], a1[j] = a1[j], a1[i]
                a2[i], a2[j] = a2[j], a2[i]
        b = 1
        while b < n:
            wn1 = pow(g, -(m1 - 1) // (b * 2), m1)
            wn2 = pow(g, -(m2 - 1) // (b * 2), m2)
            for i in range(0, n, b * 2):
                w1 = w2 = 1
                for j in range(i, i + b):
                    x, y = a1[j + 0], a1[j + b] * w1
                    a1[j + 0] = (x + y) % m1
                    a1[j + b] = (x - y) % m1
                    x, y = a2[j + 0], a2[j + b] * w2
                    a2[j + 0] = (x + y) % m2
                    a2[j + b] = (x - y) % m2
                    w1 = (w1 * wn1) % m1
                    w2 = (w2 * wn2) % m2
            b <<= 1
        inv_n1 = pow(n, -1, m1)
        inv_n2 = pow(n, -1, m2)
        mm = m1 * m2
        q1 = m1 * pow(m1, -1, m2)
        q2 = m2 * pow(m2, -1, m1)
        for i in range(lim):
            r1 = (a1[i] * inv_n1) % m1
            r2 = (a2[i] * inv_n2) % m2
            a1[i] = (r1 * q2 + r2 * q1) % mm

    s = input()
    z = cur = 0
    for v in s:
        if v == "0":
            cur += 1
        else:
            cur = 0
        z += cur

    pre = list(accumulate(map(int, s), initial=0))
    n = len(pre)

    lim = 1 << n.bit_length() + 1
    rev_bit = [0] * lim
    for i in range(1, lim):
        rev_bit[i] = rev_bit[i >> 1] >> 1 | (i & 1) * (lim >> 1)

    a1 = [0] * lim
    for v in pre:
        a1[v] += 1
    b1 = a1[::-1]

    a2 = b2 = []
    ntt()
    for i in range(lim):
        a1[i] = (a1[i] * b1[i]) % m1
        a2[i] = (a2[i] * b2[i]) % m2
    ntt_inv()
    print(z, *a1[:n-1])
main()
```

### [Reversal Sorting](https://cses.fi/problemset/task/2075)

```python
def main():
    from sys import stdin
    from random import randrange
    e = stdin.readline
    VAL, LE, RI, SIZ, REV, MN = range(6)
    new_node = lambda v: [v, None, None, 1, 0, v]

    def size(o):
        return o[SIZ] if o else 0

    def pull(o):
        o[SIZ] = 1 + size(o[LE]) + size(o[RI])
        o[MN] = o[VAL]
        if o[LE] and o[LE][MN] < o[MN]:
            o[MN] = o[LE][MN]
        if o[RI] and o[RI][MN] < o[MN]:
            o[MN] = o[RI][MN]

    def update(o):
        if not o: return
        o[LE], o[RI] = o[RI], o[LE]
        o[REV] ^= 1

    def push(o):
        if not o[REV]: return
        o[REV] = 0
        update(o[LE])
        update(o[RI])

    def merge(a, b):
        if not a or not b:
            return a if a else b
        sa, sb = size(a), size(b)
        if randrange(0, sa + sb) < sa:
            push(o := a)
            a[RI] = merge(a[RI], b)
        else:
            push(o := b)
            b[LE] = merge(a, b[LE])
        pull(o)
        return o

    def split(o, k):
        if not o: return o, o
        push(o)
        if (ls := size(o[LE])) < k:
            a = o
            o[RI], b = split(o[RI], k - ls - 1)
        else:
            b = o
            a, o[LE] = split(o[LE], k)
        pull(o)
        return a, b

    def query(o):
        if not o: return 0
        push(o)
        if o[VAL] == o[MN]:
            return size(o[LE])
        if o[LE] and o[LE][MN] == o[MN]:
            return query(o[LE])
        else:
            return size(o[LE]) + 1 + query(o[RI])

    n = int(e())

    rt = None
    for v in map(int, e().split()):
        rt = merge(rt, new_node(v))
    print(n)
    for s in range(n):
        a, b = split(rt, s)
        r = query(b) + 1
        b, c = split(b, r)
        print(s + 1, s + r)
        update(b)
        rt = merge(a, merge(b, c))
main()
```

### [Book Shop II](https://cses.fi/problemset/task/1159)

```python
# bounded knapsack problem - monotonic deque - O(nm)

def main():
    from sys import stdin
    e = stdin.readline

    n, m = map(int, e().split())
    m += 1

    ws = list(map(int, e().split()))  # weight
    vs = list(map(int, e().split()))  # value
    cs = list(map(int, e().split()))  # number
    p = [0] * m
    q = [0] * m
    for i in range(n):
        v, w, c = vs[i], ws[i], cs[i]
        d = p[:]
        for r in range(w):
            h, t = 0, -1
            for i in range(r, m, w):
                if h <= t and q[h] < i - w * c: h += 1
                if h <= t: p[i] = max(p[i], d[q[h]] + (i - q[h]) // w * v)
                while h <= t and d[i] >= d[q[t]] + (i - q[t]) // w * v: t -= 1
                t += 1
                q[t] = i
    print(p[-1])
main()
```

### [GCD Subsets](https://cses.fi/problemset/task/3161)

*WIP*

### [Minimum Cost Pairs](https://cses.fi/problemset/task/3402)

```python
# credit: dreamoon

def main():
    from sys import stdin
    inf = 10**10
    e = stdin.readline

    n = int(e())
    l = sorted(map(int, e().split()))
    for i in range(n - 1):
        l[i] = l[i + 1] - l[i]
    l[-1] = inf

    ds = []
    stk = [inf]
    pp, p = inf + 1, inf + 2
    for v in l:
        while pp >= p <= v:
            ds.append(p)
            v += pp - p
            p = stk.pop()
            pp = stk.pop()
        stk.append(pp)
        pp, p = p, v
    ds.sort()

    cur = 0
    ans = []
    for d in ds:
        cur += d
        ans.append(cur)
    print(*ans)
main()
```

### [Same Sum Subsets](https://cses.fi/problemset/task/3425)

```python
def main():
    from sys import stdin
    from random import shuffle
    e = stdin.readline

    n = int(e())
    l = list(map(int, e().split()))
    n1 = n >> 1
    n2 = n - n1
    b1 = 1 << n1
    b2 = 1 << n2
    mask = b2 - 1

    ctz = [-1] * b2
    for i in range(1, b2):
        ctz[i] = ctz[(i & -i) >> 1] + 1

    s1 = [0] * b1
    s2 = [0] * b2
    while True:
        shuffle(l)
        for b in range(1, b1):
            i = ctz[b]
            s1[b] = s1[b & (b - 1)] + l[i]
        mp = {v: b for b, v in enumerate(s1)}
        for b in range(1, b2):
            i = ctz[b] + n1
            s2[b] = v = s2[b & (b - 1)] + l[i]
            bb = mp.get(v)
            if bb is not None:
                ans = []
                while bb:
                    ans.append(l[ctz[bb]])
                    bb &= bb - 1
                print(len(ans))
                print(*ans)
                ans = []
                while b:
                    ans.append(l[ctz[b] + n1])
                    b &= b - 1
                print(len(ans))
                print(*ans)
                return
        for b in range(1, b2 >> 1):
            cb = b ^ mask
            if s2[b] < s2[cb]: b, cb = cb, b
            bb = mp.get(s2[b] - s2[cb])
            if bb is not None:
                ans = []
                while bb:
                    ans.append(l[ctz[bb]])
                    bb &= bb - 1
                while cb:
                    ans.append(l[ctz[cb] + n1])
                    cb &= cb - 1
                print(len(ans))
                print(*ans)
                ans = []
                while b:
                    ans.append(l[ctz[b] + n1])
                    b &= b - 1
                print(len(ans))
                print(*ans)
                return
main()
```

### [Mex Grid Queries](https://cses.fi/problemset/task/1157)

```python
a, b = map(int, input().split())
print((a - 1) ^ (b - 1))
```

### [Maximum Building II](https://cses.fi/problemset/task/1148)

```python
def main():
    from sys import stdin

    m, n = map(int, stdin.readline().split())
    ans = [[0] * n for _ in range(m + 1)]
    n += 1
    l = stdin.read()
    h = [0] * n
    for i in range(0, m * n, n):
        for j in range(n):
            x = i + j
            if l[x] == ".":
                h[j] += 1
            else:
                h[j] = 0
        stk = []
        pv, pj = 0, -1
        for j in range(n):
            v = h[j]
            while pv > v:
                x = pv
                pv, pj = stk.pop()
                w = j - pj
                ans[x][w - 2] += 1
                ans[max(pv, v)][w - 2] -= 1
            if pv != v: stk.append((pv, pj))
            pv, pj = v, j
    for row in ans:
        cur = res = 0
        for j in range(n - 2, -1, -1):
            cur += row[j]
            res += cur
            row[j] = res
    for j in range(n - 1):
        for i in range(m - 1, -1, -1):
            ans[i][j] += ans[i + 1][j]
    for i in range(1, m + 1):
        print(*ans[i])
main()
```

### [Stick Divisions](https://cses.fi/problemset/task/1161)

```python
def main():
    from sys import stdin
    from heapq import heapify, heappop, heapreplace
    e = stdin.readline

    n = int(e().split()[1])
    h = list(map(int, e().split()))
    heapify(h)
    ans = 0
    for _ in range(n - 1):
        v = heappop(h) + h[0]
        ans += v
        heapreplace(h, v)
    print(ans)
main()
```

### [Stick Difference](https://cses.fi/problemset/task/3401)

*WIP*

### [Coding Company](https://cses.fi/problemset/task/1665)

```python
mod = 10 ** 9 + 7

def main():
    from sys import stdin
    e = stdin.readline

    n, lim = map(int, e().split())
    lim += 1
    l = sorted(map(int, e().split()))
    m = n + 1 >> 1

    d = [[0] * lim for _ in range(m + 1)]
    d[0][0] = 1
    pv = 0
    for i, v in enumerate(l):
        p = [[0] * lim for _ in range(m + 1)]
        dv = v - pv
        for j in range(m + 1):
            jd = j * dv
            for k in range(lim):
                x = d[j][k] % mod
                if not x: continue
                nk = k + jd
                if nk >= lim: continue
                p[j][nk] += (j + 1) * x
                if j > 0: p[j - 1][nk] += j * x
                if j < m: p[j + 1][nk] += x
        pv = v
        d = p
    print(sum(d[0]) % mod)
main()
```

### [Two Stacks Sorting](https://cses.fi/problemset/task/2402)

*WIP*
