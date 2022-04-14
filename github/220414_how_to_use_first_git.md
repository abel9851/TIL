# git 초기 사용법


- 맨 처음에 할 작업
1. 저장소 별로 Git 사용자와 이메일 정보 설정하기

- 한 번만 하는 명령어
1. github(gitlab) 사이트에 프로젝트 저장소 만들기
2. git사용 선언 또는 원격 저장소에서 clone해오기 - git init 또는 git clone
3. 내 로컬PC와 원격 저장소 간 링크 연결하기 - git remote(git init하고 난 다음에)

- 반복적으로 하는 명령어
1. 코딩 작업
2. 코딩 파일중 내가 관리하고 싶은 파일 선정 - git add
3. 기능 별 선정한 파일을 한 묶음으로 만들어서 설명 달기 - git commit
4. 내 작업물을 github(gitlab)에 올리기 - git push 
  
- 로컬에서 기본값으로 사용할 Git사용자 이름과 이메일 설정(global 옵션)  
현재 시스템의 **모든 Git작업**에 사용할 사용자이름(user.name)과 이메일을 설정하고자 한다면,  
global옵션을 사용해 git config 명령어를 실행해준다.  

```bash

$ git config --global user.name "내 이름"
$ git config --global user.email 내 이메일

```

이 명령어를 실행하면 ~/.gitconfig에 다음 내용을 자동으로 추가해준다.  

```bash

[user]
    email = 이메일
    name = 이름

```

이제 로컬 시스템에서 Git 커밋을 하면 항상 이 정보가 기본적으로 사용된다.  


- 저장소 별로 Git 사용자와 이메일 정보 설정하기
저장소 디렉토리에서 --global없이 git confg를 사용하면 해당 디렉토리(저장소)전용 설정을 추가할 수 있다.  
저장소 별 설정은 [REPO]/.git/config 파일에 저장된다.

```bash

$ git config user.name "내 이름"
$ git config user.email 이메일

```

이 설정은 저장소 별로 저장되며 global 옵션으로 설정한 정보보다 우선적으로 사용된다.  

  
- 현재 저장소의 user, email 설정값을 확인하는 방법
git config를 사용하면 커밋이 만들어질 때 적용될 사용자 이름과 이메일을 미리 확인해볼 수 있다.


```bash

$ git config user.name
내이름

$ git config user.email
내 이메일

```

- Git 사용자 이름과 이메일 정보 삭제하기

```bash

# 전역 설정을 삭제

$ git config --global --unset user.name
$ git config --global --unset user.email

# 개별 저장소의 설정을 삭제

$ git config --unset user.name
$ git config --unset user.email

```

- Git 저장소의 커밋 정보와 GitHub 사용자가 연결되는 원리  
GitHub에서는 Git 커밋의 이메일 정보를 사용해 GitHub 사용자를 매칭한다.  
Github 하나의 계정에는 Primary 메일을 비롯해 추가 이메일을 등록할 수 있다.  
고유한 이메일 주소는 오직 하나의 계정에만 등록될 수 있기 때문에  
이메일 주소로 Github 사용자와 매칭하는 것이 가능하다.  
따라서 GitHub에 등록된 이메일을 user.email에 설정하고 커밋한 다음 GitHub저장소에 Push하면 해당 이메일을 사용하는 GitHub 사용자로 자동으로 연결된다.  

- GPG 인증
로컬에서 user.email을 설정하는 것은 커밋의 작성자가 누구인지를 보장하지 않는다.  
이 값을 다른 사용자의 이메일로 변경하고 커밋하면  
GitHub에서는 다른 사람 프로필을 연결해버린다.  
GitHub 계정에 이메일이 고유하게 등록될 뿐,  로컬에서 user.email을 변경하는 것은 아무런 제약이 없기 때문이다.   
이러한 문제를 방지하고 작성자 본인임을 증명하기 위해서  추가적으로 GPG 인증을 사용할 수 있다.  
이렇게 추가 인증을 하는 경우, GitHub의 커밋 정보에서  
verified 마크를 확인할 수 있다.  


회사에서는 기본적으로 이미 진행하고 있는 프로젝트에 참가하는 경우가 많기 때문에  
**git clone**으로 원격 저장소에서 복사해온다.  
이러면 내 로컬PC에 자동적으로 **.git**이라는 숨김폴더가 생성되면서 자동으로 링크(git remote)가 연결된다.  

- git clone하는 방법  
저장소의 우측 상단에 버튼을 클릭하면 해당 저장소의 위치 URL을 복사할 수 있다.  
이 저장소를 클립보드에 저장하고 로컬 PC로 옮긴다.  
클론을 하려면 Git 저장소의 주소를 알아야 한다.  
저장소 화면에서 Code

- git init하는 방법  
Git은 소스 코드의 버전 관리를 도와주는 도구다.  
일반적으로 프로젝트 단위로 Git저장소를 만들어 사용하며  
소스 코드 파일을 Git으로 관리하기 위해서는 먼저 Git저장소를 초기화해야한다.  
이때 저장소를 초기화하기 위해 사용하는 명령어가 git init이다.

git init을 실행하지 않은 채 git status같은 git 관련 명령어를 실행하면  
`fatal: not a git repository (or any of the parent directories): .git`와 같은 에러메시지가 나온다.  
위의 에러메시지에서 한가지 알 수 있는 것은 Git 저장소(repository)는 .git디렉토리로 관리 된다는 것이다. 
git init을 한 뒤 생성되는 .git이라는 숨김폴더에서 Git저장소가 관리된다.  

git init으로 저장소를 초기화까지 하고, 보통 첫 커밋까지인 이 상태를 저장소 초기화 작업이라고 이야기한다.  
이는 Git에서 첫 커밋은 루트 커밋으로 특별하게 취급되기 때문이다.  
최초 커밋은 rebase하는 방법이나 git add로 추가한 내용을 되돌리는 방법도 다르다.  
그래서 저장소를 처음 초기화하면, Git 저장소에서 필수적으로 사용하는 .gitignore 빈파일을 만들고 첫 커밋을 만들어주는 경우가 일반적이다.  
.gitignore는 Git저장소에서 관리하지 않을 파일들을 나열해놓는 특수한 용도로 사용되는 설정파일이다.  

이러한 커밋작업 전에 일단 Git사용자의 정보를 설정하는것이 좋다.  


내가 사용하고 싶은 폴더에 위치한 다음 `git init`을 실행.  
그러면 **.git**이라는 숨김폴더가 생성되고 로컬에서 Git의 관리가 시작된다.  
그 다음으로는 `git remote`를 해줘야한다.

- git remote하는 방법(git init했을때 필요. git clone한 다음에는 할 필요 없음)  
`git remote add origin https://github.com/[]`


- git 저장소(repository) 만들기
새로 만들 폴더를 저장소(repository)로 만드려면, repo를 가르키는 master가 필요하고,  
이것은 [git init하는 방법](#git-init하는-방법)에서 하는 것과 같이 **최초 1회 commit으로 생성된다.**  
git의 사용 목적은 다수의 사용자들과 함께 프로젝트를 진행하기 위함이다.  
그렇기 때문에 원격 저장소는 실제 작업 파일을 가지고 있는 일반 저장소(repository)보다는 **프로젝트의 정보**와 **변경 사항만 적용**이 되는 bare repository가 **원격 저장소**로 적합하다.  
**이 bare repository**는 원격 저장소 서비스인 Github를 이용할시에는 사용할 이유가 없다.  
bare 저장소는 Github를 사용하는 것이 아니라, 자기가 직접 원격저장소를 만드는 것이기 때문이다.  
원격 저장소를 직접 구축하고 운영할 생각이 아니라면 bare repository를 직접 생성할 이유가 없다.  




- *추가내용: bare 저장소(bare repository) 만들기*  
git init은 git repository를 생성함과 동시에 작업 공간을 함께 생성한다.  
git init --bare는 git repository만 생성한다.
git init으로 만든 repository를 non-bare git repository라고 부르고  
git init --bare로 만든 repository를 bare git repository라고 한다.  




bare repository를 만드는 법은 간단하다.  
아래와 같은 명령어로 만들 수 있다.  
만들고 나면 일반 저장소와는 내용물이 다르다.  
참조의 [Git 개념 init, clone](#Git-개념-init,-clone)을 웹사이트를 확인해보자.
```bash

# git clone --bare {프로젝트 이름}/{프로젝트이름.git}
$ git clone --bare project_name/project_origin.git

# 위의 것과 다르게 git init을 사용하는 경우
$ git init --bare <project name>.git # bare repository 생성

```
내용물 대신 프로젝트의 정보를 담고 있는 파일들로 저장이 되어 있다.  
그렇기 때문에 프로젝트의 실제 작업물을 담고 있는 no bare저장소에 비해   
변경 사항만 저장되는 bare저장소는 가볍기 때문에 원격 저장소로 두기 적절하다.  
그러면 bare repo에서 변경된 내용은 어떻게 저장되는가 하면  
objects 폴더 내에 저장이 된다.  


- git push
혼자서 로컬에서 git을 사용할 때는 문제가 없지만 여럿이서 사용할 때는 git push를 해서 원격 저장소에 업로드를 해야한다.  
그러려면 깃허브 웹사이트에 로그인 한 후, New repository를 클릭하고  
저장소 이름을 입력, Public, Private는 프로젝트 성격에 따라 선택.  
스크롤을 내리면 저장소 초기하면서 README나 .gitignore 파일을 초기화해주는 옵션이 있다.  
로컬에서 초기화한 내용을 올리고 싶은 경우, 전부 체크를 해제한다.(기본값이다)  
Create repository 버튼을 클릭한다.  


저장소가 생성되면 안내 페이지가 나타난다.  
안내 패에지에서는 저장소를 새로 초기화하고 Push하는 방법, 
초기화가 되어있는 저장소를 Push하는 방법,  
다른 버전 관리 도구의 저장소를 임포트 하는 방법을 소개한다.  

내가 사용할 것은 두번째 방법이다.  

GitHub에서는 기본 브랜치를 main으로 사용하고 있어서  
브랜치를 main으로 변경하는 과정도 포함되어있다.  
아래의 코드를 차례차례 실행하자.

```bash
$ git remote add origin git@github.com:lainyzine/git-init.git
$ git branch -M main
$ git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 233 bytes | 233.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To github-lainyzine:lainyzine/git-init.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.

```

다시 GitHub 저장소를 확인해보면, 저장소를 초기화하고 커밋한 내용이 GitHub 저장소에 추가된 것을 확인할 수 있다.

- Git 저장소를 삭제하는 방법  
로컬에서 Git저장소를 삭제하고자 한다면, .git 디렉토리를 삭제하면 된다.  

```bash

$ rm -rf .git
$ git status
fatal: not a git repository (or any of the parent directories): .git


```
이러면 더이상 Git저장소가 아니므로 Git status 명령어를 실행하면 Git저장소가 아니라는 에러가 발생한다.  
**로컬 프로젝트 디렉토리에서 .git을 삭제하는 경우, 복구할 수 있는 방법은 없다.**


참조  
[Git으로 프로젝트 개발 할 때 작업 순서](https://uxgjs.tistory.com/176)  
[git init 사용법:Git 저장소를 생성(초기화)](https://www.lainyzine.com/ko/article/git-init-how-to-initialize-git-repository/)  
[git clone 사용법: 원격 Git 저장소 복제](https://www.lainyzine.com/ko/article/git-clone-command/)
[Git 최초 설정: 사용자 이름과 이메일 설정하는 방법](https://www.lainyzine.com/ko/article/how-to-set-git-repository-username-and-email/)
[GPG(GNU PG)를 이용해 git 커밋에 서명하는 방법](https://www.44bits.io/ko/post/add-signing-key-to-git-commit-by-gpg)- 꼭 써보기  
[git-저장소-만들기](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-Git-%EC%A0%80%EC%9E%A5%EC%86%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0)  
[git add로 추가한 내용을 취소하는 방법](https://www.lainyzine.com/ko/article/how-to-cancle-git-add/) - 시간날때 확인할 것(확인 완료)  
[Git 개념 init, clone](https://mr-dan.tistory.com/38)  
[Git bare repository 만들고 사용하기](http://egloos.zum.com/devxpert/v/1034173)  
[git init과 git init --bare](http://egloos.zum.com/devxpert/v/1034173)  
[나만의 git server 만들기](https://velog.io/@kimjjs100/%EB%82%98%EB%A7%8C%EC%9D%98-git-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0-3-%EC%9B%90%EA%B2%A9%EC%A0%80%EC%9E%A5%EC%86%8C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)