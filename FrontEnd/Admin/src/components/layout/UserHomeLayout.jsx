import { Outlet } from "react-router-dom";
import Nav from "../home/Nav";

function UserHomeLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default UserHomeLayout;
