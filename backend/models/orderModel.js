const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            product_name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
        }
    ],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true, default: 'Mobile Payment' },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    status: { type: String, default: 'Pending' } // Pending, Approved, Rejected (SRS 3.9)
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);