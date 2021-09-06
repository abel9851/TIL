# 210905_conversation기능

[1. url작성](#url작성)  
[2. view작성](#view작성)  
[3. 탬플릿작성](#탬플릿작성)  
[4. Conversation Detail url 작성](#Conversation-Detail-url-작성)  
[5. Conversation Detail view 작성](#Conversation-Detail-view-작성)  
[6. Detail template 작성](#Detail-template-작성)  
[7. view 변경과 form 사용여부](#view-변경과-form-사용여부)  
[8. conversation list view 작성](#conversation-list-view-작성)  
[9. conversation list template 작성](#conversation-list-template-작성)  




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

# conversations/urls.py

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


**실제로 AbstractUser는 models.manager를 사용하는게 아니라**  
**UserManager를 별도로 사용한다**  
**core앱에서 정의하고 사용해주자**  
그런데 클론코딩 강의에서는 CustomUserManager 클래스를 만들때 CustomManager(models.manager상속과 get_or_none 메소드 정의)와  
UserManager 이 두개를 상속하고 있는데 **겹치지 굳이 그럴필요가 있나 싶기도하고 매니저 2개가 겹쳐서 문제가 일어날 것 같으니**  
UserManager하나만 상속하고 get_or_none 메소드를 정의하도록 하자.  

AbstractUser의 상속들을 훑어보니까 models.Manager를 상속하고 있다. UserManager만 사용해도 될 것 같다. 


```python

# core/managers.py


from django.contrib.auth.models import UserManager

class CustomUserManager(UserManager):
    
    def get_or_none(self, **kwargs):
        try:
            return self.get(**kwargs)

        except self.model.DoesNotExist:
            return None
            
```


```python

# users/models.py

from cores import managers

class User(abstractUser):

    objects = managers.CustomUserManager()

```



participants의 유저 객체가 2개가 되어버리니 filter(participants=use_two).filter(participants=use.one)처럼  
해도 되겠지만 이는 filter를 2번 함으로 데이터베이스적으로 좋지 않다.  
그러므로 **Q오브젝트**를 써보자  
Q오브젝트는 hard queries를 하는 방법이다.  
Q오브젝트는 &(and), |(or)를 사용해서 조건에 맞는 쿼리를 할 수 있다.  


참조: 
[장고 - Q오브젝트](https://docs.djangoproject.com/en/3.2/topics/db/queries/)  
[스택 오버 플로우 - get_object_or_404와 Q 오브젝트 동시 사용 예시](https://stackoverflow.com/questions/3046419/how-to-exclude-results-with-get-object-or-404/34752345)  
[장고 체이닝 주의사항](https://americanopeople.tistory.com/326)  
[장고 문서 체이닝 주의사항](https://docs.djangoproject.com/en/2.2/topics/db/queries/#spanning-multi-valued-relationships)

```python

# conversations/views.py


from django.db.models import Q
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from users import models as user_models
from users.mixins import LoggedInOnlyView
from . import models


@login_required
def go_conversation(request, placefinder_pk, place_pk):

    """ Conversation Create & redirect definition """

    user_one = user_models.User.objects.get_or_none(pk=request.user.pk)
    user_two = user_models.User.objects.get_or_none(pk=placefinder_pk)
    if user_one is not None and user_two is not None:
        if user_one == user_two:
            messages.error(request, _("You can't this"))
            redirect(reverse("places:detail", kwargs={"pk": place_pk}))
        else:
            try:
                conversation = models.Conversation.objects.get(
                    Q(participants=user_two) & Q(participants=user_one)
                )

            except models.Conversation.DoesNotExist:
                conversation = models.Conversation.objects.create()
                conversation.participants.add(user_one, user_two)
            return redirect(
                reverse("conversations:detail", kwargs={"pk": conversation.pk})
            )

```

- ## 탬플릿작성

주의해야할 것이 있다.  
**place_detail 페이지를 보고 있는 유저가 해당 place객체의 유저, 즉 place.viewfinder일 경우**  
**해당 place_detail 페이지에서는 send to message가 보여선 안된다. 보이더라도 누르지 못하도록, 혹은 눌러도 안된다는 에러메시지가**  
**나오도록 해야한다**  

생각해보니까 따로 guest.pk를 보낼 필요 없이 request객체가 있음으로 그 requst.user.pk와 place.viewfinder.pk를 비교하면 될 것 같다.   

```html



```


- ## Conversation Detail url 작성


```python

# conversations/urls.py

from django.urls import path
from . import views

app_name = "conversations"


urlpatterns = [
    path(
        "go/<int:palcefinder_pk>/", views.go_conversation, name="create"
    ),
    path(
        "<int:pk>/", views.ConversationDetailView.as_view(), name="detail"
    ),
]



```


- ## Conversation Detail view 작성


```python

# conversations/views.py

from django.views.generic import DetailView
from user_mixins import LoggedInOnlyView
from . import models


class ConversationDetailView(DetailView):

    # urls.py에서 받은 pk로 객체를 찾아서 랜더링해야하니까
    # 모델을 설정할 필요가 있다
    model = model.Conversation


    def get_object(self, queryset=None):
        
        # super().get_object(queryset=queryset)는 ConversationDetailView에 전해진 pk(urls.py에서 온)로 찾은, 
        #모델 객체 즉, Conversation객체다
        conversation = super().get_object(queryset=queryset)
        # 해당 Conversation객체의 participants의 쿼리셋에 웹페이지를 보고 있는 요청한 유저가 없다면
        # 즉, 대화창에 요청한 유저가 없을 경우, 에러 메시지와 함께 홈페이지로 리다이렉트 시킨다.
        if self.request.user not in conversation.participants.all():
            messages.error(self.request, _("You can't access"))
            redirect(reverse("core:home"))
        return conversation


```


- ## Detail template 작성


```html


<!-- templates/conversations/conversation_detail.html-->

{% extends 'base.html' %}
{% load i18n %}

{% block page_title %}
    Conversation
{% endblock page_title %}

{% block serach-bar %}
{% endblock serach-bar %}


{% block content %}
    <div class="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        <div class="border w-1/4 p-10">
            <span class="text-center w-full block text-lg font-medium">Conversation between</span>
            <div class="flex justify-between mt-10 items-center">
                {% for user in conversation.participants.all %}
                    <div class="flex flex-col items-center">
                        {% include 'mixins/user_avatar.html' with user=user %}
                        <span class="mt-2 text-gray-500">{{user.first_name}}</span>
                    </div>
                    {% if forloop.first %}
                        <span class="font-medium text-2xl">&</span>
                    {% endif %}
                {% endfor %}
            </div>
        </div>
        <div class="border flex-grow ml-10 p-10 flex flex-col">
            {% if conversation.messages.count == 0 %}
                {% trans 'no messages' %}
            {% else %}
                {% for message in conversation.messages.all %}
                    <!-- 자기자신이 보낸 메시지라면 이름과 메시지가 맨 오른쪽으로 정렬된다. -->
                    <div class="mb-10 {% if message.user.pk == user.pk %}
                        self-end
                        text-right
                    {% endif %}">
                        <span class="text-sm font-medium text-gray-600">{{message.user.first_name}}</span>
                        <!-- 자기자신의 메시지라면 배경이 회색, 타인이 보낸거면 배경이 녹색 -->
                        <div class="mt-px p-5 w-56 rounded
                            {% if message.user.pk != user.pk %}
                                bg-green-600
                                text-white
                            {% else %}
                                bg-gray-300
                            {% endif %}
                        ">
                            {{message.message}}
                        </div>
                    </div>
                {% endfor %}
            {% endif %}
        </div>
    </div>
{% endblock content %}


```

- ## view 변경과 form 사용여부

view작성에서는 DetailView로 했지만 좀 더 컨트롤 할 수 있도록 View를 사용해서 해보자  
그리고 template 단을 보면 form(POST)로 메시지를 보내서 View로직에서 message 객체를 만들어야하는데  
이때 message객체의 meesage 필드는 forms.py에서 form을 만들어서 보여줄 수 있지만   
이번처럼 입력 필드가 하나고, foreignkey, manytomanyfield가 필요한 경우는 template단에서 수동으로 form의 input을 만들어줘도 된다  


이번 ConversationDetailView에서는 `form.is_vaild()`를 사용하지 않았다.  
forms.py에서 온 form을 view단에서 `form = AddCommentForm()`으로 받고, 그 form으로 `form.is_valid()`를 하면  
유효성 검사를 통해 clean data를 사용할 수 있는데, 이번에는 장고 form을 사용하지 않고 tempalte단에서 직접  
input을 만들었기 때문이다.  
**장고 form을 사용한다면 반드시 `form.is_valid()`사용하도록 하고 장고 form을 사용하지 않을 시**  
**장고 form을 사용하지 않고도 유효성 검사를 할 수 있는 로직을 찾아보도록 하자**

views.py
```python


from django.db.models import Q
from django.http import Http404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import View
from users import models as user_models
from users.mixins import LoggedInOnlyView
from . import models, forms

class ConversationDetailView(LoggedInOnlyView, View):

    """ Conversation Detail Definition """

    def get(self, *args, **kwargs):
        pk = kwargs.get("pk")
        conversation = models.Conversation.objects.get_or_none(pk=pk)
        if not conversation:
            raise Http404()
        if self.request.user not in conversation.participants.all():
            messages.error(self.request, _("You can't access"))
            redirect(reverse("core:home"))
        return render(
            self.request,
            "conversations/conversation_detail.html",
            {"conversation": conversation},
        )

    def post(self, *args, **kwargs):
        message = self.request.POST.get("message", None)
        pk = kwargs.get("pk")
        if message is not None:
            conversation = models.Conversation.objects.get_or_none(pk=pk)
            if not conversation:
                raise Http404()
            if self.request.user not in conversation.participants.all():
                messages.error(self.request, _("You can't access"))
                redirect(reverse("core:home"))
            models.Message.objects.create(
                message=message, user=self.request.user, conversation=conversation
            )
        return redirect(reverse("conversations:detail", kwargs={"pk": pk}))

```


forms.py **써도 되고 안써도 된다**
```python

from django import forms
from django.utils.translation import gettext_lazy as _


class AddCommentForm(forms.Form):
    message = forms.CharField(
        required=True, widget=forms.TextInput(attrs={"placeholder": _("Add a Comment")})
    )


```

template
```html

{% extends 'base.html' %}
{% load i18n %}

{% block page_title %}
    Conversation
{% endblock page_title %}

{% block serach-bar %}
{% endblock serach-bar %}


{% block content %}
    <div class="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        <div class="border w-1/4 p-10">
            <span class="text-center w-full block text-lg font-medium">Conversation between</span>
            <div class="flex justify-between mt-10 items-center">
                {% for user in conversation.participants.all %}
                    <div class="flex flex-col items-center">
                        {% include 'mixins/user_avatar.html' with user=user %}
                        <span class="mt-2 text-gray-500">{{user.first_name}}</span>
                    </div>
                    {% if forloop.first %}
                        <span class="font-medium text-2xl">&</span>
                    {% endif %}
                {% endfor %}
            </div>
        </div>
        <div class="flex-grow">
            <div class="border ml-10 p-10 flex flex-col">
                {% if conversation.messages.count == 0 %}
                    {% trans 'no messages' %}
                {% else %}
                    {% for message in conversation.messages.all %}
                        <div class="mb-10 
                        {% if message.user.pk == user.pk %}
                            self-end text-right
                        {% endif %}">
                            <span class="text-sm font-medium text-gray-600">{{message.user.first_name}}</span>
                            <div class="mt-px p-5 w-56 rounded
                                {% if message.user.pk != user.pk %}
                                    bg-green-600 text-white
                                {% else %}
                                    bg-gray-300
                                {% endif %}
                            ">
                                {{message.message}}
                            </div>
                        </div>
                    {% endfor %}
                {% endif %}
            </div>
            <form action="" method="POST" class="mt-10 w-1/2 mx-auto">
                {% csrf_token %}
                <input class="border-box mb-5"name="message" placeholder="Write a Message" type="text" required />
                <button class="btn-link">{% trans 'Send Comment' %}</button>
            </form>
        </div>
    </div>
{% endblock content %}
    



```

- ## conversation list view 작성

```python

@login_required
def conversation_list(request):
    user = request.user
    conversation_list = models.Conversation.objects.filter(participants=user)
    return render(
        request,
        "conversations/conversation_list.html",
        {"conversation_list": conversation_list},
    )

```

- ## conversation list template 작성

```html

{% extends 'base.html' %}
{% load i18n %}

{% block page_title %}
    conversations
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}
    

{% block content %}
    <div class="h-75hv">
        <h3 class="mb-12 text-2xl text-center">Your conversations</h3>
        {% if user.conversations.count > 0 %}
        <div class="container mx-auto pb-10">
            <div class="flex flex-wrap flex-col mb-10 items-center">
            {% for conversation in conversation_list %}
            <a href="{% url 'conversations:detail' conversation.pk %}" class=" border rounded p-2 mr-2 mb-3 text-center bg-blue-500 text-white w-1/3">{{conversation}}</a>
            {% endfor %}
            </div>
        </div>
        {% endif %}
    </div>

{% endblock content %}


```