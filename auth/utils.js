import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateToken = (user) => {
  return jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
