import React, { useEffect, useContext } from "react";
import Workspace from "../Workspace";
import Editor from "../Workspace/Editor";
import Description from "../Workspace/Description/index";
import CompleteNavBar from "../NavBar/CompleteNavBar";
import { saveState } from "./../localStorage";
import { Store } from "./../Store";
import Repl from "./../Workspace/Repl2";

const Playground: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);
  useEffect(() => {
    saveState(globalState);
  });
  return (
    <div>
      <CompleteNavBar />
      <Workspace
        editor={<Editor preloadedProg={""} callBack={() => {}} />}
        repl={<Description />}
        question={<div></div>}
      />
    </div>
  );
};

export default Playground;
