import React from "react";
import Layout from "../componenets/layout/layout";

const About = () => {
  return (
    <Layout title={'About Us E-commerence '}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="about"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="about-content">
              <p className="text-justify mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                perferendis eius temporibus dicta blanditiis doloremque explicabo
                quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                commodi illum quidem neque tempora nam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
