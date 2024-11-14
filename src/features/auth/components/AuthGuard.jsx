import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { ROUTE_CALENDAR_EVENTS } from "../../../stores/ROUTES";
import isAuthenticated from "../businessLogic/isAuthenticated";

export default function AuthGuard({
  children,
  profile,
  technicalPersonOnly,
  visitorOnly,
}) {
  let location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTE_CALENDAR_EVENTS} state={{ from: location }} replace />
    );
  }

  return children;
}
