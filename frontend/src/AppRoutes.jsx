import { Route, Routes } from 'react-router'
import Home from './pages/public/Home'
import SignUp from './pages/auth/SignUp'
import NotFound from './pages/public/NotFound'
import LoginUser from './pages/auth/LoginUser'
import Navbar from './components/Navbar'
import Cart from './pages/public/cart/Cart'
import Payment from './pages/payment/Payment'
import Products from './pages/public/Products'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Footer from './components/Footer'
import ProductDetails from './pages/public/ProductDetails'
import Success from './pages/payment/Success'
import ProductManagement from './admin/ProductManagement'
import UserManagement from './admin/UserManagement'
import OrderManagement from './admin/OrderManagement'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import Dashboard from './admin/Dashboard'

const AppRoutes = () => {
  return (
    <div>
            <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<LoginUser />}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='/products' element={<Products/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/product/:id' element={<ProductDetails/>}></Route>
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/success' element={<Success/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>

         {/* {isAuthenticated && user?.role === "admin" &&( */}
          <Route path="/admin" element={<Dashboard />}>
          <Route index element={<ProductManagement />} />
          <Route path="product-management" element={<ProductManagement />}></Route>
          <Route path="user-management" element={<UserManagement />}></Route>
          <Route path="order-management" element={<OrderManagement />}></Route>
          <Route path="add-product" element={<AddProduct />}></Route>
          <Route path="edit-product" element={<EditProduct />}></Route>
        </Route>
        {/* )} */}
            
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
        
        <Footer/>
    </div>
  )
}

export default AppRoutes