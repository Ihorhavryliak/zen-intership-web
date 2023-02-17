import React from "react";
import { Header } from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Routers } from "./Routers";

import "./styles/main.css";

function App() {
  return (
    <main>
      <Header/>
      <div className="container position__relative overflow__hidden">
        <div className="row">
          <Routers />
        </div>
      </div>
    </main>
  );
}

export default App;
