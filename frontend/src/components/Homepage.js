import React, { useEffect, useState } from 'react';
import axios from "axios";



  
const Homepage = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    const bookingsResponse = await fetch('/bookings/2')
    const bookingsData = await bookingsResponse.json()

    setBookings(bookingsData)
    console.log(bookingsData)
  }



  

  return (
    <div class='items-center text-center'>
      <h1>Campsite Management System</h1>
      <h2>Bookings: Park 2</h2>
      { bookings && bookings.map(e => (
        <div class='items-center text-center'>
          <h3>Site Number {e.site_id} </h3>
          <p>Check in: {e.start_date} </p>
          <p>Check out: {e.end_date} </p>
        </div>
      ))}
    </div>

    
  );


};

export default Homepage;