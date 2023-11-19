const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, phone, name, number, ID } = event.queryStringParameters;
    const numberOfGuest = parseInt(event.queryStringParameters.number, 10);

    await axios.patch(`https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}`, {
      data: {
        Acompte: "En attente de paiement",
      },
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: "price_1OE7gLJFBYsGU4Ss3u8fm3s0",
          quantity: numberOfGuest,
        },
      ],
      metadata: {
        reservationId: ID,
        customerName: name,
        phone: phone,
        email: email,
      },
    });

    // Construire le message email
    const emailMessage = {
      to: email,
      from: "ilgirasolestrasbourg67@gmail.com",
      subject: "Lien de paiement pour votre réservation",
      text: `Bonjour ${name}, veuillez utiliser ce lien pour payer votre acompte de ${
        numberOfGuest * 10
      }€ : ${paymentLink.url}`,
    };

    // Envoyer l'email
    await sgMail.send(emailMessage);

    // Construire le message SMS
    const smsMessage = {
      body: `Bonjour ${name}, veuillez utiliser ce lien pour payer votre acompte de ${
        numberOfGuest * 10
      }€ : ${paymentLink.url}`,
      from: "IlGirasole",
      to: `+${phone}`,
    };

    // Envoyer le SMS
    await twilioClient.messages.create(smsMessage);

    return {
      statusCode: 200,
      body: "Lien de paiement envoyé avec succès",
    };
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    return {
      statusCode: error.statusCode || 500,
      body: "Erreur lors de l'envoi du lien de paiement",
    };
  }
};
