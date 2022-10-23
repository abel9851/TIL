## 문자열 정렬

ljust(길이), rjust(길이)는 문자열을 지정된 길이로 만든 뒤 왼쪽이나 오른쪽으로 정렬하며 남은 공간을 공백으로 채운다.

center(길이)는 문자열을 지정된 길이로 만든 뒤 가운데로 정렬하고 나머지 공간을 공백으로 채운다.

center의 길이가 홀수라면, 왼쪽 공백이 한칸 더 들어간다.

```python
print('python'.rjust(10))  # 출력: '    python'
print('python'.ljust(10))  # 출력: 'python    '
print('python'.center(10)) # 출력: '  python  '
print('python'.center(11)) # 출력: '   python  '
```
