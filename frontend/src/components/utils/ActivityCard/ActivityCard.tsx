import { ActivityOwnerModal } from "@/components/Modais/ActivityOwner/ActivityOwnerModal";
import { ActivityParticipantModal } from "@/components/Modais/ActivityParticipantModal";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";

import { Calendar, LockIcon, Users } from "lucide-react";
import { useState } from "react";

export const ActivityCard = ({ item, modalType = "visitant" }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card
        className="flex flex-row w-full mx-auto p-2 items-start gap-2 relative hover:shadow-lg hover:shadow-black/20 hover:scale-105 ease-in-out duration-400 cursor-pointer shadow-none border-none"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative">
          <img
            src={item.image ? item.image?.replace("localStack", "localhost") ?? "" : ""}
            alt="Activity Image"
            className="w-30 h-22 object-cover rounded-lg"
          />
          {item.private && (
            <div className="absolute top-1 left-1 bg-gradient-to-r from-[#00BC7D] to-[#009966]  text-white p-1 rounded-full">
              <LockIcon size={16} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between font-secundaria w-full">
          <CardTitle className="text-base font-bold">{item.title}</CardTitle>
          <CardFooter className="p-0 mt-2 text-xs text-muted-foreground gap-2 flex flex-wrap absolute bottom-4  ">
            <span className="flex items-center">
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

      {modalOpen && modalType === "user" ? (
        <ActivityOwnerModal activityId={item.id} isOpen={modalOpen} onClose={setModalOpen} />
      ) : (
        <ActivityParticipantModal isOpen={modalOpen} onClose={setModalOpen} activityId={item.id} />
      )}
    </>
  );
};
