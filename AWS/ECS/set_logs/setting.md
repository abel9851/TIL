## app log 출력하기 위한 aws 설정 - S3 공부

1. s3 버킷 생성 이름 sbcntr-020046073350

인터넷으로부터의 접근을 막기 위해 `모든 퍼블릭 엑세스 차단`을 체크한다.

퍼블릭 엑세스 차단은, 버킷 정책, 액세스 지점 정책 또는 모두를 통해 버킷 및 객체에 부여된다.

저장 로그를 암호화하기 위해, 기본 암호화 섹션에서 서버 측 암호화를 활성화.

암호화 키 유형은 AWS가 관리하는 Amazons3 관리형 키(SSE-S3)를 선택한다.

Reference

[Protecting data using server-side encryption with Amazon S3-managed encryption keys (SSE-S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html)
