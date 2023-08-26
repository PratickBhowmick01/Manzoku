import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import {clearError, getProduct} from "../../actions/productAction.js";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../layout/Loader/loader.js";
import ProductCard from "../Home/ProductCard.js";
import Header from "../layout/Header/Header.js";

const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <h2 className='productsHeading'>Products</h2>

          <div className='products'>
            {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

          </div>
        </Fragment>
        
      )}

    </Fragment>
  );

};






export default Products;