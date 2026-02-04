import readline from "readline/promises"; //Using ES modules with .mjs extension.
//Prototype.
//.prototype exists only on constructor functions and is used when objects with new are created.
//When objects with new are created, .prototype is used to set __proto__ of new object to its constructor function.

//__proto__
//it exists on all objects, it is used for property lookup internally by JS, created a prototype chain.


//Prototype chain for this example will be

/**
 * User.prototype -> {sayHi()}
 * 
 * WHen we create 'new' object the chain becomes
 * u1
 *  |
 *  |__ > [[Prototype]] / __proto__
 *    __proto__ |   HERE WE SEE THAT __proto__ IS USED FOR LOOKUP, [[Prototype]] is accessed via __proto__
 *              |__ > USer.prototype -----> {sayHi()}
 *              __proto__   |
 *                          |__ > Object.prototype
 *                                      |
 *                                      |___ > null
 * No COpying, No Duplication, Just they are linked.
 */

//COnstructor Function chain is different and Instance CHain is different.

function User(name){
    this.name = name;
    this.sayHi = function(){
        console.log("FROM USER CONStrUCTOR FUNCTION : ",this.name)
    }
}

// Prototype is used only when object is created with new, 'new' actually connects prototype and __proto__ 
User.prototype.sayHi = function(){
    console.log(this.name + ", says Hi !");
}

const u1 = new User("Krushna");
//When we use new User("Krushna") then behind the scenes, JS does the following CONCEPTUALLY 
// const u1 = {};
//u1.__proto__ = User.prototype;
//User.call(u1,"Krushna");
//Here Js internally sets [[Prototype]] slot with User.prototype and __proto__ is just a getter/setter used to expose [[Prototype]] 
//Every Object is born with [[Prototype]]
// u1.__proto__ === User.prtotype : BOth are linked BUT
//this !== u1.
u1.sayHi();
u1.__proto__.sayHi();
//Never call methods using __proto__ in real projects, let JS use lookup internally.
//Here the name is not accessed because of 'this', when we call u1.sayHi(), the this is bind to u1 and when we call u1.__proto__.sayHi() the 'this' here is bind to User constructor function and not the instance. so in User.protype.name is undefined so it returns undefined.

//Prototypal Inheritance

const parent = {
    name : "Parent Class",
    age : 60,
    village : "pune",
    intro(){
        console.log(`${this.name} is from ${this.village}`);
    }
}



const child = {
    name : "Child Class"
}
//This is prototypal inheritance, we are pointing child's __proto__ to parent so child.__proto__ will inherit properties and methods of parent class
Object.setPrototypeOf(child,parent);
console.log(Object.getPrototypeOf(child) === parent);
//child.__proto__ = parent;
child.intro();// Here 'this' takes name from child clas and city from parent class. BCOZ : 'this' depends upon how and where and who calls it.

//JS now uses classes, but even now under the hood it uses Prototype, bcoz of language design
//WHY prototype is usd instead of traditional class approaches.
/**
 * 1. Prototypes are dynamic, simple objects.
 * 2. More flexible, just define the objects, hierarchy will follow
 * 3. Each methods are not copied, they are simply linked 
 * 4. Classes were created later in JS just bcoz developers asked for it.
 */

//Spread Operator
//Spread Operator creates a shallow copy of data which we are copying, it means that shallow copy shares the nested references to the original copied data.
//Both with array as well as object there is a shared reference of the data which is nested and copied via spread operator.
let objDemo = {
    name : "Not nested",
    nested : {
        nestedName : "Nested"
    }
}

//for deep copy JS provides a inbuilt function structuredClone()
let objExp = {...objDemo};
objExp.name = "Example Object";
objExp.nested.nestedName = "Changed";
console.log(objExp);
console.log(objDemo);

let arr = [1,2,3,[4,5]];
let arr2 = [...arr];
arr[3][0] = 100;
console.log(arr);
console.log(arr2);

let arr3 = structuredClone(arr);
arr3[3][1] = 2341;
console.log(arr);
console.log(arr2);
console.log(arr3);

//Destructuring
function returningAray(){
    let one = 1;
    let two = 2;
    return [one,two];
}

const [one,two] = returningAray();
console.log(one,two);

const flatt = [[1,2],[3,4],[5,6]].reduce((acc,val,idx)=>{
    const flatten = acc.concat(val);
    return flatten;
})
console.log(flatt);

//CONSOLE LEVEL FETCHING

//search by todo number, Input taken by user
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//use of async/await
async function askQuestion(){
    try {
        let todoNumber = await rl.question("Enter the Todo Number to fetch : ");
        rl.close();
        return todoNumber;
    } catch (error) {
        return error.message;
    }
}

let loading; //loading state management EMPTY STATE
let fetchedData; // result state management EMPTY STATE
let spinner = ['|', '/','-','\\'];
function loader(){
    let i = 0;
    const interval = setInterval(()=>{
        if(!loading){
            clearInterval(interval);
            if(fetchedData){
                const {userId = "NA",id = "NA",title = "NA"} = fetchedData; //Object Destructuring
                console.log(userId,id,title)
            }else{
                console.log("Error : ",fetchedData);
            }
            return;
        }
        process.stdout.write("\r"+spinner[i++ % spinner.length]);
    },100);
}

async function fetchingData(){
    try {
        let todoNumber = await askQuestion(); //If the declared function is async then always use await when calling the function to get async return value.
        loading = true; //state updating
        loader();

        //Using Async/Await

        // const response = await fetch("https://jsonplaceholder.typicode.com/todos/"+todoNumber);
        // const result = await response.json();
        // if(result){
        //     loading = false;
        //     fetchedData = result // result updating
        // }

        //Using Promises
        const pr = new Promise((resolve,reject)=>{
            const data = fetch("https://jsonplaceholder.typicode.com/todos/"+todoNumber);
            if(data){
                resolve(data);
            }else{
                reject("Error in fetching the data");
            }
        })
        pr.then((res)=>{
            res = res.json();
            return res;
        }).then((res)=>{
            loading = false;
            fetchedData = res;
        }).catch((err)=>{
            fetchedData = err.message;
        })
    } catch (error) {
        loading = false;
    }
}

fetchingData(); //Function calling.

