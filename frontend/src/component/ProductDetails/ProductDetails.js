import {React, Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import {clearError, getProductDetails} from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import Header from "../layout/Header/Header.js";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/loader.js";
import { useAlert } from "react-alert";
import {addItemsToCart} from "../../actions/cartAction.js";

const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const {product,loading,error} = useSelector(state=>state.productDetails)

    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getProductDetails(id))

    },[dispatch, id, error, alert]);

    const options = {
        edit: false,
        color: "rgba(255,255,255,0)",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added to Cart");
    };


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                <Header />
                <div className="ProductDetails">
                    <div>
                        <Carousel>
                            {product.images &&
                            product.images.map((item, i) => (
                                <img 
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product #{product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options}/>
                            <span>{product.numOfReviews} Ratings(s)</span>

                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`Tk.${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly value={quantity} type="number" />
                                    <button onClick={increaseQuantity}>+</button>

                                </div>{" "}
                                <button disabled={product.stock < 1 ? true : false} 
                                onClick={addToCartHandler}>Add to Cart</button>
                            </div>
                            <p>
                                Status:{" "}
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}

                                </b>
                            </p>

                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>

                        </div>
                        <button className="submitReview">Submit Review</button>
                    </div>
                

                </div>
                <h3 className="reviewsHeading">Reviews</h3>

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews &&
                    product.reviews.map((reviews) => <ReviewCard review={reviews}/>)}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet!</p>
            )}
            </Fragment>
            )
            }
        </Fragment>
    );
};

export default ProductDetails;