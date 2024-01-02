import useUser from "@/hooks/useUser";

function UserAvatar() {
  const { data: user } = useUser();

  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-gray-300 text-lg capitalize text-white">
      {user?.name?.at(0)}
    </span>
  );
}

export default UserAvatar;
