import React, { useState } from "react";

import { useGetAllReservationsQuery } from "../API/api";

import moment from "moment";
import "moment/locale/fr";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { useLocation } from "react-router-dom";

const RecapCuisine = () => {
  const location = useLocation();

  const isOnRecapResaPage = location.pathname === "/kitchen-2";

  const { data: reservations } = useGetAllReservationsQuery(undefined, {
    skip: !isOnRecapResaPage,
  });

  const formatDateInitial = () => {
    const date = new Date(); // Crée une nouvelle instance de Date pour aujourd'hui
    const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
    const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
    const annee = date.getFullYear().toString().substr(-2); // Prend les deux derniers chiffres de l'année
    return `${jour}-${mois}-${annee}`;
  };

  const [selectedDate, setSelectedDate] = useState(formatDateInitial());

  const [showMiddayReservations, setShowMiddayReservations] = useState(true);
  const [showEveningReservations, setShowEveningReservations] = useState(true);
  const [showUnplacedReservations, setShowUnplacedReservations] =
    useState(false);

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

  let resaJour = [];

  if (Array.isArray(reservations)) {
    resaJour = reservations
      .filter(
        (resa) =>
          resa.Date === selectedDate &&
          (resa.Status === "Confirmé" || resa.Status === "Annulé")
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
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-center 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl  font-bold mb-5">
          Récap réservation du {selectedDate}
        </h1>
        <p className="text-center mb-5 2xl:text-base xl:text-base lg:text-base md:text-base sm:text-xs ">
          (Pensez à rafraîchir la page avant chaque consultation)
        </p>
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
                : "Afficher table de plus de 5 personnes"}
            </button>
          </div>

          {resaJour.length > 0 ? (
            resaJour
              .filter((res) => {
                return showUnplacedReservations ? res.NumberGuest >= 5 : true;
              })
              .filter((res) => res.Time <= "14:00")
              .map((reservation, index) => {
                const cardStyle = determineCardStyle(reservation);

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
                      <strong>Numéro de teléphone:</strong> {reservation.Phone}
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
                    <div className=" w-full flex flex-row justify-between"></div>
                  </div>
                );
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
                : "Afficher table de plus de 5 personnes"}
            </button>
          </div>
          {resaJour.length > 0 ? (
            resaJour
              .filter((res) => {
                return showUnplacedReservations ? res.NumberGuest >= 5 : true;
              })
              .filter((res) => res.Time >= "18:00")
              .map((reservation, index) => {
                const cardStyle = determineCardStyle(reservation);

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
                      <strong>Numéro de teléphone:</strong> {reservation.Phone}
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
                    <div className=" w-full flex flex-row justify-between"></div>
                  </div>
                );
              })
          ) : (
            <p>Aucune réservation pour ce midi.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecapCuisine;
