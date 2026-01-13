import User from '../models/User.js';

export const updateProfile = async (userId, updateData) => {
  const allowedFields = ['name', 'bio', 'skills', 'location', 'website'];
  const filteredData = {};

  for (const key of allowedFields) {
    if (updateData[key] !== undefined) {
      filteredData[key] = updateData[key];
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
