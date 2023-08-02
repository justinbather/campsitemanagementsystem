import React from "react";

const CampSelect = () => {
  return (
    <div className="bg-[#1E1E1E] h-screen flex items-center justify-center">
      <div className="bg-[#FFFFFF] w-[1024px] h-[800px] flex flex-col rounded-[40px]">
        <div>
          <h3 className="w-full text-center pt-5 text-3xl font-bold underline">
            Campsite Name
          </h3>
        </div>

        <div className="w-[1024px] h-[800px] flex rounded-[40px] gap-3">
          <div className=" border-stroke-color border-2 w-1/2 mt-5 mb-20 ml-10 mb- rounded-l-[40px]"></div>
          <div className="flex flex-col w-1/2 mr-10 rounded-r-[40px] gap-3">
            <div className="border-2 border-stroke-color h-1/2 mt-5 rounded-tr-[40px]"></div>
            <div className="border-2 border-stroke-color h-1/2 mb-20 rounded-br-[40px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampSelect;
