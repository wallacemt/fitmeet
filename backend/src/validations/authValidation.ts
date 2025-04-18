import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email("E-mail inválido."),
  cpf: z.string().length(11, "CPF inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("E-mail inválido.").optional(),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
});