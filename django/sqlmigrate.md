## django migration sql 확인

`python [manage.py](http://manage.py) sqlmigrate <appname> <migration file name>` 으로 터미널에서 sql문을 확인할 수 있다.

```bash
--
-- Alter field is_red on apple
--
ALTER TABLE `apple` MODIFY `is_red` bool NOT NULL;
```

## django mysql data type int에서 boolean으로 변경

djnago의 boolean field는 mysql에서 tinyint(1)다. int타입에서 tinyint로 변경하는 것이기 때문에

기존 int 타입이었던 컬럼의 value가 1 or 0이라면 문제없이 타입을 변경할 수 있다.

SQL문으로는 아래와 같다.

```sql
ALTER TABLE 'apple' MODIFY 'is_red' bool NOT NULL;
```
