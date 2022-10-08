## terraform ecr

```bash
resource "aws_ecr_repository" "ecr_01" {
  name                 = "${var.product}-${var.env}-${var.name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = var.ecr_image_scanning
  }
}

resource "aws_ecr_repository" "firelens_01" {
  name = "${var.product}-${var.env}-${var.name}"
  image_tag_mutability = "MUTABLE"

  images_scanning_configuration {
    scan_on_push = var.ecr_image_scanning
  }
}
```

image_tag_mutability: tag mutability를 리포지토리에 설정한다. MUTABLE, IMMUTABLE 둘 중 하나 설정해야하고, default는 MUTABLE이다.

MUTABLE로 하면 리포지토리에 이미 존재하는 태그가 지정된 이미지에 푸시를 시도할 때 푸시가 되지만 IMMUTABLE로 하면 푸시가 안된다.

images_scanning_configuration: 이미지스캔은 컨테이너 이미지의 소프트웨어 취약성을 식별하는데 도움이 된다. 리포지토리에 올려진 이미지를 스캔한다. enhanced scanning을 하면 운영체제 및 프로그래밍 언어 패키지의 취약성 모두에 대해 컨테이너 이미지가 스캔되고 새로운 취약성이 나타나면 스캔 결과가 업데이트되고 Amazon Inspector가 이벤트를 EventBridge에 전송하여 사용자에게 알린다.

Basic scanning은 ECR은, 오픈소스 Clair 프로젝트의 CVE(일반적인 취약성 및 노출) 데이터베이스를 사용한다. 기본 스캔을 사용하면 푸시할때 스캔하도록 리포지토리를 구성하거나 수동 스캔을 수행할 수 있으며 Amazon ECR에서 스캔 결과 목록을 제공한다.

Reference

[Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository)

[이미지 태그 변경 가능성](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/image-tag-mutability.html)

[이미지 스캔](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/image-scanning.html)
