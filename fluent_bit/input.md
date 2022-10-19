## fluent bit custom bit의 input설정

tail로 input을 받는것 외에 input으로 정의하지 않은 것도

stdout으로 출력된다.

여기서 문제는 어떤 INPUT을 지정해야 stdout에 태그를 지정할수 있냐다.

해결! stdout는 app이름-firelens\*로 지정이 가능하다.

그리고 multiline(여러줄이 한줄로 출력되는 것을 묶는 것) 대책을 built-in filter로 해봤다.

주의점은 다른 filter도 사용할때에는 multiline filter가 가장 위에 있어야한다는 것이다.

그리고 이때, match는 multiline filter에 앱이름-firelens*, 다른 filter에는 *로 전체 지정,

이런식으로 해도 문제 없다.

built-in filter인 python multiline을 사용해봤는데, 이걸 전 로그, 장고 로그에 적용하면

로그에는 파이썬 관련 로그니까 장고 로그도 같이 걸려서 나오는 것 같다.

예를 들어 2022-10-18 00:54:42,449 [WARNING] 48 140515189749568/usr/local/lib/python3.9/site-packages/django/utils/log.py : 224 Unauthorized: /api/v1/user/login

라는 장고 로그도 잡힌다

일단 테스트해보고 안되면 django의 커스텀 multiline parser를 찾거나 작성해서 사용해야 할 것 같다.

```python
[INPUT]
    Name tail
    Path /opt/tester/log/gunicorn.access.log
    Tag gunicorn.access

[INPUT]
    Name tail
    Path /opt/tester/log/gunicorn.error.log
    Tag gunicorn.error

[INPUT]
    Name tail
    Path /opt/tester/log/app.log
    Tag django

[FILTER]
    Name grep
    Match *
    Exclude log ^(?=.*ELB-HealthChecker\/2\.0).*$

[OUTPUT]
    Name cloudwatch_logs
    Match * # INPUT에 설정한  3개의 tail이외에 stdout 되는 것들도 output된다. 즉 따로 정의 안해도 된다.
    auto_create_group false
    log_group_name sfa-dev-ecs-django-logs
    log_stream_prefix from-fluentbit/
    region ap-northeast-1
    log_key log
```

Reference

[詳解 FireLens - Amazon ECS タスクで高度なログルーティングを実現する機能を深く知る | Amazon Web Services](https://aws.amazon.com/jp/blogs/news/under-the-hood-firelens-for-amazon-ecs-tasks/)

[FireLens（Fluent Bit）の設定ファイルをローカル実行時と FireLens で起動したときの違いを見比べてみる | DevelopersIO](https://dev.classmethod.jp/articles/check-fluent-bit-conf/)

[詳解 FireLens - Amazon ECS タスクで高度なログルーティングを実現する機能を深く知る | Amazon Web Services](https://aws.amazon.com/jp/blogs/news/under-the-hood-firelens-for-amazon-ecs-tasks/)

[Multiline](https://docs.fluentbit.io/manual/pipeline/filters/multiline-stacktrace)

[Multiline Parsing](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/multiline-parsing)

[https://github.com/aws-samples/amazon-ecs-firelens-examples](https://github.com/aws-samples/amazon-ecs-firelens-examples)

[log-sender/fluent-bit.conf at master · bungoume/log-sender](https://github.com/bungoume/log-sender/blob/master/fluent-bit.conf)
