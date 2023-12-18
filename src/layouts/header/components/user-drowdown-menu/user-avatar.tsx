import { useAuth } from "@/hooks/auth.hook";

function UserAvatar() {
  const auth = useAuth();

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-lg capitalize text-white">
      {auth?.email?.at(0)}
    </span>
  );
}

export default UserAvatar;
