## mkdir -p

`mkdir -p level/log` 를 실행하면 level 디렉토리가 생성되어 있지않아도 level디렉토리와

level디렉토리 안에 log디렉토리가 생성된다.

level디렉토리가 있을 경우는 그 안에 log디렉토리만 생성된다.

level디렉토리가 생성되어 있지 않고 -p 옵션없이 `mkdir level/log` 를 실행할 경우는

`mkdir: cannot create directory ‘level/log’: No such file or directory` 라는 에러가 나온다.

[[리눅스 명령어]리눅스 파일 및 디렉토리 생성 및 복사, 이동,삭제 (touch,mkdir,cp,mv,rm)](https://marine1188.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%A6%AC%EB%88%85%EC%8A%A4-%ED%8C%8C%EC%9D%BC-%EB%B0%8F-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EC%83%9D%EC%84%B1-%EB%B0%8F-%EB%B3%B5%EC%82%AC-%EC%9D%B4%EB%8F%99%EC%82%AD%EC%A0%9C-touchmkdircpmvrm)
