import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

function AdminLayout() {
  return (
    <>
      <Header/>
      <div className="main-content">
        <Sidebar/>
        <Outlet/>
      </div>
      <Footer/>
    </>
  );
}

export default AdminLayout