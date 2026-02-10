//Utility types in TS : pick,omit,record,partial.exclude,extract,required,readonly
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
var readOnlyExample = {
    empId: 101,
    name: "ABC",
    department: "CS",
    salary: 104204
};
var permissionAccess = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guests: ["read"]
};
//Classes in TS.
var Info = /** @class */ (function () {
    function Info(name) {
        this.name = name;
    }
    Info.prototype.getName = function () {
        return this.name;
    };
    return Info;
}());
var person1 = new Info("ABCD");
console.log(person1.getName());
//inheritance
var Animal = /** @class */ (function () {
    function Animal(animalName) {
        this.animalName = animalName;
    }
    Animal.prototype.eats = function (item) {
        return "".concat(this.animalName, " eats ").concat(item, ".");
    };
    return Animal;
}());
var Bear = /** @class */ (function (_super) {
    __extends(Bear, _super);
    function Bear(animal) {
        var _this = _super.call(this, animal) || this;
        _this.animal = animal;
        return _this;
    }
    Bear.prototype.intro = function () {
        return "This is ".concat(this.animal, ".");
    };
    return Bear;
}(Animal));
var fluffy = new Bear("Fluffy");
console.log(fluffy.intro());
console.log(fluffy.eats("Honey"));
//Generics: It is used to create 'type variables' which are used to create reusable classes,functions etc.
//Here we set type as S,N which we can specify while funciton calling.
function returnMixedArray(val1, val2) {
    return [val1, val2];
}
console.log(returnMixedArray("hello", 147));
console.log(returnMixedArray(11474, true));
//Generic class
var HashMap = /** @class */ (function () {
    function HashMap() {
        this._mapping = {};
    }
    HashMap.prototype.get = function (key) {
        return this._mapping[key];
    };
    HashMap.prototype.set = function (key, value) {
        this._mapping[key] = value;
    };
    return HashMap;
}());
var map1 = new HashMap();
map1.set(12, 23);
map1.set(13, 45);
map1.set(17, 287);
console.log(map1.get(12));
console.log(map1);
// const map2 = new HashMap<string,number>(23);
// map2.set("String value");
// console.log(map2.get());
