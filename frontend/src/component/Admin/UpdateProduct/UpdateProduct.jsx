import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearError,
    updateProduct,
    getProductDetails,
    getAdminProduct
} from "../../../actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/Metadata/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../Sidebar/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, product } = useSelector((state) => state.productDetails);
    const { products } = useSelector((state) => state.products);
    console.log(product);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.updateProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Toys",
        "Footwear",
        "Accessories",
        "Clothing",
    ];

    const productId = useParams();
    console.log(product);
    console.log(product.id);
    console.log(productId);

    useEffect(() => {
        if (product && product._id !== productId.id) {
            dispatch(getProductDetails(productId.id));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
        }
        if (error) {
            alert(error);
            dispatch(clearError());
        }

        if (updateError) {
            alert(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert("Product Updated Successfully");
            dispatch(getAdminProduct());
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        navigate,
        isUpdated,
        productId,
        product,
        updateError,
    ]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        dispatch(updateProduct(productId.id, myForm));
    };


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>


                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;