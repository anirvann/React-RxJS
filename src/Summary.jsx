import React, { useState, useEffect } from "react";
import AppContext from "./context";

const Summary = (props) => {
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    const subscription = AppContext.subscribe(setAppState);

    return () => subscription.unsubscribe();
  }, []);

  if(!appState) return null;
  const { favouritesCount, totalSongs } = appState;

  return (
    <div className={"summary"}>
      <div>Total Songs: {totalSongs}</div>
      <div>Favourite Songs: {favouritesCount}</div>
    </div>
  );
};

export default Summary;
