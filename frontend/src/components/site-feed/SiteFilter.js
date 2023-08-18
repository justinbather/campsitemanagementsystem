import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, {useEffect, useState} from 'react';
import axios from "axios";



const SiteFilter = (props) => {
    const [departureDate, setDepartureDate] = useState(dayjs())
    const [arrivalDate, setArrivalDate] = useState(dayjs())
    const [filteredSites, setFilteredSites] = useState([])


    const parsedArrivalDate = dayjs(arrivalDate.$d).format("YYYY-MM-DD");
    const parsedDepartureDate = dayjs(departureDate.$d).format("YYYY-MM-DD");

    const fetchFilterSites = async (parsedArrivalDate, parsedDepartureDate) => {
        try {
        const fetchedSiteData = await axios.get(
            `/bookings/2/${parsedArrivalDate}/${parsedDepartureDate}`
          );
          const availableSites = Object.entries(fetchedSiteData);
          setFilteredSites(availableSites[0][1])
          props.sites(filteredSites)
          

        } catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchFilterSites(parsedArrivalDate, parsedDepartureDate);
      }, [
       
        parsedArrivalDate,
        parsedDepartureDate,
        
      ]);

    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            value={arrivalDate}
            onChange={(arrivalDate) => {
              setArrivalDate(arrivalDate);
              props.arrival(parsedArrivalDate)
              
            }}/>
            <DatePicker 
            value={departureDate}
            onChange={(departureDate) => {
              setDepartureDate(departureDate);
              props.departure(parsedDepartureDate)
              
            }}/>
        </LocalizationProvider>
    );
};

export default SiteFilter;