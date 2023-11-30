const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (lambdaEvent, context) => {
  if (lambdaEvent.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = lambdaEvent.headers["stripe-signature"];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      lambdaEvent.body,
      sig,
      webhookSecret
    );

    if (stripeEvent.type === "checkout.session.completed") {
      const checkoutSession = stripeEvent.data.object;
      const metadata = checkoutSession.metadata;
      const reservationId = metadata.reservationId;
      const typeEvent = metadata.typeEvent;

      let sheetDBUrl;
      if (typeEvent === "Nouvel-an") {
        sheetDBUrl = `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${reservationId}?sheet=newYear`;
      } else {
        sheetDBUrl = `https://sheetdb.io/api/v1/97lppk2d46b57/ID/${reservationId}`;
      }

      // Mise à jour de SheetDB
      await axios.patch(sheetDBUrl, {
        data: {
          Acompte: "Acompte payé",
          Status: "Validé",
        },
      });

      // Envoyer un email de confirmation au client
      const emailMessage = {
        to: metadata.email,
        from: "ilgirasolestrasbourg67@gmail.com",
        subject: "Confirmation de paiement de votre réservation",
        text: `Bonjour ${
          metadata.customerName
        }, Voilà ! Votre réservation au Il Girasole ${
          typeEvent ? "pour le soir le menu Nouvel an" : ""
        } est définitivement validée et nous vous en remercions. En cas d’annulation, vous pouvez nous contacter jusqu’à ${
          typeEvent ? "48h" : ""
        } avant votre réservation pour demander le remboursement de l'acompte. 
        Nous vous attendons avec impatience et nous vous remercions pour votre confiance.  Il Girasole  - 03 88 37 16 76 - ilgirasole.fr`,
      };

      await sgMail.send(emailMessage);

      // Envoyer un email de notification interne
      const internalEmailMessage = {
        to: "stephstrass@gmail.com",
        from: "ilgirasolestrasbourg67@gmail.com",
        subject: "Nouveau paiement d'acompte réussi",
        text: `Hello je suis steph et j'adore les bites, Un paiement d'acompte pour la réservation ${reservationId} pour ${
          typeEvent ? "Nouvel an" : ""
        } au nom de ${
          metadata.customerName
        } a été reçu. Bouge ton cul et vas vérifier le système de réservation sur sheet pour plus de détails.`,
      };

      await sgMail.send(internalEmailMessage);
    }

    return { statusCode: 200, body: "Webhook traité avec succès" };
  } catch (error) {
    console.error(`Erreur lors de la gestion du webhook: ${error.message}`);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }
};
