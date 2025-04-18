import empty from "@/assets/images/empty.svg";
export const EmptySection = ({ message, size = 52 }: { message: string; size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src={empty} alt="Empty Ilustration" className={`w-${size}`} />
        <p className="text-center">{message} </p>
      </div>
    </div>
  );
};
