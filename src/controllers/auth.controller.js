import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { config } from '../config/env.config.js';

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'body vacio o mal formado',
    });
  }

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ status: 'error', message: 'el usuario ya existe' });
    }

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
    });

    res.status(201).json({ status: 'success', payload: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 'error', message: 'body vacio o mal formado' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'body vacio o mal formado',
    });
  }

  try {
    console.log('Login attempt:', email, password);
    console.log(config.ADMIN_EMAIL, config.ADMIN_PASSWORD); // Log the login attempt

    if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
      req.session.user = {
        first_name: 'Admin',
        last_name: 'Coder',
        email: config.ADMIN_EMAIL,
        role: 'admin',
        id: 'admin-id',
      };
      return res.status(200).json({ status: 'success', payload: req.session.user });
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario desconocido' });
    }

    if (!isValidPassword(password, user.password)) {
      return res.status(401).json({ status: 'error', message: 'Contraseña o email incorrectos' });
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      id: user._id,
    };

    res.status(200).json({ status: 'success', payload: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

export const authController = {
  register,
  login,
  logout,
};
