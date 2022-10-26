## N-gram 만들기

N-gram은 문자열에서 N개의 연속된 요소를 추출하는 방법이다.

```python
# 2-gram

text = 'Hello'

for i in range(len(text)-1):
	print(text[i],text[i+1],sep='')

# zip()으로 2-gram 만들기

text = "hello"

two_gram = zip(text, text[1:])
for i in two_gram:
	print(i[0],i[1],sep="")

# 3-gram

text = 'Hello'

for i in range(len(text)-2):
	print(text[i],text[i+1],text[i+2],sep='')

```
