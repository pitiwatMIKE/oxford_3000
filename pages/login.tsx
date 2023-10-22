import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  });

  return (
    <div>
      <h1>login</h1>
      <button
        onClick={() =>
          signIn("credentials", {
            email: "pitiwat@gmail.com",
            password: "1234",
          })
        }
      >
        sign in
      </button>
    </div>
  );
}
