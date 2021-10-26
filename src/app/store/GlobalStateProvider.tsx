import React from "react";
import useGlobalState from "./useGlobalState";
import Context from "./context";

type GlobalStateProviderProps = {
  children: React.ReactNode,
};

function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  );
}

export default GlobalStateProvider;
