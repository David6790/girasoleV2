import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "moment/locale/fr";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import moment from "moment";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import MessageModal from "./MessageModal";

Modal.setAppElement("#root");

const ModalReservation = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateTime, setDateTime] = useState(
    moment().set({ hour: 12, minute: 0 })
  );

  moment.locale("fr");

  const [tel, setTel] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChangeDateTime = (value) => {
    if (value) {
      setDateTime(value);
    } else {
      setDateTime(moment().set({ hour: 12, minute: 0 }));
    }
  };
  const handlePhoneChange = (e) => {
    const phoneNumber = parsePhoneNumberFromString(e.target.value, "FR"); // Ici, je spécifie 'FR' comme le pays par défaut. Vous pouvez ajuster cela en fonction de vos besoins.

    if (phoneNumber && phoneNumber.isValid()) {
      setTel(phoneNumber.formatInternational()); // formate au format international
    } else {
      setTel(e.target.value); // stocke la saisie de l'utilisateur si elle n'est pas encore valide
    }
  };

  const sendEmail = (e) => {
    const timeValue = dateTime.format("HH:mm");
    const validDateTime = moment.isMoment(dateTime)
      ? dateTime
      : moment(dateTime);
    const data = {
      resDate: validDateTime.format("DD-MM-YY"),
      resTime: validDateTime.format("HH:mm"),
      name: name,
      number: numberOfGuest,
      email: email,
      message: message,
      phone: tel,
    };

    e.preventDefault();
    setIsLoading(true);
    if (timeValue > "13:45" && timeValue <= "19:00") {
      setModalMessage(
        "Nous sommes en pause de 14h00 à 19h00. Veuillez choisir un autre créneau."
      );
      setMessageModalOpen(true);
      setIsLoading(false);
      setDateTime("");
    } else if (timeValue > "21:45") {
      setModalMessage("Nous ne prenons plus de réservation après 21h45");
      setMessageModalOpen(true);
      setDateTime("");
      setIsLoading(false);
    } else if (timeValue < "12:00") {
      setModalMessage(
        "Nous ouvrons nos portes à partir de midi. Veuillez choisir un autre créneau"
      );
      setMessageModalOpen(true);
      setDateTime("");
      setIsLoading(false);
    } else {
      emailjs
        .send("service_6j5qs7e", "template_clc96rm", data, "I5f0O3BoNI4d1FJPP")
        .then(
          (result) => {
            console.log(result.text);
            setEmail("");
            setMessage("");
            setName("");
            setDateTime("");
            setNumberOfGuest("");

            setTel("");
            setIsLoading(false);
            setModalMessage(
              "Votre réservation est bien prise en compte. Nous vous confirmerons par email ET par SMS dans les prochaines minutes"
            );
            setMessageModalOpen(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Réservation en ligne"
      className="w-full h-full bg-opacity-60 bg-my-gold backdrop-blur-md rounded-2xl flex flex-col justify-around items-center "
      overlayClassName="fixed top-0 left-0  h-full w-screen xl:px-40 lg:px-40 md:px-20 sm:px-20 px-5 xl:py-20 lg:py-40   md:py-20 sm:py-20 py-5 z-40 text-left bg-black bg-opacity-50 "
    >
      <MessageModal
        isOpen={messageModalOpen}
        message={modalMessage}
        onClose={() => setMessageModalOpen(false)}
      />
      <motion.div
        className="w-full h-full  rounded-2xl flex flex-col justify-around px-5   "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,

          transition: {
            ease: "easeOut",
            duration: 0.75,
          },
        }}
        exit={{
          opacity: 0,

          transition: {
            ease: "easeIn",
            duration: 0.85,
          },
        }}
      >
        <div className=" w-full flex flex-row justify-between items-center git xl:px-10 lg:px-10 md:px-10 sm:px-5 px-2  text-black h-[70px] mb-10  ">
          <img src="./img/logoWhite.png" alt="" className=" h-full" />
          <h1 className=" xl:text-3xl lg:text-3xl md:text-2xl  xl:block lg:block md:block sm:hidden hidden  font-title-font  font-bold text-white ">
            Réservation en ligne
          </h1>
          <button
            className=" px-4 py-2 bg-transparent text-white  "
            onClick={onClose}
          >
            Fermer
          </button>
        </div>

        <form
          onSubmit={sendEmail}
          className=" flex flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-2 px-2 w-full h-[100%] overflow-scroll text-white font-bold "
        >
          <div className=" flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center h-[80%] ">
            <div className="flex  flex-col xl:w-[48%] lg:w-[48%] md:w-[48%] sm:w-[48%] w-full h-full  ">
              <label className="text-white">Nom de la réservation</label>
              <input
                value={name}
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="  h-[40px] bg-transparent focus:outline-none border-b-[1px] px-2 mb-5 "
                required
              />
              <label className="text-white ">Nombre de personne</label>
              <input
                value={numberOfGuest}
                type="number"
                name="number"
                onChange={(e) => setNumberOfGuest(e.target.value)}
                className=" h-[40px]   focus:outline-none  bg-transparent border-b-[1px] px-2 mb-5"
                required
              />
              <label className="text-white">Date et heure</label>
              <Datetime
                locale="fr"
                value={dateTime}
                onChange={handleChangeDateTime}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "Sélectionnez la date et l'heure" }}
                timeConstraints={{ minutes: { step: 15 } }}
                required
                className="  h-[40px] flex flex-row justify-start items-center bg-transparent border-b-[1px] px-2 mb-5 "
              />

              <label className="text-white mb-1">Email</label>
              <input
                value={email}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-[40px]  mb-5  focus:outline-none bg-transparent border-b-[1px] px-2"
                required
              />
              <label className="text-white ">Télephone</label>
              <input
                value={tel}
                type="tel"
                name="phone"
                onChange={handlePhoneChange}
                className="  h-[40px]  mb-5  focus:outline-none bg-transparent border-b-[1px] px-2"
                required
              />
            </div>
            <div className=" flex flex-col xl:w-[48%] lg:w-[48%] md:w-[48%] sm:w-[48%] w-full h-full  ">
              <label className="text-white">Commentaires</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className=" h-[70%] focus:outline-none  resize-none   p-2  mb-5 bg-transparent border-b-[1px] px-2 "
              />
              <button
                type="submit"
                className="  w-full m-auto h-[40px]   mt-3 text-white text-xl font-title-font border-[1px] mb-10 "
              >
                {isLoading ? "En cours..." : "Envoyer"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default ModalReservation;
