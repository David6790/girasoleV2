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

  try {
    await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
      data: {
        Status: "Refusé",
      },
    });
    // Envoyez le SMS via Twilio
    await twilioClient.messages.create({
      body: `${greeting} ${name}, votre réservation au Il Girasole le ${resDate} à ${resTime} pour ${number} personnes a bien été notée et nous vous en remercions. En cas d'empêchement, n'oubliez pas de nous appeler au plus vite, au 03 88 37 16 76 ou par sms au 06 26 19 10 28 (en indiquant votre nom).
      ${msgClient}`,
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
