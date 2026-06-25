import Booking from '../models/Booking.js';
import Restaurant from '../models/Restaurant.js';

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ status: { $ne: 'cancelled' } })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, table, notes } = req.body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const restaurant = await Restaurant.findOne({ isActive: true });
    const booking = await Booking.create({
      name, email, phone, date, time, guests, table: table || 'any', notes: notes || '',
      restaurant: restaurant?._id,
    });

    res.status(201).json({ success: true, data: booking, message: 'Reservation confirmed' });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Reservation cancelled' });
  } catch (err) {
    next(err);
  }
};
