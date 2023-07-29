import { InferType, object, string } from 'yup';

export const CouponSchema = object({
  code: string().max(6, "Verifica el tamaño del código").required('Ingresa un código de cupón'),
  recaptcha: string().required('Debe validar que no es un robot'),
});

export type CouponForm = InferType<typeof CouponSchema>;
