import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./public/Login";
import Profile from "./public/Profile";
import Dashboard from "./dashboard/index";
import PublicLayout from './publicLayout';
import DashboardLayout from './dashboardLayout';

function App() {

  return (
    <Router>
      {/* */}

      <Routes>
        {/* <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} /> */}

        <Route element={<PublicLayout />} >
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<DashboardLayout />} >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
