# Github Actionについて  


- Workflow  
自動化されたプロセス。一つ以上のjobで構成され、  
Eventによって予約されるか、トリガーになれる  
自動化された手続き。  
WorkflowファイルはYAMLで作成される。  
Github Repositoryの`.github/workflows``フォルダーの下に保存される。  
GithubにYAMLファイルで定義した自動化動作を伝達すると、  
Github Actionsは当該ファイルを基盤としてそのまま実行する。  


- Event  
Workflowをトリガー(実行)する特定活動又は規則。  
例えば誰かがcommitをRpositoryにpushしたり、Pullrequestが生成された時、  
GitHubで活動がstartされる。  


- Job  
Jobは色んなStepで構成されて、単一仮想環境で実行される。  
他のJobに依存関係を持つこともでき、  
又、独立的に並立して実行することもできる。  


- Step  
Jobの中でj順に実行されるプロセス単位。  
Stepで命令をしたり、actionを実行することができる。  


- Action  
Jobを構成するためStepたちの組合で構成された独立的な命令。  
.workflowの一番小さなbuild単位。  
Workflowでactionを使用するためにはactionがstepを含めなければならない。  
actionを構成するためにrepositoryと相互作用するカスタムコードを作ることもできる。  
使用者が直接カスタマイズしたり、マーケットプレースにあるactionを持ってきて  
使うこともできる。  


- Runner  
Github Action Runner アプリケーションが実装されたマシンだ。  
Workflowが実行されるインスタンス。


・参照  
[깃허브에 대한 소개와 사용법](https://velog.io/@ggong/Github-Action%EC%97%90-%EB%8C%80%ED%95%9C-%EC%86%8C%EA%B0%9C%EC%99%80-%EC%82%AC%EC%9A%A9%EB%B2%95)