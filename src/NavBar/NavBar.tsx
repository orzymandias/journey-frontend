import React, { useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DehazeIcon from "@material-ui/icons/Dehaze";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { SideBarContext, IAction } from "./SideBarContext";
import SourceDropDown from "./SourceDropDown";
import "./NavBar.css";

/**
 * States
 */

let sourceOptions: string[] = ["Source1", "Source2", "Source3", "Source4"];
let libraryOptions: string[] = [
  "NONE",
  "RUNES",
  "CURVES",
  "SOUNDS",
  "BINARYTREES",
  "PIX&FLIX",
  "MACHINELEARNING",
  "All"
];
let languageOptions: string[] = [
  "Source",
  "C++",
  "Java",
  "Typescript",
  "Javascript",
  "Python"
];

const NavBar: React.FC = () => {
  const { state, dispatch } = useContext(SideBarContext);
  const toggleButton = (): IAction =>
    dispatch({
      type: "BUTTON_PRESSED"
    });
    
  return (
    <div style={{ zIndex: 1 }}>
      <header className="navBar">
        <nav className="navBar_navigation">
          <div className="toggleButton">
            <IconButton onClick={toggleButton} edge="start">
              <DehazeIcon
                style={{
                  color: "white",
                  height: "45px",
                  alignSelf: "flex-start",
                  display: state.sideDrawerState ? "none" : "flex"
                }}
              />
              <ClearIcon
                style={{
                  color: "white",
                  height: "45px",
                  alignSelf: "flex-start",
                  display: state.sideDrawerState ? "flex" : "none"
                }}
              />
            </IconButton>
          </div>
          <div className="spacer" />
          <div>
            <img src="images/logo.png" className="navBar_logo" />
          </div>
          <div className="navBar_navigation-items">
            <ul>
              <li>
                <SourceDropDown
                  dropDownType="CHANGE_SOURCE"
                  options={sourceOptions}
                  sideBarString={"source"}
                />
              </li>
              {/* <li>
                <SourceDropDown
                  dropDownType="CHANGE_LIBRARY"
                  options={libraryOptions}
                  sideBarString={"library"}
                />
              </li>
              <li>
                <SourceDropDown
                  dropDownType="CHANGE_LANGUAGE"
                  options={languageOptions}
                  sideBarString={"language"}
                />
              </li> */}
              <li>
                <a href="/">TextBook</a>
              </li>
              <li>
                <a href="/">Run</a>
              </li>
              <li>
                <a href="/">Share</a>
              </li>
            </ul>
          </div>
          <div className="spacer2"></div>
          <div className="playButton">
            <IconButton>
              <PlayArrowIcon
                style={{
                  color: "white",
                  height: "45px"
                }}
              />
            </IconButton>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
