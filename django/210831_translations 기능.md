# translations 기능


[1. settings.py 설정](#settings.py-설정)  
[2. 국제화에 대해](#국제화에-대해)
[3. django-admin makemessage](#django-admin-makemessage)  
[4. po파일](#po파일)  
[5. 세션 추가](#세션-추가)  
[6. blocktrans](#blocktrans)  
[7. 파이썬 코드 번역 방법(views.py 등에서)](#파이썬-코드-번역-방법models.py-등에서)  



장고에선 translation framework도 제공한다.  
text가 있는 탬플릿, forms.py, views.py 어디든 간에  
사용가능하다.  

먼저 할 일은 translations를 저장할 folder를 만드는 것이다.

그 다음 settings.py에서 translations를 hold할 폴더가 있다고 말해줘야한다. 

- ## settings.py 설정


참조:   
[Python, pathlibの使い方（パスをオブジェクトとして操作・処理）](https://note.nkmk.me/python-pathlib-usage/)  
[[Python] 파이썬 에서 __file__의 의미](https://devpouch.tistory.com/28)  

```python

# config/settings.py

# Locale

# 버전 3.7이상 장고에서는 BASE_DIR를 설정할 때
# os.path를 사용한다.
from pathlib import Path

BASE_DIR = (
    # __file__은 현재 수행중인 코드를 담고 있는 파일이 위치한 Path를 알려준다.
    # config/setings.py 라면
    # parent 한번하면 config를, 그 상태에서 한번더 parent를 하면
    # 장고가 설치되어 있는 디렉토리를 가리키게 된다(airbnb_clone 등)
    path(__file__).resolve().parent.parent
)

LOCALE_PATHS = BASE_DIR / "locale"


"""
os.path를 사용하는 장고에서는 아래와 같은 코드를 사용하면 된다.

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)
"""

```

- ## 국제화에 대해

위의 설정까지 한 다음에 translation을 사용할 탬플릿에서는  
`{% load i18n %}`이라고 써줘야한다.  
이는 국제화라는 것으로, 개발자가 지역화 지원을 위해 소프트웨어적으로 준비하는 것이다. 

참조: [다국어 지원](https://wikidocs.net/9824)

```html


<!-- templates/partials/footer.html -->

{% load i18n %}

<footer class="container mx-auto text-center py-10 border-t font-medium text-gray-500">
    <span>
        <!-- 실제 사용하려면 {% trans 내용 %} 으로 태그를 써야한다 -->
        {% trans "Please don't copy us." %}
    </span>
    <span>&copy; 2021 HJ. {% trans "All rights reserved" %}.</span>
</footer>

```

- ## django-admin makemessage

text를 영어에서 일본어로 번역하고 싶으면  
터미널에서 `django-admin makemessages --locale=jp`라고 하면 된다.  
이렇게 하면 `locale/jp/LC_MESSAGES` 폴더가 생성되고  
`locale/jp/LC_MESSAGES/django.mo`,`locale/jp/LC_MESSAGES/django.po` 파일이 생성된다.  

에러가 발생했을 경우, mac의 경우라면 터미널에 `brew install gettext`를 타이핑해서  
gettext를 설치해주자.  
그 다음 `brew link gettext --force`를 타이핑해서 링크해주자.

window라면 구글에서 gettext window binaries를 검색해서 설치해주자.  
왜냐하면 `{% trans "All rights reserved" %}.`처럼, 텍스트를 태깅하고 있기 때문이다.  
그 다음 `django-admin makemessages`를 실행하면, django는 이 tag가 붙은 텍스트들을 다 찾을 것이다.  
그러면 .po파일에 태그가 붙은 텍스트들이 오게 되는데  
이 작업을 하려면 gettext의 도움을 받아야한다.  

그리고 vsc에서 익스텐션으로 get_text를 받자. 

**window에서 xgettext:관련 오류날경우 -i 옵션으로 가상환경 위치 주니까 해결된다**  
**`django-admin makemessages --locale=es -i venv`**


`django-admin makemessages -locale=jp`는 locale폴더/jp라는 폴더를 만들고 그 안에 MESSAGES를 만든다는 의미인데  
이는 한국어면 ko, 일본어면 jp 등으로 해서 언어별로 관리하기 위해서이다.  

**.po 파일은 번역가가 직접 번역하는 메시지 파일이다.**
**.mo 파일은 DJango가 인식할 수 있도록 개발자가 .po 번역 메시지 파일을 컴파일해서 만든 파일이다.**

번역할 작업이 다 끝났다면 `django-admin compilemessages`를 하면된다.  
그러면 `django.mo` 파일에 반영된다.

반영이 됬다고하더라도 아직은 번역된 스트링을 사용할 순 없다.   
호스팅, 게스트 모드에서 사용했던 세션을 이용하여 바꿀 수 있게 할 것이다.  

- ## po파일

```python

# locale/LC_MESSAGES/django.po



# SOME DESCRIPTIVE TITLE.
# Copyright (C) YEAR THE PACKAGE'S COPYRIGHT HOLDER
# This file is distributed under the same license as the PACKAGE package.
# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.
#
#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: PACKAGE VERSION\n"
"Report-Msgid-Bugs-To: \n"
"POT-Creation-Date: 2021-05-20 16:29+0900\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
"Language-Team: LANGUAGE <LL@li.org>\n"
"Language: \n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"

#: .\templates\base.html:26

# msgid는 소스 스트링이다. 수정하면 안된다. 
msgid "Search by city"
# 여기에다가 일본어 번역한 텍스트를 넣는다.
msgstr "都市を検索してください"

#: .\templates\partials\footer.html:4
msgid "&copy; Nbnb"
msgstr ""


```


- ## 세션 추가


`<option value="ja">Japanese</option>`에서 **value는 무조건 장고에 있는 국제코드로 지정하자**  
**크롬언어의 문제인지, 장고 LocaleMiddleware의 문제인지, jp로 할 경우, 탬플릿에서 현재언어({{get_current_language}}가 인식을 못한다)**

```html

<!-- templates/partials/footer.html -->

{% load i18n %}

<footer class="container mx-auto text-center py-10 border-t font-medium text-gray-500">
    <div class="flex flex-col">
        <span>
            <!-- 실제 사용하려면 {% trans 내용 %} 으로 태그를 써야한다 -->
            {% trans "Please don't copy us." %}
        </span>
        <span>&copy; 2021 HJ. {% trans "All rights reserved" %}.</span>
    </div>
    <div class="mt-10 flex">
    <select class="w-1/5 h-8"  id="js-lang">
        <!-- javascript에서 사용할 수 있도록 id를 설정한다 -->
        <option value="en">English</option>
        <option value="ja">Japanese</option>
    </select>
    </div>
</footer>


```

언어를 바꾸면 value로 인해 새로고침 할 수 있도록 자바스크립트를 이용할 것이다.  

참조: 
[fetch](https://ljtaek2.tistory.com/130)  
[fetch에 대해](https://it-hhhj2.tistory.com/39)


```html


<!-- templates/base.html -->

{% load static i18n %}
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
        <link rel="stylesheet" href="{% static 'css/styles.css' %}">
        <title>
        {% block page_title %}{% endblock page_title %}
            | Nbnb</title>
    </head>
    <body class=" text-gray-800 mt-24 font-light">
        {% include 'partials/messages.html' %}
        <header class="container max-w-full flex items-center justify-between inset-0 px-6 h-20 border-b border-gray-400 fixed bg-white">
        <div class="flex items-center w-1/3">
            <a href="{% url "core:home" %}" class="mr-6">
                <img class="w-8" src="{% static 'img/logo.png' %}">
            </a>
            {% block search-bar %}
            <form method="get" action="{% url "rooms:search" %}" class="w-9/12">
                <input 
                    class="w-full search-box font-medium text-gray-900 placeholder-gray-600 border px-5 py-3 rounded-sm shadow-md hover:shadow-lg focus:outline-none" 
                    name="city" 
                    placeholder="{% trans 'Search by city' %}" 
                    />
            </form>
            {% endblock search-bar %}
        </div>
            {% include 'partials/nav.html' %}
        </header>
        {% block content %}{% endblock %}
        {% include 'partials/footer.html' %}
        <script>
            // LangSelect 변수에는 id가 js-lang인 엘리먼트가 담긴다.
            const langSelect = document.getElementById("js-lang");
            // handleLangChange 함수 정의. {} 블록을 사용하지 않고 한줄로 표현한다면 return 키워드 없이도
            // return 되지만  {} 블록을 사용할 시, return이 필요하면 필요한 코드에 return 키워드를 써줘야한다
            // 아래의 함수 정의 방법은 애로우 펑션이다.
            const handleLangChange = () => {
                const selected = langSelect.Value;
                // fetch로 요청을 보낼 url을 입력해주고 
                // 응답(res 객체)을 받아서 추가적인 작업을 해줄 수 있다.
                // fetch 함수가 호출되면 인자로 넘겨준 url에 맵핑된 users앱의 switch_language이 호출되서
                // HttpResponse(status=200) 객체가 리턴된다.  
                fetch(`{% url 'users:switch-language' %}?lang=${selected}`).then(() = > window.location.reload());
                // 함수를 호출한 위치 즉 그 페이지에서 리로드(새로고침)을 한다.
                window.location.reload();
            }

            // 얻어진 엘리먼트인 langSlect 변수가 change되는 이벤트가 발생하면, handleLangChange 함수 실행
            langSelect.addEventListener("change", handleLangChange);

        </script>
    </body>
</html>

```



```python

# users/views.py

from django.utils import translation
from django.http import HttpResponse
from django.shortcuts import reverse, redirect



@login_required
def switch_hosting(request):
    try:
        del request.session["is_hosting"]
    except:
        request.session["is_hosting"] = True
    return redirect(reverse("core:home"))

# 위의 switch_hosting 함수에서는 직접 session에 is_hosting이라는 key와
# 그 key의 value인 True나 False 값을 주었다.

#하지만 session에서 language는 language라는 key가 이미 있는 관계로 추가해줄 필요가 없다. 

def switch_language(request):
    lang = request.GET.get("lang", None)
    if lang is not None:
        if translation.LANGUAGE_SESSION_KEY in request.session:
            del request.session[translation.LANGUAGE_SESSION_KEY]
        translation.activate(lang)
        request.session[translation.LANGUAGE_SESSION_KEY] = lang
    return HttpResponse(200)


```

`switch-language`의 url 추가

```python

# users/urls.py

from django.urls import path
from . import views

app_name="users"

urlpatterns = [
    path("switch-language/", views.swtich_language, name="swtich-language"),
]


```

- ## blocktrans

텍스트 한줄을 번역하고 싶을땐 `{% trans '내용' %}`을 쓰면 되지만  
여러 줄의 텍스트를 번역하고 싶을때는 아래와 같이 `{% blocktrans %}`를 사용한다.  
하지만 변수를 사용하고 있는 중이라면  blocktrans의 규칙에 의해  
랜더링된 html에서는 변수 값이 랜더링되지 않는다.  
이럴 경우에는 `{% blocktrans current_page=page_obj.number %}`처럼  
blocktrans의 블록 안에서 사용할 수 있는 변수를 설정해줘야한다.  

**gettext_lazy를**  
**ManyTomanyField나 foreignKey에서 쓸 경우, verbose_name에 사용해야한다.**

**어떤 탬플릿에서 쓰던, {% load i18n %}은 반드시 써주자**


```html
<span class="mx-3 font-medium text-lg">
                
    {% blocktrans with current_page=page_obj.number total_page=page_obj.paginator.num_pages %}
    Page {{page_obj.number}} of {{total_page}}
    {% endblocktrans %}
</span>

```

- ## 파이썬 코드 번역 방법(models.py 등에서)
  
파이썬 코드에서 텍스트를 가져올 때는 태그를 쓰는게 아니라  
`gettext_lazy`를 사용한다.   
`gettext_lazy`는 `reverse_lazy`와 비슷하게 즉각적으로 발생하는 것은 아니지만  
코드가 호출 되었을 때 나오는 것이다.  
`gettext`는 코드를 읽었을때 바로 번역되지만,  
현재 po파일이 아직 읽어지지 않은 상태임으로  
`gettext_lazy`가 적절하다.  

`from django.utils.translation import gettext_lazy as _`에서 '_'로 사용하는 이유는  
파이썬에서 이렇게 사용하도록 방식을 정해놨기 때문이고, 빈번히 사용되기 때문이다.  

**#, fuzzy는 대문자가 있는데 그게 소문자가 되어야하도록 하는 역할을 한다**  
**#, fuzzy가 있을때 번역이 안될땐, 지우면 번역이 될때가 있다.**

참조: [gettext_lazy について - django](https://qiita.com/ForestSeo/questions/82794a71fb4ca1d58c23)

```python


# users/models.py

from django.utils.translation import gettext_lazy as _

class User(AbstractUser):

    """Custom User Model Definition """

    GENDER_MALE = "male"
    GENDER_FEMALE = "female"
    GENDER_OTHER = "other"

    GENDER_CHOICES = (
        (GENDER_MALE, _("Male")),
        (GENDER_FEMALE, _("Female")),
        (GENDER_OTHER, _("Other")),
    )

    LANGUAGE_JAPANESE = "ja"
    LANGUAGE_ENGLISH = "en"
    LANGUAGE_KOREAN = "ko"

    LANGUAGE_CHOICES = (
        (LANGUAGE_JAPANESE, _("Japanese")),
        (LANGUAGE_ENGLISH, _("English")),
        (LANGUAGE_KOREAN, _("Korean")),
    )

    CURRENCY_JPY = "jpy"
    CURRENCY_USD = "usd"
    CURRENCY_KRW = "krw"

    CURRENCY_CHOICES = (
        (CURRENCY_JPY, "JPY"),
        (CURRENCY_USD, "USD"),
        (CURRENCY_KRW, "KRW"),
    )

    LOGIN_EMAIL = "email"
    LOGIN_GITHUB = "github"
    LOGIN_KAKAO = "kakao"
    LOGIN_LINE = "line"

    LOGIN_CHOICES = (
        (LOGIN_EMAIL, "Email"),
        (LOGIN_GITHUB, "Github"),
        (LOGIN_KAKAO, "Kakao"),
        (LOGIN_LINE, "Line"),
    )

    avatar = models.ImageField(upload_to="avatars", blank=True)
    # 필드의 라벨의 경우는, 아래와 같이 CharField 안에, gettext_lazy 함수 안에 필드명을 기입하면 된다.
    gender = models.CharField(_('gender'), choices=GENDER_CHOICES, max_length=10, blank=True)
    bio = models.TextField(blank=True)
    birthdate = models.DateField(blank=True, null=True)
    language = models.CharField(
        choices=LANGUAGE_CHOICES, max_length=2, blank=True, default=LANGUAGE_JAPANESE
    )
    currency = models.CharField(
        choices=CURRENCY_CHOICES, max_length=3, blank=True, default=CURRENCY_JPY
    )
    supercontentprovider = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    email_secret = models.CharField(max_length=20, default="", blank=True)
    login_method = models.CharField(
        choices=LOGIN_CHOICES, max_length=50, default=LOGIN_EMAIL
    )

    def get_absolute_url(self):
        return reverse("users:profile", kwargs={"pk": self.pk})

    def verify_email(self):
        if self.email_verified is False:
            secret = uuid.uuid4().hex[:20]
            self.email_secret = secret
            html_message = render_to_string(
                "emails/verify_email.html", {"secret": secret}
            )
            send_mail(
                "Verify StarScope Account",
                strip_tags(html_message),
                settings.EMAIL_FROM,
                [self.email],
                fail_silently=False,
                html_message=html_message,
            )
            self.save()
        return


```