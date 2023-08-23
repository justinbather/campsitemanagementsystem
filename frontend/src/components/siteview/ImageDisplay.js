import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageDisplay = (props) => {
  //Limit images to 4 so we can nicely put into grid
  //let siteImages = []
  //props.siteImages.length > 4 ? siteImages = props.siteImages.slice(0, 4) : siteImages = props.siteImages
  console.log(props);
  const [siteImages, setSiteImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSiteImages = async () => {
    axios
      .get(`/siteimage/${props.siteId}`)
      .then((res) => {
        setSiteImages(res.data);
        setLoading(false);
        console.log(siteImages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSiteImages();
    siteImages.length > 4
      ? setSiteImages(siteImages.slice(0, 5))
      : setSiteImages(siteImages);
  }, [props]);

  console.log(siteImages);

  return (
    <div className="pt-4">
      <div className="w-full rounded-xl relative grid grid-cols-2 sm:gap-1 overflow-hidden max-h-[50vh]">
        {siteImages.length > 0 && (
          <>
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                alt="image"
                src={props.thumbnail}
              />
            </div>
            <div className="flex">
              <div className="sm:gap-1 grid grid-cols-2 justify-center">
                {siteImages.map((image, index) => (
                  <img
                    key={index}
                    alt="image"
                    src={image.photo}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
