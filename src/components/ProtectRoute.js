import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectRoute() {
  const userDetails = useSelector((state) => state.user.userDetails);

  return userDetails ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default ProtectRoute;
