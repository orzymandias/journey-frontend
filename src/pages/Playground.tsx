import React, { useEffect, useContext } from "react";
import Workspace from "../Workspace";
import Editor from "../Workspace/Editor";
import Description from "../Workspace/Description/index";
import CompleteNavBar from "../NavBar/CompleteNavBar";
import { saveState } from "../reducers/localStorage";
import { Store } from "../reducers/Store";
import Repl from "./../Workspace/Repl2";

const Playground: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);
  useEffect(() => {
    saveState(globalState);
  });

  const editorProps = {
    preloadedProg: "",
    callBack: () => {},
    editorSessionId: "",
    handleEditorValueChange: () => {}
  }

  return (
    <div>
      <CompleteNavBar />
      <Workspace
        editor={<Editor {...editorProps} />}
        repl={<Description />}
        question={<div></div>}
      />
    </div>
  );
};

export default Playground;
