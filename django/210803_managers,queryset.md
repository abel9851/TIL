# Managers와 QuerySet

어떻게 데이터베이스로부터 objects를 가져올까?  
장고는 데이터 모델을 생성하기만 하면,  
장고가 자동으로 database_abstraction API를 준다.  
이것은 objects를 생성하고, 검색하고, 업데이트하고 삭제할 수 있게 해주는 API다.

참조: (장고문서-Making queries)[https://docs.djangoproject.com/en/3.2/topics/db/queries/]

- manager

`User.objects`를 하면 아래와 같이  
UserManager가 나오는 것을 볼 수 있다.

```python
<django.contrib.auth.models.UserManager object at 0x000002D5EBFF7548>
```

매니저는 objects안에 있다.

매니저는 데이터베이스로부터 elements(데이터로 저장된 객체의 db 데이터 전부, db데이터를 가진 객체)를 가져오게 해주는 것이다.  
Magager의 역할은 파이썬을 이용해서  
sql을 쓰지 않고 DB로부터 데이터를 가져 올 수 있게 해준다.

위의 User객체는 AbstractUser로부터 상속받았는데  
AbstractUser 안에 `obejcts = UserManager()라는 선언이 들어가 있다. 바로 위의 코드를 뜻한다.  
UserManager는 DB와 사이트를 이어준다.

**ps. 메니저는 model class를 통하여 접근하는 것 이지, model의 인스턴스를 통하여 접근하는 것 이 아님. table과 record의 차이를 생각할 것**

- QuerySet

QuerySet은 object의 리스트다.  
DB로부터 온 장고의 objects, object의 리스트인데  
매우 똑똑한 리스트다.(**get, Filter 등 sql로 제어하는 것처럼 함수를 이용해서 원하는 object를 가져올 수 있다.**)

`User.objects.all()`을 수행하면 모든 QuerySet을 리턴한다.  
**QuerySet은 db안의 모든 객체의 정보를 포함하게 해준다.**  
실제 모습은 아래와 같다.  
`<QuerySet [<User: msi>, <User: test>]>`

참조: (장고문서-QuerySet API)[https://docs.djangoproject.com/en/3.2/ref/models/querysets/]

- set이란?

QuerySet이나 직접 객체를 사용하는 경우, dir()을 써서 객체내부의 속성 리스트를 보면, \_set이라고 붙어있는 속성들을 확인 할 수 있다.  
이는 다른 객체에서 해당 객체를 지정한 경우(foreignkey,manytomany필드),에 확인 가능한데,  
이는 해당객체가 다른 객체를 지정하지 않더라도(foreignkey,manytomany필드를 사용하지 않더라도)  
다른 객체가 나를 지정한 곳에 접근해줄 수 있는 키워드가 set이다.  
즉, 앨리먼트(User객체)를 Room객체(ForeingKey), Conversation(ManyTomany)객체가 가리키고 있다면,  
User.room_set, User.converstion_set으로 접근 가능하다.(ManyToMany로 지정받고 있을 경우,  
아래와 같이해당 객체를 하나로 설정해야한다.

```python
a=User.objects.get(id=1)

a.converstion.count()

```

그리고 이는 Room객체와 Conversation객체가 필드를 생성할때, related_name=rooms, conversation이라는 옵션으로  
User객체가 User.rooms, User.convesation이라는 이름으로 접근을 가능하도록 바꿔줄 수 있다.(migrate 필요)  
다시 말해 foreignkey를 앨리먼트를 가리키면, 그 앨리먼트 또한 foreignkey에 접근 할 수 있다.

- dir()  
  클래스와 인스턴스 내부에서 사용할 수 있는 정보를 확인  
  파이썬 x.\_\_dict\_\_와 마찬가지로 딕셔너리로 보여준다.  
  해당 객체의 속성 뿐만 아니라, 객체가 속한 클래스가 가지는 속성도 포함하는 리스트를 되돌아온다.(지정하지 않은거까지)  
  해당 개체의 유효한 속성의 리스트를 반환하려고 시도한다.

  인자가 없는 경우, 현재 로컬 범위에 있는 이름의 리스트를 돌려준다.

```python
class  MyClass :
     def  __init__ (self) :
        self.val1 = 10
        self.val2 = 20

obj = MyClass () print ( dir ())

#결과
[ 'MyClass', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'obj']

```

참조: (dir, vars 차이)[https://youngchanchang.github.io/django/2020/09/27/Django-16-01-ManagerandQuery/]
참조: (dir, vars 차이-정확함)[https://www.geeksforgeeks.org/difference-between-dir-and-vars-in-python/]

- vars()  
  var는 \_\_dict\_\_, dictionary 또는 클래스 리스트 안의 나타내는 것을 리턴  
  딕셔너리로 보여준다.  
  vars()는 vars(a)일 경우, a객체의 속성의 리스트를 보여준다.(지정한거)  
  **객체의 심볼 테이블(db의.)에 해당하는 딕셔너리를 반환한다. 중요!**  
  \_\_dict\_\_와 마찬가지.

  인자가 없을 경우(vars()), locals()와 동일한 결과를 반환한다.  
  locals()는 현재 로컬의 심볼 테이블을 나타내는 딕셔너리를 업데이트하고 반환한다.

```python

class  MyClass :
     def  __init__ (self) :
        self.val1 = 10
        self.val2 = 20

obj = MyClass () print ( vars ())

#결과
{ '__spec__': None '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x00000289CD407940> '__file__': '/path/to/somewhere.py', '__cached__': None '__builtins__'<module 'builtins' (built-in)> '__name__': '__main__', 'obj': <__ main __. MyClass object at 0x00000289CD4698D0> 'MyClass': <class '__main __. MyClass'> '__doc__': None '__package__' : None}

```

- id()
  클래스와 인스턴스의 레퍼런스를 정수로 보여준다.

- type 클래스
  클래스와 인스턴스가 누구에 의해 만들어졌는지에ㅡ 대한 정보를 확인한다.

```python

a= "apple"
print(type(a))

```

a라는 변수에 type 클래스를 입력하면, str이라고 나온다.  
단순히 a라는 변수는 class가 str라고만 생각 할 수 있지만,  
a라는 변수는 apple이라는 리터럴(소스 코드의 고정된 값을 대표하는 용어, 고정된 값은 숫자, 문자, 함수 등 더이상 나눌 수 없는 평확하게 데이터를 표현하는 값.)이 할당되었고, str이라는 클래스에 의해 만들어졌다.  
그리고 a라는 변수가 사용할 수 있는 메서드도 나온다.

type과 변수a를 통해 알 수 있듯이, 파이썬의 모든 것은 객체(object)다.

- \_\_dict\_\_

\_\_dict\_\_는 인스턴스 내부에 어떤 속성이 있는지 확인한다.

```python

class Person:
    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

p = Person("wow")
print(p.__dict__)
```

```
{'name':'wow'}
```
