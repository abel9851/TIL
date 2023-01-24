## django loaddata all fixtures

`python [manage.py](http://manage.py) loaddata fixtures/test_data.json` 으로 하나씩 넣어도 되지만

아래의 코드로 디렉토리 안에 있는 코드로 데이터를 전부 database에 import할 수 있다.

```bash
python manage.py loaddata appname/fixtures/*.json

python manage.py loaddata */fixtures/*.json
```

Reference

[Load Multiple Fixtures at Once](https://stackoverflow.com/questions/2225062/load-multiple-fixtures-at-once)
