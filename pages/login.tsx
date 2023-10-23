import FromAuth from "@/components/FromAuth";
import VocabList from "@/components/VocabList";
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
      <VocabList />
      <FromAuth />
    </div>
  );
}
