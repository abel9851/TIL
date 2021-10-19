# Tip - TimeStampedModel

モデルフィールドをみるとcreated, updatedという  
DateImeFieldを色んなアプリに使う場合がある。  
これは中腹されるため、別に分けてアプリを作って管理すると便利だ。  


`django-admin startapp core`でcoreアプリを作った後、  
settings.pyにアプリを使用できるように設定し、  
core/models.pyに下のコードを作成する。  

```python

class TimeStampedModel(models.Model):
    """Time Stamped Model"""

    created = modesl.DateTimeField()
    updated = modesl.DateTimeField()

    class Meta:
        abstract = True # abstractモデルはモデルだけど
                        # データベースにはセーブされないモデルだ。
```

```python

# 実際の使用

from core import models as core_models

class Rooms(core_models.TimeStampedModel):
     # abstract modelであるTimeStampedModelを継承したため
     # updated, createがRoomsモデルのテーブルにセーブされる


```

metaクラスのabstractはcoreアプリ自体にデータベースに登録されcoreテーブルの、  
created, updatedのcalumn, lowを使わないようにしてくれる。  
設定をすると、coreアプリのデータベースのテーブルにはセーブされないが、  
core/models/TimeStampedModelを使った他のモデルでは該当アプリのデータベースのテーブルにセーブされる。  
