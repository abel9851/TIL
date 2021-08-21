# 유저 프로필 페이지 만들기

[1. nav.html에 프로필 url태그 추가](#navhtml에-프로필-url태그-추가)  
[2. ProfileView 작성](#profileview-작성)  
[3. urls.py에 path 추가](#urlspy에-path-추가)  
[4. get_absolute_url](#get_absolute_url)  
[5. user_detail.html 만들기](#user_detailhtml-만들기)  
[6. view에서 랜더링할 context 추가하기 (get_context_data)](#view에서-랜더링할-context-추가하기-get_context_data)

- ## nav.html에 프로필 url태그 추가




`{% users:profile user.pk %}`을 쓴 작동 순서:
`{% users:profile user.pk %}`로 User객체의 pk를 전달해주면서 `users:profile`에 해당하는 url과   view를 맵핑함과 동시에 view를 호출 -> `UserProfileView(DetailView)`호출   
( `get_absolute_url`을 사용하면 admin 패널의 객체의 디테일 페이지로 가면 **view on site**라는 버튼이 생기는데  
그 버튼을 누르면 **그 객체의 디테일 페이지**를 이동하게 되어 바로 볼 수 있다. )



**`get_absolute_url`을 쓴 작동 순서**:  
`{{ user.get_absolute_url }}`로 모델의 `get_absolute_url()`호출 -> `reverse()`를 리턴하기 때문에 
`users:profile`에 해당하는 url과 view를 맵핑함과 동시에 view를 호출 -> `UserProfileView(DetailView)`호출 



```html

<!-- 유저가 로그인해있으면, iis_authenticated는 무조건 True -->
{% if user.is_authenticated %}

<!-- {% url "users:profile" user.pk %}처럼 직접 user.pk를 줄 필요 없이 get_absoulte_url에 
로직을 만들어 놓으면 편한다. Users:profile은 view에서 모댈 객체를 지정하고, 또 pk를 전달해줘야한다.
-->

<li class="nav-link"><a href="{{ user.get_absolute_url }}"></a>Profile</li>
<li class="nav-link"><a href="{% url "users:logout" %}"></a>log out</li>
{% else %} <!-- is_authneticated가 false면 -->
<li class="nav-link"><a href="{% url "users:login" %}"></a>log in</li>
<li class="nav-link"><a href="{% url "users:signup" %}"></a>sign up</li>

{% endif %}

```

- ## ProfileView 작성



**디테일을 랜더링하려면 객체의 pk가 반드시 필요하다.**

정말 중요한 부분이 있는데 현재 로그인한 유저의 탬플릿 태그는 `{{user}}`이다.(로그인 한 유저의 pk를 123이라 하자. user = loged in user)  
`get_absolute_url()` -> `UserProfileView(DetailView)`로 랜더링 되는 탬플릿 태그 또한 `{{user}}`이다.  
다른 사람의, 예를 들어 `Room.host.get_absolute_url()`로 pk가 86 일 경우, `{{user}}` 변수는 pk가 86인 유저로 덮어쓰여지게 된다  
즉, 로그인한 유저가 아닌 `Room.host`의 유저가 되는 것이다. (user=Room.host)  
이렇게 되면 `user_profile.html`의 `{{ user.get_absolute_url}}`은 `{{user}}`가 `Room.host`로 덮여쓰여진 상태이기 때문에  
`get_absolute_url()`이 리턴하는 self.pk는 86으로 고정된다.  
그러면 로그인한 유저의 프로필로 이동이 되지 않는다.  


이를 해결하기 위해 `UserProfileView(DetailView)`의 **context_objects_name**의 변수 이름을 바꿔줘야한다.  
아래의 코드 같이 `user_obj`로 바꾸면, `Room.host.get_absolute_url()`로 self.pk가 86일 경우, Room.host의 프로필로 이동되는 것은 같지만  
**`{{ user.get_absolute_url}}`의 `{{user}}` 변수는 여전히 `user= loged in user`이므로 user_profile.html에서 보게 되는 유저 프로필은**  
**계속해서 로그인한 유저의 프로필을 볼 수 있게 된다.**  

**로그인한 유저의 변수와 view가 찾은 변수, 변수의 사용을 조심하자.**  \


참조:  
[detailview - context_object_name](https://youngchanchang.github.io/django/2020/10/15/Django-41-UserProfile/)


```python

from django.views.generic import DetailView
from . import models


# User객체의 pk만 받으면 그 유저 객체의 필드를, 정보를 탬플릿에서 사용할 수 있기에
# DetailView를 사용
class UserProfileView(DetailView):
    model = models.User
    
    #이 코드는 로그인 했던 유저가 아니라, 뷰에서 찾았던 유저객체(object)를 가르키는 방법을 바꿀 수 있도록 해준다.  
    context_object_name = "user_obj" 



```

- ## urls.py에 `path()` 추가


```python

app_name = "users"

urlpatterns = [

    path("<int:pk>", views.ProfileView.as_view(), name="profile")
]


```


- ## get_absolute_url

장고 안의 모델들은 get_absolute_url이라는 메소드를 가지고 있다.  
get_absolute_url은 reverse 함수를 통해  
모델의 개별 데이터 url을 문자열로 반환한다.  

어떠한 모델에 대해서 DetailView를 만들게 되면 `get_absolute_url()`을 무조건 선언하자.(DetailView에서 pk가 반드시 필요)  
`resolve_url(모델 인스턴스)`, `redirect(모델 인스턴스)`를 통해서 모델 인스턴스의 `get_absolute_url()`을 자동으로 호출한다.  
**`resolve_url()`함수는 가장 먼저 `get_absolute_url()`의 존재 여부를 체크하고**  
**존재하면 호출하며 그 리턴값으로 URL을 적용한다.**


get_absolute_url을 쓰는 이유는,  
1. `{% users:profile user.pk %}`를 사용하는 대신에 `user.get_absoulte_url`로 pk를 주는  
 코드를 작성할 필요 없이 퍈하게 url과 view의 맵핑이 가능하다.  


2. admin 패널의 객체의 디테일 페이지로 가면 **view on site**라는 버튼이 생긴다.  
그 버튼을 누르면 **그 객체의 디테일 페이지**를 이동하게 되어 바로 볼 수 있다. 

참조:  
[초보몽키 - get_absolute_url](https://wayhome25.github.io/django/2017/05/05/django-url-reverse/)  
[장고문서 - get_absolute_url](https://docs.djangoproject.com/en/3.2/ref/models/instances/#django.db.models.Model.get_absolute_url)

```python

# models.py

form django.shortcut import reverse

class User(AbstractUser):

    def get_absolute_url(self):
        return reverse("users:profile" kwargs={'pk': self.pk}) # reverse니까 안에는 앱 네임이 들어가야한다. 

```



- ## user_detail.html 만들기

```html

<!-- templates/mixins/user_avatar.html -->
        {% if user.avatar %}
        <div class="h-20 w-20 rounded-full bg-cover" style="background-image: url({{user.avatar.url}})">
        {% else %}
        <div class="h-20 w-20 bg-gray-700 rounded-full text-white flex justify-center items-center overflow-hidden">
            <span class="text-2xl">{{ user.first_name|first}}}</span>
        {% endif %}
        </div>


```

[h-75vh의 viewport 100분율에 대해](https://ameblo.jp/hp-daiko/entry-12268490870.html)  


```html

<!-- tempaltes/users/user_detail.html -->


{% extends "base.html" %}

{% block page_title %}
    {{user_obj.first_name}}'s Profile
{% endblock page_title %}



{% block content %}
    <div class="h-75vh">
        <div class="container md:w-1/2 lg:w-5/12 xl:w-1/4 mx-auto my-10 flex flex-column">
            {% include 'mixins/user_avatar.html' with user=user_obj %}

            <div class="flex items-center">
                <span class="text-3xl mt-1">{{ user.obj.firstname }}</span>
                {% if user_obj.superhost %}
                    <i class="fas fa-check-circle text-teal-400 ml-4"></i>
                {% endif %}
            </div>


            <span class="text-lg mb-5">{{ user.bio }}</span>
            <!-- 로그인한 유저 == 뷰에서 찾은 유저 -->
            {% if user == user_obj %}

            <a href="#" class="btn-link">Edit Profile</a>
            {% endif %}
        </div>

        {% if user_obj.rooms.count > 0 %}
        <div class="container mx-auto flex flex-col items-center">
            <h3 class="mb-12 text-2xl">{{user_obj.first_name}}'s Rooms<h3>
            <div class="flex flex-wrap -mx-40 mb-10">
                {% for room in user_obj.rooms.all %}
                    {% include 'mixins/room/room_card.html' with room=room %}
                {% endfor %}
            </div>
        </div>
    </div>


    {% endif %}
{% endblock content %}




```



- ## view에서 랜더링할 context 추가하기 (get_context_data)

DetailView에서는 기본적으로 `context_object_name`에서 지정한 변수, 혹은 지정하지 않은 상태에서는  
지정한 모델의 이름을 따르는 `{{context}}`만 탬플릿에 랜더링한다.  
기타 다른 것을 랜더링하고 싶으면 `get_context_data()`를 사용하면 된다.  

참조:  
[super()에 대해](https://rednooby.tistory.com/56)  
[장고문서 - get_context_data](https://docs.djangoproject.com/en/3.2/ref/class-based-views/mixins-single-object/#django.views.generic.detail.SingleObjectMixin.get_context_data)  
[장고문서 - Using mixins with class-based views: get_context_data](https://docs.djangoproject.com/en/3.2/topics/class-based-views/mixins/)  
[CBV에서 특정 데이터 가져오기(get_context_data)](https://kimdoky.github.io/django/2018/03/26/django-cbv-get-context-data/)  
[파이썬 공식문서 - super()](https://docs.python.org/ko/3/library/functions.html?highlight=super#super)  


**주의! : self는 class C가 아니라, 클래스 C를 호출한 인스턴스 자기 자신이다!**
**`super()`를 포함해서 장고의 구조, 프로그래밍 세부 내용 공부는 공식문서 + 유튜브 강의,**  
**다른 인터넷 강의를 보면서 차근차근 이해해보자**  

```python

# super()의 사용법

class C(B):
    def method(self, arg):
        super().method(arg)    # This does the same thing as:
                               # super(C, self).method(arg) python2에서 사용하던 방식. 
                               # 호환을 위해 종종 사용하는 경우가 있음. 


```


```python

from django.views.generic import DetailView
from . import models


class UserProfileView(DetailView):
    model = models.User
    context_object_name = "user_obj"
    
    #{{now}}라는 context를 추가했다.
    # context data를 확장시킴.
    #context로 {{now}} 를 탬플릿에서 사용하면 시간을 출력한다.
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["now"] = timezone.now()
            return context

```