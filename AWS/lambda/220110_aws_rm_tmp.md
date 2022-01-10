# AWS Lambdaのtmp fileを削除する方法  

同じlambdaを連続的に呼び出すと、  
tmp fileに前回に実行したlambdaのtmp fileの内容物が残る場合がある。  
それによってlambdaの実行が止まるケースがあるので  
tmp fileを使いながら連続的にlambdaを呼び出す時には  
lambdaをロジックを実行した後、tmp fileをcleanするロジックを入れたらいい。


・コード
```python

# プロセスを扱うpythonの内部モジュール。
# subprocessを使うと、ハードウェアを制御できる。
from subprocess import call

# call()は命令を処理するメソッド
# shell=Trueにすると、shell(terminal)を実行して、中に命令問を入れて実行できる。
# -rはリカーシブ(recursive)で、ディレクトリとディレクトリの  
# 中にあるfileを全部削除する。　
# -fはyes、noを選択する必要がない、ただ命令を実行する。
call("rm -rf /tmp/*", shell=True)

```



・参照  
[subprocess モジュール](http://www.incodom.kr/%ED%8C%8C%EC%9D%B4%EC%8D%AC/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/subprocess)  
[rm -rf オプション](https://ko.wikipedia.org/wiki/Rm_(%EC%9C%A0%EB%8B%89%EC%8A%A4))  
[AWS lambda /tmp delete](https://stackoverflow.com/questions/44108712/aws-lambda-release-tmp-storage-after-each-execution)  
[AWS Lambdaで/tmpディレクトリ上のデータが。。](https://qiita.com/r-wakatsuki/items/1cdb9493749dbc36bed2)  
[with open("파일", mode="w")](https://wikidocs.net/26)  
[sys.pathについて](https://www.bangseongbeom.com/sys-path-pythonpath.html)  
[環境変数及びsysを利用したモジュールimport](https://sshkim.tistory.com/158)  
[他のフォルダーにあるpython import!-sys.path.insert](https://m.blog.naver.com/altmshfkgudtjr/221456927403)  
[\[Python\] sys.path.insertとは？](https://teratail.com/questions/249035)

[Are files from /tmp automatically deleted by AWS Lambda?](https://stackoverflow.com/questions/69706267/are-files-from-tmp-automatically-deleted-by-aws-lambda?rq=1)  

[Subprocess 모듈이란?](https://soooprmx.com/python-subprocess-1/)  
[외부 명령어 실행 라이브러리 subprocess](http://www.incodom.kr/%ED%8C%8C%EC%9D%B4%EC%8D%AC/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/subprocess)