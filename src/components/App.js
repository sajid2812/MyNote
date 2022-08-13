// ######## imports ########

import React from "react";
import Header from "./Header";
import Context from "../Global/Context";
import Body from "./Body";
import Footer from "./Footer";

// ######## component ########

function App() {
  return (
    <div className="container">
      <Context>
        <Header />
        <Body />
        <Footer />
      </Context>
    </div>
  );
}

export default App;
