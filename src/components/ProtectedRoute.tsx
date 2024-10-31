import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  if (user === null) {
    /* eslint-disable no-restricted-globals */
    const ok = confirm("로그인을 먼저 하셔야 합니다");
    /* eslint-disable no-restricted-globals */
    if (!ok) {
      return <Navigate to="/" />;
    }
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
