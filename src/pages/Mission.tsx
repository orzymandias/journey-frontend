import React from "react";
import Workspace from "../Workspace";
import Editor from "../Workspace/Editor";
import REPL from "../Workspace/REPL";
import CompleteNavBar from "../NavBar/CompleteNavBar";
import NavBar2 from "../NavBar/NavBar2";

function Mission() {
  return (
    <>
      <NavBar2 />
      {/* <Workspace
        editor={<Editor preloadedProg={""} callBack={() => {}} />}
        repl={<REPL />}
        question={<Question />}
      /> */}
    </>
  );
}

export default Mission;
