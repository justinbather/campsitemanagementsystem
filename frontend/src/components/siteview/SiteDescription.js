import React from "react";
import PricingCard from "./PricingCard";
import ListAmenities from "./ListAmenities";

const SiteDescription = (props) => {
  return (
    <div className="flex justify-between w-full border">
      <div className="flex flex-row justify-between h-full">
        <div className="flex justify-center gap-3">
          <ListAmenities amenities={props.siteAmenities.amenities} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SiteDescription;
