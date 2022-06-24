import React, { useContext, useState } from 'react';
import { CoinsContext } from '../App';

const Pagination = () => {
    const currentPage = useContext(CoinsContext).page;
    const [active, setActive] = useState(currentPage);
  console.log(currentPage);
  const pages = [];
  for (let i = currentPage; i <= currentPage + 5; i++) {
    pages.push(i);
  }
  console.log(pages);
  return (
    <div className="pagination">
      <ul>
        <li>
          {' '}
          <i class="fas fa-angle-left"></i>
        </li>
        {pages.length > 0 &&
          pages.map((page) => (
            <li className={active === page ? 'active' : ''}>{page}</li>
          ))}
        {currentPage < 94 && <li>...</li>}
        <li>100</li>{' '}
        <li>
          {' '}
          <i class="fas fa-angle-right"></i>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
