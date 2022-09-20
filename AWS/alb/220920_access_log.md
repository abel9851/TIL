# access log

로드 밸런서로 전송되는 요청에 대한 자세한 정보를  
캡처한 액세스 로그를 제공한다.

각 로그에는 요청을 받은 시간, 클라이언트 IP주소, 대기시간, 요청 경료, 서버 응답 등의 정보가 포함된다.

액세스 로그는 elastic load balancing의 옵션기능이며, 기본적으로 비활성화되어 있다.

액세스 로깅을 활성화하면, elastic load balnacing은 로그를 캡처하고 압축 파일로 지정한 Amazon s3 버킷에 저장한다.

Amazon s3 스토리지 비용은 발생하지만 Amazon s3에 로그 파일을 전송하는데 elastic load blancing에서 사용하는 대역폭에 대해서는 비용이 발생하지 않는다.(자세한 것은 [s3요금](https://aws.amazon.com/jp/s3/pricing/)을 참조.)

로그를 확인하려면 s3에서 다운로드해서 압축을 풀면 된다.

---

## Access log File

Elastic load balancing은 각 로드 밸런서 노드의 로그 파일을  
5분마다 게시한다.  
로드 밸런서는 동일한 기간에 대해 여러 개의 로그를 발행할 수 있다.  
이는 일반적으로 사이트에 트래픽이 높을 때 발생한다.

액세스 로그 파일 이름에는 다음 형식을 사용한다.

```

bucket[/prefix]/AWSlogs/aws-account-id/elasticloadbalancing/region/yyyy/mm/dd/aws-account-id_elasticloadblancing_region_app.load-balance-id_end-time_ip-address-random-string.log.gz

# ex) abc-bucket/backend-lb/AWSlogs/123123/elasticloadbalancing/ap-northeast-1/2022/09/20/123123_elasticloadblancing_ap-northeast-1_app.backend-lb.20220920T0010Z_127.0.0.1_wqe12.log.gz

```

bucket: s3버킷 이름  
prefix: 버킷 prefix(논리 계층). 접두사를 지정하지 않으면 로그가  
버킷의 루트 수준에 배치된다. 지정한 접두사에는 `AWSlogs`을  
포함할 수 없다.  
지정된 버킷 이름과 접두사 뒤에 AWSLogs로 시작하는 파일 이름 부분이 추가된다.  
aws-ccount-id: aws 계정 id
region: 로드 밸런서 및 s3 버킷의 지역
yyyy/mm//dd: 로그가 전달된 날짜.  
load-blancer-id: 로드 밸런서의 리소스 id, 리소스 id에 슬래시(/)가 포함되어 있음녀  
마침표(.)로 바뀐다.  
end-time: 로그 작성 간격이 종료된 날짜와 시간.  
예를 들어 종료시간 20140215T2340Z에는 UTC 또는 Zulu 시간 23:35~23:40에 발생한 요청 항목이 포함된다.  
ip-address: 요청을 처리한 로드 밸런서 노드의 ip주소다,  
내부 로드 밸런서의 경우 ip주소다.  
random-string: 시스템에 의해 생성된 랜덤 문자열

---

## Access log 항목

Elastic Load Blancing은 대상에 도달하지 않은 요청을 포함하여 로드 밸런서로 전송된 요청을 기록한다.  
예를 들어, 클라이언트가 잘못된 형식의 요청을 보내거나  
요청에 응답할 수 있는 제대로 작동하는 대상이 없는 경우에도 요청이 기록된다.  
health check request는 기록하지 않는다.

항목에 대해서는 참조를 보자.

---

참조:  
[Application Load Balancer Access Log](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/load-balancer-access-logs.html)
