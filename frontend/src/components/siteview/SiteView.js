import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import placeholderImage from "../../assets/campsite-image.jpg";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";
import { useParams } from "react-router-dom";
import axios from "axios";





const SiteView = () => {
  const {siteId} = useParams();
  const [site, setSite] = useState([]);

const fetchSiteData = async () => {
  try {
    
    const siteData = await axios.get(`/site/${siteId}`)
    console.log(siteData)
    setSite(siteData.data)
  } catch(err) {
    console.log(err);
  }
}
useEffect(() => {
  fetchSiteData();
}, []);

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
