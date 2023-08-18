import React from "react";
import NavBar from "../ui/NavBar";
import placeholderImage from "../../assets/campsite-image.jpg";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";

const SiteView = () => {
  return (
    <div>
      <NavBar />
      <div className="px-80 pt-6">
        <SiteTitle
          siteNumber="Site Name"
          campgroundName="Camp Name"
          city="city"
        />
        <ImageDisplay siteImages={placeholderImage} />
        <SiteDescription /> // not done yet
      </div>
    </div>
  );
};

export default SiteView;
