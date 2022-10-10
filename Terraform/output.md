## terraform output

Terraform은 입력변수 이외에 출력변수도 설정해서 원하는 값을 출력할 수 있다.

variable로 입력 변수를 컨트롤하고, output으로 출력변수를 컨트롤 한다고 생각하면 된다.

output을 사용하면 `terraform apply` 결과로 내가 지정한 값들이 출력되고 tfstate파일에도 output값이 저장되기 때문에 원하는 정보를 VSC같은 개별환경에서 바로 확인할 수 있다.

add, change, destroy이외에도 output 값이 터미널에 출력된다.

다른 사용법으로는 서브모듈에서 output을 하면, 루트 모듈에서 다른 모듈에 할당하는 것이 가능하다.

즉, 서브모듈에서 output→ 루트모듈(main)에서 서브모듈에서 받은 output을 변수로 지정→ 다른 서브모듈의 variables.tf에서 루트모듈에서 받은 변수를 설정하면 된다.

variable=output인 것이다.

```bash
# kinesis_subscription 모듈
output "iam_role_arn" {
    value = aws_iam_role.cloudwatch_kinesis_subscription.arn
    description = "aws_kinesis_subscription iam role arn"
}
```

```bash
module "database" {
	source = "../module/database # 다른 모듈 중 하나인 database 모듈
	aws_kinesis_subscription_iam_role_arn = module.kinesis_subscription.iam_role_arn
} # kinesis_subscription 모듈에서 output한 값을 사용.

```

이렇게 다른 모듈에서 끌어다가 쓸수도 있고 그냥 생성한 리소스를 data로 지정해서 사용해도 괜찮다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48b8ffd2-b62c-4b9a-9eca-b7ecd4e09c5d/Untitled.png)

```bash
data "aws_kinesis_firehose_delivery_stream" "firehose_connecting_aws_datadog" {
  name = "firehose_connected_datadog"
}
```

Reference

[[Terraform] Output (EC2 생성 후 IP 출력)](https://cloudest.oopy.io/posting/034)

[Command: output | Terraform by HashiCorp](https://www.terraform.io/cli/commands/output)

[[Terraform] providers, resource, variables, output, data](https://jybaek.tistory.com/899)
