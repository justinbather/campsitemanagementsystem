import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import link_icon from "../assets/link_icon.svg";
import tent_icon from "../assets/tent.png";

const CampSelect = () => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-[#1E1E1E] h-screen flex items-center justify-center">
        <div className="bg-[#FFFFFF] w-[1024px] h-[800px] flex flex-col rounded-[40px]">
          <h1 className="w-full justify-center pt-5 text-3xl font-bold underline flex">
            Campsite Name
            <img src={link_icon} className="mb-3 pl-2 scale-40" />
          </h1>

          <div className="w-[1024px] h-[800px] flex rounded-[40px] gap-3">
            <div className=" border-stroke-color border-2 w-1/2 mt-5 mb-20 ml-10 rounded-l-[40px]">
              <header className="w-full flex pl-7 pt-3">
                <img src={tent_icon} className="w-[50px]" />
                <h2 className="pt-3 pl-2 text-[22px] font-bold text-center">
                  Site Filter
                </h2>
              </header>
              <div className="py-5 flex gap-5 px-5">
                <div className="w-1/2">
                  <DatePicker
                    label="Arrival*"
                    value={arrivalDate}
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                    onChange={(newArrivalDate) => {
                      setArrivalDate(newArrivalDate);
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <DatePicker
                    style={{ backgroundColor: "aliceblue" }}
                    label="Departure*"
                    value={departureDate}
                    inputProps={{
                      style: {
                        borderStyle: "solid",

                        outline: "none",
                      },
                    }}
                    onChange={(newDepartureDate) => {
                      setDepartureDate(newDepartureDate);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 mr-10 rounded-r-[40px] gap-3">
              <div className="border-2 border-stroke-color h-1/2 mt-5 rounded-tr-[40px]"></div>
              <div className="border-2 border-stroke-color h-1/2 mb-20 rounded-br-[40px]"></div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CampSelect;
