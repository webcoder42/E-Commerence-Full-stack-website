import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../src/index'

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => prevValue - 1);
        }, 1000);
        if (count === 0) {
            clearInterval(interval);
            navigate(`/${path}`, {
                state: location.pathname
            });
        }
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
          
          
            <img src="https://static.vecteezy.com/system/resources/previews/016/471/452/original/abstract-modern-ecommerce-logo-ecommerce-logo-design-shop-logo-design-template-creative-ecommerce-logo-vector.jpg" alt="Logo" className="logo-animation" />

        </div>
    );
};

export default Spinner;
