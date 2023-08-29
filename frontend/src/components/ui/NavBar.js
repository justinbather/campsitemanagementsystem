import React from "react";
import profilePic from "../../assets/orange-gradient.jpg";
import GradientButton from "./GradientButton";
import ProfileIcon from "./ProfileIcon";



const NavBar = (props) => {
/* 

Component Use

<NavBar showButton:true buttonText:str clickDestination:str (ex. "/park/parkId/") /> // Will show gradient button with custom text, when clicked is sent to park home
  or
<NavBar showTitle:true titleText:str titleImg:image /> Will Display title text (for park home pages) with logo

*/
  return (
    <div class="navbar bg-base-100 border-b border-neutral-content flex justify-between p-4">
      <a>WeCamp</a>

      { props.showButton &&
      <GradientButton buttonText={props.buttonText} clickDestination={props.clickDestination} />
      }

      {props.showTitle &&
      <div className="flex flex-row justify-center gap-3">
      <img className="max-h-10" src={props.titleImg}></img>
      <h1 className="font-5xl text-center justify-center">{props.titleText}</h1>
      </div>
      }
      <ProfileIcon />
    </div>
  );
};

export default NavBar;
