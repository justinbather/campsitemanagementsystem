import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import link_icon from "../assets/link_icon.svg";
import tent_icon from "../assets/tent.png";
import reset_icon from "../assets/reset_icon.svg";
import adjust_icon from "../assets/adjust_icon.svg";

const CampSelect = () => {
  const [campsiteName, setCampsiteName] = useState("Campsite Name");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const siteTypeOptions = ["Back in", "Pull Through"];
  const trailerTypeOptions = [
    "Motorhome",
    "Tent",
    "Pop-Up",
    "5th-Wheel",
    "Travel Trailer",
  ];
  const amenities = ["Sewer", "Water", "30-Amp", "50-Amp", "Wi-Fi", "Pets"];

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
                    label=""
                    format="YYYY/MM/DD"
                    value={arrivalDate}
                    defaultValue={arrivalDate}
                    slotProps={{
                      textField: {
                        helperText: "YYYY/MM/DD",
                      },
                    }}
                    onChange={(arrivalDate) => {
                      setArrivalDate(arrivalDate);
                      console.log(dayjs(arrivalDate.$d).format("YYYY-MM-DD"));
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm pl-3 pb-1">Departure*</h3>
                  <DatePicker
                    label=""
                    format="YYYY/MM/DD"
                    value={departureDate}
                    onChange={(departureDate) => {
                      setDepartureDate(departureDate);
                      console.log(dayjs(departureDate.$d).format("YYYY-MM-DD"));
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
                  <Dropdown options={siteTypeOptions} className="" />
                </div>
                <div className="pt-3 px-5">
                  <h3 className="font-bold text-sm pl-3 pb-1">Trailer Type</h3>
                  <Dropdown options={trailerTypeOptions} className="" />
                </div>
                <div className="h-1/2 flex w-full items-center px-5">
                  <div className="w-3/5 flex flex-col">
                    <h3 className="font-bold text-sm pl-3 pb-1">Amenities</h3>
                    <ul className="columns-2 flex-col bg-form-color gap-0 rounded-2xl items-center">
                      {amenities.map(function (amenities, i) {
                        return (
                          <li className="py-3 pl-3 text-sm flex" key={i}>
                            <input type="checkbox" className="mx-1 " />
                            {amenities}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
