import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BadgeCheck, CalendarDays, LockKeyhole, LockOpen, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ViewLocationMap } from "@/components/utils/ViewLocationMap";
import { useActivities } from "@/hooks/useActivities";
import { ActivityResponse, Participant } from "@/types/ActivityData";
import { UserContext } from "@/contexts/UserContext";
import { ActivityButtonFactory } from "@/components/ActivityButtons";

export const ActivityParticipantModal = ({ isOpen, onClose, activityId }: any) => {
  const [participants, setParticipants] = useState<Participant[] | undefined>();
  const [activity, setActivity] = useState<ActivityResponse | undefined>();
  const { handleUpdate, update, user } = useContext(UserContext);
  const useAct = useActivities();

  useEffect(() => {
    const getAcParticipants = async () => {
      const response = await useAct.getActivityParticipants(activityId);
      setParticipants(response);
    };

    const fetchActivity = async () => {
      const response = await useAct.getActById(activityId);
      setActivity(response);
    };

    fetchActivity();

    getAcParticipants();
  }, [update]);
  const hadnleSubscribeActivity = () => {
    useAct.subscribeActivity(activityId).then(() => {
      handleUpdate();
    });
  };

  const handleUnsubscribeActivity = () => {
    useAct.unsubscribeActivity(activityId).then(() => {
      handleUpdate();
    });
  };

  const handleChekInActivity = (code: string) => {
    useAct.checkInActivity(code, activityId).then(() => {
      handleUpdate();
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          closeIcon={false}
          className={`flex flex-col  font-secundaria w-full max-w-4xl sm:max-w-[50rem] sm:h-[49.125rem] h-full overflow-auto `}
        >
          <div className="w-full lg:grid flex flex-col grid-cols-1 lg:grid-cols-2 gap-6 p-2">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="w-full h-full rounded-md p-1 flex items-center justify-center">
                    <img src={activity?.image} alt="Pré-visualização" className="max-h-80 rounded-md" />
                  </div>
                </div>
                <div>
                  <h2 className="font-principal	font-normal text-3xl ">{activity?.title}</h2>
                </div>
                <div className="">
                  <p className="text-base text-justify font-secundaria">{activity?.description}</p>
                </div>
              </div>

              {/* DADOS */}
              <div className="space-y-2 font-secundaria text-[#404040] text-base font-normal ">
                <p className="flex items-center gap-2">
                  <CalendarDays size={22} className="text-primaria" />
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(activity?.scheduleDate || new Date()))}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={22} className="text-primaria" /> {activity?.participantCount} Participantes
                </p>
                <p className="flex items-center gap-2">
                  {activity?.private ? (
                    <>
                      <LockKeyhole size={22} className="text-primaria" /> Mediante aprovação
                    </>
                  ) : (
                    <>
                      <LockOpen size={22} className="text-primaria" /> Atividade Pública
                    </>
                  )}
                </p>
              </div>
              <ActivityButtonFactory
                activity={activity!}
                participants={participants || []}
                user={user}
                onClik={{
                  subscribeActivity: hadnleSubscribeActivity,
                  unsubscribeActivity: handleUnsubscribeActivity,
                  checkInActivity: handleChekInActivity,
                }}
              />
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-6 max-h-48">
              {/* MAPA */}
              <div>
                <h2 className="text-[1.75rem] font-normal font-principal">Ponto de Encontro</h2>
                <div className="w-full h-60 rounded-md overflow-hidden border border-input">
                  {activity?.address?.latitude && activity?.address?.longitude && (
                    <ViewLocationMap location={[activity.address.latitude, activity.address.longitude]} />
                  )}
                </div>
              </div>

              {/* PARTICIPANTES */}
              <div>
                <h2 className="text-[1.75rem] font-normal font-principal">Participantes</h2>
                <div className="flex flex-col overflow-y-auto gap-4 p-2 rounded-md max-h-[22.2rem]">
                  <div className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-3 min-w-[260px]">
                    <div className="w-14 h-14 border-2 border-primaria rounded-full">
                      <img
                        src={activity?.creator?.avatar}
                        alt={activity?.creator?.name}
                        className="h-full w-full font-secundaria rounded-full object-cover border"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[1rem]  font-medium text-[#404040] flex gap-2">
                        {activity?.creator?.name}
                        {new Date(activity?.scheduleDate!).getTime() < new Date().getTime() && <BadgeCheck className="text-primaria"/>}
                      </p>
                      <span className="text-sm font-secundaria">Organizador</span>
                    </div>
                  </div>
                  {participants
                    ?.filter((participant) => participant.approved)
                    .sort((a, b) => (a.user.name > b.user.name ? 1 : -1))
                    .map((participant, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-3 min-w-[260px]"
                      >
                        {/* Imagem */}
                        <div className="w-14 h-14 border-2 border-primaria rounded-full">
                          <img
                            src={participant?.user.avatar}
                            alt={participant?.user.name}
                            className="h-full w-full font-secundaria rounded-full object-cover border"
                          />
                        </div>

                        {/* Nome */}
                        <div className="flex-1">
                          <p className="text-[1rem]  font-medium text-[#404040] flex gap-2">
                            {user?.id === participant?.user.id ? "Eu" : participant?.user.name}
                            {participant.confirmedAt && <BadgeCheck className="text-primaria" />}
                          </p>
                          <span className="text-sm font-secundaria">
                            {participant?.approved ? "Participante" : "Pendente"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
