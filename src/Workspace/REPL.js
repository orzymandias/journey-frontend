import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Runner from "../library_function/Runner";

const style = {
  height: 305
};

function REPL(props) {
  const code = props.editorInput;
  const runState = props.runState;
  const [finishRun, setFinishRun] = React.useState(false);
  const callBackFromRunner = () => {
    setFinishRun(true);
  };
  return (
    <div>
      <Paper style={style}>
        {runState && <Runner callBack={callBackFromRunner} code={code} />}
      </Paper>
      <IconButton onClick={props.callBack}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PlayArrowIcon />}
        >
          RUN
        </Button>
      </IconButton>
      <IconButton>
        <Button variant="outlined" color="primary">
          ENV
        </Button>
      </IconButton>
      <IconButton>
        <Button variant="outlined">Substituter</Button>
      </IconButton>
    </div>
  );
}

export default REPL;
