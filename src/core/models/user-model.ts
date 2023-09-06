import { InferType, object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const UserSchema = object({
  firstName: string(),
  lastName: string(),
  address: string(),
  contactNumber: string().matches(
    phoneRegExp,
    "Numero de Telefono no es válido"
  ),
});

export const ChangePasswordSchema = object({
  oldPassword: string(),
  password: string(),
  recaptcha: string(),
});

export type UserForm = InferType<typeof UserSchema>;
export type ChangePasswordForm = InferType<typeof ChangePasswordSchema>;
