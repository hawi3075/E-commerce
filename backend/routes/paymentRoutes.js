const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/payments/telebirr
router.post('/telebirr', async (req, res) => {
  try {
    const { amount, phone, fullName, orderId } = req.body;

    const nameParts = (fullName || 'Customer').trim().split(' ');
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts[1] || 'User';

    // Call Chapa API to process Telebirr payment
    const chapaResponse = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      {
        amount: amount.toString(),
        currency: 'ETB',
        email: 'customer@luusafety.com',
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        tx_ref: `luusafety-${orderId}-${Date.now()}`,
        callback_url: 'http://localhost:5000/api/payments/verify',
        return_url: 'http://localhost:3000/orders?status=success',
        customizations: {
          title: 'Luu Safety Checkout',
          description: 'Payment for order',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (chapaResponse.data && chapaResponse.data.data.checkout_url) {
      return res.status(200).json({
        success: true,
        checkoutUrl: chapaResponse.data.data.checkout_url,
      });
    } else {
      return res.status(400).json({ message: 'Could not generate Telebirr link' });
    }
  } catch (error) {
    console.error('Telebirr Error:', error.response?.data || error.message);
    return res.status(500).json({
      message: error.response?.data?.message || 'Payment initiation failed',
    });
  }
});

module.exports = router;