import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../componenets/layout/layout";
import '../../src/index.css'

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container mt-5">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <div className="card category-card">
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <Link to={`/category/${c.slug}`} className="btn btn-primary">
                    Explore {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
