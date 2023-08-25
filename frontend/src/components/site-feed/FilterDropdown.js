import filterIcon from "../../assets/filter-icon.png"
import closeIcon from "../../assets/close-icon.png"
import { useState } from "react";

const FilterDropdown = () => {

    const [toggle, setToggle] = useState(false);

    const handleDropdownToggle = () => {
        setToggle(!toggle)
    }

return(
    <div className="h-1/2 flex w-full items-center justify-center px-5">
                  <div className="w-1/4 h-full flex flex-col">
                    <h3 className="font-bold text-sm text-left">Amenities</h3>
                    <ul className="flex-col gap-5 rounded-2xl items-center">
                      <li className="py-3 text-sm flex text-center">
                        <input
                          type="checkbox"
                          className="mx-1 text-center"
                          id="water"
                         
                        />
                        Water
                      </li>
                      <li className="py-3 text-sm flex">
                        <input
                          type="checkbox"
                          id="electricity"
                          className="mx-1"
                          
                        />
                        Electricity
                      </li>
                      <li className="py-3 text-sm flex">
                        <input
                          type="checkbox"
                          id="sewage"
                          className="mx-1"
                          
                        />
                        Sewage
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/4">
                    </div>
                    <div className="w-1/4 ">
                    </div>
                    <div className="w-1/4 ">
                    </div>
                </div>
)

};

export default FilterDropdown;