## cloudfront

cloudfront란 html, css, js 및 이미지 파일과 같은 정적 및 동적 웹 콘텐츠를 사용자에게 더 빨리 배포하도록 지원하는 웹서비스이다.

CDN 서비스로서, 캐싱을 통해 사용자에게 좀 더 빠른 전송 속도를 제공함을 목적으로 한다.

cloudfront는 전 세계 이곳저곳에 Edge server(location)을 두고 client에 가장 가까운 Edge server를 찾아 latency(원인과 결과 사이의 걸리는 시간)를 최소화시켜 빠른 데이터를 제공한다.

origin server: 원본 데이터를 가지고 있는 서버. 보통 AWS에서의 origin server는 s3, ec2 인스턴스.

edge server= edge location: AWS에서 실질적으로 제공하는 전 세계에 퍼져있는 서버.

edge server에는 요청 받은 데이터에 대해서 같은 요청에 대해서 빠르게 응답해주기 위해 cache 기능을 제공한다.

distribution: CDN에서 사용되어지며 Edge Location들을 묶고 있다는 개념

Regional Edge Caches: edge location과 origin 사이에 있으며 콘텐츠가 캐시가 유지될 정도로 인기 있지는 않아도 캐시는 더 오랫동안 남으며 edge location보다 캐시 스토리지 용량이 더 크다.

REC로 인해 origin에 요청하는 것을 줄여준다.

### 데이터 전송이 발생하는 과정

1. 클라이언트로부터 Edge server로의 요청 발생
2. Edge server는 요청이 발생한 데이터에 대하여 캐싱여부 확인

3-1. 사용자의 근거리에 위치한 Edge server 중 캐싱 데이터가 존재한다면 사용자의 요청에 맞는 데이터 응답.

3-2. 사용자의 요청에 적합한 데이터가 캐싱되어 있지 않은 경우, origin server로 포워딩된다.

1. 요청 받은 데이터에 대해 origin server에서 데이터를 획득한 후, Edge server에 캐싱 데이터를 생성하고, 클라이언트로 응답한다.

### 어떤 종류의 콘테츠를 CDN으로 제공해주나?

Download distribution: HTTP프로토콜을 이요해서 다운로드할 수 있는 일반적인 이미지 혹은 정적파일을 제공

Streaming Distribution: 스트리밍을 위해 사용할 수 있는 HTTP Progressive Download방식이나 RTSP(Real Time Streaming Protocol)을 지원하는 동영상 콘텐츠를 서비스.

### Edge Server의 Cache는 무슨 특징이 있나?

기본적으로 한번 발생한 요청에 대해서는 Edge server에 캐싱된 상태로 저장된다.

Edge server의 기본 TTL은 24시간이고 사용자의 설정에 따라 변경이 가능하다.

(TTL 수정시 Edge server에 반영되는 시간이 한시간 가량 소요된다.)

이러한 캐시 설정 후, 반영시간 때문에 전체 데이터에 대한 TTL을 수정하는게 아닌 각 개별 데이터에 대해서 invaildation API(특정 파일을 캐시에서 삭제하는 기능)을 통해 삭제할 수 있다.

Invaildation API는 동시에 최대 3개의 요청을 발생시킬수 있고 각 요청은 최대 1000개까지 가능하다.

Invaildation API는 Edge Node에 반영되기까지 5-10분 소요된다.

Reference

[Amazon CloudFront란 무엇입니까?](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

[무료 도메인으로 AWS Route53에 도메인을 등록하고 AWS Certificate Manager로 SSL 인증서 설정해 보기 | DevelopersIO](https://dev.classmethod.jp/articles/try-registering-the-aws-route53-domain/)

[AWS - CloudFront란?](https://velog.io/@songa29/AWS-CloudFront%EB%9E%80)

[[AWS] CloudFront 에 대하여](https://bosungtea9416.tistory.com/entry/AWS-CloudFront)
