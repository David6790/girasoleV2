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
    const { email, phone, name, ID, typeEvent } = event.queryStringParameters;
    const numberOfGuest = parseInt(event.queryStringParameters.number, 10);

    await axios.patch(
      `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${ID}?sheet=newYear`,
      {
        data: {
          Status: "En attente de paiement",
          Acompte: "En attente de paiement",
        },
      }
    );

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
        typeEvent: typeEvent,
      },
    });

    // Construire le message email
    const emailMessage = {
      to: email,
      from: "ilgirasolestrasbourg67@gmail.com",
      subject: "Lien de paiement pour votre réservation",
      text: `Merci ${name} pour votre demande de réservation pour le Menu Nouvel an au Il Girasole.
      Le lien suivant va vous permettre de valider définitivement votre réservation au Il Girasole en payant des arrhes correspondant au nombre de personnes réservées * 30.00 €.  Bien entendu ce montant vous sera déduit au moment de l’addition. En cas d’annulation ou de changement sur le nombre de convives, vous pouvez nous contacter jusqu’à 48h avant votre réservation pour demander le remboursement de ce montant ;-) 
        Nous vous remercions pour votre compréhension et votre confiance. 
      En cas de besoin, n’hésitez pas à contacter le Il Girasole au 03 88 37 16 76. A bientôt ;-) - Il Girasole - Bonjour ${name}, veuillez utiliser ce lien pour payer votre acompte de ${
        numberOfGuest * 30
      }€ : ${paymentLink.url}`,
    };

    // Envoyer l'email
    await sgMail.send(emailMessage);

    // Construire le message SMS
    const smsMessage = {
      body: `Bonjour ${name}, veuillez utiliser ce lien pour payer votre acompte du Menu Nouvel an de ${
        numberOfGuest * 30
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
