## OOP aggregation

aggregation은 has a 관계다. 아래의 코드에서는 직원이 차량을 가지고 있다.

employee has a vehicle이 성립된다.

차량 → 직원으로 표시할 수 있다.

직원 인스턴스 안에 차량 인스턴스를 직원 인스턴스의 어트리뷰트에 할당한다.

인스턴스 안에 인스턴스를 저장하는 것이다.

이게 aggregation의 개념이다.

직원 객체를 만들때 차량 객체가 필요하다.

**aggregation개념을 사용해서 간단한 객체(Vehicle)에서 더 복잡한 객체(employee)를 만들고 있다.**

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
    self.vehicle = vehicle # Vehicle클래스의 인스턴스를 할당한다.

  def show_vehicle_info(self):
    self.vehicle.show_info()

vehicle = Vehicle("purple", "xks 5303", is_electric=True)
employee = Employee("nano", vehicle)

employee.show_vehicle_info()
```
