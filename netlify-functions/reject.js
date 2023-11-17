const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
const axios = require("axios");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const currentHour = new Date().getHours();
const greeting = currentHour < 18 ? "Bonjour" : "Bonsoir";
exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, phone, name, ID } = event.queryStringParameters;

  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com", //
    templateId: "d-f13022b3fbde406badd256068c5ce6bf",
  };

  try {
    await sgMail.send(msg);

    if (phone) {
      await twilioClient.messages.create({
        body: `${greeting} ${name}, merci pour votre réservation mais malheureusement le restaurant est au complet ce soir. Si vous le souhaitez nous pouvons vous mettre sur une liste d'attente et vous contacter dès qu'une table se libère.
        À bientôt -IL GIRASOLE-`,
        from: "IlGirasole",
        to: `+${phone}`,
      });
      await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
        data: {
          Status: "Refusé",
        },
      });
    }
    return {
      statusCode: 200,
      body: "Email et SMS envoyés avec succès",
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
