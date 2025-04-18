import { useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Achievement } from "@/types/UserTypes";
import achImg from "@/assets/images/Achiviment5.svg";
import { EmptySection } from "@/components/utils/EmptySection";

export const UserLevelCarousel = ({ achievements }: { achievements: Achievement[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const slidesPerView = 3;
  const totalSlides = Math.ceil(achievements.length / slidesPerView);
  const [currentSlide, setCurrentSlide] = useState(Math.min(0, totalSlides - 1));

  return (
    <div className={`flex flex-col h-full rounded-md gap-4 w-96 relative bg-[#F5F5F5]`}>
      <Carousel>
        <CarouselContent ref={carouselRef} className="flex gap-2 p-7 scroll-smooth" style={{ userSelect: "none" }}>
          {achievements.length > 0
            ? (achievements.map((ach, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 basis-1/3 shrink-0"
                  onClick={() => {
                    const slideIndex = Math.floor(index / slidesPerView);
                    setCurrentSlide(slideIndex);
                  }}
                >
                  <div className="h-25 w-24 p-5 bg-[#ECECEC] rounded-full ">
                    <img src={achImg} alt="Conquista" className="h-full w-full object-cover" />
                  </div>
                  <p className="text-center text-xs font-secundaria font-light">{ach.criterion}</p>
                </CarouselItem>
              ))
            ): (
            <div className="self-center mx-auto">
              <EmptySection message="Nehuma conquista desblonqueda." size={32}/>
            </div> 
          )
            }
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2 mt-1 absolute bottom-2 left-1/2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-black scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
