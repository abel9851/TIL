## 보안그룹

서브넷, 라우팅 테이블, 인터넷 게이트웨이, NAT게이트웨이까지 설정하면

이 상태에서는 인터넷을 통해 모든 리소스에 접근할 수 있다. VPC 안의 리소스를 보호하려면 외부로부터의 접근에 제한을 걸어야 한다.

이런 접근 제한을 수행하기 위해 보안그룹(security group)이라는 기능을 제공한다.

보안 그룹에서는 외부로부터의 접근을 다음과 같은 두 가지 개념을 이용해 제어할 수 있다.

- 포트번호
- IP주소

포트번호를 이용한 제어에서는 제공하는 서비스의 종류를 지정할 수 있다.

예를 들어 웹 서비스에 접근할 때 쓰이는 80번(HTTP)과 443번(HTTPS), 또는 서버에 접속해서 유지 보수할 때 쓰이는 22번(SSH)등을 많이 지정한다.

IP 주소를 이용한 제어에서는 접속원을 지정할 수 있다. 소속되뉴회사나 학교 등 조직 내 네트워크에서 작업할 경우 인터넷에 접속하는 IP 주소는 보통 한정된다.

이러한 IP주소들을 지정함으로써 조직 외부로부터의 접근을 막을 수 있다.

보안 그룹 설정 항목

| 항목           | 값                         | 설명                                                                                                                                                                               |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 보안 그룹 이름 | sample-sg-bastion          | 보안 그룹에 붙이는 이름                                                                                                                                                            |
| 설명           | for bastion server         | 보안 그룹의 대상이나 용도 설명                                                                                                                                                     |
| VPC            | sample-vpc                 | 보안 그룹을 생성할 VPC                                                                                                                                                             |
| 인바운드 규칙  | 유형: SSH, 소스: 0.0.0.0/0 | 유형에는 외부로부터의 접속을 허가하는 포트번호 또는 프로토콜을 지정, 소스에는 외보루벝의 접속을 허가하는 IP주소를 지정. 0.0.0.0/0은 임의의 위치(즉, 모든 위치)로부터의 접속을 허가 |