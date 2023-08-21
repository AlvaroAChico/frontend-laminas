import { InferType, object, string } from "yup";

export const CouponSchema = object({
  code: string()
    .min(8, "Verifica el tamaño del código")
    .max(8, "Verifica el tamaño del código")
    .required("Ingresa un código de cupón"),
  recaptcha: string(),
});
// recaptcha: string().required('Debe validar que no es un robot'),

export type CouponForm = InferType<typeof CouponSchema>;
