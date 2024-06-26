const request = require("supertest");
const express = require("express");
const Course = require("../models/courseModel");
const router = require("../routes/courseRoute");

// Realistic object ID for testing
const mockID = "661e400cf9ef626437d5b49a";

let app;

// Setup the Express app before each test
beforeEach(() => {
  app = express();
  app.use(express.json());

  // Mock middleware for user authentication
  app.use((req, res, next) => {
    req.user = { userId: "660eeb50894bfddb29d726dd" };
    next();
  });

  app.use("/courses", router);
});

// Teardown after each test
afterEach(() => {
  app = null;
});

describe("ANDREAS Course Endpoints Tests", () => {
  // Realistic Usage Cases
  describe("Realistic Usage Cases", () => {
    describe("Given that the user requests a course by its ID ", () => {
      it("it should return a course", async () => {
        const mockCourse = {
          _id: mockID,
          title: "Standard Course",
          description: "Typical course content",
        };
        jest.spyOn(Course, "findById").mockResolvedValue(mockCourse);
        const response = await request(app).get(`/courses/${mockID}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(mockCourse);
      });
    });

    describe("Given that the user wants to receive all courses", () => {
      it("it should return all courses for the user", async () => {
        const mockCourses = [
          { title: "Course 1", description: "First course" },
          { title: "Course 2", description: "Second course" },
        ];
        jest.spyOn(Course, "find").mockResolvedValue(mockCourses);

        const response = await request(app).get("/courses");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(mockCourses);
        expect(response.body.count).toBe(mockCourses.length);
      });

      it("it should return an empty array when no courses are available", async () => {
        jest.spyOn(Course, "find").mockResolvedValue([]);

        const response = await request(app).get("/courses");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
        expect(response.body.count).toBe(0);
      });
    });

    describe("Given that the user wants to create a course", () => {
      it("it should create a course when given typical data", async () => {
        const typicalCourse = {
          title: "Introduction to Cows",
          description: "Introduction to the cows of the world",
          courseCode: "IDGMOO1",
        };
        jest.spyOn(Course.prototype, "save").mockResolvedValue(typicalCourse);
        const response = await request(app)
          .post("/courses")
          .send(typicalCourse);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(typicalCourse);
      });
    });

    describe("Given the user wants to update a course", () => {
      it("it should update a course when given typical data", async () => {
        const updatedCourse = {
          title: "Introduction to small Cows",
          description: "Introduction to the smaller cows of the world",
          courseCode: "IDGsmall1",
        };
        jest
          .spyOn(Course, "findByIdAndUpdate")
          .mockResolvedValue(updatedCourse);
        const response = await request(app)
          .put(`/courses/${mockID}`)
          .send(updatedCourse);
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(updatedCourse);
      });
    });

    describe("Given that the user wants to delete a course", () => {
      it("it should return 200 when deleting a course", async () => {
        jest.spyOn(Course, "findByIdAndDelete").mockResolvedValue({
          title: "Introduction to small Cows(Deleted))",
          description: "Introduction to the smaller cows of the world",
          courseCode: "6789",
        });
        const response = await request(app).delete(`/courses/${mockID}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: "Course deleted successfully",
        });
      });
    });
  });

  // Boundary Cases
  describe("Boundary Cases", () => {
    describe("Given that the user wants to create a new course", () => {
      it("it should return 201 when courseCode is exactly at minimum length of 4 characters", async () => {
        const course = {
          title: "Short Code",
          description: "A course with minimal code length",
          courseCode: "1234",
        };
        jest.spyOn(Course.prototype, "save").mockResolvedValue(course);
        const response = await request(app).post("/courses").send(course);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(course);
      });

      it("it should handle a course title just at the limit of 100 characters", async () => {
        const longTitleCourse = {
          title: "a".repeat(100),
          description: "Course with a title at the limit",
          courseCode: "LIMIT123",
        };
        jest.spyOn(Course.prototype, "save").mockResolvedValue(longTitleCourse);
        const response = await request(app)
          .post("/courses")
          .send(longTitleCourse);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(longTitleCourse);
      });
    });

    describe("Given that the user wants to update a course", () => {
      it("it should return 200 when courseCode is exactly at maximum length of 10 characters", async () => {
        const updatedCourse = {
          title: "Introduction to small Cows",
          description: "Introduction to the smaller cows of the world",
          courseCode: "0123456789",
        };
        jest
          .spyOn(Course, "findByIdAndUpdate")
          .mockResolvedValue(updatedCourse);
        const response = await request(app)
          .put(`/courses/${mockID}`)
          .send(updatedCourse);
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(updatedCourse);
      });
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    describe("Given that the user wants to delete a course", () => {
      it("it should return 404 when trying to delete a non-existent course", async () => {
        jest.spyOn(Course, "findByIdAndDelete").mockResolvedValue(null);
        const response = await request(app).delete(`/courses/${mockID}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual("Course not found");
      });
    });
  });

  // Negative Cases
  describe("Negative Cases", () => {
    describe("Given the user wants to create a new course", () => {
      it("it should return an error if the endpoint is invalid", async () => {
        const response = await request(app).post("/courses/invalid").send({
          title: "Once i slipped on a banana peel",
          description: "Have you ever seen a man do a backflip on a banana?",
          courseCode: "WAHOOTIME",
        });
        expect(response.status).toBe(404);
      });

      it("it should return an error when the title lengt is just over 100 characters", async () => {
        const longTitleCourse = {
          title: "I".repeat(101),
          description: "A course with a title that is too long",
          courseCode: "LALALONG",
        };
        jest.spyOn(Course.prototype, "save");
        const response = await request(app)
          .post("/courses")
          .send(longTitleCourse);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
          "Title must be at most 100 characters."
        );
      });

      it("it should return 400 when title is below the minLength of 3 characters", async () => {
        const course = {
          title: "Ti",
          description: "A fun course",
          courseCode: "FUN1",
        };
        jest.spyOn(Course.prototype, "save").mockResolvedValue(course);
        const response = await request(app).post("/courses").send(course);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
          "Title must be at least 3 characters."
        );
      });

      it("it should reject a course with missing courseCode", async () => {
        const response = await request(app).post("/courses").send({
          title: "I woke up today with a missing leg",
          description: "I should visit the doctor more often",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Title and course code are required."
        );
      });

      it("it should reject a course with missing title", async () => {
        const response = await request(app).post("/courses").send({
          description: "I should visit the doctor more often",
          courseCode: "DOC113",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Title and course code are required."
        );
      });
    });

    describe("Given that the user wants to update a course", () => {
      it("it should return 404 when trying to update a non-existent course", async () => {
        const updateData = {
          title: "Non-existent course update attempt",
          description: "This course does not exist",
          courseCode: "NOEXIST",
        };
        jest.spyOn(Course, "findByIdAndUpdate").mockResolvedValue(null);
        const response = await request(app)
          .put(`/courses/${mockID}`)
          .send(updateData);
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual("Course not found");
      });
    });
  });
});
