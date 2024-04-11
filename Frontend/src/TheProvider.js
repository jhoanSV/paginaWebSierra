import React, { useState, createContext, useContext } from "react";

const TheContext = createContext();

export const useTheContext = () => {
    return useContext(TheContext);
};

export const TheProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [queryEnded, setQueryEnded] = useState();
    const [sBText, setSBText] = useState('');
    const [categSelect, setCategSelect] = useState('');
    const [nItemsCart, setNItemsCart] = useState(0);
  
    return (
      <TheContext.Provider value={{
          queryEnded, setQueryEnded,
          sBText, setSBText,
          categSelect, setCategSelect,
          logged, setLogged,
          nItemsCart, setNItemsCart,
          loading, setLoading
        }}>
        {children}
      </TheContext.Provider>
    );
  };