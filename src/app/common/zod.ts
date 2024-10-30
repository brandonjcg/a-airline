import { ZodSchema } from 'zod';

export const validationOfModelWithZod = <T>({
  schema,
  body,
}: {
  schema: ZodSchema;
  body: T;
}) => {
  const validation = schema.safeParse(body);
  if (!validation.success) {
    const flatErrors = Object.entries(
      validation.error.flatten().fieldErrors,
    ).flatMap(([field, messages]) =>
      (messages as string[]).map((message) => `${field}: ${message}`),
    );

    return flatErrors;
  }

  return null;
};
