import React from "react";
import profile from "../../images/profile.png";
import ReactStars from "react-rating-stars-component";


const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "rgba(255,255,255,0)",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };
    return (<div className="reviewCard">
        <img src={profile} alt="profile"/>
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>

    </div>
    );
};

export default ReviewCard;