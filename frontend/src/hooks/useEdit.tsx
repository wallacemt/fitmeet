import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useActivities } from "./useActivities";
import { editUser, userAvatarDefine, userDesctivateAccount } from "@/services/userApi";

const formSchema = z.object({
  name: z.string().min(2, { message: "Preencha o campo com seu nome" }).max(50),
  cpf: z.string(),
  email: z.string().email({ message: "Preencha o campo com seu e-mail" }).min(2).max(50),
  password: z.string().min(6, { message: "Preencha o campo com sua senha" }).max(50),
  preference: z.array(z.string()).min(1, { message: "Selecione pelo menos uma preferência" }),
  avatar: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Selecione uma imagem",
  }),
});
export const useEdit = () => {
  const { user, handleUpdate, logout } = useContext(UserContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      cpf: "",
      avatar: undefined,
      password: "",
      preference: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const useAct = useActivities();

  const handleDesativar = async () => {
    try {
      await userDesctivateAccount();
      setMessage("Desativado com sucesso!");
      return setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const definePreferences = async (preferences: string[]) => {
    console.log(preferences);
    return useAct.updateUserPreference(preferences);
  };

  const editAvatar = async (avatar: File) => {
    console.log(File);
    return userAvatarDefine(avatar);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      console.log(values);
      const userPromise = editUser(values.name, values.email, values.password);
      const preferencePromise = definePreferences(values.preference);
      const avatarPromise = editAvatar(values.avatar);
      await Promise.all([userPromise, preferencePromise, avatarPromise]);
      setMessage("Editado com sucesso!");
      return handleUpdate();
    } catch (error: any) {
      setError(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  return { ...form, onSubmit, loading, error, setError, message, setMessage, handleDesativar };
};
