## 문자열 위치 찾기

find(’찾을 문자열’)은 문자열에서 특정 문자열을 찾아서 인덱스를 반환하고, 없으면 -1을 반환한다.

find는 왼쪽에서부터 문자열을 찾는데, 같은 문자열이 여러 개일 경우 처음 찾은 문자열의 인덱스를 반환한다.

오른쪽에서부터 찾는 것은 rfind다.

index(’찾을 문자열’)은 왼쪽에서부터 특정 문자열을 찾아서 인덱스를 반환한다.

단, 문자열이 없으면 에러를 발생시킨다.

index도 같은 문자열이 여러 개일 경우, 처음 찾은 문자열의 인덱스를 반환한다.

오른쪽에서 찾는 것은 rindex를 사용하면 된다.

```python
print('apple'.find('pl')) # 출력: 2
print('apple'.find('x')) # 출력: -1
print('apple pl'.rfind('pl')) # 출력: 6
print('apple pl'.index('pl')) # 출력: 2
print('apple pl'.rindex('pl'))  # 출력: 6

```
