import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { createActivity } from "@/services/activitiesApi";
import { ActivityTypeNew } from "@/types/ActivityData";

const formSchema = z.object({
  title: z.string().min(1, { message: "Preencha o campo com o t tulo da atividade" }),
  description: z.string().min(1, { message: "Preencha o campo com a descri o da atividade" }),
  address: z.array(z.string()).min(1, { message: "Preencha o campo com o endereço da atividade" }),
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Selecione uma imagem",
  }),
  typeId: z.string().min(1, { message: "Selecione o tipo de atividade" }),
  scheduledDate: z.string().min(1, { message: "Preencha o campo com a data e hora da atividade" }),
  private: z.boolean(),
});
export const useNewActivity = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      address: [],
      image: undefined,
      typeId: "",
      scheduledDate: "",
      private: false,
    },
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const activity: ActivityTypeNew = {
      title: values.title,
      description: values.description,
      address: values.address,
      imageFile: values.image,
      typeId: values.typeId,
      scheduledDate: values.scheduledDate,
      private: values.private,
    };
    try {
      const response = await createActivity(activity);
      setMessage("Atividade Criada!");
      return response;
    } catch (error: any) {
      console.error("Erro ao enviar formulário:", error);
      setError(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>, activityId: string) => {
    setLoading(true);
    const activity: ActivityTypeNew = {
      title: values.title,
      description: values.description,
      address: values.address,
      imageFile: values.image,
      typeId: values.typeId,
      scheduledDate: values.scheduledDate,
      private: values.private,
    };
    try {
      const response = await createActivity(activity);
      setMessage("Atividade Editada!");

      console.log(response);
      return response;
    } catch (error: any) {
      console.error("Erro ao enviar formulário:", error);
      setError(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  return { ...form, onSubmit, loading, error, setError, message, setMessage, onSubmitEdit };
};
