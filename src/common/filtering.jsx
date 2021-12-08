import React, { Component } from "react";

class Filtering extends React.Component {
  render() {
    const {
      filters,
      filtersTextProperty,
      filtersValueProperty,
      currentFilter,
      onChangeFilter,
    } = this.props;
    return (
      <ul className="list-group">
        {filters.map((f) => (
          <li
            key={f[filtersValueProperty]} //instead . use [] ---> "access properties dynamically"
            className={
              currentFilter === f ? "list-group-item active" : "list-group-item"
            }
            onClick={() => onChangeFilter(f)}
          >
            {f[filtersTextProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

Filtering.defaultProps = {
  filtersTextProperty: "name",
  filtersValueProperty: "_id",
};

export default Filtering;
