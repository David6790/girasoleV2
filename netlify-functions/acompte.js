const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    // Créer un lien de paiement Stripe
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: "price_1OE5jsJFBYsGU4SskPEdiaO1", // Remplacez par l'ID du tarif
          quantity: numberOfGuest,
        },
      ],
      metadata: {
        reservationId: ID, // Ajoutez l'ID de réservation en tant que métadonnée
      },
      // Vous pouvez ajouter d'autres paramètres ici si nécessaire
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
