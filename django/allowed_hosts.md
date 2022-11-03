## django Allowed hosts with aws elb

아래와 같이 쓰여져 있는데 회사에서는 ECS를 사용하고 있으므로 ECS의 프라이빗IP를 설정해줘야한다.

문제는 deploy될 때 프라이빗 IP가 바뀐다는 것이다. 이는 장고가 들어있는 컨테이너를 deploy를 하고 나서 ip를 알수 있을테니, 처음부터 정확한 프라이빗 ip를 장고의 allowed hosts에 설정하는 것은 지금으로서는 방법이 떠오르지 않는다.

취할 수 있는 해결책으로는 아래의 3개다.

1. 프라이빗ip의 액세스를 허가하는 것. → 책이 오면 판단한다. 구니콘이나 nginx, elb등에서 제어할수 있을지도?
2. ecs의 컨테이너에 route53으로 프라이빗 도메인을 설정하고 elb에서 health check할때 프라이빗 ip가 아닌, 프라이빗 도메인으로 할수 있으면 할수 있도록 설정한다. → 프라이빗 도메인을 설정하는 부분이 없다.
3. nginx 설정에서 허가할 도메인 말고는 전부 블록한다.

3번을 취할 것이다.

**AWS Application Load Balancer は、`http://アプリがデプロイされているEC2のプライベートIP`
  にアクセスして、ヘルスチェックを行います。**

Reference

[AWS ALB のヘルスチェックと Django の ALLOWED_HOSTS - 猫でもわかる Web プログラミングと副業](https://www.utakata.work/entry/2021/03/24/114349)

## aws alb invalid host header error django

1. AWS ALB의 리스너에 규칙을 설정한다. api server에 사용하고 있는 도메인만 허용하고 나머지는 고정반환 503으로 처리
2. 동적으로 ecs container의 사설 ip를 추가한다. 코드는 아래와 같다.

1의 대책으로 허용된 host header 이외에는 전부 블록, 2의 대책으로 alb의 health check에 사용되는 container의 사설 ip를 ALLOWED_HOSTS에 추가할 수 있다.

```python
ECS_CONTAINER_METADATA_URI_V4 = os.environ.get("ECS_CONTAINER_METADATA_URI_V4")
container_metadata = requests.get(ECS_CONTAINER_METADATA_URI_V4).json()
ALLOWED_HOSTS.append(container_metadata["Networks"][0]["IPv4Addresses"][0])
```

Reference

[Forums](https://repost.aws/forums?origin=thread.jspa&messageID=423533)

[Application Load Balancer のヘルスチェックの失敗をトラブルシューティングする](https://aws.amazon.com/jp/premiumsupport/knowledge-center/elb-fix-failing-health-checks-alb/)

[Django ALLOWED_HOSTS for Amazon ELB](https://stackoverflow.com/questions/35858040/django-allowed-hosts-for-amazon-elb)

[AWS ALB のヘルスチェックと Django の ALLOWED_HOSTS - 猫でもわかる Web プログラミングと副業](https://www.utakata.work/entry/2021/03/24/114349)

[When deploying Django into AWS Fargate how do you add the local ip into ALLOWED_HOSTS](https://stackoverflow.com/questions/49828259/when-deploying-django-into-aws-fargate-how-do-you-add-the-local-ip-into-allowed)
