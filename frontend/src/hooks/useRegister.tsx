import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { loginUser, registerUser } from "@/services/authApi";
import { UserResponse } from "@/types/UserTypes";
import { UserContext } from "@/contexts/UserContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Preencha o campo com seu nome" }).max(50),
  cpf: z
    .string()
    .min(11, { message: "Preencha o campo com seu CPF" })
    .max(11, { message: "O CPF deve conter exatamente 11 caracteres" })
    .regex(/^[0-9]+$/, { message: "O CPF deve conter apenas números" }),
  email: z.string().email({ message: "Preencha o campo com seu e-mail" }).min(2).max(50),
  password: z.string().min(6, { message: "Preencha o campo com sua senha" }).max(50),
});
export const useRegister = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(UserContext);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const userResponse: any = await registerUser(values.name, values.cpf, values.email, values.password);
      setMessage(userResponse.message);
      return setTimeout(async () => {
        const userResponse: UserResponse = await loginUser(values.email, values.password);
        login(userResponse.token);
        return userResponse;
      }, 3000);
    } catch (error: any) {
      setError(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  return { ...form, onSubmit, loading, error, setError, message, setMessage };
};
