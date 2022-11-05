## 파이썬 제네레이터 사용하기

제네레이터는 이터레이터를 생성해주는 함수다.

이터레이터는 클래스에 **iter**, **next**, 또는 **getitem** 메소드를 구현해야하지만 제네레이터는 함수 안에서 yield라는 키워드만 사용하면 된다.

제네레이터는 이터레이터보다 훨씬 간단하게 작성할 수 있다.

제네레이터는 발생자라고 부르기도 한다.

함수 안에서 yield를 사용하면 함수는 제네레이터가 되며 yield에는 값(변수)를 지정한다.

```python
def number_generator():
  yield 0
  yield 1
  yield 2

for i in number_generator():
  print(i, end=' ') # 0 1 2
```

number_generator 함수를 호출하면 제네레이터 객체(generator object)가 반환된다.

이 객체를 dir함수로 살펴보면 이터레이터에서 볼수 있는 **iter**, **next**메소드가 들어있다.

```python
def number_generator():

  yield 0
  yield 1
  yield 2

g = number_generator()
print(g) # <generator object number_generator at 0x7f566aa9ef90>

print(dir(g))

'''
['__class__', '__del__', '__delattr__', '__dir__', '__doc__', '__eq__',
'__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__',
'__init_subclass__', '__iter__', '__le__', '__lt__', '__name__', '__ne__', '__new__',
'__next__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__',
'__sizeof__', '__str__', '__subclasshook__', 'close', 'gi_code', 'gi_frame',
'gi_running', 'gi_yieldfrom', 'send', 'throw']
'''

```

함수에 yield만 사용해서 간단하게 이터레이터를 구현할 수 있다.

이터레이터는 **next**메소드 안에서 직접 return으로 값을 반환했지만 제네레이터는 yield에 지정한 값이 **next**메소드(next 함수)의 반환값으로 나온다.

이터레이터는 raise로 StopIteration 예외를 직접 발생시켰지만(**next**메소드에서 raise로 발생시킨다.) 제네레이터는 함수의 끝까지 도달하면 StopIteration 예외가 자동으로 발생한다.

제네레이터는 제네레이터 객체에서 **next**메소드를 호출할 때마다 함수 안의 yield까지 코드를 실행하며 yield에서 값을 발생시킨다.(generate)

```python
def number_generator():

  yield 0
  yield 1
  yield 2

g = number_generator()

print(g.__next__())
print(g.__next__())
print(g.__next__())
print(g.__next__())

'''
0
1
2
Traceback (most recent call last):
  File "main.py", line 12, in <module>
    print(g.__next__())
StopIteration
'''
```

- for와 제네레이터

1. for문이 실행되면 number_generater()에서 반환된 제네레이터 객체에서 **iter**()를 호출
2. **next**()를 호출 → 값을 발생시킨다. (yield 0) → 변수 i에 0이 할당된다.
3. StopIteration이 발생할 때까지 반복
4. StopIteration이 발생하면 반복 끝

개인적인 생각이지만 for문을 돌릴 때 대상이 된 객체에서 **iter**()가 있는지 찾아서 있으면 호출하는 것 같다.

```python
for i in number_generater(): # 위에서 작성한 제네레이터 함수
	print(i)

```

- 제네레이터 만들기

```python
def number_generator(stop):
  n = 0
  while n < stop:
    yield n
    n += 1

for i in number_generator(3):
  print(i)
```

## 파이썬 yield from으로 값을 여러 번 바깥으로 전달하기

```python
yield from 반복가능한 객체
yield from 이터레이터
yield from 제네레이터 객체
```

```python
# yield from을 사용하지 않을 때
def number_generator():
    x = [1, 2, 3]
    for i in x:
			yield i

g = number_generator()

for i in number_generator():
    print(i)

# yield from을 사용할 때
def number_generator():
    x = [1, 2, 3]
    yield from x

g = number_generator()

for i in number_generator():
    print(i)

# yield from과 next() 사용
def number_generator():
    x = [1, 2, 3]
    yield from x

g = number_generator()

print(next(g))
print(next(g))
print(next(g))
print(next(g))

'''
1
2
3
Traceback (most recent call last):
  File "main.py", line 11, in <module>
    print(next(g))
StopIteration
'''
```

Reference

[Python Yield란?? What is the Yield??](https://kkamikoon.tistory.com/entry/Python-Yield%EB%9E%80-What-is-the-Yield)

[Python 제너레이터 컴프리헨션 ( 제너레이터 표현식 )](https://blog.naver.com/PostView.nhn?blogId=websearch&logNo=222119814558&from=search&redirect=Log&widgetTypeCall=true&directAccess=false)
