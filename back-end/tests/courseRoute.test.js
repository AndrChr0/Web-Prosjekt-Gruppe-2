// Import necessary modules for handling HTTP requests and creating a test server
const request = require('supertest');
const express = require('express');
// Import the Course model to be used in route handlers
const Course = require('../models/courseModel'); 
// Import routes for courses
const router = require('../routes/courseRoute'); 

// Initialize an Express application
const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());

// Custom middleware to simulate authentication by attaching a mock user object to the request
app.use((req, res, next) => {
    req.user = { userId: 'user123' }; // Simulate a logged-in user
    next();
});

// Attach course routes to the app under the '/courses' path
app.use('/courses', router);

// Test suite for course routes
describe('Course Route Tests', () => {
    // Test suite for GET requests on '/courses/:id' endpoint
    describe('GET /courses/:id', () => {
        it('should return a course if found', async () => {
            // Mock data returned when findById method is called
            const mockCourse = { _id: '1', title: 'Intro to Testing', description: 'A basic intro to testing APIs' };
            jest.spyOn(Course, 'findById').mockResolvedValue(mockCourse);

            // Perform GET request and check response
            const response = await request(app).get('/courses/1');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockCourse);
        });

        it('should return 404 if the course is not found', async () => {
            // Mocking findById to return null indicating not found
            jest.spyOn(Course, 'findById').mockResolvedValue(null);

            // Perform GET request and check response for 404 status
            const response = await request(app).get('/courses/1');
            expect(response.status).toBe(404);
        });
    });

    // Test suite for GET requests on '/courses' endpoint
    describe('GET /courses', () => {
        it('should return all courses for the user', async () => {
            // Mock data for courses associated with the user
            const mockCourses = [{ title: 'Test Course', userId: 'user123' }];
            jest.spyOn(Course, 'find').mockResolvedValue(mockCourses);

            // Perform GET request and check response
            const response = await request(app).get('/courses');
            expect(response.status).toBe(200);
            expect(response.body.count).toBe(mockCourses.length);
            expect(response.body.data).toEqual(mockCourses);
        });
    });

    // Test suite for POST requests on '/courses' endpoint
    describe('POST /courses', () => {
        it('should create a course when data is valid', async () => {
            // Mock data for a new course
            const newCourse = { title: 'New Course', description: 'Details about new course', courseCode: 'NC101', userId: 'user123' };
            jest.spyOn(Course.prototype, 'save').mockResolvedValue(newCourse);

            // Perform POST request and check response
            const response = await request(app).post('/courses').send(newCourse);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(newCourse);
        });

        it('should return 400 if required fields are missing', async () => {
            // Perform POST request with incomplete data and check for 400 status
            const response = await request(app).post('/courses').send({ description: 'Only description' });
            expect(response.status).toBe(400);
        });
    });

    // Test suite for PUT requests on '/courses/:id' endpoint
    describe('PUT /courses/:id', () => {
        it('should return 404 if the course is not found', async () => {
            // Mock findByIdAndUpdate to return null if not found
            jest.spyOn(Course, 'findByIdAndUpdate').mockResolvedValue(null);
    
            const updateData = {
                title: 'Attempt Update',
                description: 'Test Description',
                courseCode: 'Test Code'
            };
    
            // Perform PUT request and check response for 404 status
            const response = await request(app).put('/courses/1').send(updateData);
            expect(response.status).toBe(404);
        });
    });

    // Test suite for DELETE requests on '/courses/:id' endpoint
    describe('DELETE /courses/:id', () => {
        it('should delete the course successfully', async () => {
            // Mock findByIdAndDelete to return true if successful
            jest.spyOn(Course, 'findByIdAndDelete').mockResolvedValue(true);

            // Perform DELETE request and check response
            const response = await request(app).delete('/courses/1');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('course deleted successfully');
        });

        it('should return 404 if the course is not found', async () => {
            // Mock findByIdAndDelete to return null if the course is not found
            jest.spyOn(Course, 'findByIdAndDelete').mockResolvedValue(null);

            // Perform DELETE request and check response for 404 status
            const response = await request(app).delete('/courses/1');
            expect(response.status).toBe(404);
        });
    });
});
