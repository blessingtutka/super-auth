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
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function VerifyUser(email, password) {
  try {
    const user = await userTable.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function createUser(firstName, lastName, email, password, phone) {
  try {
    const orgName = `${firstName}'s Organisation`;
    const cryptPassword = await bcrypt.hash(password, 10);
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
      //   include: { organisations: true },
    });

    return userOrganisation;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

export default getUsers;
export { createUser, getSingleUser, VerifyUser };
