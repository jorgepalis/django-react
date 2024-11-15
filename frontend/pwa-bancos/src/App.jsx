import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login  from './components/login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/home.jsx';
import Cuentas from './pages/cuentas.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank/:name" element={<Cuentas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
