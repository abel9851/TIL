## terraform data

Data source는 terraform을 사용하지 않고 만든 infrastructure resource 또는 다른 곳에서 사용중인 Terraform code를 통해 ㅁ나들어진 resource의 data를 가져오는데 사용된다.

각각의 provider들은 resource와 함께 data source도 제공하고 있다.

```bash
data "aws_iam_user" "foo" {
	user_name = "foo_name"
}

resource "aws_iam_user" "bar" {
	name = "bar_name"
	path = data.aws_iam_user.foo.path
}
```

data를 가져오기 위해서는 data block 안에 정보들(Arguments)을 명시해줘야 하는데

이 arguments에 대한 내용은 각각의 Provider 페이지에서 확인 할 수 있다.

data block을 통해 data instance가 생성되고 이걸 참조하여 원하는 data를 가져올 수 있다.

resource 사용법과 동일하게 data.<TYPE>.<NAME>.<ATTRIBUTE> 문법을 사용하여 가져올 수 있다.

data instance는 type에 따라 참조할 수 있는 Attribute가 있으며, 각각의 data source문서를 참고하면 된다.

[Terraform data sources](https://velog.io/@gentledev10/terraform-data-source)
