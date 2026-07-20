import userModel from '../models/user.model.js';

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ status: 'error', message: 'el usuario ya existe' });
    }

    const user = await userModel.create({ first_name, last_name, email, password });

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
    // Primero deberiamos hacer un compare de passwords
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario desconocido' });
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: 'user',
    };

    res.status(200).json({ status: 'success', payload: req.session.user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const authController = {
  register,
  login,
};
