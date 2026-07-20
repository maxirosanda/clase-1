import userModel from '../models/user.model.js';

const register = async (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
};

const login = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
};

export const viewController = {
  register,
  login,
};
