# template

장고에서 템플릿을 사용하려면 장고의 settings.py에 등록해야한다.

```python

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR/ "templates"], # 여기에 디렉토리 설정
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

```

- context
  context는 템플릿에 변수를 보내는 방법이다.

```python

@login_required(login_url="common:login")
def question_create(request):
    """
    pybo 질문 등록
    """
    if request.method == "POST":
        form = QuestionForm(request.POST)  # 아래의 form과 id는 다른 것이라고 추측, 같을 수도 있고.

        if form.is_valid():  # post로 받은 데이터가 유효한지 검사.
            question = form.save(commit=False)  # 임시저장. 이유는 create_date가 비어있어서.
            question.author = request.user
            question.create_date = timezone.now()
            question.save()
            return redirect("pybo:index")
    else:
        form = QuestionForm()
    context = {"form": form}
    return render(
        request, "pybo/question_form.html", context
    )  # render는 했지만, html 탬플릿파일에서 form.as_p와 같이 form직접 쓰지 않았기 때문에 html 템플릿파일에 쓴 form태그 안에 있는 코드가 적용된다.

```

템플릿에서 변수를 사용하는 방법은  
`{{form}}`이런 방식으로 하면 된다.

파이썬 로직을 사용하고 싶으면 {% if %}와 같은 방식으로 사용하면된다.
**로직 안에서의 변수는 {{form}} 형식으로 안해도 된다.**  
**{% if form %} 형식으로 하면 작동된다.**
