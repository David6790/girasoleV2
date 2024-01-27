// sendEmail.js
const sgMail = require("@sendgrid/mail");
const axios = require("axios");

// Configurez votre clé API SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handler de la fonction Netlify pour l'envoi d'email
exports.handler = async (event, context) => {
  // Assurez-vous que nous utilisons la méthode GET
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Récupérez les paramètres de la chaîne de requête
  const { email, name, resDate, resTime, number, ID, msgClient } =
    event.queryStringParameters;

  // Vérifiez que tous les paramètres nécessaires sont présents
  if (!email || !name || !resDate || !resTime || !number) {
    return {
      statusCode: 400,
      body: "Missing parameters! Please provide email, name, reservation date, reservation time, and number of people.",
    };
  }

  // Créez le message à envoyer
  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com", // Remplacez par votre adresse email vérifiée
    templateId: "d-f6110fab2fb04b05b3924760f999ce4f",
    dynamic_template_data: {
      Name: name,
      Date: resDate,
      Time: resTime,
      Number: number,
      msgClient: msgClient,
    },
  };

  try {
    // Envoyez l'email via SendGrid
    await sgMail.send(msg);
    await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
      data: {
        Status: "Confirmé", // ou tout autre statut que vous souhaitez définir
      },
    });
    return {
      statusCode: 200,
      body: "Email envoyé avec succès",
    };
  } catch (error) {
    // Gestion des erreurs lors de l'envoi
    console.error(error);

    // Renvoyez une réponse avec le message d'erreur
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
