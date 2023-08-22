import {React, Fragment, useEffect} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import Header from "../layout/Header/Header.js";


const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {product,loading,error} = useSelector(state=>state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(id))

    },[dispatch, id])
    return (<Fragment>
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
                </div>
            </div>
        

        </div>
    </Fragment>
    );
};

export default ProductDetails;