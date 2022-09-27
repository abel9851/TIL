## ECS exec

```bash
aws ecs execute-command --cluster <cluster-name> --task <task-id> --container <container-name> --interactive --command "/bin/bash"
```

```bash
aws ecs execute-command --cluster sfa-dev-backend --task 99869d486d9346528d3d1392ffdca505 --container api-server --interactive --command "/bin/bash"
```
