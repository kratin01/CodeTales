//this file for protecting routes we can use JWT authentication

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export default auth;
