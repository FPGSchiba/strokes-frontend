import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storageLength = localStorage.length;
    setLoggedIn(storageLength > 0);
    setChecked(true);
  }, [location]);

  return (
    <>{checked ? <>{loggedIn ? <Outlet /> : <Navigate to="/login" />}</> : <CircularProgress />} </>
  );
};

export default PrivateRoute;
