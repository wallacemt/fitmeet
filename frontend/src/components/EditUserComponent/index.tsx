import { Camera, ChevronLeft, Trash } from "lucide-react";
import { HomeContainer } from "../Home/HomeContainer";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { formatCPF } from "@/utils/cpfUtilis";
import { useEdit } from "@/hooks/useEdit";

import { ActivityIcon } from "../utils/ActivityIcon/ActivityIcon";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Link } from "react-router";
import { useActivities } from "@/hooks/useActivities";
import { ActivityType } from "@/types/ActivityData";
export const EditUser = () => {
  const { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const form = useEdit();
  const [viewConfirm, setViewConfirm] = useState(false);
  const [activityType, setActivityType] = useState<ActivityType[]>();
  const [userPreferences, setUserPreferences] = useState<ActivityType[]>();
  const useAct = useActivities();
  const onSubmit = form.onSubmit;

  useEffect(() => {
    const getActivitiesTypes = async () => {
      const response = await useAct.getActivitiesTypes();
      setActivityType(response);
    };
    const getUserPreference = async () => {
      const response = await useAct.getUserPreference();
      setUserPreferences(response);
    };

    getUserPreference();
    getActivitiesTypes();
  }, []);

  return (
    <HomeContainer>
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-[20rem] flex flex-col gap-10">
          <Link to={"/profile"}>
            <Button variant={"ghost"} className="font-secundaria text-base font-bold relative right-12 cursor-pointer">
              {" "}
              <ChevronLeft /> Voltar para o perfil
            </Button>
          </Link>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:space-y-8 lg:p-0 p-2 space-y-4 w-full text-base text-[#404040] "
            >
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => {
                  const [preview, setPreview] = useState(
                    typeof field.value === "string" ? field.value : user?.avatar || ""
                  );
                  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                      field.onChange(file);
                    }
                  };

                  const inputId = "avatar-upload";

                  return (
                    <FormItem>
                      <FormControl>
                        <Avatar className="w-fit relative mx-auto">
                          <AvatarImage src={preview} alt="user image" className="h-52 w-52 rounded-full object-cover" />
                          <AvatarFallback>WS</AvatarFallback>

                          <label
                            htmlFor={inputId}
                            className="rounded-full z-10 bg-white shadow-lg absolute bottom-2 right-2 p-3 text-[#404040] cursor-pointer hover:scale-105"
                          >
                            <Camera />
                          </label>
                          <input
                            id={inputId}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </Avatar>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome Completo <span className="font-semibold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: João Silva"
                        {...field}
                        style={{ fontSize: "1rem" }}
                        autoComplete="name"
                        className="h-14 text-3xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CPF <span className="font-semibold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: 123.456.789-01"
                        disabled
                        style={{ fontSize: "1rem" }}
                        className="h-14 disabled:text-bold"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={formatCPF(user?.cpf ?? "")}
                        maxLength={14}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      E-mail<span className="font-semibold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: joao@email.com"
                        style={{ fontSize: "1rem" }}
                        {...field}
                        className="h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">
                      Senha <span className="font-semibold">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Ex.: joao123"
                          autoComplete="current-password"
                          {...field}
                          id="password"
                          className="h-14"
                          style={{ fontSize: "1rem" }}
                        />
                        <div
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preference"
                render={({ field }) => {
                  const selectedPreferences = field.value || userPreferences;
                  const togglePreference = (activityId: string) => {
                    const isSelected = selectedPreferences.includes(activityId);
                    const newPreferences = isSelected
                      ? selectedPreferences.filter((id) => id !== activityId)
                      : [...selectedPreferences, activityId];
                    field.onChange(newPreferences);
                  };

                  return (
                    <FormItem>
                      <FormLabel>
                        Preferências <span className="font-semibold">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Carousel>
                          <CarouselContent className="flex items-center max-w-[24rem]" style={{ userSelect: "none" }}>
                            {activityType?.map((item, index) => {
                              const isSelected = selectedPreferences.includes(item?.id?.toString() || "");
                              const isUserPreference = userPreferences?.some((pref) => pref.id === item?.id);
                              return (
                                <CarouselItem
                                  key={index}
                                  className="h-full  flex items-center justify-center basis-1/3"
                                  onClick={() => togglePreference(item?.id?.toString() || "")}
                                >
                                  <div className={` w-26 h-full p-2 rounded-full transition-all cursor-pointer`}>
                                    <ActivityIcon
                                      type={item.name}
                                      typeImage={item.image}
                                      className={`w-fit ${isSelected || isUserPreference ? "border-2 border-primaria" : "border-none"}
                                     `}
                                    />
                                  </div>
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

              {form.error && setTimeout(() => form.setError(""), 3000) && (
                <p className="text-perigo text-center text-sm">{form.error}</p>
              )}

              {form.message && setTimeout(() => form.setMessage(""), 6000) && (
                <p className="text-primaria text-center text-sm">{form.message}</p>
              )}

              <div className="flex gap-2 w-fit">
                <Button
                  type="submit"
                  disabled={form.loading}
                  className="text-base cursor-pointer bg-primaria w-full h-12 mt-4 hover:bg-primaria/80 flex items-center justify-center"
                >
                  {form.loading ? (
                    <div className="animate-spin p-3 h-5 w-5 border-b-2 border-[#F9370B] rounded-full"></div>
                  ) : (
                    "Editar"
                  )}
                </Button>
                <Button
                  type="submit"
                  className="disabled:cursor-not-allowed border text-base w-full h-12 mt-4 hover:bg-primaria/80 flex items-center justify-center border-[#404040]"
                  variant={"ghost"}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>

          <Button
            className="font-bold text-base text-perigo p-2 hover:text-perigo/80 cursor-pointer"
            onClick={() => setViewConfirm(viewConfirm ? false : true)}
            variant={"ghost"}
          >
            {""} <Trash />
            Desativar minha conta
          </Button>
        </div>

        {viewConfirm && (
          <Dialog open={viewConfirm} onOpenChange={setViewConfirm}>
            <DialogContent closeIcon={false} className="flex flex-col p-8 font-secundaria gap-9">
              <DialogHeader>
                <DialogTitle className="font-principal font-normal text-3xl text-[#171717]">
                  Tem certeza que deseja desativar sua conta?
                </DialogTitle>
                <DialogDescription className="text-[#404040] text-[1rem]">
                  Ao desativar sua conta, todos os seus dados e histórico de atividades serão permanentemente removidos.
                  <span className="font-bold"> Esta ação é irreversível e não poderá ser desfeita.</span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant={"ghost"}
                  onClick={() => setViewConfirm(false)}
                  className="border text-[1rem] p-6 font-bold border-[#171717] cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button variant={"destructive"} onClick={form.handleDesativar} className="p-6 text-[1rem] cursor-pointer">
                  Desativar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </section>
    </HomeContainer>
  );
};
