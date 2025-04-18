import logo from "@/assets/images/Logo.svg";
import { ActivityCreateModal } from "@/components/Modais/ActivityOwner/ActivityCreateModal";
import { PreferencesModal } from "@/components/Modais/PreferencesModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { useActivities } from "@/hooks/useActivities";
import { ActivityType } from "@/types/ActivityData";
import { CirclePlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
export const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const useAct = useActivities();

  const [openNewActivityModal, setOpenNewActivityModal] = useState(false);
  const [userPreferences, setUserPreferences] = useState<ActivityType[]>();
  useEffect(() => {
    const getUserPreferences = async () => {
      const response = await useAct.getUserPreference();
      setUserPreferences(response);
    };
    getUserPreferences();
  }, []);
  return (
    <div className="flex flex-col items-center  justify-center gap-4 p-4 lg:pt-6 lg:pr-27 lg:pl-27">
      <header className="flex items-center justify-between w-full">
        <Link to={"/"}>
          <img src={logo} alt="Logo FitMeet" className="w-32 h-20" />
        </Link>
        <div className="flex justify-between items-center w-ull gap-4">
          <Button
            onClick={() => setOpenNewActivityModal(true)}
            className="bg-primaria hover:bg-green-600 cursor-pointer transition-colors w-40 p-6 rounded-md text-sm font-bold"
          >
            <CirclePlus /> Criar Atividade
          </Button>

          <Link to={"/profile"}>
            <Avatar level={user?.level}>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>
      {children}
      {userPreferences && userPreferences?.length <= 0 && <PreferencesModal />}

      <ActivityCreateModal setOpenModal={setOpenNewActivityModal} openModal={openNewActivityModal} />
    </div>
  );
};
