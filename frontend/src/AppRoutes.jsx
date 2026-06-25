import { Route, Routes } from 'react-router'
import Home from './pages/public/Home'
import SignUp from './pages/auth/SignUp'
import NotFound from './pages/public/NotFound'
import LoginUser from './pages/auth/LoginUser'
import Navbar from './components/Navbar'
import Menu from './pages/public/Menu'
import MenuDetails from './pages/public/MenuDetails'
import Cart from './pages/public/cart/Cart'
import Payment from './pages/payment/Payment'

const AppRoutes = () => {
  return (
    <div>
            <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<LoginUser />}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='/menu' element={<Menu/>}></Route>
            <Route path='/menu/:id' element={<MenuDetails/>}></Route>
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default AppRoutes