## terraform cloudwatch log filter 설정

```bash
# kinesis sbuscription

# iam.tf
resource "aws_iam_policy" "cloudwatch_kinesis_subscription" {
  name   = "${var.product}-subscription-${var.env}"
  policy = data.aws_iam_policy_document.cloudwatch_kinesis_subscription_policy.json
}

data "aws_iam_policy_document" "cloudwatch_kinesis_subscription_policy" {
  statement {
    effect = "Allow"

    actions = [
      "firehose:*"
    ]

    resources = [
      "*"
    ]
  }
}

resource "aws_iam_role" "cloudwatch_kinesis_subscription" {
  name               = "${var.product}-subscription-${var.env}"
  assume_role_policy = data.aws_iam_policy_document.cloudwatch_kinesis_subscription_role.json
}

data "aws_iam_policy_document" "cloudwatch_kinesis_subscription_role" {
  statement {
    effect = "Allow"

    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["logs.ap-northeast-1.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy_attachment" "cloudwatch_kinesis_subscription" {
  name       = "${var.product}-subscription-${var.env}"
  roles      = [aws_iam_role.cloudwatch_kinesis_subscription.name]
  policy_arn = aws_iam_policy.cloudwatch_kinesis_subscription.arn
}

# variables.tf
variable "env" {
  type = string
  description = "environment"
}

variable "product" {
  type = string
  description = "product name"
}

#output.tf
output "iam_role_arn" {
    value = aws_iam_role.cloudwatch_kinesis_subscription.arn
    description = "aws_kinesis_subscription iam role arn"
}
```

```bash
# kinesis_firehose_delivery_stream

 # iam.tf
resource "aws_iam_policy" "policy_01" {
  name   = "${var.name}-policy"
  policy = data.aws_iam_policy_document.policy_01.json
}

data "aws_iam_policy_document" "policy_01" {
  statement {
    effect = "Allow"

    actions = [
      "s3:AbortMultipartUpload",
      "s3:GetBucketLocation",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:ListBucketMultipartUploads",
      "s3:PutObject"
    ]

    resources = [
      var.s3_arn,
      "${var.s3_arn}/*"
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "logs:PutLogEvents"
    ]

    resources = [
      "*"
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "kinesis:DescribeStream",
      "kinesis:GetShardIterator",
      "kinesis:GetRecords",
      "kinesis:ListShards"
    ]

    resources = [
      "*"
    ]
  }

}

resource "aws_iam_role" "role_01" {
  name               = "${var.name}-role"
  assume_role_policy = data.aws_iam_policy_document.role_01.json
}

data "aws_iam_policy_document" "role_01" {
  statement {
    effect = "Allow"

    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["firehose.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy_attachment" "policy_01" {
  name       = var.name
  roles      = [aws_iam_role.role_01.name]
  policy_arn = aws_iam_policy.policy_01.arn
}

```

```bash
# cloudwatch log subscription filter의 목적지가 될 kinesis firehose delivery stream의 data.tf

data "aws_kinesis_firehose_delivery_stream" "firehose_connection_aws_datadog" {
	name = "firehose_connected_datadog"
}
```

```bash
# cloudwatch log subscrption filter 설정

resource "aws_cloudwatch_log_subscription_filter" {
	name = aws_cloudwatch_log_group.firelens_app_access_log.name # cloudwatach logs의 이름 설정
	filter_pattern ="" # 필터 설정 ""은 모든 로그를 보낸다. 설정하는 방법은 공식문서 참조.
	role_arn = var.aws_kinesis_subscription_iam_role_arn # aws kinesis firehose에 log를 보낼수 있는 role의 arn을 설정
	destination_arn = data.aws_kinesis_firehose_delivery_stream.firehose_connecting_aws_datadog.arn # 목적지인 kinesis firehose delivery stream의 arn을 설정
	distribution = "Random" # Amazon Kinesis stream이 목적지일 경우 사용할 수 있는 옵션인데 로그 데이터의 목적지를 분산 시킬수 있다.
	log_group_name = aws_cloudwatch_log_group.firelens_app_access_log.name # log group name을 설정 ex."/aws/lambda/example_lambda_name"
}

```

Reference

[Filter and pattern syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html)

[Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter)
