import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, LockKeyhole, LockOpen, Pen, Users, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ActivityCreateModal } from "../ActivityCreateModal";
import { ViewLocationMap } from "@/components/utils/ViewLocationMap";
import { useActivities } from "@/hooks/useActivities";
import { Participant } from "@/types/ActivityData";
import { UserContext } from "@/contexts/UserContext";

export const ActivityOwnerModal = ({ isOpen, onClose, activity }: any) => {
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [participants, setParticipants] = useState<Participant[] | undefined>();
  const { user } = useContext(UserContext);
  const useAct = useActivities();

  useEffect(() => {
    const getAcParticipants = async () => {
      const response = await useAct.getActivityParticipants(activity.id);
      console.log(response);
      setParticipants(response);
    };

    getAcParticipants();
  }, []);

  console.log(activity);
  return (
    <>
      {isModalEdit && (
        <ActivityCreateModal openModal={isModalEdit} setOpenModal={setIsModalEdit} modalType={modalType} />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          closeIcon={false}
          className={`flex flex-col  font-secundaria w-full max-w-4xl sm:max-w-[50rem] sm:h-[49.125rem] h-full overflow-auto `}
        >
          <div className="w-full lg:grid flex flex-col grid-cols-1 lg:grid-cols-2 gap-6 p-2">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6">
              {/* IMAGEM */}
              <div>
                <div className="w-full h-full rounded-md p-1 flex items-center justify-center">
                  <img src={activity?.image} alt="Pré-visualização" className="w-full object-contain rounded-md" />
                </div>
              </div>

              {/* TÍTULO */}
              <div>
                <h2 className="font-principal	font-normal text-3xl ">Título</h2>
                <p className="text-base">{activity.title}</p>
              </div>

              {/* DESCRIÇÃO */}
              <div className="">
                <h2 className="text-lg font-semibold">Descrição</h2>
                <p className="text-base text-justify">{activity.description}</p>
              </div>

              {/* DADOS */}
              <div className="space-y-2 font-secundaria text-[#404040] text-base font-normal ">
                <p className="flex items-center gap-2">
                  <CalendarDays size={22} className="text-primaria" />{" "}
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(activity.scheduleDate))}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={22} className="text-primaria" /> {participants?.length} Participantes
                </p>
                <p className="flex items-center gap-2">
                  {activity.private ? (
                    <>
                      <LockOpen size={22} className="text-primaria" /> Atividade Pública
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={22} className="text-primaria" /> Mediante aprovação
                    </>
                  )}
                </p>
              </div>
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

            {/* COLUNA DIREITA */}
            <div className="space-y-6 max-h-48">
              {/* MAPA */}
              <div>
                <h2 className="text-[1.75rem] font-normal font-principal">Ponto de Encontro</h2>
                <div className="w-full h-60 rounded-md overflow-hidden border border-input">
                  <ViewLocationMap location={[activity.address.latitude, activity.address.longitude]} />
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
