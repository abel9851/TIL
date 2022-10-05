## 파이썬 input()

1. 정수를 한줄에 입력받아 리스트에 저장

```python
# 입력 1 2 3 4
data=input()
# 결과 1 2 3 4

# 입력 1 2 3 4
data=input().split()
# 출력 data = ['1', '2', '3', '4']
```

split()은 받은 문자열을 특정문자를 기준(디폴트는 공백문자)으로 나눠서 리스트로 저장한다.

map()은 해당 리스트의 모든 원소에 int()를 저장한다.

```python
# 입력 1 2 3 4
data=map(int,input().split())
# 결과  <map object at 0x7f5017e68850>
# 오브젝트로 나오므로 여기에 list()로 감싸준다.

data=list(map(int,input().split())
# 결과 [1, 2, 3, 4]

```

이렇게 하면 숫자 자료형으로 이루어진 리스트를 얻게 된다.

1. 정수를 한줄로 입력받아 변수에 저장

맵 객체는 결과를 변수 여러 개에 저장하는 언패킹(unpacking)이 가능하다.

언패킹은 맵이 없어도 input().split()으로도 가능하다. 타입은 string이다.

```python
# 입력 1 2 3
a,b,c=map(int,input().split())
# 결과 1 2 3
# 언패킹을 할때는 하나에 변수에 할당할때와는 다르게 list()라던가 따로 감싸줄 필요가 없다.

# 입력 1 2 3
a,b,c=input().split()
# 결과 1 2 3
# 타입은 string이다.
```

## 파이썬 sys.stdin.readline()

입력의 개수가 많은 경우에는 input()을 사용하지 않는다.

파이썬의 기본 input()함수는 동작속도가 느려서 시간초과가 될 수 있기 때문이다.

이럴때 sys.stdin.readline()을 이용한다.

1. 한개의 정수 입력받기

```python
import sys

# 입력 1
a = int(sys.stdin.readline())
# 결과 1\n

b = sys.stdin.readline().rstrip()
```

sys.stdin.readline()은 한줄 단위로 입력받기 때문에, 개행문자와 같이 입력받아진다. 1을 입력했다면 1\n(new line)이 저장되기 때문에 개행문자를 제거해야한다.

단 , a는 정수형이고 b는 문자열이다.

rstrip()을 이용하면 인자가 없을 경우 문자열의 오른쪽 공백을 제거한다.

인자가 있다면 인자가 된 문자열의 모든 조합을 제거한다.

```python
c="1121"
print(c.rstrip('12'))
#결과는 빈 string이 출력된다.
```

1. 여러 개의 정수를 한 줄에 입력받아 리스트에 저장

```python
import sys

# 입력 1 2 3 4
a=list(map(int,sys.stdin.readline().split()))
# 결과 [1, 2, 3, 4]
```

1. 정수를 n줄 입력받아 리스트에 저장

```python
import sys

# 풀이 1 정수 3을 입력하고 readline에서는 1,2,3 순서대로 입력
n = int(input("데이터의 수(엔터로 구분): "))

input_result=[]
for i in range(n):
	a = int(sys.stdin.readline())
	result.append(a)
# 결과 [1, 2, 3]

# 풀이 2 정수 3을 입력하고 readline에서는 1,2,3 순서대로 입력
n=int(input("데이터의 수(엔터로 구분): "))
data =[int(sys.stdin.readline()) for i in range(n)]
# 결과 [1, 2, 3]

# 풀이 3 정수 3을 입력하고 readline에서는 1,2,3 순서대로 입력
n=int(input("데이터의 수(엔터로 구분): ")
data=[int(input()) for i in range(n)]
```

Reference

[[Python] strip, rstrip, lstrip - 공백과 문자 제거 함수](https://pydole.tistory.com/entry/strip-rstrip-lstrip-%EA%B3%B5%EB%B0%B1%EA%B3%BC-%EB%AC%B8%EC%9E%90-%EC%A0%9C%EA%B1%B0-%ED%95%A8%EC%88%98)

[운영체제별 개행문자의 이해](https://devshin93.tistory.com/105)

[[Python] 데이터 입력받기](https://doing7.tistory.com/49)
