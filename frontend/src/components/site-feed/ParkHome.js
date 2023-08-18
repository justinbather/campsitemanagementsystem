
import { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteFilter from "./SiteFilter";
import SiteResultsFeed from "./SiteResultsFeed";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";



const ParkHome = () => {
    const [arrivalDate, setArrivalDate] = useState([])
    const [departureDate, setDepartureDate] = useState([])
    const [rawAvailableSites, setRawAvailableSites] = useState([])
    const [filteredSites, setFilteredSites] = useState([])



    const updateArrivalDate = (arrival) => {
        setArrivalDate(arrival);
        
    }
    const updateDepartureDate = (departure) => {
        setDepartureDate(departure);
    }

    const updateFilteredSites = (sites) => {
        setFilteredSites(sites);
        console.log(filteredSites)
    }
    
    return (
        <div className="">
            
            <NavBar />
            <div className="flex justify-center pt-10 gap-2">
            <SiteFilter arrival={updateArrivalDate} departure={updateDepartureDate} sites={updateFilteredSites} />
            </div>
            <div className="flex justify-center px-40 pt-24">
            <SiteResultsFeed sites={filteredSites}/>
            </div>
        </div>
    )
};

export default ParkHome;