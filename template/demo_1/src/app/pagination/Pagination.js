import React, { Component } from "react";

import ReactPaginate from "react-paginate";
export default class Pagination extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={this.props.pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            onPageChange={this.props.handlePageChange}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            // forcePage={this.props.currentPage - 1}
          />
        }
      </div>
    );
  }
}
