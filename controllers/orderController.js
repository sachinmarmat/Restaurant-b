import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { table, customerName, items } = req.body;
    if (!table || !customerName || !items?.length) {
      return res.status(400).json({ success: false, message: 'Table, name, and items are required' });
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const total = subtotal * 1.1;
    const restaurant = await Restaurant.findOne({ isActive: true });

    const order = await Order.create({
      table,
      customerName,
      items,
      subtotal,
      total,
      status: 'preparing',
      restaurant: restaurant?._id,
    });

    res.status(201).json({ success: true, data: order, message: 'Order placed successfully' });
  } catch (err) {
    next(err);
  }
};
