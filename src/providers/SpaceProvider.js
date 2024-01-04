import React, { createContext, useState , useEffect } from "react";
import axios from 'axios';
import Urls from "../constant/Urls";

const SpaceContext = createContext([]);
const SpaceDispatchContext = createContext([]);


function SpaceProvider({ children }) {
  const [spaceDetails, setspaceDetails] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${Urls.ServerUrl}/getSpaces`)
      .then(function (response) {
        setspaceDetails(response.data);

      })
      .catch(function (error) {
        console.log(error);
        // TODO
      });
  }, [spaceDetails]);

  return (
    <SpaceContext.Provider value={{spaceDetails , search}}>
      <SpaceDispatchContext.Provider value={{setspaceDetails , setSearch}}>
        {children}
      </SpaceDispatchContext.Provider>
    </SpaceContext.Provider>
  );
}

export { SpaceProvider, SpaceContext, SpaceDispatchContext };