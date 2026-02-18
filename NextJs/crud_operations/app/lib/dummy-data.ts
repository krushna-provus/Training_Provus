import { ReviewSchema } from "../types/review";

export const dummyData : ReviewSchema[] = [
    {id : 1, name : "ABC", email : "abc@abc.com",review : "Random review 1",createdAt : new Date()},
    {id : 2, name : "EFG", email : "efg@efg.com",review : "Random review 2", createdAt : new Date()},
]