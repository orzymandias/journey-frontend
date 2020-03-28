import { compressToUTF16, decompressFromUTF16 } from "lz-string";

import { IGlobalState } from "./Store";

export type ISavedState = {
  playgroundEditorValue: string | undefined;
};

export const loadStoredState = (): ISavedState | undefined => {
  try {
    const serializedState = localStorage.getItem("storedState");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(decompressFromUTF16(serializedState)) as ISavedState;
  } catch (err) {
    console.log("error");
    return undefined;
  }
};

export const saveState = (state: IGlobalState) => {
  try {
    const stateToBeSaved: ISavedState = {
      playgroundEditorValue: state.playgroundEditorValue
    };
    const serialized = compressToUTF16(JSON.stringify(stateToBeSaved));
    localStorage.setItem("storedState", serialized);
  } catch (err) {
    console.log("error");
  }
};
