import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";

export interface IEditorProps {
  preloadedProg: string;
  callBack: (newCode: string) => void;
  
}

function Editor(props: IEditorProps) {
  const [value, setValue] = React.useState(props.preloadedProg);

  function onChangeMethod(newCode: string) {
    props.callBack(newCode);
    setValue(newCode);
  }

  return (
    <AceEditor
      className="react-ace"
      mode="javascript"
      theme="tomorrow"
      height="100vh"
      width="inherit"
      fontSize="17"
      value={value}
      tabSize={4}
      onChange={onChangeMethod}
      style={{ zIndex: -1 }}
    />
  );
}

export default Editor;
