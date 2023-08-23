import SiteCard from "./SiteCard";
import placeholderImage from "../../assets/campsite-image.jpg";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const SiteResultsFeed = (props) => {
  const [selectedArrival, setSelectedArrival] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState([]);

  useEffect(() => {
    setSelectedArrival(props.initialArrival);

    setSelectedDeparture(props.initialDeparture);
    console.log(props.initialDeparture);
  }, [props]);

  const navigate = useNavigate();
  const handleClick = (siteId) => {
    console.log(selectedArrival);
    console.log(selectedDeparture);
    navigate(`../site/${siteId}/${selectedArrival}/${selectedDeparture}`);
  };

  return (
    <>
      <div className="flex justify-center px-20 py-14 gap-5">
        {props.sites.map((site) => (
          <div className="flex w-[20rem] h-[20rem] bg-base-100 drop-shadow-xl justify-center overflow-hidden rounded-xl hover:ring-4 ring-neutral-300">
            <img
              className="w-full h-full"
              alt="image"
              src={site.thumbnail}
              role="button"
              key={site.id}
              onClick={() => handleClick(site.id)}
            />
            <h1 className="text-lg text-center text-base-100 absolute bottom-0">
              Site {site.id} - ${site.price}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default SiteResultsFeed;
