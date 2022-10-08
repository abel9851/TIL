## AWS sts get-caller-identity

AWS_ACCOUNT_ID =$(aws sts get-caller-identity —query ‘Account’ —ouput text)

Reference

[【小ネタ】AWS CLI で AWS Account ID が取れるようになりました！ | DevelopersIO](https://dev.classmethod.jp/articles/get-aws-account-id-with-get-caller-identity/)
