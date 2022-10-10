## terraform aws iam role 설정 방법

1. aws_iam_policy: 폴리시를 만든다. policy에는 policy 본문을 설정.

```bash
# policy 부분에 polcy의 내용 부분을 지정.

resource "aws_iam_policy" "cloudwatch_kinesis_subscription" {
  name   = "${var.product}-subscription-${var.env}"
  policy = data.aws_iam_policy_document.cloudwatch_kinesis_subscription_policy.json
}
```

2.aws_iam_policy_document: policy에 들어갈 내용 설정

```bash
# 참고로 data로, 다른 곳에 쓰이게 할 수 있다.
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
```

여기까지가 policy 설정

1. aws_iam_role: role을 설정한다. assume_role_policy에는 assume_role을 내용을 설정

```bash
resource "aws_iam_role" "cloudwatch_kinesis_subscription" {
  name               = "${var.product}-subscription-${var.env}"
  assume_role_policy = data.aws_iam_policy_document.cloudwatch_kinesis_subscription_role.json
}
```

1. aws_iam_policy_document:2번처럼 policy이지만 이것은 신뢰 policy다.

```bash
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
```

1. aws_iam_policy_attachment: 1+2(실질적으로 리소스를 다룰 권한이 있는 policy), 3+4(role+신뢰 policy)를 부착시킨다!

```bash
# role에는 3+4(실질적으로는 3)를, policy에는 1+2(실질적으로는 1)를 설정한다.
resource "aws_iam_policy_attachment" "cloudwatch_kinesis_subscription" {
  name       = "${var.product}-subscription-${var.env}"
  roles      = [aws_iam_role.cloudwatch_kinesis_subscription.name]
  policy_arn = aws_iam_policy.cloudwatch_kinesis_subscription.arn
}
```

이렇게 하면 role(신뢰 policy+리소를 다룰 권한이 있는 poilicy)가 완성된다.

5번에서 작업이 끝나지만, 5번은 aws_iam_role에 부착하는 작업을 하는 resource이기 때문에

role의 arn을 사용하려면, 3번의 aws_iam_role에 aws_iam_role.리소스이름.arn으로 사용해야한다.
