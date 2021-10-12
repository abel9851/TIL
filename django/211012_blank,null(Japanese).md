# nullとblankの違い

nullとblankは二つ全部デフォルトがFalseだ。
この二つの設定はfield(列)水準で動作する。

`null=True`はfieldの値がNULL(情報なし)でセーブされることを許容する(データベースの列)

```python

from django.db import models

date = models.DateTimeField(null=True)

```

`blank=True`はfieldがform(入力フォーマット)で空でセーブされることを許容する。

```python

#　formに空でセーブするのが可能　データベースには''としてセーブされる
title = models.Charfield(blank=True)

```

`null=True`と`blank=True`を全部指定すると、どういう条件でも値を空でするのができるのを意味する。


```python

#しかし、Charfield()とTextField()では例外
# Djangoは上の二つの場合、NULLをセーブしない、空の値を空の文字列('')でセーブする
epic = models.Foreignkey(null=True, blank=True)
name = models.CharField(blank=True)
bio = models.TextField(blank=True)

```

また例外がある。
**BooleanFieldではNUllを入力するためには、`null=True`ではなく**
**NullBooleanFieldを使用しなければならない**