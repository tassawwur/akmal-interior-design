const Contact = require('../models/Contact');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * @desc    Submit a new contact form
 * @route   POST /api/contacts
 * @access  Public
 */
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Create contact in database
    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message
    });

    // Send email notification to admin
    const emailContent = {
      subject: `New Contact Form Submission - ${name}`,
      text: `
        You have received a new contact form submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service: ${service}
        
        Message:
        ${message}
        
        This submission was received on ${new Date().toLocaleString()}.
        You can view all submissions in your admin dashboard.
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>You have received a new inquiry from your website:</p>
        
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Service:</strong> ${service}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <p>This submission was received on ${new Date().toLocaleString()}.</p>
        <p>You can view all submissions in your admin dashboard.</p>
      `
    };

    try {
      await sendEmail({
        to: config.ADMIN_EMAIL,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html
      });
      
      logger.info(`Contact form notification email sent to admin for submission from ${email}`);
    } catch (err) {
      logger.error(`Error sending contact form notification email: ${err.message}`);
      // Don't return an error to the user if email fails, just log it
    }

    // Send confirmation email to the user
    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Akmal Interior Design',
        text: `
          Dear ${name},
          
          Thank you for contacting Akmal Interior Design. We have received your inquiry and will get back to you shortly.
          
          Your message:
          "${message}"
          
          Best regards,
          The Akmal Interior Design Team
        `,
        html: `
          <h2>Thank you for contacting Akmal Interior Design</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your inquiry and a member of our team will contact you shortly.</p>
          
          <h3>Your message:</h3>
          <p><em>"${message.replace(/\n/g, '<br>')}"</em></p>
          
          <p>Best regards,<br>The Akmal Interior Design Team</p>
        `
      });
      
      logger.info(`Contact form confirmation email sent to ${email}`);
    } catch (err) {
      logger.error(`Error sending contact form confirmation email: ${err.message}`);
      // Don't return an error to the user if email fails, just log it
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been received. We will contact you shortly.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all contact submissions (with pagination)
 * @route   GET /api/contacts
 * @access  Private (Admin only)
 */
exports.getContacts = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments();

    // Query with pagination
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: contacts.length,
      pagination,
      total,
      data: contacts
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single contact submission
 * @route   GET /api/contacts/:id
 * @access  Private (Admin only)
 */
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update contact status
 * @route   PUT /api/contacts/:id
 * @access  Private (Admin only)
 */
exports.updateContact = async (req, res, next) => {
  try {
    const { status } = req.body;

    // Only allow updating the status
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!contact) {
      return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete contact
 * @route   DELETE /api/contacts/:id
 * @access  Private (Admin only)
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
}; 