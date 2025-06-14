const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('./logger');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version of email
 * @param {string} options.html - HTML version of email
 * @returns {Promise} - Resolves when email is sent
 */
const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: config.SMTP_EMAIL,
      pass: config.SMTP_PASSWORD
    }
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    logger.info('SMTP connection verified successfully');
  } catch (error) {
    logger.error(`SMTP connection error: ${error.message}`);
    throw new Error('Email service not available');
  }

  // Email options
  const mailOptions = {
    from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  // Add CC if provided
  if (options.cc) {
    mailOptions.cc = options.cc;
  }

  // Add BCC if provided
  if (options.bcc) {
    mailOptions.bcc = options.bcc;
  }

  // Add attachments if provided
  if (options.attachments) {
    mailOptions.attachments = options.attachments;
  }

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

module.exports = sendEmail; 