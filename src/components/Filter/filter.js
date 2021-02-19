import React from "react";

const Filter = (props) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">Filter</span>
      <select
        className="form-select form-select-lg"
        value={props.attribute}
        onChange={props.updateAttribute}
      >
        <option value="">Select an attribute: </option>
        <option value="title">Title</option>
        <option value="album">Album</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
      </select>
      <input
        disabled={!props.attribute}
        type="text"
        className="form-control"
        id="basic-url"
        placeholder={`Search...`}
        onChange={props.updateSearchTerm}
      />
    </div>
  );
};

export default Filter;
