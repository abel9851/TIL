# 리눅스 환경변수(path) 설정


어떤 프로그램이 돌아가게 해주는 실행파일의 경로를  
잡아주는 걸 환경 변수 세팅이라고 하는데  
리눅스에는 다양한 환경변수들이 있다.  
환경변수둘의 경로인 path를 출력하는 명령어는 echo $PATH다.  
path들은 전부 :(콜론)으로 구별되어 있다.  

환경변수를 새로 등록하거나 편집하는 명령어는 export PATH=새로 등록할 프로그램의 주소이다.  
한가지 주의해야 할 점은 위의 명령어처럼 바로 해버리면  
기존 환경변수에 덮어쓰기가 되버린다.  
기존 환경 변수에 이어서 새 환경변수를 등록하기 위한 명령어는  
`export PATH=$PATH:새로 등록할 프로그램의 주소`이다.  

path가 적용된걸 확인하려면  
bash에서는 `source ~/.bashrc`를 사용하면 되고  
Zsh이라면 `source ~/.zshrc`를 사용하면 된다.  


현재 사용하고 있는 쉘을 확인하려면  
`grep [사용자 이름]/etc/passwd`, 혹은 `echo $SHELL`를 실행하면 알수 있다.  
현재 설치되엉 있는 쉘을 확인하려면  
`cat /etc/shells`을 실행하자.  
쉘의 설정(path 변경이라던가)을 반영하는 방법이다.  
rc는 run command 혹은 run configuration이라는 의미인듯 하다.  

환경변수를 중복으로 넣었다면  
아래의 코드를 사용하자. 참조에 있는 [$PATH에서경로 지우기/중복경로지우기](#PATH에서-경로-지우기-/-중복-경로-지우기)에 들어가서 확인해봐도 좋다.  
다른 방법도 쓰여있다.  


중복경로지우기  
`PATH="$(perl -e 'print join(":", grep { not $seen{$_}++ } split(/:/, $ENV{PATH}))')"`


참조  
[리눅스 환경변수(path) 설정](https://m.blog.naver.com/occidere/220821140420)  
[리눅스 BASH의 source의 의미](https://javafactory.tistory.com/640)  
[현재 사용하고 있는 쉘 확인하기](https://coding-factory.tistory.com/507)  
[현재 쉘 확인](https://zetawiki.com/wiki/%ED%98%84%EC%9E%AC_%EC%82%AC%EC%9A%A9%EC%A4%91%EC%9D%B8_%EC%89%98_%ED%99%95%EC%9D%B8_$SHELL)  
[변경내용을 쉘에 즉시 반영](https://atmarkit.itmedia.co.jp/ait/articles/1712/21/news015.html)  
[.bash_profile, .bashrc 차이점](https://iotengineer.tistory.com/2)  
[type 명령어](https://webdir.tistory.com/147)  
[PATH에서 경로 지우기 / 중복 경로 지우기](https://wooriel.tistory.com/56)