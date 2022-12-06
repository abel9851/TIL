## DRF allow_blank

allow_blank=True는 아래의 두 json의 공백을 사용할 수 있게한다.

`content = serializers.CharField(max_length=1000, allow_blank=True)`

그리고 default 옵션을 사용하면 json에 해당 필드에 관한 키와 값이 없어도 데이터베이스에 입력이 가능하다. stiring관련인 CharField에 관해서는 `default=""` 로 하면, empty string(장고에서는 string 관련 필드에 관해서는 null을 사용하지 않도록 권장한다.)으로 등록된다.

```python

# json으로 받은 공백문자와 스페이스는 allow_blank=True일때 허용한다.
{
  "content": "",
}

{
  "content": " "
}
```
