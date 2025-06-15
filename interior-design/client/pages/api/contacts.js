// Import required packages
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  // Connect to your MongoDB cluster
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  cachedDb = connection;
  return connection;
}

// Define Contact schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    enum: ['Interior Design', 'Architecture', 'Consultation', 'Project Management', 'Other'],
    default: 'Interior Design'
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    minlength: [10, 'Message must be at least 10 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create model only if it doesn't exist
let Contact;
try {
  Contact = mongoose.model('Contact');
} catch {
  Contact = mongoose.model('Contact', ContactSchema);
}

// Email sending function
async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === 465,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectToDatabase();

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
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
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
        `
      });
    } catch (err) {
      console.error('Error sending admin notification:', err);
      // Continue execution even if admin email fails
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
    } catch (err) {
      console.error('Error sending confirmation email:', err);
      // Continue execution even if confirmation email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been received. We will contact you shortly.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong. Please try again.'
    });
  }
} 