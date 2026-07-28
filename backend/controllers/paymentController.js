exports.initializeTelebirrPayment = async (req, res) => {
  console.log(">>> RECEIVED PAYLOAD FROM FRONTEND:", req.body);

  const { amount, phone, email, fullName, orderId } = req.body;

  // HARDCODE A GUARANTEED VALID EMAIL FOR CHAPA TO TEST
  const cleanEmail = (email && email.includes('@')) ? email.trim() : "testcustomer@gmail.com";
  
  // Format phone to local 09... or 07...
  let cleanPhone = phone ? phone.toString().replace(/\D/g, '') : '0911234567';
  if (cleanPhone.startsWith('251') && cleanPhone.length === 12) {
    cleanPhone = '0' + cleanPhone.substring(3);
  }
  if (!/^0[79]\d{8}$/.test(cleanPhone)) {
    cleanPhone = '0911234567';
  }

  const chapaPayload = {
    amount: Number(amount).toFixed(2),
    currency: 'ETB',
    email: cleanEmail,
    first_name: fullName ? fullName.split(' ')[0] : 'Customer',
    last_name: fullName ? fullName.split(' ').slice(1).join(' ') || 'User' : 'User',
    phone_number: cleanPhone,
    tx_ref: `luu-${Date.now()}`,
    callback_url: 'https://webhook.site/test',
    return_url: 'http://localhost:3000/orders',
    customizations: {
      title: 'Luu Safety Order',
      description: 'Payment for safety equipment',
    },
  };

  console.log(">>> SENDING TO CHAPA:", chapaPayload);

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

    if (response.data && response.data.status === 'success') {
      return res.status(200).json({ checkoutUrl: response.data.data.checkout_url });
    }
    return res.status(400).json({ message: response.data?.message || 'Payment failed' });
  } catch (error) {
    console.error(">>> CHAPA ERROR RESPONSE:", error.response?.data || error.message);
    return res.status(500).json({ message: error.response?.data || 'Gateway Error' });
  }
};