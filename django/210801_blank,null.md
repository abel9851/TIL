# null, blank 차이

null과 blank는 둘 다 기본값이 Flase다.  
이 두 설정은 모두 필드(열) 수준에서 동작한다.

`null=True`는 필드의 값이 NULL(정보없음)로 저장되는 것을 허용한다. (데이터베이스의 열)

```python
date = models.DateTimeField(null=True)
```

`blank=True`는 필드가 폼(입력 양식)에서 빈 채로 저장되는 것을 허용한다.  
장고 관리자(admin) 및 직접 정의한 폼에도 반영된다.

```python
title = models.CharField(blank=True) #폼에서 비워두는게 가능. 데이터베이스에는 ''이 저장된다.
```

`null=True`와 `blank=True`를 모두 지정하면 어떤 조건으로든 값을 비워둘 수 있음을 의미한다.

```python
epic = models.ForeignKey(null=True, blank=True)
#단, CharFields()와 TextFields()에서는 예외
#장고는 위의 2개의 경우에선 NULL을 저장하지 않으며, 빈 값을 빈 문자열('')로 저장한다.
```

또 하나 예외적인 경우가 있다.  
**불리언필드(`BooleanField`)에서 NULL을 입력하려면 `null=True`이 아니라 널 불리언필드(`NullBooleanField`)를 사용해야한다**
