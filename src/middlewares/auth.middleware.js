export const requireAuthView = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ status: 'error', message: 'Necesita autenticacion' });
  }
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'No tiene permisos para acceder a este recurso',
      });
    }

    next();
  };
};
