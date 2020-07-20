import React from "react";
import "./App.css";
import Songs from "./Songs";
import Summary from "./Summary";

function App() {
  return (
    <div className={"container"}>
      <Summary />
      <Songs />
    </div>
  );
}

export default App;