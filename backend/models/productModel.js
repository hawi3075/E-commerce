const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    product_code: { type: String, required: true, unique: true },
    product_category: { 
        type: String, 
        required: true, 
        enum: ['Shoes', 'Jackets', 'Uniforms', 'Gloves', 'Helmets', 'Work Clothes'] 
    },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);