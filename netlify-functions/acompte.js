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

  const params = event.queryStringParameters;
  const { email, phone, name, numberGuests, ID } = params;

  try {
    // Créer un lien de paiement Stripe
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Acompte de réservation",
            },
            unit_amount: 1000 * numberGuests, // 10€ par personne
          },
          quantity: 1, // Quantité fixée à 1 car le montant total est calculé avec numberGuests
        },
      ],
      metadata: { reservationId: ID },
    });

    // Préparer le message d'email
    const emailMessage = {
      to: email,
      from: "ilgirasolestrasbourg67@gmail.com",
      subject: "Confirmation de réservation - Il Girasole",
      text: `Bonjour ${name}, veuillez procéder au paiement de l'acompte pour votre réservation via le lien suivant : ${paymentLink.url}`,
    };

    // Envoyer l'email
    await sgMail.send(emailMessage);

    // Envoyer le SMS
    if (phone) {
      await twilioClient.messages.create({
        body: `Bonjour ${name}, veuillez procéder au paiement de l'acompte pour votre réservation via le lien suivant : ${paymentLink.url}`,
        from: "IlGirasole",
        to: `+${phone}`,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Lien de paiement envoyé avec succès" }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: "Erreur lors de l'envoi du lien de paiement",
      }),
    };
  }
};
