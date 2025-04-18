import achv from "@/assets/images/Achiviments.svg";
import { UserLevelCarousel } from "../UserAchiviCarrousel";
import { Achievement } from "@/types/UserTypes";
export const UserLevelSection = ({
  level,
  currentXp,
  nextLevelXp,
  achievements,
  className,
}: {
  level: number | undefined;
  currentXp: number | undefined;
  nextLevelXp: number;
  achievements: Achievement[];
  className?: string;
}) => {
  const progressPercent = Math.min(
    ((currentXp || 0 / nextLevelXp) * 100) / 100
  );
  return (
    <section className={`w-full flex font-montserrat`}>
      <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div
          className={`w-full gap-8 max-w-md flex flex-col justify-between items-center  ${className}`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">Seu nível é</p>
              <p className="font-bold text-3xl ">{level}</p>
            </div>
            <img src={achv} alt="Achiviments" className="h-20" />
          </div>

          <div className={`w-full flex flex-col gap-2`}>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Pontos para o próximo nível
              </p>
              <p className="text-[1rem] font-bold">
                {currentXp}/{nextLevelXp} pts
              </p>
            </div>
            <div className="h-3 bg-[#D7D7D7] rounded-full  overflow-hidden">
              <div
                className="bg-gradient-to-l from-[#00BC7D] to-[#009966] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <UserLevelCarousel achievements={achievements} />
      </div>
    </section>
  );
};
