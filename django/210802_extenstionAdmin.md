# Admin 커스텀, 확장

기존에 있는 user애드민 패널을 확장시켜서 사용가능하다.

```python

from django.contrib.auth.admin import UserAdmin

@admin.register(models.User)
class CustomUserAdmin(UserAdmin): # admin.ModelAdmin이 아니라 UserAdmin 사용
    """ Custom User Admin """   #리스트 페이지에 검색창, 필터, 필드 등 전부다 바뀐다.
    #디테일로 들어가면 역시 바뀌어 있음.

    fieldsets = UserAdmin.fieldsets + (
    ("Custom Profile", {"fields":("avatar", "gender","bio",)}),
    )  #UserAdmin의 기존 fieldsets과 내가 모델에서 추가한 필드들을 합친 커스텀 fieldsets
```
