"use strict";
//Object-oriented porgraming
//class: template
//object: instance of a class
//JavaScript classes
// - introduced in ES6
// - syntactical sugar over prototype-based inheritance

//1. Class declarations
class Person {
  //consturctor
  constructor(name, age) {
    //fields
    this.name = name;
    this.age = age;
  }

  // methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}

const heejun = new Person("heejun", 20);
console.log(heejun.name);
console.log(heejun.age);
heejun.speak();

//2. Getter and setters
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get age() {
    return this._age;
  }

  set age(value) {
    //if( value < 0) {
    //    throw Error('age can not be negative');
    //} 어떻게 value 에 -1 이?? -1 의 매개변수는 age였는데
    //이해 불가,,, 계속 세터를 호출하는 이유도 모르겠어.
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User("Steve", "Job", -1);
console.log(user1.age);

//3. Fields (publkic, private)
//Too soon!
//Http://developer.mozilla.org/en-US/docs/web/JavaScript/reference

class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.purvateField);

//4. static properties and methods
//Too soon!
class Article {
  static publisher = "Coding";
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }
  static printPublisher() {
    console.log(Article.publisher);
  }
}
const article1 = new Article(1);
const article2 = new Article(2);
console.log(Article.publisher);
Article.printPublisher();

//5. Inheritance
//a way for one class to extend another class.
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color of`);
  }
  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {
  draw() {
    super.draw();
    console.log(`▲`);
  }
}
class Triangle extends Shape {
  getArea() {
    return (this.width * this.height) / 2;
  }

  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, "blue");
rectangle.draw();
console.log(rectangle.getArea());

const triangle = new Triangle(20, 20, "red");
triangle.draw();
console.log(triangle.getArea());

//6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object);
console.log(triangle.toString());
