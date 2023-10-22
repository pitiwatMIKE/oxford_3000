import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function login() {
  const { data: session, status } = useSession();
  const [loadingLogin, setLaodingLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  const handlerLogin = () => {
    setLaodingLogin(true);
    signIn("credentials", {
      email: "pitiwat@gmail.com",
      password: "1234",
    }).finally(() => setLaodingLogin(false));
  };

  if (loadingLogin) {
    return <Loading />;
  }

  return (
    <div>
      <h1>login</h1>
      <button onClick={() => handlerLogin()}>sign in</button>
    </div>
  );
}
