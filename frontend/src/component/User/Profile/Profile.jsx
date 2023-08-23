import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../layout/Metadata/MetaData";
import Loader from "../../layout/Loader/loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import img from "../../../images/pikachu.jpeg"

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer" style={{ backgroundImage: `url(${img})` }}>
          {/* <img src={img} alt="Homepage" /> */}
            <div>
            {/* <img src={img} alt="Homepage" /> */}
            <div className="header">
              <h1>My Profile</h1>
            </div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;