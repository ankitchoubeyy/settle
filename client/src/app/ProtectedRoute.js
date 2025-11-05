"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Only redirect WHEN we are sure user is logged out
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // While rehydrating, user === undefined, so show nothing (no redirect!)
  if (user === undefined) {
    return null; // or <Loading />
  }

  // After hydration, if null → not logged in → do not render protected content
  if (user === null) {
    return null;
  }

  return children;
}
