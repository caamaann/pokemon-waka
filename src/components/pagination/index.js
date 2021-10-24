import ReactPaginate from "react-paginate";

const Index = ({ total = 0, page, togglePage }) => {
  const handlePageClick = (event) => {
    if (togglePage) {
      togglePage(event.selected + 1);
    }
  };

  return (
    <ReactPaginate
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      previousLabel="<"
      previousLinkClassName={"page-link"}
      nextLabel=">"
      nextLinkClassName={"page-link"}
      pageCount={total}
      containerClassName={"pagination justify-content-end"}
      pageClassName={"page-item"}
      breakClassName={"page-item"}
      pageLinkClassName={"page-link"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      onPageChange={(event) => handlePageClick(event)}
      forceSelected={page - 1}
      forcePage={page - 1}
      initialPage={page - 1}
    />
  );
};

export default Index;
