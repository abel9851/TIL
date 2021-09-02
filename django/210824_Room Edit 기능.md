# Room Edit 기능  


[1. 탬플릿에 Edit Room 링크 추가](#탬플릿에-Edit-Room-링크-추가)  
[2. URL 추가](#URL-추가)  
[3. EditRoomView 작성](#EditRoomView-작성)  
[4. room_edit.html 탬플릿 생성](#roomedithtml-탬플릿-생성)  
[5. room/room_form.html, room_input.html 생성](#roomroom_form.html-roominputhtml-생성)  
[6. url로 edit 접근하는거 막기(get_object 오버라이딩 사용)](#url로-edit-접근하는거-막기getobject-오버라이딩-사용)  



[Room Detail 만들기(탬플릿)](https://github.com/abel9851/TIL/blob/master/django/210824_Room%20Detail%20%EB%A7%8C%EB%93%A4%EA%B8%B0(%ED%83%AC%ED%94%8C%EB%A6%BF).md)에 이어서 Room을 수정하는 기능을 만든다.  


- ## room_detail.html 탬플릿에 Edit Room 링크 추가

```html

<!-- templates/room_detail.html -->

{% extends 'base.html' %}
{% load is_booked %}

{% block page_title %}
    {{room.name}}
{% endblock page_title %}
    

{% block content %}
<div class="-mt-5 container max-w-full h-75vh flex mb-20">
    <div class="h-full w-1/2 bg-cover bg-center" style="background-image:url({{room.first_photo}})">
    </div>
    <div class="h-full w-1/2 flex flex-wrap">
        {% for photo in room.get_next_four_photos %}
        <div class="w-1/2 h-auto bg-cover bg-center border border-gray-700" style="background-image:url({{photo.file.url}})">
        </div>
        {% endfor %}
    </div>
</div>

<div class="container mx-auto flex justify-around pb-56">
    <div class="w-1/2">
        <div class="flex justify-between">
            <div class="mb-5">
                <h4 class="text-3xl font-medium mb-px">{{room.name}}</h4>
                <span class="text-gray-700 font-light">{{room.city}}</span>
            </div>
            <a href="{{room.host.get_absolute_url}}" class="flex flex-col items-center">
                {% include "mixins/user_avatar.html" with user=room.host %}
                <span class="mt-2 text-gray-500">{{room.host.first_name}}</span>
            </a>
        </div>
        <div class="flex border-section">
            <span>{{room.room_type}}</span>
            
            <!-- pluralize는 1개 초과면 's' 문자열을 리턴한다. -->
            <span class="mr-5 font-light">{{room.beds}} bed{{room.beds|pluralize}}</span> 
            <span class="mr-5 font-light">{{room.bedrooms}} bedroom{{room.bedrooms|pluralize}}</span>
            <span class="mr-5 font-light">{{room.baths}} bath{{room.baths|pluralize}}</span>
            <span class="mr-5 font-light">{{room.guests}} guest{{room.guests|pluralize}}</span>
        </div>
        <p class="border-section">
            {{room.description}}
        </p>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">Amenities</h4>
            <!-- many to many field이기 때문에 all 메소드와 for문을 써서 보여준다. -->
            {% for amenity in room.amenities.all %}
            <li class="mb-2">{{amenity}}</li>
            {% endfor %}
        </div>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">Facilities</h4>
            {% for facility in room.facilities.all %}
            <li class="mb-2">{{facility}}</li>
            {% endfor %}
        </div>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">House Rules</h4>
            {% for house_rule in room.house_rules.all %}
            <li class="mb-2">{house_rule}}</li>
            {% endfor %}
        </div>
        <div class="mt-10">
            <h4 class="font-medium text-2xl mb-5">Reviews</h4>
            <div class="flex items-center">
                <div class="mr-5">
                    <i class="fas fa-star text-teal-500"></i>
                    <span class="font-bold text-xl">{{room.total_rating}}</span>
                </div>
                <div class="h-5 w-px bg-gray-400 mx-5"></div>
                <div>
                    <span class="font-bold text-xl">{{room.reviews.count}}</span>
                    <span>review{{room.reviews.count|pluralize}}</span>
                </div>
            </div>
            <div class="mt-10">
                {% for review in room.reviews.all %}
                    <div class="border-section">
                        <div class="mb-3 flex">
                            <div>
                                <!-- {{h_and_w|default:'h-20 w-20'}} 이라는 변수를 user-avatar.html에 설정 -->
                                <!-- {{text|default:'text-3xl'}}도 설정 -->
                                <!-- 유저 사진의 크기가 너무 커서 조절을 위해 설정 -->
                                {% include 'mixins/user-avatar.html' with user=review.user h_and_w='w-10 h-10' text='text-xl">
                                <span class="font-medium">{{review.user.first_name}}</span>
                                <!-- 필터를 사용해서 달이랑 년도만 표시. 이처럼 탬플릿에서는 쉽게 format(서식을 만듬) 할 수 있음 -->
                                <span class="text-sm text-gray-500">{{review.created|date:"F-Y"}}</span>
                            </div>
                        </div>
                        <p>{{review.review}}</p>
                    </div>
                {% endfor %}
            </div>
        </div>
    </div>
    
    <!-- 링크 생성 -->
    <div class="w-1/3">
        {% if user == room.host %}
        <a href="{% url 'users:edit' room.pk %}" class="btn-link block">Edit Room</a>
        {% endif %}
    </div>

</div>

{% endblock %}

```

- ## URL 추가


```python


from django.url import path

appname="users"

urlpatterns = [
    path("<int:pk>/edit/", views.EditRoomView.as_view() , name="edit")
]

```

- ## EditRoomView 작성

유저의 프로필(유저객체)를 수정하는 기능을 만들었을때도 `UpdateView`를 사용했지만  
유저의 객체를 가져올때는 보안을 위해서 url에서 pk를 받는 것이 아닌,  
`get_object(self)`에서 `return self.request.user`의 방식으로, 현재 요청하는 유저의 객체를 가져오는 형식으로  
로직을 만들었었는데 Room객체에서는 그 정도까지는 필요 없음으로 url에서 pk를 받는 방식으로 할 것이다.  


```python


# views.py

from . import models


class EditRoomView(UpdateView):

    # 수정이 끝나면, room모델에 get_absolute_url 메소드가 있을 시,
    # 그 메소드를 호출하여 리턴된 url로 이동한다.
    
    model = models.Room
    template_name = "users/room_edit.html"
    fields = (
        "name",
        "description",
        "country",
        "city",
        "price",
        "address",
        "guests",
        "beds",
        "bedrooms",
        "baths",
        "check_in",
        "check_out",
        "instant_book",
        "room_type",
        "amenities",
        "facilities",
        "house_rules",

    )

```


- ## room_edit.html 탬플릿 생성


```html


<!-- rooms/room_edit.html -->


{% extends "base.html" %}

{% block page_title %}
    Update Room
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            {% include 'mixins/auth/auth_form.html' with form=form cta="Update Room" %}
            
    </div>
{% endblock content %}

```


- ## room/room_form.html, room_input.html 생성

label을 추가하기 위해 따로 room_form.html, room_input.html을 만들어주자   

`UpdateView`는 form을 만들 필요도 없고 cleaned_data를 사용할 필요도 없어서 편하긴 하지만  
통제력이 떨어진다.  

다음에는 FBV로 전부다 만들어보자. 



```html

<!-- templates/mixins/room/room_form.html -->

<form method="POST" class="w-full" enctype="multipart/form-data">
    {% csrf_token %}
    
    {% if form.non_field_errors %}
        {% for error in form.non_field_errors %}
            <span class="text-red-700 font-medium text-sm">{{error}}</span> 
        {% endfor %}
    {% endif %}
    
    {% for field in form %}
        {% include 'mixins/room/room_input.html' with field=field %}
    {% endfor %}
    
    <button class="btn bg-red-500 text-white">{{cta}}</button>
</form>

```


```html

<div class="input w-full {% if field.errors %}has_error{% endif %}">
    {{field.label}}
    {{field}}
    {% if field.errors %}
        {% for error in field.errors %}
            <span class="text-red-700 font-medium text-sm">{{error}}</span> 
        {% endfor %}
    {% endif %}
</div>

```

- ## url로 edit 접근하는거 막기(get_object 오버라이딩 사용)


위의 과정을 따라서 `UpdateView`로 만들면 탬플릿에서 `{% if user == room.host %}`으로  
룸 객체의 유저가 아닌 유저일 경우, 룸 수정 링크를 숨기지만 
결국 url에서 해당 룸의 `<int:pk>(예를 들어 룸 ID가 3)/edit`를 하면  
**ID가 3인 룸의 객체를 룸 객체의 유저가 아님에도 불구하고 수정할 수 있다.**   
이러한 부분은 보안을 위해 반드시 수정해야한다.  

1. `user_mixins.LoggedInOnlyView`으로 로그인한 유저만 edit하게 설정

2. `UpdateView`는 속성 `model`과 urls.py에서 맵핑된 `<int:pk>`를 가지고 객체를 찾는다.   
 하지만 이는 소유권에 대한 인증이 안된다는 문제점이 있다.(다른 유저가 룸 객체의 유저가 아님에도 불구하고  
 url로 접근하면 수정을 할수 있다던가..)  
 그러므로 **`get_object(self)`**를 오버라이딩해서 해당 룸 객체의 유저만 수정 할 수 있도록 하자.  


 (`self.get_queryset()`의 self는 UpdateView의 인스턴스다.  
  이떄 get_queryset을 하면, model에 넣은 모델(models.Room 등)의 인스턴스들(룸 전부)을 queryset으로 반환한다.)

 참조:
 [CCBV - UpdateView : get_object(self)](https://ccbv.co.uk/projects/Django/3.1/django.views.generic.edit/UpdateView/)

```python

from django.http import Http404
from users import mixins as user_mixins


class EditRoomView(user_mixins.LoggedInOnlyView,UpdateView):
    
    model = models.Room
    template_name = "users/room_edit.html"
    fields = (
        "name",
        "description",
        "country",
        "city",
        "price",
        "address",
        "guests",
        "beds",
        "bedrooms",
        "baths",
        "check_in",
        "check_out",
        "instant_book",
        "room_type",
        "amenities",
        "facilities",
        "house_rules",
    )

    def get_object(self, queryset=None):
        
        room = super().get_object(quueryset=queryset) # model과 url의 pk로 얻어진 현재 Room 객체
        user = self.request.user

        if room.host.pk != user.pk
             raise http404()

        else:
            return room #탬플릿에서 쓰이는 변수 room과는 상관없음
                        # 탬플릿에서 쓰이는 변수 이름은 context_object_name 속성에서 지정해주면 된다. 


```