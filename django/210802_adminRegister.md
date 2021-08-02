# Admin Register에 대해

모델을 이용해서 admi패널에 보여주는 방법은 두 개가 있다.

1. admin.site.register(모델, 애드민)

```python

from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    search_fields = ["subject"] # Question모델에 있는 subject(CharField)로 검색할 수 있도록 검색필드를 추가

admin.site.register(Question, QuestionAdmin) # 모델을 파라미터로 주면, admin에 보여짐. 거기다가 QuestionAdmin을 파라미터로 주면 검색도 가능해지도록 커스텀화 시킬 수 있음

#QuestionAdmin은 admin 패널에서 컨트롤 할 수 있는 클래스.

```

2. @admin.register(models.myModel)

```python

from .models import User

@admin.register(User) # models.py에 있는 User모델 사용
class CustomUserAdmin(admin.ModelAdmin):
    """Custom User Admin"""
    pass

# admin 패널에서 이 user를 보고싶다.
# user를 컨트롤할 클래스가 바로 CustomUserAdmin이 될거야. 라는 뜻이다.
#데코레이터는 클래스 위에 있어야함. 데코레이터는 확장되는 함수라고 생각하면 편함. 1의 기능에 2의 기능을 더해서 1+2의 함수가 된다.

```

1, 2 두개 다 같은 결과를 보여주지만 2번이 더 간략화된 느낌.
