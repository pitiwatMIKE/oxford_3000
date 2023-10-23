import { RiLogoutBoxRLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

export default function ButtonSignOut() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div
      className="w-10 h-10 text-2xl bg-custom-btn text-custom-text hover:bg-custom-secondary rounded-full 
    cursor-pointer shadow-md fixed top-5 right-5 flex justify-center items-center"
      onClick={() => signOut()}
    >
      <RiLogoutBoxRLine />
    </div>
  );
}
