import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const ReservationModal = ({ isOpen, onClose }) => {
  const [resDate, setResDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Nettoyage lorsque le composant est démonté
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    if (selectedTime > "13:45" && selectedTime <= "19:00") {
      alert(
        "Nous sommes en pause de 14h00 à 19h00. Veuillez choisir un autre créneau."
      );
      setTime("");
    } else if (selectedTime > "21:45") {
      alert("Nous ne prenons plus de réservation après cette heure");
      setTime("");
    } else if (selectedTime < "12:00") {
      alert("Nous ouvrons nos portes à partir de midi");
      setTime("");
    } else {
      setTime(selectedTime);
    }
  };

  const sendEmail = (e) => {
    const data = {
      date: resDate.toLocaleDateString(),
      name: name,
      number: numberOfGuest,
      email: email,
      message: message,
      phone: tel,
    };
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send("service_tm1wxto", "template_clc96rm", data, "I5f0O3BoNI4d1FJPP")
      .then(
        (result) => {
          console.log(result.text);
          setEmail("");
          setMessage("");
          setName("");
          setResDate("");
          setNumberOfGuest("");
          setTime("");
          setTel("");
          setIsLoading(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return isOpen ? (
    <AnimatePresence>
      <motion.div
        className=" fixed top-0 left-0 bg-test h-screen w-screen xl:px-40 lg:px-40 md:px-20 sm:px-20 px-10 xl:py-20 lg:py-20 md:py-20 sm:py-20 py-5 z-50 "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: "easeOut",
            duration: 0.45,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.75,
          transition: {
            ease: "easeIn",
            duration: 0.55,
          },
        }}
      >
        <div className="w-full h-full bg-myGrey rounded-2xl flex flex-col justify-around items-center  ">
          <div className=" w-full flex flex-row justify-between xl:px-10 lg:px-10 md:px-10 sm:px-10 px-2">
            <h1 className=" xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl font-title-font text-my-gold ">
              Réservation en ligne
            </h1>
            <button
              className="lg:text-2xl xl:text-2xl md:text-2xl sm:text-2xl text-lg "
              onClick={onClose}
            >
              X
            </button>
          </div>

          <form
            onSubmit={sendEmail}
            className=" flex flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-10 px-2 w-full h-[80%] overflow-scroll  "
          >
            <div className=" flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center h-[80%] ">
              <div className="flex  flex-col xl:w-[48%] lg:w-[48%] md:w-[48%] sm:w-[48%] w-full h-full  ">
                <label>Nom de la réservation</label>
                <input
                  placeholder="Votre Nom"
                  value={name}
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="border-[1px] border-black h-[40px] mb-2 "
                  required
                />
                <label>Date de la réservation</label>
                <DatePicker
                  selected={resDate}
                  value={resDate}
                  onChange={(date) => setResDate(date)}
                  className=" bg-white  border-black h-[40px]  mb-2 "
                  required
                />
                <label>Heure d'arrivé</label>
                <input
                  type="time"
                  name="resTime"
                  className=" bg-white  border-black border-[1px] h-[40px]  mb-2 "
                  value={time}
                  onChange={handleTimeChange}
                  required
                />

                <label className=" mb-0">Nombre de personne</label>
                <input
                  placeholder="Nombre de personnes"
                  value={numberOfGuest}
                  type="number"
                  name="number"
                  onChange={(e) => setNumberOfGuest(e.target.value)}
                  className="border-[1px] border-black h-[40px]  mb-2 "
                  required
                />
                <label>Email</label>
                <input
                  placeholder="Votre E-mail"
                  value={email}
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[1px] border-black h-[40px]  mb-2 "
                  required
                />
                <label>Télephone</label>
                <input
                  placeholder="Un numéro pour vous joindre"
                  value={tel}
                  type="tel"
                  name="phone"
                  onChange={(e) => setTel(e.target.value)}
                  className="border-[1px] border-black h-[40px]  mb-2 "
                  required
                />
              </div>
              <div className=" flex flex-col xl:w-[48%] lg:w-[48%] md:w-[48%] sm:w-[48%] w-full h-full ">
                <label className="text-base">Commentaires</label>
                <textarea
                  name="message"
                  placeholder="Une demande spéciale ? Laissez-nous un commentaire, nous ferrons au mieux pour vous satisfaire"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className=" h-[70%] focus:outline-none  resize-none border-[1px] border-black  p-2"
                />
                <button
                  type="submit"
                  className=" border-2 border-black w-full m-auto h-[50px] bg-myGrey hover:bg-my-gold mt-5 "
                >
                  {isLoading ? "En cours..." : "Envoyer"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default ReservationModal;
