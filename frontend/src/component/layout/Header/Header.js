import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logoBlack.png";


const Header = () => {
    return (
    <ReactNavbar 
      burgerColorHover="#70706b"
      burgerColor="black"
      logo = {logo}
      logoWidth="20vmax"
      navColor3="#61677a"
      navColor4="#272829"
      navColor1="#fff6e0"
      navColor2="#d8d9da"
      logoHoverColor="#70706b"
      logoHoverSize="20px"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Size="2vmax"
      link1Color="black"
      link1ColorHover="#7f7f7f"
      link3ColorHover="#fff6e0"
      link4ColorHover="#fff6e0"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1Margin="1vmax"
      searchIconColor="#979797"
      cartIconColor="#979797"
      profileIconColor="#979797"
      searchIconColorHover="#fff6e0"
      cartIconColorHover="#fff6e0"
      profileIconColorHover="#fff6e0"
      searchIconSize="3vmax"
      cartIconSize="3vmax"
      profileIconSize="4vmax"
      cartIconMargin="1vmax"
      logoMargin="2vmax"
    />
    );
}; 

export default Header;