# postman Intro to writing tests - with examples

postman을 사용하게 되었으므로, 테스트 스크립트를 작성하려고 한다.  
테스트 스크립트에서 모르는 코드에 대해 하나하나
기록한다.

**pm**객체는 추가적인 워크플로우 컨트롤을 제공하는 postman객체를 사용하여  
request, response 데이터를 테스트하기 위한 기능을 제공한다.(대부분의 postman javascript API 기능을 수행한다.)  
요청, 응답 데이터 및 변수에 대한 엑세스를 제공한다. 사용하는 방식은 `pm.*`이다.

**GUI의 포스트맨을 사용한다면 snippet을 사용해보자.**  
**간단하게 테스트 스크립트를 작성할 수 있다.**

현재 회사에서는 chaiJS BDD의 BDD style중에 하나인 expect style을 사용하고 있기 때문에  
expect로만 테스트스크립트를 작성할 것이다.  
(assert, should 스타일도 있긴 하지만 하나의 스타일을 골랐으면 작성할때  
일관되게 하나의 스타일만 사용하는 것이 바람직하다.)

---

## pm 객체

`pm.test`는 테스트하고자하는 함수와 그에 맞는 이름을 파라미터로 주면,  
true나 false를 리턴한다.  
이는 테스트가 성공했는지, 실패했는지를 의미한다.

`pm.response`는 요청에 의해 반환된 데이터의 유효성 검사를 하고 싶다면 사용하는 객체다.

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
```

참조
[Intro to writing tests - with examples](https://documenter.postman.com/view/1559645/RzZFCGFR?version=latest)  
[what is pm object](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/)  
[postman-Test script examples](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/)  
[chai Assertion Library](https://www.chaijs.com/api/bdd/)  
[Assertion-TDD](https://velog.io/@wendover17/08.06-TIL)
