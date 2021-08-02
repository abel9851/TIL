# Tip - TimeStampedModel

모델 필드를 보면, created, updated라고 하는  
DateTimeField를 여러 앱에서 사용하는 경우가 있다  
이는 중복됨으로 따로 앱을 만들어서 관리하면 편하다

`django-admin startapp core`로 core앱을 만들어 준 후,  
settings.py에서 앱을 사용하도록 설정하고  
core/models.py에서 아래의 코드를 작성한다.

```python

class TimeStampedModel(models.Model):
    """ Time Stamped Model """

    created = models.DateTimeField()
    updated = models.DateTimeField()

    class Meta:
        abstract = True # abstract모델은 모델이지만, 데이터베이스에는 나타나지 않는 model이다. 대다수의 abstract model은 확장을 하려고 사용한다.

```

```python

#실제사용

from core import models as core_models

class Rooms(core_models.TimeStampedModel): # 추상 모델인 TimeStampedModel을 상속받았기 때문에 updated, created가
    pass                                    # rooms 모델의 테이블에 저장된다.

```

meta 클래스의 abstract는 core앱 자체에서 데이터베이스에 등록되어 core 테이블의, created, updated의 컬럼과 로우를 사용하지 않도록 해준다.  
설정을 하면, core앱의 데이터베이스의 테이블에는 저장이 안되지만, core/models/TimeStampedModel을 사용한,  
다른 앱들의 모델들에서는 해당 앱의 데이터베이스의 테이블에 저장된다.  
ex) rooms앱의 rooms 모델에서 TimeStampedModel을 사용하면, rooms 테이블에 created, updated의 컬럼이 생성된다.

user모델의 abstractUser를 상속받은 경우도  
abstractUser 자체는 데이터베이스에 등록되지 않는 모델이다.  
**코드에서만 쓰이는 이것을 '추상' 모델이라고 부른다.**
