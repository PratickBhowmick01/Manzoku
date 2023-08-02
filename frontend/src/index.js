import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import"../node_modules/bootstrap/dist/css/bootstrap.min.css" 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
);
