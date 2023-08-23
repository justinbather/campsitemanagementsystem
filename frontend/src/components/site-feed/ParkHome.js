import { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteFilter from "./SiteFilter";
import SiteResultsFeed from "./SiteResultsFeed";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";

const ParkHome = () => {
  const [arrivalDate, setArrivalDate] = useState([]);
  const [departureDate, setDepartureDate] = useState([]);
  const [rawAvailableSites, setRawAvailableSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);

  const updateArrivalDate = (arrival) => {
    setArrivalDate(arrival);
  };
  const updateDepartureDate = (departure) => {
    setDepartureDate(departure);
  };

  const updateFilteredSites = (sites) => {
    setFilteredSites(sites);
  };
  console.log(departureDate);
  //console.log(arrivalDate)

  if (filteredSites.length > 0) {
    return (
      <div className="">
        <NavBar />
        <div className="flex justify-center pt-10 gap-2">
          <SiteFilter
            arrival={updateArrivalDate}
            departure={updateDepartureDate}
            sites={updateFilteredSites}
          />
        </div>
        <div className="flex pt-4 overflow-x-scroll hide-scroll-bar">
          <div className="flex flex-nowrap ml-10">
            <h1 className="absolute left-36 text-center font-inter text-4xl font-bold">
              Top Sites For You
            </h1>
            <SiteResultsFeed
              sites={filteredSites}
              initialArrival={arrivalDate}
              initialDeparture={departureDate}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <NavBar />
        <div className="flex justify-center pt-10 gap-2">
          <SiteFilter
            arrival={updateArrivalDate}
            departure={updateDepartureDate}
            sites={updateFilteredSites}
          />
        </div>
        <div className="flex justify-center px-40 pt-24">
          <h1 className="text-xl text-black">No sites available!</h1>
        </div>
      </div>
    );
  }
};

export default ParkHome;
