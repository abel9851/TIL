# 패스워드 변경(PasswordChangeView)

- ## view 작성(PasswordChangeView 사용)

**따로 pk를 url에서 전해주지 않으면 로그인된 유저야만 사용가능**

참조: [패스워드 변경기능은 로그인한 유저만 사용가능(urls.py에서 pk를 따로 전해주지 않아도 된다.) - 일본어](https://wonderwall.hatenablog.com/entry/2018/03/25/133000)  



CBV를 사용하면 빠르게 만들 수 있지만 통제력이 떨어진다.  
FBV를 사용할 경우, 패스워드의 해시화로 값을 가져오는 것에 번거로움이 있을 수 있으나 디자인의 자유가 폭넓다.  
적어도 CBV를 사용한다면 Form을 forms.py에서 만들어서 View에서 CBV랑 연결시켜 쓰는걸 연습해보자.  
그러면 FBV보단 아니지만 디자인에서 자유롭다.  
다른 view들도 마찬가지다.  



참조의 내용을 보면, CBV는 별다른 form을 만들지않아도(forms.py에서)  
모델이 정의되어 있으면 자동으로 폼 객체를 생성한다.   

fields변수는 보여주고 싶은 필드를 변수에 넣으면  
fields에서 정의되어 있는 필드만 사용한다.  
단, **장고에서 기본으로 생성되는 모델 폼을 사용할 경우에만 필요하다**

그밖에 form_class라는 변수로 따로 form을 정의해두면 그 정의해둔 form으로 form객체가 생성된다.  

참조:  
[로그인 폼](https://lar542.github.io/Django/2019-07-01-django-second-project3/)  
[장고의 인증기능](https://sys09270883.github.io/web/53/)  
[패스워드 변경 - 에어비앤비 클론](https://velog.io/@jewon119/Django-%EA%B8%B0%EC%B4%88-Profile-Page)

```python

from django.contrib.auth.views import PasswordChangeView

class UpdatePasswordView(PasswordChangeView):

    #탬플릿을 성정안하면 애드민 패널로 가버림으로 설정해주자.  



```

- ## url 작성


```python

from django.urls import path

appname= "users"

urlpatterns = [
    path("update-pasword/", views.views.UpdatePasswordVIew.as_view(), name="password")
]


```

- ## 탬플릿 작성

1. 링크 설정

```html

{% extends "base.html" %}

{% block page_title %}
    Update Proifle
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}
    <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            <!-- form객체를 생성했더라도 view에서 temaplate_name을 정의해주지 않으면 -->
            <!-- 이 탬플릿으로 오지 않고 애드민 패널 페이지에서 form을 보여주게 된다 -->

            {% include 'mixins/auth/auth_form.html' with form=form cta="Update Profile" %}


            <!-- 소셜로그인으로 한 유저일 경우, 패스워드가 없음으로 링크가 안보이게 하자 -->
            <!-- 여기서 object는 view가 준 업데이트할 객체다 -->
            {% if object.login_method ==  "email" %}

            <div class="mt-5">
                <a href="{% url 'users:password' %}" class="text-red-500 font-medium">Change Password</a>
            </div>

            {% endif %}
    </div>
{% endblock content %}


```

2. 1번까지 하고 클릭해서 링크로 이동하면 애드민 패널 페이지에서 패스워드를 변경하는 식으로 되서  
   애드민 패널 페이지가 나온다.  
   이건 좋지 않음으로 따로 탬플릿을 지정해주자.  

```python


from django.contrib.auth.views import PasswordChangeView

class UpdatePasswordView(PasswordChangeView):

    #탬플릿을 성정안하면 애드민 패널로 가버림으로 설정해주자.  
    template_name = "users/update-password.html"

   ```

3. 패스워드 디테일 페이지(패스워드 변경 페이지)를 작성한다.  
  `auth_form.html`을 include함으로 view에서 온 form객체가  
  `auth_form.html`으로 가기 때문에 자동으로 랜더링된다.  
  
  잘 나오지만, password field에 placeholder를 넣어서  
  password field가 password를 입력해도 되는 곳인지 표시하자.  
  따로 forms.py에 form을 받아서 랜더링 한 것이 아니기 때문에  
  
  `PasswordChangeView`의 내부함수인 `get_form`을 사용해서 지정해보자. 


```html

{% extends "base.html" %}

{% block page_title %}
    Update Proifle
{% endblock page_title %}

{% block search-bar %}
{% endblock search-bar %}

{% block content %}

    <div class="min-h-50vh">

        
        <div class="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center border p-6 border-gray-400">

            {% include 'mixins/auth/auth_form.html' with form=form cta="Update password" %}

        </div>
    </div>
{% endblock content %}


```

4. `get_form()` 사용

placeholder를 설정할때 구글의 개발자용 검사 툴로 인풋필드에 마우스를 갖다대면  
그 인풋필드가 무슨 name을 가지고 있는지 바로 확인할 수 있다.  
이번 경우는 old_password, new_password1 등이다.  


```python



from django.contrib.auth.views import PasswordChangeView

class UpdatePasswordView(PasswordChangeView):

    #탬플릿을 성정안하면 애드민 패널로 가버림으로 설정해주자.  
    template_name = "users/update-password.html"

    def get_form(self, form_class=None):
        form = super().get_form(form_class=form_class)

        form.fields["old_password"].widget.attrs = {"placeholder": "Current password"}
        form.fields["new_password1"].widget.attrs = {"placeholder": "New password"}
        form.fields["new_password2"].widget.attrs = {"placeholder": "Confirm neww password"}
        

        
        return form


```