import React, { Component } from "react";
import _ from "lodash"; //underscore library
import PropTypes from "prop-types";

class Pagination extends React.Component {
  render() {
    const { itemCounts, pageSize, currentPage, onPageChange } = this.props;
    const pageCount = Math.ceil(itemCounts / pageSize);
    if (pageCount === 1) return null;

    //1..pageCount.map():
    const pages = _.range(1, pageCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
