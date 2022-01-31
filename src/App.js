import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import {LoginPage, ConfirmOTP2} from './pages/user/LoginPage/LoginPage';
import HomePage from './pages/user/HomePage/HomePage';
import ProductDetail from './pages/user/ProductDetail/ProductDetail';
import {RegisterPage, ConfirmOTP} from './pages/user/RegisterPage/RegisterPage';
import {ResetPassword, ConfirmOTP3} from './pages/user/ResetPassword/ResetPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/otp" element={<ConfirmOTP/>}/>
        <Route path="/otp2" element={<ConfirmOTP2/>}/>
        <Route path="/otp3" element={<ConfirmOTP3/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
