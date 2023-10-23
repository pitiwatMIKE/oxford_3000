import FromAuth from "@/components/FromAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }

  return (
    <div>
      <h1 className="text-center mt-3 text-2xl font-bold">VOCAB OXFORD 3000</h1>
      <FromAuth />
    </div>
  );
}
