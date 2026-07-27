const axios = require('axios');

exports.initializeTelebirrPayment = async (req, res) => {
  try {
    const { amount, phone, email, fullName, orderId } = req.body;

    // 1. Force a clean, valid email format that passes Chapa's strict validator
    let cleanEmail = 'customer@gmail.com';
    if (email && typeof email === 'string') {
      const trimmed = email.trim().toLowerCase();
      // Strict regex matching standard email structure
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        cleanEmail = trimmed;
      }
    }

    // 2. Format Ethiopian Phone Number to standard local format (09... or 07...)
    let cleanPhone = phone ? phone.toString().replace(/\D/g, '') : '0911234567';
    if (cleanPhone.startsWith('251') && cleanPhone.length === 12) {
      cleanPhone = '0' + cleanPhone.substring(3);
    }
    if (!/^0[79]\d{8}$/.test(cleanPhone)) {
      cleanPhone = '0911234567';
    }

    // 3. Name formatting
    const names = (fullName || 'Customer User').trim().split(' ');
    const firstName = names[0] || 'Customer';
    const lastName = names.slice(1).join(' ') || 'User';

    const chapaPayload = {
      amount: Number(amount).toFixed(2),
      currency: 'ETB',
      email: cleanEmail,
      first_name: firstName,
      last_name: lastName,
      phone_number: cleanPhone,
      tx_ref: `luu-${orderId || Date.now()}-${Date.now()}`,
      callback_url: 'https://webhook.site/test',
      return_url: 'http://localhost:3000/orders',
      customizations: {
        title: 'Luu Safety Order',
        description: 'Payment for safety equipment',
      },
    };

    console.log('Sending payload to Chapa:', chapaPayload);

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

    if (response.data && response.data.status === 'success') {
      return res.status(200).json({
        checkoutUrl: response.data.data.checkout_url,
      });
    }

    return res.status(400).json({ 
      message: response.data?.message || 'Payment initialization failed' 
    });

  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('Chapa Initialization Error:', errorData);

    return res.status(500).json({
      message: error.response?.data?.message || 'Failed to connect to payment gateway',
    });
  }
};