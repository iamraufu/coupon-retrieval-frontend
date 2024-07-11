import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
// import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound';
import PromoUpload from './components/PromoUpload';
// import PrivateOutlet from './components/PrivateOutlet';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/promo-upload' element={<PromoUpload />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* <Route path='/' element={<PrivateOutlet />}></Route> */}

      </Routes>
    </AuthProvider>
  );
}

export default App;