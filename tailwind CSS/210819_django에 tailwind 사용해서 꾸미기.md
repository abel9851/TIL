# django 탬플릿에 tailwind를 사용해서 꾸며보기

- Tailwind CSS extention을 이용하여 리스트 페이지의 백그라운드 이미지 꾸며보기

  백그라운드 이미지의 높이를 커스터마이징 하려고 한다.  
  이때 `tailwind.config.js`에서 vh를 커스터마이징 할 수 있다.  
  (vh는 viewport height로, viewport는 현재보여지는 웹의 스크린을 뜻한다.)  
  추가를 하면 `npm run css`를 해줘야한다.

참조:(Tailwind CSS - height)[https://tailwindcss.com/docs/height]

```javascript
// tailwind.config.js

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // extend는 기존에 있는 것 + extend 부분이다. extend를 쓰지 않으면 덮어씌어진다.
      spacing: {
        "25vh": "25vh", // 이부분이  왼쪽 "25vh"가 클래스네임, 오른쪽 "25vh"가 value(css로 간다)다.
        "50vh": "50vh",
        "75vh": "75vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

```python

#templates/rooms/room_list.html


{% extends 'base.html' %}


{% block page_title %}
    Home
{% endblock page_title %}


{% block content %}


        <div class="rounded-3xl -mx-40 bg-gray-800 h-50vh mt-32 mb-24 bg-cover bg-center" style="background-image:url(https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)"></div>
        <div>
            {% for room in rooms %}
            <h3>
                <a href="{% url "rooms:detail" room.pk %}">
                    {{room.name}} / ${{room.price}}
                </a>
            </h3>
            {% endfor %}
        </div>
        <div>
            {% if page_obj.has_previous %}
                <a href="?page={{page_obj.previous_page_number}}">

                </a>
            {% endif %}

            <span>{{page_obj.number}} of {{page_obj.paginator.num_pages}}</span>

            {% if page_obj.has_next %}
                <a href="?page={{page_obj.next_page_number}}">
                </a>
            {% endif %}
        </div>
{% endblock content %}



```

- room 리스트페이지의 room객체(카드) 꾸미기

```python

# tempaltes/rooms/room_list.html

{% extends 'base.html' %}


{% block page_title %}
    Home
{% endblock page_title %}


{% block content %}



    <div class="container mx-auto pb-10">
        <div class="rounded-3xl -mx-40 bg-gray-800 h-50vh mt-32 mb-24 bg-cover bg-center" style="background-image:url(https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)"></div>
        <div>
            {% for room in rooms %}
            {% include 'mixins/room_card.html' with room=room %} # room_card.html 안에는 room객체가 변수로 필요하다.
                                                                 # include를 쓸때, with을 쓰면 변수를 안으로 보낼 수 있다.
            {% endfor %}
        </div>
        <div>
            {% if page_obj.has_previous %}
                <a href="?page={{page_obj.previous_page_number}}">

                </a>
            {% endif %}

            <span>{{page_obj.number}} of {{page_obj.paginator.num_pages}}</span>

            {% if page_obj.has_next %}
                <a href="?page={{page_obj.next_page_number}}">
                </a>
            {% endif %}
        </div>
    </div>
{% endblock content %}


```

```python


# templates/mixins/room_card.html
# 위의 room_list.html에서 Room 객체를 'room'변수로 받은 상태

<div>
    <a href={% url 'rooms:detail' room.pk %}>
                <span>{{room.city}}, {{room.country.name}}</span>

            <span>
            </span>
        </div>
        <span>{{room.name}}</span>
    </a>
</div>

```

room카드에서는 각각의 Room객체의 첫번째 사진을 가져와서 표시할 것이다.  
이를 위해 models.py에서 함수를 만들어주자.  
Room 모델에서 첫번째 사진을 가져오는 함수를 만들어주면,
template에서 Room 객체를 랜더링 할때,  
**Room 모델에서 정의한 함수를 template에서 Room객체를 통해 사용할 수 있다.**

```python

# modesl.py
class Room(core_models.TimeStampedModel):

    def first_photo(self):
        try:
            (photo,) = self.photos.all()[:1]
            return photo.file.url  # photo에 담긴 앨리먼트(사진객체)의 url을 리턴한다. file은 Photo모델의 ImageField다.
        except ValueError:
            return None

```

파이썬은 기능으로, 긴 배열이 있으면, 아래의 코드와 같이  
엘리머트를 여러 개의 변수로 나누어서 할당할 수 있다.  
이를 **unpacking values**라고 한다.

위의 `(photo, )`는, 배열중에 첫번째 엘리먼트를 photo라는 변수에 할당 하겠다는 의미이다.  
`(,)`을 하지 않으면, 단순히 배열전체가 photo변수에 할당된다.  
이렇게 하는 이유는 **`self.photos.all()[:1]`이 query set 리스트이기 때문에 리스트에서 앨리먼트를**  
**가져오기 위해서이다.**

```python

def first_photo(self):
    one, two, three, four = self.photos.all()[:1]


```

`first_photo()`를 room 카드 탬플릿에 반영한다.
<img src="{{room.first_photo}}" />를 사용하면 룸 객체의 첫번쨰 사진의 url을 가져오지만,  
실제 클론할 airbnb의 room카드는 모서리가 둥글어서 div를 사용해서 사진을 반영하도록 하자.

```python


# templates/mixins/room_card.html
# 위의 room_list.html에서 Room 객체를 'room'변수로 받은 상태

<div>
    <a href={% url 'rooms:detail' room.pk %}>
        <div class="w-full h-64 bg-cover bg-center" style="background-image:url({{room.first_photo}})"></div>
        # 사진의 폭은 full(width:100%)

    </a>
</div>

```

리스트 페이지에서도 크기를 조정해준다.  
`flex-wrap`은 영역에서 벗어나지 않고 여러행으로 나누어 표현하게 해준다.

````python

```python

# tempaltes/rooms/room_list.html

{% extends 'base.html' %}


{% block page_title %}
    Home
{% endblock page_title %}


{% block content %}



    <div class="container mx-auto pb-10">
        <div class="rounded-3xl -mx-40 bg-gray-800 h-50vh mt-32 mb-24 bg-cover bg-center" style="background-image:url(https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)"></div>
        <div class="flex flex-wrap">  #flex로 사진을 정렬시킨다.
            {% for room in rooms %}
            {% include 'mixins/room_card.html' with room=room %} # room_card.html 안에는 room객체가 변수로 필요하다.
                                                                 # include를 쓸때, with을 쓰면 변수를 안으로 보낼 수 있다.
            {% endfor %}
        </div>
        <div>
            {% if page_obj.has_previous %}
                <a href="?page={{page_obj.previous_page_number}}">

                </a>
            {% endif %}

            <span>{{page_obj.number}} of {{page_obj.paginator.num_pages}}</span>

            {% if page_obj.has_next %}
                <a href="?page={{page_obj.next_page_number}}">
                </a>
            {% endif %}
        </div>
    </div>
{% endblock content %}


````

아래처럼 room 카드에서 폭과 마진, 패딩을 준다.  
하지만 container가 작아보임으로 **네거티브 마진**으로 마진을 주자.  
네거티브 마진을 top / left 주면 블록,요소가 움직인다.  
bottom / right에 음수 마진을 주면, 요소를 오른쪽이나 아래로 이동하는 것이 아니라  
그 방향으로 끌어당겨진다.  
마진은 브라우저를 속이는 것이다.  
마진은 시작점과 관계가 있다. left와 right의 '-'는 시작점이 빨라진다. '+'로 주는 마진은 시작점이 늦어진다.  
마진 bottom과 right는 '-'의 경우 마진의 끝나는점이 더 빨리 끝나게된다.
즉 더 빨리 시작하고 끝나게, 더 늦게 시작하고 끝나게 브라우저를 속이는 것이다.

참조(네거티브 마진)[https://gold-dragon.tistory.com/41]
참조(네거티브 마진 - 유튜브)[https://www.youtube.com/watch?v=OVaKTdFe5Bk]

```python

# templates/mixins/room_card.html
# 위의 room_list.html에서 Room 객체를 'room'변수로 받은 상태

<div class="w-1/4 mb-10 px-2">
    <a href={% url 'rooms:detail' room.pk %}>
        <div class="w-full h-64 bg-cover bg-center rounded-lg" style="background-image:url({{room.first_photo}})"></div>
        # 사진의 폭은 full(width:100%)

    </a>
</div>

```

룸 리스트 페이지에서 룸 카드를 보여주는 부분에, 컨테이너에 네거티브 마진을 준다.

```python

#tempaltes/rooms/room_list.html

    <div class="container  mx-auto  pb-10">
        <div class="rounded-3xl -mx-40 bg-gray-800 h-50vh mt-32 mb-24 bg-cover bg-center" style="background-image:url(https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)"></div>
        <div class="flex flex-wrap -mx-40">  #flex로 사진을 정렬시킨다. -mx-64가 네거티브 마진이다.
            {% for room in rooms %}
            {% include 'mixins/room_card.html' with room=room %} # room_card.html 안에는 room객체가 변수로 필요하다.
                                                                 # include를 쓸때, with을 쓰면 변수를 안으로 보낼 수 있다.
            {% endfor %}
        </div>
        <div>
            {% if page_obj.has_previous %}
                <a href="?page={{page_obj.previous_page_number}}">

                </a>
            {% endif %}

            <span>{{page_obj.number}} of {{page_obj.paginator.num_pages}}</span>

            {% if page_obj.has_next %}
                <a href="?page={{page_obj.next_page_number}}">
                </a>
            {% endif %}
        </div>
    </div>
{% endblock content %}



```

- superhost 보여주기

별표모양을 추가하려면 font awesome을 base.html에 추가하고  
정해진 규칙으로 코드를 입력하면 된다.

```python

# templates/mixins/room_card.html
# 위의 room_list.html에서 Room 객체를 'room'변수로 받은 상태

<div class="w-1/4 mb-10 px-2 overflow-hidden">
    <a href={% url 'rooms:detail' room.pk %}>
        <div class="w-full h-64 bg-cover bg-center rounded-lg mb-10" style="background-image:url({{room.first_photo}})"></div>
        # 사진의 폭은 full(width:100%)
        <div class="flex justify-between mb-2 truncate">
            <div class="w-4/5 overflow-hidden flex">
                {% if room.host.superhost %}
                <span class="mr-2 uppercase font-medium text-xs border border-black text-black rounded px py-1">superhost</span>

                {% endif %}

                <span class="text-sm text-gray-600 block truncate">{{room.city}}, {{room.country.name}}</span>
            </div>
            <span class="text-sm">
                <i class="fas fa-star text-red-500 text-xsm mr-px"></i>  # font awesome을 base.html에 추가하고 사용가능하다.  아이콘 검색은 font awesome 웹사이트에서.
                                             # 아이콘으로 보이지만 텍스트에 가까움으로 컬러를 바꿀 수 있다.
                {{room.total_rating}}
            </span>
        </div>
        <span class="text-black w-full w-11/12 block truncate">{{room.name}}</span>

    </a>
</div>


```

- font awesome을 사용해서 아이콘들을 추가해보자  
  사용하려면 base.html에 link를 추가하자.

```python

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">  # font awesome 추가
        <link rel="stylesheet" href="{% static 'css/styles.css' %}">
        <title>
        {% block page_title %}{% endblock page_title %}
            | Nbnb</title>
    </head>

```


- Pagination 꾸미기

```python

{% extends 'base.html' %}


{% block page_title %}
    Home
{% endblock page_title %}
    

{% block content %}

    <div class="container mx-auto pb-10">
        <div class="rounded-3xl -mx-40 bg-gray-800 h-50vh mt-32 mb-24 bg-cover bg-center" style="background-image:url(https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)"></div>
        <div class="flex flex-wrap -mx-40 mb-10">
            {% for room in rooms %}
            {% include 'mixins/room_card.html' with room=room %}
            {% endfor %}
        </div>
        <div class="flex items-center justify-center mx-auto container">
            {% if page_obj.has_previous %}
                <a href="?page={{page_obj.previous_page_number}}" class="text-red-300">
                    <i class="fas fa-arrow-left fa-lg"></i>
                </a>
            {% endif %}

            <span class="mx-3 font-medium text-lg">{{page_obj.number}} of {{page_obj.paginator.num_pages}}</span>

            {% if page_obj.has_next %}
                <a href="?page={{page_obj.next_page_number}}" class="text-red-300">
                    <i class="fas fa-arrow-right fa-lg"></i>
                </a>
            {% endif %}
        </div>
    </div>
{% endblock content %}


```


- 