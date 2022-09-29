## AWS firelens

firelens를 사용하면 배포 스크립트를 수정하거나 직접 추가 소프트웨어를 설치하거나 추가 코드를 작성하지 않고도 스토리지와 분석 도구에 컨테이너 로그를 보낼 수 있다.

ECS, fargate에서 몇가지 구성을 업데이트하면 대상을 선택하고 필요한 경우 필터를 정의하여 firelens에서 필요한 위치로 컨테이너 로그를 전송하도록 지시할 수 있다.

FireLens는 Fluent bit 또는 fluentd와 함께 작동하므로, 이러한 오픈 소스 프로젝트에서 지원하는 몯느 대상에도 로그를 전송할 수 있다.

내부적으로 fluentd 혹은 fluentBit 이미지를 가지고 AWS가 목적에 맞게 커스터마이징하여 갭라한 Container Image라고 생각하면 되며 Task Definition에 Value만 전달하여 Log를 전달할 수도 있다.

좀더 커스텀하게 사용하고 싶다면 S3에 fleunt-bint.yml 파일을 올려서 설정 값을 전달할 수도 있고

Image를 Pull하여 Container에 접속하여 설정값을 변경한 뒤 Push하여 그 이미지를 사용할 수 있으니

선택해서 사용하면 된다.

Fluentd는 플러그인 구조를 갖고 있는 로그 라우팅, 정제, 변환, 수집을 담당하는 툴이다.

Fluent Bit은 Fleuntd의 경령화 버전이다.

즉 AWS FIreLens는 Fleuntd를 커스터마이징 한거라고 생각하면 될듯 싶다.

[AWS Firelens - 컨테이너 로그 통합 관리 기능 출시 | Amazon Web Services](https://aws.amazon.com/ko/blogs/korea/announcing-firelens-a-new-way-to-manage-container-logs/)

[[ECS] FireLens로 ECS Fargate 컨테이너 로그 ElasticSearch로 보내기](https://nyyang.tistory.com/149)
