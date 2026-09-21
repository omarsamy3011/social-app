import z from "zod";




export const postValidation = z.strictObject({
    title:z.string().min(5,'please make more than 5'),
    content:z.string().min(5,'please make more than 5')
})