# 서버배포 #4 - RDS 연동

현재 장고공식문서를 보면 MySQL의 경우, 버전 5.7이상을 지원하고 있으니까  
주의하도록 하자.  


- ## 한글 파라미터 설정

RDS를 연동하기 위해서는  
우선 한글 파라미터를 설정한다.  

파라미터 그룹은 데이터베이스 설정에 관련한 내용이라고 볼 수 있다.  

한글이 포함될 수 있는 UTF-8(유니코드)를 설정하기 위해서이다.  

생성한 파라미터 그룹으로 들어가서  
char을 검색해서 변경가능한 모든 값을 utf-8으로 바꾼다.  

그 다음 collation을 검색해서  
utf8_general_ci로 설정하면 된다.  
한글 데이터 삽입이 가능한 데이터베이스를 위해서 한글관련 파라미터 설정을 만들어 준 것이다.  

- ## 데이터베이스 생성 

원하는 데이터베이스를 선택해서(여기서는 MySQL을 선택했다)  
버전을 고른 뒤(파라미터에서 5.7을 골랐음으로 MySQL 5.7.24을 골랐다),  
DB 인스턴스 식별자에 원하는 이름을 넣고(starscope-database)  
마스터 사용자 이름은 admin 이라고 넣으면  
admin이라는 이름으로 데이터베이스에 접속할 수 있다.  

그 다음 퍼플릭 액세스에서 예를 선택한 뒤  

추가 구성에서 초기 데이터베이스 이름을 설정하고(dockermysql)  
DB 파라미터 그룹을 설정한다.(docker-mysql)  

보안그룹은 새로운 보안 그룹 생성을 해준다.

생성버튼을 누르면 상태에 생성중이라는 메시지가 사용가능이라고 바뀌면 끝난 것이다.  

그 다음 보안그룹 인바운드 규칙의 소스를 0.0.0.0/0으로 해서 누구나 접근 가능하도록 바꾼다.  
(이부분은 나중에 docker 인스턴스만 접근 가능하도록 바꿔주자)  

데이터베이스에 접속하기 위한 주소는 엔드포인트이다.  

- ## 장고 settings.py에서 database 변경

개인적으로는 EC2(장고 컨테이너가 있는)의 포트와 RDS의 포트를 연결하는 식(?)인줄 알았는데  
도커가 있던, 없던 간에 장고 settings.py에서 데이터베이스 정보를 입력하는 것으로 간단히  
접속 가능 한 것 같다.  
이 부분에 대해서는 더욱 조사해보자.  
포트는 들어가는 문, 두드리는 문이지, 직접 포트를 통해 먼저 나가는 그런 형식은 아닌 것 같다.  
먼저 누군가가 해당 포트를 방문하면(요청하면), 반응하는 식(응답)인 것 같다.  

아래와 같이 데이터 베이스 정보를 입력해주자.  

조건:  
ENGINE: sqlite3를 postgresql로 바꿔준다.  
HOST: 엔드포인트 항목을 복사-붙여넣기 한다.  
PORT: 포트 항목을 입력한다.  
NAME: DB 이름 항목을 입력한다.  
USER: 사용자 이름 항목을 입력한다.  
PASSWORD: DB 인스턴스를 생성할 때 설정했던 비밀번호를 입력한다.  

mySQL을 사용 할 때에는 상관 없지만  
**PostgreSQL을 사용할 때에는 pyscopg2가 필요하다**  
**만약 pyscopg2가 없다는 에러가 발생할 경우 아래 명령어로 설치해준다**  
psycopg2는 데이터베이스와 장고를 연결해주는 역할을 한다.  

`pipenv install psycopg2`

```python

#config/settings/prod.py

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "HOST": "",
        "PORT": "3306",
        "NAME": "",
        # .env나 환경변수로 입력해주자
        "PASSWORD": os.environ.get("DATABASE_PASSWORD"),
    }
}

```

 

참조 :  
노마드코더 - 에어비앤비 클론 코딩  
[EC2(docker)와 RDS 연동](https://velog.io/@hj8853/Docker%EB%A5%BC-%ED%86%B5%ED%95%9C-AWS-EC2-Server-%EB%B0%B0%ED%8F%AC)  
[django 프로젝트 - RDS 연동](https://nachwon.github.io/django-deploy-5-rds/)  
[Docker, Django, RDS (영어)](https://testdriven.io/blog/django-docker-https-aws/)  
[우분투 vi 에디터 사용법](https://www.leafcats.com/111)  
[장고 공식 문서 - 데이터베이스](https://docs.djangoproject.com/en/3.2/ref/databases/#mysql-notes)  