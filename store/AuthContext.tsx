import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}
interface AuthValue {
  email: string;
  setLoadingLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValue>({
  email: "",
  setLoadingLogin: () => false,
});

export default function AuthContextProvider({ children }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (status === "loading" || loadingLogin) return;
    if (session) {
      router.push("/");
      setValue();
    } else {
      router.push("/login");
    }
  }, [status, loadingLogin]);

  const [email, setEmail] = useState<string>("");
  const setValue = () => {
    if (session?.user?.email) setEmail(session.user.email);
  };

  const authValue: AuthValue = {
    email,
    setLoadingLogin,
  };

  if (status === "loading" || loadingLogin) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
