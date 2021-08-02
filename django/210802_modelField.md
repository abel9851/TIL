# 모델 필드

- ImageField
  모델 필드 중에 ImageField를 사용하기 위해서는 Pillow라는 라이브러리를 설치해줘야한다

```python
pipenv install Pillow # pipenv의 경우, pip이 아니라, pipenv로 인스톨 할 것.
```

- CharField
  CharField는 아래와 같이 길이를 설정해줘야한다.

```python
gender = models.CharField(max_length=10)
```

CharField에서는 아무 문자열이나 입력되지 않도록 선택하게 하도록 커스터마이징 하는 것이 가능하다

```python

GENDER_MALE="male" #상수 설정, 이 상수는 데이터베이스 값으로 male이 저장된다.
GENDER_FEMALE="female"
GENDER_OTHER="other"

GENDER_CHOICES = (
    (GENDER_MALE, "Male"), # Male 부분은 admin(form)에서 보여지는 부분
    (GENDER_FEMALE, "Female"),
    (GENDER_OTHER, "Other"),
)

gender = models.CharField(choices=GENDER_CHOICES, max_length=10) # choices로 GENDER_CHOICES를 사용한다. 이부분은 makemigrations를 할 필요없음. form에만 영향을 주고, 데이터베이스에는 영향이 없음.
#max_length는, 데이터베이스에 저장되는 값이 기준. admin에 보여지는 것이 기준이 아님. 즉, Male이 아니라 male이라는 4글자가 허용범위에 들어가는지로 판단한다.

```

- default에 대해서

필드를 설정할 때, 이미 엘리먼트가 있을 경우,
디폴트를 설정해줘야 한다.  
**여기서 엘리먼트란, 데이터베이스에 저장되어 있는 row를 뜻한다.**

```python

bio = models.TextField(defaul="")  # models.py 안의 bio 필드

```

데이터베이스 상황
|ID|NAME|PASSWORD|EMAIL|BIO|
|---|---|---|---|---|
|1|HEEJUN|qwnmn12029830|12321as@gmail.com|---|
|2|HEE|zxcxzcq12|zxcqsw@gmail.com|wow|

위의 1번의 경우, bio가 없다. 데이터베이스에서 bio를 설정해줘야하는데 데이터베이스는  
어떤 것을 넣어야할지 판단 할 수가 없다. 그러므로 default를 사용해서 bio 컬럼을 만들때  
기존에 있던 엘리먼트의 bio 컬럼(ID.1의 row의 bio)에 default로 빈 문자열("")을 설정해주는 것이다.
**`null=True`를 사용해도 데이터 베이스는 정보없음으로 저장되는 것을 허용한다고 인식하기 때문에 문제없다.**

- DateTimeField

```python

created= models.DateTimeField(auto_now_add=True)
updated= models.DateTimeField(auto_now=True)

```

`auto_now_add=True`는 모델이 생성될때 날짜와 시간을 저장.
`auto_now`는 모델을 save할 때마다 date와 time을 저장.
