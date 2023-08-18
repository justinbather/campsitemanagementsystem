import SiteCard from "./SiteCard";
import placeholderImage from "../../assets/campsite-image.jpg";
import { useNavigate } from "react-router-dom";

const SiteResultsFeed = (props) => {
      const navigate = useNavigate()
        const handleClick = (siteId) => {
                navigate(`../site/${siteId}`)
        }
      
        return (
            <>
            <div className="flex justify-center px-40 pt-24 gap-5">
            {props.sites.map((site) => 
                
                <div className="flex w-[20rem] h-[20rem] bg-base-100 drop-shadow-xl justify-center overflow-hidden rounded-xl hover:ring-4 ring-neutral-300">
                
                <img className="w-full h-full"alt="image" src={placeholderImage} role="button" onClick={() => handleClick(site.id)} />
                <h1 className="text-lg text-center text-base-100 absolute bottom-0">Site {site.id} - ${site.price}</h1>
               
                </div>
                
            )}
            </div>
                
                
                </>
            
        )



}

export default SiteResultsFeed;