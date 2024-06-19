// BookingForm.js
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { validateBooking } from "./BookingUtils.js";

const BookingForm = ({
  booking,
  onCreate,
  onUpdate,
  onDelete,
  existingBookings,
}) => {
  const isEditMode = !!booking;

  const initialFormData = {
    title: "",
    start: "",
    end: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  /* const [title, setTitle] = useState(isEditMode ? booking.title : "");
  const [start, setStart] = useState(
    isEditMode ? format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm") : ""
  );
  const [end, setEnd] = useState(
    isEditMode ? format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm") : ""
  );
  */
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...formData,
        title: booking.title,
        start: format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm"),
        end: format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm"),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode]);

  const handleAction = (e) => {
    e.preventDefault();

    const startTime = new Date(formData.start);
    const endTime = new Date(formData.end);

    const validationError = validateBooking(
      startTime,
      endTime,
      existingBookings,
      booking
    );

    if (validationError) {
      alert(validationError);
      return;
    }
    console.log("FORMDATA", formData);
    const bookingData = {
      ...formData,
      start: startTime,
      end: endTime,
    };

    if (isEditMode) {
      onUpdate({ ...booking, ...bookingData });
    } else {
      onCreate(bookingData);
    }

    setFormData(initialFormData);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmed) {
      onDelete(booking.id);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleAction} className="form-booking">
      <h2>{isEditMode ? "Edit Booking" : "Create Booking"}</h2>
      <label>Booking Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        name="start"
        value={formData.start}
        onChange={handleChange}
        required
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        name="end"
        value={formData.end}
        onChange={handleChange}
        required
      />

      <button className="button">{isEditMode ? "Update" : "Save"}</button>
      {isEditMode && (
        <button type="button" onClick={handleDelete} className="button">
          Delete
        </button>
      )}
    </form>
  );
};

export default BookingForm;
