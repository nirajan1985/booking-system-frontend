import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches bookings from the API and transforms the data to the correct format.
 *
 * @return {Promise} A promise that resolves to the data returned by the API.
 */
const fetchBookings = async () => {
  const response = await axios.get("http://localhost:8080/api/bookings");
  const bookings = response.data.data;
  //console.log(bookings);
  return bookings.map((booking) => {
    return {
      id: booking.id,
      title: booking.bookingTitle, // Replace this with actual title, if available
      start: booking.startTime,
      end: booking.endTime,
    };
  });
};

export const useBooking = () => {
  return useQuery(["bookings"], fetchBookings);
};
