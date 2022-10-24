## Defense in depth(심층방어)

심층방어, 즉 여러 겹의 복잡한 방어를 통해 최적화되고 강력한 보안체계를 구축하는 것

보안 제어가 실패하거나 시스템 수명주기 동안 직원, 절차, 기술 및 보안 측면을 포괄할 수 있는

취약성이 악용될 경우 중복성을 제공하는 것이 목적.

django의 allowed_host의 invalid host error가 나오길래 같이 찾아봈다.

프록시 서버를 둬서 호스트명 체크를 별도로 하는 것도 좋지만django자체에서도 체크를 하면

방어 레이어가 하나 더 추가된다는 의미로 받아들였다.

Reference

[[Security] Defense-in-Depth: DID(심층 방어)](https://t-okk.tistory.com/89)
