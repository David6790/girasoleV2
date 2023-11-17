const sgMail = require("@sendgrid/mail");
const axios = require("axios");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, ID } = event.queryStringParameters;

  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com",
    templateId: "d-f13022b3fbde406badd256068c5ce6bf",
  };

  try {
    await sgMail.send(msg);
    await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
      data: {
        Status: "Refusé",
      },
    });

    return {
      statusCode: 200,
      body: "Email envoyés avec succès",
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
