import { InferType, object, string } from "yup";

export const SearchSchema = object({
  sheet: string(),
});

export type SearchForm = InferType<typeof SearchSchema>;
