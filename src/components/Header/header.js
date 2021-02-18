import React from "react";

const Header = (props) => {
  return (
    <header className="p-4 p-md-5 mb-4 text-white bg-dark">
      <div className="col-md-6 px-0">
        <h1 className="display-4 fst-italic">Music Library</h1>
        <p className="lead my-3">For your listening pleasure.</p>
      </div>
    </header>
  );
};

export default Header;
