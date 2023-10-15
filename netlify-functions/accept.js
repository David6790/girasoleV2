const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = event.queryStringParameters;

  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com", // Votre email d'expéditeur
    templateId: "d-f6110fab2fb04b05b3924760f999ce4f",
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
