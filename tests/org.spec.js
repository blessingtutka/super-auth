import client from "../db-client";

describe("Organisation Access", () => {
  beforeAll(async () => {
    await client.organisation.create({
      data: {
        orgId: "org1",
        name: "Test Organisation",
        users: {
          create: {
            userId: "user1",
            firstName: "Blessing",
            lastName: "Tutka",
            email: "blessing@example.com",
            password: "hashedpassword",
          },
        },
      },
    });
    await client.organisation.create({
      data: {
        orgId: "org2",
        name: "Another Organisation",
      },
    });
  });

  it("should ensure users can't see data from organisations they don't have access to", async () => {
    const user = await client.user.findUnique({
      where: { userId: "user1" },
      include: { organisations: true },
    });
    expect(user.organisations.length).toBe(1);
    expect(user.organisations[0].orgId).toBe("org1");
  });

  afterAll(async () => {
    await client.organisation.deleteMany();
    await client.user.deleteMany();
  });
});
