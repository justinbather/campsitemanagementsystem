import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageDisplay = (props) => {
  const [images, setImages] = useState([]);
  const [fetchedSiteIds, setFetchedSiteIds] = useState(new Set());

  const fetchImages = (siteId) => {
    if (!fetchedSiteIds.has(siteId)) {
      axios
        .get(`/siteimage/${siteId}`)
        .then((res) => {
          setImages((prevImages) => [...prevImages, ...res.data]);
          setFetchedSiteIds((prevIds) => new Set(prevIds).add(siteId));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    props.sites.forEach((site) => {
      if (!fetchedSiteIds.has(site.id)) {
        fetchImages(site.id);
      }
    });
  }, [props.sites]);

  console.log(images);

  return (
    <div>
      <Carousel
        showThumbs={false}
        dynamicHeight={false}
        showStatus={false}
        showIndicators={false}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.photo} // Update to the correct property based on your API response
            alt={`Image ${index}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageDisplay;
