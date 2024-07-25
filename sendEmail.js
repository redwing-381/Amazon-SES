// sendEmail.js
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
require('dotenv').config(); // Ensure .env file is loaded

const sesClient = new SESClient({
    region: process.env.AWS_SES_REGION, // Make sure this is properly set
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const sendEmail = async (recipientEmail, subject, body) => {
    const params = {
        Source: process.env.SENDER_EMAIL,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        }
    };

    try {
        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);
        console.log('Email has been sent', response);
        return response;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        throw error;
    }
};

module.exports = sendEmail;
