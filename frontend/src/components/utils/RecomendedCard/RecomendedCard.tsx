import { Card, CardFooter, CardTitle } from "@/components/ui/card";

import { Calendar, LockIcon, User, Users } from "lucide-react";
import { useState } from "react";
import { ActivityParticipantModal } from "../../Modais/ActivityParticipantModal";
export const RecomendedCard = ({ item }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(item)
  return (
    <>
      <Card
        key={item.id}
        className="p-0 overflow-hidden w-full max-w-sm mx-auto gap-3 relative cursor-pointer hover:scale-105 ease-in-out duration-100"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={item.image?.replace("localStack", "localhost") ?? ""}
          alt="Recomended Image"
          className="w-full h-54 object-cover rounded-lg"
        />
        {item.private && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-[#00BC7D] to-[#009966] text-white px-2 py-2 rounded-full">
            <LockIcon size={20} />
          </div>
        )}

        <div className="flex flex-col items-start px-2  mb-8 font-secundaria">
          <CardTitle className="text-lg font-bold ">{item.title}</CardTitle>
          <CardFooter className="p-0 mt-2 text-xs text-muted-foreground gap-2">
            <span className="flex items-center gap-1 text-[#404040] font-medium">
              <Calendar className="w-4 h-4 text-primaria" />
              {new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(item.scheduleDate))}
            </span>
            |
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primaria" />
              {item.participantCount}
            </span>
          </CardFooter>
        </div>
      </Card>
      {modalOpen && <ActivityParticipantModal isOpen={modalOpen} onClose={setModalOpen} />}
    </>
  );
};
