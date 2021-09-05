# 210905_conversation기능

[1. url작성](#url작성)  
[2. view작성](#view작성)  
[3. 탬플릿작성](#탬플릿작성)  
[]()  




place 등록자와 대화를 하기 위해 메시지 기능을 만들 것이다.   
Conversation 앱을 만들어서 Conversation 모델과 Message모델을 만든다  
Conversation 모델은 대화하고 싶은 사람 혹은 사람들과의 채팅창 역할을 하고 실제 대화 내용은 Message 모델이  
역할을 수행한다.  

Conversation모델은 참여자가 한명일 필요가 없음으로 ManyToMany로하고 Message는 채팅창(Conversation 모델)과 ForeignKey관계여야만 한다  
ManyToMany라면 다른 채팅창에 그 메시지도 속할 수 있다는 얘기가 되니까 필요 없다.  

**우선은 대화를 하려고 send to message 버튼을 클릭하면**  
**Conversation 모델이 있는지 확인한다. 없으면 만들어야하고 만들때 참여자로 나 자신과 상대방의 pk가 필요하다**  
**ManyToMany관계여야하는 이유가 바로 이것이다.**  

장소발견자와의 채팅창이 있으면 그 채팅창으로 리다이렉트시키고, 없으면 대화창을 만든뒤, 그 대화창으로 리다이렉트하도록 만든다.  






```python

from django.db import models
from django.utils.translation import gettext_lazy as _
from core import models as core_models


class Conversation(core_models.TimeStampedModel):

    """ Conversation Model Definition """

    # 채팅창에 여러 참여자가 참가가능, 그리고 여러 유저는 여러 채팅창에 참여할 수 있어야함으로
    # ManyToManyField로 한다.
    participants = models.ManyToManyField(
        "users.User",
        related_name="conversations",
        blank=True,
        verbose_name=_("participants"),
    )

    def __str__(self):
        usernames = []
        for user in self.participants.all():
            usernames.append(user.username)

        if usernames == []:
            return "No users"
        else:
            return ", ".join(usernames)

    def count_participants(self):
        return self.participants.count()

    count_participants.short_description = "Number of Participants"

    def count_messages(self):
        return self.messages.count()

    count_messages.short_description = "Number of Messages"


class Message(core_models.TimeStampedModel):

    """ Message Model Definition """

    # message의 내용을 입력할때 필요한 입력 필드
    message = models.TextField(
        _("message"),
    )
    # 메시지는 누가 보내는지 표시되어야함으로 ForeignKey관계
    user = models.ForeignKey(
        "users.User",
        related_name="messages",
        on_delete=models.CASCADE,
        verbose_name=_("user"),
    )
    # 메시지는 어느 하나의 채팅창에 속해야함으로 ForeignKey 관게
    conversation = models.ForeignKey(
        "Conversation",
        related_name="messages",
        on_delete=models.CASCADE,
        verbose_name=_("conversation"),
    )

    def __str__(self):
        return f"{self.user} says: {self.message}"



```

- ## url작성

우선 url을 작성하자  
config/urls.py에 conversations/urls.py를 라우팅하도록 하자  

```python

#config/urls.py

"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", include("core.urls", namespace="core")),
    path("admin/", admin.site.urls),
    path("places/", include("places.urls", namespace="places")),
    path("users/", include("users.urls", namespace="users")),
    path("reviews/", include("reviews.urls", namespace="reviews")),
    path("lists/", include("lists.urls", namespace="lists")),
    path("conversations/", include("conversations.urls", namespace="conversations")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```


그 다음 conversations/urls.py에 url을 설정한다.  


```python

from django.urls import path
from . import views

app_name = "conversations"


urlpatterns = [
    path(
        "go/<int:palcefinder_pk>/", views.go_conversation, name="create"
    ),
]

```


- ## view작성

place의 발견자와 send to message를 누른 유저, 2명 이외의 3명이상의 유저가 필요할 경우  
template단에서 유저 초대 버튼을 만들던가(user.objects.all로 검색창을 만들던가), 제 3의 유저가  
여러 대화창의 리스트 페이지를 통해 대화창에 참가해도 될것같지만,  제 3의 유저가 리스트 페이지를 통해  
들어가는 것은 이번에 만드는 대화창의 취지랑 맞지 않음으로 검색창으로 추가하는 것이 좋을 것 같다.  

**현재 상태에서 User객체를 가져올때 get_or_none은 사용할 수 없다.**  
왜냐하면 user앱을 제외한 다른 앱들은 core앱의 TimeStampedModel(models.Model)을 상속해서 모델을 만드는데  
이때 상속받는 TimeStampedModel(models.Model)에 별도로 custommanager를 object 프로퍼티에 정의해 놓았기 때문이다.  
user앱의 User 모델은 TimeStampedModel(models.Model)이 아닌, AbstractUser 클래스를 상속 받고 있음으로  
get_or_none 메소드를 따로 추가하거나, User 모델이 상속하고 있는 AbstractUser의, Manager랑 커스텀 매니저랑 뭐가 다른지 확인한 후  
괜찮은 쪽(다르지 않으면 `object= core_managers.CustomManager()`로 프로퍼티를 추가하거나 AbstractUser 클래스가 사용하고 있는 매니저에 get_or_none 메소드를 정의해서  
사용해야한다)으로 정의하고 호출하도록 하자.  

participants의 유저 객체가 2개가 되어버리니 filter(participants=use_two).filter(participants=use.one)처럼  
해도 되겠지만 이는 filter를 2번 함으로 데이터베이스적으로 좋지 않다.  
그러므로 **Q오브젝트**를 써보자  
Q오브젝트는 hard queries를 하는 방법이다.  
Q오브젝트는 &(and), |(or)를 사용해서 조건에 맞는 쿼리를 할 수 있다.  


참조: 
[장고 - Q오브젝트](https://docs.djangoproject.com/en/3.2/topics/db/queries/)  
[스택 오버 플로우 - get_object_or_404와 Q 오브젝트 동시 사용 예시](https://stackoverflow.com/questions/3046419/how-to-exclude-results-with-get-object-or-404/34752345)  
[장고 체이닝 주의사항](https://americanopeople.tistory.com/326)  
```python

# conversations/views.py


from django.db.models import Q
from django.contrib impoort messages
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.utils.translation import gettext_lazy as _
from . import models

def go_conversation(request, placefinder_pk):

    if request.user.pk == place.viewfinder.pk:
        # messages.error에 request가 필요한 이유는
        # 요청한 유저에게 message를 보여줘야하기 때문이 아닐까
        messages.error(request, _("You can't use"))
    else:
        conversation = model.s

    

```

- ## 탬플릿작성

주의해야할 것이 있다.  
**place_detail 페이지를 보고 있는 유저가 해당 place객체의 유저, 즉 place.viewfinder일 경우**  
**해당 place_detail 페이지에서는 send to message가 보여선 안된다. 보이더라도 누르지 못하도록, 혹은 눌러도 안된다는 에러메시지가**  
**나오도록 해야한다**  

생각해보니까 따로 guest.pk를 보낼 필요 없이 request객체가 있음으로 그 requst.user.pk와 place.viewfinder.pk를 비교하면 될 것 같다.   

```html



```
