## django error CORS_ORIGIN_WHITELIST

CORS_ORIGIN_WHITELIST에는 프론트엔드를 따로 입력할때에는

localhost말고 127.0.0.1로 입력해야한다.

CORS_ORIGIN_WHITELIST=(http://127.0.0.1:8080/)

UI_HOST=http://127.0.0.1:8080는 영향이 없었는데 얘는 잘 모르겠다.

DJANGO_MODE 환경변수를 develop으로 하면 안돌아가던데 이건 이유를 모르겠다.
