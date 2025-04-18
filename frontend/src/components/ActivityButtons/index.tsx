import { useButtons } from "@/hooks/useButons";
import { Button } from "../ui/button";

export const ParticipationButton = () => {
  return (
    <Button
      type="button"
      className="text-base font-bold  bg-primaria  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => {}}
    >
      Participar
    </Button>
  );
};

export const ParticipationStatusButton = () => {
    const {handleParticipationStatus} = useButtons();
  return (
    <Button
      type="button"
      className="text-base font-bold  bg-primaria  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => {}}
    >
     {handleParticipationStatus() === "pending" ? "Aguardando aprovação" : "Participar"}
    </Button>
  );
};
