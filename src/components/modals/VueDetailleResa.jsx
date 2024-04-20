import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import "react-datetime/css/react-datetime.css";
import "moment/locale/fr";

const VueDetailleResa = ({ isOpen, onClose, reservations }) => {
  const [detailedReservations, setDetailedReservations] = useState({});
  const [renouvelables21h, setRenouvelables21h] = useState({});
  const [arrivees21h, setArrivees21h] = useState({});

  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    if (
      reservations &&
      Array.isArray(reservations) &&
      reservations.length > 0
    ) {
      const allDetails = processAllReservations(reservations);
      const { renouvelables, arrivees } = process21hReservations(reservations);
      setDetailedReservations(allDetails);
      setRenouvelables21h(renouvelables);
      setArrivees21h(arrivees);
    }
  }, [reservations]);

  const processAllReservations = (data) => {
    const details = {};
    data.forEach(({ Time, Name, NumberGuest, freeTable21h }) => {
      const heure = Time.slice(0, 5);
      if (!details[heure]) {
        details[heure] = { totalCouverts: 0, tables: {} };
      }
      const numGuests = parseInt(NumberGuest, 10);
      details[heure].totalCouverts += numGuests;
      const tableName = `${numGuests} couverts`;
      if (!details[heure].tables[tableName]) {
        details[heure].tables[tableName] = [];
      }
      details[heure].tables[tableName].push({
        name: Name,
        isRenewable: freeTable21h === "Client prévenu",
      });
    });
    return details;
  };

  const process21hReservations = (data) => {
    let renouvelables = {};
    let arrivees = {};
    let totalRenouvelables = 0;
    let totalArrivees = 0;

    data.forEach(({ Time, Name, NumberGuest, freeTable21h }) => {
      const heure = Time.slice(0, 5);
      const numGuests = parseInt(NumberGuest, 10);
      if (freeTable21h === "Client prévenu" && heure < "21:00") {
        if (!renouvelables[heure]) {
          renouvelables[heure] = { totalCouverts: 0, names: [] };
        }
        renouvelables[heure].names.push({ name: Name, numGuests: numGuests });
        renouvelables[heure].totalCouverts += numGuests;
        totalRenouvelables += numGuests;
      }
      if (heure >= "21:00") {
        if (!arrivees[heure]) {
          arrivees[heure] = { totalCouverts: 0, names: [] };
        }
        arrivees[heure].names.push({ name: Name, numGuests: numGuests });
        arrivees[heure].totalCouverts += numGuests;
        totalArrivees += numGuests;
      }
    });

    const couvertsDisponibles = totalArrivees - totalRenouvelables;
    return { renouvelables, arrivees, couvertsDisponibles };
  };

  const renderReservationDetails = (details) => {
    const sortedHours = Object.keys(details).sort((a, b) => a.localeCompare(b));
    return sortedHours.map((hour) => {
      const { tables } = details[hour];
      const tableCount = Object.keys(tables).reduce(
        (acc, key) => acc + tables[key].length,
        0
      );

      return (
        <div key={hour} className="p-4 mb-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            {hour}: <span className="font-normal">{tableCount} table(s)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(tables).map(([size, names]) => (
              <div key={size}>
                <p className="text-sm font-semibold">{size}</p>
                {names.map(({ name, isRenewable }, index) => (
                  <p
                    key={index}
                    className="text-sm p-2 bg-white rounded shadow mb-2"
                  >
                    {name}
                    {isRenewable && (
                      <span className="ml-1">(renouvelable)</span>
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClose}
        contentLabel="Réservation en ligne"
        className="relative mx-auto p-5 border bg-white rounded-2xl shadow-lg overflow-scroll w-full h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 p-10 "
      >
        <div className="space-y-4 ">
          <h2 className="text-2xl font-bold text-center mb-10 mt-5">
            Détails des réservations par heure
          </h2>
          <div className="">
            {renderReservationDetails(detailedReservations)}
          </div>

          <h2 className="text-xl font-semibold  w-full text-center mt-10 mb-10">
            Détail des réservations renouvelables à 21h
          </h2>
          {Object.entries(renouvelables21h).map(
            ([hour, { totalCouverts, names }]) => (
              <div key={hour} className="p-4 mb-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">
                  {hour} :{" "}
                  <span className="font-normal">
                    {totalCouverts} couverts renouvelables
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {names.map(({ name, numGuests }, idx) => (
                    <p
                      key={idx}
                      className="text-sm p-2 bg-white rounded shadow"
                    >
                      {name} - {numGuests} couverts
                    </p>
                  ))}
                </div>
              </div>
            )
          )}

          <h2 className="text-xl font-semibold w-full text-center mt-20 mb-20 ">
            Détail des réservations arrivant à 21h ou après
          </h2>
          {Object.entries(arrivees21h)
            .sort(([hourA], [hourB]) => hourA.localeCompare(hourB))
            .map(([hour, { totalCouverts, names }]) => (
              <div key={hour} className="p-4 mb-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold">
                  {hour} : {totalCouverts} couverts arrivant
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {names.map(({ name, numGuests }, idx) => (
                    <p
                      key={idx}
                      className="text-sm p-2 bg-white rounded shadow"
                    >
                      {name} - {numGuests} couverts
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default VueDetailleResa;
