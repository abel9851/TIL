"use strict";

// 1. String concatenation
console.log("my" + "cat");
console.log("1" + 2);
console.log(`string literals: 1 + 2 =  

'''''
${1 + 2}`);
console.log("Heejun's\n\tbook");

//2. NUmeric operators
console.log(1 + 1); // add  2
console.log(1 - 1); // suubstract 0
console.log(1 / 1); //divide 1
console.log(1 * 1); //multiply 1
console.log(5 % 2); //remainder 1
console.log(2 ** 3); //exponetiation 8

//3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
/* 
counter = counter + 1; 
preIncrement = counter;
*/
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postIncrement = counter++;
//postIncrement = counter;
//counter = counter + 1;
console.log(`postInrement: ${postIncrement}, counter: ${counter}`);
const preDecrement = --counter;
// counter = counter - 1;
//preDecrement = counter;
console.log(`preDecrement: ${preDecrement}, counter: ${counter}`);
const postDecrement = counter--;
//postDecrement = counter;
//counter = counter - 1;
console.log(`postDecrement: ${postDecrement}, counter: ${counter}`);

//4. Assign operators
let x = 3;
let y = 6;
x += y; // x= x + y;
x -= y; // x= x - y;
x *= y; // x= x * y;
x /= y; // x= x / y;

//5. Comparison operators
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // gerater than or equal

//6. Logical operators: || (or), && (and), !(not)
const value1 = false;
const value2 = 4 < 2; // false

// || (or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`);

// && *(and), finds the first falsy value

console.log(`and: ${value1 && value2 && check()}`);

//often used to compress long if-statement
//nullableObject && nullableObject.something
/*
if (nullableObject !== null) {
 nullableObject.something;
}
*/

function check() {
  for (let i = 0; i < 10; i++) {
    //wasting time
    console.log("wow");
  }
  return true;
}

//! (not)
console.log(!value1);

// 7.Equality
const stringFive = "5";
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

// === strict equality, no type conversion
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);

// object equality by reference
const heejun1 = { name: "heejun" };
const heejun2 = { name: "heejun" };
const heejun3 = heejun1;
console.log(heejun1 == heejun2); // false
console.log(heejun1 === heejun2); // false
console.log(heejun1 === heejun3); // true

//equality - puzzler
console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // false
console.log("" === false); // false
console.log(null == undefined); // true
console.log(null === undefined); // false

//8. Conditional operators: if
// if, else if , else

const name = "heejun";
if (name === "heejun") {
  console.log("Welcome, heejun!");
} else if (name === "coder") {
  console.log("You are amazing coder");
} else {
  console.log("unknown");
}

//9. Ternary operator: ?
//condition ? value1 : value2;
console.log(name === "heejun" ? "yes" : "no");

//10. Switch statement
//use for mulitple if checks
//use for enum-like value check
//use for multiple type checks in TS
const browser = "IE";
switch (browser) {
  case "IE":
    console.log("go way!");
    break;
  case "Chrome":
  case "firefox":
    console.log("love you!");
    break;
  default:
    console.log("same all!");
    break;
}

//11. Loops
//while loop. while the condition is truthy,
//body code is executed.
let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}

//do while loop, body code is executed first,
//then check the condition.
do {
  console.log(`do while: ${1}`);
  i--;
} while (i > 0);

//for loop, for(begin; condition; step)

for (i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
  //inline variable declaration
  console.log(`inline variable for: ${1}`);
}

// nested loops
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i:${i}, j:${i}`);
  }
}

// break, continue
// Q1. iterate from 0 to 10 and print only even numbers
//(use continue)

for (let i = 0; i < 11; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  console.log(`q1. ${i}`);
}

//Q2. iterate from 0 to 10 and print numbers until
//reaching 8 (use break)

for (let i = 0; i < 11; i++) {
  if (i > 8) {
    break;
  }
  console.log(`q2. ${i}`);
}
