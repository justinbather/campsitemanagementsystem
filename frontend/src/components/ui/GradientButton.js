import React from "react";
import { useNavigate } from "react-router-dom";


const GradientButton = (props) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/park')
  }

  return (
    <button class="btn btn-wide btn-active bg-gradient-to-r from-[#fec051] to-[#fd4b31] text-base-100 border-0 hover:ring-4 ring-neutral-300" onClick={() => handleClick()}>
     {props.buttonText}
    </button>
  );
};

export default GradientButton;
