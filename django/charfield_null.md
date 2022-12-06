## django string관련 model field의 null은 사용하지 말자

Charfield, TextField에서는 null=True를 사용하면 empty string과 null이 중복되므로(데이터 없음에 대해 두가지 값을 갖는 것은 중복이다.) null=True 옵션을 사용하지 않도록 권장하고 있다.

예외적으로 unique=True와 blank=True일때 null=True를 허용한다.

null=True를 해주지 않는다면 blank, 즉 empty string이 여러개가 되므로 unique를 보장할 수 없기 때문이다.

다수의 null값은 `unique constraint violations` 에 걸리지 않는다.

Reference

[Django](https://docs.djangoproject.com/en/4.1/ref/models/fields/)

[(번역) Django Tips #8 Blank or Null?](https://wayhome25.github.io/django/2017/09/23/django-blank-null/)

[Django CharField blank or null?](https://www.qu3vipon.com/django-charfield-blank-or-null)
