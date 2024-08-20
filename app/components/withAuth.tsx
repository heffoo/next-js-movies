"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface WithAuthProps {
  children: ReactNode;
}

export const WithAuth = ({ children }: WithAuthProps) => {
  const router = useRouter();
  const isAuth = true;

  if (isAuth) {
    return <>{children}</>;
  } else {
    router.replace("/auth");
  }
};
