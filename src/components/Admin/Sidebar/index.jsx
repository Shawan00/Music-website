import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <Link to="/admin/song">Song</Link>
        <Link to="/admin/genre">Genre</Link>
      </aside>
    </>
  );
}

export default Sidebar