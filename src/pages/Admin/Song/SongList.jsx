import { memo } from "react";

function SongList(props) {
  const songList = props.data;

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Thumbnail</td>
            <td>Title</td>
            <td>Streams</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {songList.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                {item.thumbnail ? (<img src={item.thumbnail} alt={item.title}></img>
                ) : (<div>No thumnail</div>)}
              </td>
              <td>{item.title}</td>
              <td>item.streams</td>
              <td>{item.status}</td>
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

export default memo(SongList)