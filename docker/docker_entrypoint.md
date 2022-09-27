## docker entrypoint

CMD명령어와 비슷하다. 컨테이너가 생성되고 최초로 실행할 때 수행되는 명령어를 지정한다.

CMD와의 차이점은, ENTRYPOINT는 항상 실행이 되고,

CMD는 docker run 명령어를 실행할때, 변경이 가능하다.

아래처럼 실행하면 `echo hello` 라는 것은 command를 주는 것을 뜻한다.

이러면 CMD에 입력했던것이 `echo hello` 로 덮어쓰여진다.

```bash
 docker run cmd_test echo hello
```

Reference

[[Docker] RUN, CMD, ENTRYPOINT 차이점](https://seokhyun2.tistory.com/61)
