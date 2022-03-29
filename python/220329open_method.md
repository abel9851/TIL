# open　メソッド使い方

scrapingでaws s3に保存した後、csvファイルでデータを出力する機会が多い、  
今回openメソッドについて簡単に整理しようとする。

- open  
openメソッドはpythonのbuiltinメソッドであり、  
ファイルを作って、書き込んだり、読み込むことができる。  
ファイルをwriteモードに開いたら、該当ファイルが既に存在する場合、  
既存のファイルの中にあった内容は全部無くなる。  
ファイルが存在しない場合は新しくファイルを生成する。  
またパラメータに生成したいルートも記入したらその位置に生成される。  
**だけどそのルートにないディレクトリは自動で生成してくれないので注意**。
作業が終わったら必ず**close**をしなければならない。  
'+'`を'w+r'のように使うと、write、readモードを同時に使うことができる。　　
他のオプションは参照のリンクをみてみよう。

    - writeモード  
    wモードでは下記のコードのようにファイルの中にtextを書き込むことができる。
    ```python
    # ルートに書いているディレクトリは事前に存在しなければならない。
    f = open('C:/home/wd/myhome.txt', 'w', encoding='utf8')
    f.write("家についた")
    f.close()

    ```    
    - readモード
    readline()とreadlinesがある。  
    readlineは1lineずつ読み込んで変数に割り当てる。  
    readlinesはファイルからline毎に読み込んでlistを作る。  
    ```python
    f = open('C:/home/wd/myhome.txt', 'r', encoding='utf8')
    result = f.read()
    # "家についた"が出力される。
    print(result)
    
    # line一つずつ読み込んで読むlineがない時まで出力する。
    while True:
        line = f.readline()
        if not line: break
        print(line)

    # 対象ファイルの中にあるlineを全部読み込んでlistに作った後に
    # for文を使って出力する。
    lines = f.readlines()
    for line in lines:
        line = line.strip() # strip()を使うと\nの適応が消える。
        # strip()はパラメータであげた文字を削除する。この場合は空白を削除する。 
    f.close()


    ``` 
    
    - addモード
    ```python
    f = open('C:/home/wd/myhome.txt', 'a', encoding='utf8')
    # "家でご飯を食べる"が"家についた"の後ろに追加される。
    f.write("家でご飯を食べる")
    # "皿洗いをする"が"家でご飯を食べる"の次のlineに追加される。
    f.write("\n皿洗いをする")
    f.close()
    ```
    - textモード  
    textファイルを扱うモード。w、r、aの後ろに何も書いてない場合、  
    defaultとしてtextモードになる。
    ```python
    f = open('myhome.txt', 'w+t')
    ```
    
    - binaryモード  
    imageファイルのようなバイナリファイルを扱うモード
    ```python
    f = open('myhome.txt', 'wb')

    ```



- with  
openを使った後には必ずcloseをしなければならない。  
with文を使うと、closeをしなくてもいいというメリットがある。  
これはpythonがwith ~as文を実行した後にclose()を呼び出すからだ。  

```python

# closeをする必要がない。
with open('myhome.txt', 'w', encoding='utf8') as myhome:
    myhome.write('家に着いた')
# readメソッドを使う時もcloseをする必要はない。
with open('myhome.txt', 'r', encoding='utf8') as myhome:
    text_in_myhome_txt = myhome.read()
    # print()すると、"家に着いた"という文が出力される。
    print(text_in_myhome_txt)

```

参照  
[파이썬의 파일 처리 file processing](https://yes90.tistory.com/56)