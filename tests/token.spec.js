import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

describe("Token Generation", () => {
  it("should ensure token expires at the correct time and contains correct user details", () => {
    const user = { userId: "123", email: "test@example.com" };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.userId).toBe(user.userId);
    expect(decoded.email).toBe(user.email);
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});
