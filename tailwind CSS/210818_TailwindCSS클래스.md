# tailwindCSS 클래스 사용법

참조(tailwind CSS 공식 웹사이트)[https://tailwindcss.com/docs]

- em

em은 가장 가까운 font-size와 같다.  
아래의 클래스 child의 폭인 2em은 박스의 font size가 20px이므로  
2em=40px이 된다.  
rem은 root em으로, 가장 가까운 font-size와는 관계가 없고 root font-size와 연관이 있다.  
그러므로 child 클래스의 height는 2rem=20 이 된다.

**tailwind CSS에서 text의 사이즈는 디폴트로 16px이다.**

```css
html {
  font-size: 10px;
}

.box {
  font-size: 20px;
  .child {
    width: 2em; // 2em은 .box의 font-size의 영향을 받는다.
    height: 2rem; // 2rem은 html 즉, root font-size의 영향을 받는다.
  }
}
```

- container

컨테이너는 현재의 break point에 엘리먼트의 폭이 고정되도록 하는 컴포넌트(구성요소, 부품)이다.

컨테이너는 내가 고정된 스크린 사이즈로 디자인하기 하기 좋아한다면  
완전히 유동적인 viewport를 사용하는 것보다 컨테이너를 사용하는게 유용하다.

컨테이너는 기본값이 width 100%다.  
**하지만 breakpoint를 설정함으로써 반응형 디자인을 할 수 있다.**

다른 프레임워크의 container와는 달리, tailwind CSS의 container는  
**자동적으로 컨테이너 자신을 위치를 중앙으로 설정하지 않는다.**  
**그리고 horizontal padding(오른쪽과 왼쪽의 패딩)을 갖지 않는다.**

중앙으로 위치시키고 싶으면 `mx-auto`를 사용하고

```css
<div class="container mx-auto">

</div>
```

패딩을 추가하고 싶으면 `px-{size}`을 사용하면 된다.

```css

<div class="container mx-auto px-4">

</div>

```

참조(tailwindCSS - 패딩)[https://tailwindcss.com/docs/padding]

- break point

break point란, 표시할 레이아웃을 전환하는 화면 크기이다.  
디바이스나 웹 브라우저의 width 또는 height에 반응하는 웹페이지의 한 point이다.  
즉, **레이아웃이 바뀌는 기준점이다.**  
참조(미디어 쿼리란 무엇인가?)[https://eblee-repo.tistory.com/49]  
참조(미디어 쿼리)[https://m.blog.naver.com/jokercsi1/221924938051]  
참조(프론트엔드 미디어쿼리)[https://velog.io/@haileyself/0908-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-Meet-Up-at-Google-startup-campusS1-%EB%AF%B8%EB%94%94%EC%96%B4%EC%BF%BC%EB%A6%AC-%EB%B8%8C%EB%A0%88%EC%9D%B4%ED%81%AC%ED%8F%AC%EC%9D%B8%ED%8A%B8]

- max-width과 min-width

```css
@media only screen and (max-width: 600px) {
  // 브라우저의 창의 width가 600px 이하인 경우(최대 600px까지 아래의 코드가 적용된다. 600px > x.), body의 배경색을 lightblue로 한다.
  # body {
    background-color: lightblue;
  }
}

@media only screen and (min-width: 600px) {
  // 브라우저의 창의 width가 600px 이상인 경우(최소 600px은 되어야한다. 600px < x.), body의 배경색을 lightblue로 한다.
  # body {
    background-color: lightblue;
  }
}
```

- viewport

모바일 브라우저들은 viewport로 알려진 가상의 window상에 페이지를 렌더링한다.  
즉, 화면 Display상의 표시영역을 뜻한다.

- width(가로)

width는 엘리먼트의 폭을 정한다.

참조(tailwindCSS - Width)[https://tailwindcss.com/docs/width]
