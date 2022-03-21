# DLQ(Dead Letter Queue)

DLQとは、SQSから正常的にmessageが送られなった場合に保管するqueueである。  
SQSからmessageを送る際に何らかのエラーが発生すると、送ったmessage queueはなくなる可能性がある。  
なので、FallBackとしてDLQというqueueをsource queueに結びつくことで上記のリスクを回避できる。  
注意！  
lambdaで発生したエラーとかで情報をqueueに保管したい場合はDLQではなくて普通のqueueに保管するようにしたらいい。  

・参照
[Configuring a dead-letter queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html)