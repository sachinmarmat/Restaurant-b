import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    table: { type: String, default: 'any' },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
