import client from "../db-client.js";

const getUserByEmail = async (email) => {
  try {
    const userwithemail = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    return userwithemail;
  } catch {
    return null;
  }
};

const validateUser = async (user) => {
  const exits = await getUserByEmail(user.email);

  const errors = [];
  if (!user.email)
    errors.push({ field: "email", message: "Email is required" });
  if (!user.firstName)
    errors.push({ field: "firstName", message: "First name is required" });
  if (!user.lastName)
    errors.push({ field: "lastName", message: "Last name is required" });
  if (!user.password)
    errors.push({ field: "password", message: "Password is required" });
  if (exits) errors.push({ field: "email", message: "Email already exists" });
  return errors;
};

const validateLogin = (user) => {
  const errors = [];
  if (!user.email)
    errors.push({ field: "email", message: "Email is required" });
  if (!user.password)
    errors.push({ field: "password", message: "Password is required" });
  return errors;
};

export { validateUser, validateLogin };
