import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant.js';
import { DEFAULT_RESTAURANT } from './defaultData.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const existing = await Restaurant.findOne({ isActive: true });
    if (existing) {
      console.log('Restaurant already seeded:', existing.name);
      process.exit(0);
    }
    const restaurant = await Restaurant.create(DEFAULT_RESTAURANT);
    console.log('Seeded restaurant:', restaurant.name);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
