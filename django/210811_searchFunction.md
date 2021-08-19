# search 검색기능 만들기(필터 필요)

```python
#views.py

from django.shortcuts import render
from djnago_countries import countries
from . import models

def search(request):
    city = request.GET.get("city", "Anywhere") # url에서 요청받은 city의 값을 추출
    city = str.caplitalize(city) #데이터 베이스는 대문자로 시작하기 때문에 앞문자를 대문자로 바꿔준다.
    country = request.GET.get("country", "KR")
    room_type = int(request.GET.get("room_type", 0))
    room_types = models.RoomType.objects.all()
    """
    ordered_list = Room.objects.order_by("-created")
    searched_list = ordered_list.filter(city=city)
    """

    """
    #input checkbox로 check하고 리스트로 가져오고 싶을때(manytomanyfield라던가)
    facilities = request.GET.getlist("amenities")
    """


    form = {
        "city": city,
        "s_country":country,
        "s_room_type":room_type,
    } # form에서 온 것

    choices = {
        "countries":countries,
        "room_types":room_type,
    } # 데이터베이스에서 온 것


    filter_args = {}

    if city != "Anywhere"
        filter_args["city__startswith"] = city

    filter_args["country"] = country


    """
    #amenities와 facilities를 Q객체를 사용해서 필터링할 때

    rooms = models.Room.objects.filter(**filter_args)

    if len(s_amenities) >0:
        amenity_query = Q(amenities = s_amenities[0])
        for s_amenity in s_amenities[1:]:
            amenity_query &= Q(amenities = s_amenity)
            rooms = rooms.filter(amenity_query)

    if len(s_facilities) > 0:
        facility_query = Q(facility = s_facilities[0])
        for s_facility in s_facilities[1:]:
            facility_query &= Q(facility = s_facility)
            rooms = rooms.filter(facility_query)
    """


    """
    #Q객체를 사용하지 않고 필터링 조건을 축적하면서 필터링할 때
    rooms.objects.filter(amentities__pk__in=s_amenity)의 __in(queryset문서 참조)를 사용하면 조건이 다 담긴 쿼리셋이 리턴된다.

    rooms = Room.objects.filter(**filter_args)

    if len(s_amenities) > 0:
        for s_amenity in s_amenities:
            rooms = rooms.filter(amenities__pk=int(s_amenity))

    if len(s_facilities) > 0:
        for s_facility in s_facilities:
            rooms = rooms.filter(facilities__pk=int(s_facility))
    """

    rooms = models.Room.objects.filter(**filter_args)

    return render(request, "rooms/search.html", {**form, **choices, "rooms": rooms})



```

```python

urlpatterns = [
    path("search/", views.search, name="search")
 ]

```

```python
 # search.html
{% extends "base.html" %}

{% block page_title %}
search
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <h2>Search!</h2>
    <form method="get" action={% url "rooms:search" %}>
    <div>
        <label for="city">City</label>
        <input name="city" id="city" placeholder="Search by City">
    </div>

    <div>
        <label for="country">Country</label>
        <select id="country" name="country">
            {% for country in countries %}
                <option value="{{country.code}}" {% if  country.code == s_country %}selected{% endif %}>{{country.name}}</option> #value가 url로 간다. 데이터베이스에는 country는 name이 아닌, code로 저장되어있기 때문에 조회하려면 code로 해야한다.
            {% endfor %}
        </select>
    </div>

       <div>
        <label for="room_type">Room Type</label>
        <select id="room_type" name="room_type">
            <option value="0" {% if s_room_type == 0 %}selected{% endif %}>Any kind</option>
            {% for room_type in room_types %}
                <option value="{{room_type.pk}}" {% if room_type.pk == s_room_type %}selected{% endif %}>{{room_type.name}}</option>
            {% endfor %}
        </select>
    </div>

    <button>Search</button>
    </form>
    <h3>Results</h3>

    {% for room in rooms %}
        <h3>{{room.name}}</h3>
    {% endfor %}
{% endblock content %}

```

검색창은 어떤 페이지라도 보이기 때문에  
header에 있는게 좋다.

```python

# base.html

<header>
    {% include "partials/nav.html" %}
    {% block search-bar %}
    <form method="get" action={% url "rooms:search" %}>
        <input value={{city}} name="city" placeholder="Search by City">
    </form>
    {% endblock search-bar %}
</header>

```

위의 search.html에서 {% block search-bar %}로 base.html에 있는 form을 숨긴 이유는  
search.html에서 별도의 form을 가지고 싶어서다.  
왜냐하면 무슨 도시를 검색했는지 정보를 갖고 올 필요가 있으니까다.

form 안에서 submit이나 button을 사용할 수 있다.  
button이 form안에서 하나만 있을때, 이 버튼은  
submit처럼 사용된다.

필터를 할 때에는

- Field lookups
  필터하는 조건들이 여러개 있다. 장고 문서 참고

- forms API로 검색기능 만들기
  forms.py에서 form클래스를 만들면 위에서 했던 input, label,value, placeholder 등을  
  알아서 처리해준다.

  forms.py를 사용하는 이유는

  1. HTML을 엄청 빨리 만들어주기 때문이다.
  2. 데이터를 다 정리해서 주기 때문이다.  
     \*\*데이터를 정리한다는 건 이상한 무언가가 없게끔 확인해준다.

```python

#views.py

from . import forms

def search(request):
    form = forms.SearchForm(request.GET) #내가 search.html에서 검색한 조건들이 request인자로 왔기 때문에 GET(메서드가 GET이었다)으로 온 form을 반영.
                                         #내가 검색할 조건이 그대로 search.html의 form란에 저장된다.
    form = forms.SearchForm(request.GET)

    if form.is_valid()

    else:
        form = forms.SearchForm() # 보통 빈 form이 필요할때가 있어서 이렇게 해놓는다.

    return render(request, "rooms/search.html", {"form":form})


```

내가 form에 데이터를 주는 순간 그게 맞는건지 확인하려 한다.

`unbound form`은 우리가 갖고 있던 비어있는 form이다. 처음 시작한 form은 빈칸이고  
거기에 request.GET으로 값을주면 `bounded form`이 된다.  
`bounded form`은 데이터랑 연결되어 있는 상태이고 자동으로 데이터를 인증한다.  
우리가 해야할 일은 URL에 무언가가 있는지 체크해야한다.  
country가 URL에 있는지 확인하고 없을 경우, `request.GET`에 country가 비어있으므로  
SearchForm에는 비어있는 GET메시지를 주게 되므로 데이터가 맞는지 확인하고 안맞으면 에러를 낸다.(**bounded form이 데이터가 맞는지 확인하는 조건은 forms.py의 form에서 정의한 조건에 따른다.**  
**ex) charfield는 str이 와야하고 required라면, 무조건 입력해야한다.)**  
아래는 임시방편의 코드다.

```python

from . import forms

def search(request):

    country = request.GET.get("country")

    if country:
        form = forms.SearchForm(request.GET)
    else:
        form = forms.SerachForm()

    return render(request, "rooms/search.html", {"form":form})

```

```python

# 클래스 view 사용

class SearchView(View):

    """ SearchView Definition """

    def get(self, request):
        city = request.GET.get("city")

        form = forms.SearchForm(request.GET)

        if form.is_valid():  # 단순히 city로만 검색하면 is_valid는 false가 된다. countryfield에 아무것도 넣어져있지 않기 때문에 , 그 결과, else 구문을 수행한다.
            city = form.cleaned_data.get("city")
            country = form.cleaned_data.get("country")
            room_type = form.cleaned_data.get("room_type")
            price = form.cleaned_data.get("price")
            guests = form.cleaned_data.get("guests")
            bedrooms = form.cleaned_data.get("bedrooms")
            beds = form.cleaned_data.get("beds")
            baths = form.cleaned_data.get("baths")
            instant_book = form.cleaned_data.get("instant_book")
            superhost = form.cleaned_data.get("superhost")
            amenities = form.cleaned_data.get("amenities")
            facilities = form.cleaned_data.get("facilities")

            filter_args = {}  # filter는 검색한 조건을 기억하는 용도가 아니라, 검색한 결과의 오브젝트 리스트를 출력하기 위해 필터링 하는 것이다.
            if city != "Anywhere":
                filter_args["city__startswith"] = city

            filter_args["country"] = country

            if room_type is not None:
                filter_args["room_type"] = room_type

            if price is not None:
                filter_args["price__lte"] = price

            if guests is not None:
                filter_args["guests__gte"] = guests

            if bedrooms is not None:
                filter_args["bedrooms__gte"] = bedrooms

            if beds is not None:
                filter_args["beds__gte"] = beds

            if baths is not None:
                filter_args["baths__gte"] = baths

            if instant_book is True:
                filter_args["instant_book"] = True

            if superhost is True:
                filter_args["host__superhost"] = True

            for amenity in amenities:
                filter_args["amenities"] = amenity

            for facility in facilities:
                filter_args["facilities"] = facility

            qs = models.Room.objects.filter(**filter_args).order_by("-created")

            paginator = Paginator(qs, 10, orphans=5)

            page = request.GET.get("page", 1)

            rooms = paginator.get_page(page)

            return render(request, "rooms/search.html", {"form": form, "rooms": rooms})

        else:
            form = forms.SearchForm(initial={"city": city}) # 리스트 페이지에서 city로만 검색하면 form.is_valid()가 false(required 필드들이 입력되지 않았기 때문)이기 때문에
                                                            # city 부분에 city 값을 넣어서 리턴.

        return render(request, "rooms/search.html", {"form": form})


```

```python

#forms.py

from django import forms
from django_countries.fields import CountryField
from . import models

class SearchForm(forms.Form):
    city = forms.CharField(initial="Anywhere")
    country = CountryField().formfield()
    room_type = forms.ModelChoiceField(empty_label="Any kind", queryset=models.RoomType.objects.all()) # input의 select 역할을 한다.
    price = forms.IntegerField(required=False)
    guests = forms.IntegerField(required=False)
    bedrooms = forms.IntegerField(required=False)
    beds = forms.IntegerField(required=False)
    baths = forms.IntegerField(required=False)
    instant_book = forms.BooleanFiled(required=False)
    superhost = forms.BooleanFiled(required=False)
    amenities = forms.ModelMultipleChoiceField(required=False, queryset=models.Amenity.objects.all(), widget=forms.checkboxSelectMultiple)  # Amenity 모델을 select로 여러개 고를 수 있으나, Widget을 변경해서 Amenity객체 하나하나를 checkbox로 했다.
    Facilities = forms.ModelMultipleChoiceField(required=False, queryset=models.Facility.objects.all(), widget=forms.checkboxSelectMultiple)



```

장고 문서의 form fields API를 보면 required 이외의 옵션들도 볼 수 있다.  
form은 Widget으로 이루어져있다.
Form Field는 Widget을 render한 것이다.  
Widget은 HTML element다.  
**form field에서 Widget을 바꿀 수도 있다.**  
예를 들자면 CharField의 Widget은 Textinput인데 textarea로 바꿀 수 있다.  
ex) `city = forms.CharField(initial="Anywhere", widget=forms.Textarea)`

```python


# templates/rooms/search.html
<form method="get" action= {% url "rooms:search" %}>
    {{form.as_p}} # {{form}}으로도 사용가능하지만 as_p로하면 <p>가 적용된다.
    <button>Search</button>
</form>


<h3>Results</h3>

{% for room in rooms %}
    <h3>{{room.name}}</h3>
{% endfor %}

```

{{form}}의 자세한 점에 대해선 장고 문서를 보자.

- is_valid와 cleaned_data
  form을 유효성 검사를 해서 문제가 없으면 `is_valid()`는 True를 반환함과 동시에 cleaned_data에 값이 저장된다.
