# Room Photo Edit 기능 만들기

[1. room_edit.html에 Edit photos 링크 작성](#roomedithtml에-Edit-photos-링크-작성)  
[2. urls.py 작성](#urlspy-작성룸에-속한-사진들의-리스트-페이지)  
[3. views.py 작성](#viewspy-작성룸에-속한-사진들의-리스트-페이지-View사용)  
[4. views.py 작성(룸에 속한 사진들의 리스트 페이지, DetailView사용)](#viewspy-작성룸에-속한-사진들의-리스트-페이지-DetailView사용)  
[5. room_photos.html 탬플릿 작성](#roomphotoshtml-탬플릿-작성)  
[6. Delete photo 기능](#Delete-photo-기능)  
- [6-1. view 작성(delete 기능)](#view-작성delete-기능)  
- [6-2. url 작성(delete 기능)](#url-작성delete-기능)  


[7. Edit photo 기능](#Edit-photo-기능)  
- [7-1. template 작성(edit 기능)](#template-작성edit-기능)  
- [7-2. view 작성(edit 기능)](#view-작성edit-기능)  
- [7-3. url 작성(edit 기능)](#url-작성edit-기능)  

[8. Upload photo 기능](#Upload-photo-기능)  
- [8-1. template 작성(Upload기능)](#template-작성Upload기능)  
- [8-2. view 작성(Upload기능)](#view-작성Upload기능)  
- [8-3. url 작성(Upload기능)](#url-작성Upload기능)  
- [8-4. form 작성(Upload기능)](#form-작성Upload기능)





- ## room_edit.html에 Edit photos 링크 작성


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

            {% include 'mixins/room/room_form.html' with form=form cta="Update Room" %}
        <div class="mt-5">
            <!-- Edit photos라고 되있지만 누르면 일단 사진들이 있는 리스트페이지로 이동된다. -->
            <!-- EditRoomView(UpdateView)는 UpdateView라서 room객체(변수 room), form객체(변수 form) 두개 다 반환한다 -->
            <a href="{% url rooms:photo-edit  room.pk %}" class="text-teal-500 font-medium">

                Edit photos
            </a>
            
        </div>

</div>


{% endblock content %}

```

- ## urls.py 작성(룸에 속한 사진들의 리스트 페이지)


```python

# rooms/urls.py

from django.urls import path
from . import views

appname="rooms"

urlpatterns = [
    # 맨 앞에 있는 pk는 photo랑 foreignkey인, room 객체의 id
    # 각각의 Room에 속한 photo 객체들을 불러와야하기 때문에 Room객체의 id가 필요하다. 

    path("<int:pk>/photos/", views.RoomPhotosView.as_view(), name="photos"),
]


```


- ## views.py 작성(룸에 속한 사진들의 리스트 페이지, View사용)


단순히 `View`를 사용하면 GET 리퀘스트가 오면  그 Room의  
Photo들을 all()로 호출하여, 탬플릿에서 for문으로 보여주면 될 것이다.  


```python

# rooms/views.py

# View 클래스는 get, post 메소드를 가지고 있다. 
class RoomPhotosView(user_mixins.LoggedInOnlyView, View):

    # urls.py에서 as_view가 호출되면 RoomPhotosView의 인스턴스가 생성되고
    # def get()의 경우, url이나 기타 등등으로 요청을 받으면
    # 매개변수 request, args, kwargs로 요청된 정보들이 들어간다. 
    # 맵핑된 url은 <int:pk>/photos/ 이므로, 이거 이외의 정보들은
    # args, kwargs에 들어갈 것 같다.
    # 이때 주의할 것은 Room을 모델에서 가져와서, 그 room.photos.a;;() 처럼
    # 그 Room객체를 먼저 불러서 그 Room에 속한 사진을 가져오는게 좋다.

    def get(self, request, *args, **kwargs):


```

- ## views.py 작성(룸에 속한 사진들의 리스트 페이지, DetailView사용)  


사진을 보여주는 페이지는 리스트니까 ListView를 사용해야할 것이라도 생각할 수 있지만  
그렇게 되면 각각의 Room객체에 속한 사진을 가지고 오는 것이 아니라  
Photo 모델의 객체들의 전체 사진을 가지고 오게 됨으로  
각각의 Room 객체에 속한 사진을 가져오는 로직을 생각해야한다.  

생각해보면 각각의 Room이라는 것은 `Room_detail`처럼  
`DetailView`를 사용하여 각각의 Room객체를 가지고 와서 그 룸에 속한 Photo 객체들을 for문으로  
탬플릿에 구현하면 된다.  
**`DetailView`는 각각의 Room 객체를 반환하는 편리한 뷰이므로**  
**탬플릿에서 `Room.photos.all()`과 for문을 사용하면 각각의 Room객체에 속한 Photo객체들을 불러올 수 있다.**


```python

from django.http import Http404
from . import models
from users import mixins as user_mixins


class RoomPhotosView(user_mixins.LoggedInOnlyView, DetailVIew):
    
    model = models.Room
    tempalte_name = "rooms/room_photos.html"

    # DetailView 또한 get_obect 메소드를 가지고 있다. UpdateView만 가지고 있는게 아니다.

    def get_object(self, queryset=None):
        
        # 요청 유저(클라이언트,로그인 한 유저)가 Room객체의 유저가 아닌 경우,
        # 링크버튼이던 url이던 어느쪽이든 간에 접근 할 수 없도록 로직을 만든다. 

        room = super().get_object(queryset=queryset)
        user = self.request.user # 요청 유저의 객체

        if room.host.pk != user.pk: # room객체의 유저가 클라이언트 유저와 같지 않다면
            raise Http404()         # Page Not Found 에러를 발생시킨다.
        else:
            return room  # 두 유저가 동일인물이라면, room 객체를 탬플릿에서 room 변수를 사용하여 사용 할 수 있다.

```

- ## room_photos.html 탬플릿 작성


```html

<!-- templates/rooms/room_photos.html -->

{% extends "base.html" %}


{% block page_title %}
    {{room.name}}'s Photos
{% endblock page title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container mx-auto my-10 flex flex-col">

        <div class="my-10 w-full">
            <!-- photo를 업로드할때 forignkey로 Room의 pk가 필요하다. -->
            <a href="{% url 'rooms:add-photo' room.pk %}" class="btn-link w-1/6 block">Upload Photo</a>
        </div>
        
        {% for photo in room.photos.all %}
        <div class=" border p-6 border-gray-400 flex justify-between">
            <div class="flex items-start">
            <!-- img를 보여주고 싶을 때는 url이나 파일 위치를 전달하면 된다. -->
                <img src="{{photo.file.url}}"  class="w-32 h-32" />
                <span class="ml-5 text-xl">{{photo.caption}}</span>
            </div>
            <div class="flex flex-col w-1/5">
               <a href="{% url 'rooms:edit-photo' room.pk photo.pk %}" class="btn-link mt-5 bg-teal-500">Edit</a>
               <a href="{% url 'rooms:delete-photo' room.pk photo.pk %}" class="btn-link mt-5 bg-red-600">Delete</a>
            </div>
        </div>
        {% endfor %}

        <div class="flex-justify center mt-5">
            <a href="{% url 'rooms:edit' room.pk %}" class="text-teal-500 font-medium text-xl">Back to room</a>
        </div>
    </div>

{% endblock content %}


```

- ## Delete photo 기능


Delete photos는 FBV로 만들어본다.


- ### view 작성(delete 기능)

```python

# rooms/views.py

from django.http import Http404
# FBV에서 쓰는 로그인 유저만 접근 가능하게 하는 데코레이터
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, reverse, get_object_or_404
from django.contrib import messages
from . import models
from users import mixins as user_mixins


class RoomPhotosView(user_mixins.LoggedInOnlyView, DetailView):
    
    model = models.Room

    def get_object(self, queryset=None):
        room = super().get_object(queryset=queryset)
        user = self.request.user

        if room.pk != user.pk:
            raise Http404()
        else:
            return room

#로그인 안한 유저가 delete_photo를 호출할 시, 로그인 페이지로 이동된다.
# 혹은 settings.py에서 Login_URL을 설정하면 인자없이 호출안해도('()'없이) 가능하다.
@login_required(login_url="users:login")
def delete_photo(request, room_pk, photo_pk):
    
    user = request.user
    try:
        room = models.Room.objects.get(pk=room_pk)

        # 현재 요청한 유저가 Room객체의 유저인지 확인
        if room.host.pk != user.pk:
            messages.error(request, "Can't delete that photo")
        else:
            photo = get_object_or_404(models.Photo, pk=photo_pk)
            photo.delete()
            messages.success(request, "Photo Deleted")

    # Room객체를 찾을 수 없다면
    except models.Room.DoesNotExist:
        messages.error(request, "You don't have a room")
        return redirect(reverse("core:home"))
    
    return redirect(reverse("rooms:photos" kwargs={"pk":room_pk}))

```

```python

# settings.py

LOGIN_URL = "/users/login/"

```


- ### url 작성(delete 기능)

```python

from django.urls import path
from . import views

app_name = "rooms"


urlpatterns = [
    path("<int:room_pk>/photos/<int:photo_pk>/delete/", views.delete_photo, name="delete-photo"),
]


```


- ## Edit photo 기능
  

- ### template 작성(edit 기능)

```html

<!-- templates/rooms/edit_photo.html -->

{% extends "base.html" %}

{% block page_title %}
    Update photo
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            {% include 'mixins/room/room_form.html' with form=form cta="Update photo" %}

        </div>
{% endblock content %}

```

- ### view 작성(edit 기능)


```python

# rooms/views.py

from django.contrib.messages.views import SuccessMessageMixin

class EditPhotoView(user_mixins.LoggedInOnlyView, SuccessMessageMixin, UpdateView)

    model = models.Photo
    template_name = "rooms/edit_photo.html"
    
    # url에서 받은 pk가 2개인데 두개다 이름이 room_pk, photo_pk다.
    # UpdateView는 디폴트로 pk로 써진 pk만 받는다.
    # pk_url_kwarg를 수정해서 photo_pk를 받을 수 있도록하자.
    pk_url_kwarg = 'photo_pk'
    fields = (
        "caption",
    )
    success_message = "Photo Updated"

    def get_success_url(self):
        # url에서 room_pk 또한 받았기에 가지고 온다.
        room_pk = self.kwargs.get("room_pk")
        return reverse("rooms:photos" kwargs={'pk': room_pk})

```


- ### url 작성(edit 기능)

```python

# rooms/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("<int:room_pk>/photos/<int:photo_pk>/edit/", views.EditPhotoView.as_views(), name="edit-photo")
]


```


- ## Upload photo 기능
  
  photo edit 페이지에 들어가서 photo를 추가할 수 있도록 하자.

- ### template 작성(Upload기능)

```html

<!-- rooms/photo_create.html -->


{% extends "base.html" %}

{% block page_title %}
    Upload photo
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            {% include 'mixins/room/room_form.html' with form=form cta="Upload photo" %}

        </div>
{% endblock content %}



```



- ### view 작성(Upload기능)
```python


class AddPhotoView(user_mixins.LoggedInOnlyView, SuccessMessageMixin, CreateView):

    model = models.Photo
    template_name = "rooms/photo_create.html"
    
    # CreateView는 field가 필요하다.
    # field를 바탕으로 form이 만들어질것이다.  
    # 그리고 그 폼에서 다시 요청이 오면 객체가 만들어진다.
    fields = (
        "caption",
        "file",
    )

```




- ### url 작성(Upload기능)

```python

from django.urls import path
from . import views


app_name = "rooms"

urlpatterns = [
    # 여기서 pk는 Room객체의 pk
    path("<int:pk>/photos/", views.AddPhotoView.as_views(), name="add-photo")
]

```


- ### form 작성(Upload기능)


`CreateView`가 필드만 설정하면 form을 만들어서 form 객체를 탬플릿으로 보내지만  
**Photo 객체는 Room객체의 id가 필요한 관계로 Room의 forignkey field를 탬플릿으로 보내는 것도**  
**자동으로 만들어진 form에 넣는 것도 어색하다**  

그러므로 직접 form을 만들서 받아서 사용하는 걸로 하자.  
`CreateView`도 좋지만 forms.py에서 정의한 form을 받아서 함으로  
`FormView`를 사용하자  

**`CreateView`를 사용하다가 Form을 바꿀 필요가 있다면(커스터마이징),**  
**`FormView`를 사용하도록 하자**



```python

# rooms/forms.py

class CreatePhotoForm(forms.ModelForm):

    class Meta:
        model = models.Photo
        fields = (
            "caption", "file",
            )

    # 매개변수 이름 pk는 아무거나 써도된다. 
    # views.py에서 온 pk 즉, 인자가 하나면 무조건 위치인자 규칙으로 인해
    # pk 자리로 들어가기 때문이다.
    # 인자가 2개 이상이었다면, 첫번째가 매개변수 pk에, 나머지는 args, kwargs에 들어가게된다.
    def save(self, pk, *args, **kwargs):

        # models.py에서 save가 호출되면
        # 우선 필드의 caption, file를 가지고 오브젝트를 생성하고
        # 파이썬에만 저장한다. (중요한건 commit=False이기 때문에 데이터베이스에는 아직 저장하지 않은 상태다)
        # 그 다음, url에서 받은 room.pk를 이용해서 Photo객체 생성에 필요한
        # room 필드에 데이터를 저장하고 오브젝트를 완전히 데이터베이스에 저장하도록 하자.
        
        #urls.py -> model로 온 것임으로 pk 매개변수에서 키워드로 받아서 room의 pk를 받도록 하자.

        photo = super().save(commit=False)
        room = models.Room.objects.get(pk=pk)
        photo.room = room
        photo.save()
```


```python


# rooms/models.py

# Room객체의 pk가 필요함으로 CreateView가 아닌 FormView를 사용하도록 한다.  


from django.views.generic import FormView
from django.contrib.messages.view import SucessMessageMixins
from . import forms
from users import mixins as user_mixins


# form_valid를 사용하면  SuccessMessageMixin을 사용할수 없음으로 
#messages()를 사용해주자.
class AddPhotoView(user_mixins.LoggedOnlyView, FormView):

    template_name = "rooms/photo_create.html"
    form_class = forms.CreatePhotoform

    
    def form_valid(self, form):
        pk = self.kwargs.get("pk")
        # form.py의 CreatePhotoform에 room.pk를 전해준다.
        form.save(pk)
        messages.success(self.request, "Photo Uploaded")
        return redirect(reverse("rooms:photos" kwargs={'pk': pk}))

```