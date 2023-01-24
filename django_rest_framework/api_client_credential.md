## drf credentials(\*\*kwargs)

`credentials` 메소드는 모든 후속요청에서 사용될 헤더로 세팅해준다.

```python
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

# Include an appropriate `Authorization:` header on all requests.
token = Token.objects.get(user__username='lauren')
client = APIClient()
client.credentials(HTTP_AUTHORIZATION='Token' + token.key)
```

`credentials` 를 사용한 뒤의 모든 리퀘스트에는 `credentials` 로 설정한 헤더가 계속 유지되는데

이를 해제하려면 아래의 코드를 사용하면 된다.

```python
# Stop including any credentials
client.credentials()
```

`credentials` 메소드는 basic authentication, OAuth1a , OAuth2 authentication, 간단한 token autentication schemes와 같은 authentication header가 필요한 API 테스트에 사용하기에 적합하다.

Reference

[Testing](https://www.django-rest-framework.org/api-guide/testing/)
