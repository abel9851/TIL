# 유저 프로필 페이지 만들기


[1. nav.html에 프로필 url태그 추가](#nav.html에-프로필-url태그-추가)  
[2. ProfileView 작성](#ProfileView-작성)  
[3. urls.py에 path 추가](#urls.py에-`path()`-추가)  
[4. get_absolute_url](#get_absolute_url)


## nav.html에 프로필 url태그 추가

```html

<!-- 유저가 로그인해있으면, iis_authenticated는 무조건 True -->
{% if user.is_authenticated %}
<li class="nav-link"><a href="{% url "user:profile" %}"></a>Profile</li>
<li class="nav-link"><a href="{% url "user:logout" %}"></a>log out</li>
{% else %} <!-- is_authneticated가 false면 -->
<li class="nav-link"><a href="{% url "user:login" %}"></a>log in</li>
<li class="nav-link"><a href="{% url "user:signup" %}"></a>sign up</li>

{% endif %}

```

## ProfileView 작성

```python

from django.views.generic import DetailView
from . import models


# User객체의 pk만 받으면 그 유저 객체의 필드를, 정보를 탬플릿에서 사용할 수 있기에
# DetailView를 사용
class UserProfileView(DetailView):
    model = models.User
    context_object_name = "user_obj"



```

## urls.py에 `path()` 추가


```python

app_name = "users"

urlpatterns = [

    path("<int:pk>", views.ProfileView.as_view(), name="profile")
]


```


## get_absolute_url

장고 안의 모델들은 get_absolute_url이라는 메소드를 가지고 있다.  
get_absolute_url은 reverse 함수를 통해  
모델의 개별 데이터 url을 문자열로 반환한다.  

참조:  
[초보몽키 - get_absolute_url](https://wayhome25.github.io/django/2017/05/05/django-url-reverse/)




```python

# view.py

class User(AbstractUser):

    def get_absolute_url(self):



```
