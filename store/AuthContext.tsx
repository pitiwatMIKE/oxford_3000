import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface UserInfo {
  email: string | null;
}

const AuthContext = createContext<Partial<UserInfo>>({});

export default function AuthContextProvider({ children }: any) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
      setValue();
    } else {
      router.push("/login");
    }
  }, []);

  const [email, setEmail] = useState<string>("");
  const setValue = () => {
    if (session?.user?.email) setEmail(session.user.email);
  };

  const userInfo: UserInfo = {
    email,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}
