## AssumRole

AssumRole하는 것으로 IAM role에 설정되어있는 권한을 맡는게 가능하다.

sts:AssumeRole이라고 하는데, sts는 Security Token Service이다.

정확히는, sts를 매개로 해서 IAM Role과 같은 권한을 일시적으로 갖는 것이다.

AssumRole을 수행해서 문제가 없는지 확인하고, 문제가 없으면 유저에게 3개를 부여한다.

엑세스 키, 시크릿 액세스 키, 섹션토큰.

신뢰정책: IAM Role을 맡을 수 있는 엔티티를 정의.(분류로서는 리소스 베이스 폴리시에 속한다. 신뢰관계 탭에서 확인 가능.)

ex)

{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Principal": {
"Service": "[ec2.amazonaws.com](http://ec2.amazonaws.com/)"
},
"Action": "sts:AssumeRole"
}
]
}

아이덴티티베이스정책: 실행 할 수 있는 액션을 정의.

permissions boundary:실행 할 수 있는 액션에 경계를 정의.

IAM Role이 설정되면, 기존에 갖고 있던 권한은 사라진다.

같은 IAM Role이 설정된 엔티티는 같은 권한을 갖는다. 엔티티는 IAM 유저에 한정되지 않고

AWS 서비스, 외부 ldp인 경우도 있다.

## PassRole

IAM: PassRole은 AWS 서비스에 IAM롤을 패스하기 위한 권한이다.

예를 들어 AmazonEC2FullAccess권한만 가지고 있는 유저가 EC2를 생성할때 Role을 지정하면,

에러가 발생한다.

IAM 유저가 PassRole의 허가가 필요하기 때문이다.

Role까지 지정하면서 EC2생성때 필요해지는 것은ec2:RunInstances와 iam:PassRole이다.

함수 실행때 필요한 파라미터가 없는 상태로 실행을 하면 에러가 나오는것과 마찬가지이다.

그리고 이 PassRole은 Reource(action에 따라 지정할수 있는 Resouce가 다르니까 공식문서를 확인하자)에 PassRole 할수 있는 Role을 지정할수 있고, iam:PassedToService에 Role을 건네줄 대상이 될 AWS서비스를 제한할 수 있다. ex) [ec2.amazonaws.com](http://ec2.amazonaws.com) 이라고 하면 ec2에만 Role을 건네줄 수 있다.

[IAM ロールの PassRole と AssumeRole をもう二度と忘れないために絵を描いてみた | DevelopersIO](https://dev.classmethod.jp/articles/iam-role-passrole-assumerole/)
