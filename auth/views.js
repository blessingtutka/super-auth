import client from "../db-client.js";
import bcrypt from "bcrypt";

let userTable = client.user;

async function getUsers() {
  // Fetch all users
  try {
    const allUsers = await userTable.findMany();
    return allUsers;
  } catch {
    throw new Error(`Error fetching users: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function getSingleUser(userId) {
  try {
    const user = await userTable.findUnique({
      where: {
        userId: userId,
      },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Error fetching user`);
  } finally {
    await client.$disconnect();
  }
}

async function VerifyUser(email, passwords) {
  try {
    const user = await userTable.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(passwords, user.password))) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function createUser(firstName, lastName, email, passw, phone) {
  try {
    const orgName = `${firstName}'s Organisation`;
    const cryptPassword = await bcrypt.hash(passw, 10);
    const userOrganisation = await userTable.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: cryptPassword,
        phone: phone,
        organisations: {
          create: {
            name: orgName,
          },
        },
      },
      // include: { organisations: true },
    });
    const { password, ...userWithoutPassword } = userOrganisation;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

export default getUsers;
export { createUser, getSingleUser, VerifyUser };
