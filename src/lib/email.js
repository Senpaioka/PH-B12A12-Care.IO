
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendPaymentConfirmationEmail = async ({
    userEmail,
    userName,
    caregiverEmail,
    caregiverName,
    amount,
    currency,
    date,
}) => {
    const subject = "Care.io - Payment Confirmation & Appointment Details";

    // Email to User
    const userHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
      <h2 style="color: #2563eb;">Payment Successful!</h2>
      <p>Hi ${userName},</p>
      <p>Thank you for your payment. Your appointment with <strong>${caregiverName}</strong> has been confirmed.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Caregiver:</strong> ${caregiverName} (${caregiverEmail})</p>
        <p><strong>Amount Paid:</strong> ${amount} ${currency.toUpperCase()}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
      </div>

      <p>If you have any questions, please contact support.</p>
      <p>Best regards,<br/>The Care.io Team</p>
    </div>
  `;

    // Email to Caregiver
    const caregiverHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
      <h2 style="color: #16a34a;">New Appointment Confirmed!</h2>
      <p>Hi ${caregiverName},</p>
      <p>You have a new confirmed appointment with <strong>${userName}</strong>.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Client:</strong> ${userName} (${userEmail})</p>
        <p><strong>Payment Status:</strong> Paid</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
      </div>

      <p>Please contact the client to discuss further details.</p>
      <p>Best regards,<br/>The Care.io Team</p>
    </div>
  `;

    try {
        // Send to User
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Care.io" <noreply@care.io>',
            to: userEmail,
            subject: "Payment Receipt - Care.io",
            html: userHtml,
        });

        // Send to Caregiver
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Care.io" <noreply@care.io>',
            to: caregiverEmail,
            subject: "New Appointment - Care.io",
            html: caregiverHtml,
        });

        console.log(`Emails sent successfully to ${userEmail} and ${caregiverEmail}`);
        return { success: true };
    } catch (error) {
        console.error("Error sending emails:", error);
        // Don't throw, just log. We don't want to break the payment flow if email fails.
        return { success: false, error: error.message };
    }
};
