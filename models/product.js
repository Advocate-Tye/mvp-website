const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,

  price: Number,

  folder: String,

  thumbnail: String,

  description: String,

  secondary: [String]

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
