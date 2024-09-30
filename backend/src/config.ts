import z from "zod";

export const envSchema = z.object({
  PORT: z.number(),
});

const result = envSchema.safeParse(process.env);

if (result.success === false) {
  throw new Error(`Invalid environment variables. ${result.error}`);
}

export const { PORT } = result.data;
