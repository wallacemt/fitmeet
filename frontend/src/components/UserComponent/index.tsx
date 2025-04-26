import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { HomeContainer } from "../Home/HomeContainer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { UserLevelSection } from "./UserLevelSection";
import { ActivitySection } from "../utils/ActivitySection/ActivitySection";
import { Pencil } from "lucide-react";
import { Link } from "react-router";
import { useActivities } from "@/hooks/useActivities";
import { ActivityResponse } from "@/types/ActivityData";
import { Button } from "../ui/button";
export const UserComponent = () => {
  const { user, update, logout } = useContext(UserContext);
  const useAct = useActivities();
  const [userActivities, setUserActivities] = useState<ActivityResponse[]>();
  const [userActivitiesParticipant, setUserActivitiesParticipant] = useState<ActivityResponse[]>();

  useEffect(() => {
    const getUserActivitie = async () => {
      const response = await useAct.getUserActivitie();
      setUserActivities(response?.activities);
    };

    const getUserActivitieParticipant = async () => {
      const response = await useAct.getUserActivitieParticipant();
      setUserActivitiesParticipant(response?.activities);
    };
    getUserActivitie();
    getUserActivitieParticipant();
  }, [update]);

  return (
    <HomeContainer>
      <div className="w-full bg-[#f2f2f2] rounded-md relative p-12">
        <Link to={"/profile/edit"}>
          <div className="flex w-fit absolute top-4 right-4 items-center justify-center border border-[#A1A1A1] text-[#A1A1A1] p-2 rounded-md gap-2">
            <Pencil size={16} />
            <p>Editar Perfil</p>
          </div>
        </Link>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => logout()}
          className="absolute top-12 right-4 disabled:cursor-not-allowed text-base border border-perigo w-fit lg:w-30 p-4 mt-4 hover:bg-perigo/80 hover:text-white cursor-pointer flex items-center justify-center rounded-md mx-auto"
        >
          Sair
        </Button>

        <section className="w-full flex flex-col gap-4 items-center justify-center rounded-md">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="user image" className="w-52 h-52 rounded-full" />
            <AvatarFallback>WS</AvatarFallback>
          </Avatar>
          <h2 className="first-letter:uppercase font-principal font-normal text-4xl">{user?.name}</h2>
        </section>
        <UserLevelSection
          level={user?.level}
          currentXp={user?.xp}
          nextLevelXp={50}
          className="bg-[#F5F5F5] p-8 rounded-md"
          achievements={user?.achievements || []}
        />
      </div>

      <ActivitySection
        activites={userActivities || []}
        title="Minhas Atividades"
        className="w-fit flex flex-col mb-12 gap-4"
        isOwner={true}
        message="Nehuma atividade criada."
        viewMore={false}
      />

      <ActivitySection
        activites={userActivitiesParticipant || []}
        title="Historico De Atividades"
        cardMode="participant"
        className="w-full flex flex-col gap-2 mb-12"
        message="Você ainda não participou de nehuma atividade."
        viewMore={userActivitiesParticipant && userActivitiesParticipant?.length > 0}
      />
    </HomeContainer>
  );
};
