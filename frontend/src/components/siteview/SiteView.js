import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";
import { useParams } from "react-router-dom";
import axios from "axios";
import PricingCard from "./PricingCard";
import SiteViewSkeleton from "./ImageDisplaySkeleton";

const SiteView = () => {
  const { parkId } = useParams();
  const { siteId } = useParams();
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [site, setSite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteImages, setSiteImages] = useState([]);

  const fetchSiteData = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const siteData = await axios.get(`/site/${siteId}`);
        console.log(siteData);
        setSite(siteData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 2000);
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
    fetchSiteImages();
    fetchSiteData();
  }, []);

  return (
    <div>
      <NavBar
        showButton={true}
        buttonText="Back to search"
        clickDestination={`/park/${parkId}`}
      />
      <div className="px-80 pt-6">
        {loading ? (
          <SiteViewSkeleton />
        ) : (
          <>
            <SiteTitle
              siteNumber={`Site ${site.id}`}
              campgroundName="Victoria Valley"
              city="Guelph, ON"
            />
            <ImageDisplay
              siteImages={siteImages}
              siteId={siteId}
              thumbnail={site.thumbnail}
            />
            <div className="flex mt-10 gap-10">
              <SiteDescription
                siteAmenities={site.amenities}
                campgroundDescription="campground description placeholder"
              />
              <PricingCard
                site={site}
                initialArrival={initialArrival}
                initialDeparture={initialDeparture}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteView;
