const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = event.headers["stripe-signature"];

  let data;
  let eventType;

  try {
    let event = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);

    data = event.data;
    eventType = event.type;

    if (eventType === "payment_intent.succeeded") {
      const paymentIntent = data.object;
      const reservationId = paymentIntent.metadata.reservationId;

      // Mise à jour de SheetDB
      await axios.patch(
        `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${reservationId}`,
        {
          data: {
            Acompte: "Acompte payé",
          },
        }
      );

      // Envoyer un email de confirmation au client
      const emailMessage = {
        to: paymentIntent.metadata.email,
        from: "ilgirasolestrasbourg67@gmail.com",
        subject: "Confirmation de paiement de votre réservation",
        text: `Bonjour ${paymentIntent.metadata.customerName}, votre paiement pour la réservation ${reservationId} a été réussi. Votre réservation est maintenant confirmée.`,
      };

      await sgMail.send(emailMessage);

      // Envoyer un email de notification interne
      const internalEmailMessage = {
        to: "stephstrass@gmail.com",
        from: "ilgirasolestrasbourg67@gmail.com",
        subject: "Nouveau paiement d'acompte réussi",
        text: `Un paiement pour la réservation ${reservationId} a été reçu. Veuillez vérifier le système de réservation pour plus de détails.`,
      };

      await sgMail.send(internalEmailMessage);
    }

    return { statusCode: 200, body: "Webhook traité avec succès" };
  } catch (error) {
    console.error(`Erreur lors de la gestion du webhook: ${error.message}`);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }
};
