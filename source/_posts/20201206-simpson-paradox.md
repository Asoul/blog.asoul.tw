title: 辛普森悖論
date: 2020-12-06 17:15:02
tags:
- 統計
- 悖論
---

辛普森悖論 (Simpson's paradox) 講的是在統計中，有分層和無分層的情況下得到不同的比較結果。假設在台北和高雄做年輕人和老人的台獨意願調查，發現：（以下數據都是範例用，不是真的）

台北 | 支持台獨 | 反對台獨 | 總數 | 支持比例 |
:-: | :-: | :-: | :-: | :-: |
年輕人 | 50 | 10 | 60 | 83% |
老人 | 100 | 40 | 140 | 71% |

高雄 | 支持台獨 | 反對台獨 | 總數 | 支持比例 |
:-: | :-: | :-: | :-: | :-: |
年輕人 | 50 | 120 | 170 | 29% |
老人 | 20 | 100 | 120 | 17% |

不論台北高雄，年輕人支持台獨的比例都比老人高。

總和 | 支持台獨 | 反對台獨 | 總數 | 支持比例 |
:-: | :-: | :-: | :-: | :-: |
年輕人 | 100 | 130 | 230 | 43% |
老人 | 120 | 140 | 260 | 46% |

但是一加總起來發現其實老人支持台獨比率比較高，登愣！個別組內的結果和總體違背，就是這樣啦。

所以你可以看著同樣的數據。如果要反對老人台獨，就把總表蓋掉，說不論台北或高雄年輕人都更支持台獨；如果要反對年輕人台獨，就蓋掉各地調查只看總表，說總共老人支持台獨的比例比年輕人高。要小心對資料的判讀啊！