# Tip - Abstract item과 이에 대한 admin

abstract모델을 이용해서 부모 abstract모델을 가진 아이템 모델을 만들 때

- 부모모델

```python

class AbstractItem(core_models.TimeStampedModel): #TimeStampedModel이라는 추상모델을 상속받음
    """ Abstract Item """

    name = modesl.Charfield(max_length=80)

    class Meta:
        abstract = True # 추상모델을 상속 받긴 했으나, AbstractItem자체도 다른 모델의 부모로서, 추상모델이 될 필요가 있기에 True로 해준다.

    def __strt_(self):
        return self.name

```

- 자식모델

```python

#rooms앱, roomms.py에 다같이 저장. 기능적인 이유는 없으나, roomtype, Amenity 등은 rooms 앱과 연관이 있기 때문에 같이 두는 것.

class RoomType(AbstractItem): # 위의 부모모델(추상모델)을 상속 받음.

    """ RoomType Model Definition """

    class Meta:
        verbose_name = "Room Type" #verbose란 장황한 이라는 뜻
        #선언을 해주지 않으면 default로 CamelCase가 camel case로 된다.


class Amenity(AbstractItem):

    """ Amenity Model Definition """

    class Meta:
        verbose_name_plural = "Amenities" # plural이란, '복수형의' 라는 뜻
        #내가 직접 선언을 해주지 않으면, verbose_name(Amenity)에 's'를 붙인다.

class Facility(AbstractItem):

    """ Facility Model Definition """

    pass

    class Meta:
        verbose_name_plural = "Facilities"


class HouseRule(AbstractItem):

    """ HouseRule Model Definition """

    class Meta:
        verbose_name = "House Rule"


class Room(core_models.TimeStampedModel):
    """ Room Model Definition """

    pass

```

rooms앱/rooms.py에 다같이 저장. 기능적인 이유는 없으나, roomtype, Amenity 등은 rooms 앱과 연관이 있기 때문에 같이 두는 것.

- Admin

```python

#Rooms라는 필드셋과 비슷한 카테고리에 아래의 애드민들은 다 같이 포함되어 나온다.

@admin.register(models.RoomType, models.Facility, models.Amenity, models.Houserule)
class ItemAdmin(admin.ModelAdmin):
    """ Item Admin Definition """

    list_display = ("name", "used_by")

    def used_by(self, obj):
        return obj.rooms.count()


@admin.register(models.Room)
class RoomAdmin(admin.modelAdmin):
    """ Room Admin Definition """

    pass

```

**Item Admin같은 경우는, 4개의 모델이 같은 list_display를 사용할 것이라서 하나의 admin에 포함시켜 관리.**
**Room Admin같은 경우는, 위의 4개의 모델과는 다르게 admin을 관리할 것이라서 분리시켜놓음**

**Item Admin의 4개의 모델이 같은 추상모델(AbstractItem)을 부모모델로 상속받고 있지만 그 이유 때문에 같은 admin에**  
**포함시킨것은 아니라고 생각한다. 그저 같은 list_display로 설정할 것이라서 그렇게 해놓은 것임**
