import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ToasterProvider from "./components/ToasterProvider";
import Customers from "./pages/Customers";
import Medicines from "./pages/Medicines";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import BottomTabs from "./components/BottomTabs";
// import Dashboard from './pages/Dashboard';
// import CustomerList from './pages/CustomerList';
// import AddCustomer from './pages/AddCustomer';
// import EditCustomer from './pages/EditCustomer';
// import UserHome from './pages/UserHome';

// import AdminLayout from './layouts/AdminLayout';
// import UserLayout from './layouts/UserLayout';
// import ProtectedRoute from './routes/ProtectedRoute';
// import RoleBasedRoute from './routes/RoleBasedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{ paddingBottom: "60px" }}>
          {" "}
          {/* space for tabs */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <BottomTabs />
      </BrowserRouter>
      <ToasterProvider />
    </>
  );
}

export default App;
