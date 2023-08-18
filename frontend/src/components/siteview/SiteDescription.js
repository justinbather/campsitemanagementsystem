import React from "react";
import PricingCard from "./PricingCard";

const SiteDescription = (props) => {
  return (
    <div className="flex flex-row justify-between pt-4 mt-3 w-full h-[20rem] bg-base-100 rounded-xl drop-shadow-lg
    ">
      <div className="w-1/2 h-full">
      
      <div className="flex justify-center gap-3">
        <div className="w-[6rem] h-6 my-5 px-5 rounded-xl bg-base-100 drop-shadow-lg text-center hover:ring-2 ring-neutral-300">
              <p className="text-sm text-dark">Sewage</p>
          </div>
          <div className="w-[6rem] h-6 my-5 px-5 rounded-xl bg-base-100 drop-shadow-lg text-center hover:ring-2 ring-neutral-300">
            <p className="text-sm text-dark">Hydro</p>
          </div>
        </div>
      </div>
      <div className="flex -1/2 h-full justify-center">
        <PricingCard site={props.site}/>
      </div>
    </div>
  );
};

export default SiteDescription;
