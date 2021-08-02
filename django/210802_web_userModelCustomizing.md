# djnago project web - user 모델 커스터마이징

모델은 데이터가 보여지는 모습이다.

장고에서 기본적으로 user모델은 주어지는데 이를 커스터마이징 하려면,  
먼저 config/settings.py에서 설정해주어야 한다.  
이는 django documentation에도 설명되어 있음.

```python
AUTH_USER_MODEL = 'myapp.MyUser'

```

그 다음으로 해야할 것은 커스터마이징 할 모델에  
상속을 해주어야한다

```python
from django.contrib.auth.models import abstractUser

class User(AbstractUser):
    '''Custom User Model'''
    pass
```

**기존에 Django에는 user라는 app이 이미 존재한다.**  
**따라서 내가 만든 users app과 충돌이 발생한다**  
**해결책은 db.sqlite3을 제거 후, AUTH_USER_MODEL을 등록하면 users app을 인식하게 되어있다.**
