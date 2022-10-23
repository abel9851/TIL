## 지뢰찾기 만들기

표준 입력으로 2차원 리스트의 가로(col)와 세로(row)가 입력되고 그 다음 줄부터 리스트의 요소로 들어갈 문자가 입력됩니다. 이때 2차원 리스트 안에서 \*는 지뢰이고 .은 지뢰가 아닙니다. 지뢰가 아닌 요소에는 인접한 지뢰의 개수를 출력하는 프로그램을 만드세요(input에서 안내 문자열은 출력하지 않아야 합니다).

여러 줄을 입력 받으려면 다음과 같이 for 반복문에서 input을 호출한 뒤 append로 각 줄을 추가하면 됩니다(list 안에 문자열을 넣으면 문자열이 문자 리스트로 변환됩니다).

`matrix = [] for i in range(row): matrix.append(list(input()))`

이 문제는 지금까지 심사문제 중에서 가장 어렵습니다. 처음 풀어보는 경우 대략 두 시간은 걸립니다. 시간을 두고 천천히 고민해서 풀어보세요. 지금까지 학습한 내용을 모두 동원해야 풀 수 있으며 막힐 때는 지금까지 학습한 내용을 다시 복습하면서 힌트를 찾아보세요.

```python
row,col=map(int,input().split())
matrix=[]
for i in range(row):
  matrix.append(list(input()))

for i in range(row):
  for j in range(col):
    if matrix[i][j] == "*":
      print(matrix[i][j],end="")
      continue
    else:
      matrix[i][j] = 0
      for y in range(i-1, i+2):
        for x in range(j-1, j+2):
          if not (y < 0 or x < 0 or y >= row or x >= col): # 여기가 포인트. continue를 사용하는 거.
            if matrix[y][x] == "*":
              matrix[i][j]+=1
      print(matrix[i][j],end="")
  print()

# 풀이
"""
먼저 2차원 리스트의 가로와 세로가 한 줄에 입력되므로 input에서 split을 사용한 뒤 변수 두 개에 저장해주면 됩니다(이하 변수는 col, row). 이때 input().split()의 결과는 문자열 상태이므로 map에 int를 사용하여 정수로 변환해줍니다.

가로와 세로를 입력받았으면 빈 리스트 matrix를 만듭니다. 그리고 row만큼 matrix.append(list(input()))를 반복해주면 입력된 문자열이 2차원 리스트 형태로 들어갑니다. 즉, input으로 한 줄씩 입력받은 뒤 list를 사용하면 문자열이 문자 리스트로 변환됩니다. 이걸 matrix에 append로 추가하면 2차원 리스트가 됩니다.

2차원 리스트가 준비되면 for range로 col, row만큼 반복하면서 요소가 *이면 continue로 건너뛰고 *가 아니면 0을 넣습니다.

0을 넣은 뒤에는 요소 주변 8개를 탐색하면서 *이면 요소를 1개씩 증가시키면 됩니다. 주변 요소를 탐색할 때는 range에 시작하는 값을 i - 1로 지정하고, 끝나는 값을 i + 2로 지정하여 한 칸 위부터 한 칸 아래까지 탐색합니다. 왜냐하면 range에서 생성한 숫자의 마지막 값은 끝나는 값보다 1 작은데, 탐색을 위해서 한 칸 아래까지 더 반복해야 하므로 i + 1이 아닌 i + 2가 되어야 합니다. 그리고 한 칸 앞과 한 칸 뒤도 같은 방식으로 반복합니다.

for y in range(i - 1, i + 2):         # 한 칸 위부터 한 칸 아래까지 반복
    for x in range(j - 1, j + 2):     # 한 칸 앞(왼쪽)부터 한 칸 뒤(오른쪽)까지 반복
단, 주변 요소를 탐색할 때 리스트의 범위를 벗어나면(y < 0 or x < 0 or y >= row or x >= col) 요소에는 접근하지 않고 건너뛰어야 합니다. 그렇지 않으면 인덱스가 음수가 되어 반대편 요소를 검사하거나, 요소가 없는 인덱스에 접근하게 됩니다.

참고로 2차원 리스트를 반복할 때 for i in matrix:와 for j in i:처럼 요소만 가져오면 인덱스를 알 수 없어서 주변을 탐색할 수 없습니다. 따라서 for에 range 또는 enumerate를 사용하거나 while을 사용하세요.
"""
```
