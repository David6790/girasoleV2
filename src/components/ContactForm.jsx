import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import MessageModal from "./modals/MessageModal";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        "service_6j5qs7e",
        "template_fk2qnmh",
        form.current,
        "TlcoR3tgd_o9uLj7o"
      )
      .then(
        (result) => {
          form.current.reset();
          setIsLoading(false);
          setModalMessage("Votre message a été envoyé avec succès!");
          setIsModalOpen(true);
        },
        (error) => {
          console.log(error.text);
          setModalMessage("Une erreur s'est produite, merci de réessayer");
          setIsModalOpen(true);
        }
      );
  };
  return (
    <>
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
      <form
        className="xl:w-2/3 lg:w-2/3 md:w-full sm:w-full w-full h-full text-black flex flex-col justify-start px-5"
        ref={form}
        onSubmit={sendEmail}
      >
        <h1 className=" text-3xl mb-10 font-title-font">
          Contactez
          <span className=" text-my-gold font-title-font">-Nous : </span>
        </h1>
        <label className="mb-2">Votre Nom & Prénom:</label>
        <input
          type="text"
          name="name"
          className=" px-5 focus:outline-none bg-transparent border-b-[1px] border-my-gold mb-5"
          required
        />
        <label className="mb-2">Votre E-mail:</label>
        <input
          type="email"
          name="email"
          className=" px-5 focus:outline-none bg-transparent border-b-[1px] border-my-gold mb-5"
          required
        />
        <label className="mb-2">Votre N° de téléphone:</label>
        <input
          type="tel"
          name="phone"
          className=" px-5 focus:outline-none bg-transparent border-b-[1px] border-my-gold mb-5"
          required
        />
        <label className="mb-2">Votre demande:</label>
        <textarea
          type="tel"
          name="message"
          className=" px-5 focus:outline-none bg-transparent border-b-[1px] border-my-gold mb-5"
          required
        />
        <button
          type="submit"
          name="valider"
          className=" w-1/2 m-auto border-[1px] border-my-gold py-3 text-xl"
        >
          {isLoading ? "En cours..." : "Envoyer"}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
