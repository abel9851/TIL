# reservation calendar 기능

[1. 탬플릿 작성(room_detail.html)](#탬플릿-작성roomdetailhtml)  
[2. grid 작성](#grid-작성)  
[3. 탬플릿 filter 만들기](#탬플-filter-만들기)  
[4. 탬플릿 태그 만들기](#탬플릿-태그-만들기)  
[5. cal.py 만들기](#cal.py-만들기)  
[6. model 작성(Room모델에 메소드 추가)](#model-작성Room모델에-메소드-추가)  
[7. model 작성(Reservation모델 수정)](#model-작성Reservation모델-수정)  
[8. url 작성](#url-작성)  
[9. view 작성](#view-작성)  
[10. managers.py 작성](#managers.py-작성)  
[11. 탬플릿작성(Reservation_detail.html)](#탬플릿작성Reservationdetailhtml)  
[12. view작성(Edit reservation)](#view작성Edit-reservation)  
[13. reservation 모델에 is_finished 함수 수정](#reservation-모델에-isfinished-함수-수정)  




캘린더 기능은 파이썬의 캘린더 라이브러리를 이용해서 구현 할 것이다.



- ## 탬플릿 작성(room_detail.html)


TailwindCSS에서는 그리드(grid)가 없음으로 직접 만들어주자  

참조: [tailwind CSS - block](https://tailwindcss.com/docs/display)

```html

<!-- rooms/room_detail.html -->

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
            <div style="background-image:url({{photo.file.url}})" class="w-1/2 h-auto bg-cover bg-center border-gray-500 border"></div>
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
                {% include 'mixins/user_avatar.html' with user=room.host %}
                <span class="mt-2 text-gray-600">{{room.host.first_name}}</span>
            </a>
        </div>
        <div class="flex border-section">
            <span class="mr-5 font-light">{{room.room_type}}</span>
            <span class="mr-5 font-light">{{room.beds}} bed{{room.beds|pluralize}}</span>
            <span class="mr-5 font-light">{{room.bedrooms}} bedroom{{room.bedrooms|pluralize}}</span>
            <span class="mr-5 font-light">{{room.baths}} bath{{room.baths|pluralize}}</span>
            <span class="mr-5 font-light">{{room.guests}} guest{{room.guests|pluralize}}</span>
        </div>
        <p class="border-section">{{room.description}}</p>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">Amenities</h4>
            
            {% for a in room.amenities.all %}
                <li class="mb-2">{{a}}</li>
            {% endfor %}
        </div>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">Facilities</h4>
            {% for f in room.facilities.all %}
                <li class="mb-2">{{f}}</li>
            {% endfor %}
        </div>
        <div class="border-section">
            <h4 class="font-medium text-lg mb-5">House Rules</h4>
            {% for h in room.house_rules.all %}
                <li class="mb-2">{{h}}</li>
            {% endfor %}
        </div>
        <div class="mt-10">
            <h4 class="font-medium text-2xl mb-5">Reviews</h4>
            <div class="flex items-center">
                <div>
                    <i class="fas fa-star text-red-400"></i>
                    <span class="font-bold text-xl">{{room.total_rating}}</span>
                </div>
                <div class="h-4 w-px bg-gray-400 mx-5"></div>
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
                                {% include 'mixins/user_avatar.html' with user=review.user h_and_w='w-10 h-10' text='text-xl' %}
                            </div>
                            <div class="flex flex-col ml-5">
                                <div class="font-medium">
                                    <div class="justify-between text-red-500">
                                        <a href="{% url 'reviews:update' room.pk review.pk %}">Update</a>
                                        <a href="{% url 'reviews:delete' room.pk review.pk %}">Delete</a>
                                    </div>
                                    {{review.user.first_name}}</div>
                                <span class="text-sm text-gray-500">{{review.created|date:'F Y'}}</span>
                            </div>
                        </div>
                        <p>{{review.review}}</p>
                    </div>
                {% endfor %}
                    
            </div>
        </div>
    </div>
    <div class='w-1/3'>
        {% if room.host == user %}
            <a href="{% url 'rooms:edit' room.pk %}" class="btn-link block mb-5 bg-green-500">Edit Room</a>
            <a href="{% url 'rooms:delete' room.pk %}" class="btn-link block" onclick="return confirm('Do you want to delete this room?')">Delete Room</a>
        {% else %}
        <!-- 캘린더 작성 -->
        <!-- block은 그 앨리먼트를 block-level element로 취급하게 한다 -->
            {% if not request.session.is_hosting %}
                {% for calendar in room.get_calendars %}
                <div class="mb-20">
                    <span class="text-center font-semibold text-lg block mb-8">{{calendar.get_month}} / {{calendar.year}}</span>
                    <!-- TailwindCSS에는 grid가 없음으로 직접 SCSS에서 만들어주자 -->
                    <div class="cal-grid font-medium mb-4">
                    {% for day in calendar.day_names %}
                        <span>{{day}}</span>
                    {% endfor %}
                    </div>
                    <div class="cal-grid">
                    {% for day in calendar.get_days %}
                    <!-- 커스텀 태그인 is_booked에게 room, day객체를 인자로 보내주고 return된 값은 is_booked_bool이라는 변수에 담긴다-->
                        <% is_booked room day as is_booked_bool %>
                            {% if day.number != 0 %}
                                {%if day.past %}
                                <span class="rounded bg-gray-200 w-full text-center p-1 text-gray-300">
                                    {{day}}
                                </span>
                                <!-- is_booked_bool가 True라면  그 day에는 가로줄이 그어진다. -->
                                {% elif is_booked_bool %}
                                <span class="rounded bg-gray-200 w-full text-center p-1 text-gray-300 line-through">
                                    {{day}}
                                </span>
                                {% else %}
                                <!-- 조건문으로 인해 아래의 있는 {{day}}는 지난 날짜도 아니고 , 예약이 들어선 날짜도 아닌 -->
                                <!-- 예약 가능 날짜의 인스턴스다 -->
                                <!-- Reservation객체를 생성하기 위해 Room모델에 만들었던 캘리더를 위에서 호출해서-->
                                <!-- 그 캘린더 함수를 호출하면 Day객체가 나오므로 그 객체의 속성인 그 캘린터 객체에서 나온 Day객체의 날짜 year, month, number를 인자로 넣어준다-->
                                <a href="{% url reservations:create room.pk day.year day.month day.number %}" class="bg-gray-200 w-full text-center rounded text-gray-700 p-1 hover:bg-teal-400 
                                hover:font-medium
                                hover:text-white cursor-pointer">
                                    {{day}}
                                </a>
                                {% endif %}
                            {% else %}
                            <span></span>
                            {% endif %}
                    </div>
                </div>
                {% endfor %}
            {% endif %}
        
        {% endif %}
    </div>
</div>

```

- ## grid 작성

만들었으면 `npm run css`로 적용해주자

```scss

.cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    justify-items: center;
}

```


- ## 탬플릿 필터 만들기

rooms 폴더에 templatetags폴더를 만든다.  
**반드시 폴더이름은 templatetags여야만 한다.**
그다음 `__init__.py`파일도 만들어주자


함수이름이 곧 필터 이름이 된다.

```python

# rooms/templatetags/sexy_captials.py


from django import template

register = template.Library()

#filter로 사용하고 싶을때는 인스턴스 register의 데코레이터인 filter를 사용하면 된다.
@register.filter
def sexy_capitals(value):
    #문자열의 제일 첫번째 문자가 대문자가 된다.
    return value.capitalize()

# 매개변수 value에 오는 것은 {{something|sexy_capitals}}를 했을때
# someting이 value의 인자로 오게 된다.



```


```html

<!-- templates/room_detail -->

<!-- sexy_captials.py을 로드한다 -->
{% load sexy_capitals %}

```


- ## 탬플릿 태그 만들기


```python


# rooms/templatetags/is_booked.py
import datetime
from django import template
from reservations import models as reservation_models

register = template.Library()

# register.tag도 있긴한데
# simple_tag가 func, take_context, name을 가지고 있다.
# @register.simple_tag(takes_context=True)를 하면 장고가 전달해주느 user나 다른 context를 받을 수 있다.
# filter는 value 즉, 인자를 하나만 받을 수 있었지만
# tag는 여러개의 인자를 받을 수 있다.
@register.simple_tag
def is_booked(room, day):
    if day.number == 0:
        return 
    try:
        # reservation__room는 and연산으로 
        # BookedDay 객체가 Reservation과 foreignkey관계인데
        # 그 Reservation 객체의 room(이 역시 foreignkey)이
        # 인자로 보낸 Room이랑 foreignkey관계인 Reservation이랑, Foreignkey 관계인 BookedDay객체를 가져온다.
        date = datetime.datetime(year=day.year, month=day.month, day=day.number)
        reservation_models.BookedDay.objects.get(day=date, reservation__room=room)
        return True
    except reservation_models.BookedDay.DoesNotExist:
        return False
```

- ## cal.py 만들기

calendar를 만들 생각인데 `calendar.py`라고 하면 기존에 있는  
파이썬 스탠다드 라이브러리 중 하나인 `calendar`를 오버라이딩 함으로  
이름을 `cal.py`로 한다.  

참조: [파이썬 문서 - 캘린더](https://docs.python.org/3/library/calendar.html?highlight=calendar#module-calendar)

```python

# cal.py

import calendar
from django.utils import timezone

# calendar 라이브러리를 사용하지만,
# 직접 구체적으로 캘린더를 만들어보자


class Day:
    def __init__(self, number, month, year, past):
        self.number = number
        self.month = month
        self.year = year
        self.past = past
        

    def __str__(self):
        return str(self.number)



# calendar.Calendar를 사용한 이유는 
# monthdays2calendar라는 것을 써야하기 때문이다.
class Calender(calendar.Calendar):

    def __init__(self, year, month):
        #calendar.Calendar를 사용하려면 
        #firstweekday를 설정해줘야한다.
        #달력을 봤을때 그 달의 시작요일을 말해줘야한다.
        #달력구조가 일요일부터 시작한다면 일요일에 대응되는 6을,
        #월요일부터 시작한다면 0을 넣으면 된다.
        super().__init__(firstweekday=6)
        self.year = year
        self.month = month
        self.day_names = ("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",)
        self.months = (
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        )


    def get_month(self):
        # 인덱싱은 0부터 시작하기 때문에 month는 1~12이지만
        # 인덱싱은 0~11로 대응된다. 그러므로 0은 1월이 되기 때문에
        # -1을 해준다.
        return self.months[self.month - 1]

    def get_days(self):
        # calendar.Calendar를 상속하고 있기 때문에
        # self를 써줘야한다.
        
        weeks = self.monthdays2calendar(self.year, self.month)
        days = []
        for week in weeks:
            # 튜플에서 값이 2개일때, for문에서는 변수를 2개 써줘서 각각 할당해줄 수 있다.
            # 언패킹을 해준 것이다.
            # '_'의 뜻은 '_'에 들어가는 변수는 신경쓰지 않는다.
            # 이건 무시된다 라는 의미이다.
            for day, _ in week:
                now = timezone.now()
                today = now.day
                month = now.month
                past = False
                if month == self.month:
                    if day <= today:
                        past = True
                new_day = Day(number=day, month=self.month, year=self.year, past=past)
                days.append(new_day)
        return days

```




```scss
```

- ## model 작성(Room모델에 메소드 추가)

참조: [if 조건문 표현식](https://wikidocs.net/20)

```python

# rooms/models.py

from cal import Calender
from django.utils import timezone

class Room(core_models.TimeStampedModel):

    def get_calendars(self):
        now = timezone.now
        this_year = now.year
        this_month = now.month
        this_month_cal = Calendar(this_year, this_month)
        next_month_cal = Calendar(
            this_year if this_month != 12 else this_year + 1, 
            this_month + 1 if this_month != 12 else 1,
            )
        # 리턴은 리스트도 리턴할 수 있다.
        # this_month_cal와 next_month_cal는 인스턴스다.
        # 두개의 인스턴스를 리턴하니까 탬플릿에서
        # {% for calendar in room.get_calendars %}
        #  {{ calendar.get_month }}로 로직을 짜면
        #   November December 이런식으로 2개의 달이 html에 랜더링된다.
        return [this_month_cal, next_month_cal]

```

- ## model 작성(Reservation모델 수정)

Reservation모델을 보면, 15일에 체크인(데이트필드), 21일에 체크아웃(데이트필드)을 하면  
시스템적으로 그 사이에 있는 16~20일을 예약 못하게 블록을 할 수 가 없다.   
왜냐하면 15일에 체크인이 되어있다면 시스템 적으로 체크할 수 있지만  
16~20일은 어떤 필드도 없기 떄문에 체크시도조차 할 수 없기 때문이다.
이를 가능하게 만들기 위해 모델을 수정한다.  

이를 하기 위해 Reservations 모델 이외에 Bookday라는 모델을 만들 것이다.  
Reservation 모델에서 체크인과 체크아웃을 체크하고 객체를 만들면  
이와 동시에 체크인과 체크아웃 사이에 있는 날짜들을 Bookday 모델로 객체를 만들고  
그 객체들을 이용해서 예약을 못하게 하는 시스템을 만든다.  

참조:  
[verbose_name에 대해](https://hyun-am-coding.tistory.com/entry/modelspy-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0)  
[filter 조건에 대해](https://brownbears.tistory.com/63)

```python


# Reservations/models.py

import datetime
from django.db import models
from django.utils import timezone
from core import models as core_models


class BookedDay(core_models.TimeStampedModel):
    day = models.DateField()
    reservation = moodels.ForeignKey("Reservation", on_delete=models.CASCADE)

    class Meta:
        #  admin 패널에서 보여질 이름이다.
        verbose_name = "Booked Day"
        verbose_nmae_plural = "Booked Days"

    def __str__(self):
        return str(self.day)


class Reservation(core_models.TimeStampedModel):

    """ Reservation Model Definition """

    STATUS_PENDING = "pending"
    STATUS_CONFIRMED = "confirmed"
    STATUS_CANCELED = "canceled"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_CANCELED, "Canceled"),
    )

    status = models.CharField(
        max_length=12, choices=STATUS_CHOICES, default=STATUS_PENDING
    )
    check_in = models.DateField()
    check_out = models.DateField()
    guest = models.ForeignKey(
        "users.User", related_name="reservations", on_delete=models.CASCADE
    )
    room = models.ForeignKey(
        "rooms.Room", related_name="reservations", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.room} - {self.check_in}"

    def in_progress(self):
        now = timezone.now().date()
        return now >= self.check_in and now <= self.check_out

    in_progress.boolean = True

    def is_finished(self):
        now = timezone.now().date()
        is_finished = now > self.check_out
        if is_finished:
            BookedDay.objects.filter(reservation=self).delete()
        return is_finished

    is_finished.boolean = True

    # save 메소드를 인터셉트해서 체크인, 체크아웃을 등록할때
    # BookedDay모델 객체로 생성하도록 로직을 만든다.
    def save(self, *args, **kwargs):
        # 새로운 Reservation을 의미
        if self.pk is None:
            start = self.check_in
            end = self.check_out
            difference = end - start
            #__range는 get과 filter의 조건이다.
            # day__range의 exists 함수로 true 혹은 false가 반환된다.
            # 조건에 해당하면, 그 조건에 해당하는 객체들의 쿼리셋 리스트를 반환한다.

            existing_booked_day = BookedDay.objects.filter(day__range=(start, end)).exists()

            if not existing_booked_day:
                # Reservation 객체를 저장한다.
                # 먼저 저장하는 이유는 BookedDay 객체는
                # ForeignKey로 Reservation객체를 가지고 있기 때문이다.
                # 만약에 Reservation객체를 먼저 저장하지 않는다면
                # 에러가 발생한다.

                #timedelta는 날짜 즉, 1이면 1일을 나타낸다
                super().save(*args, **kwargs)
                for i in range(dfference.days + 1):
                    day = start + datetime.timedelta(days=i)
                    BookedDay.objects.create(day=day, reservation=self)
                return 
        return super().save(*args, **kwargs)



```


```python

# reservations/admin.py


@admin.register(models.Resrvation)
class ReservationAdmin(admin.ModelAdmin):

    """Reservation Admin Definition"""

    list_display = (
        "room",
        "status",
        "check_in",
        "check_out",
        "guest",
        "in_progress",
        "is_finished",
    )

    list_filter = ("status",)


@admin.register(models.BookedDay)
class BookedDayAdmin(admin.ModelAdmin):

    """ BookedDay Admin Definition """

    list_display = (
        "day",
        "reservation",
    )


```

- ## url 작성

```python

from django.url import path
from . import views

appname= "reservations"

urlpatterns = [
    path("create/<int:room_pk>/<int:year>-<int:month>-<int:day>", views., name="create"),
    path("<int:pk>", views.ReservationDetailView.as_views(), name="detail"),
    # verb는 cancel, confrim 같은 단어다.
    path("<int:pk>/<str:verb>", views.edit_reservation, name="edit"),
]

```


- ## view 작성

```python

import datetime
from django.http import 
from django.shortcut import redirect, reverse, render
from django.views.generic import FormView
from djnago.contrib import messages
from users import mixins as user_mixins
from rooms import models as room_models
from reviews import forms as review_forms
from . import models


# BookedDay 객체가 있는 경우, 즉 예약이 되어 있는 경우
# 예약이 안된다는 에러를 일으킨다.
class CreateError(Exception):
    pass


def create(request, room, year, month, day):
    try:
        date_obj = datetime.datetime(year, month, day)
        room = room_models.Room.objects.get(pk=room)
        models.BookedDay.objects.get(day=date_obj, resevation__room=room)
        # 위의 코드에서 BookedDay의 객체가 얻어지면
        # 바로 CreateError를 일으키도록 되어 있다.
        raise CreateError()
    # 예외처리 조건은 여러개 넣을 수 있다/
    except (room_models.Room.DoesNotExist, CreatError):
        messages.error(request, "Can't Reserve That Room")
        return redirect(revese("core:home")) 
    # 예외처리는 반드시 에러처리만 하는데 써먹는 것이 아니다
    # 아래와 같이 BookedDay객체가 없으면 
    except models.BookedDayDoesNotExist:
        reservation = models.Reservation.objects.create(
            guest = request.user,
            room = room,
            # check_in과 check_out은 데이트필드로, 시간까지 나오진 않는다.
            check_in = date_obj, 
            # 장고와 html만 사용함으로 check_out은 1일 만 하도록 설정했다
            check_out = date_obj + datetime_timedelta(days=1)
        )
        # 임시적으로 Reservation 객체를 만들었다면
        # 그 객체의 디테일로 리다이렉트해서
        # 정확한 체크아웃 날짜를 비롯해서 BookedDay객체가 생성되도록 한다.
        return redirect(reverse("reservations:detail", kwargs={'pk': resevation.pk}))


# DetailView가 아니라 그냥 View로 한 이유는
# 직접 get method를 컨트롤 하고 싶어서다.
class ReservationDetailView(View):

    # pk는 Reservation의 pk다
    def get(self, *args, **kwargs):

        pk = kwargs.get("pk")

        reservaton = models.Reservation.objects.get_or_none(pk)

        if not reservation or (reservation.guest != self.request.user and reservation.room.host != self.reqeust.user):
            raise Http404()
        
        form = review_forms.CreateReviewForm()

        return render(self.request, "reservations/detail.html", {'reservation' : reservation, 'form': form})

```


- ## managers.py 작성


일일이 except 부분에 `models.Reservation.DoesNotExist`하는 것은 번거로우니까  
managers.py를 사용해보자  

objects.get, objects.filter, objects.all 등, objects로 하는 것들은  
모두 manager로 하는 것이다.   
그리고 이것들은 대체할 수 있다.  
managers.py에서 할 작업이 바로 그것이다.  


models.Resevation.DoesNotExist

```python

# reservations/managers.py

from django.db import models


class CustomReservationManager(models.Manager):


    def get_or_none(self, **kwargs):
        try:
            return self.get(**kwargs)

        except self.model.DoesNotExist:
            return None



"""
# 단지 아무 내용도 쓰지않고 pass를 하고 
# 모델에서 objects 변수에 CustomReservationManager를 상속하면
# CustomReservationManager가 models.Manager를 상속하고 있음으로 
# Rservation.objects.get 등의 매니저 기능은 아무것도 바뀌지 않는다. 

class CustomReservationManager(models.Manager):
    pass
"""

```

```python

# Reservations/models.py

from . import managers


class Reservation(Core_models.TimeStampedModel):
    """ Reservation Model definition """
    
    # Reservation 모델에서 
    objects = managers.CustomReservationManager()




```




- ## 탬플릿작성(Reservation_detail.html)


`get_필드명_display`는, 탬플릿에서 `reservation.status`를 하면  
status의 value값이 탬플릿에 보이게 되는데 `get_status_play`를 하면  
그 필드의 표시용 문자가 나온다.


참조: [get_필드명_display에 대해 - 일본어](https://qiita.com/kk-ster/items/66fbbb38035e14c1766d)


```html

<!-- templates/reservations/detail.html -->

{% extends "base.html" %}

{% block page_title %}
    Reservation {{reservation.check_in}}
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
     
    <div class="container mx-auto my-10 flex flex-col">

        <div class="border-t border-l border-r bg-cover bg-center h-56 rounded-t-lg" style="background-image: url({{reservation.room.first_photo}});"></div>

        <div class="flex flex-col items-start border-l border-r border-t border-b">
            <div class="font-medium border-b py-8 px-5 w-full">
                {{reservation.check_in}} - {{reservation.check_out}} 
                <!-- 
                    원래는 reservation.status인데 
                    reservation.get_status.display로 바꿨다.
                    장고에서 이미 정해져있는 것으로, Choice를 탬플릿에 표시하게 해준다.
                -->

                <!--  reservation.status에 따라 텍스트 색깔이 바뀐다. -->
                <span class="ml-5 {% if reservation.status == 'pending' %} text-yellow-600 {% elif reservation.status == 'canceled' %} text-red-600 {% else %} text-teal-600 {% endif %} ">{{reservation.get_status_display}}</span>
            </div>
    
            <span class="text-2xl border-b p-5 mt-2 w-full">
                {{reservation.room.name}}
            </span>
    
            <div class="flex p-5 border-b w-full">
                <div class="flex flex-col items-center">
                    {% include "mixins/user_avatar.html" with user=reservation.room.host %}
                    <span class="mt-2 text-gray-500">{{reservation.room.host.first_name}}</span>
                </div>
                <div class="ml-5 flex flex-col">
                    <span class="font-medium mb-px">Contact your Airbnb Host</span>
                    <a href="#" class="font-medium text-teal-500">Send a Message</a>
                </div>
            </div>

            <div class="py-10 px-5">
            {% if reservation.status != 'canceled' %}
                {% if resrvation.status == 'confirmed' and reservation.is_finished %}
                <span class="font-medium text-2xl text-center w-full block mb-5">Write your review</span>
                 <form action="" method="POST" class="w-1/2 mx-auto">
                     {% csrf_token %}
                     <!-- 
                         날짜가 Reservation 객체를 가지고, 
                         그 Reservation객체의 체크아웃을 넘은 경우, Review를 작성 가능하다.
                         작성이 끝나면 POST 요청으로 내용이 간다.
                         -->
                     {{form}}
                     <button class="btn-link mt-10">Submit Review</button>
                 </form>
                {% else %}
                    {% if reservation.status == 'pending' %}
                    <a href="{% url 'reservations:edit' resrvation.pk 'cancel' %}" class="btn-link block px-5">Cancel Reservation</a>
                        {% if user.room.host == user %}
                        <a href="{% url 'reservations:edit' resrvation.pk 'confirm' %}" class="btn-link block px-3 mb-5">Confirm Reservation</a>
                        {% endif %}
                    {% endif %}
                {% endif %}
            {% endif %}
    


                {% endif %}
            </div>
        </div>


    </div>
{% endblock content %}


```

- ## view작성(Edit reservation)


``` python


# rservations/views.py

from django.http import Http404

def edit_reservation(request, pk, verb):
    reservation = models.Reservation.objects.get_or_none(pk)

    if not resrvation or (
        reservation.guest != request.user and reservation.room.host != self.request.user
     ):
        raise Http404()

    if verb == "confirm":
        reservation.status = models.Reservation.STATUS_CONFIRMED

    elif verb == "cancel":
        reservation.status = modesl.Reservation.STATUS.CANCELED
        models.BookedDay.objects.filter(resrvation=reservation).delete()

    reservation.save()
    messages.success(request, "Reservation Updated")
    return redirect(reverse("reservations:detail", kwargs={"pk": reservation.pk}))
```


- ## reservation 모델에 is_finished 함수 수정

Reservation의 체크아웃하는 날이 되었을때,  
자동으로 BookedDay 객체를 지우는 로직을 추가한다.


```python

class Reservation(core_models.TimeStampedModel):
    
        def is_finished(self):
        now = timezone.now().date()
        is_finished = now > self.check_out
        if is_finished:
            BookedDay.objects.filter(reservation=self).delete()
        return is_finished


```

