import React from "react";
import { Outlet } from "react-router-dom";

const DirectorLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DirectorLayout;
