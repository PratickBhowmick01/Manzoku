import React, { Fragment, useState } from 'react';
import "./Product.css";
import {useSelector , useDispatch} from "react-redux";
import { clearErrors , getProduct } from '../../actions/userAction';
import Loader from '../layout/Loader/loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';

const categories = [
    "Anime",// for creating category
]

const Products = ({ match}) => {
    const dispatch = useDispatch();

    const alert =useAlert(); 

    const [currentPage , setCurrentPage] = useState(1);
    const [price ,setPrice] =useState([0,25000]);
    const [category ,setCategory] =useState("");
    const [ratings ,setRatings] =useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
     } =useSelector(
        (state) => state.products
    );

    const keyword =match.params.keyword;

    const setCurrentPageNo =(e)=> {
        setCurrentPage(e);
    };

    const priceHandler = (event , newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    },[dispatch ,keyword , currentPage, price, category, ratings, alert, error]);

    let count = filteredProductsCount;

    return (
    <Fragment>
        {loading ? (
         <Loader />
         ) : (
         <Fragment>
            <h2 className='productsHeading'>Products</h2>

            <div className='products'>
                {products &&
                  products.map((product) => (
                    <ProductCard key ={product.id} product={product} />
                  ))}
            </div>

            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider
                 value={price}
                 onChange={priceHandler}
                 valueLabelDisplay="auto"
                 aria-labelledby="rage-slider"
                 min={0}
                 max={25000}
                />
               <Typography>Categories</Typography>
               <u1 className="categoryBox">
                 {categories.map((category) =>(
                    <li
                      className='category-link'
                      key={category}
                      onClick={()=> setCategory(category)}
                    >
                        {category}
                      </li>

                 ))}
               </u1> 

               <fieldset>
                 <Typography component="legend">Rating Above</Typography>
                 <Slider
                   value={ratings}
                   onChange={(e, newRating) => {
                    setRatings(newRating)
                   }}
                   aria-labelledby="continous-slider"
                   valueLabelDisplay="auto"
                   min={0}
                   max={5}
                 />
               </fieldset>

            </div>

            {resultPerPage < count && (
                <div className='paginationBox'>
                <Pagination
                 activePage ={currentPage}
                 itemCountPerPage={resultPerPage}
                 totalItemsCount={productsCount}
                 onChange={setCurrentPageNo}
                 nextPageText="Next"
                 prevPageText="Prev"
                 firstPageText="1st"
                 lastPageText="Last"
                 itemClass="page-item"
                 linkClass="page-link"
                 activeClass='pageItemActive'
                 activeLinkClass='pageLinkActive '
                /> 

            </div>
            )}
            
         </Fragment>
        )}
        </Fragment>
    );
};






export default Products;