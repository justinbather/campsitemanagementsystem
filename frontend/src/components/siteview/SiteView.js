import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import placeholderImage from "../../assets/campsite-image.jpg";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";
import { useParams } from "react-router-dom";
import axios from "axios";
import PricingCard from "./PricingCard";

const SiteView = () => {
  const { parkId } = useParams();
  const { siteId } = useParams();
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [site, setSite] = useState([]);

  const fetchSiteData = async () => {
    try {
      const siteData = await axios.get(`/site/${siteId}`);
      console.log(siteData);
      setSite(siteData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSiteData();
    console.log(site);
  }, []);

  return (
    <div className="">
      <NavBar
        showButton={true}
        buttonText="Back to search"
        clickDestination={`/park/${parkId}`}
      />
      <div className="px-80 pt-6">
        <SiteTitle
          siteNumber={`Site ${site.id}`}
          campgroundName="Victoria Valley"
          city="Guelph, ON"
        />
        <ImageDisplay siteId={siteId} thumbnail={site.thumbnail} />
        <div className="flex mt-10 gap-10">
          <SiteDescription siteAmenities={site} />
          <PricingCard
            site={site}
            initialArrival={initialArrival}
            initialDeparture={initialDeparture}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteView;
