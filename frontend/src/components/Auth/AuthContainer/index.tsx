import { useEffect } from "react";
import banner from "../../../assets/images/banner.png";
import Aos from "aos";
import "aos/dist/aos.css";
export const AuthContainer = ({ children, className= "" }: { children: React.ReactNode, className:string }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000, 
      once: true,
      easing:"ease-in-out"
    });
  }, []);
  return (
    <div className={`${className} flex w-full h-screen`}>
      <div className="hidden xl:block w-[43rem] h-full p-2">
        <img src={banner} alt="Banner Lateral" className="h-full w-full object-cover rounded-sm" data-aos="fade-right" />
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
};

