## host header injection

host header는 서버의 도메인 네임과 서버가 현재 리스닝 중인 TCP포트를 지정한다.

포트가 지정되지 않는다면 요청받은 서버의 기본 포트를 의미한다.(HTTP URL은 80)

host header는 반드시 하나가 존재해야한다.

웹 서버는 브라우저의 HTTP Request Header에서 host header를 통해 어떤 가상 호스트의 컨텐츠를 서비스 할지 결정한다.

ip를 통해 서버에 왔지만 헤더를 보고 어떤 컨텐츠를 서비스할지 판단하는 것이다.

서버 안에 여러개의 웹 애플리케이션이 있을 수 있으니까말이다.

host header의 목적은 클라이언트가 커뮤니케이션 하길 원하는 백엔드 컴포넌트를 확인하는 것을 돕기 위해서이다.

request에 host header가 없거나 host header가 어떤 방법으로 인해 잘못된 경우, 애플리케이션에 들어온 요청을 라우팅할 때 문제를 야기할 수 있다.

역사적으로 이 모호성은 각 ip주소가 단일 도메인에 대한 컨텐츠만 호스팅하기 때문에 존재하지 않았지만, 요즘은 클라우드 기반 솔루션, 관련 아키텍처의 대부분을 아웃소싱하는 추세가 계속 증가하고 있기 때문에 동일한 IP주소에서 여러 웹사이트와 애플리케이션에 액세스 할 수 있는 것이 일반적이다.

이 접근 방식은 IPv4 주소 고갈로 인해 인기가 높아졌다.

동일한 IP주소를 통해 여러 응용 프로그램에 액세스할 수 있는 경우 이는 가장 일반적으로 다음 시나리오 중 하나의 결과다.

가상호스팅, 중개자를 통한 트래픽 라우팅.

로드 밸런서는 각 리퀘스트가 라우트되어야할 적절한 백엔드를 알기위해 host header가 필요하다.

브라우저가 요청을 보낼 때 대상 URL은 특정 서버의 IP 주소로 확인됩니다. 이 서버는 요청을 수신하면 호스트 헤더를 참조하여 원하는 백엔드를 결정하고 그에 따라 요청을 전달한다.

여기서 문제. 어떻게해서 바이낸스같은, 다른 도메인이 장고에 도착할수 있을까.

그것은 로드밸런서가 ip주소로 온 리퀘스트에 대한 host헤더를 분별하지 않고 있기 때문이다.

(지금 내 지식으로는 상식밖이지만 이렇게 밖에 설명이 안되는듯?)

host header공격은 호스트 헤더의 값을 안전하지 않은 방식으로 다루고 있는 취약한 웹사이트들을 이용하는 공격이다.

만약 서버가 무조건적으로 호스트헤더를 신뢰하면, 그리고 적절하게 호스트헤더를 회피하거나 유효성검사를 하지 않는다면, 공격자는 이 인풋을 서버 사이드의 행동을 조작할수 있는 위험한 페이로드들을 주입하는데 사용할 수 있다.

이것은, 일단 로드 밸런서에 무조건 host header가 도착한다는 구조이기 때문이다.

로드밸런서나, 애플리케이션에서 관리하지 않는다면 이 호스트 헤더를 이용해서 서버의 행동을 조작할수 있게 된다.

Off-the-shelf(기성품) 웹 애플리케이션은 일반적으로 설정파일을 수동적으로 직접 지정하지 않는다면 앱플리케이션 자신이 배포된 도메인이 무엇인지를 모른다.

예를들어 이메일에 포함된 절대경로 URL을 생성하기 위해 현재 도메인을 알아야하는 경우, 호스트헤더에서 도메인 검색에 의존할 경우가 있다.

```html
<a href="https://_SERVER['HOST']/support">Contact support</a>
```

호스트 헤더는 실제로 유저가 제어할 수 있으므로 이 방법은 여러 문제를 유발할 수 있다.

- 웹 캐시 중독
- 특정 기능의 비즈니스 로직 결함
- 라우팅 기반 SSRF
- SQL 주입과 같은 전형적인 서버 측 취약점

이러한 호스트 헤더 취약점은 일반적으로 유저가 헤더를 제어할 수 없다는 잘못된 가정으로 인해 발생한다. 공격자가 Burp Proxy와 같은 도구를 사용하여 이를 쉽게 수정할 수 있음에도 불구하고 이것은 Host header에 대한 무조건적인 신뢰를 생성하고 부적절한 유효성 검증 또는 값의 이스케이프를 초래한다.

호스트 헤더 자체가 더 안전하게 처리되더라도 들어오는 요청을 처리하는 서버의 구성에 따라 다른 헤더를 삽입하여 호스트를 잠재적으로 무시할 수 있다.

**이러한 호스트 헤더 공격을 방지하기 위해 장고에서는 allowed hosts를 설정파일에 제공한다.**

**이 접근방식은 호스트 헤더 주입공격에 대한 노출을 줄인다.**

Reference

[HTTP Host header attacks | Web Security Academy](https://portswigger.net/web-security/host-header)

[가상 호스트(Vritual Host)와 SNI(Server Name Indication)](https://www.lesstif.com/ws/vritual-host-sni-server-name-indication-43843982.html)

[가상 호스팅 그리고 Host 헤더(Virtual Hosting and Host Header)](https://eminentstar.tistory.com/46)

[Password reset poisoning | Web Security Academy](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning)

## AWS ELB django ALLOWED HOSTS invalid host header

현재 ELB의 healthcheck를 django 애플리케이션에 하면 특정 ip주소가 Invalid HTTP_HOST header라는 에러가 뜬다.

이 ip는 타겟(elb의 타겟그룹), health check port의 ip주소가 아니라, load balncer node와 listner port의 ip다.

```
**Target fails HTTP or HTTPS health checks due to host header mismatch**
The HTTP host header in the health check request contains
the IP address of the load balancer node and the listener port,
not the IP address of the target and the health check port.
If you are mapping incoming requests by host header,
you must ensure that health checks match any HTTP host header.
Another option is to add a separate HTTP service on a different port and
configure the target group to use that port for health checks instead.
Alternatively, consider using TCP health checks.
```

load balncer node:

listner port: 리스너란,실제로 클라이언트로부터 처리를 받는 기능이다. 포트는 80(HTTP), 443(HTTPS)를 사용하는데 현재 나오고 있는 Invalid HTTP_HOST header에서는 8002번이므로, listner port는 아닌 것 같다.

```
2022-11-01 11:30:55,974
[ERROR] 48 140390416250688/usr/local/lib/python3.9/site-packages/django/core/handlers/exception.py :
99 Invalid HTTP_HOST header: '10.0.3.25:8002'. # 대상 그룹의 IP주소와 health check의 port
You may need to add '10.0.3.25' to ALLOWED_HOSTS.
```

Reference

[How Elastic Load Balancing works](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html)

[Django ALLOWED_HOSTS with ELB HealthCheck](https://stackoverflow.com/questions/27720254/django-allowed-hosts-with-elb-healthcheck)

[Troubleshoot your Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-troubleshooting.html#host-header-mismatch)

## host header attack

호스트 헤더에 서버 측의 동작을 조작하는 페이로드를 삽입할 수 있다.

서버에서 호스팅하는 백엔드가 여러개 일 경우,
서버는 호스트 헤더를 보고 백엔드(애플리케이션)를 결정하고 그 백엔드에서 응답을 하게 된다.

서버가 백엔드마다 호스트 헤더를 지정하지 않고 있고, 단일 백엔드일 경우도 마찬가지로 호스트 헤더를 지정하지 않고 유효성 검사도 하지 않고 있을 경우, 공격자는 호스트헤더에 페이로드를 삽입해
서 백엔드를 조작할 수 있다.

옛날에는 이런 문제는 발생하지 않았지만 지금에 이르러서는 하나의 IP에 여러 도메인을 사용하는게 흔하기 때문에 발생하고 있다. ex. 가상 호스팅, 리버스 프록시, 로드 밸런서의 트래픽 라우팅 등

## **HTTP 호스트 헤더 공격을 방지하는 방법**

HTTP 호스트 헤더 공격을 방지하기 위해 가장 간단한 방법은 서버 측 코드에서 호스트 헤더를 함께 사용하지 않는 것입니다. 각 URL이 실제로 절대적이어야 하는지 여부를 다시 확인하십시오. 상대 URL을 대신 사용할 수 있다는 것을 종종 알게 될 것입니다. 이 간단한 변경은 특히 웹 캐시 중독 취약점을 방지하는 데 도움이 될 수 있습니다.

HTTP 호스트 헤더 공격을 방지하는 다른 방법은 다음과 같습니다.

### **절대 URL 보호**

절대 URL을 사용해야 하는 경우 구성 파일에서 현재 도메인을 수동으로 지정해야 하며 Host 헤더 대신 이 값을 참조해야 합니다. 이 접근 방식은 예를 들어 암호 재설정 중독의 위협을 제거합니다.

### **호스트 헤더 확인**

호스트 헤더를 사용해야 하는 경우 올바르게 유효성을 검사해야 합니다. 여기에는 허용된 도메인의 화이트리스트에 대해 확인하고 인식할 수 없는 호스트에 대한 요청을 거부하거나 리디렉션하는 작업이 포함되어야 합니다. 이를 수행하는 방법에 대한 지침은 프레임워크 설명서를 참조해야 합니다. 예를 들어 Django 프레임워크는 `ALLOWED_HOSTS`설정 파일에 옵션을 제공합니다. 이 접근 방식은 호스트 헤더 주입 공격에 대한 노출을 줄입니다.

### **호스트 재정의 헤더를 지원하지 않음**

특히 이러한 공격을 구성하는 데 사용할 수 있는 추가 헤더를 지원하지 않는지 확인하는 것도 중요합니다 `X-Forwarded-Host`. 기본적으로 지원될 수 있음을 기억하십시오.

### **허용된 도메인 허용**

내부 인프라에 대한 라우팅 기반 공격을 방지하려면 허용된 도메인의 화이트리스트에만 요청을 전달하도록 **로드 밸런서 또는 리버스 프록시를 구성해야 합니다.
(찾아보고 사용해보자. 혹은 gunicorn에 disallowed hosts, allowed hosts가 있는지 확인해보자)**

**(AWS ELB의 경우, ECS 컨테이너(django)에 health check를 ECS 컨테이너의 private IP로 하고 있고, 이때 host header에 private IP가 값으로 지정된다. django의 allowed hosts에 지정하면 해결될지도 모르지만 1. ecs 컨테이너를 배포할때마다 private IP가 바뀌기 때문에 고정된 private IP를 설정해도 의미가 없다. 즉, ecs 컨테이너가 배포될때마다 django의 allowed hosts에 배포된 ECS컨테이너의 private IP를 설정해줘야하는데, 이미 배포된 다음에는 django의 코드를 바꿀 수 가 없으므로 이것은 하기가 힘들다. 컨테이너 배포 후 private IP가 지정된다→컨테이너가 만들어진 후 배포되기 때문에 컨테이너가 만들어질 때 이미 django의 code가 포함되있기 때문에 배포 후에 수정해야한다. 하지만 배포된 후 직접 코드를 수정하는 것은 번거로울 뿐더러 편집기(vi,vim,nano 등)가 없으면 수정을 할 수 없다. 2. ELB의 health check는 ELB가 하는 것이다. ELB에 들어오는 요청이 들어오는 도메인만 화이트 리스트에 넣을 수 있는 경우에는 ELB가 health checkg할 때 쓰는 private IP를 지정할 수 없으므로 문제가 된다. 그리고 이것 또한 화이트 리스트에 고정된 private IP를 지정하게 된다면 배포마다 ECS컨테이너의 private IP가 달라지기 때문에 의미가 없다.
확인해야 할 것은, ELB 스스로 컨테이너에 health check를 할 때 사용하는 private IP를 고정된 도메인으로 바꿀수 있는지다.
화이트 리스트에 들어있지 않은 도메인을 disallowed하는 것이라면 ELB가 health check를 하는 것도 disallowed, 즉 block하는 것이기 때문에 이건 health check를 안하는 것과 동일한 게 되므로 의미가 없다. 그런 이유로 웹서버나 was에서 allowed hosts, disallowed hosts를 설정할 수 있는지 찾아보는게 좋을 것 같다. 현재 nginx는 사용하고 있지 않으니 was인 gunicorn의 문서에서 찾아보는 게 좋겠다.)**

### **내부 전용 가상 호스트에 주의**

가상 호스팅을 사용하는 경우 공개 콘텐츠와 동일한 서버에서 내부 전용 웹사이트 및 애플리케이션을 호스팅하는 것을 피해야 합니다. 그렇지 않으면 공격자가 호스트 헤더 조작을 통해 내부 도메인에 액세스할 수 있습니다.

Reference

[HTTP Host header attacks | Web Security Academy](https://portswigger.net/web-security/host-header)

[Django ALLOWED_HOSTS with ELB HealthCheck](https://stackoverflow.com/questions/27720254/django-allowed-hosts-with-elb-healthcheck)
