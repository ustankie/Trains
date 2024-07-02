import React, { createContext, useContext, useState } from 'react';
const TextColorContext = createContext();

export const TextColorProvider = ({ children }) => {
  const [color, setColor] = useState('black'); 

  return (
    <TextColorContext.Provider value={{ color, setColor }}>
      {children}
    </TextColorContext.Provider>
  );
};

export const useTextColor = () => useContext(TextColorContext);
