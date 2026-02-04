// var,let,const 
var val1 = 10; // Global Scoped
let val2 = 20; //Blocked Scope
const val3 = 30; //Blocked Scope

//IMMUTABLE ARRAY METHODS
let arr = [1,2,3,4,5,6];
let [,second,...rest]=arr; // Array Destructuring.
console.log(second,rest);
let mappedArr = arr.map((val,idx)=>{return val*val});
console.log(mappedArr);
let filteredArr = arr.filter((val)=>{return val % 2 === 0});
console.log(filteredArr);
let reducedValue = arr.reduce((acc,curr)=>acc+curr,0);
console.log(reducedValue);
let arr2 = arr.slice(1,5);
console.log(arr+"\n"+arr2);

//MUTABLE ARRAY METHODS
arr2.splice(0,2,10,20);
console.log(arr2);
arr2.sort((a,b)=>a-b);
console.log(arr2);

console.log(typeof arr);


const obj1 = {
    id : 12,
    name : "abc",
    print : function (){
        console.log(this.id,this.name);//Regular functions, this keyword is dynamically bounded i.e depends upon the how this is called.
        // object method call -> Points to that Object itself.
        // standalone call -> console.log(this) -> Points to global.
        // explicit binding -> call(), apply(), bind() -> Points to the object passed.
        // constructor or new call -> Points to new Instance.
    }
}
obj1.print();


const obj2 = {
    id : 34,
    name : "xyz",
    log : ()=>{
        console.log(this.id,this.name) // in Arrow functions, this keyword takes this from its suroundings, if it has no surrounding then it points to the global or window object which does'nt have properties id or name, that is why it logs undefined undefine. [ Lexically Bound.]
    }
}
obj2.log();

//Explicit functions are used to force this to any value when calling regular functions overridding the dynamic binding.
// call and apply methods are similar just arguments passing is different.
// with call we pass args one - by - one function.call(obj,arg1,arg2,arg3);
// with apply we pass args in an array function.call(obj,[arg1,arg2,arg3]);

function explicitCall(){
    console.log(this.id);
}

let person = {id : 1234};
explicitCall.call(person);

function explicitApply(para1,para2,para3){
    console.log(this.title,para1,para2,para3);
}
let params = ["apple","banana","chickoo"];
let head = {title : "Fruits : "};
explicitApply.apply(head,["apple","banana","chickoo"]);



//bind actually returns a new function bounded with the obj and also we can preset some of it's args.
function explicitBind(start,end){
    console.log(`${start}${this.name} with id : ${this.id} ${end}`)
}

let boundedFunction = explicitBind.bind(obj1,"Hi..,");
boundedFunction("!");

const emps = {
    id : 120,
    name : "test1",
    age : 22
}

const emps2 = {
    salary : 20000,
    age : 19
}

let {salary,age} = emps2; // Object Destructuring.
console.log("DESTRUCTURING : ",salary,age);

//Object.assign takes two arguments target and source.
//target is the obj that we want to merge with source.
//source object then adds the target object in itself.
// NOTE : If target has same property as source, then value of source property will be overridden with property of target value.
Object.assign(emps,emps2);
console.log(emps);


// Object,entires() makes simpler to iterate over entires returns 2d array where each element is [key,val]
let ent = Object.entries(emps);
console.log(ent);
for(let [key,val] of Object.entries(emps)){
    console.log(key,val);
}

//Object.values(obj) returns an array of values.
let vals = Object.values(emps);
console.log(vals);

//Object.keys(obj) returns an array of keys.
let keys = Object.keys(emps);
console.log(keys);


//PROTOTYPE - Prototype in JS is used to form a chain of inheritance until the chain reaches top which has toString() or hasOwnProperty() methods and then it reaches null.
//It performs look-up the chain operation to find asked property.
//It checks until null and if no property is found it throws an error.
//prototype directly adds property to the Person's prototype Object
function Person(name){
    this.name = name;
}

Person.prototype.greet = function(){
    console.log(`Hello , ${this.name}`);
}

const kd = new Person("Krushna");
kd.greet();


//FUNCTION COMPOSTION.
//compose function creates a chain of functions executing from right to left, the output of one function is passed as an input to another function.
// Both pipe and compose provide same logic about chaining the functions together, the difference is compose executes from right-to-left and pipe executes from left-to-right.
const add3 = x => x+3;
const multiplyBy5 = x => x*5;
const subtract7 = x => x-7;
const compose = (...fns) => x => fns.reduceRight((acc,f)=> f(acc),x); //These functions can also be considered as Higher Order Functions.
const pipe = (...functions)=>{
    return (input)=>{
        return functions.reduce((acc,fn)=>fn(acc),input);
    }
};
const composedFunction = compose(subtract7,multiplyBy5,add3);
const composedResult = composedFunction(3);
const pipedFunction = pipe(subtract7,multiplyBy5,add3);
const pipedResult = pipedFunction(10);
console.log(composedResult,pipedResult);

//HIGHER ORDER FUNCTION 
const higherOrderFunc = function(functionAsArgument){//Accepting Function as an argument
    let x = 20
    functionAsArgument(x);
    console.log("executing higherOrderFunc");
    console.log(x);
    function returningFunction(){
        console.log(x);
    }
    return returningFunction; //Returning a Function.
}

const functionAsArg = function(para){
    para = para+20;
    console.log("Executing function as arguement");
    console.log(para);
}

let returned = higherOrderFunc(functionAsArg);
returned();
//CallBacks - Functions which execute after a certain result is obtained is Callback function, mostly used for async operations, currying, memoiz etc.



// const intervalID = setInterval(()=>{
//     for(let i = 0; i < 5;i++){
//         console.log("Hello , ",i);
//     }
// },1000);
// setTimeout(()=>clearInterval(intervalID),3000);

// setTimeout(() => {
//     for(let i = 0; i < 5;i++){
//         console.log(i);
//     }
// },1000);


// async function getData(){
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const result = await response.json();
//     console.log(result);
// }

// getData();

// const getByPromise = new Promise((resolve,reject)=>{
//     const result = fetch("https://jsonplaceholder.typicode.com/todos/1");
//     if(result){
//         resolve(result);
//     }else{
//         reject("Failed to Fetch");
//     }
// })

// getByPromise.then(res=>res.json()).then(res=>console.log(res)).catch(err => console.log(err));


// Promise.allSettled([
//     fetch("https://api.restful-api.dev/objects/7").then(res=>res.json()),
//     fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json())
// ]).then(res=>console.log(res));


