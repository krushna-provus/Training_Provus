//Primitive Data Types in TS.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var studentName = "ABC";
var studentAge = 21;
var studentPassed = true;
var studentStatus;
var studentAadhar = null;
//console.log(typeof studentAadhar); //Prints object
//bcoz, it is a JS bug, when building JS, the typeof used to check type tags on variables, the type tag of object was set 0 and null in memory was set as 0, when typeof was used, it checked for type tag, which was 0 to null as well, so typeof null = object.
//But null is not an instanceof object, we cannot call methods or properties on null.
//Complex types
var arrayOfStrings = ["Abc", "Efg"];
var user1 = {
    userName: "ABCD",
    userAge: 32
};
//index signatures in TS, it can be used when we don't have defined list of properties.
var unknownObject = {};
unknownObject.newName = "Krushna";
unknownObject.newAge = 23;
console.log(unknownObject);
//console.log(typeof user1);
//array of arrays
var matrix = [[1, 2], [2, 3]];
//console.log(typeof matrix);
//array of objects
var users = [{ userName: "First", userAge: 21 }, { userName: "Second", userAge: 22 }];
//console.log(typeof users);
//array of array of objects 
var matrixUsers = [
    [{ userName: "First first", userAge: 11 }, { userName: "First second", userAge: 12 }],
    [{ userName: "Second First", userAge: 21 }]
];
//array of objects with nested array of objects.
var groceryList = [
    {
        date: "08 Feb 2026",
        items: [
            { itemType: "Electronic", itemName: "Smart Watch", itemCost: 1200 },
            { itemType: "Food", itemName: "Chips", itemCost: 40 }
        ],
        total: 1240
    },
    {
        date: "09 Feb 2026",
        items: [
            { itemType: "Toiletries", itemName: "Tissue Paper", itemCost: 60 },
            { itemType: "Kitchen", itemName: "Air Fryer", itemCost: 40000 }
        ],
        total: 40060
    }
];
//console.log(typeof groceryList);
// function declarations in TS.
//We can have default values while setting parameters but not when declaring object types.
//we canot use ?: in parameter initializaion along with default values, use any one.
//if we use optional ?: in parameters we need to use ?? in logic/body of code.
function adding(a, b) {
    console.log((a !== null && a !== void 0 ? a : 10) + (b !== null && b !== void 0 ? b : 30));
}
// adding(1)
// adding(10,20);
//here null and undefined are treated same by ?? - nullish coalescing operator, so it uses default values.
// adding(null,null);
// adding(undefined,undefined);
// adding();
//Deafult values are only used when something is undefined not when something is null, so we can pass undefined as an argument but cannot pass null(unless we take care of it in logic/body).
var subtracting = function (num1, num2) {
    if (num1 === void 0) { num1 = 100; }
    if (num2 === void 0) { num2 = 50; }
    console.log(num1 - num2);
};
// subtracting();
// subtracting(20,10);
// subtracting(70);
// any type in TS.
//any adapts/sets itself to a type depending upon the value assigned. Avoid using any.
var variableA = [12, 3];
console.log(typeof variableA);
// declare keyword actually doesn't creates JS code for code that uses 'declare'.
// declare simply says that 'I know this exists somewhere else, so allow it'.
// real world exmp : window,global, document, fetch, console these uses declare.
//Unknown and Never in TS.
//Unknown can be considered as sibling of any, whenever we don't know what data is coming we use any and then directly use that variable/object, BUT when we declare it as unknown, it will not allow to use it directly unless we declare the structure of the data, it simply enforces us to safe-type the data which just came.
// any - "you don't know what data is coming ? Fine, use it directly."
// unknown - "you don't know what data is coming ? let the data come, know the structure and declare the structure and then use it." It is a set of all possilbe values.
var fetchTodoListUnknown = function (todoListJSONString) {
    return JSON.parse(todoListJSONString);
};
var todoListViaAPI = fetchTodoListUnknown('{"id" : "1","todo" : "Task TS"}');
console.log(todoListViaAPI.id, todoListViaAPI.todo);
//if we use any, we can directly use the data.
var fetchTodo = function (jsonString) { return JSON.parse(jsonString); };
//We directly used without mentioning the structure.
var todoViaAny = fetchTodo("{\"id\" : \"2\", \"todo\" : \"Using Any\"}");
console.log(todoViaAny.id, todoViaAny.todo);
function privilages(user) {
    switch (user) {
        case "principle":
            console.log("Principle privilages");
            break;
        case "student":
            console.log("Student privilages");
            break;
        case "teacher":
            console.log("Teacher privilages");
            break;
        default:
            var _unreachable = user;
            console.log(_unreachable);
    }
}
function safeGuard(result) {
    return (typeof result === "object"
        && result !== null
        && "id" in result
        && "userId" in result
        && "title" in result
        && "completed" in result);
}
function fetchingData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/1")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP fetch error");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    if (!safeGuard(result)) {
                        throw new Error("Not expected result from API");
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchingData()];
                case 1:
                    todo = _a.sent();
                    console.log(todo);
                    return [2 /*return*/];
            }
        });
    });
}
//tuple - it is a typed array where, order matters, each pos has specific type, length is known, it's like an array with contract.
var array = [0, "TestName"];
var tuple = [1, "Krushna"]; //using readonly eliminates push and pop operations on both array and tuple.
//tuple.push(3); //Even though it's a tuple, we can push elements into it. TO fix use readonly.
console.log(tuple);
var roll = tuple[0], tupleName = tuple[1];
console.log(roll, tupleName);
//enums in TS, it is a set of pre defined constants.
var Category;
(function (Category) {
    Category["Sugar"] = "Sugar";
    Category["Gluten"] = "Gluten";
    Category["Fibre"] = "Fibre";
    Category["Protien"] = "Protien";
})(Category || (Category = {}));
var vegetables = Category.Fibre;
console.log(vegetables);
var entry1 = {
    name: "Krushna",
    empId: 8
};
var bear = {
    animalName: "Bear",
    eatsWhat: "Honey"
};
// We can intersect interface and type together.
var mixture = {
    name: "Krushna",
    animalName: "Lion"
};
console.log(mixture);
//casting in TS uses 'as' to explicitly tell compiler that the value is of a certain type.
//best practice to use 'as' is to first use unknown and then the taargeted type to avoid errors.
//we can use '<datatype>variable' instead of as
var x = 4;
console.log(x.length);
console.log(x.length);
