# login, logout 기능

로그인 같은 경우는 form으로 ID, password를 받고 '인증'을 해야한다.

1. 그 유저가 존재하는지 안하는지 확인한다.
2. 패스워드가맞는지 확인한다.  
   1, 2는 안맞을시 에러가 난다.

- urls.py에 url 작성

```python

# users/urls.py

from django.urls import path
from . import views

appname = "users"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login")
]


```

= views.py에 view 작성

기본 View 클래스를 쓸 때는 두가지만 가지게 되는데  
`get()`과 `post()`이다.  
기본적으로 모든 HTTP method들을 가지게 된다.(get과 post)

```python

from django.views.generic import View
from django.shortcuts import render

class LoginView(View):

    def get(self, request):
        return render(request, "users/login.html")

    def post(self, request):

```

- template를 작성 - nav바의 로그인 클릭

```python

# templates/partials/nav.html

<a href="{% url "core:home" %}">Nbnb</a>
<ul>
    <li><a href="{ url "users:login" }">Login</a></li>
</ul>


```

- template를 작성 - `templates/users/login.html`으로 html을 만들어주자.

```python

#templates/users/login.html


{% extends 'base.html' %}


{% block page_title %}
    Login
{% endblock page_title %}


{% block search-bar %}
{% endblock search-bar %}

{% block content %}

{% endblock content %}

```
