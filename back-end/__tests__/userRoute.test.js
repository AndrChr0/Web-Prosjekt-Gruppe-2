const request = require("supertest");
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/userModel.js"); // Adjust the path as necessary
const userRouter = require("../routes/userRoute.js"); // Adjust the path as necessary
const app = express();
app.use(express.json());
app.use("/users", userRouter);

// Mocking middleware for authentication and role checking
app.use((req, res, next) => {
    req.user = { userId: "660eeb50894bfddb29d726dd" }; // Example user ID
    next();
});

describe("User Route Tests", () => {
    describe("Realistic Use Cases", () => {
        describe("When a user requests their profile", () => {
            it("should return the user's profile", async () => {
                const mockUser = {
                    _id: "660eeb50894bfddb29d726dd",
                    email: "user@example.com",
                    role: "student",
                    courses: []
                };
                readToken.mockReturnValue({ userId: mockUser._id });
                jest.spyOn(User, "findById").mockResolvedValue(mockUser);

                const response = await request(app)
                    .get("/users/profile")
                    .set("Authorization", "Bearer valid-token");

                expect(response.status).toBe(200);
                expect(response.body.email).toEqual(mockUser.email);
            });
        });

        describe("When updating user email", () => {
            it("should successfully update the email and return success message", async () => {
                const userId = "660eeb50894bfddb29d726dd";
                const newEmail = "newemail@example.com";
                const mockUser = {
                    _id: userId,
                    email: "oldemail@example.com",
                    updateEmail: (newEmail) => {
                        mockUser.email = newEmail;
                        return mockUser;
                    },
                    save: jest.fn().mockResolvedValue(true)
                };

                jest.spyOn(User, "findById").mockResolvedValue(mockUser);

                const response = await request(app)
                    .put("/users/update-email")
                    .set("Authorization", "Bearer valid-token")
                    .send({ email: newEmail });

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
                    .send(userData);

                expect(response.status).toBe(400);
                expect(response.body.error).toContain("Password must be at least 8 characters long");
            });
        });
    });

    describe("Negative Cases", () => {
        describe("When a user is not found for deletion", () => {
            it("should return a 404 error if the user does not exist", async () => {
                const userId = "nonexistentid";

                jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(null);

                const response = await request(app)
                    .delete(`/users/delete`)
                    .set("Authorization", "Bearer valid-token");

                expect(response.status).toBe(404);
                expect(response.body.message).toEqual("User not found.");
            });
        });
    });
});
