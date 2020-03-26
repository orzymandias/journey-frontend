import React from "react";
import { createContext } from "react";

const defaultSource: string = "Source";
const defaultLanguage: string = "Language";
const defaultLibaray: string = "Library";
const defaultValue: string = "// Type your program in here\n\n";

export interface IGlobalState {
  source: string | undefined;
  library: string | undefined;
  language: string | undefined;
  playgroundEditorValue: string | undefined;
}

export interface IGlobalAction {
  type: String;
  source?: string;
  library?: string;
  language?: string;
  playgroundEditorValue?: string;
}

const initialState: IGlobalState = {
  source: defaultSource,
  library: defaultLibaray,
  language: defaultLanguage,
  playgroundEditorValue: defaultValue
};

export const Store = createContext<IGlobalState | any>(initialState);

function reducer(
  globalState: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case "CHANGE_SOURCE":
      return {
        ...globalState,
        source: action.source
      };
    case "CHANGE_LIBRARY":
      return {
        ...globalState,
        library: action.library
      };
    case "CHANGE_LANGUAGE":
      return {
        ...globalState,
        language: action.language
      };
    case "UPDATE_EDITOR_VALUE":
      console.log(globalState.playgroundEditorValue);
      return {
        ...globalState,
        playgroundEditorValue: action.playgroundEditorValue
      };
    default:
      throw new Error();
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
