import React, { useState , useEffect } from 'react';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Layout from './../componenets/layout/layout';
import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-toastify-modernize';
import '../style/CartStyles.css';

import axios from 'axios';


const CartPages = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [ClintToken ,setClintToken] = useState('')
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);//
  const navigate = useNavigate();

  // Calculate total price of items in the cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += parseFloat(item.price);
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };


  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token');
      setClintToken(data?.clientToken); // Corrected spelling to clientToken
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);


//handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? '' : 'Please Login to check out'
                  }`
                : 'Your Cart is Empty'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="cart-items-container">
              {cart?.map((p) => (
                <div key={p._id} className="row card flex-row">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="col-md-4">
                    <h3>{p.name}</h3>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: ${p.price}</p>
                  <div className="col-md-4 cart-remove-btn">  
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 cart-summary ">
            <div>
              <h2>Cart Summary</h2>
              <div className="summary-steps">
                <p>Total</p>
                <p>Check Out</p>
                <p>Payment</p>
              </div>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address?(
               <>
               <div className='mb-3'>
                 <h4>Current Address</h4>
                 <h5>{auth?.user?.address}</h5>
                 <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                </div>
               </>

              ) : (
                <div className='mb-3'>
                  {auth?.token ? (
                    <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                  ) : (
                    <button  className='btn btn-outline-warning' onClick={()=>navigate('/login' , {state: "/cart"})}>Pleae Login to check out</button>
                  )}
                  
                </div>
                
              )}
                
              <div className='mb-2'>
                
                    {!ClintToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                      
                <DropIn
                options={{
                  authorization: ClintToken,
                  paypal:{
                    flow: 'vault'
                  }
                }}
                onInstance={instance => setInstance(instance)}
                />
                 
               <button 
                  className='btn btn-primary'
                  onClick={handlePayment}
                  disabled={loading || !ClintToken || !instance || !auth?.user?.address} // Corrected state name to ClintToken
                
                >

                  {loading ? "Processing ...." : "Make Payment"}
                 
                </button>
                <span class="badge rounded-pill bg-dark mb-3">
                Note: Paypal Service is currently disable we solved it soon!! 
                </span>
                                  </>
                    )
                }
              </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPages;
