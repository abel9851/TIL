# JSON.parse()

JSON.parse() 메소드는 JSON 문자열의 구문을 분석하고  
그 결과에서 javascript값이나 객체를 생성한다.  
선택적으로 reviver 함수를 인수로 전달할 경우, 결과를  
반환하기 전에 변형할 수 있다.

포스트맨을 써보기 위해 코드를 분석중이다.  
parse에 대해 어렴풋이 알고 있긴했지만  
코드를 한줄 한줄 분석하면서 포스트맨을 써보고 싶었기에 정리해두려고 한다.

`JSON.parse(jsondata)`를 사용하면 자바스크립트에서  
사용할 수 있는 객체가 생성된다.

```javascript
const json = '{"result":true, "count":42}';
// javascript의 객체를 생성
const obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
//expected output: true
```
