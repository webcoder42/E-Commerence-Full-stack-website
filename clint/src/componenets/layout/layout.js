import React from 'react';
import Header from './header';
import Footer from './footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "70vh" }}>
      <ToastContainer  />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:"E-Commerce -- Shop Now",
  description: "Full stack E-commerce website",
  keywords: "mern, react, node, mongodb",
  author: "Ahmed Bilal"
};

export default Layout;
