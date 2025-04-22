
import { Button } from "../ui/button";
import { ActivityResponse, Participant } from "@/types/ActivityData";
import { UserResponse } from "@/types/UserTypes";

const ParticipationButton = ({onClickFunc}: {onClickFunc: () => void}) => {
  return (
    <Button
      type="button"
      className="text-base font-bold  bg-primaria  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => onClickFunc()}
    >
      Participar
    </Button>
  );
};

const ParticipationStatusButton = ({status}: {status: string}) => {

  return (
    <Button
      type="button"
      className="text-base font-bold  bg-primaria  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => {}}
    >
     {status === "pending" ? "Aguardando aprovação" : "Inscrição Negada"}
    </Button>
  );
};

const CancelParticipationButton = () => {
  return (
    <Button
      type="button"
      variant={'ghost'}
      className="text-base border text-perigo font-extrabold border-perigo   w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => {}}
    >
      Desinscrever
    </Button>
  );
};


export const ActivityButtonFactory = ({activity, participants, user, onClik}: {activity: ActivityResponse, participants: Participant[], user: UserResponse | null, onClik: () => void}) => {

  const isPending  = participants.find((par) => par.userId === user?.id && par.subscriptionStatus === 'pending')

  if(activity?.private && isPending) return <ParticipationStatusButton status="pending"/>

  if(participants.find((par) => par.userId === user?.id )) return <CancelParticipationButton/>

  return <ParticipationButton onClickFunc={onClik}/>

}