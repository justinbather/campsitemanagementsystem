import React from "react";
import PricingCard from "./PricingCard";
import ListAmenities from "./ListAmenities";

const SiteDescription = (props) => {
  return (
    <div className="flex justify-between w-full mt-10">
      <div className="flex flex-row justify-between w-8/12 mr-20 h-full border">
        <div className="flex justify-center gap-3">
          <ListAmenities amenities={props.site.amenities} />
        </div>
      </div>
      <div>
        <div className="flex h-full justify-center">
          <PricingCard
            site={props.site}
            initialArrival={props.initialArrival}
            initialDeparture={props.initialDeparture}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteDescription;
