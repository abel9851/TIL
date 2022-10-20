## is, is not

is, is not은 객체를 비교하고 ==, !=은 값 자체를 비교한다.

정수 객체, 실수 객체가 다르다는 것을 확인할 경우, id()를 사용해도 된다.

is, is not은 클래스로 객체를 만든 뒤에 객체가 서로 같은지 비교할 때 주로 사용한다.

```python
1 == 1.0 # true
1 is 1.0 # <stdin>:1: SyntaxWarning: "is" with a literal. Did you mean "=="?
				 # false
```
