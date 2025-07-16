import { Outlet, useLocation } from "react-router-dom";

export default function TeamsLayout() {
  const location = useLocation();
  
  return (
    <main key={location.pathname}>
      <Outlet />
    </main>
  );
}
