import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import emailjs from "@emailjs/browser";

const ReservationModal = () => {
  const [resDate, setResDate] = useState(new Date());
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");

  const sendEmail = (e) => {
    const data = {
      date: resDate.toLocaleDateString(),
      name: name,
      number: numberOfGuest,
      email: email,
      message: message,
    };
    e.preventDefault();

    emailjs
      .send("service_tm1wxto", "template_clc96rm", data, "I5f0O3BoNI4d1FJPP")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className=" fixed top-0 left-0 bg-test h-screen w-screen px-40   py-20 z-10">
      <div className="w-full h-full bg-myGrey rounded-2xl ">
        <form onSubmit={sendEmail} className=" flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            onChange={(e) => setName(e.target.value)}
          />
          <DatePicker
            selected={resDate}
            value={resDate}
            onChange={(date) => setResDate(date)}
            className=" bg-red-300 h-[300px]"
          />
          <label>Nombre de personne</label>
          <input
            type="number"
            name="number"
            onChange={(e) => setNumberOfGuest(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
