## 반복 가능한 객체 알아보기

### 이터레이터 사용하기

- 이터레이터(iterator)는 값을 차례대로 꺼낼 수 있는 객체다.
- 파이썬에서는 이터레이터만 생성하고 값이 필요한 시점이 되었을 떄 값을 만드는 방식을 사용한다.
- 데이터 생성을 뒤로 미루는 것인데 이런 방식을 지연 평가(lazy evalution)이라고 한다.
- 이터레이터는 반복자라고 부르기도 한다.

### 반복 가능한 객체 알아보기

- 반복 가능한 객체는 말 그대로 반복할 수 있는 객체인데 우리가 흔히 사용하는 문자열, 리스트, 딕셔너리 세트가 반복 가능한 객체다.
- 요소가 여러 개 들어있고, 한번에 하나씩 꺼낼 수 있는 객체다.
- 객체가 반복 가능한 객체인지 알아보는 방법은 객체에 **iter**메소드가 들어있는지 확인해보면 된다.

```python
# dir(객체)

print(dir([1,2,3]))

'''
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__',
'__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__',
'__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__',
 '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__',
'__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__',
'__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__',
'__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend',
'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

__next__메소드는 __iter__메소드를 호출해서 반환된 객체에 있다.

'''
```

dir()는 어떤 객체를 넣어주면 해당 객체가 어떤 변수와 메소드를 가지고 있는지 나열해준다.

```python
print([1,2,3].__iter__())

# <list_iterator object at 0x7f4c115467c0>
```

리스트의 이터레이터를 변수에 저장한 뒤 **next**메소드를 호출해보면 요소를 차례대로 꺼낼 수 있다.

이터레이터는 **next**로 요소를 계속 꺼내다가 꺼낼 요소가 없으면 StopIteration 예외를 발생시켜서 반복을 끝낸다.

```python
it = [1,2,3].__iter__() # 반환된 객체에는 __next__메소드가 있다.
print(it.__next__())
print(it.__next__())
print(it.__next__())
print(it.__next__())

'''
1
2
3
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(it.__next__())
StopIteration
'''
```

리스트 뿐만 아니라 문자열, 딕셔너리, 세트도 **iter**를 호출하면 이터레이터가 나온다.

이터레이터에서 **next**를 호출하면 차례대로 값을 꺼낸다.

리스트, 문자열, 딕셔너리, 세트는 요소가 눈에 보이는 반복 가능한 객체다.

```python
it = range(3).__iter__()
print(it.__next__())
print(it.__next__())
print(it.__next__())
print(it.__next__())

'''
0
1
2
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(it.__next__())
StopIteration
'''
```

다음과 같이 for에 range(3)을 사용했다면 먼저 range에서 **iter**로 이터레이터 객체를 얻는다.

한번 반복할 때 마다 이터레이터에서 **next**로 숫자를 꺼내서 i에 저장하고 지정된 숫자 3이 되면 StopIteration을 발생시켜서 반복을 끝낸다.

```python
for i in range(3):
	print(i)

'''
range(3)
'''
```

for과 반복 가능한 객체

반복 가능한 객체는 요소를 한번에 하나씩 가져올 수 있는 객체이고, 이터레이터는 **next**메소드를 사용해서 차례대로 값을 꺼낼 수 잇는 객체다.

반복 가능한 객체(iterable)과 이터레이터(iterator)는 별개의 객체이므로 둘은 구분해야한다.

반복 가능한 객체에서 **Iter**메소드로 이터레이터를 얻는다.

반복 가능한 객체는 시퀀스 객체를 포함한다.

시퀀스 객체: 리스트, 튜플, range, 문자열, bytes, bytearray (시퀀스 자료형은 값이 연속적으로 이어진 자료형으로서 데이터에 순서를 붙여 나열한것이다. 요소의 순서가 정해져있고 연속적으로 이어져 있다. 즉, 인덱스를 사용할 수 있다.)

반복가능한 객체: 시퀀스 객체 + 딕셔너리, 세트

Reference

[점프 투 파이썬](https://wikidocs.net/10307)

## 파이썬 이터레이터 만들기

```python
class 이터레이터이름:
	def __iter__(self):
		코드
	def __next__(self):
		코드
```

실제 코드

```python
class Counter:
  def __init__(self, stop):
    self.current = 0 # 현재 숫자 유지, 0부터 지정된 숫자 직전까지 반복
    self.stop = stop # 반복을 끝낼 숫자

  def __iter__(self):
    return self # 현재 인스턴스 반환

  def __next__(self):
    if self.current < self.stop: # 현재 숫자가 반복을 끝낼 숫자보다 작을 때
      r = self.current # 반환할 숫자를 변수에 저장
      self.current += 1 #현재 숫자를 1 증가 시킨다.
      return r # 숫자를 반환
    else: # 현재 ㅅ수자가 반복을 끝낼 숫자보다 크거나 같을 때
      raise StopIteration # 예외 발생

for i in Counter(3):
  print(i, end=' ') # 0 1 2
```

위의 코드의 객체는 리스트, 문자열, 딕셔너리, 세트, range처럼 **iter**를 호출해줄 반복가능한 객체(iterable)가 없으므로 현재 인스턴스를 반환하면 된다.

이 객체는 반복 가능한 객체이면서 이터레이터다.

```python
  def __iter__(self):
    return self # 현재 인스턴스 반환
```

이터레이터 언패킹

다음과 같이 Counter()의 결과를 변수 여러 개에 할당할 수 있다.

이터레이터가 반복하는 횟수와 변수의 개수는 같아야 한다.

```python
a,b,c = Counter(3)
print(a,b,c) # 0 1 2
```

map() 또한 이터레이터이다.

`a,b,c=map(int,input(),split())`처럼 언패킹으로 변수 여러 개에 값을 할당 할 수 있다.

## 파이썬 인덱스로 접근할 수 있는 이터레이터 만들기

```python
class 이터레이터이름:
	def __getitem__(self,인덱스):
		코드
```

**getitem**만 있어도 **iter**와 **next**와 생략이 된다.

초기값이 없다면 **init**도 생략이 가능하다.

```python
class Counter:
  def __init__(self, stop):
    self.stop = stop # 반복을 끝낼 숫자

  def __getitem__(self,index): # 인덱스를 받는다.
    if index < self.stop: # 인덱스가 반복을 끝낼 숫자보다 작을 때
      return index #인덱스를 반환
    else: # 인덱스가 반복을 끝낼 숫자보다 크거나 같을 때
      raise IndexError # 예외 발생

print(Counter(3)[0], Counter(3)[1], Counter(3)[2])

for i in Counter(3):
  print(i, end=' ') # 0 1 2
```

## 파이썬 iter, next 함수 활용하기

iter()는 객체의 **iter**메소드를 호출해주고, next()는 객체의 **next**메소드를 호출해준다.

```python
it = iter(range(3))
print(next(it))
print(next(it))
print(next(it))
print(next(it))

'''
0
1
2
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(next(it))
StopIteration
'''
```

- iter()

iter는 반복을 끝낼 값을 지정하면 특정 값이 나올 때 반복을 끝낸다.

이 경우에는 반복 가능한 객체 대신 호출 가능한 객체(callable)를 넣어준다.

참고로 반복을 끝낼 값은 sentinel이라고 부르는데 감시병이라는 뜻이다.

반복을 감시하다가 특정 값이 나오면 반복을 끝낸다고 해서 sentinel이다.

`iter(호출가능한 객체, 반복을 끝낼 값)`

호출 가능한 객체를 넣어야 하므로 매개변수가 없는 함수 또는 람다 표현식으로 만들어준다.

```python
it = iter(lambda : random.randint(0,5), 2)
print(next(it))
print(next(it))
print(next(it))

'''
5
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(next(it))
StopIteration
'''

```

StopIteration이 발생한 이유는 5가 출력된 다음에 next(it)를 호출했을 때 random.radint(0,5)에서 2가 나왔기 때문이다.

`print(next(it))`를 3번 호출할 동안 2가 나오지 않는다면 에러는 발생하지 않는다.

```python
import random

for i in iter(lambda : random.randint(0,5),2):
  print(i, end=' ')

# 3 0 3
```

위와 같이 for 반복문에 넣어서 사용할 수 있다. StopIteration이 발생하면 즉, i가 2이면

`print(i, end=' ')`는 중지된다.

```python
import random

while True:
  i = random.randint(0,5)
  if i == 2:
    break
  print(i, end=' ')
```

iter함수를 활용하면 if 조건문으로 매번 숫자가 2인지 검사하지 않아도 되므로 코드가 좀 더 간단해진다.

- next()

next는 기본값을 지정할 수 있다.

기본값을 지정하면 반복이 끝나더라도 StopIteration이 발생하지 않고 기본값을 출력한다.

반복할 수 있을 때는 해당 값을 출력하고, 반복이 끝났을 때는 기본값을 출력한다.

`next(반복가능한 객체, 기본값)`

```python
it =iter(range(3))
print(next(it, 10)) # 0
print(next(it, 10)) # 1
print(next(it, 10)) # 2
print(next(it, 10)) # 10
print(next(it, 10)) # 10
print(next(it, 10)) # 10
```
