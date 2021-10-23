# Custom User Model settingの方法

DjangoではUser Modelをカスタマイズすることができる。  
デフォルトのUser Modelがあるが、カスタマイズするため  
デフォルトのuser ~~Modelをデータベースから消して新しくUser modelを作る必要がある。
その時にはAbstractUserみたいに既存にあるクラスを継承して新しいUser modelを作る方がある。

```python

# myapp/users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """Custom User Model Definition"""
    pass

```

こうした後には必ず**settings.pyでAUTH_USER_MODELを設定しなければならない**  



```python

# myapp/config/settings.py

# usersアプリにあるmodel.pyの中のUserモデルを指定する。
AUTH_USER_MODEL = "users.User"


```