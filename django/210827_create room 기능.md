# Create Room 기능  

[1. 탬플릿에 링크 추가](#탬플릿에-링크-추가)  
[2. view 작성](#view-작성)  
[3. form 작성(forms.py)](#form-작성formspy)  
[4. room_create.html 작성](#roomcreatehtml-작성)  
[5. url 작성](#url-작성)  




- ## 탬플릿에 링크 추가

```html

<!-- templates/partials/nav.html -->

<ul class="flex items-center text-sm font-semibold h-full">
    {% if user.is_authenticated %}
    <li class="nav_link">
        <a href="{% url 'users:switch-hosting' %}">
        <!-- session에 is_hosting이 있는지 확인 -->
        <!-- {%if is_hosting in request.session %}를 사용해도 되는데, 어째서인지 몰라도 Start hosting이 표시가 안된다. -->
        {%if request.sesstion.is_hosting %}
            Stop hosting
        {% else %}
            Start hosting
        {% endif %}
        </a>
    </li>
        {% if request.session.is_hosting %}
        <!-- session에 is_hosting이 true라면 -->
        <li class="nav_link"><a href="{% url 'rooms:create' %}">Create Room</a></li>
        {% endif %}
    <li class="nav_link"><a href="{{user.get_absolute_url}}">Profile</a></li>
    <li class="nav_link"><a href="{% url "users:logout" %}">Log out</a></li>
    {% else %}
    <li class="nav_link"><a href="{% url "users:login" %}">Login</a></li>
    <li class="nav_link"><a href="{% url "users:signup" %}">Sign up</a></li>
    {% endif %}
            

</ul>

```

- ## view 작성


`CreateView`를 상속받아서 할 수도 있겠지만  
room의 host 설정 같은 것은 save를 intercept해서 하게 됨으로  

**`CreateRoomView`로 Room을 생성할때 ValueError가 날 것이다.**  
이유는 Room 모델에서 정의한 `first_photo()`가 Room객체가   생성될때 호출되는데 이 메소드는 Room와 Foreignkey관계인  
Photo 객체에서 첫번째 사진을 리턴하도록 되어있기 때문이다.  
하지만 Room객체를 생성할때 photo를 지정하지 않았음으로  
에러가 난다. 이때는 `try, except`구문으로 예외처리를 해주자.


```python

    # 변수 하나에 할당하고 그 변수 안에 있는 메소드를 리턴하는데
    # 리턴되는 것이 아예 없으므로 ValueError를 일으킨다.
    def first_photo(self):
        try:
            (photo,) = self.photos.all()[:1]
            return photo.file.url
        except ValueError:
            return None

    # 여기에서는 빈 쿼리셋을 반환한다.
    def get_next_four_photos(self):
        photos = self.photos.all()[1:5]
        return photos

```

form에서 `save(commit=False)`를 사용하고,  
그 form의 모델에  ManyToManyField가 정의되어 있다면,  
**`save()`를 통해서 데이터베이스에 저장한 후, `save_m2m()`을 호출해서**  
**ManyToManyField를 저장해주는 과정을 반드시 해야한다. 안하면 ManyToManyField는**  
**저장되지 않는다.**  


```python

# rooms/views.py

from users import mixins as user_mixins
from django.views.generic import FormView
from . import forms

class CreateRoomView(user_mixins.LoggedInOnlyView, FormView):
    
    form_class= forms.CreateRoomForm
    template_name= "rooms/create_room.html"

    def form_valid(self, form):
        # form.save()를 호출하면 forms.py에서 정의했던대로
        # Room 객체가 room 변수에 담기도록 되어있다.
        room = form.save()
        user = self.request.user
        room.host = user
        room.save()
        # room.save()로 데이터베이스에 저장한 후에
        # save_m2m()을 통해서
        # ManyToManyField의 요소들을
        # 저장해주어야 완전히 끝난다.
        # commit=False 옵션을 한번이라도 사용했다면 반드시 해야한다.
        form.save_m2m()
        messages.success(self.request, "Room Created")
        return redirect(reverse("rooms:detail", kwargs={'pk': room.pk}))

```

- ## form 작성(forms.py)


```python

# rooms/forms.py

from . import models

class CreateRoomForm(forms.ModelForm):

    class Meta:
        model = models.Room
        fields = (
            "name"
            "descripton",
            "county",
            "city"
            "price"
            "address,
            "guest",
            "beds"
            "bedroos",
            "baths"
            "check_in"
            "check_out"
            "instant_bok",
            "room_type"
            "amenities"
            "facilities"
            "house_rules",
        )


    def save(self, *args, **kwargs):
        room = super().save(commit=False)

        # Room 객체를  form 밖으로 보낸다.
        return room
        

```

- ## room_create.html 작성


```html


{% extends "base.html" %}

{% block page_title %}
    Create Room
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            {% include 'mixins/room/room_form.html' with form=form cta="Create room" %}


        </div>
{% endblock content %}

```

- ## url 작성


```python

from django.url import path
from . import views

appname="rooms"

urlpatterns = [
    path("create/", views.CreateRoomView.as_views(), name="create"),
]


```