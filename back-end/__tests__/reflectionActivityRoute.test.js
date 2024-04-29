//Edgar

const request = require('supertest');
const express = require('express');
const ReflectionActivity = require('../models/reflectionActivityModel');
const router = require('../routes/reflectionActivityRoute');

const app = express();
app.use(express.json());
app.use('/reflection-activities', router);

describe('Reflection Activity Route Tests', () => {

    describe('Realistic Usage Cases', () => {

        it('should get all reflection activities', async () => {

            const mockReflectionActivities = [
                { title: 'Reflection 1', description: 'Description 1', courseCode: 'ABC123' },
                { title: 'Reflection 2', description: 'Description 2', courseCode: 'DEF456' }
            ];
  
            jest.spyOn(ReflectionActivity, 'find').mockResolvedValue(mockReflectionActivities);

       
            const response = await request(app).get('/reflection-activities');


            expect(response.status).toBe(200);
            expect(response.body.count).toBe(mockReflectionActivities.length);
            expect(response.body.data).toEqual(mockReflectionActivities);
        });

    
        it('should get a specific reflection activity by id', async () => {
            
            const mockReflectionActivity = { _id: '1', title: 'Reflection 1', description: 'Description 1', courseCode: 'ABC123' };
            jest.spyOn(ReflectionActivity, 'findById').mockResolvedValue(mockReflectionActivity);
            const response = await request(app).get('/reflection-activities/1');

            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockReflectionActivity);
        });
    });

    describe('Boundary Cases', () => {
        
        it('should add a new reflection activity with minimum data', async () => {
            
            const newReflectionActivity = { title: 'Reflection', description: 'Description', courseCode: 'XYZ789' };
           
            jest.spyOn(ReflectionActivity.prototype, 'save').mockResolvedValue(newReflectionActivity);

            const response = await request(app)
                .post('/reflection-activities')
                .send(newReflectionActivity);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newReflectionActivity);
        });
    });

    describe('Edge Cases', () => {
        it('should add a new reflection activity with maximum length data', async () => {
            const maxReflectionActivity = {
                title: 'X'.repeat(255), 
                description: 'Y'.repeat(1000), 
                courseCode: 'Z'.repeat(50) 
            };

            jest.spyOn(ReflectionActivity.prototype, 'save').mockResolvedValue(maxReflectionActivity);

            const response = await request(app)
                .post('/reflection-activities')
                .send(maxReflectionActivity);


            expect(response.status).toBe(201);
            expect(response.body).toEqual(maxReflectionActivity);
        });
    });

    describe('Negative Cases', () => {
        it('should return 400 if title is missing', async () => {
            const invalidReflectionActivity = { description: 'New Description', courseCode: 'XYZ789' };

            const response = await request(app)
                .post('/reflection-activities')
                .send(invalidReflectionActivity);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Title is required');
        });
    });
});
