// sendSms.js
const twilio = require("twilio");

// Configurez votre client Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Handler de la fonction Netlify pour l'envoi de SMS
exports.handler = async (event, context) => {
  // Assurez-vous que nous utilisons la méthode POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Parsez le corps de la requête pour obtenir les paramètres de SMS
  const data = JSON.parse(event.body);
  const { phone, name, resDate, resTime, number } = data;

  // Déterminez le message de salutation en fonction de l'heure actuelle
  const currentHour = new Date().getHours();
  const greeting = currentHour < 18 ? "Bonjour" : "Bonsoir";

  try {
    // Envoyez le SMS via Twilio
    await twilioClient.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER, // Remplacez par votre numéro de téléphone Twilio
      body: `${greeting} ${name}, votre réservation au Il Girasole le ${resDate} à ${resTime} pour ${number} personnes a bien été notée. Merci et à bientôt!`,
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
