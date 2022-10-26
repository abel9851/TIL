## 파이썬 회문 판별기

```python
# 풀이1
word = input('단어를 입력하세요: ')

is_palindrome = True

for i in range(len(word) // 2):
    if word[i] != word[-1 - i]:
        is_palindrome = False
        break

print(is_palindrome)

# 풀이2
word = input('단어를 입력하세요: ')
print(word == word[::-1]) # 처음부터 할수 있는데까지(끝까지) -1 간격으로 배열을 만들어라. 즉, 반대가 나온다.

# 풀이3
word = input('단어를 입력하세요: ')
print(list(word) == list(reversed(word))) # reversed만 사용하면 reversed 객체가 나오므로 list()를 사용한다.

# 풀이4
word = input('단어를 입력하세요: ')
print(word == ''.join(reversed(word))
```

Reference

[https://blog.wonkyunglee.io/3](https://blog.wonkyunglee.io/3)
