import {React, Fragment, useEffect} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import Header from "../layout/Header/Header.js";
import ReactStars from "react-rating-stars-component";


const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {product,loading,error} = useSelector(state=>state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(id))

    },[dispatch, id])

    const options = {
        edit: false,
        color: "rgba(255,255,255,0)",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };


    return (<Fragment>
        <Header />
        <div className="ProductDetails">
            <div>
                
                    {product.images &&
                    product.images.map((item, i) => (
                        <img 
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))}
                
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options}/>
                    <span>{product.numOfReviews} Review(s)</span>

                </div>
                <div className="detailsBlock-3">
                    <h1>{`Tk.${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input value="1" type="number" />
                            <button>+</button>

                        </div>{" "}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status:{" "}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}

                        </b>
                    </p>

                </div>
                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>

                </div>
                <button className="submitReview">Submit Review</button>
            </div>
        

        </div>
    </Fragment>
    );
};

export default ProductDetails;