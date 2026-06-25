import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'restaurant-admin-secret';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export function createAdminToken() {
  const payload = Date.now().toString();
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
  if (signature !== expected) return false;

  const age = Date.now() - Number(payload);
  return age >= 0 && age < TOKEN_TTL_MS;
}

export function verifyAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ success: false, message: 'Admin access required' });
  }

  next();
}
