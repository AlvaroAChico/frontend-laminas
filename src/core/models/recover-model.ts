import { InferType, object, string } from "yup";

export const RecoverSchema = object({
  email: string().email("Ingresa un email válido").required("Ingresa tu email"),
  recaptcha: string(),
});
// recaptcha: string().required('Debe validar que no es un robot'),

export type RecoverForm = InferType<typeof RecoverSchema>;
