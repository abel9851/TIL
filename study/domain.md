## 도메인 구조

blog.example.com.

sub(blog) second-level(example) top-level(com) root(.)

루트 도메인 DNS 서버는 top level DNS 서버의 ip와 도메인을 알고 있어야하고

top level DNS 서버는 second level DNS 서버의 ip와 도메인을,

second level DNS 서버는 sub DNS 서버의 ip와 도메인을 알고 있어야한다.

상위가 하위를 알고 있어야한다.

결국 blog.example.com.의 ip를 알고 있는 DNS 서버는 sub DNS 서버다.

제일 먼저 루트 DNS 서버에 물어본다.

cname 레코드는, 도메인에 대한 별명을 지정하는 것이다.

a 타입 레코드로 example.com. 192.0.1.1로 등록을 했다면,

c(canonical) name 타입 레코드에 example.com.은 www.example.com.으로 접속이 가능하다. 라고 별명을 짓는것이다.

a레코드는 도메인에 대한 ip주소, cname은 도메인에 대한 또다른 도메인을 지정하는 것이다.

Reference

[DNS Record Type 레코드 종류와 역할](https://0433.tistory.com/m/13)