/**
 * Netlify Function to send email notifications when someone completes the quickscan
 * 
 * Environment Variables Required:
 * - NOTIFICATION_EMAIL: The email address to send notifications to (e.g., f.zwaans@supplyvalue.nl)
 * - SENDGRID_API_KEY: Your SendGrid API key (or use another email service)
 * 
 * Alternative: You can use any email service (AWS SES, Mailgun, Postmark, etc.)
 * Just modify the sendEmail function below
 */

const sendgrid = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { to, name, email, pdfBase64 } = JSON.parse(event.body);

    // Validate required fields
    if (!to || !name || !email || !pdfBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get notification email from environment variable
    const notificationEmail = process.env.NOTIFICATION_EMAIL || to;
    const sendGridApiKey = process.env.SENDGRID_API_KEY;

    if (!sendGridApiKey) {
      console.error('SENDGRID_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    // Configure SendGrid
    sendgrid.setApiKey(sendGridApiKey);

    // Extract base64 data from data URI
    const base64Data = pdfBase64.split(',')[1] || pdfBase64;

    // Prepare email
    const msg = {
      to: notificationEmail,
      from: process.env.FROM_EMAIL || notificationEmail, // Use verified sender
      subject: `Nieuwe Quick Scan resultaten van ${name}`,
      html: `
        <h2>Nieuwe Quick Scan Logistieke Ketenvolwassenheid</h2>
        <p>Er is een nieuwe quick scan ingevuld.</p>
        <h3>Contactgegevens:</h3>
        <ul>
          <li><strong>Naam:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>Datum:</strong> ${new Date().toLocaleString('nl-NL')}</li>
        </ul>
        <p>De volledige resultaten inclusief volwassenheidsprofiel en advies zijn bijgevoegd als PDF.</p>
      `,
      attachments: [
        {
          content: base64Data,
          filename: `quickscan-${name.replace(/\s+/g, '-')}-${Date.now()}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    // Send email
    await sendgrid.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Notification sent successfully' })
    };

  } catch (error) {
    console.error('Error sending notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send notification',
        details: error.message 
      })
    };
  }
};
