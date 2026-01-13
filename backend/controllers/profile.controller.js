import { updateProfile } from '../services/profile.service.js';

export const updateProfileController = async (req, res) => {
  try {
    const user = await updateProfile(req.user._id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
