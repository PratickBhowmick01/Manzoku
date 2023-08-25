import React, { Fragment, useEffect, useState } from "react";
import "./CreateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProduct } from "../../../actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/Metadata/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../Sidebar/Sidebar";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { getAdminProduct } from '../../../actions/productAction';
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);
    const { products } = useSelector((state)=> state.products);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Toys",
        "Footwear",
        "Accessories",
        "Clothing",
    ];

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }

        if (success) {
            alert("Product Created Successfully");
            dispatch(getAdminProduct());
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET }); //this is done so that new_product_success becomes false otherwise it will always show true
        }
    }, [dispatch, alert, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    }

    // const createProductImagesChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     setImages([]);
    //     setImagesPreview([]);

    //     files.forEach((file) => {
    //         const reader = new FileReader(); //The FileReader() constructor creates a new FileReader.

    //         reader.onload = () => { //The onload event occurs when an object has been loaded. 
    //             if (reader.readyState === 2) {
    //                 setImagesPreview((old) => [...old, reader.result]);
    //                 setImages((old) => [...old, reader.result]);
    //             }
    //         };

    //         reader.readAsDataURL(file); //The readAsDataURL method is used to read the contents of the specified File.
    //     });
    // };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

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
                            <select onChange={(e) => setCategory(e.target.value)}>
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
                            />
                        </div>

                        {/* <div id="createProductFormFile"> */}
                            {/* <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div> */}

                        {/* <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div> */}

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateProduct