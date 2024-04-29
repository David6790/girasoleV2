import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "moment/locale/fr";
import moment from "moment";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import MessageModal from "./MessageModal";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useSelector } from "react-redux";
import { occupationStatus } from "../../features/occupationSlice";

Modal.setAppElement("#root");

const ModalReservation = ({ isOpen, onClose }) => {
  const timeSlots = useMemo(
    () => [
      "12:00",
      "12:15",
      "12:30",
      "12:45",
      "13:00",
      "13:15",
      "13:30",
      "13:45",
      "19:00",
      "19:15",
      "19:30",
      "19:45",
      "20:00",
      "20:15",
      "20:30",
      "21:00",
      "21:15",
      "21:30",
      "21:45",
    ],
    []
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateTime, setDateTime] = useState(moment());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  let ID = crypto.randomUUID();
  const [tel, setTel] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [hasModalBeenShown, setHasModalBeenShown] = useState(false);

  const occStatus = useSelector(occupationStatus);

  moment.locale("fr");

  const isDateMatchingEffectDate = (selectedDate, effectDate) => {
    const parsedEffectDate = moment(effectDate, "DD-MM-YY");
    return selectedDate.isSame(parsedEffectDate, "day");
  };

  const handleMessageModalClose = () => {
    setMessageModalOpen(false);
    setHasModalBeenShown(true);
  };

  const handleModalClose = () => {
    onClose();
    setHasModalBeenShown(false);
  };

  const handleTimeSelection = (e) => {
    setSelectedTime(e.target.value);
    const isValentinesDay = dateTime.isSame(
      moment("2024-02-14", "YYYY-MM-DD"),
      "day"
    );
    const valentinesDayTimeSlots = [
      "19:00",
      "19:15",
      "19:30",
      "19:45",
      "20:00",
      "20:15",
      "20:30",
    ];

    if (isValentinesDay && valentinesDayTimeSlots.includes(e.target.value)) {
      setModalMessage(
        "Chers clients,\nNous tenons à vous informer qu'à l'occasion de la soirée de la Saint-Valentin, toutes nos tables pour deux sont désormais réservées. Il nous reste uniquement des grandes tables rondes, conçues pour accueillir plusieurs convives. Si vous souhaitez procéder à une réservation, veuillez noter que vous pourriez partager votre table avec d'autres personnes. Nous vous remercions de votre compréhension et nous nous réjouissons de vous offrir une soirée mémorable."
      );
      setMessageModalOpen(true);
    }
    const dateOfEffect = occStatus != null ? occStatus[0].dateOfEffect : "";
    const dateOfEffect2 = occStatus != null ? occStatus[1].dateOfEffect : "";
    const dateOfEffect3 = occStatus != null ? occStatus[2].dateOfEffect : "";
    const dateOfEffect4 = occStatus != null ? occStatus[3].dateOfEffect : "";
    const dateOfEffect5 = occStatus != null ? occStatus[4].dateOfEffect : "";
    const dateOfEffect6 = occStatus != null ? occStatus[5].dateOfEffect : "";
    const effectDateMatches = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect)
      : "";
    const effectDateMatches2 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect2)
      : "";

    const effectDateMatches3 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect3)
      : "";
    const effectDateMatches4 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect4)
      : "";
    const effectDateMatches5 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect5)
      : "";
    const effectDateMatches6 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect6)
      : "";

    if (
      (occStatus != null &&
        occStatus[0].occupationStatus === "freeTable21" &&
        effectDateMatches) ||
      (occStatus != null &&
        occStatus[1].occupationStatus === "freeTable21" &&
        effectDateMatches2) ||
      (occStatus != null &&
        occStatus[2].occupationStatus === "freeTable21" &&
        effectDateMatches3) ||
      (occStatus != null &&
        occStatus[3].occupationStatus === "freeTable21" &&
        effectDateMatches4) ||
      (occStatus != null &&
        occStatus[4].occupationStatus === "freeTable21" &&
        effectDateMatches5) ||
      (occStatus != null &&
        occStatus[5].occupationStatus === "freeTable21" &&
        effectDateMatches6)
    ) {
      if (["19:00"].includes(e.target.value)) {
        setModalMessage(
          "Nous avons beaucoup de demandes pour ce soir. Afin de satisfaire un maximum de clients, veuillez noter que la table doit être libérée pour 21h00."
        );
        setMessageModalOpen(true);
      }
    }
  };

  useEffect(() => {
    const dateOfEffect = occStatus != null ? occStatus[0].dateOfEffect : "";
    const dateOfEffect1 = occStatus != null ? occStatus[1].dateOfEffect : "";
    const dateOfEffect2 = occStatus != null ? occStatus[2].dateOfEffect : "";
    const dateOfEffect3 = occStatus != null ? occStatus[3].dateOfEffect : "";
    const dateOfEffect4 = occStatus != null ? occStatus[4].dateOfEffect : "";
    const dateOfEffect5 = occStatus != null ? occStatus[5].dateOfEffect : "";
    const effectDateMatches = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect)
      : "";
    const effectDateMatches2 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect1)
      : "";

    const effectDateMatches3 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect2)
      : "";
    const effectDateMatches4 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect3)
      : "";
    const effectDateMatches5 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect4)
      : "";
    const effectDateMatches6 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect5)
      : "";

    const isValentinesDay = dateTime.isSame(
      moment("2024-02-14", "YYYY-MM-DD"),
      "day"
    );
    let newTimeSlots = [...timeSlots];

    // Gestion des créneaux horaires en fonction de occupationStatus
    if (occStatus != null) {
      if (
        (occStatus[0].occupationStatus === "service1Complet" &&
          effectDateMatches) ||
        (occStatus[1].occupationStatus === "service1Complet" &&
          effectDateMatches2) ||
        (occStatus[2].occupationStatus === "service1Complet" &&
          effectDateMatches3) ||
        (occStatus[3].occupationStatus === "service1Complet" &&
          effectDateMatches4) ||
        (occStatus[4].occupationStatus === "service1Complet" &&
          effectDateMatches5) ||
        (occStatus[5].occupationStatus === "service1Complet" &&
          effectDateMatches6)
      ) {
        newTimeSlots = newTimeSlots.filter(
          (slot) =>
            ![
              "19:00",
              "19:15",
              "19:30",
              "19:45",
              "20:00",
              "20:15",
              "20:30",
              "20:45",
            ].includes(slot)
        );
      } else if (
        (occStatus[0].occupationStatus === "freeTable21" &&
          effectDateMatches) ||
        (occStatus[1].occupationStatus === "freeTable21" &&
          effectDateMatches2) ||
        (occStatus[2].occupationStatus === "freeTable21" &&
          effectDateMatches3) ||
        (occStatus[3].occupationStatus === "freeTable21" &&
          effectDateMatches4) ||
        (occStatus[4].occupationStatus === "freeTable21" &&
          effectDateMatches5) ||
        (occStatus[5].occupationStatus === "freeTable21" && effectDateMatches6)
      ) {
        newTimeSlots = newTimeSlots.filter(
          (slot) =>
            ![
              "19:15",
              "19:30",
              "19:45",
              "20:00",
              "20:15",
              "20:30",
              "20:45",
              "21:00",
            ].includes(slot)
        );
      } else if (
        (occStatus[0].occupationStatus === "fullComplet" &&
          effectDateMatches) ||
        (occStatus[1].occupationStatus === "fullComplet" &&
          effectDateMatches2) ||
        (occStatus[2].occupationStatus === "fullComplet" &&
          effectDateMatches3) ||
        (occStatus[3].occupationStatus === "fullComplet" &&
          effectDateMatches4) ||
        (occStatus[4].occupationStatus === "fullComplet" &&
          effectDateMatches5) ||
        (occStatus[5].occupationStatus === "fullComplet" && effectDateMatches6)
      ) {
        newTimeSlots = newTimeSlots.filter((slot) => slot < "19:00");
      } else if (isValentinesDay) {
        newTimeSlots = newTimeSlots.filter((slot) => slot <= "20:30");
      } else if (
        (occStatus[0].occupationStatus === "service2Complet" &&
          effectDateMatches) ||
        (occStatus[1].occupationStatus === "service2Complet" &&
          effectDateMatches2) ||
        (occStatus[2].occupationStatus === "service2Complet" &&
          effectDateMatches3) ||
        (occStatus[3].occupationStatus === "service2Complet" &&
          effectDateMatches4) ||
        (occStatus[4].occupationStatus === "service2Complet" &&
          effectDateMatches5) ||
        (occStatus[5].occupationStatus === "service2Complet" &&
          effectDateMatches6)
      ) {
        newTimeSlots = newTimeSlots.filter(
          (slot) =>
            ![
              "19:15",
              "19:30",
              "19:45",
              "20:00",
              "20:15",
              "20:30",
              "20:45",
              "21:00",
              "21:15",
              "21:30",
              "21:45",
            ].includes(slot)
        );
      }
    }

    setAvailableTimeSlots(newTimeSlots);

    // Gestion des messages en fonction de occupationStatus
    if (!hasModalBeenShown) {
      if (
        (occStatus != null &&
          occStatus[0].occupationStatus === "service1Complet" &&
          effectDateMatches) ||
        (occStatus != null &&
          occStatus[1].occupationStatus === "service1Complet" &&
          effectDateMatches2) ||
        (occStatus != null &&
          occStatus[2].occupationStatus === "service1Complet" &&
          effectDateMatches3) ||
        (occStatus != null &&
          occStatus[3].occupationStatus === "service1Complet" &&
          effectDateMatches4) ||
        (occStatus != null &&
          occStatus[4].occupationStatus === "service1Complet" &&
          effectDateMatches5) ||
        (occStatus != null &&
          occStatus[5].occupationStatus === "service1Complet" &&
          effectDateMatches6)
      ) {
        setModalMessage(
          "Le premier service du restaurant est complet pour ce soir. Nous ne pouvons prendre des réservations qu'à partir de 21h15. Pour un autre jour, tous les créneaux restent disponibles."
        );
        setMessageModalOpen(true);
      } else if (
        (occStatus != null &&
          occStatus[0].occupationStatus === "fullComplet" &&
          effectDateMatches) ||
        (occStatus != null &&
          occStatus[1].occupationStatus === "fullComplet" &&
          effectDateMatches2) ||
        (occStatus != null &&
          occStatus[2].occupationStatus === "fullComplet" &&
          effectDateMatches3) ||
        (occStatus != null &&
          occStatus[3].occupationStatus === "fullComplet" &&
          effectDateMatches4) ||
        (occStatus != null &&
          occStatus[4].occupationStatus === "fullComplet" &&
          effectDateMatches5) ||
        (occStatus != null &&
          occStatus[5].occupationStatus === "fullComplet" &&
          effectDateMatches6)
      ) {
        setModalMessage(
          "Le restaurant est complet pour ce soir. Pour le midi ou pour une autre date, vous pouvez réserver sans problème."
        );
        setMessageModalOpen(true);
      } else if (
        (occStatus != null &&
          occStatus[0].occupationStatus === "service2Complet" &&
          effectDateMatches) ||
        (occStatus != null &&
          occStatus[1].occupationStatus === "service2Complet" &&
          effectDateMatches2) ||
        (occStatus != null &&
          occStatus[2].occupationStatus === "service2Complet" &&
          effectDateMatches3) ||
        (occStatus != null &&
          occStatus[3].occupationStatus === "service2Complet" &&
          effectDateMatches4) ||
        (occStatus != null &&
          occStatus[4].occupationStatus === "service2Complet" &&
          effectDateMatches5) ||
        (occStatus != null &&
          occStatus[5].occupationStatus === "service2Complet" &&
          effectDateMatches6)
      ) {
        setModalMessage(
          "Le 2e service du restaurant est complet pour ce soir. Nous ne pouvons prendre des réservations qu'à 19h, 19h15 ou 19h30. Notez que la table doit être libérée pour 21h. \nPour un autre jour, tous les créneaux restent disponibles."
        );
        setMessageModalOpen(true);
      }
    }
  }, [dateTime, timeSlots, occStatus, hasModalBeenShown]);

  const dateOfEffect = occStatus != null ? occStatus[0].dateOfEffect : "";
  const dateOfEffect2 = occStatus != null ? occStatus[1].dateOfEffect : "";
  const dateOfEffect3 = occStatus != null ? occStatus[2].dateOfEffect : "";
  const dateOfEffect4 = occStatus != null ? occStatus[3].dateOfEffect : "";
  const dateOfEffect5 = occStatus != null ? occStatus[4].dateOfEffect : "";
  const dateOfEffect6 = occStatus != null ? occStatus[5].dateOfEffect : "";
  const effectDateMatches = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect)
    : "";
  const effectDateMatches2 = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect2)
    : "";
  const effectDateMatches3 = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect3)
    : "";
  const effectDateMatches4 = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect4)
    : "";
  const effectDateMatches5 = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect5)
    : "";
  const effectDateMatches6 = dateOfEffect
    ? isDateMatchingEffectDate(dateTime, dateOfEffect6)
    : "";
  const handleChangeDateTime = (value) => {
    if (value) {
      setDateTime(value);
    } else {
      setDateTime(moment());
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = parsePhoneNumberFromString(e.target.value, "FR");

    if (phoneNumber && phoneNumber.isValid()) {
      setTel(phoneNumber.formatInternational());
    } else {
      setTel(e.target.value);
    }
  };
  // const disablePastDt = (currentDate) => {
  //   const today = moment().startOf("day");
  //   return currentDate.isSameOrAfter(today);
  // };
  const disablePastDt = (currentDate) => {
    const today = moment().startOf("day");
    const firstMay = moment().month(4).date(1).startOf("day"); // Mois 4 car janvier est 0 dans moment.js
    return (
      currentDate.isSameOrAfter(today) && !currentDate.isSame(firstMay, "day")
    );
  };

  const isTimeValidForSelectedDate = (selectedTime, selectedDate) => {
    const now = moment();
    if (selectedDate.isSame(now, "day")) {
      const selectedHour = parseInt(selectedTime.split(":")[0]);
      const selectedMinute = parseInt(selectedTime.split(":")[1]);
      return (
        now.hour() < selectedHour ||
        (now.hour() === selectedHour && now.minute() <= selectedMinute)
      );
    }
    return true;
  };

  const findOccupationStatusForSelectedDate = (selectedDate, occStatus) => {
    // Formater la date sélectionnée pour correspondre au format utilisé dans occStatus
    const formattedSelectedDate = selectedDate.format("DD-MM-YY");
    console.log(formattedSelectedDate);
    // Trouver le statut dans occStatus qui correspond à la date sélectionnée
    const status = occStatus
      ? occStatus.find(
          (status) => status.dateOfEffect === formattedSelectedDate
        )
      : "RAS";
    // Retourner le statut d'occupation si trouvé, sinon "Not Available"
    console.log(status);
    return status ? status.occupationStatus : "RAS";
  };

  const occupationStatusForSelectedDate = findOccupationStatusForSelectedDate(
    dateTime,
    occStatus
  );

  const sendEmail = async (e) => {
    e.preventDefault();

    const validDateTime = moment.isMoment(dateTime)
      ? dateTime
      : moment(dateTime);
    validDateTime
      .hour(parseInt(selectedTime.split(":")[0]))
      .minute(parseInt(selectedTime.split(":")[1]));

    const isValentinDay = validDateTime.isSame(
      moment("14-02-2024", "DD-MM-YYYY"),
      "day"
    );
    const isTime20or2030 =
      selectedTime === "20:30" ||
      selectedTime === "20:15" ||
      selectedTime === "20:00" ||
      selectedTime === "19:45" ||
      selectedTime === "19:30" ||
      selectedTime === "19:15" ||
      selectedTime === "19:00";

    const formattedResDate2 = moment(dateTime).format("dddd DD MMMM YYYY");

    const data = {
      resDate: validDateTime.format("DD-MM-YY"),
      resTime: selectedTime,
      name: name,
      number: numberOfGuest,
      email: email,
      message: message,
      phone: tel,
      ID: ID,
      Source: "Stéphane",
      typeEvent: "Nouvel-an",
      formatData: formattedResDate2,
      msgClient:
        (occStatus != null &&
          occStatus[0].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches) ||
        (occStatus != null &&
          occStatus[1].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches2) ||
        (occStatus != null &&
          occStatus[2].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches3) ||
        (occStatus != null &&
          occStatus[3].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches4) ||
        (occStatus != null &&
          occStatus[4].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches5) ||
        (occStatus != null &&
          occStatus[5].occupationStatus === "freeTable21" &&
          selectedTime === "19:00" &&
          effectDateMatches6)
          ? "Pour une bonne organisation ce soir là, veuillez noter que la table doit être libérée pour 21h00."
          : "",
      msgClient2:
        isValentinDay && selectedTime >= "19:00"
          ? "Nous tenons à vous informer qu'à l'occasion de la soirée de la Saint-Valentin, toutes nos tables pour deux sont désormais réservées. Il nous reste uniquement des grandes tables rondes, conçues pour accueillir plusieurs convives. Si vous souhaitez procéder à une réservation, veuillez noter que vous pourriez partager votre table avec d'autres personnes. Nous vous remercions de votre compréhension et nous nous réjouissons de vous offrir une soirée mémorable.\n Notez également que le soir de la Saint Valentin, nous ne proposons que le menu saint valentin."
          : "",
      msgClient3:
        (occStatus != null &&
          occStatus[0].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches) ||
        (occStatus != null &&
          occStatus[1].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches2) ||
        (occStatus != null &&
          occStatus[2].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches3) ||
        (occStatus != null &&
          occStatus[3].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches4) ||
        (occStatus != null &&
          occStatus[4].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches5) ||
        (occStatus != null &&
          occStatus[5].occupationStatus === "service2Complet" &&
          (selectedTime === "19:00" ||
            selectedTime === "19:15" ||
            selectedTime === "19:30") &&
          effectDateMatches6)
          ? "Pour une bonne organisation ce soir là, veuillez noter que la table doit être libérée pour 21h00."
          : "",
    };

    if (!isTimeValidForSelectedDate(selectedTime, dateTime)) {
      setModalMessage("Veuillez choisir une heure future.");
      setMessageModalOpen(true);
      return;
    }

    setIsLoading(true);
    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const regularData = {
      ID: ID,
      Name: name,
      NumberGuest: numberOfGuest,
      Date: validDateTime.format("DD-MM-YY"),
      Time: selectedTime,
      Comment: message,
      Email: email,
      Phone: `n°${tel}`,
      Status: "Pending",
      Acompte: "Pas Demandé",
      timeStamp: timestamp,
      Source: "INTERNET",
      OccupationStatus: occupationStatusForSelectedDate,
      freeTable21h:
        (occStatus != null &&
          (occStatus[0].occupationStatus === "freeTable21" ||
            occStatus[0].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches) ||
        (occStatus != null &&
          (occStatus[1].occupationStatus === "freeTable21" ||
            occStatus[1].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches2) ||
        (occStatus != null &&
          (occStatus[2].occupationStatus === "freeTable21" ||
            occStatus[2].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches3) ||
        (occStatus != null &&
          (occStatus[3].occupationStatus === "freeTable21" ||
            occStatus[3].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches4) ||
        (occStatus != null &&
          (occStatus[4].occupationStatus === "freeTable21" ||
            occStatus[4].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches5) ||
        (occStatus != null &&
          (occStatus[5].occupationStatus === "freeTable21" ||
            occStatus[5].occupationStatus === "service2Complet") &&
          selectedTime === "19:00" &&
          effectDateMatches6)
          ? "Client prévenu"
          : "Pas demandé",
    };

    const isValentinReservation = isValentinDay && isTime20or2030;
    const sheetURL = isValentinReservation
      ? "https://sheetdb.io/api/v1/97lppk2d46b57?sheet=valentin"
      : "https://sheetdb.io/api/v1/97lppk2d46b57";

    const dataToSend = regularData;

    if (
      (occStatus != null &&
        occStatus[0].occupationStatus === "fullComplet" &&
        effectDateMatches) ||
      (occStatus != null &&
        occStatus[1].occupationStatus === "fullComplet" &&
        effectDateMatches2) ||
      (occStatus != null &&
        occStatus[2].occupationStatus === "fullComplet" &&
        effectDateMatches3) ||
      (occStatus != null &&
        occStatus[3].occupationStatus === "fullComplet" &&
        effectDateMatches4) ||
      (occStatus != null &&
        occStatus[4].occupationStatus === "fullComplet" &&
        effectDateMatches5) ||
      (occStatus != null &&
        occStatus[5].occupationStatus === "fullComplet" &&
        effectDateMatches6)
    ) {
      alert(
        "Le restaurant est complet pour ce soir. Nous nous excusons pour le désagrément."
      );
    } else {
      try {
        await fetch(sheetURL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        emailjs
          .send(
            "service_6j5qs7e",
            "template_clc96rm",
            data,
            "TlcoR3tgd_o9uLj7o"
          )
          .then(
            (result) => {
              console.log(result.text);
              setEmail("");
              setMessage("");
              setName("");
              setDateTime(moment());
              setNumberOfGuest("");
              setSelectedTime("");
              setTel("");
              setSelectedTime("");
              setIsLoading(false);
              setModalMessage(
                "Votre réservation est bien prise en compte. Nous vous confirmerons par email ET par SMS dans les prochaines minutes. N'hésitez pas à verifier dans vos indésirables / spams si vous ne recevez pas d'email. Ajoutez-nous en favoris pour éviter que nos confirmations atterrissent dans vos spams."
              );
              setMessageModalOpen(true);
            },
            (error) => {
              console.log(error.text);
            }
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      contentLabel="Réservation en ligne"
      className="w-full h-full bg-opacity-60 bg-my-gold backdrop-blur-md rounded-2xl flex flex-col justify-around items-center "
      overlayClassName="fixed top-0 left-0  h-full w-screen xl:px-40 lg:px-40 md:px-20 sm:px-20 px-5 xl:py-10 lg:py-10   md:py-20 sm:py-20 py-5 z-40 text-left bg-black bg-opacity-50 "
    >
      <MessageModal
        isOpen={messageModalOpen}
        message={modalMessage}
        onClose={handleMessageModalClose}
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
            onClick={handleModalClose}
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
              <label className="text-white">Date</label>
              <Datetime
                locale="fr"
                value={dateTime}
                isValidDate={disablePastDt}
                closeOnSelect={true}
                onChange={handleChangeDateTime}
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                inputProps={{ placeholder: "Sélectionnez la date" }}
                required
                className="  h-[40px] flex flex-row justify-start items-center bg-transparent border-b-[1px] px-2 mb-5 "
              />
              <label className="text-white">Heure</label>
              <select
                value={selectedTime}
                onChange={handleTimeSelection}
                className=" h-[40px] focus:outline-none bg-transparent text-black border-b-[1px]  px-2 mb-5"
              >
                {availableTimeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <label className="text-white mb-1">Email</label>
              <input
                value={email}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-[40px]  mb-5  focus:outline-none bg-transparent border-b-[1px] px-2"
                required
              />
              <label className="text-white ">
                Télephone Portable * Pour recevoir une confirmation SMS *
              </label>
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
