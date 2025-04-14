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

  return (
    <>
      <div className='pagination'>
        <div className='pagination__pageSize'>
          <select name='pageSize' value={pageSize} onChange={handlePageSizeChange}>
            <option value="8">8 records/page</option>
            <option value="10">10 records/page</option>
            <option value="15">15 records/page</option>
            <option value="25">25 records/page</option>
            <option value="50">50 records/page</option>
            <option value="75">75 records/page</option>
            <option value="100">100 records/page</option>
          </select>
        </div>
        <div className='pagination__main'>
          {currentPage !== 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
          )}
          <ul>
            {[...Array(totalPage)].map((_, index) => (
              <li key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</li>
            ))}
          </ul>
          {currentPage !== totalPage && (
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Pagination