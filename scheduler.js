// Import required modules
const cron = require('node-cron');

// Import the checkAndSendEmails function
const { checkAndSendEmails } = require('/Users/solai/Downloads/Amazon-SES/scripts/CheckAndEmail.js');

// Schedule the task to run at 11:57 PM every day
cron.schedule('00 08 * * *', () => {
    console.log('Running scheduled task...');
    checkAndSendEmails();
});

console.log('Task scheduled to run at 8 AM every day.');
