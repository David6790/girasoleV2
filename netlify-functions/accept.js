const emailjs = require("emailjs-com/nodejs"); // Assurez-vous d'importer la version correcte

exports.handler = async (event, context) => {
  emailjs.init("YOUR_USER_ID"); // Remplacez par votre userID

  const data = {
    service_id: "service_tm1wxto",
    template_id: "template_ua6d1za",
    user_id: "I5f0O3BoNI4d1FJPP",
    template_params: {
      from_name: "IL GIRASOLE STRASBOURG",
      to_email: "david.lb90@gmail.com",
      message_html: "Test message",
    },
  };

  try {
    const response = await emailjs.send(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
