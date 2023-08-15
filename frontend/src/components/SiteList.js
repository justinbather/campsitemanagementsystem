import React, { useState, useEffect } from "react";
import axios from "axios";

//Takes in sites from campselect.js
const SiteList = (props) => {
const [images, setImages] = useState([]);

    

    const fetchImages = (siteId) => {
      axios.get(`/siteimage/${siteId}`)
      .then(res => { 
        const updatedImageData = [...images, res.data]

        setImages(updatedImageData)
      })
      .catch(err => {
        console.log(err)
      })
    }
    
    useEffect(() => {
      props.sites.forEach((site) => {
      
        fetchImages(site.id)
      })
    }, [props]) //Updates effect on prop change (adding)
    console.log(images)

    return(
        <div className="bg-white flex-col w-screen">
                  
                  { props.sites.map((site) => (
                    <>
                    <h1 key={site.id}>{site.id} - $ {site.price}/night</h1>
                    <p onClick={() => handleBooking(site.id, arrivalDate, departureDate)}>Book now</p>
                    <img src={site.photo}></img>
                    </>
                  ))}
                  
                </div>
    )

    
};

export default SiteList;