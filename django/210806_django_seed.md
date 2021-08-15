# 장고 시드 - 가짜 데이터 만들기

1. management

아무 어플리케이션에 들어가서 management 폴더를 만든다.

2. \_\_init\_\_.py 만들기

management 폴더 안에 \_\_init\_\_.py를 만든다.  
management폴더가 장고, 파이썬 폴더라는 것을  
알려주는 역할을 한다.

3. commands 폴더 만들기

management폴더 안에 commands 폴더를 만든다.  
마찬가지로 commands 파일 안에 \_\_init\_\_.py를 만든다.

4. command명.py 만들기

seed_rooms, seed_facilities 등등  
commands 폴더 안에 command명.py를 만든다.  
`python manage.py seed_rooms --times 50`를 터미널에서 수행하면  
AttributeError가 발생하는데 자세한 내용을 보면  
rooms.management.commands.seed_rooms 모듈이 속성이  
없다고 나온다. 이는 seed_rooms.py 안에 class command 라던가 다른 것을 만들어 줘야한다.

**--times를 parse할 Argument Parser를 생성하고 반환해야한다.**

5. basecommand

seed_rooms.py에서 클래스 Command를 생성한다.

예시

```python

from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "This command creates many rooms"

    print("hello")

    def add_arguments(self, parser): # --times에 대해 만드는 것
        parser.add_argument(
            "--times",
            help="how many rooms do you want to create",  # python manage.py --h를 했을때 --times의 설명 부분
        )

    def handle(self, *args, **options): # 커맨드의 실제 로직
    times = options.get("times")
    for t in range(0, int(times)):
        self.stdout.write(self.style.SUCCESS(("i love you"))) # self.stdout.write는 표준 output
                                                              # self.style.SUCCESS는 터미널에 초록 글씨, 즉 성공으로 "i love you"를 출력
```

6. 실제 만들어보기 - airbnb 클론을 통해

우선 seed_amenities.py를 만든다.

```python

from django.core.management.base import BaseCommand
from rooms import models as rooms_models
# 혹은 from .. import models as rooms_models

class Command(BaseCommand):
    help = "This command creates amenities"  # add_arguments로 인자(--seed 라던가, python manage.py seed_amenities seed 라던가)를 지정해주지 않으면
                                            # python manage.py seed_amenities로 인자없이 객체 생성 가능.

    #add_arguments 써보기

    '''
    def add_arguments(self, parser):
        parser.add_argument(
            "--seed",
            action = "store_true"
            help = "Create Amenities"
        )
    '''

    def handle(self, *args, **options):
        amenities = [
            "Kitchen",
            "Heating",
            "Washer",
            "Wifi",
            "Indoor fireplace",
            "Iron",
            "Laptop friendly workspace",
            "Crib",
            "Self check-in",
            "Carbon monoxide detector",
            "Shampoo",
            "Air conditioning",
            "Dryer",
            "Breakfast",
            "Hangers",
            "Hair dryer",
            "TV",
            "High chair",
            "Smoke detector",
            "Private bathroom",
        ]


    for a in amenities:
        if not room_models.Amenity.objects.filter(name=a):
            room_models.Amenity.objects.create(name=a)


    # --seed 인자를 통해서 amenities 만들어보기 ex) manage.py seed_amenities --seed

    '''
    if options['seed']:
        for a in amenities:
            if not room_models.Amenity.objects.filter(name=a): #리스트는 []이 아니면, True다. 아래의 조건문의 기본개념 사이트를 참고하자.
                room_models.Amenity.objects.create(name=a) #objects=manager() 이므로, 매니저는 생성,삭제 등등을 할 수 있다.
    '''



    self.stdout.write(self.style.SUCCESS("Amenities created!"))
```

**add_arguments로 인자(--seed 라던가, python manage.py seed_amenities seed 라던가)를 지정해주지 않으면**  
**python manage.py seed_amenities로 인자없이 객체 생성 가능.**

**참조: (조건문의 기본개념)[https://securityspecialist.tistory.com/71]**

- 번외 option 딕셔너리 확인

```python

from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):

    help = "설명을 합니다" # -h로 헬프 표시를 할때, 표시되는 부분. 커맨드의 개요등을 기입

    def add_arguments(self, parser): #커맨드의 인자를 정의

        #int형의 필수인자를 정의
        parser.add_argument("id", type=int, help="id를 입력해주세요")


        #str형의 옵션인자의 정의. nargs='*' 지정으로, --option aa bb cc 로 복수 지정할 수 있다.

        #nargs='+'를 하면, 인자는 1개 이상 지정하지 않으면 에러가 난다.
        parser.add_argument("-o", "--option", type=str, nargs="*", help="옵션을 지정해주세요")

        parser.add_argument("--seed", action="store_true", help="Create seed")

    def handle(self, *args, **options): #커맨드 처리를 정의한다.
        print(options)
        self.stdout.write(self.style.SUCCESS('id ="%s"' % options["id"]))

        for option in options["option"]:
            self.stdout.write(self.style.SUCCESS('option = "%s"' % option))

        if options['seed']: #python manage.py seeding --seed를 했을 경우, options={ 'seed': True }가 저장된다.
            pass # Question이라는 모델을 import 했다면, Question.delete() 라던가..

#출력결과

{'verbosity': 1, 'settings': None, 'pythonpath': None, 'traceback': False, 'no_color': False, 'force_color': False, 'skip_checks': False, 'id': 10, 'option': ['그리고', '아니다']}
id ="10"
option = "그리고"
option = "아니다"


```

7. 장고 시드로 가짜데이터 만들어보기

pipenv install django_seed로 설치  
settings.py의 THIRD_PARTY_APPS에 기입.  
`THIRD_PARTY_APPS= ["django_seed"]`

```python

from django_seed import Seed
from  myapp.models import Game, Player #모델을 import
seeder = Seed.seeder()

seeder.add_entity(game, 5) # 모델과 생성하고 싶은 객체의 객수를 적는다.
seeder.add_entity(Player, 10)

seeder.execute()


```

```python
# seeder는 foreignkey는 도와주지 못하니까 직접 설정해줘야함. 그리고 null을 허락하지 않는 곳이면 에러가 날 수 있음.

import Random # 파이썬 모듈
from django.core.management.base import BaseCommand
from django.contrib.admin.utils import flatten
from djnago_seed import Seed
from users import models as user_models
from rooms import models as room_models

class command(BaseCommand):
    help = "This command creates many rooms"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            default = 2,
            type = int,
            helpy = "how many rooms do you want to create",
        )

    def handle(self, *args, **options):
        number = options.get("number")
        seeder = Seed.seeder()
        all_users = user_models.User.objects.all() #데이터 베이스가 클 경우 절대 all()을 쓰지 말자.
        room_types = room_models.RoomType.objects.all() # roomtype 모델이 없으면, 시퀀스값을 받지 못해 에러가 발생하므로 만들어줘야한다.

        seeder.add_entity(
            room_models.Room,
            number,
            {
                "name": lambda x: seeder.faker.address(),
                "host": lambda x: random.choice(all_users),
                "room_type": lambda x: random.choice(room_types),
                "guests" : lambda x: random.randint(1, 19),
                "price": lambda x: random.radint(1, 300),
                "beds": lambda x: random.radint(1, 5),
                "bedrooms": lambda x: random.randint(1, 5),
                "baths" : lambda x: random.randint(1, 5),
            }
         )

'''
# charfield가 choice를 사용한다면 아래와 같이 랜덤하게 설정 가능.

"status": lambda x: random.choice(["pending", "confirmed", "canceled"])
'''


#사진을 임의로 추가해서 가짜데이터를 만들기 위해선, 여러개의 사진을 다운받아서 지정해줘야한다.

    created_photos = seeder.excute()
    created_clean = flatten(list(created_photos.values()))
    amenities = room_models.Amenity.objects.all()
    facilities = room_models.Facility.objects.all()
    rules = room_models.HouseRule.objects.all()

    for pk in created_clean:
        room = rooms_model.Room.objects.get(pk=pk)
        for i in range(1, random.randint(10, 11)):
            room_models.Photo.objects.create(
                caption= seeder.faker.sentence(),
                room = room,
                file = f"room_photos/{random.randint(1, 31)}.webp",
            )

        for a in amenities:
            magic_number = random.randint(1, 15)
            if magic_number % 2 == 0:
                room.amenities.add(a) # add 는 ManyToMany관계에서 쓰는 방법.

        for f in facilities:
            magic_number = random.randint(1, 15)
            if magic_number % 2 == 0:
                room.facilites.add(f)

        for r in rules:
            magic_number = random.randint(1, 15)
            if magic_number % 2 == 0:
                room.house_rules.add(r)
    self.stdout.write(self.style.SUCESS(f"{number} rooms created"))


    #amenities와 같은 ManyTomany관계를 다른 방식으로 설정하는 방법
    '''

    for pk in create_cleaned:
        room = rooms_model.Room.objects.get(pk=pk)
        to_add = amenities[random.randint(0:5):random.randint(6,30)] #쿼리셋 리스트로 리턴해줌.
        room.amenities.add(*to_add) # add는 print()와 마찬가지로 매개변수(파라미터)를 *args를 받아서
                                    # *to_add 언패킹 하면, 객체가 하나씩 들어가게 되어있음
                                    # 쿼리셋 예제<QuerySet [<User: abel9851>, <User: william22>, <User: simmonskelly>, <User: martinbrittany>, <User: clarksherry>]>

    '''

```

seeder.excute() 가짜 데이터를 만들고 난뒤에 class 생성자와 id를 딕셔너리로 리턴한다.

```python
{<class 'rooms.models.Room'>: [9]}
```

id만 필요하니까 values()로 값만 가져오면 되는데  
이중으로 된 리스트다. [[1],[2],[3]]  
그러므로 flatten 함수를 써서 단일 list로 만들어준다.
