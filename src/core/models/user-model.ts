import { InferType, object, string, ref } from "yup";

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

const getCharacterValidationError = (str: string) => {
  return `La contraseña debe contener al menos 1 ${str}`;
};

export const ChangePasswordSchema = object({
  oldPassword: string(),
  password: string()
    .required("Inserta una contraseña")
    .min(8, "La contraseña debe contener 8  o más caracteres")
    .matches(/[0-9]/, getCharacterValidationError("número"))
    .matches(/[a-z]/, getCharacterValidationError("letra minúscula"))
    .matches(/[A-Z]/, getCharacterValidationError("letra mayúscula")),
  passConfirmation: string()
    .oneOf([ref("password"), null], "La contraseña no coincide")
    .required("Repite la contraseña"),
  recaptcha: string(),
});

export type UserForm = InferType<typeof UserSchema>;
export type ChangePasswordForm = InferType<typeof ChangePasswordSchema>;
