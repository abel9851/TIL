# Read The Python standard library
# 1.Variable

a_number1 = 3
a_number2 = 4
a_float = 3.12
a_string = 'like this'
a_boolean = False
a_none = None

print(type(a_none))

# 2.sequence type
# 2-1.list(mutable)

days = ["Mon", "Tue", "Wed", "Thur", "Fri"]
print("Mon" in days)
print(days[0])
print(len(days))
print(days)
days.append("sat")
print(days)
days.reverse()
print(days)\

# 2-2.tuple(immutable)

days = ("Mon", "Tue", "Wed", "Thur", "Fri")
print(days)
print(type(days))

# 3. dictionary
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
