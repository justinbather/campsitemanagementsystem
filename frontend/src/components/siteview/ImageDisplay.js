import React from "react";

const ImageDisplay = (props) => {
  return (
    <div className="pt-4">
      <div className="w-full rounded-xl relative grid grid-cols-2 sm:gap-1 overflow-hidden max-h-[50vh]">
        <div className="w-full h-full">
          <img alt="image" src={props.siteImages} />
        </div>
        <div>
          <div className="sm:gap-1 grid grid-cols-2 max-h-[30vh] justify-center">
            <img alt="image" src={props.siteImages} />
            <img alt="image" src={props.siteImages} />
            <img alt="image" src={props.siteImages} />
            <img alt="image" src={props.siteImages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
