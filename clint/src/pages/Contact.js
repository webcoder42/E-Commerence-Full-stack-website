import React from "react";
import Layout from "../componenets/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact Us '}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%", borderRadius: "8px" }} // Adding border radius for image
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="contact-info">
              <h2 className="bg-dark p-3 text-white text-center mb-4">CONTACT US</h2>
              <p className="text-justify">
                Feel free to contact us for any queries or information about our products. We are available 24/7.
              </p>
              <div className="contact-details mt-4">
                <p><BiMailSend /> <span className="ml-2">Email:</span> <a href="bilalE-Commerence@gmail.com">help@ecommerceapp.com</a></p>
                <p><BiPhoneCall /> <span className="ml-2">Phone No:</span> 03162554975</p>
                <p><BiSupport /> <span className="ml-2">Toll Free:</span> 1800-0000-0000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
