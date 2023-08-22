import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GradientButton from "../ui/GradientButton";
import CheckoutModal from "./CheckoutModal";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const PricingCard = (props) => {
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [departureDate, setDepartureDate] = useState(dayjs(initialDeparture));
  const [arrivalDate, setArrivalDate] = useState(dayjs(initialArrival));

  const displayNights = (arrivalDate, departureDate) => {
    const date1String = dayjs(arrivalDate.$d).format("YYYY-MM-DD").toString();
    const dayjsDate1 = dayjs(date1String);
    const date2String = dayjs(departureDate.$d).format("YYYY-MM-DD").toString();
    const dayjsDate2 = dayjs(date2String);
    const timeBetween = Math.ceil(dayjsDate2.diff(dayjsDate1, "day"));
    console.log(timeBetween);
    return timeBetween + " nights";
  };

  const [numberOfNights, setNumberOfNights] = useState("Select dates");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-3/4 h-3/4 bg-base-100 rounded-xl drop-shadow-lg">
        <div>
          <h1 className="text-xl text-[#fd4b31] pt-3 pl-5">
            ${props.site.price}/night
          </h1>
          <p className="text-sm pl-5">{numberOfNights}</p>
        </div>

        <div className="flex flex-row">
          <div className="p-2 flex gap-2 items-center justify-center">
            <DatePicker
              value={arrivalDate}
              defaultValue={initialArrival}
              onChange={(arrivalDate, departureDate) => {
                setArrivalDate(arrivalDate);
                setNumberOfNights(displayNights(arrivalDate, departureDate));
              }}
            />
            <HiArrowRight />
            <DatePicker
              value={departureDate}
              defaultValue={initialDeparture}
              onChange={(departureDate) => {
                setDepartureDate(departureDate);
                setNumberOfNights(displayNights(arrivalDate, departureDate));
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-center pt-5">
          <CheckoutModal
            site={props.site}
            checkInDate={arrivalDate}
            checkoutDate={departureDate}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default PricingCard;
