import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const Paginator: React.FC<PaginatedItemsType> = React.memo((props) => {
  let { total_count } = props;
  const { setCurrentPage } = props;
  const { currentPage } = props;
  const { itemsPerPage } = props;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(total_count / itemsPerPage));
  }, [itemsPerPage, total_count]);

  const page = (current: any) => {
    setCurrentPage(current.pageNumber.selected);
  };

  return (
    <>
      <ReactPaginate
        forcePage={currentPage}
        nextLabel=" >"
        onPageChange={(pageNumber) => {
          page({ pageNumber });
        }}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item mb-0"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="mt-4 d-flex justify-content-center pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0"
        activeClassName="active"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
});

type PaginatedItemsType = {
  total_count: number;
  itemsPerPage: number;
  setCurrentPage: (num: number) => void;
  currentPage: number;
};
