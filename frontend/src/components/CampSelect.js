import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import link_icon from "../assets/link_icon.svg";
import tent_icon from "../assets/tent.png";
import reset_icon from "../assets/reset_icon.svg";
import adjust_icon from "../assets/adjust_icon.svg";
import plus_icon from "../assets/plus_icon.svg";
import minus_icon from "../assets/minus_icon.svg";

const siteTypeOptions = [
  { label: "Back in", value: "backin" },
  { label: "Pull Through", value: "pullthrough" },
];
const trailerTypeOptions = [
  "Motorhome",
  "Tent",
  "Pop-Up",
  "5th-Wheel",
  "Travel Trailer",
];
const amenity = ["sewage", "water", "electricity"];

const CampSelect = () => {
  const initialCheckedAmenities = amenity.reduce((acc, amenity) => {
    acc[amenity] = false;
    return acc;
  }, {});

  const [checkedAmenities, setCheckedAmenities] = useState(
    initialCheckedAmenities
  );
  const [campsiteName, setCampsiteName] = useState("Campsite Name");
  const [arrivalDate, setArrivalDate] = useState(dayjs());
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [numberOfPets, setNumberOfPets] = useState(0);
  const [siteType, setSiteType] = useState(null);
  const [availableSites, setAvailableSites] = useState([]);

  //Fetch from api when filter dates changes
  //Parses arrivalDate and departureDate to yyyy/mm/dd format
  // fetches api at /bookings/<int:park_id>/<str:arrivalDate>/<str:departureDate>
  //Api returns available sites in JSON for the given dates

  const fetchAvailableSites = async (arrivalDate, departureDate) => {
    try {
      const parsedArrivalDate = dayjs(arrivalDate.$d).format("YYYY-MM-DD")
      const parsedDepartureDate = dayjs(departureDate.$d).format("YYYY-MM-DD")
      const availableSiteData = await axios.get(`/bookings/2/${parsedArrivalDate}/${parsedDepartureDate}`);
      const availableSites = Object.entries(availableSiteData);
      setAvailableSites(availableSites[0][1]);
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchAvailableSites(arrivalDate, departureDate);
    
  }, [
    checkedAmenities,
    numberOfPersons,
    numberOfPets,
    arrivalDate,
    departureDate,
    siteType,
  ]);

  const handleBooking = async (siteId, arrivalDate, departureDate) => {
    // onClick function called when user clicks "book now" next to listed sites
    try {
      const parsedArrivalDate = dayjs(arrivalDate.$d).format("YYYY-MM-DD")
      const parsedDepartureDate = dayjs(departureDate.$d).format("YYYY-MM-DD")
      const booking = await axios.post(
        "/bookings/2",
        {
          site_id: siteId,
          start_date: parsedArrivalDate,
          end_date: parsedDepartureDate,
          payment_made: false //Change this before production to variable based on payment taken from user
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert('Booking Success')
    } catch(err){
      console.log(err)
    }
  };

  const handleDropdownChange = (selectedOption) => {
    setSiteType(selectedOption.value); // Update the state with the selected value
  };

  const increment = (setState) => {
    setState((prevCount) => prevCount + 1);
  };

  const decrement = (state, setState) => {
    if (state > 0) {
      setState((prevCount) => prevCount - 1);
    }
  };

  const handleCheckboxToggle = (amenity) => {
    setCheckedAmenities((prevCheckedAmenities) => ({
      ...prevCheckedAmenities,
      [amenity]: !prevCheckedAmenities[amenity],
    }));
    
    //Filter availableSites by the checked amenity toggles
    
    let filteredSites = availableSites.filter(function(site) {
      console.log(site[amenity]===true)
      
      return site[amenity] === true
    });
    //Set availableSites state to new filteredSites array.
    //Not working
    console.log(filteredSites)
    setAvailableSites(filteredSites);
    
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-[#1E1E1E] h-screen flex items-center justify-center">
        <div className="bg-[#FFFFFF] w-[1024px] h-[800px] flex flex-col rounded-[40px]">
          <h1 className="w-full justify-center pt-5 text-3xl font-bold underline flex">
            {campsiteName}
            <img src={link_icon} className="mb-3 pl-2 scale-40" />
          </h1>

          <div className="w-[1024px] h-[800px] flex rounded-[40px] gap-3">
            <div className=" border-stroke-color border-2 w-1/2 mt-5 mb-20 ml-10 rounded-l-[40px]">
              <header className="w-full flex pl-10 pt-3">
                <img src={tent_icon} className="w-[50px]" />
                <h2 className="pt-3 pl-2 text-[22px] font-bold text-center">
                  Site Filter
                </h2>
              </header>
              <div className="py-5 flex gap-5 px-5">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm pl-3 pb-1">Arrival*</h3>
                  <DatePicker
                    value={arrivalDate}
                    defaultValue={arrivalDate}
                    slotProps={{
                      textField: {
                        helperText: "YYYY/MM/DD",
                      },
                    }}
                    onChange={(arrivalDate) => {
                      setArrivalDate(arrivalDate);
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm pl-3 pb-1">Departure*</h3>
                  <DatePicker
                    value={departureDate}
                    onChange={(departureDate) => {
                      setDepartureDate(departureDate);
                    }}
                  />
                </div>
              </div>
              <hr className="mx-10 pb-5 border-stroke-color" />
              <div className="h-3/5 mx-10">
                <section className="flex justify-between">
                  <h3 className="font-bold">Filter</h3>
                  <div className="flex gap-2">
                    <img src={reset_icon} className="w-[25px] cursor-pointer" />
                    <img
                      src={adjust_icon}
                      className="w-[25px] cursor-pointer"
                    />
                  </div>
                </section>
                <div className="pt-3 px-5">
                  <h3 className="font-bold text-sm pl-3 pb-1">Site Type</h3>
                  <Dropdown
                    options={siteTypeOptions}
                    onChange={handleDropdownChange}
                  />
                </div>
                <div className="pt-3 px-5">
                  <h3 className="font-bold text-sm pl-3 pb-1">Trailer Type</h3>
                  <Dropdown options={trailerTypeOptions} />
                </div>
                <div className="h-1/2 flex w-full items-center">
                  <div className="w-3/5 flex flex-col">
                    <h3 className="font-bold text-sm pl-3 pb-1">Amenities</h3>
                    <ul className="columns-2 flex-col bg-form-color gap-0 rounded-2xl items-center">
                      {amenity.map(function (amenity, i) {
                        return (
                          <li className="py-3 pl-3 text-sm flex" key={i}>
                            <input
                              type="checkbox"
                              className="mx-1"
                              checked={checkedAmenities[amenity]}
                              onChange={() => handleCheckboxToggle(amenity)}
                            />
                            {amenity}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="borde w-1/2 h-full flex flex-col pl-5 justify-center">
                    <h3 className="font-bold text-sm pl-3 pb-1">Persons</h3>
                    <form className="w-full h-1/4 bg-form-color rounded-lg flex justify-between items-center">
                      <img
                        src={minus_icon}
                        className="w-10 items-center px-3 cursor-pointer border-r h-full border-stroke-color"
                        onClick={() =>
                          decrement(numberOfPersons, setNumberOfPersons)
                        }
                      />
                      {numberOfPersons}
                      <img
                        src={plus_icon}
                        className="w-10 items-center px-3 cursor-pointer border-l h-full border-stroke-color"
                        onClick={() => increment(setNumberOfPersons)}
                      />
                    </form>
                    <h3 className="font-bold text-sm pl-3 pt-1 mt-1">Pets</h3>
                    <form className="w-full h-1/4 bg-form-color rounded-lg flex justify-between items-center">
                      <img
                        src={minus_icon}
                        className="w-10 items-center px-3 cursor-pointer border-r h-full border-stroke-color"
                        onClick={() => decrement(numberOfPets, setNumberOfPets)}
                      />
                      {numberOfPets}
                      <img
                        src={plus_icon}
                        className="w-10 items-center px-3 cursor-pointer border-l h-full border-stroke-color"
                        onClick={() => increment(setNumberOfPets)}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 mr-10 rounded-r-[40px] gap-3">
              <div className="border-2 border-stroke-color h-1/2 mt-5 rounded-tr-[40px]">
                <h1 className="text-2xl">Sites</h1>
                <div>
                  
                  { availableSites.map((site) => (
                    <>
                    <h1 key={site.id}>{site.name} - $ {site.price}/night</h1>
                    <p onClick={() => handleBooking(site.id, arrivalDate, departureDate)}>Book now</p>
                    </>
                  ))}
                  
                </div>
              </div>
              <div className="border-2 border-stroke-color h-1/2 mb-20 rounded-br-[40px]"></div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CampSelect;
