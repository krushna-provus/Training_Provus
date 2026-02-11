//More on classes.
//In JS/TS derived class CONSTRUCTORS must call super() explicitly,
//But in special case, if we don't mention a constructor at all, then JS/TS will add it for us.
//We cannot call GrandParentClass constructor straight from ChildClass, it is not possible, but indirectly it is called via inheritance chain.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var GrandParentClass = /** @class */ (function () {
    function GrandParentClass(id, name) {
        this.id = id;
        this.name = name;
    }
    return GrandParentClass;
}());
//in parent class we declared a constructor,so it is mandatory to call super() first.
var ParentClass = /** @class */ (function (_super) {
    __extends(ParentClass, _super);
    function ParentClass(id, name, age) {
        var _this = _super.call(this, id, name) || this;
        _this.age = 12;
        _this.age = age;
        return _this;
    }
    return ParentClass;
}(GrandParentClass));
// in child class we haven't declared any constructor,so JS/TS adds constructor for us bts.
var ChildClass = /** @class */ (function (_super) {
    __extends(ChildClass, _super);
    function ChildClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.address = "Main St.23";
        return _this;
    }
    return ChildClass;
}(ParentClass));
var child1 = new ChildClass(1, "ABCD", 21);
//This becomes a Generic funciton, Generic funciton is a normal function where a type helper mapped over it.
var makeFetchCall = function (url) {
    return fetch(url).then(function (res) { return res.json(); });
};
var implementingFetchCall = function () {
    //Function is same, just type is changing, Resuable.
    makeFetchCall("api/json");
    makeFetchCall("api2/json");
};
//Tip 3 : Almost all the inbuilt funcitons are generic in JS/TS.
//We can constraint these inbuilt funcitons by passing the type argument in it.
//Initially Set function is with type <unkown>, when we explicitly pass a type argument, it will only accept the values of that type.
//Especially in React useState,useRef,useReducer are all functions, so we can explicitly mention which type of data should they accept.
var set = new Set();
var map = new Map();
set.add("abc");
map.set(1, "abcd");
// set.add(1); //This will throw an error in compile time.
//Tip 4 : Infering types passed to funcitons.
//Whenever we declare a generic funciton, the type is infered from it.
var addObject = function (myObj) {
    var obj = __assign(__assign({}, myObj), { id: 123 });
    return obj;
};
var result = addObject({
    fistName: "ABC",
    lastName: "EFG"
});
result.fistName;
//Whenever we declare a Generic funciton, we must constraint on it.
//Tip 6 : We can use "as"
// "as" is used to assert, i.e. tell TS that I know what type it is.
var getKeysFromValues = function (obj) {
    return Object.keys(obj);
};
var res = getKeysFromValues({ firstName: "ABC", lastName: "AA" });
//Tip 7 : Multiple Generic types:
//We can pass multiple generic types.
var getValueOfKeyPassed = function (obj, key) {
    return obj[key];
};
//Here everyting is infered to getValueOfKeyPassed.
var resultOfGetValueOfKeyPassed = getValueOfKeyPassed({ a: 1, b: "One", c: true }, "b");
//Tip 8 : Default generics.
//Just like default value, we can have a default type in generics.
var createSet = function () {
    return new Set();
};
var numberSet = createSet();
var stringSet = createSet(); //By default it will have string set.
// Tip 9 : Generics from other libraries.
//Using Zod z.schema etc.
//TYPE GUARDS 
//It's just like type narrowing, it runs the logic which is required based on type check.
var typeGuardFunction = function (data) {
    if (typeof data == 'string') {
        console.log("This is string");
    }
    else if (typeof data == "number") {
        console.log("This is number");
    }
    else {
        console.log("Error !,Invalid Type");
    }
};
typeGuardFunction("true");
//Error handling in TS.
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = 'Database Error';
        Object.setPrototypeOf(_this, DatabaseError.prototype);
        return _this;
    }
    return DatabaseError;
}(Error));
function databaseConnection() {
    var num = Math.random() > 0.5;
    if (num) {
        return "Connection successful!";
    }
    else {
        throw new DatabaseError("Connection Failed!");
    }
}
function handlingDatabaseConnection() {
    try {
        var dbConn = databaseConnection();
        console.log(dbConn);
    }
    catch (error) { //error in catch block is 'unknown' implicitly,so we use error instaceof Error, which is also a type gurading mechanism.
        if (error instanceof Error) {
            console.log("An Error Occured - ".concat(error.name, " : ").concat(error.message));
        }
    }
}
handlingDatabaseConnection();
