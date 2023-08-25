import { InferType, object, string } from "yup";

export const UserSchema = object({
  firstName: string(),
  lastName: string(),
  address: string(),
  contactNumber: string(),
});

export const ChangePasswordSchema = object({
  oldPassword: string(),
  password: string(),
  recaptcha: string(),
});

export type UserForm = InferType<typeof UserSchema>;
export type ChangePasswordForm = InferType<typeof ChangePasswordSchema>;
