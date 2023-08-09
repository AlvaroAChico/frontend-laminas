import { InferType, object, string, ref } from "yup";

export const SignupSchema = object({
  email: string().email("Ingresa un email válido").required("Ingresa tu email"),
  password: string().required("Inserta una contraseña"),
  passConfirmation: string()
    .oneOf([ref("password"), null], "La contraseña no coincide")
    .required("Repite la contraseña"),
  recaptcha: string(),
});
// recaptcha: string().required('Debe validar que no es un robot'),

export type SignupForm = InferType<typeof SignupSchema>;
