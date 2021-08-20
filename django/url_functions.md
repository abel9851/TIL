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
  urls.yp에 선언해둔 name에 따라 URL을 받아와서(로드해서) 사용할 수 있게 해주는 기능

```python

reverse('Viewname') 메서드

{% url 'ViewName' %} in Template Files

#장고 쉘에서 확인해보면 reverse('tmp_name')을 수행하면. '/tmp/'를 출력한다.

```

- reverse_lazy() - CBV에서 사용

reverse_lazy()는 reverse()와 같이 Viewname을 사용하는 것은 같지만,  
URLConf가 로드되기 전에 URL reversal(네임태그로부터 url을 뽑는 것)을 사용하고자할때 사용된다.  
reverse와 같지만 자동으로 호출하지 않는다.  
view가 필요로 할때 호출된다.(URL reversal할때)  
view가 로드될때 URL이 아직 불려지지 않은거다.

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

- FBV일때 reverse()

1. FBV는 이미 초기화가 된 상태.
2. return으로 reverse()를 호출
3. reverse() 호출되면 URLConf가 load된다.
4. URLconf에서 url과 view를 맵핑한다.

- CBV일때 reverse()

1. CBV에서 속성으로 reverse()를 취하게 되면, import될때 CBV는 배치되는데 이 타이밍은 프로젝트 초기화 이전.
2. 초기화가 안되어 있는 상태에서 reverse 호출
3. reverse() 호출되면 URLConf가 load된다.
4. 에러발생

- CBV일때 reverse_lazy()

1. import될때 CBV가 배치된다.
2. CBV에서 reverse_lazy()를 호출(나중에 해당변수가 직접 접근되거나 메서드가 호출되었을때 evaluate)
3. 하지만 바로 URLConf를 load하지 않음
4. 실제로 reverse값을 참조하는 시점으로 지연되어 수행된다.
5. URLconf가 load되고 url, view를 맵핑

reverse가 동작하기 위해서는 장고 프로젝트에 대한 초기화 작업이 모두 완료되고 나서야 가능해진다.  
그런데 아래와 같은 코드에서

```python
class MyViewClass:
... success_url = reverse("post_list")
```

reverse("post_list") 부분은 "클래스 변수" 부분으로서, 해당 소스파일이 임포트되면서 클래스 정의가 이뤄질 때 호출이 된다.  
그런데 이 타이밍은 프로젝트 초기화 이전이다.  
그래서 reverse에 실패하게 된다.  
reverse_lazy를 쓰게 되면, reverse를 수행하는 시점이 실제로 reverse 값을 참조하는 시점으로 지연되어 수행이 되기 때문에

```python
class MyViewClass:
... success_url = reverse_lazy("post_list")
```

위 코드가 오류없이 동작하게 되는 것이다.

참조[reverse, reverse_lazy 차이점 - 일본어](https://as-chapa.hatenablog.com/entry/django-render)  
[reverse, reverse_lazy 차이점 - 일본어#2](https://btj0.com/blog/django/success_url-get_success_url-reverse-reverse_lazy/)  
[reverse, reverse_lazy 차이점](https://my-repo.tistory.com/29)  
[lazy evaluation](https://velog.io/@kho5420/python-lazy-evaluation-%ec%9d%b4%eb%9e%80)  
[제네레이터](https://itholic.github.io/python-generator/)
