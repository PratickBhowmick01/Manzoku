import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/Metadata/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "../Sidebar/Sidebar";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../../actions/userAction";
import Loader from "../../layout/Loader/loader";
import { useNavigate, useParams } from "react-router-dom";


const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [role, setRole] = useState("");

  const userId = useParams();

  useEffect(() => {
    if (user && user._id !== userId.id) {
      dispatch(getUserDetails(userId));
    } else {
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("role", role);

    dispatch(updateUser(userId.id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;