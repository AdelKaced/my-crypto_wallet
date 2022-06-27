import React, { useContext, useState } from 'react';
import { CoinsContext } from '../App';

const Pagination = () => {
  const currentPage = useContext(CoinsContext).page;
  const setPage = useContext(CoinsContext).setPage;

  const pages = [];
  //   for (let i = currentPage; i <= currentPage + 5; i++) {
  if (currentPage < 5) {
    pages.push(1, 2, 3, 4, 5, 6, '...', 100);
  } else if (currentPage < 97) {
    pages.push(
      1,
      '...',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '...',
      100
    );
  } else {
    pages.push(1, '...', 95, 96, 97, 98, 99, 100);
  }

  return (
    <div className="pagination">
      <ul>
        <li>
          {' '}
          <i
            onClick={() => setPage(currentPage - 1)}
            className="fas fa-angle-left"
          ></i>
        </li>
        {pages.length > 0 &&
          pages.map((page,index) => (
            <li key={index}
              onClick={() => {
                typeof page === 'number' && setPage(page);
              }}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </li>
          ))}
        <li>
          {' '}
          <i
            onClick={() => setPage(currentPage + 1)}
            className="fas fa-angle-right"
          ></i>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
