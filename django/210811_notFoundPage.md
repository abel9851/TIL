# Not Found page

404페이지를 만들고 싶은 이유는  
브라우저가 404status를 이해할 수 있기 때문이다.

`http404`를 사용하자.

```python
from django.http import Http404
from django.shortcuts import renderS
from . import models as rooms_model

def room_detail(request, pk): # 탬플릿과 urls.py을 통해 pk를 받음. 실제로는 클라이언트가 a태그의 링크를 누르면, 그 객체의 pk가 http 리퀘스트로 오게 되어 있음.

try:
    room = rooms_model.Room.objects.get(pk=pk)  #인자로 받은 객체의 pk를 통해
                                                #그 pk의 객체(데이터베이스의 정보를 가진)를 데이터베이스에서 가져온다.
                                                #print(room)을 하면 __str__메서드가 나온다.

    return render(request, "rooms/detail.html", {"room": room})
except models.Room.DoseNotExist:
    raise Http404()
```

모델이 없으면 에러가 발생해서 Http404의 페이지를 발생시킨다.  
그러면 Page not found라는 페이지가 브라우저에 출력된다.

```python

#tempaltes/404.html

{% extends "base.html" %}

{% block content %}
    <h1>>Not found anymore</h1>
{% endblcok content %}

```

http404의 템플릿 http파일을 직접 만들 수도 있다.  
이 템플릿 http파일을 사용하려면 `DEBUG= Flase`, `ALLOWERD_HOST="*"`를 지정해야한다.  
**`Http404()`를 raise하는 것만으로 django는 templates안에 있는 404.html을 랜더링한다.**

**또한 urls.py에서 `handler404`변수에**  
**직접 404함수를 만들어서 랜더링해주는 방법도 있다.**

그 밖에도 `get_object_or_404()`를 사용하여  
객체가 없을 경우, 404페이지를 반환하도록 할 수 있고
