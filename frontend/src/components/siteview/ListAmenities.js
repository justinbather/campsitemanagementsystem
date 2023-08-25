import React, { useEffect, useState } from "react";

const amenitiesIcons = {
  water: "frontendsrcassetswater-icon.svg",
  sewage: "frontendsrcassetssewage-icon.svg",
  waterfront: "frontendsrcassetswaterfront-icon.svg",
  electricity: "frontendsrcassetselectricity-icon.svg",
};

const ListAmenities = (props) => {
  /* Takes in site : {
       ...site,
       amenities: {id, name}
    }

    */
  console.log(props);
  return (
    <>
      {props.amenities &&
        props.amenities.map((amenity, index) => (
          <div className="flex">
            <div className="flex items-center pt-4 pb-4 pr-4 ">
              <img src={amenity.icon} className="w-12 h-12" />
              <p key={index} className="pl-4 font-semibold">
                {amenity.name}
                <p className="font-light text-neutral-500 text-sm">
                  {amenity.description}
                </p>
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListAmenities;
