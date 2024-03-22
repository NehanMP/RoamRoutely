import jwt from 'jsonwebtoken';

export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };



export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token; 

  if (!token) {
    return res.status(401).json({ message: "Authentication failed: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed: invalid token" });
  }
};
