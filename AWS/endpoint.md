## VPC 엔드포인트

VPC 내부의 리소스가 인터넷으로 통신하는 것이 아니라, AWS 리소스(VPC 밖에 있는)와 통신하도록 하게 해주는 것이 엔드포인트이다.

VPC에 있는 EC2에서 VPC외부에 있는 S3, DynamoDB와 통신하기 위해서는 Gateway endpoint를 사용한다.

\*S3와 DynamoDB는 VPC외부에 있다.

다른 AWS 서비스도 VPC외부에 있는데, 이 경우는 인터페이스 엔드포인트를 사용해 통신한다.

[3. 3주차-VPC엔드포인트](https://brunch.co.kr/@topasvga/1316)
