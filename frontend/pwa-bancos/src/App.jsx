import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login  from './components/login.jsx';
import Home from './pages/home.jsx';
import Cuentas from './pages/cuentas.jsx';
import Transacciones from './pages/transacciones.jsx';

function App() {
  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center p-5" > 
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank/:name" element={<Cuentas />} />
        <Route path="/cuenta/:id/:link" element={<Transacciones />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
