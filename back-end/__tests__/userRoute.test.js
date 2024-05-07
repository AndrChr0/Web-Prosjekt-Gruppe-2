const request = require("supertest");
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/userModel.js");
const userRouter = require("../routes/userRoute.js");

const MOCK_USER_ID = "660eeb50894bfddb29d726dd"
const makeJWT = (payload) => jwt.sign({ ...payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
const makeAuthHeader = (payload) => `Bearer ${makeJWT(payload)}`
let app;

beforeEach(() => {
    jest.restoreAllMocks()
    app = express();
    app.use(express.json());
    app.use("/users", userRouter);
});

afterEach(() => {
    app = null;
});





describe("User Route Tests", () => {
    describe("Realistic Use Cases", () => {
        describe("When a user requests their profile", () => {
            it("should return the user's profile", async () => {
                const mockUser = {
                    _id: MOCK_USER_ID,
                    email: "user@example.com",
                    role: "student",
                    courses: []
                };
                jest.spyOn(User, "findById").mockResolvedValue(mockUser);

                const response = await request(app)
                    .get("/users/profile")
                    .set("Authorization", makeAuthHeader({ _id: MOCK_USER_ID }));

                expect(response.status).toBe(200);
                expect(response.body.email).toEqual(mockUser.email);
            });
        });

        describe("When updating user email", () => {
            it("should successfully update the email and return success message", async () => {

                const newEmail = "newemail@example.com";
                const mockUser = {
                    _id: MOCK_USER_ID

                };

                jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue(mockUser);

                const response = await request(app)
                    .put("/users/update-email")
                    .set("Authorization", makeAuthHeader({ userId: MOCK_USER_ID, role: "teacher" }))
                    .send({ email: newEmail });
                expect(User.findByIdAndUpdate).toHaveBeenCalledWith(MOCK_USER_ID, expect.objectContaining({ email: newEmail }))
                expect(response.status).toBe(200);
                expect(response.body.message).toEqual("Email updated successfully");
            });
        });
    });

    describe("Boundary Cases", () => {
        describe("When creating a new user", () => {
            it("should handle exactly 8 characters password", async () => {
                const userData = {
                    email: "test@example.com",
                    password: "abcd1234", // Exactly 8 characters
                    role: "student"
                };

                jest.spyOn(User.prototype, "save").mockResolvedValue(userData);

                const response = await request(app)
                    .post("/users/register")
                    .send(userData);


                expect(response.status).toBe(201);
                expect(response.body.email).toEqual(userData.email);
            });
        });
    });

    describe("Edge Cases", () => {
        describe("When the password is too short", () => {
            it("should return a 400 error for password length less than 8 characters", async () => {
                const userData = {
                    email: "test@example.com",
                    password: "1234567", // 7 characters
                    role: "student"
                };

                const response = await request(app)
                    .post("/users/register")
                    .set("Authorization", makeAuthHeader({ userId: MOCK_USER_ID, role: "teacher" }))
                    .send(userData);

                expect(response.status).toBe(400);

            });
        });
    });

    describe("Negative Cases", () => {
        describe("When no password is provided by the user", () => {
            it("should return a 400 error for password length less than 8 characters", async () => {
                const userData = {
                    email: "test@example.com",
                    role: "student"
                };

                const response = await request(app)
                    .post("/users/register")
                    .set("Authorization", makeAuthHeader({ userId: MOCK_USER_ID, role: "teacher" }))
                    .send(userData);

                expect(response.status).toBe(400);

            });
        });
    });
});
