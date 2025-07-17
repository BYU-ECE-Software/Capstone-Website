import { Routes, Route } from "react-router-dom";
//import './App.css';
import TeamsLayout from './pages/TeamsLayout';
import TeamsDirectory from './pages/TeamsDirectory';
import TeamPage from './pages/TeamPage';
import Header from './components/header';
import Footer from './components/footer';
import CreateTeam from './pages/CreateTeam';
import PurchaseRequest from "./pages/PurchaseRequest";
import OrderDashboard from "./pages/OrderDashboard";

import './App.css';

// import our BYU styling
import './styles/variables.css';
import './styles/global.css';
import EditTeam from './pages/EditTeam';
import VehicleRequestLine from "./components/VehicleRequestLine"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/teams" element={<TeamsLayout />}>
          <Route index element={<TeamsDirectory />} />
          <Route path="create" element={<CreateTeam />} />
          <Route path=":id" element={<TeamPage />} />
          <Route path="edit/:id" element={<EditTeam />} />
        </Route>
        <Route path="/purchaseRequest" element={<PurchaseRequest />} />
        <Route path="/orders" element={<OrderDashboard />} />
        <Route path="/vehicle_requests" element={<VehicleRequestLine vehicleRequestId={1}/>} /> {/** hardcoded for now */}
        {/* Add 404 route and home page route. Also build those pages */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
