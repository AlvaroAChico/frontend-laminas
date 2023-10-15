import { InferType, object, string, ref } from "yup";

const getCharacterValidationError = (str: string) => {
  return `La contraseña debe contener al menos 1 ${str}`;
};

export const RecoverPasswordSchema = object({
  token: string().required(),
  email: string().email("Ingresa un email válido").required("Ingresa tu email"),
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

export type RecoverPasswordForm = InferType<typeof RecoverPasswordSchema>;
