import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {LoginPage, ConfirmOTP2, AuthUser, AuthUser2} from './pages/user/LoginPage/LoginPage';
import HomePage from './pages/user/HomePage/HomePage';
import ShopPage from './pages/user/ShopPage/ShopPage';
import SearchProduct from './pages/user/HomePage/SearchProduct';
import ProductCategories from './pages/user/HomePage/ProductCategories';
import ProductDetail from './pages/user/ProductDetail/ProductDetail';
import {RegisterPage, ConfirmOTP} from './pages/user/RegisterPage/RegisterPage';
import {ResetPassword, ConfirmOTP3} from './pages/user/ResetPassword/ResetPassword';
import './App.css';
import {WishlistPage, WishlistPage2} from './pages/user/WishlistPage/WishlistPage';
import CartPage from './pages/user/CartPage/CartPage';
import { Logout, UpdateProfile } from './pages/user/UpdateProfile/UpdateProfile';
import { VoucherPage } from './pages/user/VoucherPage/VoucherPage';
import { OpenShop } from './pages/seller/OpenShop';
import { UpdateShop } from './pages/seller/UpdateShop';
import CheckoutPage from './pages/user/CartPage/CheckoutPage';
import TransactionPage from './pages/user/Transaction/TransactionPage';
import TransactionDetailPage from './pages/user/Transaction/TransactionDetailPage';
import { DeleteProduct, InsertProduct, UpdateProduct } from './pages/user/ManageProduct/ManageProduct';
import { VoucherManagement } from './pages/seller/VoucherManagement';
import { VoucherManagementGlobal } from './pages/admin/VoucherManagementGlobal';
import { UserPage } from './pages/admin/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/auth/:email/:password" element={<AuthUser/>}/>
        <Route path="/auth2/:email/:password/:otp" element={<AuthUser2/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/otp" element={<ConfirmOTP/>}/>
        <Route path="/otp2" element={<ConfirmOTP2/>}/>
        <Route path="/otp3" element={<ConfirmOTP3/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/search/:q" element={<SearchProduct/>}/>
        <Route path="/category/:id" element={<ProductCategories/>}/>
        <Route path="/shop/:id" element={<ShopPage/>}/>
        <Route path="/wishlist" element={<WishlistPage/>}/>
        <Route path="/wishlist2" element={<WishlistPage2/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/user/update" element={<UpdateProfile/>}/>
        <Route path="/voucher/:id" element={<VoucherPage/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/shop/create" element={<OpenShop/>}/>
        <Route path="/shop/update/:id" element={<UpdateShop/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/transaction" element={<TransactionPage/>}/>
        <Route path="/transaction/:id" element={<TransactionDetailPage/>}/>
        <Route path="/product/insert" element={<InsertProduct/>}/>
        <Route path="/product/update/:id" element={<UpdateProduct/>}/>
        <Route path="/voucher/create/:id" element={<VoucherManagement/>}/>
        <Route path="/voucher/create" element={<VoucherManagementGlobal/>}/>
        <Route path="/users" element={<UserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
