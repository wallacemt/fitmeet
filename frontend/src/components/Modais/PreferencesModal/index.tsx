import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "../../ui/button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useEdit } from "@/hooks/useEdit";
import { ActivityIcon } from "../../utils/ActivityIcon/ActivityIcon";
import { useActivities } from "@/hooks/useActivities";
import { ActivityType } from "@/types/ActivityData";

export const PreferencesModal = () => {
  const { viewPreferenceModal, setViewPreferenceModal } = useContext(UserContext);
  const [activityType, setActivityType] = useState<ActivityType[]>();
  const [preferences, setPreferences] = useState<string[]>([]);
  const useAct = useActivities();

  const form = useEdit();
  const handleSkip = () => {
    sessionStorage.getItem("viewPreferenceModal") === "true"
      ? sessionStorage.setItem("viewPreferenceModal", "false")
      : sessionStorage.setItem("viewPreferenceModal", "true");
    setViewPreferenceModal(false);
  };

  useEffect(() => {
    const getActivityType = async () => {
      const response = await useAct.getActivitiesTypes();
      setActivityType(response);
    };

   
    getActivityType();
  }, []);

  const handleSavePreferences = async () => {
    try {
      await useAct.updateUserPreference(preferences);
      handleSkip();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={viewPreferenceModal} onOpenChange={setViewPreferenceModal}>
      <DialogContent
        closeIcon={false}
        className="w-full flex items-center justify-center flex-col p-10 font-secundaria gap-9"
      >
        <DialogHeader>
          <DialogTitle className="font-principal text-center font-normal text-3xl text-[#171717]">
            Selecione as suas atividades preferidas
          </DialogTitle>
          <DialogDescription className="w-full">
            <Form {...form}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="lg:space-y-8 lg:p-0 p-2 space-y-4 w-full text-base text-[#404040] "
              >
                <FormField
                  control={form.control}
                  name="preference"
                  render={({ field }) => {
                    const selectedPreferences = field.value || [];
                    const togglePreference = (activityId: string) => {
                      const isSelected = selectedPreferences.includes(activityId);
                      const newPreferences = isSelected
                        ? selectedPreferences.filter((id) => id !== activityId)
                        : [...selectedPreferences, activityId];

                      setPreferences(newPreferences);
                      field.onChange(newPreferences);
                    };
                    return (
                      <FormItem>
                        <FormControl className="w-full h-fit">
                          <div className="flex flex-wrap items-center justify-center" style={{ userSelect: "none" }}>
                            {activityType?.map((item, index) => {
                              const isSelected = item.id != null && selectedPreferences.includes(item.id.toString());
                              return (
                                <div
                                  key={index}
                                  className="h-full  flex flex-col items-center justify-center"
                                  onClick={() => togglePreference(item.id?.toString() || "")}
                                >
                                  <div className={` w-26 h-full p-2 rounded-full transition-all cursor-pointer`}>
                                    <ActivityIcon
                                      type={item.name}
                                      typeImage={item.image}
                                      className={`w-fit ${isSelected ? "border-2 border-primaria" : "border-none"}
                                     `}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
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

                <div className="w-fit  mx-auto flex gap-4 items-center justify-center">
                  <Button
                    type="submit"
                    className="w-full p-6 bg-primaria hover:bg-green-600 cursor-pointer transition-colors text-[1rem] font-bold"
                    onClick={() => handleSavePreferences()}
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={handleSkip}
                    className=" w-full border text-[1rem] p-6 font-bold border-primaria text-primaria hover:bg-primaria hover:text-white cursor-pointer"
                  >
                    Pular
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
