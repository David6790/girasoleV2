const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
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
    templateId: "d-f6110fab2fb04b05b3924760f999ce4f",
    dynamic_template_data: {
      Name: name,
      Date: resDate,
      Time: resTime,
      Number: number,
    },
  };

  try {
    await sgMail.send(msg);
    if (phone) {
      await twilioClient.messages.create({
        body: `${greeting} ${name}, votre réservation au Il Girasole le ${resDate} à ${resTime} pour ${number} personnes a bien été notée et nous vous en remercions. En cas d'empêchement, n'oubliez pas de nous appeler au plus vite, au 03 88 37 16 76 ou par sms au 06 26 19 10 28 (en indiquant votre nom).`,
        from: "IlGirasole",
        to: `+${phone}`,
      });
    }
    const sheetDbUrl = "Uhttps://sheetdb.io/api/v1/97lppk2d46b57/Status/"; // Remplacez par votre URL SheetDB
    const uniqueId = ID; // Remplacez par l'identifiant unique de la réservation dans SheetDB

    await fetch(`${sheetDbUrl}/${uniqueId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { Status: "Accepted" },
      }),
    });
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
