# terraform 용어정리  
- Provider  
테라폼과 외부 서비스를 연결해주는 기능을 하는 모듈.  
예를 들어 테라폼으로 AWS서비스의 컴퓨팅 자원을  
생성하기 위해서는 AWS 프로바이더를 먼저 셋업해야한다.  
프로바이더로는 AWS, GCP, 애저, 깃허브, 데이터도그, 데이터베이스, 도커 등등이  
있다.


- Resource  
리소스란 특정 프로바이더가 제공해주는 조작 가능한 대상의 최소단위.  
예를 들어 AWS 프로바이더는 aws_instance리소스 타입을 제공하고  
이 리소스 타입을 사용해 Amazon EC2의  
가상머신 리소스를 선언하고 조작하는 것이 가능.


- HCL(Hashicorp Configuration Languuage)  
HCL은 테라폼에서 사용하는 설정언어.  
테라폼에서 모든 설정과 리소스 선언은 HCL을 사용해 이루어진다.  
테라폼에서 HCL파일의 확장자는 .tf를 사용한다.  

- Plan  
테라폼 프로젝트 디렉토리 아래의 모든 .tf 파일의 내용을  
실제로 적용가능한지 확인하는 작업을 plan이라고 한다.  
테라폼은 이를 terraform plan 명령어로 제공하며,  
이 명령어를 실행하면 어떤 리소스가 생성되고, 수정되고  
삭제될지 계획을 보여준다.  

- apply  
테라폼 프로젝트 디렉토리 아래의 모든 .tf 파일의 내용대로 리소스를 생성, 수정, 삭제하는 일을 apply라고 한다.  
테라폼은 이를 terraform apply 명령어로 제공한다.  
이 명령어를 실행하기 전에 변경 예정 사항은 plan명령어를 사용해 확인할 수 있다.  


참조: [테라폼 기초 튜토리얼](https://www.44bits.io/ko/post/terraform_introduction_infrastrucute_as_code)