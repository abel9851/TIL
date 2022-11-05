## 파이썬 예외 만들기

```python
class 예외이름(Exception):
	def __init__(self):
		super().__init__('에러메시지')
```

```python
class NotThreeMultipleError(Exception):
  def __init__(self):
    super().__init__('3의 배수가 아니다.')

def three_multiple():
  try:
    x = int(input('3의 배수를 입력하세요: '))
    if x % 3 != 0:
      raise NotThreeMultipleError
  except Exception as e:
    print('예외가 발생했습니다', e)

three_multiple()
```

```python
class NotThreeMultipleError(Exception):
    pass # Expcetion만 상속받고 아무것도 구현하지 않는다.

raise NotThreeMultipleError('3의 배수가 아닙니다.') # 예외를 발생시킬 때 에러메시지를 넣는다.
```
