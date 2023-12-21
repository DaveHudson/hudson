import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`/full-stack-engineer-startup`}>Full-Stack Engineer Startup</Link>
            </li>
            <li>
              <Link to={`/full-stack-engineer-public-sector`}>Full-Stack Engineer Public Sector</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
