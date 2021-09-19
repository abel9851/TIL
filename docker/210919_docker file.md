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

참조: [도커파일이란?](https://rich-developer.tistory.com/32)