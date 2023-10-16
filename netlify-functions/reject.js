const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, phone } = event.queryStringParameters;

  const msg = {
    to: email,
    from: "ilgirasolestrasbourg67@gmail.com", //
    templateId: "d-f13022b3fbde406badd256068c5ce6bf",
  };

  try {
    await sgMail.send(msg);
    if (phone) {
      await twilioClient.messages.create({
        body: "Nous sommes malheureusement complet ce soir.",
        from: "+12295979254",
        to: `+${phone}`,
      });
    }
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
