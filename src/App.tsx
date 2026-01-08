import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inbound from './pages/Inbound';
import Outbound from './pages/Outbound';
import Inventory from './pages/Inventory';
import MasterData from './pages/MasterData';
import WarehouseSetup from './pages/WarehouseSetup';
import Reports from './pages/Reports';
import Integration from './pages/Integration';
import System from './pages/System';
import Settings from './pages/Settings';
import Returns from './pages/Returns';
import Inbox from './pages/Inbox';
import Utilities from './pages/Utilities';
import Help from './pages/Help';
import Onboarding from './pages/Onboarding';
import GoodsReceipt from './pages/GoodsReceipt';
import Picking from './pages/Picking';
import POSRegister from './pages/POSRegister';

const ProtectedRoute = ({ useLayout = true }: { useLayout?: boolean }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return useLayout ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Outlet />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Desktop / Admin Routes with Sidebar */}
          <Route element={<ProtectedRoute useLayout={true} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbound" element={<Inbound />} />
            <Route path="/outbound" element={<Outbound />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/master-data" element={<MasterData />} />
            <Route path="/warehouse-setup" element={<WarehouseSetup />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integration" element={<Integration />} />
            <Route path="/system" element={<System />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/utilities" element={<Utilities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Route>

          {/* Mobile / Worker / POS / Full Screen Routes */}
          <Route element={<ProtectedRoute useLayout={false} />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/inbound/receive" element={<GoodsReceipt />} />
            <Route path="/outbound/pick" element={<Picking />} />
            <Route path="/pos" element={<POSRegister />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;