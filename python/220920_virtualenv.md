# virtualenv

## 가상환경설치

```python

sudo pip install virtualenv

# -m옵션으로 python을 기동하면, $PYTHONPATH로부터 모듈을 검색해서 실행한다.

sudo python -m pip install virtualenv

```

## venv 생성

```python

# venv대신에 다른 이름을 사용해도 된다. 가상환경이름을 지정하는 곳.
# 파이썬 버전은 원하는 버전을 설정가능하다. 단, 그 버전이 설치가 되어 있어야한다.
virtualenv venv --python=python3.9.6

```

## 가상환경 사용하기

```python

source venv/bin/activate

```

## 가상환경 빠져나오기

```python

deactivate

```

## 가상환경 삭제

```python

sudo rm -rf 가상환경이름

```
