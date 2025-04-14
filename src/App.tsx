import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Medicines from "./pages/Medicines";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import BottomTabs from "./components/BottomTabs";
import ToasterProvider from "./components/ToasterProvider";
import AddMedicine from "./pages/AddMedicine";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AddStock from "./pages/AddStock";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <div style={{ paddingBottom: "60px" }}>
          <Routes>
            {/* Public Route: Login */}
            <Route
              path="/login"
              element={token ? <Navigate to="/" replace /> : <Login />}
            />

            {/* Protected Routes */}
            {token ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-medicine" element={<AddMedicine />} />
                <Route path="/add-stock" element={<AddStock />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              // Redirect any unknown paths to login when not logged in
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>

        {/* Show tabs only if logged in */}
        {token && <BottomTabs />}
      </BrowserRouter>

      <ToasterProvider />
    </>
  );
}

export default App;
