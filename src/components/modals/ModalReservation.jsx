import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import MessageModal from "./MessageModal";

Modal.setAppElement("#root");

const ModalReservation = ({ isOpen, onClose }) => {
  const [resDate, setResDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState("12:00");
  const [tel, setTel] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleTimeChange = (e) => {
    setTime(e.target.value);
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
    if (time > "13:45" && time <= "19:00") {
      setModalMessage(
        "Nous sommes en pause de 14h00 à 19h00. Veuillez choisir un autre créneau."
      );
      setMessageModalOpen(true);
      setIsLoading(false);
      setTime("");
    } else if (time > "21:45") {
      setModalMessage("Nous ne prenons plus de réservation après 21h45");
      setMessageModalOpen(true);
      setTime("");
      setIsLoading(false);
    } else if (time < "12:00") {
      setModalMessage(
        "Nous ouvrons nos portes à partir de midi. Veuillez choisir un autre créneau"
      );
      setMessageModalOpen(true);
      setTime("");
      setIsLoading(false);
    } else {
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
            setModalMessage(
              "Votre réservation est bien prise en compte. Nous vous confirmerons par email dans les prochaines minutes"
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
      overlayClassName="fixed top-0 left-0  h-full w-screen xl:px-40 lg:px-40 md:px-20 sm:px-20 px-5 xl:py-20 lg:py-40   md:py-20 sm:py-20 py-16 z-40 text-left "
    >
      <MessageModal
        isOpen={messageModalOpen}
        message={modalMessage}
        onClose={() => setMessageModalOpen(false)}
      />
      <motion.div
        className="w-full h-full  rounded-2xl flex flex-col justify-around "
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
        <div className=" w-full flex flex-row justify-between items-center git xl:px-10 lg:px-10 md:px-10 sm:px-10 px-2  text-white">
          <h1 className=" xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl font-title-font text-white font-bold ">
            Réservation en ligne
          </h1>
          <button
            className=" px-4 py-2 bg-transparent text-white "
            onClick={onClose}
          >
            Fermer
          </button>
        </div>

        <form
          onSubmit={sendEmail}
          className=" flex flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-10 px-2 w-full h-[80%] overflow-scroll text-white "
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
                className="border-[1px] border-black h-[40px] mb-2 text-black focus:outline-none"
                required
              />
              <label>Date de la réservation</label>
              <DatePicker
                selected={resDate}
                value={resDate}
                onChange={(date) => setResDate(date)}
                className=" bg-white  border-black h-[40px]  mb-2 w-full flex flex-row text-black  focus:outline-none"
                required
              />
              <label>Heure d'arrivé</label>
              <input
                type="time"
                name="resTime"
                className=" bg-white  border-black border-[1px] h-[40px]  mb-2 text-black focus:outline-none "
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
                className="border-[1px] border-black h-[40px]  mb-2 text-black  focus:outline-none"
                required
              />
              <label>Email</label>
              <input
                placeholder="Votre E-mail"
                value={email}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border-[1px] border-black h-[40px]  mb-2 text-black focus:outline-none "
                required
              />
              <label>Télephone</label>
              <input
                placeholder="Un numéro pour vous joindre"
                value={tel}
                type="tel"
                name="phone"
                onChange={(e) => setTel(e.target.value)}
                className="border-[1px] border-black h-[40px]  mb-2 text-black focus:outline-none"
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
                className=" h-[70%] focus:outline-none  resize-none border-[1px] border-black  p-2 text-black "
              />
              <button
                type="submit"
                className=" border-2 border-black w-full m-auto h-[50px] bg-white hover:bg-black text-black hover:text-white mt-5 "
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
