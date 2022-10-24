## 파이썬 집합 연산

```python
# 합집합(union)

a = {1,2,3,4}
b = {3,4,5,6}
print(a|b) # 출력: {1,2,3,4,5,6}

set.union(a,b) # 출력: {1,2,3,4,5,6}

# 교집합(intersection)

print(a&b) # 출력: {3,4}
set.intersection(a,b) # 출력: {3,4}

# 차집합(difference)

print(a-b)  # 출력: {1,2}
set.difference(a,b) # 출력: {1,2}

# 대칭차집합(symmetric_difference) XOR 입력값이 같지 않으면 1을 출력한다.
print(a^b) # 출력: {1,2,5,6}
set.symmetric_difference(a,b) # 출력: {1,2,5,6}

# 세트 자료형에 |,&,-,^ 연산자와 할당연산자 = 을 함께 사용하면 집합 연산의 결과를 변수에 할당
a = {1,2,3,4}
a |= 5
print(a) # 출력: {1,2,3,4,5}
a = {1,2,3,4}
a.update({5})
print(a) # 출력: {1,2,3,4,5}

a = {1,2,3,4}
a &= {0,1,2,3,4}
print(a) # 출력: {1,2,3,4}
a = {1,2,3,4}
a.intersection_update({0,1,2,3,4})
print(a) # 출력: {1,2,3,4}

a = {1,2,3,4}
a -= {3}
print(a) # 출력: {1,2,4}
a = {1,2,3,4}
a.difference_update({3})
print(a) # 출력: {1,2,4}

a = {1,2,3,4}
a ^= {3,4,5,6}
print(a) # 출력: {1,2,5,6}
a = {1,2,3,4}
a.symmetric_difference_update({3,4,5,6})
print(a)  # 출력: {1,2,5,6}
```

Reference

[XOR 비트 연산 (개념 이해하기) | 암호 | Khan Academy](https://ko.khanacademy.org/computing/computer-science/cryptography/ciphers/a/xor-bitwise-operation)
