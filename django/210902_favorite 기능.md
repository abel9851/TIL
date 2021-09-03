# favorite 기능


[1. place_detail에 favorite 버튼 추가](#place_detail에-favorite-버튼-추가)  
[2. url생성](#url생성)  
[3. view작성](#view작성)  
[4. List객체에서 Place가 ManyToManyField인 이유](#List객체에서-Place가-ManyToManyField인-이유)  
[5. view작성(toggle방식의 함수)](#view작성toggle방식의-함수)  
[6. list 디테일 페이지 작성](#list-디테일-페이지-작성)  


이전에 장고에서 만들었던 list라는 앱은  
favorite 기능을 구현하기 위해 만들었던 앱이다.  

**에어비앤비 클론에서 현재 만들고 있는 프로젝트로 넘어 왔기 때문에**  
**코드 기준은 현재 만들고 있는 프로젝트의 것으로 할 것이다.**  

여기서 favorite 기능은, 특정 리스트가 있으면, 그 리스트에 객체를 추가하고,  
없으면 특정 리스트를 생성해서 그 리스트에 객체를 추가하는 형식이다.  

**따로 생성된 리스트가 있으면 팝업창이 나타나서 그 리스트에 체크해서 추가하는 형식이 아니므로**  
**그러한 리스트는 나중에 만들어보자**  


- ## place_detail에 favorite 버튼 추가

```html

<!-- teplates/places/place_detail.html -->

{% extends 'base.html' %}
{% load i18n %}

{% block page_title %}
    {{place.name}}
{% endblock page_title %}

{% block content %}
<div class="-mt-5 container max-w-full h-75vh flex mb-20">
    <div class="h-full w-1/2 bg-cover bg-center" style="background-image: url({{place.first_photo}});">
    </div>
    <div class="h-full w-1/2 flex flex-wrap">
        {% for photo in place.get_next_four_photos %}
            <div style="background-image: url({{photo.file.url}});" class="w-1/2 h-auto bg-center bg-cover border-gray-500 border"></div>
        {% endfor %}
    </div>
</div>

<div class="container mx-auto flex justify-around pb-56">
    <div class="w-1/2">
        <div class="flex justify-between">
            <div>
                <h4 class="text-3xl font-medium mb-px">{{place.name}}</h4>
                <span class="text-gray-700 font-light">{{place.city}}</span>
            </div>
            <a href="{{place.viewfinder.get_absolute_url}}" class="flex flex-col items-center">
                {% include 'mixins/user_avatar.html' with user=place.viewfinder %}
                <span class="mt-2 text-gray-700">{{place.viewfinder.first_name}}</span>
            </a>
        </div>

        <!-- favorite list에 추가할 수 있도록 버튼을 만든다 -->
        <a href="{% url 'lists:save-place' place.pk %}" class="btn-link">{% trans 'save to Favorites' %}</a>
        <div class="flex border-section"></div>
        <p class="border-section">{{place.description}}</p>
        <div class="mt-10">
            <h4 class="font-medium text-2xl mb-5">{% trans 'Reviews' %}</h4>
            <div class="flex items-center">
                <div>
                    <i class="fas fa-star text-blue-400"></i>
                    <span class="font-bold text-xl">{{place.total_rating}}</span>
                </div>
                <div class="h-4 w-px bg-gray-400 mx-5"></div>
                <div>
                    <span class="font-bold text-xl">{{place.reviews.count}}</span>
                    <span>review{{place.reviews.count|pluralize}}</span>
                </div>
            </div>
            <div class="mt-10">
                {% for review in place.reviews.all %}
                    <div class="border-section">
                        <div class="mb-3 flex">
                            <div>
                                {% include 'mixins/user_avatar.html' with user=review.user h_and_w='w-10 h-10' text='text-xl' %}
                            </div>
                            <div class="flex flex-col ml-5">
                                <div class="font-medium">
                                    <div class="justify-between text-red-500">
                                        <a href="{% url 'reviews:update' place.pk review.pk %}">{% trans 'Update' %}</a>
                                        <a href="{% url 'reviews:delete' place.pk review.pk %}">{% trans 'Delete' %}</a>
                                    </div>
                                    {{review.user.first.name}}
                                </div>
                                <span class="text-sm text-gray-500">{{review.created|date:'F-Y'}}</span>
                            </div>
                        </div>
                        <p>{{review.review}}</p>
                    </div>
                {% endfor %}
            </div>
        </div>
    </div>
    <div class="w-1/3">
        {% if place.viewfinder == user %}
            <a href="{% url 'places:edit' place.pk %}" class="btn-link block mb-5 bg-green-500">{% trans 'Edit Place' %}</a>
            <a href="{% url 'places:delete' place.pk %}" class="btn-link block" onclick="return confirm('Do you want delete this room?')">{% trans 'Delete Place' %}</a>
        {% else %}
            <a href="{% url 'reviews:create' place.pk %}" class="btn-link block">{% trans 'Review creates' %}</a>
        {% endif %}
    </div>

</div>

{% endblock %}

```

- ## url생성

`config/urls.py`에 라우팅(include)하는 것도 잊지 말자.  



```python

# lists/urls.py

from django.urls import path
from . import views

app_name="lists"

urlpatterns = [
    path("list-adds/<int:place_pk>",views.save_place, name="save-place"),
]


```

- ## view작성

`get_or_none`은 core앱의 `managers.py`에서 생성한 함수.  
`get_or_create`는 objects(manager)에 있는 내장함수로서, 인자로 준 요소로 객체가 있는지 없는지 판단한다.  
return은 튜플로(object, created)를 주는데, object는 객체, created는 true 아니면 false를 반환한다.  
밑의 코드에선 the_list라는 변수를 하나만 적을 경우, 튜플로 받게 됨으로 변수를 2개 설정 즉, 언패킹함으로서 객체와 불리언 데이터를  
각각 리턴 받을 수 있게 해놓았다.  

`get_or_create`에 인자로 준 user, name을 가지고 있는 객체가 있을 경우, 그 객체를 반환하고 created변수에는 false를 반환한다.  
반대로 객체가 없을 경우, **list.save() 메소드 없이, 인자로 전달해준 정보를 가지고 list객체를 생성해서 그 생성된 객체를**  
**the_list 변수에 할당하고 created변수에는 True를 할당해서 리턴한다**  


```python

from django.shortcuts import redirect, reverse
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from places import models as place_models
from . import models

def save_place(request, place_pk):
    place = place_moldels.Place.objects.get_or_none(pk=place_pk)
    if place is not None:
        the_list, created = models.List.objects.get_or_create(user=request.user, name="My Favorite Places")
        the_list.places.add(place)
        messages.success(request, _("My Favorite saved"))
    
    else:
        messages.error(request, _("Place does not exist"))
    
    return redirect(reverse("places:detail" kwargs={'pk'=place_pk}))

```


- ## List객체에서 Place가 ManyToManyField인 이유

places가 ManyToManyField인 이유는,  List객체에서 Place객체를 가리킬 때, 여러개를 가리킬 필요가 있기 때문이다.  
즉, List객체가 List#1, List#2 객체로 2개, Place객체가 Place#1, Place#2객체로 2개씩 있을 경우,  
List#1은 Place#1, #2 두개의 객체를 가질 수 있다. 즉 하나의 List객체는 2개의 Place객체를 가짐으로써, 리스트 역할을 할 수 있게 된다.  
반면 Place#1도 여러개의 리스트 객체를 가질 수 있는데, List#1의 이름이 my favorites, List#2이 good places라는 이름을 가지고 있다면  
Place#1은 두 리스트에 속할 수 있다는 것이다.  ForignKey 관계(Place->List)일 경우, Place#1은 하나의 리스트를 가리키면   
그 리스트에만 속할 수 있다. 즉, 여러개의 리스트에 추가될 수 없다는 말이다.   반대로 (ForignKey 관계(List->Place)일 경우  
place#1은 여러개의 리스트를 가질 수 있지만, 리스트는 하나의 place 밖에 취할수 없음으로, 리스트의 역할을 하지 못한다.  

객체의 추천기능도 마찬가지다
만약에 Question이라는 객체가 실제 웹사이트에서 질문 컨텐츠 역할을 하고 있고 그 Question 컨텐츠에 좋아요를 눌러서 숫자를 표시하고 싶다면  
Quesiton#1객체 -> User#1객체인 foreignKey관계인 경우는 User가 여러 Question 컨텐츠의 숫자를 카운팅 할 순 있어도  
다른 유저가 Question#1 객체를 가리킬 순 없어서 추천기능을 만들 수 없다.  
반대로 user#1 -> Question#1 인 foreignKey관계인 경우는  여러 유저가 Question#1 컨텐츠 하나에만 접근할 수 있어서 하나의 Question개체에만  
좋아요를 할 수 있다.  

**ManyToMany관계(Question ->, <- User)면, user는 여러개의 Quetion 객체에 접근할 수 있고, 접근되어진 User객체는 처음에**  
**접근받은 Question객체 뿐만 아니라 나중에 접근 다른 Question객체들과 관계가 생길수 있음으로**  
**하나의 Question컨텐츠는 여러 유저와 관계가 있음으로 그 Question컨텐츠에 추천할 수 있고,**   
**하나의 User객체는 여러 Quetion컨텐츠와 관계가 있음으로 처음에 가리킴을 받은 Question컨텐츠 이외의 Question 컨텐츠에게서**  
**가리킴을 받으니, 거꾸로 그 가리킨 Question 컨텐츠들에게 접근할 수 있음으로 여러 Qeustion컨텐츠에 좋아요를 해줄 수 있다** 


**foreignkey와 ManyToMany관계는 생성이라는 개념에만 얽메이면 안된다. 단지 가리키고, 가리켜진 객체는 가리킨 객체에 가리키고 접근할 수 있다**  
**하나의 객체만 접근한게 아니라 서로 여러 상대방의 객체들에 접근이 가능한 것이다.**  


아래의 코드처럼

```python

# lists/modesl.py

class List(core_models.TimeStampedModel):

    """ List Model definition """

    name = models.CharField(max_length=80)
    user = models.ForeignKey(
        "users.User", related_name="lists", on_delete=models.CASCADE
    )
    places = models.ManyToManyField("places.Place", related_name="lists", blank=True)

    def __str__(self):
        return self.name

    def count_places(self):
        return self.places.count()

    count_places.short_description = "Number of Places"


```


- ## view작성(toggle방식의 함수)


위의 view처럼 FBV의 방식으로 add 함수를 만들고, 리스트에 place가 존재할 시, remove 함수를 만들어서  
제거하는 방법도 있지만, 하나의 함수에서 들어오는 요청에 따라 대응할수 있도록 만들 수 있다.  


### template tag 만들기 - place의 존재여부에 따른 True , False 반환
```python

# lists/templatetags/on_favs.py

from django import template
from lists import models as list_models


register = template.Library()

@register.simple_tag(takes_context=True)
def on_favs(context, place):
    user = context.request.user
    
    # 같은 이름의 List객체가 있을 경우, 에러가 발생한다.
    # 모델을 List 객체 안의 user와의 관계가 ForeignKey 였으나
    # User가 하나의 List만 갖을 수 있도록 OneToOneField로 바꿨다.
    the_list = list_models.List.objects.get_or_none(user=user, name="My Favorite Places")

    # List 안에 place 객체가 있는지 확인 있으면 True 반환, 없으면 False 반환
    return place in the_list.objects.all()

```

### List모델 수정(user 필드를 ForignKey -> OneToOneField로)

```python

class List(core_models.TimeStampedModel):

    """ List Model definition """

    name = models.CharField(max_length=80)
    user = models.OneToOneField(
        "users.User", related_name="list", on_delete=models.CASCADE
    )
    places = models.ManyToManyField("places.Place", related_name="lists", blank=True)

    def __str__(self):
        return self.name

    def count_places(self):
        return self.places.count()

    count_places.short_description = "Number of Places"


```

### template 작성


```html

<!-- templates/places/place_detail.html -->

        <!-- on_favs place의 리턴값을 on_favs_boolean 변수에 담는다 -->
        {% on_favs place as on_favs_boolean %}
        <!-- on_favs_boolean이 True일 경우, 즉 place가 리스트 안에 있으면 삭제버튼을 표시 -->
        {% if on_favs_boolean %}
        <a href="{% url 'lists:toggle-place' place.pk %}?action=remove" class="block mb-5 w-2/6 text-red-500">{% trans 'Remove to Favorites' %}</a>
        {% else %}
        <!-- False일 경우, 추가 버튼을 표시 -->
        <a href="{% url 'lists:toggle-place' place.pk %}?action=add" class="block mb-5 w-2/6 text-indigo-600">{% trans 'Save to Favorites' %}</a>
        {% endif %}

```

### view 작성


```python

def toggle_place(request, place_pk):
    # action은 **kwargs가 아니라 request 매개변수에서 뽑을 수 있다.
    action = request.GET.get("action", None)
    place = place_models.Place.objects.get_or_none(pk=place_pk)
    if place is not None and action is not None:
        the_list, created = models.List.objects.get_or_create(
            user=request.user, name="My Favorite Places"
        )
        if action == "add":
            messages.success(request, _("My Fovorite saved"))
            the_list.places.add(place)
        elif action == "remove":
            messages.success(request, _("My Fovorite removed"))
            the_list.places.remove(place)
        else:
            messages.error(request, _("You can't this"))
            return redirect(reverse("places:detail", kwargs={"pk": place_pk}))

    else:
        messages.error(request, _("Place does not exist"))

    return redirect(reverse("places:detail", kwargs={"pk": place_pk}))


```



- ## list 디테일 페이지 작성

유저가 리스트를 볼 수 있도록 링크를 추가하고 view와 디테일 페이지를 작성한다.

### 링크추가

```html

<!-- templates/partials/nav.html -->

{% load i18n %}
<ul class="flex items-center text-sm font-semibold h-full">
    
    {% if user.is_authenticated %}
    <li class="nav_link"><a href="{%url 'places:create' %}">{% trans 'Create Place' %}</a></li>
    <!-- 링크추가. 유저 객체로 list에 접근할 수 있으니 다른 pk를 보낼 필요는 없다 -->
    <li class="nav_link"><a href="{%url 'lists:see-favs' %}">{% trans 'Favorites' %}({{user.list.place.count}})</a></li>
    <li class="nav_link"><a href="{{user.get_absolute_url}}">{% trans 'Profile' %}</a></li>
    <li class="nav_link"><a href="{% url "users:logout" %}">{% trans 'Log out' %}</a></li>
    {% else %}
    <li class="nav_link"><a href="{% url "users:login" %}">{% trans 'Login' %}</a></li>
    <li class="nav_link"><a href="{% url "users:signup" %}">{% trans 'Sign up' %}</a></li>
    {% endif %}
        

</ul>

```

### url 작성

```python

# lists/ursl.py

from django.urls import path
from . import views

app_name = "lists"


urlpatterns = [
    path("toggle/<int:place_pk>/", views.toggle_place, name="toggle-place"),
    path("favs/", views.SeeFavsView.as_view(), name="see-favs"),
]

```

### view 작성

```python

# lists/views.py

from django.views.generic import TemplateView
from users.mixins import LoggedInOnlyView

# 탬플릿 태그의 user를 통해 list에 접근 할 수 있고 그 list에 속한 place 객체를 뽑을 수 있으니 이대로 해도 괜찮다.
class SeeFavsView(LoggedInOnlyView, TemplateView):

    template_name = "lists/list_detail.html"


```

### 리스트 디테일 페이지 작성

```html

<!-- templates/lists/list_detail.html -->

{% extends "base.html" %}

{% block page_title %}
    Favorites
{% endblock page_title %}

{% block content %}
<div class="h-75hv">
    <h3 class="mb-12 text-2xl text-center">Your Favorites</h3>
        <!-- user의 리스트의, 플레이스의 개수가  1개이상이라면 리스트에 속한 장소들을 보여준다. -->
        {% if user.list.places.count > 0 %}
        <div class="container mx-auto pb-10">
            <div class="flex flex-wrap mb-10">
                {% for place in user.list.places.all %}
                {% include 'mixins/place_card.html' with place=place %}
                {% endfor %}
            </div>
        </div>
        {% endif %}
</div>

{% endblock content %}


```