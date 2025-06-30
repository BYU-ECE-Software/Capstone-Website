import { Routes, Route, Link} from 'react-router-dom'
//import './App.css';
import TeamsLayout from './pages/TeamsLayout';
import TeamsDirectory from './pages/TeamsDirectory';
import TeamProfile from './pages/TeamProfile';

import './App.css';

// import our BYU styling
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/teams">Team Directory</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/teams" element={<TeamsLayout />}>
          <Route index element={<TeamsDirectory />} />
          <Route path=":id" element={<TeamProfile />} />
        </Route>
        {/* Add 404 route and home page route. Also build those pages */}
      </Routes>
    </div>
  );
}

export default App;
