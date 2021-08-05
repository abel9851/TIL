# 장고 URL 함수에 대해

- resolve()
  resolve()는 view함수와 매칭된 URLpath(ex: localhost:8000/tmp)를  
  해결하는 데에 사용된다.

참조: (resolve())[https://devbruce.github.io/django/dj-05-url_resolve,reverse/]

```python

#mysite/config/urls.py

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tmp/', views.tmp_view, name="tmp_name"),
]
```

**resolve(path, urlconf=None)**
`path`는 내가 해결하고자, 풀고자,확인하고자 하는 URLpath다.
이 함수는 `ResolverMatch`객체를 리턴한다.
`ResolverMatch`는 `resolved URL(위의 path(tmp/..)의 tmp/와 일치한다는 것)`에 대한 다양한 메타데이터에 접근할 수 있도록하는 객체다.
URL을 풀 수 없으면(확인할 수 없으면), resolve()는 `Resover404 exception`을 발생시킨다.

참조 : (장고 문서 - django.urls utility functions)[https://docs.djangoproject.com/en/3.2/ref/urlresolvers/]

- reverse() - FBV에서 사용  
  reverse()는 resolve() 반대되는 개념이다.  
  resolve()가 클라이언트로부터 오는 url로부터
  urlpattern까지 도달한다면,  
  reverse()는 view의 이름을 통해 해당 url을 찾는다.

```python

reverse('Viewname') 메서드

{% url 'ViewName' %} in Template Files

#장고 쉘에서 확인해보면 reverse('tmp_name')을 수행하면. '/tmp/'를 출력한다.

```

- reverse_lazy() - CBV에서 사용

reverse_lazy()는 reverse()와 같이 Viewname을 사용하는 것은 같지만,  
URLConf가 로드되기 전에 URL reversal(?)을 사용하고자할때 사용된다.

**reversed URL(뷰를 매칭하기 전(URLconf 전), urlpatterns의 'tmp/'까지 도달한 상태?)를**
**GCBV(제너럴 클래스 베이스드 뷰)의 속성으로 제공할 때 사용**

**CBV의 작동방식은 FBV와는 달리, attribute로**
**reversed URL를 전해줘야 사용가능하다.**

(기타 revese 관련사용방법)[https://wayhome25.github.io/django/2017/05/05/django-url-reverse/]
(장고 문서)[https://docs.djangoproject.com/en/3.2/ref/urlresolvers/]

- URLconf란?
  장고에서 URL과 일치하는 view를 찾기 위한 패턴들의 집합.

장고의 애플리케이션은 입력받은 어떤 URL을 통해  
어떤 page를 보여줘야하는지 알고 있다.  
이때 Djnago는 `URLconf(URL configuration)`을 사용한다.  
즉 어떠한 url 요청이 들어오면 어떤 views.py의 함수를 실행시킬지 정의하는 단계다.  
URLconf를 사용하기 위해서 urls.py를 사용한다.

참조:(URLconf)[https://sangjeong1011.tistory.com/23]
