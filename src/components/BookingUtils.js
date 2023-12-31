export function validateBooking(startTime, endTime, existingBookings, booking) {
  // Check if the booking falls on a weekday (Monday to Friday)
  if (startTime.getDay() === 0 || startTime.getDay() === 6) {
    return "Bookings are allowed only during weekdays (Monday to Friday).";
  }

  // Check if the booking starts or ends before 7 AM or after 5 PM
  if (
    startTime.getHours() < 7 ||
    endTime.getHours() > 17 ||
    (endTime.getHours() === 17 && endTime.getMinutes() > 0)
  ) {
    return "Bookings are allowed only during working hours (7 AM to 5 PM).";
  }

  // Calculate the duration of the booking in milliseconds
  const bookingDuration = endTime.getTime() - startTime.getTime();

  // Check if the booking duration exceeds 3 hours
  if (bookingDuration > 3 * 60 * 60 * 1000) {
    return "Maximum booking duration is 3 hours per day.";
  }

  // Check for overlap with existing bookings
  const overlap = existingBookings.some((existingBooking) => {
    if (existingBooking.id === booking?.id) {
      // Skip the current booking when checking for overlap in edit mode
      return false;
    }
    const existingStartTime = new Date(existingBooking.start);
    const existingEndTime = new Date(existingBooking.end);

    return (
      (startTime >= existingStartTime && startTime < existingEndTime) ||
      (endTime > existingStartTime && endTime <= existingEndTime) ||
      (startTime <= existingStartTime && endTime >= existingEndTime)
    );
  });

  if (overlap) {
    return "The room is already booked for the specified time range.";
  }

  return null; // No validation error
}
