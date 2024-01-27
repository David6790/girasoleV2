import React, { useEffect, useState } from "react";
import axios from "axios";

const afficherDateAujourdhui = () => {
  const dateAujourdhui = new Date();
  const jour = dateAujourdhui.getDate().toString().padStart(2, "0");
  const mois = (dateAujourdhui.getMonth() + 1).toString().padStart(2, "0");
  const annee = dateAujourdhui.getFullYear().toString().substr(-2);

  return `${jour}-${mois}-${annee}`;
};

const PrivateBookingDashboard = () => {
  const [reservations, setReservations] = useState([]);

  const recupererReservations = () => {
    axios
      .get("https://sheetdb.io/api/v1/97lppk2d46b57")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    recupererReservations();
  }, []);

  const dateFormatee = afficherDateAujourdhui();

  const reservationsDuJour = reservations.filter((reservation) => {
    return reservation.Date === dateFormatee;
  });

  const getColorForStatus = (status) => {
    switch (status) {
      case "Confirmé":
        return "#90EE90";
      case "Pending":
        return "yellow";
      case "Refusé":
        return "red";
      case "Client prévenu":
        return "#90EE90";

      default:
        return "gray";
    }
  };

  return (
    <div className="mx-5">
      <h1 className=" text-center text-3xl font-bold ">
        Récap réservation du {dateFormatee}
      </h1>
      <p className=" text-center mb-10">
        (Pensez à rafraîchir la page avant chaque consultation)
      </p>

      <h2 className=" text-center text-3xl mb-5">Réservations du midi</h2>
      {reservationsDuJour.length > 0 ? (
        reservationsDuJour
          .filter((res) => res.Time <= "14:00")
          .map((reservation, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p>
                <strong>Nom:</strong> {reservation.Name}
              </p>
              <p>
                <strong>Nombre de convives:</strong> {reservation.NumberGuest}
              </p>
              <p>
                <strong>Date:</strong> {reservation.Date}
              </p>
              <p>
                <strong>Heure:</strong> {reservation.Time}
              </p>

              <p>
                <strong>Statut</strong>
                <span
                  style={{
                    backgroundColor: getColorForStatus(reservation.Status),
                  }}
                >
                  {" "}
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
            </div>
          ))
      ) : (
        <p>Aucune réservation pour ce midi.</p>
      )}
      <h2 className="text-center text-3xl mb-5">Réservations du soir</h2>
      {reservationsDuJour.length > 0 ? (
        reservationsDuJour
          .filter((res) => res.Time >= "18:00")
          .map((reservation, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p>
                <strong>Nom:</strong> {reservation.Name}
              </p>
              <p>
                <strong>Nombre de convives:</strong> {reservation.NumberGuest}
              </p>
              <p>
                <strong>Date:</strong> {reservation.Date}
              </p>
              <p>
                <strong>Heure:</strong> {reservation.Time}
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
                <strong>Statut</strong>
                <span
                  style={{
                    backgroundColor: getColorForStatus(reservation.Status),
                  }}
                >
                  {" "}
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
            </div>
          ))
      ) : (
        <p>Aucune réservation pour ce soir.</p>
      )}
    </div>
  );
};

export default PrivateBookingDashboard;
