import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "@/services/authApi";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { UserResponse } from "@/types/UserTypes";

const formSchema = z.object({
  email: z.string().email({ message: "Preencha o campo com seu e-mail" }).min(2).max(50),
  password: z.string().min(6, { message: "Preencha o campo com sua senha" }).max(50),
});
export const useLogin = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const userResponse: UserResponse = await loginUser(values.email, values.password);
      login(userResponse.token);
      return userResponse;
    } catch (error: any) {
      setError(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  return { ...form, onSubmit, loading, error, setError };
};
