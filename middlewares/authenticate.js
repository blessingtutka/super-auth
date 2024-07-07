import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({
        status: "Unauthorized",
        message: "No token provided",
        statusCode: 401,
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        status: "Unauthorized",
        message: "Invalid token",
        statusCode: 401,
      });
  }
};
export default authenticate;
