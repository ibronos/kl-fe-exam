import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./public/Login";
import Profile from "./public/Profile";
import Dashboard from "./dashboard/index";
import PublicLayout from './publicLayout';
import DashboardLayout from './dashboardLayout';
import Shipping from './dashboard/shipping';

function App() {

  return (
    <Router>
        <Routes>
          <Route element={<PublicLayout />} >
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<DashboardLayout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/shipping" element={<Shipping />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
