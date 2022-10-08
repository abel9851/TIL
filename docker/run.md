## dockerfile RUN

RUN은 말그대로 command를 실행(RUN)하여 새 이미지에 포함시키는 역할을 한다.

컨테이너에 꼭 필요한 소프트웨어나 라이브러리가 있을 수 있다.

그리고 특정 위치에 파일이나 디렉토리가 존재해야 할 수도 있다.(ex. 로그 파일이 저장될 폴더)

그런 경우, RUN 뒤에 소프트웨어/라이브러이 설치 명령어, 또는 파일/디렉토리 생성 명령어를 작성하는 것이다.

이렇게 하면 명령어가 실행된 후의 변경사항이 새 이미지에 반영된다.

```python
# shell form

RUN /bin/bash -c 'echo hello'

# exec form
RUN ["/bin/bash", "-c", "echo hello"]
```

shell form이 우리가 직접 터미널에 입력하는 명령어의 형태와 비슷한다.

exec form은 명령어 내의 각 단어를 따옴표와 bracket으로 감싸주어야 해서 번거롭다.

Reference

[docker :: 도커파일(Dockerfile) 의 개념, 작성 방법/문법, 작성 예시](https://toramko.tistory.com/entry/docker-%EB%8F%84%EC%BB%A4%ED%8C%8C%EC%9D%BCDockerfile-%EC%9D%98-%EA%B0%9C%EB%85%90-%EC%9E%91%EC%84%B1-%EB%B0%A9%EB%B2%95%EB%AC%B8%EB%B2%95-%EC%9E%91%EC%84%B1-%EC%98%88%EC%8B%9C)
