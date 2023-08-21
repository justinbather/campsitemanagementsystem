import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import placeholderImage from "../../assets/campsite-image.jpg";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";
import { useParams } from "react-router-dom";
import axios from "axios";

const SiteView = () => {
  const { siteId } = useParams();
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [site, setSite] = useState([]);
  const [siteImages, setSiteImages] = useState([]);

  const fetchSiteData = async () => {
    try {
      const siteData = await axios.get(`/site/${siteId}`);
      console.log(siteData);
      setSite(siteData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSiteImages = async () => {
    axios
      .get(`/siteimage/${siteId}`)
      .then((res) => {
        setSiteImages(res.data);
        console.log(siteImages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSiteData();
    fetchSiteImages();
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

        <ImageDisplay siteImages={siteImages} thumbnail={site.thumbnail} />
        <SiteDescription
          site={site}
          initialArrival={initialArrival}
          initialDeparture={initialDeparture}
        />
      </div>
    </div>
  );
};

export default SiteView;
