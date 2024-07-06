"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

interface IPageLayout {
  children: ReactNode;
}

export const PageLayout = ({ children }: IPageLayout) => {
  const pathname = usePathname();

  // if (pathname === "/sign-up" || pathname === "/email-verification")
  //   return (
  //     <>
  //       <AuthHeader />

  //       {children}
  //     </>
  //   );

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify-code" ||
    pathname === "/forgot-password" ||
    pathname === "/otp-verification" ||
    pathname === "/reset-password" ||
    pathname === "/home"
  )
    return children;

  return (
    <ProtectedRoute>
      <>{children}</>
    </ProtectedRoute>
  );
};
