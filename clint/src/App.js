import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/homePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/users/Dashboard';
import PrivateRoutes from './componenets/Routes/Private';
import ForgetPassword from './pages/auth/ForgetPassword';
import AdminRoutes from './componenets/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/users/Orders';
import Profile from './pages/users/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';






function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/product/:slug' element={<ProductDetails/>} />
      <Route path="/categories" element={<Categories/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/dashboard' element={<PrivateRoutes />}>
      <Route path="user" element={<Dashboard/>} />
      <Route path="user/orders" element={<Orders/>} />
      <Route path="user/profile" element={<Profile/>} />
      </Route>
      <Route path='/dashboard' element={<AdminRoutes />}>
      <Route path="admin" element={<AdminDashboard/>} />
      <Route path="admin/create-category" element={<CreateCategory/>} />
      <Route path="admin/create-product" element={<CreateProduct/>} />
      <Route path="admin/product/:slug" element={<UpdateProduct/>} />
      <Route path="admin/products" element={<Products/>} />
      <Route path="admin/users" element={<Users/>} />
      <Route path="admin/orders" element={<AdminOrders/>} />
   
      </Route>
      
      
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forget-password' element={<ForgetPassword/>} />
      

      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  
   
    
    </>
  );
}

export default App;
