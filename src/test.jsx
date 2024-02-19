import axios from "axios";
import React, { useEffect, useState } from "react";

const RecapResa = () => {
  const formatDateInitial = () => {
    const date = new Date(); // Crée une nouvelle instance de Date pour aujourd'hui
    const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
    const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
    const annee = date.getFullYear().toString().substr(-2); // Prend les deux derniers chiffres de l'année
    return `${jour}-${mois}-${annee}`;
  };

  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formatDateInitial());

  const [editingReservation, setEditingReservation] = useState(null);
  const [newNumberOfGuests, setNewNumberOfGuests] = useState("");
  const [newTime, setNewTime] = useState("");
  const [serverName, setServerName] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (e) => {
    const value = e.target.value;
    const [year, month, day] = value.split("-");
    const formattedDate = `${day}-${month}-${year.substr(-2)}`;
    setSelectedDate(formattedDate);
  };
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
  const handleEditClick = (reservation) => {
    setIsEditing(true);
    setEditingReservation(reservation);
    setNewNumberOfGuests(reservation.NumberGuest);
    setNewTime(reservation.Time);
    // Ajouter plus d'états au besoin
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    // Ajouter plus d'états au besoin
  };
  const handleEditSubmit = async () => {
    const updateData = {
      NumberGuest: newNumberOfGuests,
      Time: newTime,
      Server: serverName,
      Updated: `Modifié par ${serverName}`,
      Status: newStatus,
    };

    try {
      const response = await axios.patch(
        `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${editingReservation.ID}`,
        { data: updateData }
      );
      setIsEditing(false);
      setEditingReservation(null);
      recupererReservations(); // Rafraîchir les réservations
      if (response.status === 200) {
        alert("Réservation mise à jour avec succès");
        // Mettre à jour l'affichage des réservations ici
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
    }
  };

  const resaJour = reservations
    ? reservations.filter(
        (resa) => resa.Date === selectedDate && resa.Status === "Confirmé"
      )
    : "notYet";

  return (
    <div className="mx-5">
      <h1 className="text-center text-3xl font-bold">
        Récap réservation du {selectedDate}
      </h1>
      <p className="text-center mb-10">
        (Pensez à rafraîchir la page avant chaque consultation)
      </p>

      <div className="text-center mb-5">
        <input type="date" value={selectedDate} onChange={handleChange} />
      </div>

      <h2 className="text-center text-3xl mb-5">Réservations du midi</h2>
      {isEditing ? (
        <div>
          <h2>Modifier la réservation</h2>
          {editingReservation && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label>Nombre de convives:</label>
                <input
                  type="number"
                  value={newNumberOfGuests}
                  onChange={(e) => setNewNumberOfGuests(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label>Heure:</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label>Serveur:</label>
                <select
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="select"
                >
                  <option value="">Sélectionnez le serveur</option>
                  <option value="Jess">Jess</option>
                  <option value="Dylan">Dylan</option>
                  <option value="Tiffanie">Tiffanie</option>
                  <option value="Aurora">Aurora</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>
              <button type="submit" className="btn">
                Mettre à jour
              </button>
              <button type="submit" className="btn" onClick={handleCancelEdit}>
                Annuler
              </button>
            </form>
          )}
        </div>
      ) : (
        ""
      )}
      {resaJour.length > 0 ? (
        resaJour
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
              <button onClick={() => handleEditClick(reservation)}>
                Modifier
              </button>
            </div>
          ))
      ) : (
        <p>Aucune réservation pour ce midi.</p>
      )}
      <h2 className="text-center text-3xl mb-5">Réservations du soir</h2>
      {resaJour.length > 0 ? (
        resaJour
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
              <button onClick={() => handleEditClick(reservation)}>
                Modifier
              </button>
            </div>
          ))
      ) : (
        <p>Aucune réservation pour ce soir.</p>
      )}
    </div>
  );
};

export default RecapResa;
