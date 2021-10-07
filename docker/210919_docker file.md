# docker file이란

코드 형태의 텍스트 문서이며  
여러가지 지시어를 사용하여 이미지를 제작할 수 있다.  
일반적으로 이미지를 생성할 때 commit, import보다  
Docker file을 사용한다.(실제 업계에서도 그런듯하다)  

이유는 아래와 같다.  
1. 코드형태로 되어있어서 버전 관리가 용이하다.  
2. 이미지의 기능을 파악하기 쉽다  
3. commit이나 import로 지정하기 어려운 CMD ENTRYPOINT 등의 유용한 기능이 있다.  

- Bulid Docker 이미지 제작

`build [option] PATH`로 이미지를 제작한다.  
-t 옵션을 사용하여 이미지 이름을 지정할 수 있다.  
PATH는 dockerfile의 경로를 써주면 된다.  

아래의 예제를 보면 . 으로 PATH를 표현해준 것이다.  
dockerfile이 현재 위치에 있기 때문이다.   

예제
```
docker build -t nobreak/docker:centosweb .
```

- 도커 파일 명령어

    FROM: 베이스 이미지를 골라주는 커맨드(이미지를 상속받는 느낌)  


    RUN: 커맨드를 실행시켜주는 커맨드  
    예를 들어 파이썬이 구동되는 환경을 조성했다고 하면  
    거기서 필요한, pip list, pip install, git clone 등의 명령어를 컨테이너에서 실행시킬 수 있는 명령어가  
    RUN이다.  


    WORKDIR: cd Documents 에서 쓰는 cd와 비슷하다.  
    폴더 안에 들어가는 명령어다.  
    차이점은 cd는 상대경로이지만, WORKDIR는 절대경로다.  


    EXPOSE: 포트를 사용할 수 있도록 노출시키는 명령어다.  

    
    CMD: 필요한 커맨드, 항상 컨테이너가 실행될때마다 필요한 커맨드를 적는 명령어다.  
    예를 들자면 pipenv shell, python manage.py runserver 등



참조: [도커파일이란?](https://rich-developer.tistory.com/32)