import { ReviewSchema } from "../types/review";
import { User } from "../types/users";

export const dummyData : ReviewSchema[] = [
    {id : 1, name : "ABC", email : "abc@abc.com",review : "Random review 1",createdAt : new Date()},
    {id : 2, name : "EFG", email : "efg@efg.com",review : "Random review 2", createdAt : new Date()},
]


export const dummyUsers : User[] = [
    {id : 1, fName : "Test",lName : "One",email: "test1@test.com",password : "ABC",createdAt : new Date()},
]