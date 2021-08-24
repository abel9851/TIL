# Room Detail 만들기(탬플릿)


[1. 사진 가져오기](#사진-가져오기)  
[2. 탬플릿 작성](#탬플릿-작성)  



 - ## 사진 가져오기

첫번째 사진은 가져오는 함수(큰 사진으로 쓸거)와
사진 4개를 가져오는 함수를 구현할 것이다.  


```python

# users/models.py

class Room(models.Model):

    # 첫번째 사진을 가져오는 함수
    def first_photo(self):
        photo, = self.photos.all()[:1]
        return photo.file.url

    # 나머지 4개의 사진을 가져오는 함수
    def get_next_four_photos(self):
        photos = self.photos.all()[1:5]

    """
    bed가 1개일 때는 1 bed, 그 이외에는 2 beds 처럼
    나와야하는제 그렇게 나오지 않음으로 함수를 만들어준다. 

    아니면 탬플릿에서 탬플릿필터(pluralize(복수로 만든다))를 사용해서
    탬플릿에서 복수를 만드는 방법도 있다.  

    def get_beds(self):
        if self.beds == 1:
            return "1 bed"
        else:
            return f"{self.bed} beds"
    """
```

- ## 탬플릿 작성

pluralize는 자동적으로 변수가 1보다 클 경우, 's'를 반환한다.

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
    


    <div class="w-1/3">
    </div>

</div>

{% endblock %}

```


```scss

@tailwind base;
@tailwind components;

.border-section {
    @apply border-b boder-gray-400 pb-8 mt-8
}


@tailwind utilities;


```