import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GradientButton from "../ui/GradientButton";
import CheckoutModal from "./CheckoutModal";
import React, {useState, useEffect} from 'react';



const PricingCard = (props) => {
    const [departureDate, setDepartureDate] = useState(dayjs())
    const [arrivalDate, setArrivalDate] = useState(dayjs())


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-3/4 h-3/4 bg-base-100 rounded-xl drop-shadow-lg">
            <div>
                <h1 className="text-xl text-[#fd4b31] pt-3 pl-5">$79/night</h1>
                <p className="text-sm pl-5">3 nights</p>
            </div>
        
        <div className="flex flex-row justify-between">
            <div className="w-1/2 px-2">
            <DatePicker 
            value={arrivalDate}
            onChange={(arrivalDate) => {
              setArrivalDate(arrivalDate);
            }}/>
            </div>
            <div className="w-1/2 px-2">
            <DatePicker 
            value={departureDate}
            onChange={(departureDate) => {
              setDepartureDate(departureDate);
            }}/>
            </div>
        </div>
        <div className="w-full flex justify-center pt-5">
        <CheckoutModal site={props.site} checkInDate={arrivalDate} checkoutDate={departureDate}/>
        </div>
        </div>
        </LocalizationProvider>
    );
};

export default PricingCard;