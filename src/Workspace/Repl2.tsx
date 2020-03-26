import { parseError } from "js-slang";
import { stringify } from "js-slang/dist/interop";
import { SourceError } from "js-slang/dist/types";
import * as React from "react";

import CanvasOutput from "./CanvasOutput";
import ReplInput, { IReplInputProps } from "./ReplInput";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

/**
 * An output while the program is still being run in the interpreter. As a
 * result, there are no return values or SourceErrors yet. However, there could
 * have been calls to display (console.log) that need to be printed out.
 */
export type RunningOutput = {
  type: "running";
  consoleLogs: string[];
};

/**
 * An output which reflects the program which the user had entered. Not a true
 * Output from the interpreter, but simply there to let he user know what had
 * been entered.
 */
export type CodeOutput = {
  type: "code";
  value: string;
};

/**
 * An output which represents a program being run successfully, i.e. with a
 * return value at the end. A program can have either a return value, or errors,
 * but not both.
 */
export type ResultOutput = {
  type: "result";
  value: any;
  consoleLogs: string[];
  runtime?: number;
  isProgram?: boolean;
};

/**
 * An output which represents a program being run unsuccessfully, i.e. with
 * errors at the end. A program can have either a return value, or errors, but
 * not both.
 */
export type ErrorOutput = {
  type: "errors";
  errors: SourceError[];
  consoleLogs: string[];
};

export type InterpreterOutput =
  | RunningOutput
  | CodeOutput
  | ResultOutput
  | ErrorOutput;

export interface IReplProps {
  output: InterpreterOutput[];
  replValue: string;
  handleBrowseHistoryDown: () => void;
  handleBrowseHistoryUp: () => void;
  handleReplEval: () => void;
  handleReplValueChange: (newCode: string) => void;
  hidden?: boolean;
  usingSubst?: boolean;
}

export interface IOutputProps {
  output: InterpreterOutput;
  usingSubst?: boolean;
}

class Repl extends React.PureComponent<IReplProps, {}> {
  public constructor(props: IReplProps) {
    super(props);
  }

  public render() {
    const cards = this.props.output.map((slice, index) => (
      <Output
        output={slice}
        key={index}
        usingSubst={this.props.usingSubst || false}
      />
    ));
    const inputProps: IReplInputProps = this.props as IReplInputProps;
    return (
      <div>
        {cards}
        <ReplInput {...inputProps} />
      </div>
    );
  }
}

export const Output: React.SFC<IOutputProps> = (props: IOutputProps) => {
  switch (props.output.type) {
    case "code":
      return (
        <Card>
          <CardContent>{props.output.value}</CardContent>
        </Card>
      );
    case "running":
      return (
        <Card>
          <CardContent>{props.output.consoleLogs.join("\n")}</CardContent>
        </Card>
      );
    case "result":
      // We check if we are using Substituter, so we can process the REPL results properly
      if (props.usingSubst && props.output.value instanceof Array) {
        return (
          <Card>
            <CardContent>Check out the substituter tab!</CardContent>
          </Card>
        );
      } else if (props.output.consoleLogs.length === 0) {
        return (
          <Card>
            <CardContent>{renderResult(props.output.value)}</CardContent>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardContent>{props.output.consoleLogs.join("\n")}</CardContent>
            <CardContent>{renderResult(props.output.value)}</CardContent>
          </Card>
        );
      }
    case "errors":
      if (props.output.consoleLogs.length === 0) {
        return (
          <Card>
            <CardContent>{parseError(props.output.errors)}</CardContent>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardContent>{props.output.consoleLogs.join("\n")}</CardContent>
            <br />
            <CardContent>{parseError(props.output.errors)}</CardContent>
          </Card>
        );
      }
    default:
      return <Card>''</Card>;
  }
};

const renderResult = (value: any) => {
  /** A class which is the output of the show() function */
  const ShapeDrawn = (window as any).ShapeDrawn;
  if (typeof ShapeDrawn !== "undefined" && value instanceof ShapeDrawn) {
    return <CanvasOutput canvas={value.$canvas} />;
  } else {
    return stringify(value);
  }
};

/* Override handler, so does not trigger when focus is in editor */
const handlers = {
  goGreen: () => {}
};

export default Repl;
