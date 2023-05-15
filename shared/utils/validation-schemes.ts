import { object, string } from "yup";

export const signInScheme = object({
  email: string().required("Это обьязательное поле").email("Невалидный email"),
  password: string().required().min(4),
});
