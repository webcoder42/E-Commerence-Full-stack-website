import React from "react";
import Layout from "../componenets/layout/layout";

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="policy-content">
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
              <p>Add privacy policy</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
