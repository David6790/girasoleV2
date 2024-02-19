import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { occupationStatus } from "../features/occupationSlice";
import moment from "moment";

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
  const [dateTime, setDateTime] = useState(moment());
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, SetNewComment] = useState("");

  const occStatus = useSelector(occupationStatus);

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
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);

  const isDateMatchingEffectDate = (selectedDate, effectDate) => {
    const parsedEffectDate = moment(effectDate, "DD-MM-YY");
    return selectedDate.isSame(parsedEffectDate, "day");
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

      {resaJour.length > 0 ? (
        resaJour
          .filter((res) => res.Time <= "14:00")
          .map((reservation, index) => {
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
                        onChange={(e) => setNewNumberOfGuests(e.target.value)}
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
                        onChange={(e) => SetNewComment(e.target.value)}
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
                        <option value="Refusé">
                          Refusé (Demande du client)
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
                        <option value="">Sélectionnez le serveur</option>
                        <option value="Jess">Jess</option>
                        <option value="Dylan">Dylan</option>
                        <option value="Tiffanie">Tiffanie</option>
                        <option value="Aurora">Aurora</option>
                        <option value="Christian">Christian</option>
                        <option value="Stephane">Stephane</option>
                      </select>
                    </div>
                    <button
                      onClick={handleEditSubmit}
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
                  <button
                    onClick={() => handleEditClick(reservation)}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded"
                  >
                    Modifier
                  </button>
                </div>
              );
            }
          })
      ) : (
        <p>Aucune réservation pour ce midi.</p>
      )}

      <h2 className="text-center text-3xl mb-5">Réservations du soir</h2>
      {resaJour.length > 0 ? (
        resaJour
          .filter((res) => res.Time >= "18:00")
          .map((reservation, index) => {
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
                        onChange={(e) => setNewNumberOfGuests(e.target.value)}
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
                        onChange={(e) => SetNewComment(e.target.value)}
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
                        <option value="Refusé">
                          Refusé (Demande du client)
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
                        <option value="">Sélectionnez le serveur</option>
                        <option value="Jess">Jess</option>
                        <option value="Dylan">Dylan</option>
                        <option value="Tiffanie">Tiffanie</option>
                        <option value="Aurora">Aurora</option>
                        <option value="Christian">Christian</option>
                        <option value="Stephane">Stephane</option>
                      </select>
                    </div>
                    <button
                      onClick={handleEditSubmit}
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
                  <button
                    onClick={() => handleEditClick(reservation)}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded"
                  >
                    Modifier
                  </button>
                </div>
              );
            }
          })
      ) : (
        <p>Aucune réservation pour ce midi.</p>
      )}
    </div>
  );
};

export default RecapResa;
