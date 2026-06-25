import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  dishId: String,
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    table: { type: String, required: true },
    customerName: { type: String, required: true, trim: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'served', 'cancelled'],
      default: 'preparing',
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
