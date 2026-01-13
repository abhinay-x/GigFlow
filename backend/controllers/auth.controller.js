import { register, login, getMe } from '../services/auth.service.js';

/**
 * Auth controllers.
 *
 * Cookie strategy:
 * - Stores JWT in an HttpOnly cookie named `token`.
 * - In production/cross-site deployments (Vercel -> Render), the cookie must be:
 *   `sameSite: 'none'` and `secure: true` to be accepted by modern browsers.
 * - Client must send credentials (`withCredentials: true`) for API calls.
 *
 * Endpoints:
 * - `POST /register`: Creates a new user.
 * - `POST /login`: Authenticates an existing user.
 * - `GET /me`: Retrieves the authenticated user's data.
 * - `POST /logout`: Clears the authentication cookie.
 */

/**
 * Creates a new user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await register(name, email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Authenticates an existing user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await login(email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

/**
 * Retrieves the authenticated user's data.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getMeController = async (req, res) => {
  try {
    const user = await getMe(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Clears the authentication cookie.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const logoutController = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.json({ message: 'Logged out successfully' });
};
