import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShopify , FaShoppingCart  } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify-modernize';
import SearchInput from '../Form/Searchinput';
import useCategory from '../../hooks/useCategory';
import { useCart } from "../../context/Cart";
import {Badge} from 'antd'
import "../../style/Navbar.css";

const Header = () => {
  // Fetching categories using useCategory hook
  const categories = useCategory();

  // Auth context
  const [auth, setAuth] = useAuth();
  const[cart ] = useCart()

  // Logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaShopify /> E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <SearchInput placeholder="Search products..." />
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={'/categories'}  data-bs-toggle="dropdown" >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={'/categories'} >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map(c => (
                    <li key={c.slug}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`} >
                        {c.name} 
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link position-relative" activeClassName="active">
                  <Badge count={cart?.length} showZero>
                    <FaShoppingCart />
                  </Badge>
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" activeClassName="active">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;