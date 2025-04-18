import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  level?: number;
};

function Avatar({ className, level, ...props }: AvatarProps) {
  return (
    <div className="relative flex flex-col items-center">
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex size-16 p-[0.1rem] shrink-0 overflow-hidden rounded-full border-4 border-primaria",
          className
        )}
        {...props}
      />
      {level !== undefined && (
        <div className="absolute -bottom-3 pt-[4px] pr-[10px] pb-[4px] pl-[10px] text-md rounded-2xl text-white font-semibold bg-gradient-to-r from-[#00BC7D] to-[#009966] shadow-md">
          {level}
        </div>
      )}
    </div>
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover rounded-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full text-sm text-white", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
