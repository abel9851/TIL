## 파이썬 부분 집합과 상위집합 확인하기

```python
# 부분집합 확인
a = {1,2,3,4}
a <= {1,2,3,4} # True
a.issubset({1,2,3,4,5}) # True
a <= {1,2} # False

# 진부분집합(proper subset) 확인 메서드는 없음.
# 진부분집합이란 다른세트에서 현재세트를 뺐을때 같지 않을때 진부분집합이라고 한다.(다른게 남는다.)
a = {1,2,3,4}
a < {1,2,3,4,5} # True
a < {1,2,3,4} # False 부분집합이지만 진부분집합이 아니다. 동일한것이 진부분집합.

# 상위집합 확인
a ={1,2,3,4}
a >= {1,2,3,4} # True
a >= {1,2,3}
a.issuperset({1,2,3,4})  # True

# 진상위 집합 확인
a = {1,2,3,4}

a > {1,2,3} # True
a > {1,2,3,4} # False

```