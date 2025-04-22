import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { ActivityCard } from "../ActivityCard/ActivityCard";
import { ActivityResponse } from "@/types/ActivityData";
import { EmptySection } from "../EmptySection";

export const ActivitySection = ({
  activites,
  title,
  className,
  viewMore,
  isOwner,
  message = "Nenhum dado!",
}: {
  activites: ActivityResponse[];
  title: string;
  className: string;
  viewMore?: boolean;
  isOwner?: boolean;
  message?: string;
}) => {
  return (
    <section className={className}>
      <h2 className={`font-principal ${activites.length <= 0 && 'text-center'} font-normal text-[1.75rem]`}>{title}</h2>
      <div className="flex flex-col gap-4">
        <div className={`${activites.length > 0 ? "grid" : "flex"} grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 w-full gap-2`}>
          {activites.length > 0
            ? activites.map((item) => (
                <ActivityCard key={item.id} item={item} modalType={isOwner ? "user" : "visitant"} />
              ))
            : (
            <div className="">
              <EmptySection message={message} size={32}/>
            </div>
          )
            }
        </div>
        {viewMore && (
          <Button className="bg-primaria hover:bg-green-700 font-secundaria mt-4 font-bold text-sm w-fit h-12 self-center flex items-center justify-center cursor-pointer">
            Ver mais <ChevronDown />
          </Button>
        )}
      </div>
    </section>
  );
};
