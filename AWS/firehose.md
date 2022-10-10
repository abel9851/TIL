## AWS kinesis data firehose란

스트리밍 데이터를 안정적으로 캡처하고 변환하여 데이터 레이크, 데이터 스토어, 분석 서비스에 전달하는 추출, 변환 로드 서비스이다.

input, \*ingest(삼키다- 데이터를 ), transform(옵션), load(운반되는 목적지 예를 들너 s3, redshift), output

개념

Kinesis Datad Firehose delivery stream: kinesis datad FIrehose의 기본 엔티티이다.

kinesis data firehose delievery stream을 생성한 다음에 데이터를 전송하여 kuinesis data firehose를 사용한다.

데이터 생산자(data porducer): 생산자는 레코드를 kinesis data firehose delivery stream으로 보낸다.

예를 들어 로그 데이터를 전송 스트림으로 보내는 웹서버는 데이터 생산자이다.

또한 기존 kinesis 데이터 스트림에서 데이터를 자동으로 읽고 대상으로 로드하도록 kinesis data firehose 전송 스트림을 구성할 수 있다.

record: 데이터 생산자가 kinesis data firehose delivery stream으로 보내는 관심 데이터(data of interest) 레코드의 최대 크기는 1,000kb이다.

버퍼 크 및 버퍼 간격: kinsis data firehose는 수신 스트리밍 데이터를 특정크기 또는 특정 기간동안 버퍼링하여 대상으로 전달한다. 버퍼크기는 MB이고 버퍼 간격은 초단위이다.

예를 들어 데이터를 s3로 보낼 경우, kinesis data firehose를 사용하면 s3버킷으로 전송할 때

데이터 변환이 활성화된 경우, 목적지인 s3이외에도 다른 s3에 변환된 데이터를 목적지로, 변환되지 않은 소스 데이터를 다른 버킷에 백업할수 있다.

aws 리소스에서 바로 s3로 보낼수도 있는 경우도 있지만, firehose사용해서 s3로 보낼수도 있다.

이때 firehose는 데이터를 변환해서 원본을 다른 s3버킷에 넣을수도 있는 장점이 있다.

그밖에 s3에 넣을때 firehose를 사용하는 이유는 데이터를 s3로 스트리밍하면서 **처리 파이프라인 구축없이 데이터를 분석에 필요한 형식으로 변환할 수 있기 때문이다.(데이터 변형)(위에서 말한 내용)**

보안강화도 있다. 네트워크 보안을 실시간으로 모니터링하고 잠재적 위협이 발생할 경우 지원되는 보안 정보 및 관리(SIEM)도구를 사용해 알림을 생성가능하다.

기계학습 스트리밍 애플리케이션 구축이 가능하다.

기계 학습(ML) 모델을 통해 데이터 스트림을 보강하여, 스트림이 대상으로 이동할 때 데이터를 분석하고 추론 엔드포인트를 예측한다.(이부분은 잘 모르겠다.)

지속적인 관리 없이 자동으로 컴퓨팅, 메모리, 네트워크 리소스를 프로비저닝하고 크기를 조정한다.

원시 스트리밍 데이터를 apache parquet와 같은 형식으로 변환하고, 자체 처리 파이프 라인을 구축하지 않고도 스트리밍 데이터를 동적으로 분할한다.

30개 이상의 완전 통합된 AWS 서비스 및 스트리밍 대상(s3, redshifit)에 연결한다.

테스트할때 AWS console로 데이터 제네레이터도 사용해보자.

Reference

[Amazon Kinesis Data Firehose - 스트리밍 데이터 파이프라인 - Amazon Web Services](https://aws.amazon.com/ko/kinesis/data-firehose/)

[Kinesis Data Firehose를 구성하고 Data Generator를 이용한 로드 테스트 방법 | DevelopersIO](https://dev.classmethod.jp/articles/configure-kinesis-data-firehose-and-test-using-data-generator-kr/)

[Amazon Kinesis Data Firehose Firehose란 무엇입니까?](https://docs.aws.amazon.com/ko_kr/firehose/latest/dev/what-is-this-service.html)

[AWS kinesis Firehose 실습 및 예제 코드(Java), 장단점, 가격](https://blog.voidmainvoid.net/295)
