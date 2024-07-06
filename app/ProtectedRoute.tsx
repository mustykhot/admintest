import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

const idleTimeout = 300000;

interface IProtectedRoute {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleIdle = () => {
    // router.push("/sign-in");
    // localStorage.removeItem("token");
    // dispatch(logout());
  };

  // useIdleTimer({
  //   timeout: idleTimeout,
  //   onIdle: handleIdle,
  //   throttle: 500,
  // });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   token ? setIsLoading(false) : redirect("/sign-in");
  // });

  if (isLoading) return null;

  return children;
};
