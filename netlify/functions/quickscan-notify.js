const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const { email, subject, html } = JSON.parse(event.body);

  const response = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: email,
    subject,
    html,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
