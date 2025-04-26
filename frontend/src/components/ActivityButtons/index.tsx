import { Button } from "../ui/button";
import { ActivityResponse, Participant } from "@/types/ActivityData";
import { UserResponse } from "@/types/UserTypes";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const ParticipationButton = ({ onClickFunc }: { onClickFunc: () => void }) => {
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

const ParticipationStatusButton = ({ status }: { status: string }) => {
  return (
    <Button
      type="button"
      className={`text-base font-bold ${
        status == "pending"
          ? "bg-primaria cursor-pointer hover:bg-primaria"
          : "bg-transparent border border-perigo text-perigo hover:bg-perigo hover:text-white cursor-not-allowed"
      }  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 ease-in-out  relative lg:mx-0 mx-auto`}
      onClick={() => {}}
    >
      {status === "pending" ? "Aguardando aprovação" : "Inscrição Negada"}
    </Button>
  );
};

const CancelParticipationButton = ({ onClickFunc }: { onClickFunc: () => void }) => {
  return (
    <Button
      type="button"
      variant={"ghost"}
      className="text-base border text-perigo font-extrabold border-perigo   w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:text-perigo transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
      onClick={() => onClickFunc()}
    >
      Desinscrever
    </Button>
  );
};

const AtivityStatusButton = ({ acStatus }: { acStatus: string }) => {
  return (
    <Button
      type="button"
      variant={"ghost"}
      className="text-base border font-extrabold border-[#404040]  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105  transition duration-300 ease-in-out cursor-not-allowed relative lg:mx-0 mx-auto"
    >
      {acStatus === "inProgress" ? "Atividade em andamento" : "Atividade encerrada"}
    </Button>
  );
};

const ActivityCountDownButton = ({ activity }: { activity: ActivityResponse }) => {
  const countDownDate = new Date(activity.scheduleDate).getTime();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <Button
      type="button"
      variant={"ghost"}
      className="text-base border text-perigo font-extrabold border-perigo   w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:text-perigo transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
    >
      Atividade Começa em <br />
      {""}
      {time}
    </Button>
  );
};

const ActivityChekinButton = ({ onClickFunc }: { onClickFunc: (code: string) => void }) => {
  const [code, setCode] = useState("");
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="font-principal text-3xl text-[#171717] font-normal">Faça seu Check-in</p>
      <form
        className="flex gap-4 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          onClickFunc(code);
        }}
      >
        <Input
          type="text"
          className="w-[12.5rem]"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de confirmação"
        />
        <Button
          type="submit"
          className="text-base font-bold  bg-primaria  w-fit p-4 h-12 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto self-end"
        >
          Confirmar
        </Button>
      </form>
    </div>
  );
};

export const ActivityButtonFactory = ({
  activity,
  participants,
  user,
  onClik,
}: {
  activity: ActivityResponse;
  participants: Participant[];
  user: UserResponse | null;
  onClik: { subscribeActivity: any; unsubscribeActivity: any; checkInActivity: any };
}) => {
  const isParticipant = participants.find((par) => par.userId === user?.id && par.subscriptionStatus === "accepted");

  const isPending = participants.find((par) => par.userId === user?.id && par.subscriptionStatus === "pending");

  const isRecused = participants.find((par) => par.userId === user?.id && par.subscriptionStatus === "rejected");

  if (activity?.private && isPending) return <ParticipationStatusButton status="pending" />;

  if (activity?.private && isRecused) return <ParticipationStatusButton status="rejected" />;

  if (isParticipant && new Date(activity?.scheduleDate).getTime() > new Date().getTime()) {
    return <ActivityCountDownButton activity={activity} />;
  }

  if (
    isParticipant &&
    new Date(activity?.scheduleDate).getTime() < new Date().getTime() &&
    !activity.completedAt &&
    !participants.find((par) => par.userId === user?.id && par.confirmedAt)
  ) {
    return <ActivityChekinButton onClickFunc={onClik.checkInActivity} />;
  }

  if (!isParticipant && new Date(activity?.scheduleDate).getTime() < new Date().getTime()) {
    return <AtivityStatusButton acStatus="inProgress" />;
  }
  if (isParticipant && participants.find((par) => par.userId === user?.id && par.confirmedAt)) {
    return <AtivityStatusButton acStatus="inProgress" />;
  }

  if (new Date(activity?.scheduleDate).getTime() > new Date().getTime() && activity.completedAt) {
    return <AtivityStatusButton acStatus="conclude" />;
  }

  if (isParticipant && new Date(activity?.scheduleDate).getTime() > new Date().getTime())
    return <CancelParticipationButton onClickFunc={onClik.unsubscribeActivity} />;

  return <ParticipationButton onClickFunc={onClik.subscribeActivity} />;
};
