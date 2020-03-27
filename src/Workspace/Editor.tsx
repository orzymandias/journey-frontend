import React, { useContext } from "react";
import sharedbAce from 'sharedb-ace';
import AceEditor from "react-ace";
import { LINKS } from '../utils/constants';
import { checkSessionIdExists } from './collabEditing/';

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";
import { IGlobalAction, Store } from "../Store";

export interface IEditorProps {
  preloadedProg: string;
  editorSessionId: string;
  sharedbAceInitValue?: string;
  sharedbAceIsInviting?: boolean;
  callBack: (newCode: string) => void;
  handleEditorValueChange: (newCode: string) => void;
  handleFinishInvite?: () => void;
  handleSetWebsocketStatus?: (websocketStatus: number) => void;
  handleUpdateHasUnsavedChanges?: (hasUnsavedChanges: boolean) => void
  
}

function Editor(props: IEditorProps) {
  const { globalState, dispatch } = useContext(Store);
  const aceEditor: React.RefObject<AceEditor> = React.createRef();;
  let ShareAce: any = null;

  const onChangeMethod = (newCode: string) => {
    return dispatch({
      type: "UPDATE_EDITOR_VALUE",
      playgroundEditorValue: newCode
    });
  }
  
  React.useEffect(() => {
      if (!aceEditor.current) {
        return;
      }
      const editor = (aceEditor.current as any).editor;
      const session = editor.getSession();
 
      // Has session ID
      if (props.editorSessionId !== '') {
        handleStartCollabEditing(editor);
      }
    }
  )

  React.useEffect(() => {
    if (ShareAce !== null) {
        // Umounting... Closing websocket
        ShareAce.WS.close();
    }
    ShareAce = null;
    }
  )

  const handleStartCollabEditing = (editor: any) => {
    const ShareAce = new sharedbAce(props.editorSessionId!, {
      WsUrl: 'wss://' + LINKS.SHAREDB_SERVER + 'ws/',
      pluginWsUrl: null,
      namespace: 'codepad'
    });
    ShareAce.on('ready', () => {
      ShareAce.add(
        editor,
        ['code'],
        [
          // SharedbAceRWControl,
          // SharedbAceMultipleCursors
        ]
      );
      if (props.sharedbAceIsInviting) {
        props.handleEditorValueChange(props.sharedbAceInitValue!);
        props.handleFinishInvite!();
      }
    });

    // WebSocket connection status detection logic
    const WS = ShareAce.WS;
    let interval: any;
    const sessionIdNotFound = () => {
      clearInterval(interval);
      WS.close();
    };
    const cannotReachServer = () => {
      WS.reconnect();
    };
    const checkStatus = () => {
      if (ShareAce === null) {
        return;
      }
      checkSessionIdExists(
        props.editorSessionId,
        () => {},
        sessionIdNotFound,
        cannotReachServer
      );
    };
    // Checks connection status every 5sec
    interval = setInterval(checkStatus, 5000);

    WS.addEventListener('open', (event: Event) => {
      props.handleSetWebsocketStatus!(1);
    });
    WS.addEventListener('close', (event: Event) => {
      props.handleSetWebsocketStatus!(0);
    });
  };

 
  
  return (
    <AceEditor
    ref={aceEditor}
    className="react-ace"
    editorProps={{
      $blockScrolling: Infinity
    }}
    fontSize={17}
    height="100%"
    highlightActiveLine={false}
    mode="javascript"
    onChange={onChangeMethod}
    theme="tomorrow"
    width="100%"
    setOptions={{
      fontFamily: "'Inconsolata', 'Consolas', monospace",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true
    }}
  />

  );

}

export default Editor;
