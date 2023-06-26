const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Other category-related fields
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
