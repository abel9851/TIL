# lambdaでスクレイピングするため必要なもの(selenium、headless chromium、chrome driver)


seleniumをlambdaで使うためには  
headless chromeとchrome driverが必要だ。  
lambdaはaws linux2のコンテナで起動するserverless computing serviceだ。  
linuxと同じくGUIではないため、一般のパソコンみたいにブラウザでボタンをクリックする、検索する等の  
行為はできない。  

そこで使えるものがHeadless Chromeだ。  
Headlessとは、窓口がないという意味で理解したら良い。  
Headless chromeを使うと、linuxみたいに画面がないOSでブラウザの窓口を使わず、画面のRendering(HTML、CSS、javascript等開発者が作成した文書をブラウザにグラフィック形で出力する過程)を仮想で進行してくれる。  
結果、実際のブラウザと同じく作動するが、窓口は必要な方式でchromeを使うとことができる。


## chromeのバージョン確認
window95。mac/linux基準でchrome60バージョンから  
chromeにHeadless modeが正式に使いされて
chromeブラウザが最新であればchromeのheadlessモードを使える。


## chromeとchromiumの違い  
lambdaにlayerでchromeを実装する時、
headless chromiumを使う場合がある。  
chromeとchromeiumは違うものである。  
chromiumとはOSS projectから作られたブラウザの名前だ。  
このプロジェクトの産物といｓて出たchromiumのコードは  
多様なブラウザの基盤エンジンになった。  
ex) chrome、edge、opera、naver whale等


このchromiumに色んな機能と要素を追加して誕生したものがchromeである。  
そもそもchromium projectの設計目的がGoogle chrome ブラウザ、chrome OSのためのOSS projectだ。  

chromiumとchromeの違いは下記のようになる。  
google nameとロゴ、使用者識別認証キーの要求事項、  
自動アップデート、使用情報及びエラーの報告書をgoogleに送るに対して選択の有無、  
使用情報の追跡、chromeとは違うosビルトインPDFviewer、プリントのプレビュー、プリントシステム、  
ビルトインadobe flash player等。


またchromiumはchromeと比べ、不安定で  
最新のchromiumは初期バージョンのchromeよりもバグやクラッシュに弱い。  

そういうデメリットがあるけど、chromiumを使う理由はchromeより少ない使用者情報をgoogleに転送するからだと言う。

探している途中だが、lambda(aws linux2)でのchrome versionは  
chrome version = headless chromever versionだと認識する方がいいと思う。

## AWS lambdaでchromeではなくchromiumを使う理由

正確ではないが、予想としては二つ。  
1. chromeのheadlessモードを使うよりはheadless chromiumを使うのが軽量。  
2. chromeは自動アップデートされるのでweb driverとの交換性に影響を与える。  
    chrome driverが自動chromeのアップデートに対して対応できる範囲がありそうだが、それも限界がある。  
   つまり、動作できなくなるかもしれない。  

上記の理由でheadless chromeの代わりにheadless chromiumが使われると思う。

chrome、chromium、chrome driverは各自バージョンを持って管理されている。  
chrome driverはchrome、chromiumを扱うために必要だが、  
chrome driverのバージョンによって対応できるchrome、chromiumのバージョンが異なる。  
なのでchrome driver、chromeもしくはchromiumの間のバージョン組み合わせが必要だ。  


注意するべきものはchrome、chromiumの最新のバージョンを使いたい時は  
そのバージョンに合うchrome driverを使わなければならない。  
chrome driverが最新バージョンのchrome、chromiumをサポートするバージョンが出てないと  
最新バージョンのchrome、chromiumは使えない。  


なので、安定的にchromeを使うことを前提としてスクレイピングをするためには  
**chrome driverの最新バージョンがサポートできるchromiumを使ったらそれがベスト。**

何としてもchromeを使いたいなら、chromeがアップデートされる都度  
chrome driverを手動でアップデートするか、[自動でアップデートしてくれるtool](https://hytmachineworks.hatenablog.com/entry/2019/07/21/170501)を使ったら良い。

## seleniumを使う理由  
beautifulsoupと違ってseleniumはAJAXで作られたwebsiteのデータを取得すのができる。  
またJSで動的に作られた情報を取ることができる。
例えばスクロールをしてデータを取得する必要がある時やサイトの多様なHTML要素を  
クリック、キーボード入力等のイベントを行って情報を取ることができるからだ。(beautifulsoupは上記の人みたいな操作が難しい。)


参照  
[HeadLess Choromeでクローリングする(韓国語)](https://beomi.github.io/gb-crawling/posts/2017-09-28-HowToMakeWebCrawler-Headless-Chrome.html)  
[レンダリング(韓国語)](https://velog.io/@kimu2370/%EB%9E%9C%EB%8D%94%EB%A7%81)  
[chromium? chrome? 何が違うのか(韓国語)](https://ykarma1996.tistory.com/72)  
[Headless ChromeとSeleniumをLambdaで動かす](https://xp-cloud.jp/blog/2020/01/22/6637/)  
[chromedriverの自動バージョンアップスクリプト「chromedriver_update_tool」を公開しました Windows10 Python3 Selenium](https://hytmachineworks.hatenablog.com/entry/2019/07/21/170501)
