import { useRoutes } from "react-router-dom";
import { adminRoutes } from "../../../routes";

function AllAdminRoutes() {
  const element = useRoutes(adminRoutes);
  return element;
}

export default AllAdminRoutes