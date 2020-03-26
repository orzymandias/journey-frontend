import React, { useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";
import { IGlobalAction, Store } from "../Store";

export interface IEditorProps {
  preloadedProg: string;
  callBack: (newCode: string) => void;
  
}

function Editor(props: IEditorProps) {
  const { globalState, dispatch } = useContext(Store);
  function onChangeMethod(newCode: string) {
    return dispatch({
      type: "UPDATE_EDITOR_VALUE",
      playgroundEditorValue: newCode
    });
  }

  return (
    <AceEditor
      className="react-ace"
      mode="javascript"
      theme="tomorrow"
      height="90vh"
      width="inherit"
      fontSize="17"
      value={globalState.playgroundEditorValue}
      tabSize={4}
      onChange={onChangeMethod}
      style={{ zIndex: 0 }}
    />
  );
}

export default Editor;
