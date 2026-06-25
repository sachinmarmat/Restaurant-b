import mongoose from 'mongoose';
import Restaurant from '../models/Restaurant.js';
import { DEFAULT_RESTAURANT } from '../seed/defaultData.js';

export const getRestaurant = async (req, res, next) => {
  try {
    let restaurant = await Restaurant.findOne({ isActive: true });
    if (!restaurant) {
      restaurant = await Restaurant.create(DEFAULT_RESTAURANT);
    }
    res.json({ success: true, data: restaurant });
  } catch (err) {
    next(err);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { dishes, ...rest } = req.body;

    if (!dishes || dishes.length < 3) {
      return res.status(400).json({ success: false, message: 'At least 3 dishes are required' });
    }

    const required = ['name', 'cuisine', 'tagline', 'description', 'famousReason', 'phone', 'email', 'address', 'hours', 'chef'];
    for (const field of required) {
      if (!rest[field]?.toString().trim()) {
        return res.status(400).json({ success: false, message: `Field "${field}" is required` });
      }
    }

    let restaurant = await Restaurant.findOne({ isActive: true });
    const payload = { ...rest, dishes, subtitle: rest.description?.slice(0, 120) + '...' };

    if (restaurant) {
      restaurant = await Restaurant.findByIdAndUpdate(restaurant._id, payload, { new: true, runValidators: true });
    } else {
      restaurant = await Restaurant.create(payload);
    }

    res.json({ success: true, data: restaurant, message: 'Restaurant updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const resetRestaurant = async (req, res, next) => {
  try {
    await Restaurant.deleteMany({});
    const restaurant = await Restaurant.create(DEFAULT_RESTAURANT);
    res.json({ success: true, data: restaurant, message: 'Restaurant reset to defaults' });
  } catch (err) {
    next(err);
  }
};
