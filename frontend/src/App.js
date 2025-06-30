import { Routes, Route} from 'react-router-dom'
//import './App.css';
import TeamsLayout from './pages/TeamsLayout';
import TeamsDirectory from './pages/TeamsDirectory';
import TeamProfile from './pages/TeamProfile';
import Header from './components/header';
import Footer from './components/footer';
import CreateTeam from './pages/CreateTeam';

import './App.css';

// import our BYU styling
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/teams" element={<TeamsLayout />}>
          <Route index element={<TeamsDirectory />} />
          <Route path=":id" element={<TeamProfile />} />
          <Route path="create" element={<CreateTeam />} />
          <Route path="edit/:id" element={<CreateTeam />} />
        </Route>
        {/* Add 404 route and home page route. Also build those pages */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
