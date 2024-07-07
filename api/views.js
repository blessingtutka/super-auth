import client from "../db-client.js";

let organisationTable = client.organisation;

async function getUserOrganisations(userdId) {
  // Fetch all users
  try {
    const allOrgs = await organisationTable.findMany({
      where: {
        users: {
          some: {
            userId: userdId,
          },
        },
      },
    });
    return allOrgs;
  } catch {
    throw new Error(`Error fetching organisations: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function addUserOrganisation(orgId, userId, authUserId) {
  // Fetch all users
  try {
    const org = await organisationTable.findUnique({
      where: { orgId },
      include: { users: true },
    });
    if (!org || !org.users.some((user) => user.userId == authUserId)) {
      throw new Error("Error Adding user to organisation");
    }
    const addUser = await organisationTable.update({
      where: { orgId },
      data: {
        users: {
          connect: { userId },
        },
      },
    });
    return addUser;
  } catch {
    throw new Error(`Error fetching organisations: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function createOrganisation(userId, name, desc) {
  try {
    const userOrganisation = await organisationTable.create({
      data: {
        name: name,
        description: desc,
        users: {
          connect: { userId: userId },
        },
      },
    });

    return userOrganisation;
  } catch (error) {
    throw new Error(`Error creating organisation: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

async function getSingleOrganisation(orgId) {
  try {
    const org = await organisationTable.findUnique({
      where: {
        orgId: orgId,
      },
    });
    return org;
  } catch (error) {
    throw new Error(`Error fetching organisation: ${error}`);
  } finally {
    await client.$disconnect();
  }
}

export default getUserOrganisations;

export { getSingleOrganisation, createOrganisation, addUserOrganisation };
