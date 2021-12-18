# AWS lambda에 selenium 설치  

- selenium이 인식이 안되는 오류발생  
```python
  "errorMessage": "Message: 'chromedriver' executable needs to be in PATH. Please see https://chromedriver.chromium.org/home\n",
  "errorType": "WebDriverException",
```
이 오류는  lambda layer로 설치한 라이브러리 안에  
chromedriver、headless-chromium이 없기 때문에 그렇다.  

```python
#  오류 발생 코드 라인
    options.binary_location = "/opt/headless-chromium"
    driver = webdriver.Chrome(
        executable_path="/opt/chromedriver", chrome_options=options
    )
```
opt는 예를 들어 python이라는 라이브러리 폴더를  
 lambda layer에 설치하면  
 opt=python 즉, python/file, opt/file 처럼 된다.  
 말하자면, python 라이브러리 파일에 chromedriver、headless-chromium 파일이  
 아예 없기 때문에 발생하는 것으로  
 이 두 파일을 라이브러리에 추가한 후,  
 lambda layer에 올리면 된다. 

참조:  
[
Debugging Selenium and Chromedriver on AWS Lambda (chrome not reachable)](https://stackoverflow.com/questions/68562643/debugging-selenium-and-chromedriver-on-aws-lambda-chrome-not-reachable), 
[Selenium-on-AWS-Lambda-Python3.7
](https://github.com/soumilshah1995/Selenium-on-AWS-Lambda-Python3.7/blob/main/test.py), 


[inahjeon/AWS-LAMBDA-LAYER-Selenium](https://github.com/inahjeon/AWS-LAMBDA-LAYER-Selenium), 
[newdeal123/Lambda-Selenium-Chromedriver](https://github.com/newdeal123/Lambda-Selenium-Chromedriver/blob/main/lambda_function.py)