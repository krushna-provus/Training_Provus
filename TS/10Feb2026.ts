//Utility types in TS : pick,omit,record,partial.exclude,extract,required,readonly

interface EmpInfo {
    empId : number,
    name : string,
    age : number,
    address : string,
    department : string,
    salary : number
}

//Omit - Omits/Removes a certain property(s).
type GeneralInfo = Omit<EmpInfo,"address" | "salary">;

//Pick - Picks/Selects only specified properties/keys.
type AdminView = Pick<EmpInfo,"empId" | "name" | "department" | "salary">;

//Partial - Makes all properties optional, heavily used in updating.
//Used for UPDATE and PATCH operations.
type UpdateEmployee = Partial<EmpInfo>;

//Required - Opposite of Partial, makes everything required.
//Used after validation when you require guarantee.
type RequiredProps = Required<UpdateEmployee>;

//ReadOnly - Makes type immutable by declaring each property as readonly, i.e Properties cannot be changed.
type ReadOnlyType = Readonly<AdminView>;
const readOnlyExample : ReadOnlyType = {
    empId : 101,
    name : "ABC",
    department : "CS",
    salary : 104204
}
//readOnlyExample.department = "IT"; //cannot change, as every property is readonly.

//Exclude - Removes specified type from union.
type Status = "success" | "active" | "error" | "deactive";
type ActiveStatus = Exclude<Status,"error"|"deactive">;
type ErrorStatus = Exclude<Status,"success"|"active">;

//Extract - Opposite to Exclude, keeps only common types.
type CommonStatus = Extract<Status,"success"|"loading">;

//Record - It actually creates an object type with keys and values.
//Used when we want to CONFIG or LOOKUP OBJS.
type Roles = "admin" | "user" | "guests";
type PermissionsAllowed = Record<Roles,string[]>;
const permissionAccess : PermissionsAllowed = {
    admin : ["read","write","delete"],
    user : ["read","write"],
    guests : ["read"]
};


//Classes in TS.
class Info {
    private name : string;

    constructor(name : string){
        this.name = name;
    }

    public getName():string{
        return this.name;
    }
}

const person1 = new Info("ABCD");
console.log(person1.getName())

//inheritance
class Animal {
    private animalName : string;

    constructor(animalName : string){
        this.animalName = animalName;
    }

    public eats(item : string): string {
        return `${this.animalName} eats ${item}.`
    }
}

class Bear extends Animal {
    private animal : string;
    constructor(animal : string){
        super(animal);
        this.animal = animal;
    }

    public intro(): string{
        return `This is ${this.animal}.`
    }
}

const fluffy = new Bear("Fluffy");
console.log(fluffy.intro());
console.log(fluffy.eats("Honey"));


//Generics: It is used to create 'type variables' which are used to create reusable classes,functions etc.


//GENERIC FUNCTION
//Here we set type as S,N which we can specify while funciton calling.
function returnMixedArray<S,N> (val1 : S, val2 : N):[S,N]{
    return [val1,val2];
}
console.log(returnMixedArray<string,number>("hello",147));
console.log(returnMixedArray<number,boolean>(11474,true));


//GENERIC CLASS
class HashMap<T,K extends string | number>{

    private _mapping : Record<K,T>;

    constructor(){
        this._mapping = {} as Record<K,T>;
    }

    public get(key : K) : T{
        return this._mapping[key];
    }

    public set(key : K,value : T) : void{
        this._mapping[key] = value;
    }


}
const map1 = new HashMap<number,number>();
map1.set(12,23);
map1.set(13,45);
map1.set(17,287);
console.log(map1.get(12));
console.log(map1);

// const map2 = new HashMap<string,number>(23);
// map2.set("String value");
// console.log(map2.get());

//Custom utility in TS.


//1. This is custom utility where each property is marked nullable;
type Nullable<T> = {
    [P in keyof T] : T[P] | null; //keyof is used to extract key type from object type.
};

type User = {
    name : string;
    age : number;
    obj : {
        id : number;
        salary : number;
    }
}

type NullableUserUser = Nullable<User>;


//2. Partial cannot make nested objects optinal, so we can use custom utility
type DeepPartial<T>={
    [P in keyof T] ?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type PartialUser = Partial<User>; //nested data is not optinal;
type DeepPartialUser = DeepPartial<User>;


function getName() : string|undefined {
    return "Krushna";
}

const namedValue = getName();
console.log("Value Length : "+namedValue!.length); //! null assertion uses casting in shortcut.


//Advanced Types in TS.

//1. Mapped Types - Add or remove types,readonly,optional etc.
 
type Cake = {
    flavour : string,
    shape : string,
    weight : number
}

//mapping each property and applying some operation onto it
type AddedReadOnly<T> = {
    +readonly [P in keyof T] : T[P];
}

type RemoveReadOnlyAndMakeOptional<T> = {
    -readonly [P in keyof T] ?: T[P];
}

type RemoveReadOnlyAndMakeRequired<T> = {
    -readonly [P in keyof T] -?: T[P];
}

type ReadOnlyCake = AddedReadOnly<Cake>;
type RemovedReadOnly = RemoveReadOnlyAndMakeOptional<ReadOnlyCake>;
type ReadOnlyAndOptional = AddedReadOnly<RemoveReadOnlyAndMakeOptional<Cake>>;
type RemovedReadOnlyAndMadeRequired = RemoveReadOnlyAndMakeRequired<ReadOnlyAndOptional>;


const cakeWithReadOnly : AddedReadOnly<Cake> = {
    flavour : "Chocolate",
    shape : "Circle",
    weight : 1.5
}

//2. Conditional Types : Allows you to create types that depend on conditions.

//i. Basic Conditional Types:
type IsString<T> = T extends string ? 'true' : 'false';
type ItIsString = IsString<"hello">; //"yes"
type ItIsNotString = IsString<23>; //"no"

//ii. Distributive Conditional Types: if T is union, conditional types distribute over it.
//The Distributive logic is applied/looped through all UNIONS behind the scenes.
//it is actually used to power up the EXCLUDE and EXTRACT types.
type Distributive = IsString<string|number|boolean>;
const trueDistributive : Distributive = "true";
const falseDistributive : Distributive = "false";

//Excluding string type.
type ExcludeString<T> = T extends string ? never : T;
type TypeWithString = string | number | boolean ;
type ExcludedStringType = ExcludeString<TypeWithString>; // Here it will only have number and boolean.

//Extracting number type.
type ExtractNumber<T> = T extends number ? T : never;
type ExtractedNumberType = ExtractNumber<TypeWithString>; // Only number type is extracted.


//Tempelate Literal Type - It is used to construct new string types using patterns, its like string manipulation at type level.

type ButtonSize = "sm" | "md" | "lg";
const submitButton : ButtonSize = "lg";
const cancelButton : ButtonSize = "md";

let arrowFunction = (valueOne : ButtonSize) : ButtonSize=>{
    console.log(valueOne);
    return valueOne;
}
arrowFunction(submitButton);


