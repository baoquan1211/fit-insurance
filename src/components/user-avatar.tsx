import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ className }: { className?: string }) {
  const { data: user } = useUser();

  return (
    <Avatar>
      <AvatarImage src={user?.avatarUrl} />
      <AvatarFallback>
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-full bg-gray-300 text-lg capitalize text-white",
            className,
          )}
        >
          {user?.name?.at(0)}
        </span>
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
