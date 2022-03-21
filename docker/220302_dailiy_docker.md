https://www.popit.kr/web-scraping-by-selenium/
https://dvpzeekke.tistory.com/m/2
https://dvpzeekke.tistory.com/1
https://taebbong.github.io/2019/05/19/2019-05-20-selenium-deploy-post/
https://velog.io/@ywoosang/asd
https://velog.io/@ckstn0777/%EB%8F%84%EC%BB%A4%ED%8C%8C%EC%9D%BCDockerfile
https://velog.io/@ckstn0777/%EB%8F%84%EC%BB%A4%ED%8C%8C%EC%9D%BCDockerfile
https://bluese05.tistory.com/77
https://qiita.com/reflet/items/4b3f91661a54ec70a7dc
https://kibua20.tistory.com/92
https://www.44bits.io/ko/post/easy-deploy-with-docker
https://blog.d0ngd0nge.xyz/docker-dockerfile-write/
https://velog.io/@ywoosang/asd
https://velog.io/@peeeeeter_j/Docker%EC%97%90%EC%84%9C-Ubuntu-20.04-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
https://marsquai.com/e7d96edc-b236-41c5-83e3-f1980c9f99eb/5323b331-2c8d-4228-a104-7bce0f90114d/bc1bf9fe-9870-4491-b720-cf5d88ef82fa/

https://www.google.com/search?q=RUN%2C+CMD+%EC%B0%A8%EC%9D%B4&oq=RUN%2C+CMD+%EC%B0%A8%EC%9D%B4&aqs=chrome..69i57j0i5i30l2.5266j0j7&sourceid=chrome&ie=UTF-8

https://jh-industry.tistory.com/14


https://qiita.com/akirakoyasu/items/7b7e0938ad6d36caf4be
https://github.com/akirakoyasu/docker-scraping
https://velog.io/@ywoosang/asd
https://q-three.com/archives/1031
https://roseline124.github.io/kuberdocker/2019/07/17/docker-study02.html
https://nobase-dev.tistory.com/34

https://captcha.tistory.com/49
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=complusblog&logNo=220974632766

https://brunch.co.kr/@hopeless/10

https://isgs-lab.com/368/

https://jyami.tistory.com/114

도커안에 네트워크

https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-create.html
https://wooono.tistory.com/337

 ${LAMBDA_TASK_ROOT} ディレクトリ? -> 킨들 람다 책 참고

-------------------------------------------------------------------
3/3 목요일 내용

COPY mansionmarket_docker_lambda.py ${LAMBDA_TASK_ROOT}이란,
mansionmarket_docker_lambda.를 ${LAMBDA_TASK_ROOT}이란 폴더, 여기서는 저 환경변수에 설정된 루트에 있는 디렉토리에 저장한다는 거.

LAMBDA_TASK_ROOT란, lambda관련 코드가 배치되어 있는패스.
LAMBDA_RUNTIME_DIR은, lambda런타임관련 라이브러리의 장소, 예를 들자면, node.js라면 aws-sdk, python이라면 boto3가
이 장소에 인스톨 된다. 


https://coding-factory.tistory.com/303 - 컴파일러랑 인터프리터 차이
인터프리터는 고급언어로 작성된 소스코드를 번역하고 동시에 프로그램을 한줄 단위로 즉시 실행시키는 프로그램.
목적 프로그램은생성되지 않음. 번역속도는 빠르지만 프로그램 실행시, 매번 번역해야함으로 실행속도느 느리다.
https://nxmnpg.lemoda.net/ko/1/sh - sh 명령어에 대한 설명 sh은 인터프리터!


 irrelevant 단어 뜻  무관한, 상관없는


 RUN yum install -y software-properties-common의 software-properties-common은 yum에는 없다.
 software-properties-common은 ppa 퍼스널 패키지 아카이브 


https://qiita.com/ponsuke0531/items/58910bd51f22b04a50c3 centOS, ubuntu에 도커 설치방법
 sudo yum install -y yum-utils device-mapper-persistent-data lvm2


 Non-fatal POSTIN scriptlet failure in rpm package 7:device-mapper-event-1.02.170-6.amzn2.5.x86_64에러는 무시할 수 있다.
 https://qiita.com/rk05231977/items/8784d6a48d984514806d 여기 참조


 equivalent 동등한


 https://qiita.com/Esfahan/items/0071acc11377ae3f4e4a
 우분투와 아마존 리눅스는 패키지 관리 프로그램이 다르기때문에 
 크롬을 다른 방법으로 설치해야한다.

 아마존 리눅스 설치시 설정되어있는 현디렉토리는 /var/task