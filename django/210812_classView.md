# 클래스형 뷰

클래스로 작성되어 있는 view 객체를 말한다.  
상속과 믹스인 기능 사용으로 코드의 재사용이 가능하고  
뷰를 체계적으로 관리할 수 있다.

- 클래스형 뷰의 시작
  클래스형 뷰는 URLconf에서의 사용으로 시작되는데  
  클래스로 진입하기 위한 진입 메소드(`as_view()`)를 제공하고  
  아래의 순서로 요청을 처리한다.

1. `as_view()` 메소드에서 클래스의 인스턴스를 생성
2. 생성된 인스턴스의 `dispatch()` 메소드를 호출
3. `dispatch()`메소드는 요청을 검사해서 HTTP의 메소드(GET, POST)를 알아낸다.
4. 인스턴스 내에 해당 이름을 갖는 메소드로 요청을 중계한다.
5. 해당 메소드가 정의되어 있지 않으면, `HttpResopnseNotAllowed` 예외를 발생시킨다.

```python

# urls.py

from django.urls omport path
from . import views

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login")
]

```

View 클래스에는 `as_view()`메서드와 `dispatch()`메서드가 정의되어 있다.

```python

#view.py

from django.http import HttpResponse
from django.views.generic import View

class LoginView(view):
    def get(self, request):
        #뷰의 로직을 작성한다.

    return HttpResponse('result')
```

- 클래스형 뷰의 장점
  함수형 뷰와 비교했을 때

1. GET, POST등의 HTTP 메서드에 따른 처리를 메서드명으로 구분 할 수 있어, 좀 더 깔끔한 구조의  
   (If문이 없는) 코드를 생산 할 수 있다.

2. 다중 상속과 같은 객체 지향기술이 가능하여 코드의 재사용성이나 개발 생산선을 높여준다.

**효율적인 메서드 구분**  
요청을 수신했을 때 요청의 HTTP메서드를 처리하는 방식을 함수형 뷰와 비교해보자.

```python

from django.http import HttpResponse

def login_view(request):
    if request.method == 'GET':
        #뷰 로직을 작성

        return HttpResponse('result')
```

참조:[클래스형 뷰](http://ruaa.me/django-view/)
