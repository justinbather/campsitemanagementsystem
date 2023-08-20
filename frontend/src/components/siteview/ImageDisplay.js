import React, { useEffect, useState } from "react";
import placeholderImage from "../../assets/campsite-image.jpg";


const ImageDisplay = (props) => {

  //Limit images to 4 so we can nicely put into grid 
  //let imageArray = []
  //props.siteImages.length > 4 ? imageArray = props.siteImages.slice(0, 4) : imageArray = props.siteImages

  const [imageArray, setImageArray] = useState([]);


  useEffect(() => {
    setImageArray(props.siteImages)
    
  }, [
    props
  ]);

  console.log(props.siteImages)
  return (
     <div className="pt-4">
      <div className="w-full rounded-xl relative grid grid-cols-2 sm:gap-1 overflow-hidden max-h-[50vh]">
        
        {imageArray.length > 0 &&
        <>
          <div className="w-full h-full">
          <img alt="image" src={imageArray[0].photo} />
        </div>
        <div>
          <div className="sm:gap-1 grid grid-cols-2 max-h-[30vh] justify-center">
          <img alt="image" src={imageArray[0].photo} />
          <img alt="image" src={imageArray[0].photo} />
          <img alt="image" src={imageArray[0].photo} />
          <img alt="image" src={imageArray[0].photo} />
          </div>
        </div>
        </>
        }
      </div>
    </div>
  )
 
  
};

export default ImageDisplay;
