// backend/controllers/paymentController.js
const axios = require('axios');

// Helper to format phone numbers for Chapa
const formatPhone = (phone) => {
  if (!phone) return '0911234567';
  let cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.startsWith('251') && cleaned.length === 12) {
    cleaned = '0' + cleaned.substring(3);
  }
  return /^0[79]\d{8}$/.test(cleaned) ? cleaned : '0911234567';
};

exports.initializeTelebirrPayment = async (req, res) => {
  console.log('--- Incoming Payment Request Body ---', req.body);
  const { amount, phone, email, fullName, orderId } = req.body;

  // 1. Sanitize and trim email (fallback to a standard valid address)
  const cleanEmail = (email && typeof email === 'string' && email.trim().length > 3)
    ? email.trim().toLowerCase()
    : 'customer@gmail.com';

  // 2. Format phone number
  const safePhone = formatPhone(phone);

  // 3. Parse first and last names
  const nameParts = (fullName || 'Customer User').trim().split(' ');
  const firstName = nameParts[0] || 'Customer';
  const lastName = nameParts.slice(1).join(' ') || 'User';

  const chapaPayload = {
    amount: Number(amount).toFixed(2),
    currency: 'ETB',
    email: cleanEmail,
    first_name: firstName,
    last_name: lastName,
    phone_number: safePhone,
    tx_ref: `tx-luusafety-${orderId || Date.now()}-${Date.now()}`,
    callback_url: 'https://your-domain.com/api/payments/verify',
    return_url: 'http://localhost:3000/orders',
    customizations: {
      title: 'Luu Safety Purchase',
      description: 'Payment for safety equipment',
    },
  };

  console.log('--- Payload Sent To Chapa ---', chapaPayload);

  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      chapaPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data?.status === 'success') {
      return res.status(200).json({
        checkoutUrl: response.data.data.checkout_url,
      });
    } else {
      return res.status(400).json({ 
        message: response.data?.message || 'Failed to create payment session' 
      });
    }
  } catch (error) {
    console.error('Chapa API Error Response:', error.response?.data || error.message);

    // Format error message string properly for alert popups
    let errorMessage = 'Server error initializing payment';
    if (error.response?.data) {
      if (typeof error.response.data.message === 'string') {
        errorMessage = error.response.data.message;
      } else if (typeof error.response.data === 'object') {
        errorMessage = JSON.stringify(error.response.data);
      }
    }

    res.status(error.response?.status || 500).json({ message: errorMessage });
  }
};