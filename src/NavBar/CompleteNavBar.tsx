import React, { useState, useContext } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar/SideBar";
import { SideBarContext } from "./SideBarContext";

/**
 * Props
 */

interface completeNavBarProps {}

const CompleteNavBar: React.FC<completeNavBarProps> = completeNavBarProps => {
  //subscribe to the context
  const { state, dispatch } = useContext(SideBarContext);
  let sideBar;
  if (state.sideDrawerState) {
    sideBar = <SideBar />;
  }

  return (
    <div>
      <NavBar/>
      {sideBar}
    </div>
  );
};

export default CompleteNavBar;
