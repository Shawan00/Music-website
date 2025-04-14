import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import PlayerControl from "../PlayerControl"

function UserLayout() {
  return (
    <>
      <Header/>
      <div className="main-content">  
        <Outlet/>
      </div>
      <PlayerControl/>
      <Footer/>
    </>
  )
}

export default UserLayout