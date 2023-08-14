
//Takes in sites from campselect.js
const SiteList = (props) => {
    
    return(
        <div className="bg-white flex-col w-screen">
                  
                  { props.sites.map((site) => (
                    <>
                    <h1 key={site.id}>{site.name} - $ {site.price}/night</h1>
                    <p onClick={() => handleBooking(site.id, arrivalDate, departureDate)}>Book now</p>
                    </>
                  ))}
                  
                </div>
    )

    
};

export default SiteList;