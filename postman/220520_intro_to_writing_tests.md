# Intro to writing tests - with examples

## basic test syntax

### pm.test

postman 앱의 request 작성란에 아래의 url을 입력  
`https://postman-echo.com/get?foo1=bar1&foo2=bar2`

- 테스트를 작성하기 하려면 `pm.*`을 사용할 것.
- `pm.test()` 메소드는 2개의 파라미터를 받는다.  
  첫번째 파라미터는 테스트의 이름(**테스트를 묘사할 수 있는 이름으로 할것**), 두번째 파라미터는 함수다.

위의 url로 요청을 보낸다면,  
postman앱의 params탭에는 쿼리스트링의 key와 value가 입력된다.
key에는 foo1, foo2, value에는 bar1, bar2가 들어간다.

```javascript
pm.test("Name of the second test", function () {
  // make as many assertions as you'd like as part of this test
  // if any assertion throws an error, this test will fail
  pm.response.to.have.status(200);
  pm.response.to.be.ok;
  pm.response.to.be.json;
});
```

---

### pm.expect and pm.response

`https://postman-echo.com/get?foo1=bar1&`

- `pm.test()`의 두번째 파라미터인 함수 안에 `pm.response()`나 `pm.expect()`를 사용하여 assertion을 만들 수 있다.

- `pm.expect()`는 일반적인 assertion 함수로, chai.js BDD / TDD assertion library for node에 의존한다.

```javascript
pm.test("Envirionment to be production", function () {
  pm.expect(pm.environment.get("env")).to.equal("production");
});
```

- `pm.expect()`의 두번째 파라미터(optional)를 사용해서  
  custom error message를 만들 수 있다.

```javascript
// response fail: Environment to be production | AssertionError: nooo why fail??: expected false to be truthy
pm.test("Using a custom error message", function () {
  pm.expect(false, "nooo why fail??").to.be.ok;
});
```

- `pm.response` 객체는 현재 요청에 대한 응답으로 반환된 데이터에 접근을 제공한다.

- `pm.response()`메소드는 내부적으로(under the hood) `pm.expect()`를 사용한다.  
  디버깅을 할때 기본 assertion으로 pm.response()를 사용하면 더 자세한 에러메시지를 받을 수 있다.  
  [pm.response()](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/)메소드를 참고해서 디버깅을 해보자.

---

## API tests

`https://postman-echo.com/get?foo1=bar1&foo2=bar2`

snippet을 사용해서 코드를 확인 할 수 있다.  
급하면 snippet으로 test script를 작성해서 사용하자.

- GET Status  
  `https://postman-echo.com/get?foo1=bar1&foo2=bar2`  
   snippet- Status code: code in 200  
   이 테스트는 response status code의 유효성 검사를 하는 것이다.

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
```

- PUT performance  
  `https://postman-echo.com/put`  
  snippet- Resonse time is less than 200ms.  
  이 테스트는 response time의 유효성 검사를 하는 것이다.

BODY에는 raw로 This is expected to be sent back as part of response body를 입력.

```javascript
pm.test("Response time is less than 200ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(200);
});
```

- PATCH Data type  
  `https://postman-echo.com/patch`  
  snippet- Response headers: Content-Type header check  
  이 테스트는 반환된 컨텐트의 컨텐트 타입의 유효성 검사를 하는 것이다.

BODY에는 raw로 This is expected to be sent back as part of response body를 입력.

```javascript
pm.test("Content-Typ is present", function () {
  pm.response.to.have.header("Content-Type");
});
```

참조  
[under the hood 의미](https://m.blog.naver.com/faces821/221681852388)  
[Intro to writing tests - with examples](https://documenter.postman.com/view/1559645/RzZFCGFR?version=latest)
