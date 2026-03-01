const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

admin.initializeApp();

// Configuration
// 1. Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1-TM_JNI85rlyty0rsyebCuQByADRDfn4GgsgIZDpnmo'; // The ID from user's URL

// 2. Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password
    },
});

exports.processNewLead = onDocumentCreated('leads/{leadId}', async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log('No data associated with the event');
        return;
    }

    const data = snapshot.data();
    console.log('Processing new lead:', data);

    // 1. Append to Google Sheets
    try {
        // Authenticate with Google Sheets using the local credentials.json file
        // You MUST provide a credentials.json file downloaded from Google Cloud Console.
        const auth = new google.auth.GoogleAuth({
            keyFile: './credentials.json',
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Assuming the sheet is named "Sheet1". Adjust if necessary.
        const range = 'Sheet1!A:H';
        const valueInputOption = 'USER_ENTERED';

        const values = [
            [
                data.name || 'N/A',
                data.email || 'N/A',
                data.phone || 'N/A',
                data.company || 'N/A',
                data.projectType || 'N/A',
                data.budget ? data.budget.rangeLabel : 'N/A',
                data.message || 'N/A',
                data.createdAt ? new Date(data.createdAt.toMillis()).toLocaleString() : new Date().toLocaleString()
            ],
        ];

        const resource = {
            values,
        };

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range,
            valueInputOption,
            resource,
        });

        console.log('Successfully appended lead to Google Sheets');
    } catch (error) {
        console.error('Error appending to Google Sheets:', error);
    }

    // 2. Send Email Notification
    try {
        const mailOptions = {
            from: Object.keys(process.env).includes('EMAIL_USER') ? process.env.EMAIL_USER : 'noreply@xpeartz.com',
            to: Object.keys(process.env).includes('EMAIL_USER') ? process.env.EMAIL_USER : 'ridhambhavnagariya@gmail.com', // Replace with where you want to receive the email
            subject: 'New Strategy Call Lead - Xpeartz',
            text: `
        You have a new strategy call request!
        =====================================
        Name: ${data.name || 'N/A'}
        Email: ${data.email || 'N/A'}
        Phone: ${data.phone || 'N/A'}
        Company: ${data.company || 'N/A'}
        Project Type: ${data.projectType || 'N/A'}
        Budget: ${data.budget ? data.budget.rangeLabel : 'N/A'}
        Message: ${data.message || 'N/A'}
        Time: ${data.createdAt ? new Date(data.createdAt.toMillis()).toLocaleString() : new Date().toLocaleString()}
      `,
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Successfully sent email notification');
        } else {
            console.log('Email missing credentials in .env, skipping email notification.');
        }
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
});
