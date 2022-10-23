## 문자열 바꾸기

바뀐 결과를 유지하고 싶다면 문자열이 저장된 변수에 replace를 사용한 뒤 다시 변수에 할당해주면 된다.

```python
# replace

s = "hello world"
print(s.replace('world', 'python')) # 출력: hello python
print(s) # 출력: hello world
s = s.replace('world', 'python')
print(s) # 출력: hello python
```

```python
# maketrans, translate

table = str.maketrans('aeiou', '12345')
a = 'apple'
a = a.translate(table)
print(a) # 출력: 1ppl2
```

```python
# join (join은 split의 반대)

a = ''.join(['apple', 'pear', 'grape', 'pineapple', 'orange']) # '' 대신에 ' '를 하면 각 요소 사이에 공백을 넣으면서 결헙한다.
print(a) # applepeargrapepineappleorange
```
