const axios = require('axios');

exports.initializeTelebirrPayment = async (req, res) => {
  try {
    const { amount, phone, email, fullName, orderId } = req.body;

    console.log("📥 [1] Received checkout request from frontend:", req.body);

    let cleanEmail = 'customer@gmail.com';
    if (email && typeof email === 'string' && email.includes('@')) {
      const trimmed = email.trim().toLowerCase();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        cleanEmail = trimmed;
      }
    }

    let cleanPhone = phone ? phone.toString().replace(/\D/g, '') : '0911234567';
    if (cleanPhone.startsWith('251') && cleanPhone.length === 12) {
      cleanPhone = '0' + cleanPhone.substring(3);
    }
    if (!/^0[79]\d{8}$/.test(cleanPhone)) {
      cleanPhone = '0911234567';
    }

    const nameParts = (fullName || 'Customer User').trim().split(' ');
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    const parsedAmount = parseFloat(amount);
    const finalAmount = (!isNaN(parsedAmount) && parsedAmount > 0) ? parsedAmount.toFixed(2) : '100.00';

    // Strictly prioritize environment variable, warn if missing
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      console.warn("⚠️ WARNING: FRONTEND_URL environment variable is not defined on Render!");
    }
    const resolvedFrontendUrl = frontendUrl || 'https://e-commerce-msuo.vercel.app';

    const chapaPayload = {
      amount: finalAmount,
      currency: 'ETB',
      email: cleanEmail,
      first_name: firstName,
      last_name: lastName,
      phone_number: cleanPhone,
      tx_ref: `luu-${orderId || 'order'}-${Date.now()}`,
      callback_url: 'https://webhook.site/test',
      return_url: `${resolvedFrontendUrl}/orders?payment=success`,
      customizations: {
        title: 'Luu Safety Purchase',
        description: 'Payment for safety equipment',
      },
    };

    console.log("🚀 [2] Sending payload to Chapa API:", chapaPayload);
    console.log("🔑 [3] Using Secret Key:", process.env.CHAPA_SECRET_KEY ? `${process.env.CHAPA_SECRET_KEY.slice(0, 12)}...` : 'MISSING KEY');

    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      chapaPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY?.trim()}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("✅ [4] Chapa Response:", response.data);

    if (response.data && response.data.status === 'success') {
      return res.status(200).json({
        checkoutUrl: response.data.data.checkout_url,
      });
    }

    return res.status(400).json({ 
      message: response.data?.message || 'Chapa initialization failed.' 
    });

  } catch (error) {
    const errorDetail = error.response?.data || error.message;
    console.error("❌ [5] Chapa Initialization Failed:", JSON.stringify(errorDetail, null, 2));

    const userMessage = error.response?.data?.message 
      ? (typeof error.response.data.message === 'object' ? JSON.stringify(error.response.data.message) : error.response.data.message)
      : (error.message || 'Payment Gateway Error');

    return res.status(500).json({
      message: userMessage,
    });
  }
};