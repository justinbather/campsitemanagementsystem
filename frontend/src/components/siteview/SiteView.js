import React from "react";
import NavBar from "../ui/NavBar";
import placeholderImage from "../../assets/campsite-image.jpg";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";

const site = {
  id: 2,
  park_id: 2,
  price: 100,

}

const SiteView = () => {
  return (
    <div className="">
      <NavBar />
      <div className="px-80 pt-6">
        <SiteTitle
          siteNumber={`Site ${site.id}`}
          campgroundName="Victoria Valley"
          city="Guelph, ON"
        />
        <ImageDisplay siteImages={placeholderImage} />
        <SiteDescription site={site}/>
      </div>
    </div>
  );
};

export default SiteView;
