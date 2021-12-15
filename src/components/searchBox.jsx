import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      className="form-control my-3"
    />
  );
};

export default SearchBox;
