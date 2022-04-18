# apt, apt-get


apt-get은 Advanced Packaging Tool의 약자로  
우분투를 포함한 데비안 계열의 리눅스에서
사용되는 패키지 관리 툴이다.  
터미널을 통해 간편하게 패키지를 설치할 수 있어서  
GUI 기반의 패키지 설치 도구보다 더 널리, 많이 사용되는 소프트웨어다.  


apt-get이랑 apt가 있는데 결론부터 말하자면,  
그닥 차이는 없다.  
apt-get이 스크립트를 작성할 때는 더 유리하고  
apt는 더 예쁘고 유익한 메시지를 출력받을 수 있다.  

- apt-get  
인증된 소스에서 패키지 및 패키지에 대한 정보를  
검색하고 종속성과 패키지를 설치, 업그레이드, 제거를 한다.
- apt  
더 나은 대화식 사용을 위한 고급 명령 줄 인터페이스이다.  

그리고, 구글에서 검색해서 패키지들을 검색할 때에 apt-get update, upgrade라는 것들이 많이 보이는데  
이에 대해 구분할 필요가 있다.  

- apt-get update  
운영체제에서 사용 가능한 패키지들과 그 버전에대한 정보를 업데이트하는 명령어.  
설치되어 있는 패키지들을 최신으로 업데이트 하는 것이 아닌, **설치가능한 리스트**를 업데이트한다.

**apt-get install 명령을 이용해서 특정 패키지를 설치 할 수 없는 경우, 최신으로**  
**패키지 리스트를 업데이트해야 할 필요가 있다.**

- apt-get upgrade  
운영체제에 apt-get install 명령으로 설치한 패키지들을  
최신 버전으로 업그레이드하는 명령어다.  
apt-get upgrade 명령을 이용하면 apt-get update로 가져온 각 패키지들의 최신 버전에 맞게 업그레이드를 한다.  
**즉, apt-get install로 설치한 패키지들을 apt-get update를 한 시점의 리스트에 있는**  
**버전에 맞게 버전을 업그레이드 하는 것이다.**  
**apt-get upgrade로 최신버전이 설치되지 않았다면 apt-get update를 해줄 필요가 있다.**  
**특별한 이유가 없다면 `sudo apt-get update && sudo apt-get upgrade`를 하는 습관을 가지자.**  
**apt의 경우도 마찬가지다. `sudo apt update && sudo apt upgrade`를 하도록 하자.**


참조  
[apt-update, apt-upgrade 차이](https://dev.plusblog.co.kr/22)  
[apt, apt-get 차이](https://ksbgenius.github.io/linux/2021/01/13/apt-apt-get-difference.html)  
[[Ubuntu 20.04 LTS]apt와 apt-get의 차이점](https://pstudio411.tistory.com/entry/apt%EC%99%80-apt-get%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)