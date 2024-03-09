// sendSms.js
const twilio = require("twilio");
const axios = require("axios");

// Configurez votre client Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Handler de la fonction Netlify pour l'envoi de SMS
exports.handler = async (event, context) => {
  // Assurez-vous que nous utilisons la méthode GET
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Récupérez les paramètres de la chaîne de requête
  const { phone, name, resDate, resTime, number, ID, msgClient } =
    event.queryStringParameters;

  // Vérifiez que tous les paramètres nécessaires sont présents

  // Déterminez le message de salutation en fonction de l'heure actuelle
  const currentHour = new Date().getHours();
  const greeting = currentHour < 18 ? "Bonjour" : "Bonsoir";

  function formatDateToFullString(dateString) {
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const days = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];

    // Extraire les éléments de la date
    const [day, month, year] = dateString
      .split("/")
      .map((num) => parseInt(num, 10));

    // Créer un objet Date (Notez que le mois est 0-indexé en JavaScript)
    const date = new Date(year + 2000, month - 1, day);

    // Formater la date
    const formattedDate = `${days[date.getDay()]} ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;

    return formattedDate;
  }

  const formattedResDate = formatDateToFullString(resDate);

  try {
    await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
      data: {
        Status: "Refusé",
      },
    });
    // Envoyez le SMS via Twilio
    await twilioClient.messages.create({
      body: `${greeting} ${name}, votre réservation au Il Girasole le ${formattedResDate} à ${resTime} pour ${number} personnes a bien été notée et nous vous en remercions. En cas d'empêchement, n'oubliez pas de nous appeler au plus vite, au 03 88 37 16 76 ou par sms au 06 26 19 10 28 (en indiquant votre nom). \n \n${msgClient}`,
      from: "IlGirasole",
      to: `+${phone}`,
    });
    return {
      statusCode: 200,
      body: "SMS envoyé avec succès",
    };
  } catch (error) {
    // Gestion des erreurs lors de l'envoi
    console.error(error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
