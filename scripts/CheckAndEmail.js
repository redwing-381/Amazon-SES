const sendEmail = require('../sendEmail.js'); // Adjust the path if necessary
const programData = require('../sfl_product.program_data.json');
const learnerData = require('../sfl_product.learner_data.json');

const checkAndSendEmails = () => {
    console.log('Starting checkAndSendEmails...');
    const today = new Date().toISOString().split('T')[0];
    console.log(`Today's date: ${today}`);

    programData.forEach(program => {
        console.log(`Checking program: ${program.program_name}`);
        if (program.program_end_date.split('T')[0] === today) {
            const courseName = program.program_name;
            console.log(`Program "${courseName}" ends today.`);
            program.modules_list.forEach(module => {
                module.activity_list.forEach(activity => {
                    if (activity.activity_end_date.split('T')[0] === today) {
                        const taskName = activity.data.test_name;
                        console.log(`Activity "${taskName}" ends today.`);
                        learnerData.forEach(learner => {
                            learner.programs_assigned.forEach(programAssigned => {
                                if (programAssigned.program_id.$oid === program._id.$oid) {
                                    const emailBody = `Dear ${learner.learner_name},\n\nThe course "${courseName}" has ended today. Please check the task "${taskName}".\n\nBest regards,\nYour Learning Platform`;
                                    console.log(`Sending email to ${learner.email_id}`);
                                    sendEmail(learner.email_id, `Course "${courseName}" Ended`, emailBody)
                                        .then(() => console.log(`Email sent to ${learner.email_id}`))
                                        .catch(error => console.error(`Failed to send email to ${learner.email_id}: ${error.message}`));
                                }
                            });
                        });
                    }
                });
            });
        } else {
            console.log(`Program "${program.program_name}" does not end today.`);
        }
    });
};

checkAndSendEmails();
