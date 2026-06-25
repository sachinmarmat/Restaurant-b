import { createAdminToken, verifyAdminPassword } from '../middleware/auth.js';

export const adminLogin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  if (!verifyAdminPassword(password)) {
    return res.status(401).json({ success: false, message: 'Invalid admin password' });
  }

  const token = createAdminToken();
  res.json({ success: true, token, message: 'Login successful' });
};
