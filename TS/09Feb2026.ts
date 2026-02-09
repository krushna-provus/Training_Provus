//Primitive Data Types in TS.

const studentName : string = "ABC";
const studentAge : number = 21;
const studentPassed : boolean = true;
let studentStatus : undefined;
let studentAadhar : null = null;
//console.log(typeof studentAadhar); //Prints object
//bcoz, it is a JS bug, when building JS, the typeof used to check type tags on variables, the type tag of object was set 0 and null in memory was set as 0, when typeof was used, it checked for type tag, which was 0 to null as well, so typeof null = object.
//But null is not an instanceof object, we cannot call methods or properties on null.

//Complex types

const arrayOfStrings : string[] = ["Abc","Efg"];

//we can use interface or type to declare object structure/type.
interface User{
    userName : string,
    userAge ?: number //we can use ?: to have null value in object declaration. but we cannot user default values in object declaration.
}

const user1 : User = {
    userName : "ABCD",
    userAge : 32
}

//index signatures in TS, it can be used when we don't have defined list of properties.
const unknownObject : {[index : string] : string | number} = {};
unknownObject.newName = "Krushna";
unknownObject.newAge = 23;
console.log(unknownObject);


//console.log(typeof user1);
//array of arrays
const matrix : number[][] = [[1,2],[2,3]];
//console.log(typeof matrix);

//array of objects
const users : User[] = [{userName : "First",userAge : 21},{userName : "Second",userAge : 22}];
//console.log(typeof users);
//array of array of objects 
const matrixUsers : User[][] = [
    [{userName : "First first", userAge : 11},{userName : "First second",userAge : 12}],
    [{userName : "Second First",userAge : 21}]
];
//console.log(typeof matrixUsers);
//object with nested array
interface Grocery{
    date : string,
    items : {
        itemType : string,
        itemName : string,
        itemCost : number
    }[], // use [] to have array of objects when declaring object types.
    total : number
}

//array of objects with nested array of objects.
const groceryList : Grocery[] = [
    {
        date : "08 Feb 2026",
        items : [
            {itemType : "Electronic", itemName : "Smart Watch",itemCost : 1200},
            {itemType : "Food", itemName : "Chips",itemCost : 40}
        ],
        total : 1240
    },
    {
        date : "09 Feb 2026",
        items : [
            {itemType : "Toiletries", itemName : "Tissue Paper",itemCost : 60},
            {itemType : "Kitchen", itemName : "Air Fryer",itemCost : 40000}
        ],
        total : 40060
    }
];
//console.log(typeof groceryList);

// function declarations in TS.

//We can have default values while setting parameters but not when declaring object types.
//we canot use ?: in parameter initializaion along with default values, use any one.

//if we use optional ?: in parameters we need to use ?? in logic/body of code.
function adding(a ?: number | null ,b ?: number |null) : void{
    console.log((a ?? 10)+(b ?? 30));
}
// adding(1)
// adding(10,20);
//here null and undefined are treated same by ?? - nullish coalescing operator, so it uses default values.
// adding(null,null);
// adding(undefined,undefined);
// adding();

//Deafult values are only used when something is undefined not when something is null, so we can pass undefined as an argument but cannot pass null(unless we take care of it in logic/body).
const subtracting = (num1 : number = 100,num2 : number = 50)=>{
    console.log(num1 - num2);
}
// subtracting();
// subtracting(20,10);
// subtracting(70);


// any type in TS.

//any adapts/sets itself to a type depending upon the value assigned. Avoid using any.
let variableA : any = [12,3];
console.log(typeof variableA);


//declare keyword
declare function runtimeCode(val1 : number, val2 : number) : number;
// declare keyword actually doesn't creates JS code for code that uses 'declare'.
// declare simply says that 'I know this exists somewhere else, so allow it'.
// real world exmp : window,global, document, fetch, console these uses declare.


//Unknown and Never in TS.
//Unknown can be considered as sibling of any, whenever we don't know what data is coming we use any and then directly use that variable/object, BUT when we declare it as unknown, it will not allow to use it directly unless we declare the structure of the data, it simply enforces us to safe-type the data which just came.
// any - "you don't know what data is coming ? Fine, use it directly."
// unknown - "you don't know what data is coming ? let the data come, know the structure and declare the structure and then use it." It is a set of all possilbe values.

const fetchTodoListUnknown = (todoListJSONString : string) : unknown =>{
    return JSON.parse(todoListJSONString);
}

type todoList = {
    id : number,
    todo : string
};

const todoListViaAPI = fetchTodoListUnknown('{"id" : "1","todo" : "Task TS"}') as todoList;
console.log(todoListViaAPI.id, todoListViaAPI.todo);

//if we use any, we can directly use the data.
const fetchTodo = (jsonString : string)=>JSON.parse(jsonString);

//We directly used without mentioning the structure.
const todoViaAny = fetchTodo(`{"id" : "2", "todo" : "Using Any"}`);
console.log(todoViaAny.id, todoViaAny.todo);

//Never - It is a set of no values, i.e empty set. it is used on functions that never reutrn anything or run inifinitly, also used in exhaustive checks.


//exhaustive checks, here if we add another type to privilage, TS here will throw compile time error, that _unreachable cannot be never.
type privilage = "student" | "teacher" | "principle";

function privilages(user : privilage):void{
    switch(user){
    case "principle":
        console.log("Principle privilages");
        break;
    case "student" :
        console.log("Student privilages");
        break;
    case "teacher" :
        console.log("Teacher privilages");
        break;
    default:
        const _unreachable :never = user;
        console.log(_unreachable);
}
}

//fetching dynamic data in TS.

interface Todo{
    userId : number,
    id : number,
    title : string,
    completed : boolean
}

function safeGuard(result : unknown) :result is Todo{
    return (
        typeof result === "object"
        && result !== null
        && "id" in result
        && "userId" in result
        && "title" in result
        && "completed" in result
    )
}

async function fetchingData() : Promise<Todo>{
    const response : Response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if(!response.ok){
        throw new Error("HTTP fetch error");
    }
    const result : unknown = await response.json();
    if(!safeGuard(result)){
        throw new Error("Not expected result from API")
    }
    return result;
}

async function main(){
    const todo = await fetchingData();
    console.log(todo);
}


//tuple - it is a typed array where, order matters, each pos has specific type, length is known, it's like an array with contract.

const array : (number | string)[] = [0,"TestName"];
const tuple : readonly [number,string] = [1,"Krushna"]; //using readonly eliminates push and pop operations on both array and tuple.
//tuple.push(3); //Even though it's a tuple, we can push elements into it. TO fix use readonly.
console.log(tuple);
const [roll,tupleName] = tuple;
console.log(roll,tupleName);

//enums in TS, it is a set of pre defined constants.

enum Category {
    Sugar = "Sugar",
    Gluten = "Gluten",
    Fibre = "Fibre",
    Protien = "Protien"
}

let vegetables : Category = Category.Fibre;
console.log(vegetables);

//unions and intersections in TS.
//Unions is like OR and uses '|', unions need type narrowing
type Unions = "success" | "failure" | "pending";


//here we can use type or interface, but interface allows declaration merging.
type Person = {
    name : string
};
type Employee = {
    empId : number
}
//Intersection is like AND and uses '&'
type Staff = Person & Employee;
const entry1 : Staff = {
    name : "Krushna",
    empId : 8
}

interface Animal{
    animalName : string
}

const bear : Animal & {eatsWhat : string} = {
    animalName : "Bear",
    eatsWhat : "Honey"
}

// We can intersect interface and type together.
const mixture : Animal & Person = {
    name : "Krushna",
    animalName : "Lion"
}
console.log(mixture);


//interface declaration merging, interface with same name are declared togehter.
interface DeclrationMerging{
    level : number
}
interface DeclrationMerging{
    levelTwo : number
}

//casting in TS uses 'as' to explicitly tell compiler that the value is of a certain type.
//best practice to use 'as' is to first use unknown and then the taargeted type to avoid errors.
//we can use '<datatype>variable' instead of as
const x  = 4;
console.log(((x as unknown) as string).length);
console.log((<string>(<unknown>x)).length);


//literals in TS, they are specific values assigned to it, no other value can be asigned.
let str : "hello";
//str = "abc" // Error.
