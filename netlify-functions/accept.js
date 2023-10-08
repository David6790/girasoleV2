const emailjs = require("emailjs-com");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = event.queryStringParameters;

  // Paramètres EmailJS
  const params = {
    from_name: "IL GIRASOLE STRASBOURG",
    to_email: email, // email du destinataire
    message: "Votre réservation a été acceptée!", // Ou tout autre message que vous souhaitez envoyer
  };

  const serviceID = "service_tm1wxto";
  const templateID = "template_ua6d1za"; // C'est votre ID de modèle d'email spécifique, vous devrez peut-être le changer.
  const userID = "I5f0O3BoNI4d1FJPP";

  try {
    // Envoyer l'email via EmailJS
    await emailjs.send(serviceID, templateID, params, userID);

    return {
      statusCode: 200,
      body: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: "Error sending email",
    };
  }
};
