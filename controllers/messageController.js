import Message from '../models/Message.js';
import Restaurant from '../models/Restaurant.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const restaurant = await Restaurant.findOne({ isActive: true });
    await Message.create({ name, email, subject, message, restaurant: restaurant?._id });

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
};
