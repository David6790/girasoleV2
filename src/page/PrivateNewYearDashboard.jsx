import React, { useEffect, useState } from "react";
import axios from "axios";

const PrivateNewYearDashboard = () => {
  const [reservations, setReservations] = useState([]);

  const recupererReservations = () => {
    axios
      .get("https://sheetdb.io/api/v1/97lppk2d46b57?sheet=newYear")
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

  const getColorForStatus = (status) => {
    switch (status) {
      case "Validé":
        return "#90EE90";
      case "Annulé":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="mx-5">
      <h1 className=" text-center text-3xl font-bold mb-10">
        Récap réservation Nouvel-An
      </h1>

      {reservations.length > 0 ? (
        reservations.map((reservation, index) => (
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
              <strong>Heure:</strong>{" "}
              {reservation.Time !== "" ? reservation.Time : "Entre 19h - 20h"}
            </p>
            <p>
              <strong>Statut: </strong>
              <span
                style={{
                  backgroundColor: getColorForStatus(reservation.Status),
                }}
              >
                {reservation.Status}
              </span>
            </p>
            <p>
              <strong>Réservation effectué le :</strong> {reservation.timestamp}
            </p>
            <p>
              <strong>Acompte :</strong>
              <span
                style={{
                  backgroundColor: `${
                    reservation.Acompte === "Acompte payé" &&
                    reservation.Status === "Validé"
                      ? "#90EE90"
                      : "gray"
                  }`,
                }}
              >
                {reservation.Acompte === "Acompte payé" &&
                reservation.Status === "Validé"
                  ? `Acompte reglé de ${
                      reservation.NumberGuest * 30
                    }€ à déduire de l'addition`
                  : "Pas payé d'Acompte"}
              </span>
            </p>
            <p>
              <strong>Commentaire Client:</strong>
              {reservation.Comment || "Aucun commentaire"}
            </p>
            <p>
              <strong>Commentaire Interne:</strong>
              {reservation.CommentairesInterne || "Aucun commentaire"}
            </p>
          </div>
        ))
      ) : (
        <p>Aucune réservation pour ce midi.</p>
      )}
    </div>
  );
};

export default PrivateNewYearDashboard;
