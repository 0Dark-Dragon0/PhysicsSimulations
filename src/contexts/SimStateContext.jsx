import React, { createContext, useState, useContext } from 'react';

const SimStateContext = createContext();

export const useSimState = () => useContext(SimStateContext);

export const SimStateProvider = ({ children }) => {
  const [simState, setSimState] = useState({});

  return (
    <SimStateContext.Provider value={{ simState, setSimState }}>
      {children}
    </SimStateContext.Provider>
  );
};
