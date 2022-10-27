## cloudfront origin path

전제조건

- origin domain: 지정된 S3버킷 doc-example-bucket
- origin path: /production
- alternative domain names(CNAME): example.com

유저가 [example.com/index.html](http://example.com/index.html)에 브라우저로 접속하면 cloudfront는 doc-example-bucket/production/index.html으로,

유저가 [example.com/acme/index.html로](http://example.com/acme/index.html로) 접속하면 cloudfront는 doc-example-bucket/production/acme/index.html로 접속한다.

origin path는 origin(버킷)의 디렉토리에 있는 콘텐츠에 요청이 가도록 설정하는 것이다.

Reference

[Values that you specify when you create or update a distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html?icmpid=docs_cf_help_panel#DownloadDistValuesOriginPath)
