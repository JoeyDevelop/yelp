import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

// Used to pass props to all components without having to do it for every one manually. Import to app.jsx
export const RestaurantsContextProvider = props => {
  const [restaurants, setRestaurants] =useState([])
  return (
    <RestaurantsContext.Provider value={[restaurants, setRestaurants]}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}