## 파이썬 클래스 속성

인스턴스 속성(self.속성)과는 다르다. 인스턴스 속성은 인스턱스별로 독립되어 있으며 서로 영향을 주지 않는다.

클래스 속성은 클래스에 속해있고 모든 인스턴스에서 공유한다.
put_bag 메소드에서 클래스 속성 bag에 접근할 때 self를 사용한다.

bag라는 클래스속성을 정의하고 self.bag(인스턴스 속성)을 따로 정의하지 않으면
self.bag을 호출할때 자동적으로 같은 이름의 클래스속성을 호출하게 된다.

james.bag, maria.bag을 하면, self.bag을 정의하지 않았다면 자동적으로 james.bag=Person.bag,
maria.bag=Person.bag으로 취급된다.

두개다 호출하고 싶다면, self.bag과 클래스명.bag 즉, Person.bag을 호출하면 된다.

클래스 속성과 인스턴스 속성의 차이점은 아래와 같다.

클래스 속성: 모든 인스턴스가 공유. 인스턴스 전체가 사용해야하는 값을 저장할 때 사용한다.
인스턴스 속성: 인스턴스별로 독립되어 있다. 각 인스턴스가 값을 따로 저장해야 할 때 사용한다.

### 클래스 속성을 찾는 과정

파이썬에서는 속성, 메소드 이름을 찾을때 인스턴스, 클래스 순서대로 찾는다.

james.bag→ james.**dict**에 bag이 있는지?

예→ return james.**dict**[’bag’]

아니오→Person.**dict**에 bag가 있는지?

예→return Person.**dict**[’bag’]

아니오→AttributeError

```python
class Person:
  bag = [] # 클래스 안에 있는 변수의 범위는 클래스 안이므로, 메소드도 참조할 수 있다.

  def put_bag(self, stuff):
    self.bag.append(stuff) # self.bag을 따로 선언하지도 않고  self.bag을 사용한다는게 포인트

james = Person()
james.put_bag('백')

maria = Person()
maria.put_bag('열쇠')

print(james.bag) # ['백', '열쇠']
print(maria.bag) # ['백', '열쇠']

#bag와 self.bag가 있을 경우
class Person:
  bag = []

  def put_bag(self, stuff):
    self.bag = [] # 인스턴스 속성을 정의
    self.bag.append(stuff)

james = Person()
james.put_bag('백')

maria = Person()
maria.put_bag('열쇠')

print(james.bag) # ['백']
print(maria.bag) # ['열쇠']
```

사실 self는 현재 인스턴스를 뜻하므로 클래스 속성을 지칭하기에는 조금 모호하다.
클래스 속성에 접근할 때는 다음과 같이 클래스 이름으로 접근하면 좀 더 코드가 명확해진다.

```python
class Person:
  bag = []

  def put_bag(self, stuff):
    Person.bag.append(stuff) # 클래스 이름으로 클래스 속성에 접근

james = Person()
james.put_bag('백')

maria = Person()
maria.put_bag('열쇠')

print(james.bag)
print(maria.bag)
```

Person.bag이라고 하니 클래스 Person에 속한 bag 속성이라는 것을 바로 알 수 있다.

클래스 바깥에서도 다음과 같이 클래스 이름으로 클래스 속성에 접근하면 된다.

```python
print(Person.bag)
```

```python
class Person:
    bag = []

    def put_bag(self, stuff):
        self.bag = []   # 인스턴스 속성을 정의
        Person.bag.append(stuff)

james = Person()
james.put_bag('백')

maria = Person()
maria.put_bag('열쇠')

print(james.bag) # self.bag을 정의하고 append한 곳은 Person클래스의 bag이므로 출력되는 것은 []
print(maria.bag) # 마찬가지로 [] 빈 리스트가 출력된다.

print(Person.bag) # Person.bag.append(stuff)를 실행했으므로 출력되는 것은 ['백','열쇠']
```

비공개 클래스 속성 사용하기

클래스 안에서만 접근할 수 있고, 클래스 바깥에서는 접근할 수 없음.

```python
def 클래스이름:
	__속성=값 #비공개 클래스 속성
```

클래스에서 공개하고 싶지 않은 속성이 있다면 비공개 클래스를 사용해야한다.

```python
class Knight:
  __item_limit=10 # 비공개 클래스 속성

  def print_item_limit(self):
    print(Knight.__item_limit) # 클래스 안에서만 접근할 수 있다.

x= Knight()
x.print_item_limit() # 10
print(Knight.__item_limit) # 클래스 바깥에서는 접근할 수 없다.

'''
출력 메시지

10
Traceback (most recent call last):
  File "main.py", line 9, in <module>
    print(Knight.__item_limit) # 클래스 바깥에서는 접근할 수 없다.
AttributeError: type object 'Knight' has no attribute '__item_limit'
'''
```
