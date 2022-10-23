## 문자열 왼쪽에 0 채우기

zfill(길이)는 지정된 길이에 맞춰서 문자열의 왼쪽에 0을 채운다. (zero fill을 의미)

단, 문자열의 길이보다 지정된 길이가 작다면 아무것도 채우지 않는다.

```python
print(35.zfill(4)) # 출력 0035
print(35.zfill(2)) # 출력 35  아무것도 채우지 않는다.
print('hello'.zfill(10)) # 출력 00000hello
```
