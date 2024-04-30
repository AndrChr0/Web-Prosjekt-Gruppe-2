const request = require("supertest");
const express = require("express");
const app = express();
const reflectionRoute = require("../routes/ReflectionRoute.js");
const Reflection = require("../models/reflectionModel.js"); 

// a mock id for a user
 const userIdMock = "6627d36da4555b9670d6da04";

const mockAuth = (req, res, next) => {
  req.user = { userId: userIdMock };
  next();
};

app.use("/reflections", mockAuth, reflectionRoute);


describe("MAJA Reflection route tests", () => {

describe("Realistic use cases", () => {
    describe("Given that a user requests their reflections", () => {
      it("should return all reflections for the user", async () => {
        const mockReflections = [
          {
            title: "a reflection",
            content: "hello",
            visibility: "true",
            files: ["file"],
            userId: userIdMock,
            courseId: "1",
          },
            {
            title: "something",
            content: "content",
            visibility: "true",
            files: ["file2"],
            userId: userIdMock,
            courseId: "2",
          },
        ];

        // Mock the Reflection model's find method to return the mock reflections
        jest.spyOn(Reflection, "find").mockResolvedValue(mockReflections);

        // do the get request
        const response = await request(app).get("/reflections");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data", mockReflections);
      });
    });

    describe("Given that a user creates a new reflection", () => {
      it("should return status code 201 and create a new reflection", async () => {
        const mockReflection = {
          title: "a reflection",
          content: "hello i am content of a reflection",
          visibility: "true",
          userId: userIdMock,
          courseId: "1",
        };

        // Mocking Reflection.create
        jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);


        // do the post request
        const response = await request(app).post("/reflections")
          .field('title', mockReflection.title)
          .field('content', mockReflection.content)
          .field('visibility', mockReflection.visibility)
          .field('userId', mockReflection.userId)
          .field('courseId', mockReflection.courseId)
    
        // Assertions
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(mockReflection);
      });

    });
    describe("Given that user wants to delete a reflection", () => {
    
      it("should successfully delete the reflection", async () => {
        const reflectionId = "1324243";
    
        jest.spyOn(Reflection, "findByIdAndDelete").mockResolvedValue({
          _id: reflectionId,
          title: "a reflection",
          content: "here is a contents of my reflection",
          visibility: "true",
          userId: userIdMock,
        });
  
        const response = await request(app).delete(`/reflections/${reflectionId}`)
          .send();
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Reflection deleted successfully");
      });
    });
  });


describe("Boundary cases", () => {

  describe("Given that a user creates a new reflection", () => {
    it("should return statuscode 201 if the title is exactly 3 characters", async () => {
      
      const mockReflection = {
        title: "abc",
        content: "contentcontentcontentcontentcontent",
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app).post("/reflections")
      .field('title', mockReflection.title)
      .field('content', mockReflection.content)
      .field('visibility', mockReflection.visibility)
      .field('userId', mockReflection.userId)
      .field('courseId', mockReflection.courseId)
    
      expect(response.status).toBe(201); 
    });
  });

  describe("Given that a user creates a new reflection", () => {
    it("should return statuscode 201 if the title is exactly 100 characters", async () => {
      const contentstring= "a".repeat(100);

      const mockReflection = {
        title: "TITLE",
        content: contentstring,
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app).post("/reflections")
      .field('title', mockReflection.title)
      .field('content', mockReflection.content)
      .field('visibility', mockReflection.visibility)
      .field('userId', mockReflection.userId)
      .field('courseId', mockReflection.courseId)
    
      expect(response.status).toBe(201); 
    });
  });

});

describe("Edge cases", () => {

  describe("Given that a user creates a new reflection", () => {
    it("should return error code 400 if the title is less than 3 characters", async () => {
      const mockReflection = {
        title: "a",
        content: "contentcontentcontentcontentcontent",
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app).post("/reflections")
      .field('title', mockReflection.title)
      .field('content', mockReflection.content)
      .field('visibility', mockReflection.visibility)
      .field('userId', mockReflection.userId)
      .field('courseId', mockReflection.courseId)
    
      expect(response.status).toBe(400); // want to expect a bad request
    });
  });

  describe("Given that a user creates a new reflection", () => {
    it("should return error code 400 if the title is more than 100 characters", async () => {
      const titlestring = "a".repeat(101);

      const mockReflection = {
        title: titlestring,
        content: "contentcontentcontentcontentcontent",
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app).post("/reflections")
      .field('title', mockReflection.title)
      .field('content', mockReflection.content)
      .field('visibility', mockReflection.visibility)
      .field('userId', mockReflection.userId)
      .field('courseId', mockReflection.courseId)
    
      expect(response.status).toBe(400); 
    });
  });

  describe("Given that a user creates a new reflection", () => {
    it("should return error code 400 if the content is more than 15000 characters", async () => {

      const longString = "a".repeat(15001);

      const mockReflection = {
        title: "acceptable title",
        content: longString,
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app).post("/reflections")
      .field('title', mockReflection.title)
      .field('content', mockReflection.content)
      .field('visibility', mockReflection.visibility)
      .field('userId', mockReflection.userId)
      .field('courseId', mockReflection.courseId)
    
      expect(response.status).toBe(400);

    });
  });
});

describe("Negative cases", () => {

  describe("Given that user wants to create a new reflection", () => {
    it("should return error if title is missing", async () => {
      const mockReflection = {
        content: "content is here",
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app)
        .post("/reflections")
        .field('content', mockReflection.content)
        .field('visibility', mockReflection.visibility)
        .field('userId', mockReflection.userId)
        .field('courseId', mockReflection.courseId)

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Send all required fields: title, content");

    });
    it("should give error if content field is missing", async () => {
      const mockReflection = {
        title: "title",
        visibility: "true",
        userId: userIdMock,
        courseId: "1",
      };

      jest.spyOn(Reflection, "create").mockResolvedValue(mockReflection);

      const response = await request(app)
        .post("/reflections")
        .field('title', mockReflection.title)
        .field('visibility', mockReflection.visibility)
        .field('userId', mockReflection.userId)
        .field('courseId', mockReflection.courseId)

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Send all required fields: title, content");

    });

  });
});
});
