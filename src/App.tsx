import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inbound from './pages/Inbound';
import Outbound from './pages/Outbound';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
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
            <Route path="/inbound" element={<Inbound />} />
            <Route path="/outbound" element={<Outbound />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Mobile / Worker / POS Routes (Full Screen) */}
          <Route element={<ProtectedRoute useLayout={false} />}>
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