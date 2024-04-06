import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { occupationStatus } from "../features/occupationSlice";
import { useGetAllReservationsQuery } from "../API/api";
import api from "../API/api";
import moment from "moment";
import "moment/locale/fr";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import ModalStaff from "../components/modals/ModalStaff";
import { setReservations } from "../features/reservationSlice";
import { useLocation } from "react-router-dom";

const RecapResa = () => {
  const dispatch = useDispatch();

  const occStatus = useSelector(occupationStatus);

  const location = useLocation();

  const isOnRecapResaPage = location.pathname === "/recap";

  const { data: reservations, isSuccess } = useGetAllReservationsQuery(
    undefined,
    { skip: !isOnRecapResaPage }
  );

  const formatDateInitial = () => {
    const date = new Date(); // Crée une nouvelle instance de Date pour aujourd'hui
    const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
    const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
    const annee = date.getFullYear().toString().substr(-2); // Prend les deux derniers chiffres de l'année
    return `${jour}-${mois}-${annee}`;
  };

  const [selectedDate, setSelectedDate] = useState(formatDateInitial());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingReservation, setEditingReservation] = useState(null);
  const [newNumberOfGuests, setNewNumberOfGuests] = useState("");
  const [newTime, setNewTime] = useState("");
  const [serverName, setServerName] = useState("");

  const [newStatus, setNewStatus] = useState("");
  const [dateTime, setDateTime] = useState(moment());
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showMiddayReservations, setShowMiddayReservations] = useState(true);
  const [showEveningReservations, setShowEveningReservations] = useState(true);
  const [showUnplacedReservations, setShowUnplacedReservations] =
    useState(false);

  useEffect(() => {
    if (isSuccess && Array.isArray(reservations)) {
      // Si vous voulez stocker les réservations dans le Redux store
      dispatch(setReservations(reservations));
      console.log(reservations);
      console.log("Réservations bien recupéré");
    }
  }, [reservations, isSuccess, dispatch]);

  const timeSlots = useMemo(
    () => [
      newTime,
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
    [newTime]
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);

  const isDateMatchingEffectDate = (selectedDate, effectDate) => {
    const parsedEffectDate = moment(effectDate, "DD-MM-YY");
    return selectedDate.isSame(parsedEffectDate, "day");
  };

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModale = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const dateOfEffect = occStatus != null ? occStatus[0].dateOfEffect : "";
    const dateOfEffect1 = occStatus != null ? occStatus[1].dateOfEffect : "";
    const dateOfEffect2 = occStatus != null ? occStatus[2].dateOfEffect : "";
    const effectDateMatches = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect)
      : "";
    const effectDateMatches2 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect1)
      : "";

    const effectDateMatches3 = dateOfEffect
      ? isDateMatchingEffectDate(dateTime, dateOfEffect2)
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
          effectDateMatches3)
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
        (occStatus[2].occupationStatus === "freeTable21" && effectDateMatches3)
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
        (occStatus[2].occupationStatus === "fullComplet" && effectDateMatches3)
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
          effectDateMatches3)
      ) {
        newTimeSlots = newTimeSlots.filter(
          (slot) =>
            ![
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
  }, [dateTime, timeSlots, occStatus]);

  const handleChange = (selectedMoment) => {
    if (selectedMoment) {
      // Formatez la date sélectionnée en string au format attendu (DD-MM-YY ici)
      const formattedDate = selectedMoment.format("DD-MM-YY");
      setSelectedDate(formattedDate);
    }
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case "Confirmé":
        return "#90EE90";
      case "Pending":
        return "yellow";
      case "Annulé":
        return "red";
      case "Client prévenu":
        return "#90EE90";

      default:
        return "gray";
    }
  };

  function determineCardStyle(reservation) {
    if (reservation.Status === "Confirmé") {
      if (reservation.placed === "OUI") {
        return { backgroundColor: "#96be25" }; // Vert pour les confirmés et placés
      } else {
        return { backgroundColor: "#ffffff" }; // Blanc par défaut pour les confirmés mais non placés
      }
    } else if (reservation.Status === "Annulé") {
      return { backgroundColor: "red" }; // Rouge pour les placés et annulés
    } else {
      return { backgroundColor: "#ffffff" }; // Blanc par défaut pour les autres cas
    }
  }

  const handleEditClick = (reservation) => {
    setIsEditing(true);
    setEditingReservation(reservation);
    setNewNumberOfGuests(reservation.NumberGuest);
    setNewTime(reservation.Time);
    setDateTime(moment(reservation.Date, "DD-MM-YYYY"));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewStatus("");
    setServerName("");
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      NumberGuest: newNumberOfGuests,
      Time: newTime,
      Server: serverName,
      Updated: `Modifié par ${serverName}`,
      Status: newStatus === "" ? "Confirmé" : newStatus,
      Comment: newComment,
      placed: "NON",
    };

    try {
      const response = await axios.patch(
        `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${editingReservation.ID}`,
        { data: updateData }
      );
      if (response.status === 200) {
        alert("Réservation mise à jour avec succès");

        // Invalider les tags pour forcer un rechargement des données de réservation
        dispatch(api.util.invalidateTags(["Reservations"]));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
    } finally {
      // Réinitialiser l'état local du formulaire
      setIsEditing(false);
      setEditingReservation(null);
      setNewNumberOfGuests("");
      setNewTime("");
      setServerName("");
      setNewStatus("");
      setNewComment("");
    }
  };

  const handlePlaceReservation = async (reservationId) => {
    const updateData = {
      data: { placed: "OUI" }, // Assurez-vous que le nom de champ correspond à celui dans votre base de données SheetDB
    };

    try {
      const response = await axios.patch(
        `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${reservationId}`,
        updateData
      );
      if (response.status === 200) {
        // Invalider les tags pour forcer un rechargement des données de réservation
        dispatch(api.util.invalidateTags(["Reservations"]));
        // Optionnel : Rafraîchir les données localement si nécessaire
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
    }
  };

  const handleRemovePlaceReservation = async (reservationId) => {
    const updateData = {
      data: { placed: "NON" }, // Assurez-vous que le nom de champ correspond à celui dans votre base de données SheetDB
    };

    try {
      const response = await axios.patch(
        `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${reservationId}`,
        updateData
      );
      if (response.status === 200) {
        // Invalider les tags pour forcer un rechargement des données de réservation
        dispatch(api.util.invalidateTags(["Reservations"]));
        // Optionnel : Rafraîchir les données localement si nécessaire
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
    }
  };

  let resaJour = [];

  const sortByStatusAndTimestamp = (a, b) => {
    if (a.Status === "Annulé" && b.Status !== "Annulé") {
      return -1; // Place les réservations annulées en premier
    } else if (a.Status !== "Annulé" && b.Status === "Annulé") {
      return 1; // Garde les réservations non-annulées après les annulées
    } else {
      // Si les deux réservations ont le même statut, trier par timestamp
      return moment(b.timeStamp, "DD/MM/YYYY HH:mm:ss").diff(
        moment(a.timeStamp, "DD/MM/YYYY HH:mm:ss")
      );
    }
  };

  if (Array.isArray(reservations)) {
    resaJour = reservations
      .filter(
        (resa) =>
          resa.Date === selectedDate &&
          (resa.Status === "Confirmé" || resa.Status === "Annulé") &&
          resa.Name.toLowerCase().startsWith(searchText.toLowerCase())
      )
      .sort(
        (a, b) =>
          moment(b.timeStamp, "DD/MM/YYYY HH:mm:ss") -
          moment(a.timeStamp, "DD/MM/YYYY HH:mm:ss")
      );
  }

  const resaMidi = resaJour
    ? resaJour.filter((res) => res.Time <= "14:00")
    : "";

  const numberCouvert = (service) => {
    let result = 0;
    for (let i = 0; i < service.length; i++) {
      result += parseInt(service[i].NumberGuest);
    }
    return result;
  };

  const resaSoir = resaJour
    ? resaJour.filter((res) => res.Time >= "18:00")
    : "";

  return (
    <div className="mx-5">
      <ModalStaff isOpen={isModalOpen} onClose={closeModale} />
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-center 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl  font-bold mb-5">
          Récap réservation du {selectedDate}
        </h1>
        <p className="text-center mb-5 2xl:text-base xl:text-base lg:text-base md:text-base sm:text-xs ">
          (Pensez à rafraîchir la page avant chaque consultation)
        </p>
        <button
          className="px-2 py-2 border-solid border-black border-[1px] mt-5 mb-5 2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1 bg-green-500"
          onClick={handleClick}
        >
          Prendre une réservation
        </button>
        <div className=" mt-5 mb-5">
          <label className="mt-5 mr-5 mb-5 font-bold">
            Rechercher une réservation
          </label>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" border-solid border-black"
          />
        </div>
      </div>

      <div className=" flex justify-center items-center mb-10 ">
        <div className="mr-5">Selectionnez une date:</div>
        <Datetime
          locale="fr"
          value={moment(selectedDate, "DD-MM-YY")}
          onChange={handleChange}
          dateFormat="DD-MM-YY"
          timeFormat={false}
          closeOnSelect={true}
          inputProps={{
            placeholder: "Sélectionnez la date",
            className:
              "border border-solid border-gray-300 text-black text-center rounded-2xl",
          }}
          className=" h-10 flex flex-row justify-center items-center "
        />
      </div>

      <div className="flex justify-center items-center">
        <h2 className="text-center text-3xl mr-5">Réservations du midi</h2>
        <button
          onClick={() => setShowMiddayReservations(!showMiddayReservations)}
          className="px-3 py-1 underline text-black rounded hover:bg-gray-400"
        >
          {showMiddayReservations ? "Réduire" : "Afficher"}
        </button>
      </div>
      {showMiddayReservations && (
        <div>
          <h2 className="text-center text-xl mb-5">
            {numberCouvert(resaMidi)} couverts ce midi
          </h2>
          <div className=" w-full flex flex-row justify-center">
            <button
              onClick={() =>
                setShowUnplacedReservations(!showUnplacedReservations)
              }
              className="mt-2 mb-5 px-2 py-1 bg-yellow-500 text-xs m-auto text-white rounded"
            >
              {showUnplacedReservations
                ? "Afficher toutes les réservations"
                : "Afficher uniquement les réservations non placées"}
            </button>
          </div>

          {resaJour.length > 0 ? (
            resaJour
              .sort(sortByStatusAndTimestamp)
              .filter((res) => {
                return showUnplacedReservations ? res.placed !== "OUI" : true;
              })
              .filter((res) => res.Time <= "14:00")
              .map((reservation, index) => {
                const cardStyle = determineCardStyle(reservation);
                if (
                  isEditing &&
                  editingReservation &&
                  editingReservation.ID === reservation.ID
                ) {
                  return (
                    <div
                      key={reservation.ID}
                      className="my-4 p-4 border border-gray-200 rounded"
                    >
                      <form
                        onSubmit={handleEditSubmit}
                        className="space-y-4 bg-white p-4 rounded-lg shadow"
                      >
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre de convives:
                          </label>
                          <input
                            type="number"
                            value={newNumberOfGuests}
                            onChange={(e) =>
                              setNewNumberOfGuests(e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Heure:
                          </label>
                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            {availableTimeSlots.map((slot, index) => (
                              <option key={index} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Commentaires:
                          </label>
                          <textarea
                            name="message"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Statut de la réservation:
                          </label>
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="Confirmé">Confirmé</option>
                            <option value="Annulé">
                              Annulé (Demande du client)
                            </option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Serveur:
                          </label>
                          <select
                            value={serverName}
                            required
                            onChange={(e) => setServerName(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Sélectionnez le serveur
                            </option>
                            <option value="Jess">Jess</option>
                            <option value="Dylan">Dylan</option>
                            <option value="Tiffanie">Tiffanie</option>
                            <option value="Aurora">Aurora</option>
                            <option value="Christian">Christian</option>
                            <option value="Stephane">Stephane</option>
                            <option value="David">David</option>
                            <option value="Fanny">Fanny</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="mt-4 px-4 py-2 bg-green-400 text-white rounded mr-5"
                        >
                          Valider
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="mb-[10px] p-[10px] border-[1px] border-solid border-gray-400 rounded-xl"
                      key={index}
                      style={cardStyle}
                    >
                      <p>
                        <strong>Nom:</strong> {reservation.Name}
                      </p>
                      <p>
                        <strong>Nombre de convives:</strong>{" "}
                        {reservation.NumberGuest}
                      </p>
                      <p>
                        <strong>Date:</strong> {reservation.Date}
                      </p>
                      <p>
                        <strong>Heure:</strong> {reservation.Time}
                      </p>
                      <p>
                        <strong>Numéro de teléphone:</strong>{" "}
                        {reservation.Phone}
                      </p>

                      <p>
                        <strong>Statut</strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.Status
                            ),
                          }}
                        >
                          {reservation.Status}
                        </span>
                      </p>
                      <p>
                        <strong>Réservation effectué le :</strong>{" "}
                        {reservation.timeStamp}
                      </p>
                      <p>
                        <strong>Commentaire:</strong>{" "}
                        {reservation.Comment || "Aucun commentaire"}
                      </p>
                      <p>
                        <strong>Réservation Prise par:</strong>{" "}
                        {reservation.Source}
                      </p>
                      <p>
                        <strong>Client doit libérer table à 21H:</strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.freeTable21h
                            ),
                          }}
                        >
                          {reservation.freeTable21h === "Client prévenu"
                            ? "Client prévenu"
                            : "Pas demandé"}
                        </span>
                      </p>
                      <p>
                        <strong>
                          Occ-Statut au moment de la prise de réservation:
                        </strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.freeTable21h
                            ),
                          }}
                        >
                          {reservation.OccupationStatus}
                        </span>
                      </p>
                      <p>
                        <strong>Réservation Modifiée par:</strong>{" "}
                        {reservation.Updated || "Aucune Modification"}
                      </p>
                      <div className=" w-full flex flex-row justify-between">
                        <button
                          onClick={() => handleEditClick(reservation)}
                          className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded"
                        >
                          Modifier
                        </button>
                        <div>
                          <button
                            onClick={() =>
                              handlePlaceReservation(reservation.ID)
                            }
                            className="mt-4 px-2 py-1 bg-blue-500 text-white rounded text-xs"
                          >
                            Placé sur plan
                          </button>
                          <button
                            onClick={() =>
                              handleRemovePlaceReservation(reservation.ID)
                            }
                            className="mt-4 px-2 py-1 bg-blue-500 text-white rounded text-xs ml-5"
                          >
                            Retirer du plan
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
          ) : (
            <p>Aucune réservation pour ce midi.</p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center mt-5">
        <h2 className="text-center text-3xl mr-5">Réservations du soir</h2>
        <button
          onClick={() => setShowEveningReservations(!showEveningReservations)}
          className="px-3 py-1 underline text-black rounded hover:bg-gray-400"
        >
          {showEveningReservations ? "Réduire" : "Afficher"}
        </button>
      </div>
      {showEveningReservations && (
        <div>
          <h2 className="text-center text-xl mb-5">
            {numberCouvert(resaSoir)} couverts ce soir.
          </h2>
          <div className=" w-full flex flex-row justify-center">
            <button
              onClick={() =>
                setShowUnplacedReservations(!showUnplacedReservations)
              }
              className="mt-2 mb-5 px-2 py-1 bg-yellow-500 text-xs m-auto text-white rounded"
            >
              {showUnplacedReservations
                ? "Afficher toutes les réservations"
                : "Afficher uniquement les réservations non placées"}
            </button>
          </div>
          {resaJour.length > 0 ? (
            resaJour
              .sort(sortByStatusAndTimestamp)
              .filter((res) => {
                return showUnplacedReservations ? res.placed !== "OUI" : true;
              })
              .filter((res) => res.Time >= "18:00")
              .map((reservation, index) => {
                const cardStyle = determineCardStyle(reservation);
                if (
                  isEditing &&
                  editingReservation &&
                  editingReservation.ID === reservation.ID
                ) {
                  return (
                    <div
                      key={reservation.ID}
                      className="my-4 p-4 border border-gray-200 rounded"
                    >
                      <form
                        onSubmit={handleEditSubmit}
                        className="space-y-4 bg-white p-4 rounded-lg shadow"
                      >
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre de convives:
                          </label>
                          <input
                            type="number"
                            value={newNumberOfGuests}
                            onChange={(e) =>
                              setNewNumberOfGuests(e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Heure:
                          </label>
                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            {availableTimeSlots.map((slot, index) => (
                              <option key={index} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Commentaires:
                          </label>
                          <textarea
                            name="message"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Statut de la réservation:
                          </label>
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="Confirmé">Confirmé</option>
                            <option value="Annulé">
                              Annulé (Demande du client)
                            </option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Serveur:
                          </label>
                          <select
                            value={serverName}
                            required
                            onChange={(e) => setServerName(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Sélectionnez le serveur
                            </option>
                            <option value="Jess">Jess</option>
                            <option value="Dylan">Dylan</option>
                            <option value="Tiffanie">Tiffanie</option>
                            <option value="Aurora">Aurora</option>
                            <option value="Christian">Christian</option>
                            <option value="Stephane">Stephane</option>
                            <option value="David">David</option>
                            <option value="Fanny">Fanny</option>
                            <option value="Bleona">Fanny</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="mt-4 px-4 py-2 bg-green-400 text-white rounded mr-5"
                        >
                          Valider
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="mb-[10px] p-[10px] border-[1px] border-solid border-gray-400 rounded-xl"
                      key={index}
                      style={cardStyle}
                    >
                      <p>
                        <strong>Nom:</strong> {reservation.Name}
                      </p>
                      <p>
                        <strong>Nombre de convives:</strong>{" "}
                        {reservation.NumberGuest}
                      </p>
                      <p>
                        <strong>Date:</strong> {reservation.Date}
                      </p>
                      <p>
                        <strong>Heure:</strong> {reservation.Time}
                      </p>
                      <p>
                        <strong>Numéro de teléphone:</strong>{" "}
                        {reservation.Phone}
                      </p>

                      <p>
                        <strong>Statut</strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.Status
                            ),
                          }}
                        >
                          {reservation.Status}
                        </span>
                      </p>
                      <p>
                        <strong>Réservation effectué le :</strong>{" "}
                        {reservation.timeStamp}
                      </p>
                      <p>
                        <strong>Commentaire:</strong>{" "}
                        {reservation.Comment || "Aucun commentaire"}
                      </p>
                      <p>
                        <strong>Réservation Prise par:</strong>{" "}
                        {reservation.Source}
                      </p>
                      <p>
                        <strong>Client doit libérer table à 21H:</strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.freeTable21h
                            ),
                          }}
                        >
                          {reservation.freeTable21h === "Client prévenu"
                            ? "Client prévenu"
                            : "Pas demandé"}
                        </span>
                      </p>
                      <p>
                        <strong>
                          Occ-Statut au moment de la prise de réservation:
                        </strong>
                        <span
                          style={{
                            backgroundColor: getColorForStatus(
                              reservation.freeTable21h
                            ),
                          }}
                        >
                          {reservation.OccupationStatus}
                        </span>
                      </p>
                      <p>
                        <strong>Réservation Modifiée par:</strong>{" "}
                        {reservation.Updated || "Aucune Modification"}
                      </p>
                      <div className=" w-full flex flex-row justify-between">
                        <button
                          onClick={() => handleEditClick(reservation)}
                          className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded"
                        >
                          Modifier
                        </button>
                        <div>
                          <button
                            onClick={() =>
                              handlePlaceReservation(reservation.ID)
                            }
                            className="mt-4 px-2 py-1 bg-blue-500 text-white rounded text-xs"
                          >
                            Placé sur plan
                          </button>
                          <button
                            onClick={() =>
                              handleRemovePlaceReservation(reservation.ID)
                            }
                            className="mt-4 px-2 py-1 bg-blue-500 text-white rounded text-xs ml-5"
                          >
                            Retirer du plan
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
          ) : (
            <p>Aucune réservation pour ce midi.</p>
          )}
        </div>
        // Rendu des cartes de réservation du soir en utilisant `sortedReservations`
      )}
    </div>
  );
};

export default RecapResa;
