import React, { useContext, useState } from "react";

const QueryContext = React.createContext()
const QueryContextUpdate = React.createContext()

export const useQState = () =>{
    return useContext(QueryContext)
}

export const useQStateUpdt = () =>{
    return useContext(QueryContextUpdate)
}

export const QueryStateProvider = ({ children }) => {
    const [queryState, setQueryState] = useState();
    
    return(
        <QueryContext.Provider value={ queryState }>
            <QueryContextUpdate.Provider value={setQueryState}>
                { children }
            </QueryContextUpdate.Provider>
        </QueryContext.Provider>
    );
}