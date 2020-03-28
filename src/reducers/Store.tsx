import React from "react";
import { createContext } from "react";
import { ICollabEditorProps } from "../Workspace/Editor";
import {
  CHANGE_LANGUAGE, 
  CHANGE_SOURCE, 
  CHANGE_LIBRARY, 
  UPDATE_EDITOR_VALUE, 
  INIT_INVITE, 
  FINISH_INVITE, 
  SET_EDITOR_SESSION_ID,
  SET_WEBSOCKET_STATUS
} from './actionTypes';

const defaultSource: string = "Source";
const defaultLanguage: string = "Language";
const defaultLibaray: string = "Library";
const defaultEditorValue: string = "// Type your program in here\n\n";

export interface IGlobalState {
  source: string | undefined;
  library: string | undefined;
  language: string | undefined;
  playgroundEditorValue: string | undefined;
  CollabEditorState: ICollabEditorProps;
}

// Action Interfaces
export interface IGlobalAction {
  type: String;
  source?: string;
  library?: string;
  language?: string;
  playgroundEditorValue?: string;
}

export interface ICollabAction {
  type: string;
  playgroundEditorValue: string;
  editorSessionId: string;
  websocketStatus: number;
}



// State Interfaces
export const CollabEditorState: ICollabEditorProps = {
  editorSessionId: '',
  sharedbAceInitValue: '',
  sharedbAceIsInviting: false,
  websocketStatus: 0,
};

const initialState: IGlobalState = {
  source: defaultSource,
  library: defaultLibaray,
  language: defaultLanguage,
  playgroundEditorValue: defaultEditorValue,
  CollabEditorState: CollabEditorState
};



export const Store = createContext<IGlobalState | any>(initialState);


// Reducers
function reducer(
  globalState: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case CHANGE_SOURCE:
      return {
        ...globalState,
        source: action.source
      };
    case CHANGE_LIBRARY:
      return {
        ...globalState,
        library: action.library
      };
    case CHANGE_LANGUAGE:
      return {
        ...globalState,
        language: action.language
      };
    case UPDATE_EDITOR_VALUE:
      console.log(globalState.playgroundEditorValue);
      return {
        ...globalState,
        playgroundEditorValue: action.playgroundEditorValue
      };
    default:
      throw new Error();
  }
}


const CollabReducer = (
  globalState: IGlobalState,
  action: ICollabAction
): IGlobalState => {
  switch (action.type) {
    case INIT_INVITE:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          sharedbAceInitValue: action.playgroundEditorValue,
          sharedbAceIsInviting: true
        }
      };
    case FINISH_INVITE:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          sharedbAceIsInviting: false
        }
      };
    case SET_EDITOR_SESSION_ID:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          editorSessionId: action.editorSessionId
        }
      };
    
      case SET_WEBSOCKET_STATUS:
        return {
          ...globalState,
          CollabEditorState: {
            ...globalState.CollabEditorState,
            websocketStatus: action.websocketStatus
          }
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
