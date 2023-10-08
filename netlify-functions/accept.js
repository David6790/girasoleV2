const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = event.queryStringParameters;

  const msg = {
    to: email,
    from: "david.lb90@gmail.com", // Votre email d'expéditeur
    subject: "Confirmation de réservation",
    text: "Votre réservation a été acceptée!",
    html: "<strong>Votre réservation a été acceptée!</strong>",
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: "Email envoyé avec succès",
    };
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    return {
      statusCode: error.statusCode || 500,
      body: "Erreur lors de l'envoi de l'email",
    };
  }
};
