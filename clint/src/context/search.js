import { useState, useContext, createContext } from "react";


const SearchContext = createContext() 

const SearchProvider = ({ children }) => { // Changed from {Children} to {children}
    const [auth, setSearch] = useState({
        Keyword :"",
        result : []
    });



   
    
    return (
        <SearchContext.Provider value={[auth, setSearch]}>
            {children} 
        </SearchContext.Provider>
    );
};


//custon hook

const useSearch = () => useContext(SearchContext)

export {useSearch,SearchProvider};