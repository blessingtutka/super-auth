import request from "supertest";
import app from "../index.js";
import client from "../db-client";

beforeAll(async () => {
  await client.user.deleteMany();
  await client.organisation.deleteMany();
});

afterAll(async () => {
  await client.$disconnect();
});

describe("User Registration and Login", () => {
  it("should register user successfully with default organisation", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "Blessing",
      lastName: "Tutka",
      email: "blessing@example.com",
      password: "password123",
      phone: "+243992393174",
    });

    const user = await client.user.findUnique({
      where: { email: res.body.data.user.email },
      include: { organisations: true },
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.user.firstName).toBe("Blessing");
    expect(res.body.data.user.email).toBe("blessing@example.com");
    expect(user.organisations[0].name).toBe("Blessing's Organisation");
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("should log the user in successfully", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "blessing@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.user.email).toBe("blessing@example.com");
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("should fail if required fields are missing", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "",
      lastName: "Asher",
      email: "asher@example.com",
      password: "password123",
      phone: "+2439934567",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "firstName",
          message: expect.any(String),
        }),
      ])
    );
  });

  it("should fail if there's duplicate email or userId", async () => {
    await request(app).post("/auth/register").send({
      firstName: "Megumi",
      lastName: "Ishigami",
      email: "megumi@example.com",
      password: "password123",
      phone: "+370873842",
    });

    const res = await request(app).post("/auth/register").send({
      firstName: "Megumin",
      lastName: "Explosion",
      email: "megumi@example.com",
      password: "password123",
      phone: "+370877845",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "email",
          message: expect.any(String),
        }),
      ])
    );
  });
});
