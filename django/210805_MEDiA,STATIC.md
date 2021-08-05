# MEDIA와 STATIC 폴더

`static`은 개발자를 위한 폴더, `media`는 사용자를 위한 폴더

static폴더는 css, 이미지 파일처럼 사이트에 필요한 정적인 파일들을  
모아놓은 곳이다.  
개발자가 이미지나 파일을 추가하지 않는 이상 현재 상태가 유지된다.

media폴더는 데이터를 추가할때 ImageField나 FileField를 통해  
업로드되는 이미지나 파일들을 모아놓는 곳이다.  
사용자가 사이트에서 업로드하는 파일들이 여기로 모인다.  
사이트 관리자가 admin페이지에서 데이터를 추가할 때 올리는 이미지, 파일도 여기로 모인다.

**장고 3.1부터는 pathlib를 사용함으로 os.path를 사용해도 되지만 pathlib.Path를 사용하는 것이 간편하다.**

- MEDIA_ROOT  
  어디에다 우리가 업로드한 파일들을 써야할지 말해주는 곳.(Absolute filesystem path 절대적인 파일 경로)

config/settings.py

```python

MEDIA_ROOT = os.path.join(BASE_DIR, "uploads")

MEDIA_ROOT = BASE_DIR / "uploads" # 장고 3.1부터 이렇게 하는것이 편하다.


# 파일이 있는 실제 경로
```

- MEDIA_URL  
  위에서 지정한 media폴더(실제로는 uploads라는 폴더)의 URL상 주소를 지정한다.

```python
MEDIA_URL = "/media/" # media의 URL주소 ex) localhost:8000/media/
```

- STATICFILES_DIR
  어디에다 우리가 정적인 파일들을 놓아야할지 말해주는 곳.(Absolute filesystem path 절대적인 파일 경로)

config/settings.py

```python

STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]# 파일이 있는 실제 경로

STATICFILES_DIRS = [BASE_DIR / "static"]


```

- STATIC_URL

```python
STATIC_URL = "/static/" # media의 URL주소 ex) localhost:8000/media/
```
