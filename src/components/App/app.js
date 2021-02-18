import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Header/header";
import Music from "../Music/music";
import Footer from "../Footer/footer";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Music />
        <Footer />
      </>
    );
  }
}

export default App;
