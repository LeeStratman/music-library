import React from "react";
import "./app.css";
import Header from "../Header/header";
import MusicLibrary from "../MusicLibrary/musicLibrary";
import Footer from "../Footer/footer";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <MusicLibrary />
        <Footer />
      </>
    );
  }
}

export default App;
