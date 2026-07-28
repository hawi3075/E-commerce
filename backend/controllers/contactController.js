// backend/controllers/contactController.js

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log('📩 New Support Message Received:', { name, email, subject, message });

    // Optional: Save to Database (e.g. MongoDB Message Model) or send email via Nodemailer

    return res.status(200).json({
      success: true,
      message: 'Support message logged successfully!',
    });
  } catch (error) {
    console.error('❌ Error processing contact message:', error);
    return res.status(500).json({ message: 'Server error sending message.' });
  }
};