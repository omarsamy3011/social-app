<<<<<<< HEAD
import z from "zod";
import { signupSchema } from "../auth.validation";

=======
import z from "zod";
import { signupSchema } from "../auth.validation";

>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
export type SignupDTO = z.infer<typeof signupSchema.body>