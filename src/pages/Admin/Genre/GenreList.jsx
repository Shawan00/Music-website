import { memo } from "react";
import { formatDate } from "../../../helpers";

function GenreList(props) {
  const genreList = props.data;
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Thumbnail</td>
            <td>Title</td>
            <td>Description</td>
            <td>Create At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {genreList.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                {item.thumbnail ? (<img src={item.thumbnail} alt={item.title}></img>
                ) : (<div>No thumnail</div>)}
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default memo(GenreList)