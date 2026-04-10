import Nav from "../home/Nav";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
