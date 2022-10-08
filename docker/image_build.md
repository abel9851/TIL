## docker image build -t

-t 옵션은 이미지명과 태그명을 붙이는 것. 이미지이름과 태그명을 입력하겠다는 옵션이다.

-t라고해서 태그만 의미하는 것이 아니다.

Reference

[[Docker]5. 도커 이미지 빌드시 자주 사용하는 옵션](https://ahniverson.tistory.com/27)

[[Dockerfile] Dockerfile이란? Dockerfile 옵션](https://narup.tistory.com/204)

### docker image build -t 이름 . 했을때의 에러

docker build를 할때 failed to solve with frontend dockerfile.v0: failed to create LLB definition: rpc error: code = Unknown desc = error getting credentials - err: exit status 255, out: ``라는 에러가 나왔다.

stackoverflow에서 찾아보니까 dockerfile명을 Dockerfile로 하라던가, data를 pudge하라던가

업데이트를 하라던가 다해봤는데 해결이 안됬다.

그중에서 해결책으로 buildkit을 사용하지 말라고 쓰여있는 stackoverflow의 답변을 봤는데 이것을 하니까 해결됬다.

해결책으로 2개를 하라고 쓰여있었지만

```bash
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0
```

이거 하나만 변수를 바꾸니까 해결됬다.

```bash
export DOCKER_BUILDKIT=0

```

Reference

[An error, "failed to solve with frontend dockerfile.v0"](https://stackoverflow.com/questions/64221861/an-error-failed-to-solve-with-frontend-dockerfile-v0)
