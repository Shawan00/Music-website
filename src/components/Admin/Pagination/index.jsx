import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

function Pagination(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = parseInt(searchParams.get("page")) || 1;
  let pageSize = parseInt(searchParams.get("pageSize")) || 8;
  let totalPage = props.objectPagination.totalPage || 1;

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  const handlePageSizeChange = (e) => {
    searchParams.set("pageSize", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const debouncePageSizeChange = debounce(handlePageSizeChange, 600) // gọi hàm này sau 600ms khi người dùng dừng nhập

  if (currentPage > totalPage || currentPage < 1) {
    currentPage = 1;
  }

  const renderPageNumbers = () => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <li
          key={page}
          className={`numb ${currentPage === page ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          <span>{page}</span>
        </li>
      ));
    }

    const pages = [];

    if (currentPage > 2) {
      pages.push(
        <li key="first" className="first numb" onClick={() => handlePageChange(1)}>
          <span>1</span>
        </li>
      );
      if (currentPage > 3) {
        pages.push(
          <li key="dots1" className="dots">
            <span>...</span>
          </li>
        );
      }
    }

    let beforePage = currentPage - 1;
    let afterPage = currentPage + 1;

    if (currentPage === totalPage) {
      beforePage = beforePage - 2;
    } else if (currentPage === totalPage - 1) {
      beforePage = beforePage - 1;
    }

    if (currentPage === 1) {
      afterPage = afterPage + 2;
    } else if (currentPage === 2) {
      afterPage = afterPage + 1;
    }

    for (let i = beforePage; i <= afterPage; i++) {
      if (i > 0 && i <= totalPage) {
        pages.push(
          <li
            key={i}
            className={`numb ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            <span>{i}</span>
          </li>
        );
      }
    }

    if (currentPage < totalPage - 1) {
      if (currentPage < totalPage - 2) {
        pages.push(
          <li key="dots2" className="dots">
            <span>...</span>
          </li>
        );
      }
      pages.push(
        <li
          key="last"
          className="last numb"
          onClick={() => handlePageChange(totalPage)}
        >
          <span>{totalPage}</span>
        </li>
      );
    }

    return pages;
  };

  return (
    <>
      <div className='pagination'>
        <div className='pagination__pageSize'>
          <label htmlFor='pageSize' className='font-medium'>Items per page:</label>
          <Input
            type='number'
            id='pageSize'
            className='w-13 text-center font-medium md:text-lg shadow-none focus-visible:border-none focus-visible:ring-0 '
            defaultValue={pageSize}
            onChange={debouncePageSizeChange}
            min={1}
          />
        </div>
        <div className='pagination__main'>
          <ul>
            <li 
              className={`btn prev ${currentPage <= 1 ? "opacity-0 pointer-events-none" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className="flex items-center gap-2">
                <ChevronLeft /> Prev
              </span>
            </li>

            {renderPageNumbers()}

            <li 
              className={`btn next ${currentPage >= totalPage? "opacity-0 pointer-events-none" : ""}`} 
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className="flex items-center gap-2">
                Next <ChevronRight />
              </span>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default Pagination