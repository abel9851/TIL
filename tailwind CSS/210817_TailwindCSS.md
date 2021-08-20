# Tailwind CSS

Tailwind CSS는 utility를 우선시하는 framework다.  
대부분의 프레임워크는 완제품인(모든게 갖춰진) 다수의 class들로 제공된다.  
예를 들어 cart라는 클래스가 있다면, 그 클래스는 white background, borders, shadow 같은 것들이 전부 제공된다.

하지만 Tailwind CSS는 다르다.
Tailwind CSS는 결과를 만들어내기 위해 같이 넣는 class name들 뿐이기 때문이다.  
많은 CSS Property들을 class로서 가지고 있다는 것이다.  
하나를 표현하기 위해 많은 클래스 네임들이 단순히 축적되어 쓰여질 뿐이다.

또한 중복되는(예를 들어 버튼) 것들은 따로 btn 항목에 클래스 네임들을 적어두고 재사용이 가능하다.

예시

참조:  
[builtwithtailwind](https://builtwithtailwind.com/)  
[테일윈드 공식웹사이트](https://tailwindcss.com/)  
[테일윈드 컬러 팔레트](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)  
[Tailwind CSS IntelliSense - vsc에서 테일윈드 css를 자동완성기능을 제공](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

```css

<style>
.btn {
    @apply font-bold py-2 px-4 rounded;  <!-- @apply는 해당 클래스에 클래스네임들을 적용시킬때 쓴다. -->
}

```

- post CSS

위에서 썼던 `@apply`같은 것은 post CSS다.  
POST CSS는 CSS를 조금 더 현대적으로 바꿔주는 플러그인이다(플러그인은 호스트 응용프로그램에 없는 기능을 추가하는 것이라고 이해하면 편하다).  
좀더 풀어 설명하면 post css는 js 플러그인을 사용하여 CSS를 변환시키는 툴이다.

하는 일로는

1. CSS에 문제가 없는지 미리 확인해서 에러로그를 준다.
2. 지금 발전중인 CSS의 현대기술들을 브라우저에 호환되도록 자동 변환해준다.

**post CSS는 언어가 아니라 자동으로 신기술 CSS를 호환가능하도록 변환시켜주는 플러그인일 뿐이다.**  
postg CSS 자체는 아무 일도 하지 않는다. 다양한 플러그인과 플러그인을 추가할 수 있는 환경을 제공할 뿐이다.

- Gulp
  자바스크립트에서 반복적이고 자주 사용되는 일을 자동화해주는 툴로, 빌드 시스템이라고도 불린다.

Gulp이 하는 일은

1.  자바스크립트 라이브러리, 서드파티 앱등을 모으고 축소, 압축을 수행
2.  단위 테스트(유닛 테스트) 수행
3.  LESS / CSS 컴파일링 - 이부분의 CSS 컴파일링이 SCSS(POST CSS 안의 플러그인으로 SCSS가 있다)를 웹에서 쓸 수 있도록 SCSS를 컴파일링해준다.
4.  브라우저 Refresh를 도와준다.

참조: [SCSS](https://heropy.blog/2018/01/31/sass/)

- post CSS 사용

post CSS를 사용하려면 node.js나 Gulp의 환경이 필요하다.  
우선 airbnb(twailwind css, post css를 사용하려는 앱의 디렉토리)에  
`npm init`을 해서 npm을 초기화하자.  
이를 하기 위해선 node.js와 Gulp이 설치되어 있어야한다.

- package.json 설정

`npm init`을 하면 package.json이 생긴다.

package.json에서 main, script, author, license 등을 지운다.7

```python

{
  "name": "airbnb-clone",
  "version": "1.0.0",
  "description": "Cloning Airbnb with Python, Django, Tailwind and more..",

  "repository": {
    "type": "git",
    "url": "git+https://github.com/abel9851/airbnb_clone.git"
  },

  "homepage": "https://github.com/abel9851/airbnb_clone#readme",
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-csso": "^4.0.1",
    "gulp-postcss": "^9.0.0",
    "gulp-sass": "^4.1.0",
    "node-sass": "^5.0.0",
    "postcss": "^8.2.8",
    "tailwindcss": "^2.0.3",
    "autoprefixer": "^9.0.1"
  }
}


```

- gulp을 통해 tailwind css를 설치해보자

터미널에서 아래의 코드를 사용해서 gulp과 tailwind css의 설치를 위한 플러그인들을 설치하자.

1.

```python


npm i gulp gulp-postcss gulp-sass gulp-csso node-sass autoprefixer -D # 개발자환경으로 설치한다

npm install tailwindcss -D # tailwindcss를 설치해주자


```

2.

```python

# .gitignore

node_modules/ # 깃허브에 올라가지 않게 추가해주자. 변경이 많다.

```

3.

```python

npx tailwind init # 테일윈드 초기화. 이러면 tailwind.config.js가 생긴다.

```

4. `gulpfile.js`라는 파일을 앱 디렉토리에 생성  
   `gulpfile.js`에는 gulp 실행을 위한 환경설정의 역할을 하는 곳이다.

5.

node.js에서는 require 메서드를 통해 외부 모듈을 가져올 수 있다.

```javascript
const foo = require("파일경로");
```

참조: [require()](https://velog.io/@sms8377/Javascript-require-%EA%B0%84%EB%8B%A8-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EB%B0%8F-module.export-%EC%99%80-export%EC%9D%98-%EC%B0%A8%EC%9D%B4)

```javascript
const gulp = require("gulp"); // gulp.js에 gulp를 불러온다.

// css라는 함수는 css관련 플러그인들을 가져온다.

const css () => {
  const postCSS = require("gulp-postcss");
  const sass = require("gulp-sass");
  const minify = require("gulp-csso");
  sass.compiler = require("node-sass"); // node.js에서 sass를 사용하기 위해 추가
  return gulp.src("assets/scss/styles.scss").pipe(sass().on("error", sass.logError))  // sass코드를 css코드로 바꾼다.
  .pipe(postCSS([  // sass작업말고도 postcss로도 작업
    require("tailwindcss"); // SCSS파일에  @tailwind 라고 쓰여진 부분을 인식하여 실제 css코드로(@apply 룰, @tailwind 룰을 nomal css로 바꾸는 작업을 한다) 바꾼다.
    require("autoprefixer");  // 수정
    ]))
    .pipe(minify())  // css 파일의 용량을 작게 만들어 주는 작업을 해준다.
    .pipe(gulp.dest("static/css"));  // 컴파일하고 작게 만들어진 css를 static/css 폴더에 저장
}

// sass()는 scss파일을 css로 컴파일한다.
// postCSS 자체는 아무것도 안한다. 툴로서, postCSS를 이용해 tailwindcss 플러그인을 적용한다.


exports.default = css;  // css 함수를 명령어 없이 사용가능하게?

```

sass파일에는 sass 코드를 사용할 수 있다.  
css 편집과 관련된 모든 것들은 scss파일에서 작성해야한다.  
sass()는 sass파일에 있는 sass코드를 css코드로 바꾸고  
postCSS( require("tailwindcss"); require("autoprefixer");)는 tailwind 코드를 css코드로 바꾼 다음에 수정할 부분을 수정한다.

참조:[sass에 대해](https://heropy.blog/2018/01/31/sass/)  
[gulp에 대해 - 사용방법](https://iam-song.tistory.com/40)

6. `assets`라는 폴더를 만들고 거기에 모든 scss파일들을 넣는다.  
   `assets/scss/styles.scss`라고 만들어주자.  
   `styles.scss`파일은 컴파일되어서 static폴더에 css파일로 저장될 것이다.

7. `assets/scss/style.scss` 에 tailwindcss가 작용하도록 코딩

@tailwind 라고 쓰는 건 directive를 위한 규칙이다.

```python

# assets/scss/style.scss

@tailwind base;
@tailwind components;
@tailwind utilities;

```

8. package.json에 scripts 항목을 추가 (명령어)
   추가를 한 다음에 `npm run css` 터미널에 처보자.  
   그러면 `static/css/styles.css` 파일이 생성된다.

```python


{
  "name": "airbnb-clone",
  "version": "1.0.0",
  "description": "Cloning Airbnb with Python, Django, Tailwind and more..",

  "repository": {
    "type": "git",
    "url": "git+https://github.com/abel9851/airbnb_clone.git"
  },
  "scripts": {
    "css": "gulp"
  },
  "homepage": "https://github.com/abel9851/airbnb_clone#readme",
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-csso": "^4.0.1",
    "gulp-postcss": "^9.0.0",
    "gulp-sass": "^4.1.0",
    "node-sass": "^5.0.0",
    "postcss": "^8.2.8",
    "tailwindcss": "^2.0.3",
    "autoprefixer": "^9.0.1"
  }
}


```

9. 장고에서 사용하기

css 스크립트를 실행할 때마다(`npm run css`를 터미널에 입력)  
gulp을 불러올 거고(gulp은 `gulpfile.js`파일을 의미한다)

따로 packge.json을 장고에 연결하는 방법도 있겠지만  
이번 경우는 `npm run css`라는 명령어를 통해 gulp을 수행시켜서 scss 파일을 css 파일로 컴파일링해서 그 파일을  
`static/css/styles.css`로 저장했기 때문에 장고에서는 단순히 `style.css` 파일을 읽기만 하면 된다.

`static/css/styles.css` 안의 내용이 변경되었을 경우(코딩이라든가), 꼭 `npm run css`를 해줘서 반영해야한다.  
이게 귀찮으면 gulp의 플러그인인 `watch`를 사용해서 파일을 실시간으로 주시하도록 만들면 실시간으로 반영될 것이다.  
처음에 한번 명령어를 실행해줘야겠지만.

**하지만 브라우저에서 url로 `static/css/styles.css` 접근하면 `page not found`가 뜬다.**  
**이는 장고의 보안 상 함부로 파일에 접근 할수 없도록 막아놓았기 때문이다.**  
**서버에 줘야할 css파일을 주지 않는 상황이다.**
**사용을 할 수 있도록 `static/css/styles.css`를 expose해줘야한다.**

10. css폴더 expose 하기

url로 `/static/`에 접근할때 (/ /은 절대 경로를 뜻한다.)
우리가 어떤 파일을, 어디에 있는 파일을 볼 수 있는지 말해줘야한다.  
그것을 연결할 디렉토리를 설정하는 것이 `STATICFILES_DIRS`이다.

경로 설정은 장고 3.1 버전 이상에서는 `from pathlib import Path`를 사용하기 때문에  
(`import os`를 사용해서 `os.path.join(BASE_DIR, "uploads")`를 사용해도 되지만)  
`STATICFILES_DIRS = [BASE_DIR / "static",]`를 사용하도록 하자.

```python

#settings.py



from pathlib import Path


STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]



```

11. template에 `style.css`를 사용할 수 있도록 코딩

```python

{% load static i18n %}  # 아래의 {% static %} 태그를 사용하기 위해 로드해준다.
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
        <link rel="stylesheet" href="{% static 'css/styles.css' %}">  # link태그를 이용해서 tailwind css를 사용할 수 있도록 한다.
        <title>
        </title>
    </head>
    <body>
        <header>
        </header>
        <script>
        </script>
    </body>
</html>

```
