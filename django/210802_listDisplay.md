# list_display에 대해

admin의 리스트 페이지(모델의 리스트)에서 보여줄 필드를 결정 할 수 있다.

```python
@admin.register(models.User)
class CustomUserAdmin(admin.ModelAdmin):
    """Custom User Admin"""

    list_display = (
        'username',
        'gender',
        'language',
        )

    list_filter = (
        'gender',  # 리스트 페이지 오른쪽에 필터가 생긴다.
        'language',
    )

```
