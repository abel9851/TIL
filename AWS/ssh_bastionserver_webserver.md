## AWS ssh와 배스천 서버(EC2)를 이용한 웹서버(EC2) 접속

퍼블릭 서브넷에 배스천 서버, 프라이빗 서브넷에 웹서버가 있는 상황이다.
배스천 서버, 웹서버 전부 ssh의 비밀키, 공개키를 설정했고 같은 비밀키,공개키를 공유하고 있다.

웹서버의 sg는 default(VPC안의 모든 리소스 접근 허가), 배스천 서버는 default+ssh(임의의 위치에서 ssh를 통한 접근 허가)인 상태이고, 아직 웹 서버에는 ELB는 설정하지 않았다.

이 상황에서 배스천 서버에서 웹서버로 접속하기 위해서는

1. 개발머신(로컬)에서 ssh의 비밀키(개발머신에 있음)를 이용해 배스천 서버에 접속한다.

   ssh -i myname.pem ec2-user@public_ip

2. 배스천 서버에 접속했으면 또다시 ssh를 통해 웹서버에 접속한다.

   이때 사전에 웹서버에 공개키가 전송되어 있어야하고(AWS 콘솔을 사용하면 이미 전송되어 있음), 비밀키는 배스천 서버에 전송되어 있어야한다.

특히 두 번째의 비밀 키 파일 운영과 관련한 것은 보안적 측면에서도 가능한 한 피해야 한다.

그러므로 ssh 명령어가 제공하는 **다단계 연결(cascading connection)** 기능을 이용해 이 문제들을 해결한다.

다단계 연결을 하기 위해서는 .ssh 디렉토리에 config 파일을 생성하고 내용을 설정해줘야한다.

```bash
Host bastion # ssh 명령어를 실행할때 쓰는 별명(alicas) ex) ssh bastion
    Hostname public_ip # 연결할 서버의 IP 주소 또는 서버 이름을 지정한다.
											 # 주의할 점은 여기에는 연결 대상 서버에 직접 접근하는 서버의 정보를 지정한다는 점이다.
		                   # 예를 들어 웹 서버의 경우는 점프서버로부터 연결하므로 vpc안에서 이용하는 private ip를 지정한다.
    User ec2-user      # User에는 연결할 떄의 사용자 이름을 지정한다.
    IdentityFile 비밀키의 위치 # 상대경로던 절대경로던 둘 다 가능

Host web01
    Hostname private_ip
    User ec2-user
    IdentityFile 비밀키의 위치
    ProxyCommand ssh bastion -W %h:%p # 경유하는 점프서버의 정보를 지정한다.
																			# 점프서버 자체에는 이 정보는 불필요하다.
																			# 윈도우에서는 ssh.exe 별명, 리눅스, 맥에서는 ssh 별명이다.

Host web02
    Hostname private_ip
    User ec2-user
    IdentityFile 비밀키의 위치
    ProxyCommand ssh bastion -W %h:%p
```

config파일은 .ssh디렉토리 안에 있어야한다.

ssh 명령어를 실행하거나 config파일을 놓은 디렉토리가 .ssh이긴 한데 명령어가 작동하는 .ssh 디렉토리가 아니라 별도로 만든 .ssh디렉토리였을 경우, 파일패스를 재설정해주거나

config파일을 ssh 명령어가 작동하는 파일패스의 .ssh디렉토리에 놓아야한다.

그렇지 않으면 아래와 같이 에러가 발생한다.

`ssh: Could not resolve hostname bastion: Name or service not known`

`ssh: Could not resolve hostname web01: Temporary failure in name resolution`

`ProxyCommand ssh bastion -W %h:%p` 의 %h는Hostname을, %p는 Port는 나타내는 플레이스 홀더다.

%p는 지정하지 않으면 default는 22번이다.

`%h:%p` 는 bastion이 아닌, web01나 web02의 Hostname과 Port는 의미한다.

즉, ssh bastion으로 bastion서버에 접속하고, %h는 web01나 web02, %p는 default로 22번이니까 ssh로 접속한다는 뜻이다.

-W 옵션은 클라이언트의 stdio를 서버의 단일 포트 포워드에 연결한다.

이를 통해 예를들어, ssh를 ProxyCommand로 사용하여 중간 서버를 통해 연결을 라우팅할 수 있다.

Reference

[ProxyCommand を使って踏み台(Bastion)経由で直接 ssh/scp する | DevelopersIO](https://dev.classmethod.jp/articles/direct-ssh-by-proxycommand/)
