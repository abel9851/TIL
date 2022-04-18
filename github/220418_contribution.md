# contribution의 잔디가 안나올때  

기본적으로 브랜치가 다르던가,  
커밋을 한 유저가 자기 자신이 아닌 다른 유저일 때 발생한다.  
`git config user.name`, `git config user.email`로 확인해보자.  

유저이름과 이메일이 다르다면 아래의 명령어를 실행시킨 후,  
`git push origin +main` 혹은 master를 실행하자.  

```bash
git filter-branch --env-filter '

WRONG_EMAIL="변경전 이메일"
NEW_EMAIL="변경후 이메일"

WRONG_NAME="변경전 유저네임"
NEW_NAME="변경후 유저네임"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi

if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi

if [ "$GIT_COMMITTER_NAME" = "$WRONG_NAME" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
fi

if [ "$GIT_AUTHOR_NAME" = "$WRONG_NAME" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
fi

' --tag-name-filter cat -- --branches --tags


```

[github-contribution의 잔디가 안나올때 대처_커밋의 이메일과 유저이름 바꾸기](https://syki66.github.io/blog/2020/05/10/git-change-email.html)