import React from "react";
import profilePic from "../../assets/orange-gradient.jpg";
import GradientButton from "./GradientButton";
import ProfileIcon from "./ProfileIcon";



const NavBar = () => {

  

  return (
    <div class="navbar bg-base-100 border-b border-neutral-content flex justify-between p-4">
      <a>WeCamp</a>
      <GradientButton buttonText="Back to Search" />
      <ProfileIcon />
    </div>
  );
};

export default NavBar;
