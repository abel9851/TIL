## RDS pending-reboot

RDS의 파라미터는 정적 파라미터, 동적 파라미터가 있다.

동적 파라미터는 RDS 인스턴스를 재부팅할 필요도 없이 바로 파라미터가 적용되지만

정적 파라미터는 재부팅 후에 적용된다.

pending-reboot라고 쓰여진 파라미터는 인스턴스 재부팅 후에 적용되는 파라미터를 뜻한다.

`apply_method= "pending-reboot"` 라고 쓰여있다.

공식 문서를 읽어보면, 변경 사항을 즉시 적용하는 동적 파라미터에 재부팅 후에 파라미터가 적용되도록 위의 변수 내용을 적용하도록 할수 있는 것 같다.

Reference

[파라미터 그룹 작업](https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html)

[업데이트된 파라미터 값이 RDS에 적용되지 않는 이유에 대한 문제 해결](https://aws.amazon.com/ko/premiumsupport/knowledge-center/rds-parameter-group-update-issues/)
