import { RecomendedCard } from "@/components/utils/RecomendedCard/RecomendedCard";
import { HomeContainer } from "../HomeContainer";
import { ActivityIcon } from "@/components/utils/ActivityIcon/ActivityIcon";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useActivities } from "@/hooks/useActivities";
import { ActivityResponse, ActivityType } from "@/types/ActivityData";
import { ActivityCard } from "@/components/utils/ActivityCard/ActivityCard";
import { EmptySection } from "@/components/utils/EmptySection";
import Aos from "aos";

export const HomeComponent = () => {
  const [recomendedActivities, setRecomendedActivites] = useState<ActivityResponse[]>();
  const [activityType, setActivityType] = useState<ActivityType[]>();
  const [_activities, setActivities] = useState<ActivityResponse[]>();
  const [activitiesByType, setActivitiesByType] = useState<Record<string, ActivityResponse[]>>({});

  const useAct = useActivities();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    const getActivitis = async () => {
      const response = await useAct.getActivities();
      setRecomendedActivites(response?.activities);
    };

    const getActivitiesTypes = async () => {
      const types = await useAct.getActivitiesTypes();
      setActivityType(types);

      const result: Record<string, ActivityResponse[]> = {};

      for (const type of types ?? []) {
        const response = await useAct.getActByType(type.name);
        result[type.name] = response?.filter((res) => res.isSelf !== true) ?? [];
      }
      setActivitiesByType(result);
    };

    const getAllActivities = async () => {
      const response = await useAct.getAllAct();
      setActivities(response);
    };

    getActivitis();
    getAllActivities();
    getActivitiesTypes();
  }, []);

  return (
    <HomeContainer>
      <section className="w-full mt-8 flex flex-col ">
        <h2 className="text-3xl font-principal text-left font-medium mb-6 relative left-0 lg:left-[3.7rem]">
          Recomendado Para Você
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:self-center lg:grid-cols-4 lg:w-fit gap-4"
          data-aos="fade-left"
        >
          {Array.isArray(recomendedActivities) && recomendedActivities.length > 0 ? (
            recomendedActivities
              .filter((item) => item.isSelf === false)
              .map((item) => <RecomendedCard key={item.id} item={item} />)
          ) : (
            <EmptySection message="Nehuma Atividade Recomendada Encontrada" />
          )}
        </div>
      </section>

      <section className="w-full mt-8 flex flex-col items-start gap-2">
        <h2 className="text-3xl font-principal font-medium mb-6 text-left  relative left-0 lg:left-[3.7rem]">
          Tipos de Atividades
        </h2>
        <div
          className="flex gap-4 w-fit relative left-0 lg:left-[3.7rem] flex-wrap justify-center lg:justify-start"
          data-aos="fade-up"
        >
          {activityType?.map((item) => (
            <Link to={`/activity/type/${item.name}`} key={item.id}>
              <ActivityIcon type={item.name} typeImage={item.image} />
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start w-full">
        {activityType?.map((typeItem) => {
          const activitiesForType = activitiesByType[typeItem.name] ?? [];

          return (
            <div className="flex gap-4 flex-wrap" key={typeItem.id} data-aos="fade-up">
              <div className="flex justify-between items-center w-full">
                <h2 className="font-principal font-normal text-[1.75rem]">{typeItem.name}</h2>
                {activitiesForType.length > 0 && (
                  <Link to={`/activity/type/${typeItem.name}`}>
                    <p className="font-secundaria text-[1rem] font-bold">Ver mais</p>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 w-full gap-4">
                {activitiesForType.length > 0 ? (
                  activitiesForType.map((activity) => <ActivityCard key={activity.id} item={activity} />)
                ) : (
                  <EmptySection message="Nenhuma Atividade Encontrada para esse Tipo." size={24} />
                )}
              </div>
            </div>
          );
        })}
      </section>
    </HomeContainer>
  );
};
