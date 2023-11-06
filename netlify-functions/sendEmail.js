// sendEmail.js
const sgMail = require("@sendgrid/mail");

// Configurez votre clé API SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handler de la fonction Netlify pour l'envoi d'email
exports.handler = async (event, context) => {
  // Assurez-vous que nous utilisons la méthode POST
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Parsez le corps de la requête pour obtenir les paramètres d'email
  const data = JSON.parse(event.body);
  const { email, name, resDate, resTime } = data;

  // Créez le message à envoyer
  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com", // Remplacez par votre adresse email vérifiée
    subject: "Confirmation de réservation",
    text: `Bonjour ${name}, votre réservation pour le ${resDate} à ${resTime} est confirmée.`,
    // Vous pouvez également utiliser un template HTML ici
  };

  try {
    // Envoyez l'email via SendGrid
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: "Email envoyé avec succès",
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
