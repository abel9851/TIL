# mkdir abc && cd $\_

```bash
mkdir abc && cd $_ # abc라는 디렉토리를 만들고 그 디렉토리로 이동.

# $_는 마지막 명령에서 나온 마지막 인수다.
# mkdir test를 한 후, cd $_를 하면 $_는 test를 의미한다.
```

`$_` expands to the last argument to the previous **simple command\***

$\_는 마지막 인수를 이전커맨드의 마지막 인수를 확장한다.

Reference

[missing-semester) #02:셸 툴과 스크립팅](https://intrepidgeeks.com/tutorial/missing-semester-02-script-with-shell-tools)

[what does 'cd $\_' mean?](https://stackoverflow.com/questions/30154694/what-does-cd-mean)
