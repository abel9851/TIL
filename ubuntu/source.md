## 우분투 source

source 명령어는 스크립트 파일을 수정한 후에 수정된 값을 바로 적용하기 위해 사용하는 명령어

예를 들어 ~/.bashrc 파일을 수정 후 저장하여도 수정한 내용이 바로 적용되지 않는다.

그이뉴느 ~/.bashrc 파일은 유저가 로그인 할 떄 읽어 들이는 파일이여서, 로그아웃 후 로그인하거나 리눅스를 재시작해야 적용이 되기 때문이다.

즉 파일의 값을 바로 적용하기 위한 명령어.

```bash
source [환경 설정 파일명]
```

Reference

[[Linux] source 명령어](https://chunggaeguri.tistory.com/entry/Linux-source-%EB%AA%85%EB%A0%B9%EC%96%B4)
