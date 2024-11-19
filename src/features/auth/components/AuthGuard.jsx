import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { ROUTE_CALENDAR_EVENTS } from "../../../stores/routes";

export default function AuthGuard({
  children,
  profile,
  technicalPersonOnly,
  visitorOnly,
  isAuthenticated,
}) {
  let location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTE_CALENDAR_EVENTS}
        state={{
          from: location,
          askLogIn: true,
          message: "Por favor, inicie sesión",
        }}
        replace
      />
    );
  }

  return children;
}
