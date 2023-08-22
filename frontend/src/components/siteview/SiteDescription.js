import React from "react";
import PricingCard from "./PricingCard";
import ListAmenities from "./ListAmenities";

const SiteDescription = (props) => {
  return (
    <div className="flex flex-row justify-between pt-4 mt-3 w-full h-[20rem] bg-base-100 rounded-xl drop-shadow-lg">
      <div className="w-1/2 h-full">
        <div className="flex justify-center gap-3">
          <ListAmenities amenities={props.site.amenities} />
        </div>
      </div>
      <div className="flex h-full justify-center">
        <PricingCard
          site={props.site}
          initialArrival={props.initialArrival}
          initialDeparture={props.initialDeparture}
        />
      </div>
    </div>
  );
};

export default SiteDescription;
