import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Patient } from './pages/Patient';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute'; // Importe o PrivateRoute
import { Medic } from './pages/Medic';
import { Procedure } from './pages/Procedure';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/Medic" element={<PrivateRoute element={<Medic />} />} />
        <Route path="/patient" element={<PrivateRoute element={<Patient />} />} />
        <Route path="/procedure" element={<PrivateRoute element={<Procedure />} />} />
      </Routes>
    </Router>
  );
}
