## AWS cloud watch logs- log stream

로그 스트림이란 동일한 소스를 공유하는 로그 이벤트 시퀀스이다.

구체적으로 말하자면, 로그 스트림은 모니터링 중인 애플리케이션 인스턴스나 리소스에서 나온 이벤트의 시퀀스를 표시하는 데 주로 사용된다.

예를 들어 로그 스트림은 특정 호스트의 Apach 액세스 로그에 연결될 수 있다.

로그 그룹은 하나 이상의 로그 스트림으로 이루어져 있다. 람다는 내부적으로 동시-실행(concurrent Execution)이라고 불리는 작은 인스턴스 단위로 이루어져 있다. 람다는 동시-실행 개수만큼 별령실행을 지원하며, 각각의 동시 실행은 하나의 로그 스트림에 순차적으로 로그를 기록한다.

람다는 발생하는 트래픽의 증가와 감소에 따라 새로운 동시실행의 생성 및 파괴를 반복한다.(auto scaling).

새로운 동시 실행이 생성된면 그에 다라 새로운 로그 스트림이 생성되며 동시 실행이 파괴되면 로그 스트림에 더이상 로그가 기록되지 않는다.

Reference

[AWS 람다 로그 잘 남기고 추적하기(AWS Lambda Logging)](https://asleea88.medium.com/aws-%EB%9E%8C%EB%8B%A4-%EB%A1%9C%EA%B7%B8-%EC%9E%98-%EB%82%A8%EA%B8%B0%EA%B3%A0-%EC%B6%94%EC%A0%81%ED%95%98%EA%B8%B0-aws-lambda-logging-f097dddbbc52)

[Amazon CloudWatch 개념](https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/logs/CloudWatchLogsConcepts.html)
