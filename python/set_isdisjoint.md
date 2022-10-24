## 파이썬 세트가 겹치지 않는지 확인하기

세트.isdisjoint()는 겹치면 False, 안겹치면 True를 반환한다.

```python
a = {1,2,3,4}
a.isdisjoint({5,6,7,8}) # True 겹치는 요소가 없다.
a.isdisjoint({3,4,5,6}) # False 3,4가 겹친다.
```
