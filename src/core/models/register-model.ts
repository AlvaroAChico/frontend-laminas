import { InferType, object, string, ref } from "yup";

const getCharacterValidationError = (str: string) => {
  return `La contraseña debe contener al menos 1 ${str}`;
};

// const regexSpecialLetters = /[!@#$%^&*()_+\-={};':"\\|,.<>?]/;

// .matches(
//   regexSpecialLetters,
//   getCharacterValidationError("caracter especial")
// )

export const SignupSchema = object({
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
// recaptcha: string().required('Debe validar que no es un robot'),

export type SignupForm = InferType<typeof SignupSchema>;
