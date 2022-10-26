## http 메소드 HEAD

HTTP HEAD 메소드는 특정 리소스를 GET 메소드로 요청했을때 돌아올 헤더를 요청한다.

HTTP 메소드에 대한 응답은 본문(body)을 가져선 안되며, 본문이 존재하더라도 무시해야 한다.

그러나, content-length처럼 본문 콘텐츠를 설명하는 개체 헤더는 포함할 수 있다.

GET 메소드와 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환한다.

Reference

[HEAD - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/HEAD)
