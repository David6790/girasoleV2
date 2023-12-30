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

  const { email, phone, name, number, resDate, resTime, ID } =
    event.queryStringParameters;

  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com",
    templateId: "d-7c54985902d34bb18adc591cd8f051c3",
    dynamic_template_data: {
      Name: name,
      Date: resDate,
      Time: resTime,
      Number: number,
    },
  };

  try {
    await sgMail.send(msg);
    await axios.patch(
      `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}?sheet=newYear`,
      {
        data: {
          Status: "Validé",
        },
      }
    );
    if (phone) {
      await twilioClient.messages.create({
        body: `${greeting} ${name},  Voilà ! Votre réservation au Il Girasole pour la soirée du nouvel an est définitivement validée et nous vous en remercions.s. En cas d'empêchement, n'oubliez pas de nous appeler au plus vite, au 03 88 37 16 76 ou par sms au 06 26 19 10 28 (en indiquant votre nom).`,
        from: "IlGirasole",
        to: `+${phone}`,
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
      body: "Erreur lors de l'envoi du SMS ou de l'Email",
    };
  }
};
