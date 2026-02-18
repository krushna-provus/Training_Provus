import * as z from "zod";

export const Review = z.object({
    name : z.string().min(2,"Name must be greater than 2 alphabets."),
    email : z.email("Invalid Email."),
    review : z.string().min(3,"Review must be greater than 3 characters.").max(100,"Review must be less than 50 characters."),
})

export type CreateReview = z.infer<typeof Review>;

export const ExtendedReview = Review.extend({
    id : z.number(),
    createdAt : z.date()
});

export type ReviewSchema = z.infer<typeof ExtendedReview>;


export type Options = {
    heading : string,
    navLink : string
}

