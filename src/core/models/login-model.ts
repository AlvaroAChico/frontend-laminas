import { InferType, object, string } from 'yup';

export const SigninSchema = object({
  email: string().email('Ingresa un email válido').required('Ingresa tu email'),
  password: string().required('Inserta una contraseña'),
  recaptcha: string().required('Debe validar que no es un robot'),
});

export type SigninForm = InferType<typeof SigninSchema>;
