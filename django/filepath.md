# file path에 대해

- djangop에서 BASE_DIR  
  사용하고 있는 것은 pathlib. **django3.1부터 pathlib(파이썬에 추가됨)으로, 기본 BASE_DIR 작성이 변경됨**  
  pathlib는 파일경로를 단순히 문자열이 아니라, 객체로 다루자는 것.

```python
import pathlib import Path

BASE_DIR = path(__file__).resolve().parent.parent.parent

#해석
path(__file__) # 현재 파일의 경로
resolve() # 경로를 절대경로로하고 심폴릭 링크를 해제한다.
parent # 현재 파일이 있는 디렉토리를 제공

```

참조:(파이썬 경로)[https://dogpitch.oopy.io/python/path]  
참조:(리눅스 - 심볼릭,하드링크)[http://itnovice1.blogspot.com/2019/10/blog-post_6.html]

**\_\_file\_\_이란**
현재 실행중인 파일명.py의 파일명을 가져온다.

```python
#pytest.py가 C:/Users/test에 위치

import os
print(os.path.dirname(__file__))

#출력결과
C:/Users/test
```

(파일과 디렉토리)[http://pythonstudy.xyz/python/article/507-%ED%8C%8C%EC%9D%BC%EA%B3%BC-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC]

- airbnb clone에서의 BASE_DIR

```python

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


#해석
__file__ # 현재파일의 파일면
path.abspath # 절대경로를 문자열로 반환
os.path.dirname # 인자의 마지막 경로 분리 문자(/)까지의 문자열을 반환
#즉, 인자로 지정된 경로의 상위 계층 경로를 반환

```

```python
#os.path.abspath(__file__)이 수행 됬을때

os.path.dirname(os.path.dirname(…/folder-name/project-name/settings.py)

# os.path.dirname()이 1회 수행 됬을때 결과
os.path.dirname(…/folder-name/project-name/)

# os.path.dirname()이 2회 수행 됬을때 결과
(…/folder-name/)
```

- os와 pathlib 비교

```python
#os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#pathlib
BASE_DIR = Path(__file__).resolve().parent.parent

```

참조: [os.path, pathlib 비교 - 일본어](https://office54.net/python/settings-base-dir)