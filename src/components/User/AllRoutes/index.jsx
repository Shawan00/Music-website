import { useRoutes } from "react-router-dom";
import { userRoutes } from "../../../routes";

function AllUserRoutes() {
  return useRoutes(userRoutes);
}

export default AllUserRoutes;