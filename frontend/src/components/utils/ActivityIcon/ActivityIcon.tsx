export const ActivityIcon = ({ type, className, typeImage= "" }: { type: string; className?: string, typeImage?: string }) => {
  return (
    <div className={"flex flex-col items-center h-fit w-fit gap-4 hover:scale-110 ease-in-out duration-200"}>
      <img
        src={typeImage}
        alt="Activity Image"
        className={"rounded-full h-[5.625rem] w-[5.625rem]   object-cover" + className}
      />
      <p className="font-secundaria font-semibold">{type}</p>
    </div>
  );
};
