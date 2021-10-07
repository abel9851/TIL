# docker compose란

참조 도커 컴포즈의 예제를 본다면  
도커를 사용해서 개발환경을 구축하면  
장황한 옵션이 필요하고 앱 컨테이너와 데이터베이스 컨테이너의 실행순서에 제약을 받는다.  

도커가 출시된지 얼마 지나지 않아  
독립된 개발 환경을 빠르게 구성할 수 있는 
피그 프로젝트가 선보였습니다.  
이때만 해도 도커 명령을 실행하는 서드파티 같은 도규였으나  
피그가 인기를 얻자, 도커에서는 피그 프로젝트를 흡수하여 도커 컴포즈 라는 이름의 도구로 만들어 버린다.  

도커 컴포즈를 사용하면 컨테이너 실행에 필요한 옵션을 docker-compose.yml이라는 파일에 적어둘 수 있고, 컨테이너 간 실행 순서나 의존성도 관리할 수 있다.  

docker-compose.yml 파일은
장황한 도커 실행 옵션을 미리 적어둔 문서라고 볼 수 있다.  


참조:[도커 컴포즈(예제: 장고)](https://www.44bits.io/ko/post/almost-perfect-development-environment-with-docker-and-docker-compose)  