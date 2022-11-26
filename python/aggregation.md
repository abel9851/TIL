## OOP aggregation

aggregation은 has a 관계다. 아래의 코드에서는 직원이 차량을 가지고 있다.

employee has a vehicle이 성립된다.

차량 → 직원으로 표시할 수 있다.

직원 인스턴스 안에 차량 인스턴스를 직원 인스턴스의 어트리뷰트에 할당한다.

인스턴스 안에 인스턴스를 저장하는 것이다.

이게 aggregation의 개념이다.

직원 객체를 만들때 차량 객체가 필요하다.

**aggregation개념을 사용해서 간단한 객체(Vehicle)에서 더 복잡한 객체(employee)를 만들고 있다.**

employee 객체 안에 vehicle객체에 대한 reference(객체가 있는 메모리를 가리키고 있는 것. 직접 인스턴스가 저장되어있는 메모리랑 연결하는 것이 아니다. 그리고 메모리 주소는 아니다.. 메모리 주소와 비슷한 역할을 하지만 reference와 메모리 주소는 다르다. )를 저장하고

reference가 있으면, 그 reference를 통해 vehicle 인스턴스로 convert된다.(`employee.vehicle`)

convert가 됬으면(reference를 통해 vehicle객체가 있는 메모리에 접근) `employee.vehicle.<attribute>`,

예를 들어 `employee.vehicle.color`로 vehicle객첵의 attribut를 사용할 수 있다.

```python
class Vehicle:

  def __init__(self, color, license_plate, is_electric):
    self.color = color
    self.license_plate = license_plate
    self.is_electric = is_electric

  def show_license_plate(self):
    print(self.license_plate)

  def show_info(self):
    print("My vehicle")
    print(f"Color: {self.color}")
    print(f"License plate: {self.license_plate}")
    print(f"Electric: {self.is_electric}")

class Employee:

  def __init__(self, name, vehicle):
    self.name = name
    self.vehicle = vehicle

  def show_vehicle_info(self):
    self.vehicle.show_info()

perple_vehicle = Vehicle("purple", "xks 5303", is_electric=True)
employee = Employee("nano", perple_vehicle)

employee.show_vehicle_info()
print(employee.vehicle.color)
print(employee.vehicle.license_plate)
```
