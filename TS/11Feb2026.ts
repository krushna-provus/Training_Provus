//More on classes.
//In JS/TS derived class CONSTRUCTORS must call super() explicitly,
//But in special case, if we don't mention a constructor at all, then JS/TS will add it for us.
//We cannot call GrandParentClass constructor straight from ChildClass, it is not possible, but indirectly it is called via inheritance chain.

class GrandParentClass {
    id : number;
    name : string;

    constructor(id : number,name : string){
        this.id =id;
        this.name = name;
    }
}
//in parent class we declared a constructor,so it is mandatory to call super() first.
class ParentClass extends GrandParentClass {
    age : number = 12;
    constructor(id: number, name : string,age : number){
        super(id,name);
        this.age = age;
    }
}
// in child class we haven't declared any constructor,so JS/TS adds constructor for us bts.
class ChildClass extends ParentClass {
    address : string = "Main St.23";
}

const child1 = new ChildClass(1,"ABCD",21);



//MORE ON GENERICS.
//10 Tips to use Generics efficiently : 

//Tip 1 : Passing Types to Types.
//This helps to create type helpers, with one type create another type.

type MyGeneric<TData> = {
    data : TData;
}
type ExampleTypeOne = {
    name : string,
    age : number;
}
type TypeOfType = MyGeneric<ExampleTypeOne>; //We created a new type using existing type.

//Tip 2 : Passing types to your own function.
//This helps us to create a generic function, which is created to explicitly pass type argument to a funciton.

type TypeOneApi = {
    id : number;
    name : string;
}

type TypeTwoApi = {
    age : number;
    address : string;
}
//This becomes a Generic funciton, Generic funciton is a normal function where a type helper mapped over it.
const makeFetchCall =<TypeArgument> (url : string) : Promise<TypeArgument>=>{
    return fetch(url).then((res)=>res.json());
}

const implementingFetchCall = ()=>{
    //Function is same, just type is changing, Resuable.
    makeFetchCall<TypeOneApi>("api/json"); 
    makeFetchCall<TypeTwoApi>("api2/json");
}


//Tip 3 : Almost all the inbuilt funcitons are generic in JS/TS.
//We can constraint these inbuilt funcitons by passing the type argument in it.

//Initially Set function is with type <unkown>, when we explicitly pass a type argument, it will only accept the values of that type.
//Especially in React useState,useRef,useReducer are all functions, so we can explicitly mention which type of data should they accept.
const set = new Set<string>();
const map = new Map<number,string>();

set.add("abc");
map.set(1,"abcd");
// set.add(1); //This will throw an error in compile time.


//Tip 4 : Infering types passed to funcitons.
//Whenever we declare a generic funciton, the type is infered from it.
const addObject =<T> (myObj : T)=>{ //addObject infers from type result.
    const obj = {
        ...myObj,
        id  : 123
    };
    return obj;
}

const result = addObject({
    fistName : "ABC",
    lastName : "EFG"
});

result.fistName; 

//Tip 5 : Generic Constraints.
//Awaited and ReturnType - They both are types which return what type will be returned.
//Awaited returns what type of data will be returned from Promise. It is used to unwrap Promise type.
//ReturnType returns what type of data will be returned from a funciton. It extracts return type of a function.

type Result1 = Awaited<Promise<string>>;
type Result2 = ReturnType<typeof addObject>;

//Here we added a constraint that GetAwaitedReturnType must return accept only function type.
type GetAwaitedReturnType<T extends (...args : any)=>any> = Awaited<ReturnType<T>>;
type Result4 = GetAwaitedReturnType<typeof addObject>;

//Whenever we declare a Generic funciton, we must constraint on it.


//Tip 6 : We can use "as"
// "as" is used to assert, i.e. tell TS that I know what type it is.
const getKeysFromValues= <Tobj extends {}>(obj : Tobj) => {
    return Object.keys(obj) as Array<keyof Tobj>;
}
const res = getKeysFromValues({firstName : "ABC", lastName : "AA"});


//Tip 7 : Multiple Generic types:
//We can pass multiple generic types.

const getValueOfKeyPassed = <TObj, TKey extends keyof TObj>(obj : TObj, key : TKey)=>{
    return obj[key];
}
//Here everyting is infered to getValueOfKeyPassed.
const resultOfGetValueOfKeyPassed = getValueOfKeyPassed({a : 1, b : "One", c : true},"b");


//Tip 8 : Default generics.
//Just like default value, we can have a default type in generics.


const createSet = <T = string>()=>{
    return new Set<T>();
}
const numberSet = createSet<number>();
const stringSet = createSet(); //By default it will have string set.

// Tip 9 : Generics from other libraries.
//Using Zod z.schema etc.

//TYPE GUARDS 
//It's just like type narrowing, it runs the logic which is required based on type check.
const typeGuardFunction = (data : string |number|unknown)=>{
    if(typeof data =='string'){
        console.log("This is string");
    }else if(typeof data == "number"){
        console.log("This is number");
    }else{
        console.log("Error !,Invalid Type");
    }
}

typeGuardFunction("true");



//Error handling in TS.
//Error must be thrown by low level functions and caught by higher level functions.

class DatabaseError extends Error {
    constructor(message : string,public code ?: number){
        super(message);
        this.name = 'Database Error';
        Object.setPrototypeOf(this,DatabaseError.prototype);
    }
}

function databaseConnection():string{
    const num = Math.random() > 0.5;
    if(num){
        return "Connection successful!";
    }else{
        throw new DatabaseError("Connection Failed!");
    }
}

function handlingDatabaseConnection(){
    try {
        const dbConn = databaseConnection();
        console.log(dbConn);
    } catch (error : unknown) { //error in catch block is 'unknown' implicitly,so we use error instaceof Error, which is also a type gurading mechanism.
        if(error instanceof Error){
            console.log(`An Error Occured - ${error.name} : ${error.message}`);
        }
    }
}

handlingDatabaseConnection();
