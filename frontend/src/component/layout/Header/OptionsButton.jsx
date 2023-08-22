// import React from 'react'
// import store from "../../../store"
// import { loadUser } from '../../../actions/userAction';
// import Options from './Options';
// import { useDispatch, useSelector } from 'react-redux';
// import { Router } from 'react-router-dom';

// const OptionsButton = () => {
//     const dispatch = useDispatch();
//     const {isAuthenticated, user} = useSelector((state)=> state.user)
//     React.useEffect(()=>{
//       store.dispatch(loadUser());
//     }, [dispatch]);
//   return (
//     {if (isAuthenticated) {
//         <Options user={user}/>
//     }}
//   )
// }

// export default OptionsButton;