# Terraform

IaC도구 중 서버 프로비저닝 도구(서버와 인프라 구성에 초점)으로  
GUI나 웹 콘솔을 사용해서 서비스 실행에  
필요한 리소스를 관리하는 대신  
필요한 리소스들을 선언적인 코드로 작성해 관리할 수 있도록 해준다.  


- terraform 공부방법  
    1. 용어 정리
    2. 회사 terraform code 분석
    3. 다른 개발자의 코드 분석 (terra import 사용해보는것도 좋음.)


- terraform 설치(window)  
바이너리 파일로 받은 다음에, 제어판-시스템-고급 시스템 설정-환경변수-시스템변수로 들어가서  
path에 편집을 누르고, terraform.exe의 path를 등록하면 된다.  
cmd에서 c드라이브 위치에서 terrform version을 하면 잘 되지만  
vsc에서 terraform version을 할 경우, 아래와 같은 에러가 나온다.  
```
terraform 명령이 현재 위치에 있지만 이 명령을 찾을 수 없습니다. Windows PowerShell은 기본적으로 현재 위치에서 명령을 로드하지 않습니다. 이 명령을 신뢰하는 경우 대신 ".\terraform"을(를) 입력하십시오. 자세한 내용은 "get-help about_Command_Precedence"를 참조하십시오.
```
.\terraform을 하면 실행이 되지만, 왜 terraform으로 하면 안되는지 이유를 모르겠다.  
권한 문제인 것 같기도 한데, 찾아봐서 해결하고 싶다.  