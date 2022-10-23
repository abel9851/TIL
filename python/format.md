## format으로 문자열 정렬하기

```python
name='heejun'
a = '{name:>10}'.format(name=name) # :< 이면 문자열을 왼쪽으로 정렬하고 나머지는 공백으로 채움
								# :> 이면 문자열을 오른쪽으로 정렬하고 나머지는 공백으로 채움
print(a) # "    heejun"
```
