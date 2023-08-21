import { InferType, object, string, number } from "yup";

export const UserSchema = object({
  firstName: string(),
  lastName: string(),
  address: string(),
  contactNumber: string(),
});

export type UserForm = InferType<typeof UserSchema>;
