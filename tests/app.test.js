const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../app");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "user123",
  password: "tEst_123",
};

const vehicleOne = {
  make: "Ford",
  model: "Mustang GT",
  year: 1992,
};

const token = jwt.sign(
  { userId: userOne._id, username: userOne.username },
  process.env.JWT_SECRET
);

test("User sign up", async () => {
  const response = await request(app)
    .post("/user/sign-up")
    .send({
      username: userOne.username,
      password: userOne.password,
    })
    .expect(201);
});

test("User sign up with errors", async () => {
  const response = await request(app)
    .post("/user/sign-up")
    .send({
      username: userOne.username,
      password: "1234",
    })
    .expect(400);
});

test("User login", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({
      username: userOne.username,
      password: userOne.password,
    })
    .expect(200);
});

test("Add vehicle", async () => {
  const response = await request(app)
    .post("/vehicle/add")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: vehicleOne.make,
      model: vehicleOne.model,
      year: vehicleOne.year,
      userId: userOne._id,
    })
    .expect(201);
});

test("Add vehicle with errors", async () => {
  const response = await request(app)
    .post("/vehicle/add")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "",
      model: vehicleOne.model,
      userId: userOne._id,
    })
    .expect(400);
});

test("Get favorite vehicles route without authorization", async () => {
  const response = await request(app)
    .get("/vehicle/favorites")
    .send()
    .expect(403);
});
