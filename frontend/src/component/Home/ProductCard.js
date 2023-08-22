import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(255,255,255,0)",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span> {product.numOfReviews} Rating(s) </span>
            </div>
            <span>{`Tk.${product.price}`}</span>
        </Link>

    );
};

export default ProductCard;