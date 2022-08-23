const express = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");

const router = require("../routes");

const User = require("../models/User");

const app = new express();
app.use(express.json());
app.use("/", router);
require("dotenv").config({ path: ".test.env" });

beforeAll(async () => {
  await mongoose.connect(process.env.DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
});

describe("Hello endpoints", () => {
  test("respond to GET /hello with 'hello world' ", async () => {
    // ping our service
    const res = await supertest(app).get("/hello");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("hello world");
  });

  test("respond to GET /hello-you/Adam with 'hello Adam' ", async () => {
    // ping our service
    const res = await supertest(app).get("/hello-you/Adam");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("hello Adam");
  });

  test("respond to GET /hello-you/ with 'hello world' ", async () => {
    // ping our service
    const res = await supertest(app).get("/hello-you/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("hello world");
  });
});

describe("Users flow", () => {
  describe("POST", () => {
    test("create a user", async () => {
      const res = await supertest(app)
        .post("/users")
        // req.body
        .send({ email: "test@test.pl", username: "testUserName" })
        // headers
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(201);
    });

    test("create a second user", async () => {
      const res = await supertest(app)
        .post("/users")
        // req.body
        .send({ email: "adam@test.pl", username: "Adam" })
        // headers
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(201);
    });
  });
  describe("GET", () => {
    test("get a list of users, should be of length 2", async () => {
      const res = await supertest(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    test("get a list of users, paginated, should be a length of 1", async () => {
      const res = await supertest(app)
        .get("/users")
        .query({ page: 1, perPage: 1 });
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    test("get a list of users, two pages, first page different than the second", async () => {
      const [firstPage, secondPage] = await Promise.all([
        supertest(app).get("/users").query({ page: 1, perPage: 1 }),
        supertest(app).get("/users").query({ page: 2, perPage: 1 }),
      ]);
      expect(firstPage.body[0]._id).not.toEqual(secondPage.body[0]._id);
    });
  });
  describe("DELETE", () => {
    test("removing all users", async () => {
      const res = await supertest(app).delete("/users");
      expect(res.statusCode).toBe(204);
    });

    test("check if all users delete", async () => {
      const res = await supertest(app).get("/users");
      expect(res.body.length).toEqual(0);
    });
  });
});

afterAll(async () => {
  // await User.deleteMany({});
  await mongoose.connection.close();
});
