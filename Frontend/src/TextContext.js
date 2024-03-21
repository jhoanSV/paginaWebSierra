import React, { useContext, useState } from "react";

const TextContext = React.createContext()
const TextContextUpdate = React.createContext()

export const useText = () =>{
    return useContext(TextContext)
}

export const useTextUpdate = () =>{
    return useContext(TextContextUpdate)
}

export const TextProvider = ({ children }) => {
    const [text, setText] = useState('');

    const addText = (theText) =>{
        setText(theText)
    }
    
    return(
        <TextContext.Provider value={text}>
            <TextContextUpdate.Provider value={addText}>
                { children }
            </TextContextUpdate.Provider>
        </TextContext.Provider>
    );
}