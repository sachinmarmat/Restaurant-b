import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true },
  experience: { type: String, required: true },
  specialty: { type: String, required: true },
  ability: { type: String, required: true },
  photo: { type: String, default: '' },
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'mains', 'desserts', 'drinks'],
  },
  price: { type: Number, required: true, min: 0 },
  emoji: { type: String, default: '🍽️' },
  description: { type: String, required: true },
  famousReason: { type: String, required: true },
  image: { type: String, default: '' },
});

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    subtitle: { type: String },
    cuisine: { type: String, required: true },
    description: { type: String, required: true },
    famousReason: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    hours: { type: String, required: true },
    chef: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    years: { type: Number, required: true, min: 1 },
    tableCount: { type: Number, required: true, min: 1, max: 100, default: 20 },
    chefs: { type: [chefSchema], default: [] },
    dishes: {
      type: [dishSchema],
      validate: {
        validator: (v) => v.length >= 3,
        message: 'At least 3 dishes are required',
      },
    },
    isActive: { type: Boolean, default: true },
    photo: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
