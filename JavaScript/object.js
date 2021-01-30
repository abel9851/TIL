"use strict";

// Object
// one of the JavaScript's data types.
// a collection of related data and/or functionality.
// Nearly all objects in Javascript are instance of Object
// object = {key : value};

// 1. Literals and properties
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' sytntax

const john = { name: "heejun", age: 4 };
function print(person) {
  console.log(person.name);
  console.log(person.age);
}
print(john);

john.hasjob = true;
console.log(john.hasjob);

delete john.hasjob;
console.log(john.hasjob);

// 2. Computed properties(계산된 프로퍼티)
// key should be always string
console.log(john.name);
console.log(john["name"]); // This is computed properites
john["hasJob"] = true;
console.log(john.hasJob);

function printValue(obj, key) {
  console.log(obj[key]); // .を使うと、　objにあるkeyというpropertyを探すため、Error.Error.
}
printValue(john, "name");
printValue(john, "age");

// 3. Property value shorthand
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = new Person2("heejun", 29);
console.log(person4);

// 4. Constructor Function
function Person2(name, age) {
  //計算せず、純粋にobjectを作る場合、名称は大文字で始まる
  //this = {};
  this.name = name; // propertyとvalueの名称が同じ場合、shorthandを使える
  this.age = age;
  //return this;
}

// 5. in operator: property existence check (key in obj)
console.log("name" in john);
console.log("age" in john);
console.log("random" in john);
console.log(john.random);

// 6. for..in vs for..of
// for(key in obj)
console.clear();
for (let key in john) {
  console.log(key);
}

// for (value of iterable)
const array = [1, 2, 4, 5];
for (let value of array) {
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3...])
const user = { name: "heejun", age: "20" };
const user2 = user;
console.log(user.name);

//old way

const user3 = {};
for (let key in user) {
  user3[key] = user[key];
}
console.clear();
console.log(user3);

const user4 = Object.assign({}, user);
console.log(user4);

//another example
const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color);
console.log(mixed.size);
