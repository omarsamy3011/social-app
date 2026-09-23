import z from "zod";
import { signupSchema } from "../auth.validation";

export type SignupDTO = z.infer<typeof signupSchema.body>