import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/auth/auth.store";

interface Props {
  isAllowed: boolean;
}
export default function ProtectedRoute({ isAllowed }: Props) {
  useEffect(() => {}, [isAllowed]);
  if (!isAllowed) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
