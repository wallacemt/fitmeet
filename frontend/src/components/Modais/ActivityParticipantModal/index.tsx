import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, LockKeyhole, LockOpen, Users } from "lucide-react";
import { useState } from "react";
import { ViewLocationMap } from "@/components/utils/ViewLocationMap";

export const ActivityParticipantModal = ({ isOpen, onClose }: any) => {
  const activity = {
    title: "Exercises with Jumping Rope",
    description:
      "Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: "2023-07-01",
    image:
      "https://s3-alpha-sig.figma.com/img/751f/89e9/da95373f6eb2271dac57bcf9fb89f71f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kNfaVdNLPbT3FTmZ5V46QVaUMB29QfQigLssK5YwLNTifSfiwAHf-lId~bMcyTxNwR6hk0yzCgB9dao5aR31djbr0n8OFphLw1v2JmlIMs04paPqW1tPkFg1SsyiOtZAIlzLVX0lZOLaCGHsxMKLv7GaJOu4uqLkqLru9FCYoUG1CmsiK9VJ8~Sdzhl8Z0w0Qyv5rPfWGrFUHheOuETTJ7hV9XQSJZ03DnOuczcOQ6LQ16brWdAc1TgmY8iG1DlCld99Us-qNSqGnQ8ZFWGuqvD0Zj2bEEolQHDDXKq~eq1KZubA4c8iQLi4u-Ohl9a9Je0aobly8mqHzcBE45gA-Q__",
    location: ["-23.567", "-46.654"],
    isPublic: false,
    participants: [
      {
        name: "Participante 1",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
      {
        name: "Participante 2",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
      {
        name: "Participante 1",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
      {
        name: "Participante 2",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
      {
        name: "Participante 1",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
      {
        name: "Participante 2",
        image:
          "https://s3-alpha-sig.figma.com/img/7dda/efd6/56708e151040d2fe0b56f5aaacd2d320?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZtVLl-A5xCHmqxiLYPbyENW6kMkhT-aR0Tm3sfnX-EkMw6zNRhnDPSS~uXokqqANTb4lXPL4L8rwEu~BH8pqsVWnlD1U8G31bPpdrDSKJgkPiQte9K38MJ2jv5cDTKmyGS~-VKBbUFqmNP9a9b~oj3euS3uzLkpUghyxzOxhIDaTy4lXWqwrX54SwzmMWV32Wtkw4gFX5-funDBPCJsdqsEeUEs-ZHHLOyAK0TI4mIJPwJ58kL3s2bgFsNjeFeCkiwBNGneko4GNuFvWqLQ9J-5-pKcfmZta0w4~LmlFzsIB8Jd9ye-P75ReBc25f9uuYR5PznOfqbz6ByCYEI1QzQ__",
      },
    ],
  };

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");

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
              {/* IMAGEM */}
              <div>
                <div className="w-full h-full rounded-md p-1 flex items-center justify-center">
                  <img src={activity.image} alt="Pré-visualização" className="w-full object-contain rounded-md" />
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
                  <CalendarDays size={22} className="text-primaria" /> {activity.date}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={22} className="text-primaria" /> {activity.participants.length} Participantes
                </p>
                <p className="flex items-center gap-2">
                  {activity.isPublic ? (
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
                className="text-base font-bold  bg-primaria  w-full max-w-2xs p-6 h-12 mt-2 flex items-center justify-center rounded-md hover:scale-105 hover:bg-primaria transition duration-300 ease-in-out cursor-pointer relative lg:mx-0 mx-auto"
                onClick={() => {
                  setModalType("edit");
                  setIsModalEdit(true);
                }}
              >
                Participar
              </Button>
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-6 max-h-48">
              {/* MAPA */}
              <div>
                <h2 className="text-[1.75rem] font-normal font-principal">Ponto de Encontro</h2>
                <div className="w-full h-60 rounded-md overflow-hidden border border-input">
                  <ViewLocationMap location={[-23.549, -46.633]} />
                </div>
              </div>

              {/* PARTICIPANTES */}
              <div>
                <h2 className="text-[1.75rem] font-normal font-principal">Participantes</h2>
                <div className="flex flex-col overflow-y-auto gap-4 p-2 rounded-md max-h-[22.2rem]">
                  {activity.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-3 min-w-[260px]"
                    >
                      {/* Imagem */}
                      <div className="w-14 h-14 border-2 border-primaria rounded-full">
                        <img
                          src={participant.image}
                          alt={participant.name}
                          className="h-full w-full font-secundaria rounded-full object-cover border"
                        />
                      </div>

                      {/* Nome */}
                      <div className="flex-1">
                        <p className="text-[1rem]  font-medium text-[#404040]">{participant.name}</p>
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
