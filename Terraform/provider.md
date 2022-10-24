## terraform provider

terraform init을 하면 tf파일에 정의된 provider 블록을 보고 거기에 쓰여있는 source와 지정된 버전을 확인한다.

설치된 provider를 확인하고 누락된 항목이 있으면 외부 레지스트리에서 다운로드 하여 실행환경에설치하는 작업을 수행하고 마지막으로 terraform init이 다시 실행될 때 동일한 proivder를 사용할 수 있도록 버전이나 해쉬값을 .terraform.lock.hcl이라는 로그파일에 써넣으면 처리가 완료된다.

그리고 root module, sub module의 main.tf에 required proivder에 명시되어 있지 않은 provider를 사용하고 있을 경우에는, tflint에 error로 걸리므로, 추가해줄 필요가 있다.

```bash
# root module main.tf

terraform {
  required_version = "~> 1.2.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.67.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.1.1"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.4.3"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.2.0"
    }
  }
```

```bash
# sub module main.tf

terraform {
  required_version = "~> 1.2.3"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.48.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }
}
```

Reference

[Terraform における Provider インストール処理を理解する（2021 年 2 月版） - Qiita](https://qiita.com/ryysud/items/a38bcc856069801878e9)
