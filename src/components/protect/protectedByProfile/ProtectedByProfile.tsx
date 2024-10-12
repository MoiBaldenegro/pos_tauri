import { ReactComponentElement, ReactNode } from "react";
import { useAuthStore } from "../../../store/auth/auth.store";
import { Navigate } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children: ReactNode;
}
export default function ProtectedByProfile({ children, isAllowed }: Props) {
  if (!isAllowed) return <Navigate to="/"></Navigate>;
  return <div> </div>;
}
