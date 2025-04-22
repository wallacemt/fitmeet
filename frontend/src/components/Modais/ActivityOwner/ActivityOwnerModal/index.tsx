import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, LockKeyhole, LockOpen, Pen, Trash2Icon, Users, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ActivityCreateModal } from "../ActivityCreateModal";
import { ViewLocationMap } from "@/components/utils/ViewLocationMap";
import { useActivities } from "@/hooks/useActivities";
import { ActivityResponse, Participant } from "@/types/ActivityData";
import { UserContext } from "@/contexts/UserContext";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export const ActivityOwnerModal = ({ isOpen, onClose, activityId }: any) => {
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [viewConfirm, setViewConfirm] = useState(false);
  const [participants, setParticipants] = useState<Participant[] | undefined>();
  const { user, handleUpdate, update } = useContext(UserContext);
  const useAct = useActivities();
  const [activity, setActivity] = useState<ActivityResponse | undefined>();
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
  }, [update, activityId]);

  const handleCancelActivity = () => {
    useAct.cancelAct(activityId).then(() => {
      onClose();
      setViewConfirm(false);
      handleUpdate();
    });
  };

  return (
    <>
      {isModalEdit && (
        <ActivityCreateModal
          openModal={isModalEdit}
          setOpenModal={setIsModalEdit}
          modalType={modalType}
          activity={activity}
        />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          closeIcon={false}
          className={`flex flex-col  font-secundaria w-full max-w-4xl sm:max-w-[50rem] sm:h-[49.125rem] h-full overflow-auto `}
        >
          <div className="w-full lg:grid flex flex-col grid-cols-1 lg:grid-cols-2 gap-6 p-2">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6 ">
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

              <div className="space-y-2 font-secundaria text-[#404040] text-base font-normal ">
                <p className="flex items-center gap-2">
                  <CalendarDays size={22} className="text-primaria" />{" "}
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(activity?.scheduleDate || new Date()))}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={22} className="text-primaria" /> {participants?.length} Participantes
                </p>
                <p className="flex items-center gap-2">
                  {activity?.private === true ? (
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
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="text-base font-bold bg-perigo hover:bg-perigo/80  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer relative top-3 lg:top-auto lg:mx-0 mx-auto lg:absolute bottom-[6rem]"
                  onClick={() => setViewConfirm(true)}
                >
                  <Trash2Icon />
                  Cancelar Atividade
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  className="text-base font-bold border border-[#171717] w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer relative top-3 lg:top-auto lg:mx-0 mx-auto lg:absolute bottom-6"
                  onClick={() => {
                    setModalType("edit");
                    setIsModalEdit(true);
                  }}
                >
                  <Pen />
                  Editar
                </Button>
              </div>
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
                        src={user?.avatar}
                        alt={user?.name}
                        className="h-full w-full font-secundaria rounded-full object-cover border"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[1rem]  font-medium text-[#404040]">{user?.name}</p>
                      <span className="text-sm font-secundaria">Organizador</span>
                    </div>
                  </div>
                  {participants?.map((participant, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-3 min-w-[260px]"
                    >
                      {/* Imagem */}
                      <div className="w-14 h-14 border-2 border-primaria rounded-full">
                        <img
                          src={participant?.avatar}
                          alt={participant.name}
                          className="h-full w-full font-secundaria rounded-full object-cover border"
                        />
                      </div>

                      {/* Nome */}
                      <div className="flex-1">
                        <p className="text-[1rem]  font-medium text-[#404040]">{participant.name}</p>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="cursor-pointer w-8 h-8 rounded-full bg-primaria hover:bg-primaria/90 text-white flex items-center justify-center"
                          title="Aprovar"
                        >
                          <Check />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer w-8 h-8 rounded-full bg-perigo hover:bg-perigo/90 text-white flex items-center justify-center"
                          title="Recusar"
                        >
                          <X />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {viewConfirm && (
              <Dialog open={viewConfirm} onOpenChange={setViewConfirm}>
                <DialogContent closeIcon={false} className="flex flex-col p-8 font-secundaria gap-9">
                  <DialogHeader>
                    <DialogTitle className="font-principal font-normal text-3xl text-[#171717]">
                      Tem certeza que deseja cancelar essa atividade!?
                    </DialogTitle>
                    <DialogDescription className="text-[#404040] text-[1rem]">
                      Ao cancelar uma atividade, você estará desativando a mesma e todos os participantes serão
                      notificados. Além disso, a atividade não estará mais visível para os usuários.
                      <span className="font-bold"> Esta ação é irreversível e não poderá ser desfeita.</span>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant={"ghost"}
                      onClick={() => setViewConfirm(false)}
                      className="border text-[1rem] p-6 font-bold border-[#171717] cursor-pointer"
                    >
                      Voltar
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleCancelActivity()}
                      className="p-6 text-[1rem] cursor-pointer"
                    >
                      Cancelar Atividade
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
