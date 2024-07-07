import getUsers, { createUser, VerifyUser, getSingleUser } from "./views.js";
import { validateUser, validateLogin } from "./validations.js";
import { generateToken } from "./utils.js";

// CREDENTIAL MANAGEMENT
async function register(req, res) {
  const { firstName, lastName, email, password, phone } = req.body;
  const errors = await validateUser(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });
  try {
    const user = await createUser(firstName, lastName, email, password, phone);
    const token = generateToken(user);
    const response = {
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: user,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const responseError = {
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const errors = validateLogin(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });
  try {
    const user = await VerifyUser(email, password);

    if (user) {
      const token = generateToken(user);
      const response = {
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: user,
        },
      };
      res.status(200).json(response);
    } else throw "Bad Credential";
  } catch (error) {
    const responseError = {
      status: "Bad request",
      message: "Authentication failed",
      error: error,
      statusCode: 401,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

// USER MANAGEMENT
async function userList(req, res) {
  try {
    const users = await getUsers();

    if (users) res.status(200).json({ users: users });
    else res.status(404).json({ message: "No user found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function userProfile(req, res) {
  let { userId } = req.params;
  try {
    let user = await getSingleUser(userId);
    const response = {
      status: "success",
      message: "User found",
      data: user,
    };

    if (user) res.status(200).json(response);
    else res.status(404).json({ message: "This user doesn't exist`" });
  } catch (error) {
    const responseError = {
      status: "error",
      message: error.message,
      statusCode: 500,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

export { register, login, userList, userProfile };
