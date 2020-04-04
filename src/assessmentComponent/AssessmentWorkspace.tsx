import React from "react";
import Workspace from "../Workspace";
import Editor from "../Workspace/Editor";
import REPL from "../Workspace/REPL";
import NavBar2 from "../NavBar/NavBar2";
import {
  AssessmentCategories,
  AutogradingResult,
  IAssessment,
  IMCQQuestion,
  IProgrammingQuestion,
  IQuestion,
  ITestcase,
  Library,
  QuestionTypes
} from "../assessment/assessmentShape";

export type AssessmentWorkspaceProps =  OwnProps & StateProps;


export type StateProps = {
  assessment?: IAssessment;
  autogradingResults: AutogradingResult[];
  editorPrepend: string;
  editorValue: string | null;
  editorPostpend: string;
  editorTestcases: ITestcase[];
  editorHeight?: number;
  editorWidth: string;
  breakpoints: string[];
  highlightedLines: number[][];
  hasUnsavedChanges: boolean;
  isRunning: boolean;
  isDebugging: boolean;
  enableDebugging: boolean;
  replValue: string;
  sideContentHeight?: number;
  storedAssessmentId?: number;
  storedQuestionId?: number;
};

export type OwnProps = {
  assessmentId: number;
  questionId: number;
  notAttempted: boolean;
  closeDate: string;
};

class AssessmentWorkspace {
  render() {
    return (
      <>
        <NavBar2 seed={1} />
        {/* <Workspace
          editor={<Editor preloadedProg="" callBack={() => {}} />}
          repl={<REPL />}
<<<<<<< HEAD
          question={<Question />} */}
        />
=======
          question={<Question />} 
        />*/}
>>>>>>> 96988c5256c13efc8089857f73ed885c18ae6593
      </>
    );
  }
}

export default AssessmentWorkspace;
