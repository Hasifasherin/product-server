import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  Description: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

export default mongoose.model('Product', productSchema);
