import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import {LoginPage, ConfirmOTP2} from './pages/user/LoginPage/LoginPage';
import HomePage from './pages/user/HomePage/HomePage';
import {RegisterPage, ConfirmOTP} from './pages/user/RegisterPage/RegisterPage';
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
      </Routes>
    </Router>
  );
}

export default App;
