import { React, Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails, newReview } from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import Header from "../layout/Header/Header.js";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/loader.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(state => state.productDetails)
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

    useEffect(() => {

        if (error) {
            alert(error);
            dispatch(clearError());
        }

        dispatch(getProductDetails(id))

    }, [dispatch, id, error, alert]);

    const options = {
        edit: false,
        color: "rgba(255,255,255,0)",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

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
        alert("Item Added to Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productID", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };
    
      useEffect(() => {
        if (error) {
          alert(error);
          dispatch(clearError());
        }
    
        if (reviewError) {
          alert(reviewError);
          dispatch(clearError());
        }
    
        if (success) {
          alert("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
      }, [dispatch, id, error, alert, reviewError, success]);
    


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
                                <ReactStars {...options} />
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
                                    <button onClick={addToCartHandler}>Add to Cart</button>
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
                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                        </div>


                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((reviews) => <ReviewCard review={reviews} />)}
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