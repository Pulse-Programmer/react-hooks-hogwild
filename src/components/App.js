import React from "react";
import Nav from "./Nav";
import Dashboard from "./Dashboard";

import hogs from "../porkers_data";

function App() {
  return (
    <div className="App">
      <Nav />
      <Dashboard hogs={hogs} />
    </div>
  );
}

export default App;
