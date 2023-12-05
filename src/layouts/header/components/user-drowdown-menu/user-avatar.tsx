import { useAuth } from "@/hooks/auth-hooks";

function UserAvatar() {
  const auth = useAuth();

  return (
    <span className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center capitalize text-lg">
      {auth?.email?.at(0)}
    </span>
  );
}

export default UserAvatar;
