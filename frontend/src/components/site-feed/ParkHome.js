import { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteFilter from "./SiteFilter";
import SiteResultsFeed from "./SiteResultsFeed";
import FilterDropdown from "./FilterDropdown";
import filterIcon from "../../assets/filter-icon.png"
import closeIcon from "../../assets/close-icon.png"
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import { amber } from "@mui/material/colors";


const ParkHome = () => {
  const [parkData, setParkData] = useState([]);
  const [arrivalDate, setArrivalDate] = useState([]);
  const [departureDate, setDepartureDate] = useState([]);
  const [rawAvailableSites, setRawAvailableSites] = useState([]);
  //const [filteredSites, setFilteredSites] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState(false)
  const [amenities, setAmenities] = useState([])

  const { parkId } = useParams();
  console.log(parkId);

  const fetchParkData = async () => {
    axios
      .get(`/park/${parkId}`)
      .then((res) => {
        setParkData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateArrivalDate = (arrival) => {
    setArrivalDate(arrival);
  };
  const updateDepartureDate = (departure) => {
    setDepartureDate(departure);
  };

  const updateRawAvailableSites = (sites) => {
    setRawAvailableSites(sites)
  }

  const updateAmenities = (amenities) => {
    setAmenities(amenities)
    console.log(amenities)
  }


  const updateFilteredSites = () => {
     /*
        site: {id, name, park etc...
          amenities : {
            0: {id, name, icon},
            1: {id, name, icon}...
          }}
        we need to filter rawAvailableSites so that each sites amenitity list contains the checked off amenity
    */
    const filteredSites = rawAvailableSites.filter((site) => {
      // Check if any amenities are selected
      if (amenities) {
        // Check if all selected amenities are present in the site's amenities
        return amenities.every((amenity) => {
          return Object.values(site.amenities).some((siteAmenity) => siteAmenity.name === amenity);
        });
      } else {
        // No amenities selected, so include the site
        return true;
      }
    });
  
    
    return filteredSites;
  }; // Filtering function works, need to work on checking off amenities to remove the delay between selecting and changing state

 


  const handleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle)
  }

  useEffect(() => {
    fetchParkData();

  }, [parkId]);

  useEffect(() => {
    
    updateFilteredSites()
 
  }, [updateAmenities])

  if (updateFilteredSites().length > 0) {
    return (
      <div className="">
        <NavBar
          showTitle={true}
          titleText={parkData.name}
          titleImg={parkData.logo}
        />
        <div className="flex justify-center pt-10 gap-2">
          <SiteFilter
            arrival={updateArrivalDate}
            departure={updateDepartureDate}
            sites={updateRawAvailableSites}
          />
          <div className="w-8 h-8 flex flex-row mt-3 items-center justify-center align-center">
            <a onClick={handleDropdownToggle}>
              <img className="w-6 cursor-pointer" src={filterIcon}></img>
            </a>
          </div>
        </div>
        { dropdownToggle && //We want to display the dropdown when the toggle is set to true, need to figure out where to put filtering logic based on amenities etc
        <div className="flex flex-row w-screen h-60 justify-center transition ease-in-out">
          <div className="flex w-1/2 h-full rounded-sm bg-base-100 drop-shadow-lg">  
          <FilterDropdown amenities={updateAmenities} /> 
          
          </div>

        </div>} 
          
          
        
        <div className="flex pt-5 overflow-x-scroll hide-scroll-bar">
          
            <SiteResultsFeed
              feedTitle = "Top Sites For You"
              sites={updateFilteredSites()}
              initialArrival={arrivalDate}
              initialDeparture={departureDate}
            />
          
        </div>
        <div className="flex pt-5 overflow-x-scroll hide-scroll-bar">
          
            <SiteResultsFeed
              feedTitle = "Best Tent Sites"
              sites={updateFilteredSites()}
              initialArrival={arrivalDate}
              initialDeparture={departureDate}
            />
          
        </div>
        <div className="flex pt-5 overflow-x-scroll hide-scroll-bar">
          
            <SiteResultsFeed
              feedTitle = "Popular Trailer Sites"
              sites={updateFilteredSites()}
              initialArrival={arrivalDate}
              initialDeparture={departureDate}
            />
          
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <NavBar
        showTitle={true}
        titleText={parkData.name}
        titleImg={parkData.logo} />
        <div className="flex justify-center pt-10 gap-2">
          <SiteFilter
            arrival={updateArrivalDate}
            departure={updateDepartureDate}
            sites={updateRawAvailableSites}
          />
          <div className="w-8 h-8 flex flex-row mt-3 items-center justify-center align-center">
            <a onClick={handleDropdownToggle}>
              <img className="w-6 cursor-pointer" src={filterIcon}></img>
            </a>
          </div>
        </div>
        { dropdownToggle && //We want to display the dropdown when the toggle is set to true, need to figure out where to put filtering logic based on amenities etc
        <div className="flex flex-row w-screen h-60 justify-center transition ease-in-out">
          <div className="flex w-1/2 h-full rounded-sm bg-base-100 drop-shadow-lg">  
          <FilterDropdown amenities={updateAmenities} /> 
          
          </div>

        </div>} 
        
        <div className="flex justify-center px-40 pt-24">
          <h1 className="text-xl text-black">No sites available!</h1>
        </div>
      </div>
    );
  }
};

export default ParkHome;
