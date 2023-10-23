import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { FcContacts, FcUnlock } from "react-icons/fc";
import Loading from "./Loading";

export default function FromAuth() {
  const router = useRouter();
  const [isTextSignIn, setIsTextSignIn] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderTextStateSign = (state: boolean) => {
    return state ? "Sign In" : "Sign Up";
  };

  const handlerSwapSign = () => {
    setIsTextSignIn(!isTextSignIn);

    if (!isTextSignIn) {
      toast("Sign In!", {
        icon: <FcUnlock />,
        duration: 1000,
      });
    } else {
      toast("Sign Up!", {
        icon: <FcContacts />,
        duration: 1000,
      });
    }
  };

  const handlerSignIn = async () => {
    setLoadingLogin(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        toast.success("Sign In Success");
        router.push("/");
      } else {
        res?.error ? toast.error(res.error) : toast.error("Sign In failed");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const handlerSignUp = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/user/register",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result = await res.json();
    if (res.ok) {
      setIsTextSignIn(true);
      toast.success("Sign Up Success");
      handlerSignIn();
    } else {
      result?.message
        ? toast.error(result.message)
        : toast.error("Sign Up Failed");
    }
  };

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isTextSignIn) {
      handlerSignIn();
    } else {
      handlerSignUp();
    }
  };

  if (loadingLogin) {
    return <Loading />;
  }

  return (
    <div className="w-full fixed bottom-10 flex justify-center">
      <div className="w-5/6 max-w-sm h-64 bg-custom-secondary rounded-md shadow-lg p-3">
        <div className="w-full flex justify-center">
          <h1 className="mb-2 text-center font-bold text-lg">OXFORD 3000</h1>
        </div>
        <form onSubmit={handlerSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              className="shadow appearance-none border bg-custom-bg  rounded w-full py-1 px-2 text-grey-darker"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 mt-2">
              Password
            </label>
            <input
              className="shadow appearance-none border bg-custom-bg rounded w-full py-1 px-2 text-grey-darker"
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            className="mt-2 shadow-md w-full py-2 text-white bg-custom-btn hover:bg-custom-text"
            type="submit"
          >
            {renderTextStateSign(isTextSignIn)}
          </button>

          <div className="flex justify-end">
            <div
              className=" text-sm mt-2 hover:text-blue-600 cursor-pointer"
              onClick={() => handlerSwapSign()}
            >
              {renderTextStateSign(!isTextSignIn)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
