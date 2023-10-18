// BookingForm.js
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { validateBooking } from "./BookingUtils.js";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const BookingForm = ({
  booking,
  onCreate,
  onUpdate,
  onDelete,
  existingBookings,
}) => {
  const isEditMode = !!booking;

  const [title, setTitle] = useState(isEditMode ? booking.title : "");
  const [start, setStart] = useState(
    isEditMode ? format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm") : ""
  );
  const [end, setEnd] = useState(
    isEditMode ? format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm") : ""
  );
  useEffect(() => {
    if (isEditMode) {
      setTitle(booking.title);
      setStart(format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm"));
      setEnd(format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm"));
    } else {
      setTitle("");
      setStart("");
      setEnd("");
    }
  }, [isEditMode]);

  const toast = useRef(null);

  const handleAction = (e) => {
    e.preventDefault();

    const startTime = new Date(start);
    const endTime = new Date(end);

    const validationError = validateBooking(
      startTime,
      endTime,
      existingBookings,
      booking
    );

    if (validationError) {
      //alert(validationError);
      toast.current.show({ severity: "error", detail: validationError });
      return;
    }

    const bookingData = {
      title,
      start,
      end,
    };

    if (isEditMode) {
      onUpdate({ ...booking, ...bookingData });
    } else {
      onCreate(bookingData);
    }

    setTitle("");
    setStart("");
    setEnd("");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmed) {
      onDelete(booking.id);
    }
  };

  return (
    <>
      <form onSubmit={handleAction} className="form-booking">
        <h2>{isEditMode ? "Edit Booking" : "Create Booking"}</h2>

        <label>Booking Title:</label>
        <div className="card flex justify-content-center">
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <label>Start Time:</label>
        <div className="card flex justify-content-center">
          <Calendar
            value={start ? new Date(start) : null}
            onChange={(e) =>
              setStart(e.value ? format(e.value, "yyyy-MM-dd'T'HH:mm") : "")
            }
            showIcon
            showTime
            hourFormat="24"
            required
          />
        </div>

        <label>End Time:</label>
        <div className="card flex justify-content-center">
          <Calendar
            value={end ? new Date(end) : null}
            onChange={(e) =>
              setEnd(e.value ? format(e.value, "yyyy-MM-dd'T'HH:mm") : "")
            }
            showIcon
            showTime
            hourFormat="24"
            required
          />
        </div>
        <Toast ref={toast} />
        {/* <button className="button">{isEditMode ? "Update" : "Save"}</button> */}

        <div className="card flex justify-content-center">
          <Button
            className="button"
            label={isEditMode ? "Update" : "Save"}
            size="large"
          />
        </div>
        {/* {isEditMode && (
          <button type="button" onClick={handleDelete} className="button">
            Delete
          </button>
        )} */}
        {isEditMode && (
          <Button
            type="button"
            label="Delete"
            onClick={handleDelete}
            className="button"
          />
        )}
      </form>
    </>
  );
};

export default BookingForm;
