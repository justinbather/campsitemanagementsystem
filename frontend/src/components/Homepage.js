import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

const Homepage = () => {
  const [bookings, setBookings] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMade, setPaymentMade] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  //Grab data from booking api to list in html
  let getData = async () => {
    const bookingsResponse = await axios.get("/bookings/2");
    const bookingsData = bookingsResponse.data;

    setBookings(bookingsData);
    console.log(bookingsData);
  };
  // Upon submission of form, post data and set message to show completion in html
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/bookings/2",
        {
          site_id: siteId,
          start_date: startDate,
          end_date: endDate,
          payment_made: paymentMade,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const bookingsResponse = await axios.get("/bookings/2"); // fetch new data to list the posted data
      const bookingsData = await bookingsResponse.data();

      setBookings(bookingsData);
      setSiteId("");
      setStartDate("");
      setEndDate("");
      setPaymentMade(false);
      setMessage("Your booking has been completed");
    } catch (err) {
      setMessage("An error occured");
    }
  };

  return (
    <div className="items-center text-center">
      <h1>Campsite Management System</h1>
      <h2>Bookings: Park 2</h2>
      {bookings &&
        bookings.map((e) => (
          <div className="items-center text-center">
            <h3>Site Number {e.site_id} </h3>
            <p>Check in: {e.start_date} </p>
            <p>Check out: {e.end_date} </p>
          </div>
        ))}

      <h1 className="py-10">Create a new Booking</h1>
      <form
        method="post"
        id="newBookingForm"
        onSubmit={handleSubmit}
        className="py-20"
      >
        <input
          type="text"
          placeholder="Site"
          id="site_id"
          onChange={(e) => setSiteId(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Start Date"
          id="start_date"
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="End Date"
          id="end_date"
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        <label htmlFor="payment_made">Payment made?</label>
        <input
          type="checkbox"
          id="payment_made"
          name="payment_made"
          onChange={(e) => setPaymentMade(e.target.value)}
        ></input>
        <button type="submit" className="outline">
          Submit Booking
        </button>
      </form>
      <div className="messsage">{message ? <p>{message}</p> : null} </div>
    </div>
  );
};

export default Homepage;
