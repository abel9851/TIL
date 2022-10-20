## sys.getrefcount()

```python
import sys

print(sys.getrefcount(1000))  # 2: Windows에서 처음 레퍼런스 카운트는 2
x=1000                        # 3: 리눅스에서 처음 레퍼런스 카운트는 3
print(sys.getrefcount(1000))  # 3: 1000을 한 번 사용하여 레퍼런스 카운트 1 증가(Windows)
                              # 4: 리눅스
y=1000                        # y에 1000을 저장
print(sys.getrefcount(1000))  # 4: 1000을 한 번 사용하여 레퍼런스 카운트 1 증가(Windows)
															# 5: 리눅스
print(x is y) # true
```
