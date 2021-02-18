import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Music from "./MusicController/musicController";
import Footer from "./Footer/footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="p-4 p-md-5 mb-4 text-white bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">Music Library</h1>
            <p className="lead my-3">For your listening pleasure.</p>
          </div>
        </div>
        <Music />
        <Footer />
      </div>
    );
  }
}

export default App;
