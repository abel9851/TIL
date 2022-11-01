## CORS

same origin policy를 하는 목적은, 악의적인 스크립트(자바스크립트)로부터 공격을 막기 위해서다.

서버가 모든 출처(도메인)를 허용하면, 다른 도메인(다른 서버)에 있었던 js파일의 스크립트나
웹브라우저와 도메인없는(origin header를 추가하는 건 웹브라우저인데 웹브라우저 없이도 origin header를 추가하거나, 없이 보내는 방법을 사용한다면 가능할 것이라고 본다.) 스크립트의 요청에도 응답을 하게 된다.

즉, 서버에 요청이 전달되기 때문에 이 요청에 악의적인 스크립트가 있을 경우, 서버는 타격을 받게 된다. 경우에 따라서는 서버가 제대로 움직이지 않게 되거나 공격자가 그 서버에 악의적인 스크립트를 보내서 그 스크립트가 서버에 저장된 상태에서 다른 유저가 서버에 리소스(데이터)를 요청했을 경우, 악의적인 스크립트가 실행되서 유저에게 피해를 입힐 수도 있다.

그러므로 서버측은 신뢰할 수 있는 출처(도메인), 즉 그 출처에서 오는 스크립트를 미리 설정해놓는 것으로 위험을 방지할 수 있다.

```
Cross-domain requests in JavaScript are restricted by the same-origin policy,
which is a security standard enforced by the browser.
It states that scripts loaded on one domain can only request resources that
originate from the same domain.
**The purpose of the same-origin policy is to prevent attacks by malicious scripts.**
```

Reference

[Cross-Origin Resource Sharing (CORS) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

[https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919](https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919)
