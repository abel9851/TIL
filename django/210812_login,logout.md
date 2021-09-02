# login, logout 기능

로그인 같은 경우는 form으로 ID, password를 받고 '인증'을 해야한다.

1. 그 유저가 존재하는지 안하는지 확인한다.
2. 패스워드가맞는지 확인한다.  
   1, 2는 안맞을시 에러가 난다.

- urls.py에 url 작성

```python

# users/urls.py

from django.urls import path
from . import views

appname = "users"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login")
]


```

= views.py에 view 작성

기본 View 클래스를 쓸 때는 두가지만 가지게 되는데  
`get()`과 `post()`이다.  
기본적으로 모든 HTTP method들을 가지게 된다.(get과 post)  
`form.cleaned_data`는 장고는 데이터를 확인해야만 하고  
그리고 정리를 해준다. 정리가 끝나면 정리가 된 데이터에 내가 접근할 수 있게 된다.  
`form.cleaned_data`를 사용해서.

`cleaned_data`는 모든 필드를 정리해준거에 대한 결과다.
내가 `forms.py`에서 clean method( ex) def clean_email(self), def clean_password(self)))를 만들어 줬다면  
return을 해줘야한다.  
리턴을 안해주면 그 필드를 지워버린다.(clean_data는 정리의 결과물이다. 리턴하지 않는 clean method를 지워버리면 필드의 값이 제대로 출력된다.)

clean method에서 아무것도 return하지 않은 경우의 cleaned_data의 print() 출력 값
`{'email': None, 'password': None}`

```python

from django.views.generic import View
from django.shortcuts import render
from . import forms

class LoginView(View):

    def get(self, request):
        form = forms.LoginForm(initial={"email": "abel9851@gmail.com"})
        return render(request, "users/login.html", {'form': form}) #로그인페이지에 form을 건네준다.

    def post(self, request):
        form = forms.LoginForm(request.POST)
        if form.is_valid():



        return render(request, "users/login.html", {"form": form})


```

- template를 작성 - nav바의 로그인 클릭

```python

# templates/partials/nav.html

<a href="{% url "core:home" %}">Nbnb</a>
<ul>
    <li><a href="{ url "users:login" }">Login</a></li>
</ul>


```

- template를 작성 - `templates/users/login.html`으로 html을 만들어주자.  
  CSRF는 Cross Site Request Forgery(사이트 간 요청 위조)다.  
  내 웹사이트가 날 로그인 시켜줄 때, 웹사이트는 쿠키를 준다.  
  브라우저가 백엔드로 Cookies를 보내는 방식은 도메인에 의해 이루어진다.  
  예를 들어서 페이스북에서 나한테 Cookies를 주고 나면  
  내가 페이스북에 접속할 때마다 자동적으로  
  그 Cookies를 페이스북으로 보내는 거다.

  문제는 내가 페이스북이 아닌 다른 웹사이트를 방문했을 때 생기는데  
  그 웹사이트가 버튼이나 이상한 JavaScript를 가지고 있을 때  
  그리고 그 버튼을 클릭하면 페이스북한테 뭔가를 요청할 것이다.(Ajax같은 것을 사용해서.)  
  근데 그 요청은 내 브라우저에서 일어났기 때문에  
  자동적으로 브라우저는 쿠키를 보낼건데  
  그 다른 웹사이트에서 페이스북 쿠키를 페이스북 백엔드 쪽으로.  
  여기서 문제는 내가 버튼을 클릭할 때 내 비밀번호를 어떻게 바꿀지 찾아낼 것이다.  
  그러니까 기본적으로 내가 다른 웹사이트에서 페이스북으로 form을 보내는 것이다.

  CSRF token은 `/users/login`으로 post request를 보낸걸 찾았다고 할지라도  
  그건 작동하지 않을 것이다. 왜냐하면 CSRF token을 가지고 있지 않기 때문인데  
  이 토큰은 기본적으로 post request가 내 웹사이트(CSRF token을 가지고 있는 웹사이트)에서 왔는지 확인한다.(localhost에서 왔는지)

  CSRF token의 예.  
  `<input type="hidden" name="csrfmiddlewaretoken" value="OvFtLo4wwx~~~~">`

```python

#templates/users/login.html


{% extends 'base.html' %}


{% block page_title %}
    Login
{% endblock page_title %}


{% block search-bar %}
{% endblock search-bar %}

{% block content %}

 <form method="POST" action="{% url 'users:login' %}">
        {% csrf_token %}
        {{form.as_p}} # view에서 온 forms.py의 LoginForm
        <button>Login</button>
 </form>



{% endblock content %}

```

- forms.py 작성

장고에서 username은 중요하다.  
이번에는 email을 username처럼 만들 것이다.  
장고 안에서 username과 email이 같게끔 설정할 것이다.

```python

from django import forms

class LoginForm(forms.Form):

    email = forms.EmailField() # 자동으로 label까지 해준다.
    password = forms.CharField(widget=forms.PasswordInput) # 패스워드가 입력때 안보이게 해줌


```

- forms.py 작성 - Validating Email

LoginView의 `def post()`에서 랜더링까지 됬으면,  
이제 해야할 것은 데이터를 체크하는 것이다.  
데이터를 확인하기 위해서 두 가지를 할 건데,  
하나는 is_valid()를 사용하는 것이다. (리턴되는 것은 True 아니면 False다)  
True가 반환되도 요청된 정보로 user의 객체가 있는지도, 비밀번호가 맞는지도 모르니 따로  
에러를 집어넣어 줄 것이다.

clean으로 시작되는 method들이 하는일은 에러를 넣는 것 뿐만 아니라  
데이터를 정리해준다.

form error(ValidationError)를 raise할 때마다 그 에러를 띄운 곳이 error가 뜨는 곳이다.

- clean_password(self)
  **Django를 포함해서 어떤 것도 비밀번호를 그대로 저장하지 않는다.**  
  무조건 암호화를 해서 데이터베이스에 저장한다.(실제 데이터베이스에 저장된것은 암호화된 비밀번호다. )

  `clean_password(self)`를 사용하면 이 함수에 비밀번호(암호화 되지 않은.)를 주고  
  이 비밀번호를 암호화해서 저장해둔 암호화된 비밀번호가 내가 준 비밀번호를 암호화한거랑  
  같은 것인지 확인한다.

```python


from django import forms
from . import models

class LoginForm(forms.Form):

    email = forms.EmailField() # 자동으로 label까지 해준다.
    password = forms.CharField(widget=forms.PasswordInput) # 패스워드가 입력때 안보이게 해줌

    def clean_email(self): # 이메일이나 비밀번호가 있는 field를 확인하고 싶으면 method이름은 clean_이어야 한다.
        email = self.cleaned_data.get("email") #views.py의 LoginView의 is_valid()가 True를 반환할 경우, cleaned_data에 데이터가 저장된다.
        try:
            models.User.objects.get(username=email) # 이메일을 유저네임으로 가진 user객체를 가져오려한다.
                                                    # 즉, username이 eamil인 user객체가 있는지 클라이언트로 온

            return email

        except models.User.DoseNotExist: # try에서 시도한 User모델이 없을 경우, DoseNotExist에러가 발생하고 그 에러가 발생하면 except구문을 수행
            raise forms.ValidationError("User does not exist") #탬플릿의 form.as_p 부분에 에러를 띄운다. 정확히는 email 필드 부분에 에러를 띄운다.


    def clean_password(self):
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")


        try:
            user = models.User.objects.get(email=email)
            if user.check_password(password): # email을 username으로 가진 특정한 User객체의 check_password()는 주어진 string이 맞으면 True를 리턴한다.
                                              # models.User.objects.get(password=password)로 유저를 가져와봤자 그 패스워드를 가진 user를 가져올 뿐  email=username의 User객체의 비밀번호가
                                              #클라이언트로부터 온 비밀번호인지 확인이 불가능하다.
                return passoword
            else:
                raise forms.ValidationError("Password is wrong")

        except models.User.DoseNotExist:
            raise forms.ValidtationError("User does not exist")

```

- clean_method의 정리

위의 코드는 `cleane_email()`과 `clean_password()`에 중복이 있다.  
email, password필드는 특정한 한개의 User객체로 연관이 있음으로 하나로 묶어주는 것이 좋다.  
함수의 실행 순서는 `clean_field` -> `clean()`이다.  
`cleane_email()`와 같은 `clean_field`는 그 필드의 클린데이터를 반환해야한다.
`clean()`의 경우, `self.cleaned_data`를 반환해야한다.

```python


from django import forms
from . import models

class LoginForm(forms.Form):

    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):  # 두개로 있었던 method의 이름을 clean으로 바꾸었다.
                      # 그리고 에러가 발생하면 필드 위에 뜨는 것이 아닌, form 전제척으로 위에 뜬다.
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")


        try:
            user = models.User.objects.get(email=email)
            if user.check_password(password): # email을 username으로 가진 특정한 User객체의 check_password()는 주어진 string이 맞으면 True를 리턴한다.
                                              # models.User.objects.get(password=password)로 유저를 가져와봤자 그 패스워드를 가진 user를 가져올 뿐  email=username의 User객체의 비밀번호가
                                              #클라이언트로부터 온 비밀번호인지 확인이 불가능하다.
                return self.cleaned_data # clean_field처럼 해당 field의 데이터만 넣으면 안된다. 그러면 그 데이터만 cleaned_data 변수에 넣어져서 리턴된다.
            else:
                raise self.add.error("password", forms.ValidationError("Password is wrong")) # clean()에서는 필드 위의 해당 필드의 에러가 뜨지 않고 전체적으로 뜨기 때문에 add.error("필드이름", 에러)를 하면 필드 위에 에러가 뜬다.

        except models.User.DoseNotExist:
            raise self.add.error("email", forms.ValidtationError("User does not exist"))


```

참조: [cleaned_data](https://jinmay.github.io/2019/11/13/django/django-form-is-valid-mechanism-brief/)  
[clean함수 순서](https://russwest.tistory.com/71)  
[clean함수 순서 - 일본어](https://kohei1116.hateblo.jp/entry/2018/01/14/154929)  
[clean()에 대해 - 일본어](https://takap.net/python_django_cleaned/)

- 유저 로그인 시키기 #1

위의 과정까지 했으면 cleaned_data로 email하고 password를 갖게 된다.(장고 문서를 참고하자)  
참조: [장고문서 - 로그인](https://docs.djangoproject.com/en/3.2/topics/auth/default/)

1. 인증을 하고 `authenticate()` **인증된 사람인지 가려낸다**
2. 로그인을 시킨다. `login()` **인증된 사람인지 1번에서 가려낸 후, 인증이 되었으면 로그인을 시킨다** **이 로그인된 상태(로그인 상태와 아닌 상태를 구별)를 통해 로그인상태면 할 수 있는 기능들을 만들어준다**
   (`authenticate()`를 사용하지 않고 `User= models.User.objects.get(username=username, password=password)`로도  
   Use객체를 가져올 수 있겠지만 이는 사용용도가 다르기 때문에 구별해놓은 것이라 생각한다. 실제 `authenticate()`는  
   `authentication backend`에 대해 username, password와 같은credentials인자들을 체크하는 기능을 가지고 있다.  
   그 밖에 세션이라던가, 쿠키라던가, 백엔드의 재사용이라던가 여러가지가 얽혀있음으로 단순히 User객체를 가져오는 것과  
   `authenticate()`을 통해 가져오는 User객체를 차이가 많을 것이다.)

   (사람을 가려내는것과(아이디와 비밀번호가 맞는지) 로그인하는 것은 다르다.  
    일반 User객체와 달리 인증이 된 User객체(`user = authenticate()`)만이 `login()`을 사용해서 로그인을 할 수 있다.  
    일반 User객체를 사용해서 로그인이 된다면 그 사람이 User객체의 본인이 맞는지 확인하는 작업도 필요없기 떄문이다.)

인증과 인가에 대해서는 영상을 한번 보자
참조: [얄코 - 세션 vs 토큰](https://www.youtube.com/watch?v=1QiOXWEbqYQ&t=637s)  
[Django Authentication System](https://velog.io/@shortdary/Django-Authentication-System)

인증은 authentication, 인가는 authorization으로,  
authentication은 쉽게 말해서 로그인이라고 생각하면 된다.  
내가 이 사이트에 가입된 회원임을, 즉 특정 서비스에 일정한 권한이 주어진 사용자임을  
아이디와 패스워드 등을 통해서 말그대로 인증을 받는거다.

authorization은 이렇게 한번 인증을 받은 사용자가 이후 서비스의 여러 기능들을 사용할 때  
즉 이를테면 내가 페이스북에 로그인으로 인증을 하고 나서 내 친구들의 목록을 보거나 내 담벼락에  
글을 작성하거나 친구의 게시물에 내 명의로 좋아요나 댓글을 다는 등 내 계정으로만 할 수 있는 활동을 시도할 때  
페이스북이 내가 로그인 되어있음을 알아보고 허가를 해주는 것이다.  
로그인이 유지되는 상태에서 일어나는 일이라고 보면 된다.

먼저 인증을 해야하는데 인증은 username과 password를 필요로 한다.  
로그인은 인증된 User객체와 request를 필요로 한다.  
그러면 장고가 알아서 cookie도 해준다.

**- authenticate()에 대해**

login()은 사전에 authenticate()으로 반환된 객체가 아니더라도 사욜할 수 있다.  
authenticate()는 유저 객체의 id와 password가 맞는지 확인하고(장고 백엔드로 여러번 확인)  
틀리면 에러를 발생시키는 함수다

소셜로그인(깃허브, 카카오, 라인)을 할 때, authneticate()를 하지 않는 이유는  
깃허브, 카카오, 라인 등에서 유저인증을 하기 때문이다.  
authenticate() = 유저가 로그인할때 인풋값에 넣은 아이디와 패스워드를 검사하는 역할이고 또 그게 틀렸다면 오류 발생시키는 역할을 한다  
login() = 유저 객체와 리퀘스트 유저의 매핑??
유저 객체를 강제로 하나 찾아서 로그인 함수를 이용해 리퀘스트 유저랑 연결해주면  
세션아이디가 리스폰스로 들어가면서 로그인이 적용된다.  
login()은 그저 해당 유저의 상태를 로그인한 상태로 바꾸는 것 뿐이다.  
아이디와 비밀번호가 맞는지 authenticate()를 통해 인증을 하는게 좋지만  
authenticate()를 사용하지 않아도 login()을 시킬수는 있다.

is_authenticated : User class의 속성. 사용자가 인증되었는지 확인하는 방법이다.  
User에 항상 True이며, AnonymousUser에 대해서만 항상 False.  
단, 이것은 권한과는 관련이 없으며 사용자가 활성화 상태이거나 유효한 세션을 가지고 있는지도 확인하지 않는다.

유저 객체랑 맵핑만 되어있으면 is_authenticated은 무조건 True를 반환한다.

장고유저(user객체와 어나니머스 user객체)가 있어야지만 이용할 수 있는 내부 프로세스 등이 있는데  
회원가입이나 로그인 안한 유저를 위해 그런 접속자에게는 어나니머스 유저 객체가 부여된다  
어나니머스(알수없는, 인증되지 않은)  
그래서 내 유저객체가 어나니머스면 서비스 제약이 있게 설정하는 거다.
그 중 하나가 is_authenticated이고 is_authenticated는 어나니머스 유저 객체에 false를 반환한다.

```python

from django.contrib.auth import authenticate, login

def my_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password) #User 객체
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        ...
    else:
        # Return an 'invalid login' error message.
        ...

```

- 유저 로그인시키기 #2

로그인이 되면, `request.user`는 `request.user.is_authenticated`가 True를 가지고 있다.

```python

from django.views.generic import View
from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login, logout
from . import forms

class LoginView(View):

    def get(self, request):
        form = forms.LoginForm(initial={"email": "abel9851@gmail.com"})
        return render(request, "users/login.html", {'form': form})

    def post(self, request):
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_Data.get("password")
            user = authneticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse("core:home"))  # 뭔가를 다시 rendering 할 필요가 없다.
        return render(request, "users/login.html", {"form": form})


```

- template에서 login url 없애기

로그인이 된 상태임으로 navar에 login 페이지로 가는 login a 태그는 필요 없다.  
대신에 logut링크를 만들어주자.

{{user}}에 관해서는 LoginView에서 보내는 적이 없는데 어떻게 사용하는 것일까?  
django는 Context Processor라는걸 가지고 있다.  
이것은 함수인데 template에 정보를 추가하는 일을 한다.  
어디서든지 그 template로 접근할 수가 있다.  
그 View의 context가 아닌 어디서든지 할 수 있는데  
이 경우에는 Context Processor가 있는데 cookie를 가지고 와서 user를 찾고  
그걸 template에 자동으로 넣어주는 것이다.

이 또한 장고 문서에 설명되어 있음으로 확인해보자

```python


#templates/patials/nav.html


<a href="{% url "core:home" %}">
<ul>
    {% if user.is_authenticated %}
    <li><a href="{% url "users:logout" %}">logout</a></li>
    {% else %}
    <li><a href="{% url "users:login" %}">login</a></li>
    {% endif %}


</ul>




```

- Logout 만들기

`logout()`을 사용하면 장고가 request, cookie등을 다 체크하고 알아서 처리해준다.  
장고문서륵 확인하자

```python

#views.py

from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return redirect(reverse("core:home"))

```

```python


# users/urls.py

from django.urls import path
from . import views

appname = "users"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login")
    path("logout/", views.logout_view, name="logout")
]

```

- CBV를 사용해서 로그인, 로그아웃 기능  
  CBV중 하나인 LoginView를 사용하면 위에서 했던 작업을 간단하게 처리해준다.  
  그렇지만 email이 아니라 username을 필요로 한다.

  그렇기 때문에 FormView를 사용할 것이다.

`authentication_form`도 참고하면 좋다.

FormView는 form에서 인증하고 싶을 때 정말 좋다.  
FormView에서는 Post나 Get을 사용하지 않는다.  
그리고 is_valid()등을 사용하지 않아도 된다.  
대신에 form_valid()를 해야한다.  
form이 맞게 되어있으면 제공된 URL로 보내준다.(redirect to the suppplied URL)

```python


from django.views.generic import View, FormView
from django.urls import reverse_lazy
from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login, logout
from . import forms

class LoginView(FormView):

    template_name = "users/login.html"
    form_class = forms.LoginForm  # forms.LoginForm()의 () 이니셜라이즈를 쓰면 안된다.
    sucess_url = reverse_lazy("core:home")
    initial = {
        'email' : 'abel9851@gmail.com'
    }

    def form_valid(self, form):  #말 그대로 form이 유효한지 체크하는 것 뿐이다.
                                 #여기서 form 인자는 forms.py/LoginForm(request.POST)의 객체다.
                                 # 자동으로 request.POST를 인자로 받아서 다 처리해준다.
        email = form.cleaned_data.get("email")
        password = form.cleaned_Data.get("password")
        user = authneticate(self.request, username=email, password=password)
        if user is not None:
            login(self.request, user)
        return super().form_valid(form) #이것을 리턴할때 success_url로 가고 다 다시 작동한다.




"""
    def post(self, request):
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_Data.get("password")
            user = authneticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse("core:home"))  # 뭔가를 다시 rendering 할 필요가 없다.
        return render(request, "users/login.html", {"form": form})
"""


```
