import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNewActivity } from "@/hooks/useNewActivity";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ActivityIcon } from "@/components/utils/ActivityIcon/ActivityIcon";

import { FormEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import { LocationPickerMap } from "../../../utils/LocationPickerMap";
import { ActivityResponse, ActivityType } from "@/types/ActivityData";
import { useActivities } from "@/hooks/useActivities";

export const ActivityCreateModal = ({
  openModal,
  setOpenModal,
  modalType = "create",
  activity,
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  modalType?: "create" | "edit";
  activity?: ActivityResponse;
}) => {
  const form = useNewActivity();
  const [preview, setPreview] = useState<string | null>(null);
  const [activityType, setActivityType] = useState<ActivityType[]>();
  const useAct = useActivities();

  useEffect(() => {
    if (modalType === "edit") {
      form.setValue("title", activity?.title || "");
      form.setValue("description", activity?.description || "");
      form.setValue(
        "scheduledDate",
        activity?.scheduleDate ? new Date(activity.scheduleDate).toISOString().slice(0, -5) : ""
      );
      form.setValue("address", [
        activity?.address.latitude.toString() || "",
        activity?.address.longitude.toString() || "",
      ]);
      form.setValue("private", activity?.private || true);
      setPreview(activity?.image || null);
      form.setValue("typeId", activity?.type || "");
    }
    const getActivitiesTypes = async () => {
      const response = await useAct.getActivitiesTypes();
      setActivityType(response);
    };
    getActivitiesTypes();
  }, [modalType]);

  const onSubmit = form.onSubmit;

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await form.onSubmitEdit(form.getValues(), activity?.id!);
    if (response) {
      setOpenModal(false);
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent
        className="z-50 font-secundaria w-full max-w-4xl sm:max-w-[49rem] sm:h-[48.125rem] sm:max-h-[50rem] h-full overflow-auto p-12"
        closeIcon={false}
      >
        <DialogHeader>
          <DialogTitle className="font-principal text-3xl font-normal">
            {modalType === "create" ? "Nova atividade" : "Editar atividade"}
            {form.error && <p className="font-secundaria absolute text-perigo text-center text-sm">{form.error}</p>}
            {form.message && (
              <p className="font-secundaria absolute text-primaria text-center text-sm">{form.message}</p>
            )}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={modalType === "create" ? form.handleSubmit(onSubmit) : handleEdit}
            className="space-y-4 w-full text-lg font-secundaria text-[#404040 flex flex-col flex-wrap"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* COLUNA ESQUERDA */}
              <div className="space-y-4">
                {/* IMAGEM */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => {
                    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Imagem <span className="text-perigo">*</span>
                        </FormLabel>
                        <FormControl>
                          <label
                            htmlFor="image"
                            className="w-full max-h-[8rem] border border-input rounded-md p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primaria transition group"
                          >
                            {preview ? (
                              <img
                                src={preview}
                                alt="Pré-visualização"
                                className="flex h-full flex-col items-center justify-center object-contain rounded-md"
                              />
                            ) : (
                              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground p-4">
                                <Image size={40} strokeWidth={2} className="text-[#404040]/80" />
                              </div>
                            )}
                            <input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* TÍTULO */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Título <span className="text-perigo">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: Aula de Ioga" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* DESCRIÇÃO */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Descrição <span className="text-perigo">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full h-40 p-4 resize-none bg-transparent outline-none border border-input rounded-md text-base"
                          placeholder="Como será a atividade? Regras, materiais, etc..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* DATA */}
                <FormField
                  control={form.control}
                  name="scheduledDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Data <span className="text-perigo">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          type="datetime-local"
                          {...field}
                          className=" bg-transparent border border-input rounded-md p-4 w-full text-base"
                          style={{
                            MozAppearance: "textfield",
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* COLUNA DIREITA */}
              <div className="space-y-4">
                {/* TIPOS */}
                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field }) => {
                    const toggleType = (activityId: string) => {
                      field.onChange(activityId);
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-secundaria text-[#404040] font-semibold">
                          Tipo de Atividade <span className="text-perigo">*</span>
                        </FormLabel>
                        <FormControl>
                          <Carousel>
                            <CarouselContent
                              className="flex items-center w-[19.5rem] p-2 max-w-full"
                              style={{ userSelect: "none" }}
                            >
                              {activityType?.map((item, index) => {
                                const selected = field.value === item.id;

                                return (
                                  <CarouselItem
                                    key={index}
                                    onClick={() => toggleType((item && item?.id) || "")}
                                    className="basis-1/3 flex justify-center"
                                  >
                                    <ActivityIcon
                                      type={item.name}
                                      typeImage={item.image}
                                      className={cn(
                                        "rounded-full  transition-all cursor-pointer",
                                        selected ? "border-2 border-primaria" : ""
                                      )}
                                    />
                                  </CarouselItem>
                                );
                              })}
                            </CarouselContent>
                          </Carousel>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* MAPA */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-secundaria text-[#404040] font-semibold">
                        Ponto de Encontro <span className="text-perigo">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="w-full h-60 rounded-md overflow-hidden border border-input">
                          <LocationPickerMap
                            value={
                              field.value && field.value.length === 2
                                ? [parseFloat(field.value[0]), parseFloat(field.value[1])]
                                : null
                            }
                            onChange={(coords) => field.onChange([coords[0].toString(), coords[1].toString()])}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* PRIVADO */}
                <FormField
                  control={form.control}
                  name="private"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-secundaria text-[#404040 font-semibold">
                        Requer aprovação para participar? <span className="text-perigo">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 mt-2">
                          <Button
                            variant="outline"
                            className={`px-4 text-base py-2 rounded-md ${
                              field.value === true
                                ? "bg-[#404040] text-white hover:text-white hover:bg-[#404040]/80"
                                : "hover:border hover:border-primaria"
                            }`}
                            onClick={() => field.onChange(true)}
                          >
                            Sim
                          </Button>
                          <Button
                            variant="outline"
                            className={` px-4 text-base py-2 rounded-md ${
                              field.value === false
                                ? "bg-perigo text-white hover:text-white hover:bg-[#404040]/80"
                                : "hover:border hover:border-primaria"
                            }`}
                            onClick={() => field.onChange(false)}
                          >
                            Não
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {modalType === "create" ? (
              <Button
                type="submit"
                disabled={form.loading || !form.formState.isValid}
                className="disabled:cursor-not-allowed text-base bg-primaria w-full max-w-2xs p-6 h-12 mt-4 hover:bg-primaria/80 flex items-center justify-center rounded-md mx-auto lg:mx-0 self-end-safe lg:  absolute bottom-4 right"
              >
                {form.loading ? (
                  <div className="animate-spin h-5 w-5 border-b-2 border-[#F9370B] rounded-full" />
                ) : (
                  "Criar"
                )}
              </Button>
            ) : (
              <div className="w-full lg:w-fit flex lg:flex-row flex-col relative  lg:left-16 gap-2 lg:absolute bottom-4 ">
                <Button
                  variant={"ghost"}
                  className="disabled:cursor-not-allowed text-base  w-full max-w-2xs p-6 h-12 mt-4  flex items-center justify-center rounded-md mx-auto lg:mx-0 self-end-safe border border-perigo text-perigo font-bold hover:text-perigo hover:scale-105 cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  {form.loading ? (
                    <div className="animate-spin h-5 w-5 border-b-2 border-[#F9370B] rounded-full" />
                  ) : (
                    "Cancelar"
                  )}
                </Button>
                <Button
                  className="disabled:cursor-not-allowed text-base bg-primaria w-full max-w-2xs p-6 h-12 mt-4 hover:bg-primaria/80 flex items-center justify-center rounded-md mx-auto lg:mx-0 self-end-safe cursor-pointer"
                  onClick={() => form.onSubmitEdit(form.getValues(), activity?.id!)}
                >
                  {form.loading ? (
                    <div className="animate-spin h-5 w-5 border-b-2 border-[#F9370B] rounded-full" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
