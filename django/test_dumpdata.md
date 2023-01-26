## django fixture dumpdata

db로부터 장고를 통해 데이터를 추출 가능하다.

터미널에서 아래의 커맨드를 사용하면 된다.

```bash
python manage.py dumpdata --indent=4 --output=a/api_model.json api.model
```

`--indent` 는 들여쓰기를 추가해준다. 4라고 입력하면 tab 한번에 크기가 4인 공백을 사용하게 된다.
옵션을 안주면 single line으로 dump되니까 되도록 쓰는 게 보기 편하다.

`--output` 은 dump한 데이터를 파일로 저장할 때 사용한다. 옵션을 주지 않으면 standardout으로 출력된다. `a/api_model.json` 처럼 상대경로로 현재 위치에서 a 디렉토이 안에 파일이름을 지정해서 저장할 수 있다.

그리고 같은 위치에 같은 커맨드를 실행하면 파일을 덮어쓴다.

마지막에 인자로 준 `api.model` 은 dump하고 싶은 app의 model을 지정한 것이다.
db에서는 model별로 테이블이 생성되므로 해당 모델의 테이블에 있는 레코드를 dump한다.
마지막 인자를 주지 않았을 경우, 즉 `python [manage.py](http://manage.py) dumpdata --indent=4 --output=api_model.json` 커맨드를 실행 했을 경우, 모델 구분을 하지 않고DB의 전 레코드를 api_model.json에 dump하니까 주의해야한다.

Reference

[Django](https://docs.djangoproject.com/en/4.1/ref/django-admin/#django-admin-dumpdata)
