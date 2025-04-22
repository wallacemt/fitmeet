import { RecomendedCard } from "@/components/utils/RecomendedCard/RecomendedCard";
import { HomeContainer } from "@/components/Home/HomeContainer";
import { ActivityIcon } from "@/components/utils/ActivityIcon/ActivityIcon";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ActivityCard } from "../utils/ActivityCard/ActivityCard";
import { ActivityResponse, ActivityType } from "@/types/ActivityData";
import { useActivities } from "@/hooks/useActivities";
import Aos from "aos";
import { EmptySection } from "../utils/EmptySection";
import { Link } from "react-router";

export const ActivityTypeComponent = ({ type }: any) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [recomendedType, setRecomendedType] = useState<ActivityResponse[]>();
  const [activityType, setActivityType] = useState<ActivityType[]>();
  const [hasMore, setHasMore] = useState(false);
  const useAct = useActivities();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    const getActivities = async () => {
      const response = await useAct.getActByType(type);
      console.log(response)
      setRecomendedType(response);
    };

    const getActivitiesTypes = async () => {
      const response = await useAct.getActivitiesTypes();

      setActivityType(response);
    };

    getActivitiesTypes();
    getActivities();
  }, []);
  return (
    <HomeContainer>
      <section className="w-full mt-8 flex flex-col ">
        <h2 className="text-3xl font-principal text-left font-medium mb-6 relative left-0 lg:left-[3.7rem]">
          Popular em {type}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:self-center lg:grid-cols-4 lg:w-fit gap-4">
          {Array.isArray(recomendedType) && recomendedType.length > 0 ? (
            recomendedType.map((item) => <RecomendedCard key={item.id} item={item} />)
          ) : (
            <div className="relative left-[2rem]">
              <EmptySection message={`Nenhuma Atividade do tipo ${type} encontrada`} />
            </div>
          )}
        </div>
      </section>

      <section className="w-fit flex flex-col">
        <div className="flex flex-col justify-center gap-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 w-full gap-4 relative left-[5rem] ">
            {Array.isArray(recomendedType) && recomendedType?.filter((item) => item.type === type).length > 0
              ? recomendedType?.map((item) => <ActivityCard key={item.id} item={item} />)
              : ""}
          </div>
          {Array.isArray(recomendedType) &&
            recomendedType?.filter((item) => item.type === type).length > 0 &&
            hasMore && (
              <Button className="bg-primaria hover:bg-green-700 font-secundaria font-bold text-sm w-fit h-12 self-center flex items-center justify-center cursor-pointer">
                Ver mais <ChevronDown />
              </Button>
            )}
        </div>
      </section>

      <section className="w-full mt-8 flex flex-col items-start gap-2">
        <h2 className="text-3xl font-principal font-medium mb-6 text-left  relative left-0 lg:left-[3.7rem]">
          Outros Tipos de Atividades
        </h2>
        <div className="flex gap-4 relative left-0 lg:left-[3.7rem] flex-wrap ">
          {Array.isArray(activityType) &&
            activityType
              ?.filter((item) => item.name !== type)
              .map((item) => (
                <Link to={`/activity/type/${item.name}`}>
                  <ActivityIcon type={item.name} typeImage={item.image} key={item.id} />
                </Link>
              ))}
        </div>
      </section>
    </HomeContainer>
  );
};
