# Read The Python standard library
# 1.Variable

# Module
import math
from math import ceil, fsum

# 1.Variable
a_number1 = 3
a_number2 = 4
a_float = 3.12
a_string = 'like this'
a_boolean = False
a_none = None

print(type(a_none))

# 2.Sequence type
# 2-1.List(mutable)

days = ["Mon", "Tue", "Wed", "Thur", "Fri"]
print("Mon" in days)
print(days[0])
print(len(days))
print(days)
days.append("sat")
print(days)
days.reverse()
print(days)\

# 2-2.Tuple(immutable)

days = ("Mon", "Tue", "Wed", "Thur", "Fri")
print(days)
print(type(days))

# 3. Dictionary
heejun = {"name": "Heejun", "Korean": True, "fav_food": ["pizza"]}

print(heejun)
heejun["game"] = "like"
print(heejun)

# 4. function

print(len("hello,hi"))
age = "18"
print(type(age))
n_age = int(age)
print(type(n_age))
print(n_age)


def say_hello():
    print("hello")


say_hello()

# Argument


def plus(a, b=0):
    print(a + b)


plus(1)

# 5.Return


def r_plus(a, b):
    return a + b


r_result = r_plus(1, 3)

print(r_result)

# 6.Keyworded Arguments


def r_plus(a, b):
    return a - b


r_result = r_plus(b=30, a=1)

print(r_result)


def say_hello(name, age):
    return f"Hello {name} you are {age} years old"


hello = say_hello(age="12", name="Heejun")
print(hello)

"""
code challenge
def plus(x, y):
    print(int(x) + int(y))


def minus(x, y):
    print(int(x) - int(y))


def times(x, y):
    print(int(x) * int(y))


def division(x, y):
    print(int(x) / int(y))


def negation(x):
    print(-int(x))


def power(x, y):
    print(int(x) ** int(y))


def remainder(x, y):
    print(int(x) % int(y))


plus(3, 5)
minus(3, 5)
times(3, 5)
division(3, 5)
negation(5)
power(3, 5)
remainder(3, 5)
"""

# 7.Conditionals part one


def plus(a, b):
    if type(b) is int or type(b) is float:
        return (a + b)
    else:
        return None


print(plus(3, 1.2))

# 8.if else and or


def age_check(age):
    print(f"your are {age}")
    if age < 18:
        print("You cant drink")
    elif age == 18 or age == 19:
        print("you are new to this!")
    elif age > 20 and age < 25:
        print("you are good")
    else:
        print("enjoy your drink")


age_check(19)

# 9.for in  sting is also sequence
days = ("Mon", "Tue", "Wed", "Thu", "Fri")

for day in days:
    if day is "Wed":
        break
    else:
        print(day)

for letter in "Heejun":
    print(letter)

# 10.Modules


print(ceil(1.2))
print(fsum([1, 2, 3, 4, 5, 6, 7]))
