## Amazaon ECS Log File Locations

```bash
/var/log/ecs
```

Reference

[Amazon ECS Log File Locations](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/logs.html)

## ECS 로그

ECS exec를 사용해서 ecs 컨테이너 내부의 `/var/log/ecs`에 들어가서 로그를 확인하려고 했으나

ecs 폴더 자체가 없었다.

stack over flow에서 보니까 ecs에 로그 그룹을 만들어줄 필요가 있나보다.

테라폼 설정을 보니까

```bash
configuration {
    execute_command_configuration {
      logging = var.ecs_exec_log_config #
    }
```

Reference

[How to get the log from an application deployed using docker on AWS ecs](https://stackoverflow.com/questions/51297264/how-to-get-the-log-from-an-application-deployed-using-docker-on-aws-ecs)
